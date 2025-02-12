import Fetch from "./fetch";

//craete user
export const registerNewuser = async ({
  email,
  password,
  role,
  name,
  image,
}: any) => {
  return await Fetch.postJSON("/register/register", {
    email,
    password,
    role,
    name,
    image,
  });
};

//forgot-password
export const forgotPassword = async (email: any) => {
  return await Fetch.postJSON("/auth/forgot-password", { email });
};

//reset-password
export const resetPassword = async (token: any, newPassword: any) => {
  return await Fetch.postJSON("/auth/reset-password", { token, newPassword });
};

//get account details
export const getAccountDetails = async (email: any) => {
  return await Fetch.getJSON(`/user-account/get?email=${email}`);
};

//update account details
export const UpdateAccountDetails = async ({
  id,
  email,
  name,
  phoneNumber,
  address,
}: any) => {
  return await Fetch.updateJSON("/user-account/update", {
    id,
    email,
    name,
    phoneNumber,
    address,
  });
};

//add service listing
export const addServiceList = async ({
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
}: any) => {
  return await Fetch.postJSON("/freelauncer-services/service-list", {
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
};

//get Service details
export const getServiceDetails = async (serviceId: any) => {
  return await Fetch.getJSON(
    `/freelauncer-services/get-service?userId=${serviceId}`
  );
};

//update Service details
export const updateServiceDetail = async ({
  serviceId, // Add serviceId to identify which service to update
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
}: any) => {
  return await Fetch.updateJSON("/freelauncer-services/update-service", {
    serviceId,
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
  });
};

//get all service
export const getAllUserService = async () => {
  return await Fetch.getJSON("/freelauncer-services/all-services");
};

//delete service
export const deleteService = async (serviceId: any) => {
  return await Fetch.deleteJSON("/freelauncer-services/delete-service", {
    serviceId,
  });
};

//create contract
export const createContract = async ({
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
}: any) => {
  return await Fetch.postJSON("/manage-contract/contract", {
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
};

//get-contract details
export const getContractDetails = async (userId: any) => {
  return await Fetch.getJSON(`/manage-contract/get-contract?userId=${userId}`);
};

//update the contract details
export const upadteContract = async ({
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
}: any) => {
  return await Fetch.updateJSON("/manage-contract/update-contract", {
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
};

//store chat message and details
export const storeChatDetails = async ({
  contractId,
  senderId,
  receiverId,
  content,
  freelancerId,
}: any) => {
  return await Fetch.postJSON("/contract-chat/chat", {
    contractId,
    senderId,
    receiverId,
    content,
    freelancerId,
  });
};

//get-contract-message details
export const getMessage = async (contractId: any) => {
  return await Fetch.getJSON(`/manage-contract/get-contract?contractId=${contractId}`);
};
