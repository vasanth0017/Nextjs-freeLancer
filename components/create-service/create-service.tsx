"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import {
  addServiceList,
  deleteService,
  getServiceDetails,
  updateServiceDetail,
} from "@/services/apicall";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function ServiceForm({ userId }: { userId: string }) {
  const searchParams = useSearchParams();
  const serviceId = searchParams?.get("serviceId") || "";
  const router = useRouter();
  const [serviceData, setServiceData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [redirectLoad, setRedirectLoad] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");
  console.log(skills);

  //add skills
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      setSkills([...skills, input.trim()]);

      setInput("");
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  //fetch saved service details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getServiceDetails(serviceId);
        const validData = response?.id
          ? response
          : Object.values(response).find((obj: any) => obj.id);

        setServiceData(validData || {});
        setSkills(validData?.skills || []);
      } catch (error) {
        setError("Error fetching service details.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) fetchData();
  }, [serviceId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setServiceData((prev: any) => ({ ...prev, [name]: value }));
  };
  //handle changes
  const handleSave = async () => {
    try {
      setLoading(true);
      await updateServiceDetail({
        serviceId,
        ...serviceData,
        skills,
      });
      toast.success("Service details updated successfully!");
    } catch (error) {
      toast.error("Failed to update service details.");
      setLoading(false);
    }
    setLoading(false);
  };
  //handle create
  const handleCreate = async () => {
    try {
      const name = serviceData.name;
      const email = serviceData.email;
      const address = serviceData.address;
      const state = serviceData.state;
      const country = serviceData.country;
      const linkedin = serviceData.linkedin;
      const phoneNumber = serviceData.phoneNumber;
      const age = Number(serviceData.age);
      const categories = serviceData.categories;
      const projectTitle = serviceData.projectTitle;
      const projectDescription = serviceData.projectDescription;
      const url = serviceData.url;
      const status = serviceData.status;
      const amount = parseFloat(serviceData.amount);
      setLoading(true);
      await addServiceList({
        name,
        email,
        address,
        state,
        country,
        linkedin,
        phoneNumber,
        age,
        categories,
        projectTitle,
        projectDescription,
        url,
        status,
        amount,
        skills,
        userId,
      });
      toast.success("Service details created successfully!");
    } catch (error) {
      toast.error("Failed to update service details.");
      setLoading(false);
    }
    setLoading(false);
  };
  const handleredirect = () => {
    setRedirectLoad(true);
    router.back();
  };
  //handle delete
  const handleDelete = async () => {
    const serviceId = selectedServiceId;
    try {
      setLoading(true);
      await deleteService(serviceId);
      toast.success("Service Deleted Successfully");
      setDialogOpen(false);
      setSelectedServiceId(null);
      router.push("/my-services");
    } catch {
      toast.error("Error Deleting Service");
    }
  };

  if (serviceId && isLoading) {
    return (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6  mt-10">
        <div className="flex items-center justify-center sm:h-[65vh] md:h-[80vh] col-span-full">
          <Loader className="animate-spin w-10 h-10 " />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto bg-secondary shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6">
              {serviceId ? "Edit Service Details" : "Create Your Service"}
            </h1>
            <Button variant="secondary" onClick={handleredirect}>
              <ArrowLeft className="h-4 w-4 mr-1 " />
              {redirectLoad ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Back"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold  border-b pb-2">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className=" mb-2">First Name</Label>
                  <Input
                    name="name"
                    placeholder="Enter name"
                    value={serviceData.name || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
                <div>
                  <Label className=" mb-2">Email</Label>
                  <Input
                    name="email"
                    placeholder="Enter email address"
                    value={serviceData.email || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className=" mb-2">Phone Number</Label>
                    <Input
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={serviceData.phoneNumber || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border transition-all"
                    />
                  </div>
                  <div>
                    <Label className=" mb-2">Enter Your Age</Label>
                    <Input
                      name="age"
                      placeholder="Enter your Age"
                      value={serviceData.age || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Professional Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">
                Professional Details
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className=" mb-2">Address</Label>
                  <Input
                    name="address"
                    placeholder="Enter full address"
                    value={serviceData.address || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className=" mb-2">State</Label>
                    <Input
                      name="state"
                      placeholder="Enter state"
                      value={serviceData.state || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border transition-all"
                    />
                  </div>
                  <div>
                    <Label className=" mb-2">Country</Label>
                    <Input
                      name="country"
                      placeholder="Enter country"
                      value={serviceData.country || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border transition-all"
                    />
                  </div>
                </div>
                <div>
                  <Label className=" mb-2">LinkedIn Profile</Label>
                  <Input
                    name="linkedin"
                    placeholder="Enter LinkedIn URL"
                    value={serviceData.linkedin || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Project Details Section */}
            <div className="space-y-6 md:col-span-2">
              <h2 className="text-xl font-semibold border-b pb-2">
                Project Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className=" mb-2">Project Title</Label>
                  <Input
                    name="projectTitle"
                    placeholder="Enter project title"
                    value={serviceData.projectTitle || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
                <div>
                  <Label className=" mb-2">Project URL</Label>
                  <Input
                    name="url"
                    placeholder="Enter project URL"
                    value={serviceData.url || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className=" mb-2">Project Description</Label>
                  <Input
                    name="projectDescription"
                    placeholder="Describe your project"
                    value={serviceData.projectDescription || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-3 gap-6 md:col-span-2">
              <div>
                <Label className=" mb-2">Categories</Label>
                <Input
                  name="categories"
                  placeholder="Enter categories"
                  value={serviceData.categories || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border transition-all"
                />
              </div>
              <div>
                <Label className=" mb-2">Status</Label>
                <Input
                  name="status"
                  placeholder="Enter project status"
                  value={serviceData.status || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border transition-all"
                />
              </div>
              <div>
                <Label className=" mb-2">Amount</Label>
                <Input
                  name="amount"
                  placeholder="Enter amount"
                  value={serviceData.amount || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border transition-all"
                />
              </div>
            </div>
            <div className="grid grid-col-1 border rounded-lg p-6 w-full  space-y-4 shadow-sm">
              <div className="flex flex-wrap gap-3 ">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-background px-4 py-2 rounded-full flex items-center gap-2  transition-colors"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="hover:bg-gray-300 rounded-full p-1 transition-colors"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </span>
                ))}
              </div>

              <Input
                type="text"
                className="w-full p-3 text-lg"
                placeholder="Type a skill and press Enter..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={addSkill}
              />
            </div>
            {/* Save Button */}
            <div className="md:col-span-2 mt-6">
              {serviceId ? (
                <>
                  <div className="flex justify-between w-full">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedServiceId(serviceData.id)}
                          variant="destructive"
                        >
                          Delete This Service
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[440px]">
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this Service?
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 gap-2 items-center "></div>
                        </div>
                        <DialogFooter>
                          <Button
                            className="px-3 py-1 h-10 w-20 rounded-md"
                            onClick={handleDelete}
                          >
                            {loading ? (
                              <Loader className="animate-spin w-5 h-5" />
                            ) : (
                              "Yes"
                            )}
                          </Button>
                          <Button
                            variant="secondary"
                            className="px-3 py-1 h-10 w-20 rounded-md"
                            onClick={() => setDialogOpen(false)}
                          >
                            No
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={handleSave}
                      className="py-3 rounded-lg transition-all"
                    >
                      {loading ? (
                        <Loader className="animate-spin w-5 h-5" />
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleCreate}
                  className="w-full py-3 rounded-lg transition-all"
                >
                  {loading ? (
                    <Loader className="animate-spin w-5 h-5" />
                  ) : (
                    "Save"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
