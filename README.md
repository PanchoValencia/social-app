# Social App

A minimal social app built with Next.js 14, Zustand, Tailwind CSS, and TypeScript.

---

## Setup

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## What I built

### Pages

| Route | Description |
|---|---|
| `/` | Friend feed with online-friends strip, post cards, like/share actions |
| `/profile` | Current user profile — avatar, bio, stats, friend list |
| `/posts/[id]` | Post detail with full content, image, tags, and comment thread |

### Architecture decisions

**Next.js App Router (file-based routing)**  
I used the App Router because it's the current standard in Next.js 14. Each page lives under `app/` and is a Client Component (`"use client"`) since we're relying on Zustand and browser-side state. In a production app you'd want Server Components fetching from a real API with proper caching.

**Zustand for state management**  
Two stores: `userStore` (current user + friends) and `postsStore` (feed + selected post + comments). Each store exposes async `load*` actions that call mock API functions. Stores are kept small and focused — no god-object pattern.

**Mock API layer (`lib/mockApi.ts`)**  
Every function simulates a network call with `await delay()` and returns a typed `ApiResponse<T>` wrapper. To connect to a real backend you only need to replace the function bodies — all types and store logic stay the same.

**Tailwind + CSS variables**  
`tailwind.config.ts` maps all semantic colors (`background`, `surface`, `accent`, etc.) to CSS custom properties. Light and dark themes are defined in `globals.css` under `:root` and `.dark`. To add a new theme, add a new CSS class — no JS changes needed.

**Optimistic UI for likes**  
The `likePost` action in `postsStore` updates the local state immediately, then confirms with the mock API. This pattern keeps the UI snappy and mirrors what you'd do with a real server.

### Data structures

```
User          → id, username, displayName, avatar, bio, location, joinedAt, stats
Friend        → subset of User + mutualFriends, isOnline
Post          → id, author (partial User), content, image?, createdAt, stats, liked, tags
Comment       → id, author (partial User), content, createdAt, likes
```

All structures are in `types/index.ts` and exported as TypeScript interfaces — the single source of truth.

---

## Assumptions

- Auth is out of scope; the "current user" is hardcoded in `mockApi.ts`
- Pagination exists in the response shape but only one page of data is shown (the feed is short by design)
- Dark mode toggle is wired in the CSS (just add the `dark` class to `<html>`) but the UI toggle button is left as a future task
- No form submission for new posts or comments — placeholder state is implied by the comment count

---

## What I'd add with more time

- Dark mode toggle button in the Navbar
- Infinite scroll / pagination on the feed
- Compose post modal
- Auth flow (login/logout)
- Unit tests for store actions
- E2E tests with Playwright for the three main flows

---

## Challenges

The only non-obvious part was keeping Tailwind's JIT from purging CSS variable references. The fix was to reference them via Tailwind's `theme.extend.colors` mapping (`"var(--color-X)"`) rather than using them inline in arbitrary `[]` values — which works but breaks the design token abstraction.