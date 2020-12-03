
const API_URL = process.env.REACT_APP_API_URL;

type Options = any // { body?: string, token?: string }

async function client(
  endpoint: string,
  options: Options,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
) {
  const { body, token } = options;
  const res = await fetch(`${API_URL}/${endpoint}`, { 
    method, 
    headers: { 
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body
  });

  const data = await res.json();
  return res.ok ? data : Promise.reject(data);
}

const get = (endpoint: string, options: Options) => client(endpoint, options, 'GET');
const post = (endpoint: string, options: Options) => client(endpoint, options, 'POST');
const put = (endpoint: string, options: Options) => client(endpoint, options, 'PUT');
const del = (endpoint: string, options: Options) => client(endpoint, options, 'DELETE');

export { get, post, put, del }
