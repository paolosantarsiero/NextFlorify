import WCCommerceRestApi, { WCRestApiOptions } from './models/client';

const option: WCRestApiOptions = {
  url: process.env.WOOCOMMERCE_URL ?? 'http://wordpress.localhost',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY ?? '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET ?? '',
  isHttps: process.env.WOOCOMMERCE_URL?.startsWith('https') ?? false,
  version: 'wp/v2',
  queryStringAuth: process.env.WOOCOMMERCE_URL?.startsWith('https') ?? false // Force Basic Authentication as query string true and using under
};
export const wordpress = new WCCommerceRestApi(option);
