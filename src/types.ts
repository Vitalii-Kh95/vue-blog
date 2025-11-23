// You can write types for your project here.

export interface ErrorResponse {
  detail: string;
}

export interface RegisterErrorResponse {
  username?: string;
  email?: string;
  password?: string;
  non_field_errors?: string;
}

export interface GetPostsParams {
  limit?: number;
  offset?: number;
  search?: string;
  tag?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  created_at: string;
  author: string;
  tags: Array<string>;
}

export interface Popup {
  id: symbol;
  message: string;
  type: 'alert-success' | 'alert-error' | 'alert-info';
}

// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }
