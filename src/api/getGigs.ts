import { apiUrl } from './';

export default function getGigs() {
  return fetch(apiUrl)
    .then(res => res.json())
    .then(({ gigs }) => gigs)
    .catch(error => ({ error: 'Something went wrong, please try again!' }));
}