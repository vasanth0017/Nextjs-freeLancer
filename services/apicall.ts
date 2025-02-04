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