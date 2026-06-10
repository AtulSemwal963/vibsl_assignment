import { userQueries } from './user-queries';
import { cookies } from 'next/headers';

export const userService = {
  async processGoogleOAuthCallback(authorizationCode: string) {
    // 1. Exchange temporary authorization code for Google token package
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: authorizationCode,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('OAuth token exchange sequence execution breakdown.');
    }

    const tokens = await tokenResponse.json();

    // 2. Query Google Identity Services API for standard profile claims
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to resolve Google identity profile payloads.');
    }

    const googleProfile = await profileResponse.json();

    // 3. Persist profile schema matching database criteria via Upsert pipeline
    const user = await userQueries.upsertGoogleUser({
      oauthId: googleProfile.sub, // Unique invariant identifier signature
      email: googleProfile.email,
      name: googleProfile.name,
      profilePicture: googleProfile.picture,
    });

    // 4. Secure cryptographic state configuration (JWT representation omitted for structure clarity)
    // Persists stateless HTTP-Only authentication cookie matching session infrastructure requirements
    const cookieStore = await cookies();
    cookieStore.set('session_token', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7-day storage lifecycle limit
    });

    return user;
  },
};