import { SubscriptionFlowDataType } from '@/__flows/subscription/subscriptionQuestionsSchema';
import { Carnation } from '@/assets/images/flowers/Carnation';
import { Daisy } from '@/assets/images/flowers/Daisy';
import { Mimosa } from '@/assets/images/flowers/Mimosa';
import { Rose } from '@/assets/images/flowers/Rose';
import { Girasole } from '@/assets/images/flowers/Sunflower';
import { Tulip } from '@/assets/images/flowers/Tulip';
import clsx, { ClassValue } from 'clsx';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import countries from '../types/countries.json';
import { getProductAttributes, Product } from './woocomerce/models/product';

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLipsum = () => {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
};

const getEasterDate = (year: number) => {
  const [a, b, c] = [year % 19, Math.floor(year / 100), year % 100];
  const [d, e] = [Math.floor(b / 4), b % 4];
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const [i, k] = [Math.floor(c / 4), c % 4];
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
};

export const getAnniversayDateByAnniversary = (
  anniversary: SubscriptionFlowDataType['anniversaries']
) => {
  switch (anniversary) {
    case 'mothers-day':
      return new Date(new Date().getFullYear(), 4, 14);
    case 'fathers-day':
      return new Date(new Date().getFullYear(), 5, 19);
    case 'womens-day':
      return new Date(new Date().getFullYear(), 2, 8);
    case 'christmas':
      return new Date(new Date().getFullYear(), 11, 25);
    case 'easter':
      return getEasterDate(new Date().getFullYear());
    case 'saint-valentine':
      return new Date(new Date().getFullYear(), 1, 14);
    default:
      return new Date(new Date().getFullYear(), 0, 1);
  }
};

export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const fromDDMMYYYYToDate = (dateString: string): Date => {
  const [dayStr, monthStr, yearStr] = dateString.split('-');
  const day = parseInt(dayStr ?? '0', 10);
  const month = parseInt(monthStr ?? '0', 10);
  const year = parseInt(yearStr ?? '0', 10);

  if (!day || !month || !year) {
    throw new Error('Data non valida: usa il formato dd-mm-yyyy');
  }

  const date = new Date(year, month - 1, day);

  // Verifica che la data creata sia coerente con l’input
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error('Data non valida: giorno, mese o anno non esistenti');
  }

  return date;
};

export const castStripeIntervalToFrequency = (
  interval: string | undefined,
  intervalCount: number | undefined
): 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'unknown' => {
  if (interval === 'day' && intervalCount === 1) return 'daily';
  if (interval === 'day' && intervalCount === 7) return 'weekly';
  if (interval === 'week' && intervalCount === 1) return 'weekly';
  if (interval === 'day' && intervalCount === 14) return 'biweekly';
  if (interval === 'month' && intervalCount === 1) return 'monthly';
  if (interval === 'year' && intervalCount === 1) return 'yearly';
  return `unknown`;
};

export const getProductIcon = (product: Partial<Product>) => {
  const flowerType = getProductAttributes(product, 'pa_flower_type').shift();

  switch (flowerType?.toLowerCase()) {
    case 'carnation':
      return Carnation;
    case 'daisy':
      return Daisy;
    case 'mimosa':
      return Mimosa;
    case 'mixed':
      return Daisy;
    case 'peonies':
    case 'peony':
      return Daisy;
    case 'rose':
      return Rose;
    case 'sunflower':
      return Girasole;
    case 'tulip':
      return Tulip;
    default:
      return Tulip;
  }
};
