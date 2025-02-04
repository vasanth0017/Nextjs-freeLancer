"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { registerNewuser } from "@/services/apicall";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  // const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const[loading, setLoading] = useState(false);
  const router = useRouter();


  //handle create account
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      console.log({ email });
      await registerNewuser({ email, password, role, name, image: null });
      toast.success("Account created successfully");
    } catch (error:any) {
      toast.error("Error creating account");
      return setError(error.message);
      
    }
    finally{
      setLoading(false);
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 bg-white p-6 shadow rounded-lg">
        <h2 className="text-center text-2xl font-semibold">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload
          <div>
            <Label htmlFor="image">Profile Image</Label>
            <Input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div> */}
          
          {/* Name */}
          <div>
            <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          {/* Email */}
          <div>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Password */}
          <div>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {/* Confirm Password */}
          <div>
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          {/* Role Selection */}
          <div>
            <Label htmlFor="role">Role</Label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-lg p-2">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
          {loading ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                'Create'
              )}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign In</a>
        </div>
      </div>
    </div>
  );
}
