
const API_URL = process.env.REACT_APP_API_URL;

export async function client(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`);
  const data = await res.json();
  return res.ok ? data : Promise.reject(data);
}
