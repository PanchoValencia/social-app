import type { User, Friend, Post, Comment, ApiResponse, PaginatedResponse } from "@/src/types";

// simulate API delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Mocked Data
const ME: User = {
  id: "u_me",
  username: "alex.rivers",
  displayName: "Alex Rivers",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=alex",
  bio: "Designer & developer. Building things that matter. Coffee enthusiast ☕",
  location: "Guadalajara, MX",
  joinedAt: "2022-03-15T00:00:00Z",
  stats: { posts: 48, friends: 312, following: 97 },
};

const FRIENDS: Friend[] = [
  {
    id: "u_1",
    username: "mia.chen",
    displayName: "Mia Chen",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=mia",
    mutualFriends: 14,
    isOnline: true,
  },
  {
    id: "u_2",
    username: "jorge.vega",
    displayName: "Jorge Vega",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=jorge",
    mutualFriends: 8,
    isOnline: false,
  },
  {
    id: "u_3",
    username: "sara.k",
    displayName: "Sara Kowalski",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=sara",
    mutualFriends: 22,
    isOnline: true,
  },
  {
    id: "u_4",
    username: "liam.o",
    displayName: "Liam O'Brien",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=liam",
    mutualFriends: 5,
    isOnline: false,
  },
  {
    id: "u_5",
    username: "priya.n",
    displayName: "Priya Nair",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=priya",
    mutualFriends: 19,
    isOnline: true,
  },
];

const POSTS: Post[] = [
  {
    id: "p_1",
    author: {
      id: "u_1",
      username: "mia.chen",
      displayName: "Mia Chen",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=mia",
    },
    content:
      "Just wrapped up a month-long design sprint. The hardest part wasn't the pixels — it was convincing stakeholders that white space isn't 'empty.' Negative space is intentional. It breathes. It guides. 🎨",
    createdAt: "2024-06-10T09:15:00Z",
    stats: { likes: 84, comments: 12, shares: 6 },
    liked: true,
    tags: ["design", "ux", "process"],
  },
  {
    id: "p_2",
    author: {
      id: "u_2",
      username: "jorge.vega",
      displayName: "Jorge Vega",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=jorge",
    },
    content:
      "Hot take: most performance optimizations in frontend apps are solving the wrong problem. Fix your data fetching strategy first, then worry about bundle size. I spent 3 days shaving 10kb only to realize one unindexed DB query was the real culprit.",
    createdAt: "2024-06-09T18:42:00Z",
    stats: { likes: 201, comments: 34, shares: 41 },
    liked: false,
    tags: ["webdev", "performance", "databases"],
  },
  {
    id: "p_3",
    author: {
      id: "u_3",
      username: "sara.k",
      displayName: "Sara Kowalski",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=sara",
    },
    content:
      "Visited the Sagrada Família for the first time and I can't stop thinking about how Gaudí used hyperboloid structures decades before computational design tools. Pure genius encoded in stone. Architecture is just frozen software.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    createdAt: "2024-06-09T11:05:00Z",
    stats: { likes: 317, comments: 28, shares: 55 },
    liked: false,
    tags: ["architecture", "travel", "design"],
  },
  {
    id: "p_4",
    author: {
      id: "u_5",
      username: "priya.n",
      displayName: "Priya Nair",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=priya",
    },
    content:
      "Started learning Rust last weekend. Coming from TypeScript, the borrow checker feels like pair programming with an extremely pedantic senior dev who is always right and never wrong. Humbling, honestly.",
    createdAt: "2024-06-08T22:30:00Z",
    stats: { likes: 143, comments: 47, shares: 18 },
    liked: true,
    tags: ["rust", "typescript", "learning"],
  },
  {
    id: "p_5",
    author: {
      id: "u_4",
      username: "liam.o",
      displayName: "Liam O'Brien",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=liam",
    },
    content:
      "Reminder that code reviews are not about finding bugs. They're about knowledge sharing, maintaining consistency, and building a shared mental model of the system. The bugs are a bonus.",
    createdAt: "2024-06-07T14:20:00Z",
    stats: { likes: 529, comments: 61, shares: 112 },
    liked: false,
    tags: ["engineering", "culture", "teamwork"],
  },
];

const COMMENTS: Record<string, Comment[]> = {
  p_1: [
    {
      id: "c_1",
      author: { id: "u_me", username: "alex.rivers", displayName: "Alex Rivers", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=alex" },
      content: "100%. I have this argument in every design review. Bookmarking this post.",
      createdAt: "2024-06-10T09:45:00Z",
      likes: 7,
    },
    {
      id: "c_2",
      author: { id: "u_2", username: "jorge.vega", displayName: "Jorge Vega", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=jorge" },
      content: "The stakeholder communication piece is underrated. Great designers are also great negotiators.",
      createdAt: "2024-06-10T10:10:00Z",
      likes: 12,
    },
  ],
  p_2: [
    {
      id: "c_3",
      author: { id: "u_5", username: "priya.n", displayName: "Priya Nair", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=priya" },
      content: "I feel this in my soul. N+1 queries have caused me more pain than any JS bundle.",
      createdAt: "2024-06-09T19:00:00Z",
      likes: 23,
    },
  ],
  p_3: [],
  p_4: [
    {
      id: "c_4",
      author: { id: "u_1", username: "mia.chen", displayName: "Mia Chen", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=mia" },
      content: "The borrow checker description is perfect 😂 keep going, it clicks after week 2.",
      createdAt: "2024-06-08T23:00:00Z",
      likes: 18,
    },
  ],
  p_5: [
    {
      id: "c_5",
      author: { id: "u_3", username: "sara.k", displayName: "Sara Kowalski", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=sara" },
      content: "Sharing this with my whole team. Especially the 'shared mental model' part.",
      createdAt: "2024-06-07T15:00:00Z",
      likes: 31,
    },
  ],
};

// API Functions

export async function fetchCurrentUser(): Promise<ApiResponse<User>> {
  await delay(400);
  return { data: ME, ok: true };
}

export async function fetchFriends(): Promise<ApiResponse<Friend[]>> {
  await delay(500);
  return { data: FRIENDS, ok: true };
}

export async function fetchFeed(page = 1): Promise<PaginatedResponse<Post>> {
  await delay(600);
  return {
    data: POSTS,
    ok: true,
    pagination: { page, perPage: 10, total: POSTS.length, hasMore: false },
  };
}

export async function fetchPost(id: string): Promise<ApiResponse<Post>> {
  await delay(350);
  const post = POSTS.find((p) => p.id === id);
  if (!post) return { data: null as unknown as Post, ok: false, message: "Post not found" };
  return { data: post, ok: true };
}

export async function fetchComments(postId: string): Promise<ApiResponse<Comment[]>> {
  await delay(400);
  return { data: COMMENTS[postId] ?? [], ok: true };
}

export async function toggleLike(postId: string): Promise<ApiResponse<{ liked: boolean; likes: number }>> {
  await delay(200);
  const post = POSTS.find((p) => p.id === postId);
  if (!post) return { data: { liked: false, likes: 0 }, ok: false };
  post.liked = !post.liked;
  post.stats.likes += post.liked ? 1 : -1;
  return { data: { liked: post.liked, likes: post.stats.likes }, ok: true };
}