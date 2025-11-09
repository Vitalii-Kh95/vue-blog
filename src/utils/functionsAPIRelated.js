import { baseURL } from '@/constants';

//////////////// CSRF and cookie /////////////////////////

/**
 * Fetches the CSRF token from the server.
 *
 * @returns {Promise<string>} The CSRF token
 */
export async function getCsrfToken() {
  const url = new URL('csrf_token/', baseURL);
  const response = await fetch(url, {
    credentials: 'include'
  });
  const data = await response.json();

  return data.csrftoken;
}

///////////////// posts related functions ///////////////////////////
// It's sorta appendix from when I had Projects view.
// That was the reason I had these functions untied to stores
// I think it's alright to keep it that way
/**
 * Fetches a single post by slug.
 *
 * @param {Object} params The parameters for fetching a post
 * @param {string} [params.slug] The slug of the post
 * @param {string} [params.type='blog'] The type of post ('blog' or other types)
 * @returns {Promise<Object | void>} The post data or `undefined` if an error occurs
 */
export async function getPost({ slug = undefined, type = 'blog' }) {
  const basePath = type === 'blog' ? 'posts/' : null;
  const url = new URL(`${basePath}${slug ? `${slug}/` : ''}`, baseURL);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // @ts-ignore: Ignore the type error for 'unknown' type
    console.error(error.message);
  }
}

/**
 * Fetches a list of posts with pagination and filtering options.
 *
 * @param {Object} params The parameters for fetching posts
 * @param {number} [params.limit=6] The maximum number of posts to return
 * @param {number} [params.offset=0] The offset for pagination
 * @param {string | undefined} [params.search] The search query
 * @param {string | undefined} [params.tag] The tag filter
 * @param {string} [params.type='blog'] The type of post ('blog' or other types)
 * @returns {Promise<Object | undefined>} The posts data
 */
export async function getPosts({
  limit = 6,
  offset = 0,
  search = undefined,
  tag = undefined,
  type = 'blog'
}) {
  if (offset % limit !== 0) {
    throw new Error(`Invalid offset: ${offset}. It must be a multiple of limit: ${limit}`);
  }
  const url = type === 'blog' ? new URL('posts/', baseURL) : null;
  if (!url) {
    throw new Error("URL couldn't be resolved!");
  }
  if (limit) {
    url.searchParams.set('limit', limit.toString());
  }
  if (offset) {
    url.searchParams.append('offset', offset.toString());
  }
  if (search) {
    url.searchParams.append('search', search);
  }
  if (tag) {
    url.searchParams.append('tag', tag);
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // @ts-ignore: Ignore the type error for 'unknown' type
    console.error(error.message);
  }
}

/**
 * Parses URL search parameters into an object.
 *
 * @param {string} url The URL to parse
 * @returns {Promise<Object>} An object containing the parsed parameters
 */
export async function parseUrlParams(url) {
  const params = new URL(url).searchParams; // Extract search parameters from the URL
  const result = {
    limit: params.get('limit') || null,
    offset: params.get('offset') || null,
    search: params.get('search') || null,
    tag: params.get('tag') || null
  };
  return result;
}
