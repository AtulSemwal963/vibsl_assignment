import { ProjectStatus } from "@prisma/client";
// FIX: Use your application's shared global client singleton to avoid connection exhaustion pool errors
import prisma from "@/lib/prisma";

function mapStatusToEnum(status: string): ProjectStatus {
  switch (status) {
    case 'In Progress': return ProjectStatus.IN_PROGRESS;
    case 'Paused':      return ProjectStatus.PAUSED;
    case 'Done':        return ProjectStatus.DONE;
    default:            return ProjectStatus.BACKLOG;
  }
}

export const projectQueries = {
  async findAll(userId: string) {
    // FIX: Scope lookups exclusively to the tenant identity parameter context
    return prisma.project.findMany({
      where: {
        ownerId: userId,
        isArchived: false
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async create(userId: string, data: any) {
    // FIX: Map validation parameters directly onto type structural layout rules
    return prisma.project.create({
      data: {
        ownerId: userId,
        name: data.name || "Untitled Scope Initialization",
        company: data.company,
        logoColor: data.logoColor || "bg-blue-600",
        status: data.status ? mapStatusToEnum(data.status) : ProjectStatus.BACKLOG,
        summaryTitle: data.summaryTitle,
        summaryDesc: data.summaryDesc,
        progress: data.progress !== undefined ? Number(data.progress) : 0,
        extraMembers: data.extraMembers !== undefined ? Number(data.extraMembers) : 0,
        members: data.members ? {
          set: data.members.map((m: any) => ({
            name: m.name,
            avatar: m.avatar || null
          }))
        } : []
      }
    });
  },

  async update(id: string, userId: string, data: any) {
    // FIX: Validate document ownership existence check matching parameters first
    const existing = await prisma.project.findFirst({
      where: { id, ownerId: userId }
    });

    if (!existing) {
      throw new Error("Document not found or ownership missing");
    }

    return prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        company: data.company,
        logoColor: data.logoColor,
        status: data.status ? mapStatusToEnum(data.status) : undefined,
        summaryTitle: data.summaryTitle,
        summaryDesc: data.summaryDesc,
        progress: data.progress !== undefined ? Number(data.progress) : undefined,
        extraMembers: data.extraMembers !== undefined ? Number(data.extraMembers) : undefined,
        members: data.members ? {
          set: data.members.map((m: any) => ({
            name: m.name,
            avatar: m.avatar || null
          }))
        } : undefined
      }
    });
  },

  async remove(id: string, userId: string) {
    // FIX: Validate identity context before executing deletion parameters
    const existing = await prisma.project.findFirst({
      where: { id, ownerId: userId }
    });

    if (!existing) {
      throw new Error("Document not found or ownership missing");
    }

    return prisma.project.delete({
      where: { id }
    });
  },
};