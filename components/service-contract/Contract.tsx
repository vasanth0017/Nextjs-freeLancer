"use client";
import {
  createContract,
  getAccountDetails,
  getServiceDetails,
  upadteContract,
} from "@/services/apicall";
import { Card, CardHeader, CardTitle, CardContent } from "@camped-ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Link,
  Building2,
  Edit2,
  ArrowLeft,
  Loader,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

export default function ServiceContract({
  email,
  userId,
  role,
}: {
  email: string;
  userId: string;
  role: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams?.get("serviceId") || "";
  const [serviceData, setServiceData] = useState<any>({});
  const [userDetail, setUserDetail] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [redirectLoad, setRedirectLoad] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("contract");

  //assign userId to id for send contract clientId
  const id = userId;
  //handle contract edit
  const handleChange = (index: number, field: string, value: string) => {
    setServiceData((prev: any) => {
      const updatedContracts = [...(prev.contracts || [])];
      updatedContracts[index] = {
        ...updatedContracts[index],
        [field]: value,
      };
      return { ...prev, contracts: updatedContracts };
    });
  };

  //fetch free-launcer service details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getServiceDetails(serviceId);
        const validData = response?.id
          ? response
          : Object.values(response).find((obj: any) => obj.id);

        setServiceData(validData || {});
      } catch (error) {
        setError("Error fetching service details.");
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
        setError(null);
        const response: any = await getAccountDetails(email);
        setUserDetail(response);
      } catch (error) {
        setError("Error fetching user details.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (email) fetchData();
  }, [email]);

  let isData = null;

  if (serviceData && serviceData.contracts && serviceData.contracts[0]) {
    isData = serviceData.contracts[0].userId || null;
  }

  const clientAmount =
    serviceData?.contracts?.[0]?.amount || serviceData.amount;
  const clientproposals = serviceData?.contracts?.[0]?.proposals || null;
  const clientagreement = serviceData?.contracts?.[0]?.agreement || null;

  //handle update contract changes
  const handleUpadate = async () => {
    const contractId = serviceData?.contracts?.[0]?.id || null;
    const userId = serviceData?.userId;
    const freelancerId = serviceId;
    const clientId = id;
    const title = serviceData?.projectTitle;
    const description = serviceData?.projectDescription;
    const amount = parseFloat(clientAmount);
    const currency = "INR";
    const status = serviceData?.status;
    const proposals = clientproposals;
    const agreement = clientagreement;

    try {
      await upadteContract({
        contractId,
        userId,
        freelancerId,
        clientId,
        title,
        description,
        amount,
        currency,
        status,
        proposals,
        agreement,
      });
      toast.success("Successfully Updated");
    } catch (error) {
      toast.error("Error during update the contract details");
    }
  };
  //save contract details
  const handlesave = async () => {
    if (!clientAmount) {
      toast.error("Please Give your Amount for this service");
    }
    const userId = serviceData?.userId;
    const freelancerId = serviceId;
    const clientId = id;
    const title = serviceData?.projectTitle;
    const description = serviceData?.projectDescription;
    const amount = parseFloat(clientAmount);
    const currency = "INR";
    const status = serviceData?.status;
    const proposals = clientproposals;
    const agreement = clientagreement;

    try {
      await createContract({
        userId,
        freelancerId,
        clientId,
        title,
        description,
        amount,
        currency,
        status,
        proposals,
        agreement,
      });
      toast.success("contract created successfully");
    } catch (error) {
      toast.error("error creating contract");
    }
  };
  //handle redirect
  const handleredirect = () => {
    setRedirectLoad(true);
    router.back();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs
        defaultValue="details"
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full gap-2  grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="freelancer">
            {" "}
            {role === "freelauncer" ? "Your Profile" : "Freelauncer Profile"}
          </TabsTrigger>
          <TabsTrigger value="client">
            {" "}
            {role === "client" ? "Your Profile" : "Client Profile"}
          </TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Project Title</h3>
                  <p className="text-gray-700">{serviceData?.projectTitle}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">
                    {serviceData?.projectDescription}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <p className="text-gray-700">{serviceData?.category}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {serviceData?.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="freelancer" className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {role === "freelauncer"
                  ? "Your Profile"
                  : "Freelauncer Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {serviceData?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {serviceData?.name}
                    </h3>
                    <p className="text-gray-600">Freelancer</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{serviceData?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{serviceData?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{serviceData?.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>{serviceData?.age} years old</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="w-5 h-5 text-gray-500" />
                    <a
                      href={serviceData?.linkedin}
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="client" className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {role === "client" ? "Your Profile" : "Client Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userDetail.map((user: any, index: any) => (
                <div key={user.id} className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{user?.name}</h3>
                      <p className="text-gray-600">{user?.company}</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span>{user?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-500" />
                      <span>{user?.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{user?.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>{user?.age} years old</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contract" className="mt-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Contract Details
              </CardTitle>
              {isData ? (
                <Button
                  variant="outline"
                  onClick={handleUpadate}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Save Changes
                </Button>
              ) : (
                ""
              )}
            </CardHeader>
            <CardContent>
              {serviceData?.contracts && serviceData.contracts.length > 0 ? (
                serviceData.contracts.map((data: any, index: number) => (
                  <div key={index} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-2">
                          Freelancer Amount
                        </h3>
                        <p className="text-2xl font-bold text-green-600">
                          ${serviceData?.amount || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Client Amount</h3>
                        <Input
                          value={data.amount || ""}
                          onChange={(e) =>
                            handleChange(index, "amount", e.target.value)
                          }
                          placeholder="Your Quote for this service"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Proposals</h3>
                      <Textarea
                        value={data.proposals || ""}
                        onChange={(e) =>
                          handleChange(index, "proposals", e.target.value)
                        }
                        placeholder="Enter proposals"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Agreement</h3>
                      <Textarea
                        value={data.agreement || ""}
                        onChange={(e) =>
                          handleChange(index, "agreement", e.target.value)
                        }
                        placeholder="Enter agreement details"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ))
              ) : (
                // Show Empty Input Fields if No Contract Exists
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Freelancer Amount</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ${serviceData?.amount}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Client Amount</h3>
                      <Input
                        value=""
                        onChange={(e) =>
                          handleChange(0, "amount", e.target.value)
                        }
                        placeholder="Your Quote for this service"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Proposals</h3>
                    <Textarea
                      value=""
                      onChange={(e) =>
                        handleChange(0, "proposals", e.target.value)
                      }
                      placeholder="Enter proposals"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Agreement</h3>
                    <Textarea
                      value=""
                      onChange={(e) =>
                        handleChange(0, "agreement", e.target.value)
                      }
                      placeholder="Enter agreement details"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex w-full justify-between">
        <Button variant="secondary" onClick={handleredirect}>
          <ArrowLeft className="h-4 w-4 mr-1 " />
          {redirectLoad ? <Loader className="animate-spin w-5 h-5" /> : "Back"}
        </Button>
        {activeTab === "contract" && !isData ? (
          <Button onClick={handlesave}>Save</Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
