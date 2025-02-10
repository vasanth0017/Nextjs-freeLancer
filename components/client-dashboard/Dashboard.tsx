"use client";

import { Card, CardContent } from "@camped-ui/card";
import {
  ChartNoAxesGantt,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Edit,
  EllipsisVertical,
  XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@camped-ui/dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import service from "../my-service/service";
import Link from "next/link";
import { convertToIST } from "@/lib/timeUtils";

type contractDetail = {
  title?: string;
  description?: string;
  amount?: number;
  currency?: string;
  status?: string;
  freelancerId?: string;
  createdAt?: string;
};
interface allDetails {
  contractDetails: contractDetail[];
}
export default function ClientDashboard({ contractDetails }: allDetails) {
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  const createTime = contractDetails.map(detail => detail.createdAt)

return (
    <div className="grid p-3 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-7">
      {contractDetails?.map((item: contractDetail, ind: number) => (
        <Card
          key={ind}
          className="group hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
          <div className="flex w-full justify-end p-3">
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Option</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent
                side="bottom"
                className="w-fit"
                align="end"
                forceMount
              >
                <DropdownMenuItem className="hover:cursor-pointer  h-8">
                  <Link
                    href={`/service-contract?serviceId=${item?.freelancerId} `}
                    className="flex items-center"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Contract</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CardContent className="p-6">
            {/* Title Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold  transition-colors duration-300">
                {item.title}
              </h3>
            </div>
            {/* {convertToIST(item?.createdAt ?? "" )} */}
            {/* Description Section */}
            <div className="mb-4">
              <p className="text-gray-600 text-sm line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Amount Section */}
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
              <CircleDollarSign className="w-5 h-5 text-gray-500" />
              <span className="text-lg font-bold text-gray-900">
                {(item.amount ?? 0).toLocaleString()} {item.currency}
              </span>
            </div>

            {/* Status Section */}
            <div className="flex items-center gap-2">
              <Badge
                className={`px-3 py-1 flex items-center gap-1 ${getStatusColor(
                  item?.status ?? ""
                )}`}
              >
                {getStatusIcon(item.status ?? "")}
                {item.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
