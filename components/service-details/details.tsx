"use client";
import { getServiceDetails } from "@/services/apicall";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Chat from "../chat/chat";

export default function Details() {
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
    <div>
      <Button onClick={handleClientChat}>Chat</Button>
      {chat && <Chat serviceData={serviceData} />}
    </div>
  );
}
