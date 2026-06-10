import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// FIX: Import the shared global singleton client instance to prevent connection leakage
import prisma from '@/lib/prisma'; 

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Session contextual token unallocated.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionToken },
      select: {
        name: true,
        email: true,
        profilePicture: true, 
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Operator identity record not found.' }, { status: 404 });
    }

    let normalizedAvatar: string | undefined = user.profilePicture || undefined;
    
    if (normalizedAvatar && normalizedAvatar.startsWith('http://')) {
      normalizedAvatar = normalizedAvatar.replace('http://', 'https://');
    }

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        profilePicture: normalizedAvatar
      }
    }, { status: 200 });

  } catch (err: any) {
    console.error("CRITICAL DATABASE ROUTE CRASH DETECTED:", err);
    return NextResponse.json(
      { error: 'Internal pipeline fault.', details: err.message }, 
      { status: 500 }
    );
  }
}