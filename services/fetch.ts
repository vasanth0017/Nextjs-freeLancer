function handleErrors(response: any) {
  return new Promise<void>((resolve, reject) => {
    if (!response.ok) {
      return reject(response)
    }
    if (response.status === 204) {
      return resolve()
    }
    return response.json().then(resolve).catch(resolve)
  })
}
function fullUrl(url: any) {
  if (/^(f|ht)tps?:\/\//i.test(url)) return url
  return process.env.NEXT_PUBLIC_URL + '/api' + url
}
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  return headers
}
class Fetch {
  static getJSON(url: any, opts = {}) {
    const api_url = fullUrl(url)
    console.log(api_url)
    return fetch(api_url, { headers: getHeaders(), ...opts }).then(handleErrors)
  }
  static postJSON(url: any, data = {}) {
    return fetch(fullUrl(url), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors)
  }

  static deleteJSON(url: any, data = {}) {
    return fetch(fullUrl(url), {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors)
  }
  static updateJSON(url: any, data = {}) {
    return fetch(fullUrl(url), {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors)
  }
}
export default Fetch
