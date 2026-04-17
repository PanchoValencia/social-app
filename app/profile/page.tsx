"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/src/store/userStore";
import { ProfileSkeleton } from "@/src/components/Skeleton";
import { formatCount } from "@/src/lib/utils";

export default function ProfilePage() {
  const { currentUser, friends, loadingUser, loadingFriends, loadCurrentUser, loadFriends } = useUserStore();

  useEffect(() => {
    loadCurrentUser();
    loadFriends();
  }, [loadCurrentUser, loadFriends]);

  if (loadingUser || !currentUser) return <ProfileSkeleton />;

  const joinYear = new Date(currentUser.joinedAt).getFullYear();

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Cover + avatar */}
      <div className="relative">
        <div
          className="h-36 rounded-[var(--radius-lg)]"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-subtle) 0%, var(--color-accent) 100%)",
          }}
        />
        <div className="absolute -bottom-6 left-5">
          <Image
            src={currentUser.avatar}
            alt={currentUser.displayName}
            width={72}
            height={72}
            className="rounded-full"
            style={{
              border: "4px solid var(--color-bg)",
              backgroundColor: "var(--color-surface)",
            }}
          />
        </div>
      </div>

      {/* Info block */}
      <div className="pt-8 px-1">
        <h1 className="font-display text-2xl" style={{ color: "var(--color-text-primary)" }}>
          {currentUser.displayName}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          @{currentUser.username}
        </p>
        <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {currentUser.bio}
        </p>

        <div className="flex flex-wrap gap-4 mt-3">
          {currentUser.location && (
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <MapPinIcon className="w-3.5 h-3.5" />
              {currentUser.location}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
            <CalendarDaysIcon className="w-3.5 h-3.5" />
            Joined {joinYear}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 divide-x rounded-[var(--radius-lg)]"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderColor: "var(--color-border)",
        }}
      >
        {[
          { label: "Posts", value: currentUser.stats.posts },
          { label: "Friends", value: currentUser.stats.friends },
          { label: "Following", value: currentUser.stats.following },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-5 gap-0.5">
            <span className="font-display text-2xl" style={{ color: "var(--color-text-primary)" }}>
              {formatCount(stat.value)}
            </span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Friends list */}
      <section>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--color-text-primary)" }}>
          Friends
          <span className="ml-2 font-normal" style={{ color: "var(--color-text-muted)" }}>
            ({friends.length})
          </span>
        </h2>

        {loadingFriends ? (
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Loading…
          </p>
        ) : (
          <ul className="space-y-3">
            {friends.map((friend, i) => (
              <li
                key={friend.id}
                className={`flex items-center gap-3 p-3 rounded-[var(--radius)] animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={friend.avatar}
                    alt={friend.displayName}
                    width={40}
                    height={40}
                    className="rounded-full"
                    style={{ border: "2px solid var(--color-border)" }}
                  />
                  {friend.isOnline && (
                    <span
                      className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: "var(--color-success)",
                        border: "2px solid var(--color-surface)",
                      }}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>
                    {friend.displayName}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    @{friend.username} · {friend.mutualFriends} mutual friends
                  </p>
                </div>

                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: friend.isOnline ? "var(--color-accent-subtle)" : "var(--color-surface-raised)",
                    color: friend.isOnline ? "var(--color-accent)" : "var(--color-text-muted)",
                  }}
                >
                  {friend.isOnline ? "Online" : "Offline"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}