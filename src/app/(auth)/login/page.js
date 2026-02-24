"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  return (
    <div className="w-200 max-w-md rounded-2xl bg-white shadow-xl border">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">
            Portal Admin Harga Komoditas Pangan Kota Palas
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@palas.go.id"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800
                focus:border-amber-600 focus:ring-amber-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800
                focus:border-amber-600 focus:ring-amber-600"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600"
              />
              Remember me
            </label>

            <a href="#" className="font-medium text-amber-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            onClick={() => router.push("/dashboard/pasar")}
            className="w-full rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white
          hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Kota Palas Admin System
        </p>
      </div>
    </div>
  );
}
