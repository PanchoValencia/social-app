import { create } from "zustand";
import type { User, Friend } from "@/src/types";
import { fetchCurrentUser, fetchFriends } from "@/src/lib/mockApi";

interface UserState {
  currentUser: User | null;
  friends: Friend[];
  loadingUser: boolean;
  loadingFriends: boolean;

  loadCurrentUser: () => Promise<void>;
  loadFriends: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  friends: [],
  loadingUser: false,
  loadingFriends: false,

  loadCurrentUser: async () => {
    set({ loadingUser: true });
    const res = await fetchCurrentUser();
    if (res.ok) set({ currentUser: res.data });
    set({ loadingUser: false });
  },

  loadFriends: async () => {
    set({ loadingFriends: true });
    const res = await fetchFriends();
    if (res.ok) set({ friends: res.data });
    set({ loadingFriends: false });
  },
}));