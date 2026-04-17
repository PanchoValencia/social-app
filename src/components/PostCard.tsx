"use client";

import Link from "next/link";
import Image from "next/image";
import { HeartIcon, ChatBubbleOvalLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import type { Post } from "@/src/types";
import { usePostsStore } from "@/src/store/postsStore";
import { formatDistanceToNow } from "@/src/lib/utils";

interface Props {
  post: Post;
  animationClass?: string;
}

export default function PostCard({ post, animationClass = "" }: Props) {
  const likePost = usePostsStore((s) => s.likePost);

  return (
    <article
      className={`rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] overflow-hidden animate-fade-up ${animationClass}`}
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    >
      {/* Author row */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Image
          src={post.author.avatar}
          alt={post.author.displayName}
          width={40}
          height={40}
          className="rounded-full"
          style={{ border: "2px solid var(--color-border)" }}
        />
        <div>
          <p className="text-sm font-semibold leading-tight" style={{ color: "var(--color-text-primary)" }}>
            {post.author.displayName}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            @{post.author.username} · {formatDistanceToNow(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Content */}
      <Link href={`/posts/${post.id}`} className="block px-5 pb-3 group">
        <p
          className="text-sm leading-relaxed group-hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {post.content}
        </p>
      </Link>

      {/* Image */}
      {post.image && (
        <Link href={`/posts/${post.id}`}>
          <div className="relative w-full h-56 mx-0">
            <Image src={post.image} alt="Post image" fill className="object-cover" />
          </div>
        </Link>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "var(--color-accent-subtle)", color: "var(--color-accent)" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div
        className="flex items-center gap-4 px-5 py-4 mt-1"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <button
          onClick={() => likePost(post.id)}
          className="flex items-center gap-1.5 text-sm transition-all duration-150 hover:scale-110 active:scale-95"
          style={{ color: post.liked ? "var(--color-danger)" : "var(--color-text-muted)" }}
        >
          {post.liked ? (
            <HeartSolid className="w-4 h-4" />
          ) : (
            <HeartIcon className="w-4 h-4" />
          )}
          <span className="font-medium tabular-nums">{post.stats.likes}</span>
        </button>

        <Link
          href={`/posts/${post.id}`}
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ChatBubbleOvalLeftIcon className="w-4 h-4" />
          <span className="font-medium tabular-nums">{post.stats.comments}</span>
        </Link>

        <button
          className="flex items-center gap-1.5 text-sm ml-auto transition-colors hover:opacity-70"
          style={{ color: "var(--color-text-muted)" }}
        >
          <ArrowUpTrayIcon className="w-4 h-4" />
          <span className="font-medium tabular-nums">{post.stats.shares}</span>
        </button>
      </div>
    </article>
  );
}