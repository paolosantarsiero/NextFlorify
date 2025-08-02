'use server';

import { signupSchema, signupSchemaType } from '@/__types/user/signup';
import { woocommerce } from '@/lib/woocomerce/woocommerce';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const tForm = await getTranslations('SignupPage.form');
  try {
    const data: signupSchemaType = await req.json();
    const valid = signupSchema(tForm).safeParse(data);
    if (!valid.success) {
      return NextResponse.json({ message: 'Signup failed' }, { status: 400 });
    }
    const res = await woocommerce.post('customers', { ...data, username: data.email });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
