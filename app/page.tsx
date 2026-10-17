
"use client";

import { useState } from "react";
import { login_request } from "./apiCall";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const login = async () => {
    const res = await login_request(username, password)

    if (res){
      localStorage.setItem("token", res.access_token)
      toast.success("Login successful")
      router.push("/master")
    }else {
      toast.error("Incorrect credentials")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 py-12">
      <Toaster />
      <form
        className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60"
        onSubmit={(event) => {
          event.preventDefault();
          void login();
        }}
      >
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">ERP workspace</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to manage your unit of measure records.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              id="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>

        <button className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}
