import { defineStore } from 'pinia';
import { baseURL } from '@/constants';
import { getCsrfToken } from '@/utils/functionsAPIRelated';

async function apiCall(endpoint: string, options: RequestInit & { noCsrf?: boolean } = {}) {
  const url = new URL(endpoint, baseURL);
  const defaultHeaders = { 'Content-Type': 'application/json' };

  const csrftoken = await getCsrfToken();

  options.headers = {
    ...defaultHeaders,
    ...(options.noCsrf ? {} : { 'X-CSRFToken': csrftoken }),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Network error:', error);
    return { status: 500, data: null, ok: false, error: 'Network error' };
  }
}

async function handleApiResponse(response: Response) {
  let data = null;
  if (response.status !== 204) {
    try {
      data = await response.json(); // Try to parse the response text
    } catch (error) {
      console.log('Error parsing response JSON:', error);
    }
  }

  return {
    status: response.status,
    data,
    error: response.ok
      ? null
      : extractDjangoErrors(data) || { detail: `HTTP ${response.status} Error` },
    ok: response.ok // there was some confusion when I expected returned object to act like object returned by fetch,
    // so I added this property to consolidate my confusion
  };
}

interface DjangoErrorResponse {
  detail?: string;
  [field: string]: string | string[] | undefined;
}

function extractDjangoErrors(data: unknown) {
  // Step 1: Ensure `data` is an object
  if (!data || typeof data !== 'object') return null;

  const dataAsDjangoErrorResponse = data as DjangoErrorResponse;

  // Step 2: Handle DRF's general error messages under the "detail" field
  if (dataAsDjangoErrorResponse.detail) return { detail: dataAsDjangoErrorResponse.detail };

  // Step 3: Process field-specific validation errors
  const errors: { [key: string]: string } = {};

  for (const [field, message] of Object.entries(dataAsDjangoErrorResponse)) {
    // Handle array format (multiple messages for the same field)
    if (Array.isArray(message)) {
      errors[field] = message.join('; ');
    } else if (typeof message === 'string') {
      errors[field] = message;
    }
  }

  return Object.keys(errors).length ? errors : null;
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    loggedIn: false,
    user: null,
    errorMessage: {}
  }),
  actions: {
    async fetchUserState() {
      const result = await apiCall('whoami/');
      if (result.ok) {
        this.loggedIn = true;
        this.user = result.data?.username || null;
        return true;
      } else {
        this.loggedIn = false;
        this.user = null;
        this.errorMessage = result.error || {};
        return false;
      }
    },

    async register(username: string, email: string, password: string, passwordConfirm: string) {
      this.errorMessage = {};
      const result = await apiCall('register/', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm
        })
      });

      if (result.ok) {
        this.loggedIn = await this.login(username, password);
        return true;
      } else {
        console.error('Login failed:', result.error);
        this.errorMessage = result.error || {};
        return false;
      }
    },

    async login(username: string, password: string) {
      this.errorMessage = {};
      const result = await apiCall('login/', {
        method: 'POST',
        body: JSON.stringify({ 'username or email': username, password })
      });

      if (result.ok) {
        // Try to extract username from the login response
        const username = result.data?.username;
        if (username) {
          // Login successful, set the user state
          this.loggedIn = true;
          this.user = username;
          console.log('Login successful');
          return true;
        } else {
          console.warn('Username missing in the login response, attempting to fetch user state...');
          // Fetch user state if username is not in the response
          const userStateSuccess = await this.fetchUserState();
          // If user is still not logged in after fetchUserState, raise an error
          if (!userStateSuccess) {
            this.errorMessage = { detail: 'Failed to retrieve username' };
            return false;
          }
          return true;
        }
      } else {
        console.warn('Login failed:', result.error);
        this.errorMessage = result.error || {};
        return false;
      }
    },

    async logout() {
      this.errorMessage = {};
      const result = await apiCall('logout/', { method: 'POST' });

      if (result.status === 204) {
        this.loggedIn = false;
        this.user = null;
        console.log('Logout successful');
        return true;
      } else {
        this.errorMessage = result.error || {};
        console.error('Logout error:', result.error);
        return false;
      }
    }
  }
});
