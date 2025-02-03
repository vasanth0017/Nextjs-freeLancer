import Fetch from './fetch'

export const registerNewuser = async ({ email, password, role }:any) => {
    return await Fetch.postJSON('/register/register', { email, password, role })
  }