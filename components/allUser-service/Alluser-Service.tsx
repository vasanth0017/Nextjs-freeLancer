"use client";

import { getAllUserService } from "@/services/apicall";
import { Card, CardHeader, CardTitle, CardContent } from "@camped-ui/card";
import {
  ArrowLeft,
  EllipsisVertical,
  ExternalLink,
  Loader,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import FreelancerModal from "../freelauncer-portfolio/potfolio";
import Link from "next/link";

// Define session types
type User = {
  role?: "client" | "freelancer" | "user";
  email?: string;
};

type Session = {
  user?: User;
} | null;

interface AlluserServiceProps {
  session: Session;
}
interface ServiceData {
  id: string;
  contracts?: any[];
}

export default function AlluserService({ session }: AlluserServiceProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectLoad, setRedirectLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const router = useRouter();

  //handle router
  const handleRedirect = () => {
    setRedirectLoad(true);
    router.push("/dashboard");
  };

  //handle portfoli
  const handlePortfolioClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
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

  // Filter users based on either amount or location
  const filteredUsers = users.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      searchQuery === "" ||
      service.amount.toString().includes(query) ||
      service.address?.toLowerCase().includes(query) ||
      service.country?.toLowerCase().includes(query) ||
      service.projectTitle?.toLowerCase().includes(query) ||
      service.skills?.some((skill: any) =>
        skill.toLowerCase().trim().includes(query.trim())
      )
    );
  });

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-full">
          <Loader className="animate-spin w-8 h-8 text-blue-600" />
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-5 items-center p-3">
            <Button
              onClick={handleRedirect}
              className="flex items-center gap-2"
            >
              {redirectLoad ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </>
              )}
            </Button>

            {/* Single Search Input */}
            <div className="relative sm:32 lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 p-3 gap-10 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((service: any, index: number) => {
                const colors = [
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-red-500",
                  "bg-purple-500",
                  "bg-yellow-500",
                ];
                const bgColor = colors[index % colors?.length];
                return (
                  <Card
                    key={index}
                    className="relative group hover:shadow-2xl transition-all duration-300 border-0 bg-secondary backdrop-blur-lg p-6 rounded-xl shadow-lg"
                  >
                    {/* Email Initials */}

                    <div
                      className={`absolute -top-4 left-4 flex items-center justify-center h-12 w-12 rounded-full ${bgColor} text-white font-bold text-lg shadow-md border-4 border-white`}
                    >
                      {service.email.substring(0, 2).toUpperCase()}
                    </div>

                    {/* Card Header */}
                    <CardHeader className="pb-4 mt-6">
                      <div className="flex flex-col gap-2">
                        <CardTitle className="text-xl font-bold truncate">
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
                          <span className="text-gray-600 font-medium">
                            Amount
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ${service.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePortfolioClick(service);
                          }}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          View Portfolio
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                        >
                          <Link
                            href={`/service-details?serviceId=${service?.id}`}
                            className="flex items-center"
                          >
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No services found.
              </p>
            )}
          </div>
          {selectedService && (
            <FreelancerModal
              data={selectedService}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
}
