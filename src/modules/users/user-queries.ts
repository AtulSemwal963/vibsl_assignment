import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

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
        profilePicture: dto.profilePicture,
      },
      create: {
        oauthId: dto.oauthId,
        email: dto.email,
        name: dto.name,
        profilePicture: dto.profilePicture,
      },
    });
  },
};