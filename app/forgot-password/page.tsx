"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { forgotPassword } from "@/services/apicall";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      toast.success("You will receive a reset link.");
    } catch (error: any) {
      if (error.status === 404) {
        toast.error("User not found");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <Button type="submit" className="p-2 rounded">
          {loading ? (
            <Loader className="animate-spin w-5 h-5" />
          ) : (
            "Forgot Password"
          )}
        </Button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
