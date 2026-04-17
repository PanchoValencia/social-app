import { create } from "zustand";
import type { Post, Comment } from "@/src/types";
import { fetchFeed, fetchPost, fetchComments, toggleLike } from "@/src/lib/mockApi";

interface PostsState {
  feed: Post[];
  selectedPost: Post | null;
  comments: Comment[];
  loadingFeed: boolean;
  loadingPost: boolean;
  loadingComments: boolean;

  loadFeed: () => Promise<void>;
  loadPost: (id: string) => Promise<void>;
  loadComments: (postId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  feed: [],
  selectedPost: null,
  comments: [],
  loadingFeed: false,
  loadingPost: false,
  loadingComments: false,

  loadFeed: async () => {
    set({ loadingFeed: true });
    const res = await fetchFeed();
    if (res.ok) set({ feed: res.data });
    set({ loadingFeed: false });
  },

  loadPost: async (id: string) => {
    set({ loadingPost: true, selectedPost: null });
    const res = await fetchPost(id);
    if (res.ok) set({ selectedPost: res.data });
    set({ loadingPost: false });
  },

  loadComments: async (postId: string) => {
    set({ loadingComments: true });
    const res = await fetchComments(postId);
    if (res.ok) set({ comments: res.data });
    set({ loadingComments: false });
  },

  likePost: async (postId: string) => {
    // Optimistic update
    const optimistic = (posts: Post[]) =>
      posts.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, stats: { ...p.stats, likes: p.stats.likes + (p.liked ? -1 : 1) } }
          : p
      );

    set((s) => ({
      feed: optimistic(s.feed),
      selectedPost:
        s.selectedPost?.id === postId
          ? {
              ...s.selectedPost,
              liked: !s.selectedPost.liked,
              stats: {
                ...s.selectedPost.stats,
                likes: s.selectedPost.stats.likes + (s.selectedPost.liked ? -1 : 1),
              },
            }
          : s.selectedPost,
    }));

    await toggleLike(postId);
  },
}));