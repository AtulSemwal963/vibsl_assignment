import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Correctly unwrap the cookies asynchronous execution context via await
    const cookieStore = await cookies();
    
    // Safely write expiration mutations onto the unwrapped instance
    cookieStore.set('session_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0), 
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to clear session token parameters gracefully.' }, 
      { status: 500 }
    );
  }
}