import { woocommerce } from 'lib/woocomerce/woocommerce';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    //@ TOOD: use req input to set filters products
    const products = await woocommerce.get('products', { author: 1, category_slug: 'occasioni' });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
