
const API_URL = process.env.REACT_APP_API_URL;

async function client(
  endpoint: string,
  options: object,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
) {
  const res = await fetch(`${API_URL}/${endpoint}`, { 
    method, 
    headers: { 'Content-Type': 'application/json' },
    ...options 
  });

  const data = await res.json();
  return res.ok ? data : Promise.reject(data);
}

const get = (endpoint: string, options: object = {}) => client(endpoint, options, 'GET');
const post = (endpoint: string, options: object = {}) => client(endpoint, options, 'POST');
const put = (endpoint: string, options: object = {}) => client(endpoint, options, 'PUT');
const del = (endpoint: string, options: object = {}) => client(endpoint, options, 'DELETE');

export { get, post, put, del }
