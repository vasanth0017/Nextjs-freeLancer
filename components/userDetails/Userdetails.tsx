"use client";

import { getAccountDetails, UpdateAccountDetails } from "@/services/apicall";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function UserDetail({ email }: { email: string }) {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const[isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAccountDetails(email);
        setUsers(response);
      } catch (error) {
        setError("Error fetching user details.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (email) fetchData();
  }, [email]);
  
  const handleSave = async (index: number) => {
    const user = users[index];
    if (!user?.id) return;
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const phoneNumber = user.phoneNumber;
    const address = user.address;
    try {
      setLoading(true);
      const updatedUser = await UpdateAccountDetails({
        id,
        email,
        name,
        phoneNumber,
        address,
      });
      toast.success("Changes Saved")
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
      setEditIndex(null);
    } catch (error) {
      toast.error("Error updating user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    setUsers(updatedUsers);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6  mt-10">
        <div className="flex items-center justify-center sm:h-[65vh] md:h-[80vh] col-span-full">
          <Loader className="animate-spin w-10 h-10 text-gray-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-secondary shadow-md rounded-lg">
      <h1 className="text-2xl font-bold  mb-6">Account Details</h1>
      {users.map((user: any, index: any) => (
        <div key={user.id} className="border-b pb-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {editIndex === index ? (
                <>
                  <Input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                  <Input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      handleChange(index, "email", e.target.value)
                    }
                    className="border p-2 w-full rounded mt-2"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-700">{user.email}</p>
                </>
              )}
            </div>
            {editIndex === index ? (
              <Button 
                onClick={() => handleSave(index)}
                className="px-4 py-2 rounded"
              >
                {loading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  "Save"
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setEditIndex(index)}
                className="px-4 py-2 rounded"
              >
                Edit
              </Button>
            )}
          </div>

          {editIndex === index ? (
            <>
              <Label className="block mt-4">
                <strong>Phone:</strong>
                <Input
                  type="text"
                  value={user.phoneNumber}
                  onChange={(e) => handleChange(index, "phoneNumber", e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </Label>

              <Label className="block mt-2">
                <strong>Address:</strong>
                <Input
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    handleChange(index, "address", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                />
              </Label>
            </>
          ) : (
            <>
              <p className="mt-4">
                <strong>Phone :</strong> {user.phoneNumber || "Not provided"}
              </p>
              <p>
                <strong>Address :</strong> {user.address || "Not provided"}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
