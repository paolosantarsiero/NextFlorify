import { signupSchemaType } from '@/__types/user/signup';
import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data: signupSchemaType = await req.json();
    const res = await woocommerce.post('customers', { ...data, username: data.email });
    console.log(res);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
