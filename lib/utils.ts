import { ReadonlyURLSearchParams } from 'next/navigation';
import countries from '../types/countries.json';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const getCountries = (): { name: string; icon: string; code: string }[] =>
  (countries as { name: string; emoji: string; code: string }[]).map(({ name, emoji, code }) => ({
    name,
    icon: emoji,
    code
  }));

export const isStrinInteger = (value: string) => {
  const parsed = parseInt(value, 10);

  return !isNaN(parsed) && parsed.toString() === value.trim();
};

export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const getLipsum = () => {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
};
