import { statsUrl } from './config';

export function getStats() {
  return fetch(statsUrl)
    .then(res => res.json())
    .then(({ stats }) => stats)
    .catch(error => ({ error: 'Something went wrong, please try again!' }));
}