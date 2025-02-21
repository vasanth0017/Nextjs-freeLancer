"use client";
import { getAccountDetails, getServiceDetails } from "@/services/apicall";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Chat from "../chat/chat";
import { Card, CardHeader, CardTitle, CardContent } from "@camped-ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  User,
  Loader,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ProgressDemo } from "../progress-bar/progress-bar";

export default function Details({
  userId,
  senderName,
  role,
}: {
  userId: any;
  senderName: string;
  role?: "client" | "freelancer" | "user";
}) {
  const searchParams = useSearchParams();
  const serviceId = searchParams?.get("serviceId") || "";
  const [serviceData, setServiceData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState(false);
  const [redirectLoad, setRedirectLoad] = useState(false);
  const [userDetail, setUserDetail] = useState<any[]>([]);
  const router = useRouter();
  //this for restrict chat for others
  const freelauncer_Id =
    serviceData?.contracts?.[0]?.freelancerId === serviceData?.id;
  const client_id = serviceData?.contracts?.[0]?.clientId;
  const user_id = serviceData?.contracts?.[0]?.userId;
  const chatId =
    role === "client" ? client_id : role === "freelancer" ? user_id : undefined;

  //assume clinetid as user for get client details
  const user = serviceData?.contracts?.[0]?.clientId;
  const hours = serviceData?.contracts?.[0]?.dueDate;

  const oneDayInSeconds = hours * 60 * 60;
  // fetch free-launcer service details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getServiceDetails(serviceId);
        //data coming in array format so we get the object inside the array
        const validData = response?.id
          ? response
          : Object.values(response).find((obj: any) => obj.id);

        setServiceData(validData || {});
      } catch (error) {
        toast.error("Error fetching service details.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) fetchData();
  }, [serviceId]);

  //fetch user account details for save client information
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getAccountDetails({ id: user });
        setUserDetail(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);
  //handle client chat
  const handleClientChat = () => {
    setChat(true);
  };
  //handle redirect
  const handleredirect = () => {
    setRedirectLoad(true);
    router.back();
  };
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-full">
          <Loader className="animate-spin w-8 h-8 text-blue-600" />
        </div>
      ) : (
        <>
          <Button
            variant="secondary"
            onClick={handleredirect}
            className="w-fit mx-6 p-3"
          >
            {redirectLoad ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-1 " />
                Back
              </>
            )}
          </Button>
          <div className="relative min-h-screen p-6 bg-background">
            <div className="items-center justify-center mb-12">
              {role === "client" && !serviceData?.contracts?.length ? (
                <Button className="w-full transition-all duration-300">
                  <Link
                    href={`/service-contract?serviceId=${serviceData?.id}`}
                    className="flex items-center"
                  >
                    Create Contract
                  </Link>
                </Button>
              ) : (
                ""
              )}
              {serviceData?.contracts?.length ? (
                <div className="flex justify-between items-center  p-4 bg-secondary rounded-lg shadow-sm">
                  {/* Freelancer Section */}
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {serviceData?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Freelancer
                    </span>
                    <span className="text-sm font-semibold  mt-1">
                      {serviceData?.name}
                    </span>
                  </div>

                  {/* Status Badge and Progress */}
                  <div className="flex flex-col items-center w-full gap-2">
                    <div className="px-4 py-2 rounded-full bg-background border">
                      <span className="text-blue-600 font-medium">
                        {serviceData?.status}
                      </span>
                    </div>
                    {serviceData?.status === "pending" && (
                      <ProgressDemo durationInSeconds={oneDayInSeconds} />
                    )}
                  </div>
                  {/* Client Section */}
                  {userDetail?.map((data: any) => (
                    <div key={data.id} className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {data?.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        Client
                      </span>
                      <span className="text-sm font-semibold mt-1">
                        {data?.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {serviceData?.name}
                </CardTitle>
                <p className="">{serviceData?.projectTitle}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 " />
                    <span>{serviceData?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 " />
                    <span>{serviceData?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 " />
                    <span>
                      {serviceData?.address}, {serviceData?.state},{" "}
                      {serviceData?.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 " />
                    <a
                      href={serviceData?.linkedin}
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 " />
                    <span>Age: {serviceData?.age}</span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Project Details</h3>
                  <p className="text-gray-700">
                    {serviceData?.projectDescription}
                  </p>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 " />
                    <span>Status: {serviceData?.status}</span>
                  </div>
                  <p className="font-medium">Budget: ${serviceData?.amount}</p>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceData?.skills?.map(
                      (skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Categories</h3>
                  <p>{serviceData?.categories}</p>
                </div>
              </CardContent>
            </Card>
            {freelauncer_Id && chatId === userId ? (
              <div className="fixed bottom-6 right-6">
                <Button
                  onClick={handleClientChat}
                  size="lg"
                  className="shadow-lg"
                >
                  Chat with {serviceData?.name}
                </Button>
              </div>
            ) : (
              ""
            )}

            {/* Chat Component */}
            {chat && (
              <div className="fixed bottom-20 right-6 w-96">
                <Chat
                  serviceData={serviceData}
                  userId={userId}
                  senderName={senderName}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
