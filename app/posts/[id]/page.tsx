"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { usePostsStore } from "@/src/store/postsStore";
import { PostSkeleton } from "@/src/components/Skeleton";
import { formatDistanceToNow } from "@/src/lib/utils";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { selectedPost, comments, loadingPost, loadingComments, loadPost, loadComments, likePost } =
    usePostsStore();

  useEffect(() => {
    if (id) {
      loadPost(id);
      loadComments(id);
    }
  }, [id, loadPost, loadComments]);

  if (loadingPost) {
    return (
      <div className="space-y-4">
        <PostSkeleton />
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className="text-center py-24 space-y-3">
        <p className="font-display text-2xl" style={{ color: "var(--color-text-primary)" }}>
          Post not found
        </p>
        <Link href="/" className="text-sm underline" style={{ color: "var(--color-accent)" }}>
          Back to feed
        </Link>
      </div>
    );
  }

  const post = selectedPost;

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
        style={{ color: "var(--color-text-muted)" }}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </button>

      {/* Post */}
      <article
        className="rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)]"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {/* Author */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <Image
            src={post.author.avatar}
            alt={post.author.displayName}
            width={48}
            height={48}
            className="rounded-full"
            style={{ border: "2px solid var(--color-border)" }}
          />
          <div>
            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              {post.author.displayName}
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              @{post.author.username} · {formatDistanceToNow(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="px-5 pb-4 text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <div className="relative w-full h-72">
            <Image src={post.image} alt="Post image" fill className="object-cover" />
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: "var(--color-accent-subtle)",
                  color: "var(--color-accent)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div
          className="flex items-center gap-6 px-5 py-4 mt-2"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <button
            onClick={() => likePost(post.id)}
            className="flex items-center gap-1.5 text-sm transition-all duration-150 hover:scale-110 active:scale-95"
            style={{ color: post.liked ? "var(--color-danger)" : "var(--color-text-muted)" }}
          >
            {post.liked ? <HeartSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
            <span className="font-medium tabular-nums">{post.stats.likes}</span>
          </button>

          <span
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ChatBubbleOvalLeftIcon className="w-5 h-5" />
            <span className="font-medium tabular-nums">{post.stats.comments}</span>
          </span>

          <button
            className="flex items-center gap-1.5 text-sm ml-auto transition-opacity hover:opacity-70"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span className="font-medium tabular-nums">{post.stats.shares}</span>
          </button>
        </div>
      </article>

      {/* Comments section */}
      <section>
        <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--color-text-primary)" }}>
          Comments
          <span className="ml-2 font-normal" style={{ color: "var(--color-text-muted)" }}>
            ({comments.length})
          </span>
        </h2>

        {loadingComments ? (
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Loading comments…
          </p>
        ) : comments.length === 0 ? (
          <div
            className="rounded-[var(--radius)] p-6 text-center"
            style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              No comments yet. Be the first.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment, i) => (
              <li
                key={comment.id}
                className={`flex gap-3 p-4 rounded-[var(--radius)] animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.displayName}
                  width={36}
                  height={36}
                  className="rounded-full flex-shrink-0"
                  style={{ border: "2px solid var(--color-border)" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {comment.author.displayName}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {formatDistanceToNow(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {comment.content}
                  </p>
                  <button
                    className="flex items-center gap-1 text-xs mt-2 transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <HeartIcon className="w-3.5 h-3.5" />
                    {comment.likes}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}