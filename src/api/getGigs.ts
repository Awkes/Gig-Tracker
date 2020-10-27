import { gigsUrl } from './config';

export function getGigs() {
  return fetch(gigsUrl)
    .then(res => res.json())
    .then(({ gigs }) => gigs)
    .catch(error => ({ error: 'Something went wrong, please try again!' }));
}