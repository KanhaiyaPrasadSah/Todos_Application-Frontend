"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/authStores";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function forgetPassword() {
  const router = useRouter();
  const { forgetPassword, isLoading } = useAuthStore();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToGeneratePassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await forgetPassword({
        email: e.target.email.value,
        newPassword: e.target.newPassword.value,
      });
      if(res.message) {
        router.push("/");
      }
    } catch (err) {
      setError(err?.response.data.message || "Login failed. Please check your credentials.");
    }  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-violet-900 to-indigo-900 px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/40 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Lock size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-2xl text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-1">Generate Your New Password</p>
          </div>

          {error && (
            <p className="mb-4 text-sm font-medium text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
              {error}
            </p>
          )}

          <form onSubmit={handleToGeneratePassword} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Enter Your Registered Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Enter Your new Password
                </label>
                
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "newPassword"}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Primary button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer group mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-2.5 shadow-lg shadow-indigo-600/25 transition active:scale-[0.98]"
            >
              {isLoading ? "Signing in..." : "Generate new Password"}
              {!isLoading && (
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">Already Know the Password?</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Secondary button */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl py-2.5 hover:bg-indigo-50 transition active:scale-[0.98]"
          >
            Sign in
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}