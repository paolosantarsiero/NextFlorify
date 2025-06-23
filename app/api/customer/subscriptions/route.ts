import { authOptions } from 'lib/auth/config';
import { customApiClient } from 'lib/custom-api/customApi';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.stripe_id) {
      return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
    }

    const subscriptions = await customApiClient.get(
      `/customers/${session.user.stripe_id}/subscriptions`
    );
    const result = subscriptions.data.responseObject;

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error creating order', error);
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
