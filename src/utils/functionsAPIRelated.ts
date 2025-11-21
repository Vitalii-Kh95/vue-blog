import { baseURL } from '@/constants';
import type { Post, GetPostsParams } from '@/types';
import type { LocationQueryValue } from 'vue-router';

interface PostPageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Post>;
}

//////////////// CSRF and cookie /////////////////////////

export async function getCsrfToken(): Promise<string> {
  const url = new URL('csrf_token/', baseURL);
  const response = await fetch(url, {
    credentials: 'include'
  });
  const data = await response.json();

  return data.csrftoken;
}

///////////////// posts related functions ///////////////////////////
/**
 * Fetches a single post by slug.
 */
export async function getPost({ slug = undefined }: { slug?: string }): Promise<Post | null> {
  if (!slug) {
    throw new TypeError('Slug is required');
  }
  const basePath = 'posts/';
  const url = new URL(`${basePath}${slug ? `${slug}/` : ''}`, baseURL);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data as Post;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

/**
 * Fetches a list of posts with pagination and filtering options.
 */
export async function getPosts({
  limit = 6,
  offset = 0,
  search,
  tag
}: GetPostsParams = {}): Promise<PostPageResponse | null> {
  if (offset % limit !== 0) {
    throw new Error(`Invalid offset: ${offset}. It must be a multiple of limit: ${limit}`);
  }
  const url = new URL('posts/', baseURL);
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
      return null;
    }
    return await response.json();
  } catch (error) {
    // @ts-ignore: Ignore the type error for 'unknown' type
    console.error(error.message);
    return null;
  }
}

/**
 * Parses URL search parameters into an object.
 */
export function parseUrlParams(url: string | null | undefined): GetPostsParams {
  if (!url) {
    throw new TypeError('URL is undefined');
  }
  const params = new URL(url).searchParams; // Extract search parameters from the URL
  const limitRaw = params.get('limit');
  const offsetRaw = params.get('offset');
  const result = {
    limit: limitRaw ? +limitRaw : undefined,
    offset: offsetRaw ? +offsetRaw : undefined,
    search: params.get('search') || undefined,
    tag: params.get('tag') || undefined
  };
  return result;
}

export function normalizeParam(
  value: string | string[] | LocationQueryValue | LocationQueryValue[] | null | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0] ?? undefined;
  if (typeof value === 'string') return value;
  return undefined;
}
