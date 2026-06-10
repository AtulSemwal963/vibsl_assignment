import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const projectQueries = {
  async findAll() {
    return prisma.project.findMany();
  },

  async create(data: any) {
    return prisma.project.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.project.update({ where: { id }, data });
  },

  async remove(id: string) {
    return prisma.project.delete({ where: { id } });
  },
};
