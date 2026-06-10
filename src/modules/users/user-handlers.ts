import { NextResponse } from 'next/server';
import { userQueries } from './user-queries';
import { cookies } from 'next/headers';

export const userHandlers = {
  async handleClientProfileSync(req: Request) {
    try {
      const body = await req.json();
      const { oauthId, email, name, profilePicture } = body;

      if (!oauthId || !email || !name) {
        return NextResponse.json({ error: 'Required identity fields absent.' }, { status: 400 });
      }

      const user = await userQueries.upsertGoogleUser({
        oauthId,
        email,
        name,
        profilePicture,
      });

      // Establish session state cookie boundary mapping
      const cookieStore = await cookies();
      cookieStore.set('session_token', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ success: true, userId: user.id }, { status: 200 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
};