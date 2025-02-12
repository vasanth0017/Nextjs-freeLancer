"use client";
import { getServiceDetails } from "@/services/apicall";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Chat from "../chat/chat";
import { Card, CardHeader, CardTitle, CardContent } from "@camped-ui/card";
import { Mail, Phone, MapPin, Calendar, Briefcase, User } from "lucide-react";

export default function Details({
  userId,
  senderName,
}: {
  userId: any;
  senderName: string
}) {
  const searchParams = useSearchParams();
  const serviceId = searchParams?.get("serviceId") || "";
  const [serviceData, setServiceData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState(false);
 
  //fetch free-launcer service details
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

  
  //handle client chat
  const handleClientChat = () => {
    setChat(true);
  };
  return (
    <div className="relative min-h-screen p-6 bg-background">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{serviceData?.name}</CardTitle>
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
                {serviceData?.address}, {serviceData?.state}, {serviceData?.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 " />
              <a href={serviceData?.linkedin} className="text-blue-600 hover:underline">
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
            <p className="text-gray-700">{serviceData?.projectDescription}</p>
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
              {serviceData?.skills?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <p>{serviceData?.categories}</p>
          </div>
        </CardContent>
      </Card>

      {/* Fixed Chat Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={handleClientChat}
          size="lg"
          className="shadow-lg"
        >
          Chat with {serviceData?.name}
        </Button>
      </div>

      {/* Chat Component */}
      {chat && (
        <div className="fixed bottom-20 right-6 w-96">
          <Chat serviceData={serviceData} userId={userId} senderName={senderName} />
        </div>
      )}
    </div>
  );
}
