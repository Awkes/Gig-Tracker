const API_URL = 'https://run.mocky.io/v3';

export async function client(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`);
  const data = await res.json();
  return res.ok ? data : Promise.reject(data);
}
