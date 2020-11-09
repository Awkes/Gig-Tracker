import { client } from './client';

const getGigs = () => client('fef89afd-a148-4e87-8653-0330b4493c1b');
const getStats = () => client('7ae75593-7a02-4c58-92aa-87fd102dc8f3');

export { getGigs, getStats };