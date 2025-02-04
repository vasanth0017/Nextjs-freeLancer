"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/apicall";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function ResetPasswordForm() {
  const [Newpassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await resetPassword(token, Newpassword);
      toast.success("Password reset successful! Redirecting...");
      setTimeout(() => router.push("/sign-in"), 2000);
    } catch (error) {
      setMessage("Invalid token or error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={Newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <Button type="submit" className=" p-2 rounded w-full">
          {loading ? (
            <Loader className="animate-spin w-5 h-5" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="animate-spin w-8 h-8" />
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
