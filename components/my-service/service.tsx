"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { deleteService, getAccountDetails } from "@/services/apicall";
import {
  Loader,
  ExternalLink,
  EllipsisVertical,
  Plus,
  ArrowLeft,
  ChartNoAxesGantt,
  Delete,
  Trash,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@camped-ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@camped-ui/tooltip";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function MyServices({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectLoad, setRedirectLoad] = useState(false);
  const [redirectLoadpage, setRedirectLoadpage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  //handle router
  const handleRedirect = (action: "serviceList" | "addService") => {
    if (action === "serviceList") {
      setRedirectLoad(true);
      router.push("/service-listing");
    } else if (action === "addService") {
      setRedirectLoadpage(true);
      router.push("/manage-service");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response: any = await getAccountDetails(email);
        setUsers(response);
      } catch (error) {
        setError("Error fetching user details.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (email) fetchData();
  }, [email]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader className="animate-spin w-8 h-8 text-blue-600" />
        </div>
      ) : (
        <>
          <div className="p-3 flex justify-between  w-full ">
            <Button
              onClick={() => handleRedirect("serviceList")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1 " />
              {redirectLoad ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Service List"
              )}
            </Button>
            <Button
              onClick={() => handleRedirect("addService")}
              className="flex items-center gap-2"
            >
              <Plus />
              {redirectLoadpage ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Add service"
              )}
            </Button>
          </div>
          {users.flatMap((user) => user.services).length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <h2 className="text-gray-600 text-lg">
                No services found. Click &apos;Add Service&apos; to create one.
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 p-3 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {users.flatMap((user) =>
                user.services.map((service: any, index: number) => (
                  <Card
                    key={index}
                    className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg"
                  >
                    {/* Email Initials */}
                    <div className="absolute -top-4 left-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-lg shadow-md border-4 border-white">
                      {service.email.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <DropdownMenuTrigger asChild>
                                <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                              </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              Option
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <DropdownMenuContent
                          side="bottom"
                          className="w-fit"
                          align="end"
                          forceMount
                        >
                          <DropdownMenuItem className="hover:cursor-pointer flex items-center h-4 mb-1">
                            <Link
                              href={`/manage-service?serviceId=${service.id} `}
                              className="flex items-center"
                            >
                              <ChartNoAxesGantt className="mr-2 h-4 w-4" />
                              <span>Manage</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                ))
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
