import Fetch from './fetch'

//craete user
export const registerNewuser = async ({ email, password, role, name, image }:any) => {
    return await Fetch.postJSON('/register/register', { email, password, role, name, image })
  }

//forgot-password
export const forgotPassword = async (email:any) => {
    return await Fetch.postJSON('/auth/forgot-password', { email })
  }

//reset-password
export const resetPassword = async ( token:any, newPassword :any) => {
  return await Fetch.postJSON('/auth/reset-password', { token, newPassword })
}

//get account details
export const getAccountDetails = async ( email:any) => {
  return await Fetch.getJSON(`/user-account/get?email=${email}`)
}

//update account details
export const UpdateAccountDetails = async ({id, email, name, phoneNumber, address}:any) => {
  return await Fetch.updateJSON('/user-account/update',{id, email, name, phoneNumber, address})
}

//add service listing
export const addServiceList = async (
  { 
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
    userId
  }:any
) => {
  return await Fetch.postJSON('/freelauncer-services/service-list', {
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
      userId
    
   })
}

//get Service details
export const getServiceDetails = async ( userId:any) => {
  return await Fetch.getJSON(`/freelauncer-services/get-service?userId=${userId}`)
}

//update Service details
export const updateServiceDetail = async ( 
  { 
    serviceId,  // Add serviceId to identify which service to update
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
    amount
  }:any) => {
  return await Fetch.updateJSON('/freelauncer-services/update-service', {
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
      amount
  })
}

//get all service
export const getAllUserService = async ( ) => {
  return await Fetch.getJSON('/freelauncer-services/all-services')
}