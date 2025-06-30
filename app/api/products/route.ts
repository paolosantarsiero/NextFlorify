'use server';

import { woocommerce } from 'lib/woocomerce/woocommerce';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    //@ TOOD: use req input to set filters products
    const products = await woocommerce.get('products', { author: 1, categories: 'occasioni' });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
