"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStores";
import { User, LogOut, ChevronDown, Mail, BadgeCheck } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";

  return (
    <header className="w-full bg-gradient-to-br from-indigo-950 via-violet-950 to-indigo-900 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
            <BadgeCheck size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white">ToDo Application</span>
        </Link>

        {/* Right side */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-300 hover:text-white transition px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 rounded-xl px-4 py-2 shadow-md shadow-indigo-500/25 transition active:scale-[0.98]"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/10 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold">
                {initials}
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-300 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-100 overflow-hidden">
                {/* Profile header */}
                <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-indigo-50 to-violet-50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-base font-semibold shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">
                      {user?.username || "User"}
                    </p>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                      <Mail size={12} />
                      {user?.email || "—"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="px-4 py-3 border-t border-slate-100">
                  <dl className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-slate-500">Username</dt>
                      <dd className="font-medium text-slate-900">{user?.username || "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-slate-500">Email</dt>
                      <dd className="font-medium text-slate-900 truncate max-w-[160px]" title={user?.email}>
                        {user?.email || "—"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-slate-500">User ID</dt>
                      <dd className="font-mono text-xs text-slate-500 truncate max-w-[160px]" title={user?.id}>
                        {user?.id || "—"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 p-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <User size={16} />
                    View full profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}