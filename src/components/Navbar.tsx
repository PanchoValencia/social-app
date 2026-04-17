"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeSolid, UserIcon as UserSolid } from "@heroicons/react/24/solid";

const navItems = [
  { href: "/", label: "Feed", Icon: HomeIcon, ActiveIcon: HomeSolid },
  { href: "/profile", label: "Profile", Icon: UserIcon, ActiveIcon: UserSolid },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
      className="sticky top-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Wordmark */}
        <Link href="/" className="font-display text-xl" style={{ color: "var(--color-accent)" }}>
          Social App
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-2">
          {navItems.map(({ href, label, Icon, ActiveIcon }) => {
            const isActive = pathname === href;
            const Ic = isActive ? ActiveIcon : Icon;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150"
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                  backgroundColor: isActive ? "var(--color-accent-subtle)" : "transparent",
                }}
              >
                <Ic className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}