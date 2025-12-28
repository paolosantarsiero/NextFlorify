import WooCommerceRestApi, { WooRestApiOptions } from './models/client';

const option: WooRestApiOptions = {
  url: process.env.WOOCOMMERCE_URL ?? 'http://wordpress.localhost',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY ?? '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET ?? '',
  isHttps: process.env.WOOCOMMERCE_URL?.startsWith('https') ?? false,
  version: 'wc/v3',
  queryStringAuth: process.env.WOOCOMMERCE_URL?.startsWith('https') ?? false // Force Basic Authentication as query string true and using under
};
export const woocommerce = new WooCommerceRestApi(option);
