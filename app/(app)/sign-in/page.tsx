"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Reset error message

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirection
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/admin"); // Redirect on successful login
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
