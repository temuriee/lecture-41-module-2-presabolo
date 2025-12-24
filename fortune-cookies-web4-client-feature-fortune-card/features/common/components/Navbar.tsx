"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkBase =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all";

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  const activeClasses =
    "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white";
  const normalClasses =
    "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700";

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-900 h-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🔮</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fortune Cookie
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex gap-6">
            <Link
              href="/"
              className={`${linkBase} ${
                isActive("/") ? activeClasses : normalClasses
              }`}
            >
              🏠 Home
            </Link>

            <Link
              href="/templates"
              className={`${linkBase} ${
                isActive("/templates") ? activeClasses : normalClasses
              }`}
            >
              📚 Templates
            </Link>

            <Link
              href="/saved"
              className={`${linkBase} ${
                isActive("/saved") ? activeClasses : normalClasses
              }`}
            >
              💾 Saved
            </Link>

            <Link
              href="/create"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
            >
              ➕ Create
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
