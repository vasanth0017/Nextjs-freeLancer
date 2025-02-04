"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 bg-white p-6 shadow rounded-lg">
        <h2 className="text-center text-2xl font-semibold">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</Link>
        </div>
        <div className="text-center text-sm">
          Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
