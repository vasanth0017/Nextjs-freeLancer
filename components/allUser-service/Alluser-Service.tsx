"use client";

import { getAllUserService } from "@/services/apicall";
import { Card, CardHeader, CardTitle, CardContent } from "@camped-ui/card";
import {
  ArrowLeft,
  EllipsisVertical,
  ExternalLink,
  Link,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function AlluserService() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  //handle router
  const handleRedirect = () => {
    router.push("/dashboard");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response: any = await getAllUserService();
        setUsers(response);
      } catch (error) {
        setError("Error fetching user details.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }
  return (
    <>
      <div className="p-3 justify-items-end w-full ">
        <Button onClick={handleRedirect}>
          <ArrowLeft className="h-4 w-4 mr-1 " />
          dashboard
        </Button>
      </div>
      <div className="grid grid-cols-1 p-3 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {users.map((service: any, index: number) => (
          <Card
            key={index}
            className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg"
          >
            {/* Email Initials */}
            <div className="absolute -top-4 left-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-lg shadow-md border-4 border-white">
              {service.email.substring(0, 2).toUpperCase()}
            </div>
            {/* Card Header */}
            <CardHeader className="pb-4 mt-6">
              <div className="flex flex-col gap-2">
                <CardTitle className="text-xl font-bold text-gray-800 truncate">
                  {service.projectTitle}
                </CardTitle>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    service.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {service.status}
                </span>
              </div>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Amount</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${service.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  View Portfolio
                  <ExternalLink className="w-4 h-4" />
                </a>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
