import { apiUrl } from './';

export default function getGig(id: string) {
  return fetch(apiUrl)
    .then(res => res.json())
    .then(({ gigs }) => gigs.find((gig: any) => gig.id === Number(id)))
    .catch(error => ({ error: 'Something went wrong, please try again!' }));
}