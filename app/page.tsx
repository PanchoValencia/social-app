"use client";

import { useEffect } from "react";
import { usePostsStore } from "@/src/store/postsStore";
import { useUserStore } from "@/src/store/userStore";
import PostCard from "@/src/components/PostCard";
import { PostSkeleton } from "@/src/components/Skeleton";
import Image from "next/image";

export default function Page() {
  const { feed, loadingFeed, loadFeed } = usePostsStore();
  const { friends, loadCurrentUser, loadFriends } = useUserStore();

  useEffect(() => {
    loadFeed();
    loadCurrentUser();
    loadFriends();
  }, [loadFeed, loadCurrentUser, loadFriends]);

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl" style={{ color: "var(--color-text-primary)" }}>
          Your feed
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          {"What's happening in your circle"}
        </p>
      </div>

      {/* Friends strip */}
      {friends.length > 0 && (
        <section className="animate-fade-up stagger-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-muted)" }}>
            Friends online
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {friends
              .filter((f) => f.isOnline)
              .map((friend) => (
                <div key={friend.id} className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="relative">
                    <Image
                      src={friend.avatar}
                      alt={friend.displayName}
                      width={44}
                      height={44}
                      className="rounded-full"
                      style={{ border: "2px solid var(--color-border)" }}
                    />
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                      style={{ backgroundColor: "var(--color-success)", border: "2px solid var(--color-bg)" }}
                    />
                  </div>
                  <span className="text-[10px] max-w-[48px] truncate" style={{ color: "var(--color-text-muted)" }}>
                    {friend.displayName.split(" ")[0]}
                  </span>
                </div>
              ))}
          </div>
        </section>
      )}

      <hr style={{ borderColor: "var(--color-border)" }} />

      {/* Posts */}
      <section className="space-y-4">
        {loadingFeed ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : feed.length === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--color-text-muted)" }}>
            <p className="font-display text-2xl">Nothing here yet</p>
            <p className="text-sm mt-2">Add some friends to see their posts.</p>
          </div>
        ) : (
          feed.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              animationClass={`stagger-${Math.min(i + 1, 5)}`}
            />
          ))
        )}
      </section>
    </div>
  );
}