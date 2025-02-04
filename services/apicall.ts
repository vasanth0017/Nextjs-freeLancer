import Fetch from './fetch'

export const registerNewuser = async ({ email, password, role, name, image }:any) => {
  console.log("apicall")
    return await Fetch.postJSON('/register/register', { email, password, role, name, image })
  }