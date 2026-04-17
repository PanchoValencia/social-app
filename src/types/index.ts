// Core Data Structures
// These represent what a real API would return.

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  joinedAt: string;
  stats: {
    posts: number;
    friends: number;
    following: number;
  };
}

export interface Friend extends Pick<User, "id" | "username" | "displayName" | "avatar"> {
  mutualFriends: number;
  isOnline: boolean;
}

export interface Post {
  id: string;
  author: Pick<User, "id" | "username" | "displayName" | "avatar">;
  content: string;
  image?: string;
  createdAt: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  liked: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  author: Pick<User, "id" | "username" | "displayName" | "avatar">;
  content: string;
  createdAt: string;
  likes: number;
}

// API Response Wrappers

export interface ApiResponse<T> {
  data: T;
  ok: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    perPage: number;
    total: number;
    hasMore: boolean;
  };
}