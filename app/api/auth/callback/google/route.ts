import { NextResponse } from 'next/server';
import { userHandlers } from '@/src/modules/users';

export async function POST(request: Request) {
  return userHandlers.handleClientProfileSync(request);
}