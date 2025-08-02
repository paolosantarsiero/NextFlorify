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

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.stripe_id) {
      return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
    }

    const subscriptionId = req.nextUrl.searchParams.get('subscriptionId');
    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    await customApiClient.delete(
      `/customers/${session.user.stripe_id}/subscriptions/${subscriptionId}`
    );

    return NextResponse.json({ message: 'Subscription cancelled successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error cancelling subscription', error);
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}
