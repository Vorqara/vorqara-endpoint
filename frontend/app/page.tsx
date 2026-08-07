"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = response.data;

      localStorage.setItem("vorqara_access_token", accessToken);

      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Unable to sign in. Please check your credentials and try again.";

      setError(
        Array.isArray(message) ? message.join(", ") : message,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0F172A] lg:grid lg:grid-cols-[40%_60%]">
      {/* =========================================================
          LEFT BRAND PANEL
      ========================================================= */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#0F172A] lg:flex lg:flex-col">
        {/* Subtle blue top accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[#2563EB]" />

        {/* Decorative security grid / wave */}
        <div
          className="pointer-events-none absolute -bottom-24 -left-20 h-[360px] w-[620px] opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(37,99,235,0.5) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 72%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 px-11 pt-9">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/icon/vorqara-icon-white.svg"
              alt="Vorqara"
              width={40}
              height={40}
              priority
              className="h-10 w-10"
            />

            <span className="text-[27px] font-semibold tracking-[-0.04em] text-white">
              Vorqara
            </span>
          </div>
        </div>

        {/* Brand message */}
        <div className="relative z-10 flex flex-1 items-center px-11">
          <div className="max-w-[480px] -translate-y-3">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
              Vorqara Endpoint
            </p>

            <h1 className="text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] text-white xl:text-[48px]">
              Secure every endpoint.
              <span className="mt-1 block text-[#3B82F6]">
                See everything clearly.
              </span>
            </h1>

            <div className="mt-7 h-[2px] w-12 bg-[#2563EB]" />

            <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-slate-300">
              Centralized visibility, control, and protection across your
              organization&apos;s endpoints.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-11 pb-7">
          <div className="mb-5 h-px w-full max-w-[360px] bg-slate-700/70" />

          <p className="text-xs text-slate-500">
            Vorqara Endpoint
          </p>
        </div>
      </section>

      {/* =========================================================
          RIGHT AUTHENTICATION PANEL
      ========================================================= */}
      <section className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-10 sm:px-10 lg:px-16">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-14 flex items-center gap-3 lg:hidden">
            <Image
              src="/brand/icon/vorqara-icon-blue.svg"
              alt="Vorqara"
              width={36}
              height={36}
              priority
              className="h-9 w-9"
            />

            <span className="text-2xl font-semibold tracking-[-0.04em] text-[#0F172A]">
              Vorqara
            </span>
          </div>

          {/* Heading */}
          <div className="mb-9">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2563EB]">
              Vorqara Endpoint
            </p>

            <h2 className="text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#0F172A]">
              Welcome back
            </h2>

            <p className="mt-3 text-[15px] leading-6 text-slate-500">
              Sign in to access your endpoint security console.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#0F172A]"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="h-[50px] w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#0F172A]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="h-[50px] w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-[50px] w-full rounded-lg bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Security footer */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-center gap-2 text-center">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-slate-400"
              >
                <path
                  d="M12 3L20 6V11C20 16.2 16.6 20.2 12 21C7.4 20.2 4 16.2 4 11V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-xs text-slate-400">
                Protected by Vorqara security infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}