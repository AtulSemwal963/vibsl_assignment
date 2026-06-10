// FIX: Import the shared global singleton client instance to prevent connection leakage
import prisma from '@/lib/prisma'; 

export interface UpsertUserDTO {
  oauthId: string;
  email: string;
  name: string;
  profilePicture?: string;
}

export const userQueries = {
  async upsertGoogleUser(dto: UpsertUserDTO) {
    return prisma.user.upsert({
      where: { oauthId: dto.oauthId },
      update: {
        name: dto.name,
        profilePicture: dto.profilePicture || null,
      },
      create: {
        oauthId: dto.oauthId,
        email: dto.email,
        name: dto.name,
        profilePicture: dto.profilePicture || null,
      },
    });
  },
};