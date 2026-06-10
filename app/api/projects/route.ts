import { NextResponse } from 'next/server';
import { ProjectStatus, type Project } from '@prisma/client';
// FIX: Import the optimized global singleton client instance
import prisma from '@/lib/prisma'; 

function mapStatusToEnum(status: string): ProjectStatus {
  switch (status) {
    case 'In Progress': return ProjectStatus.IN_PROGRESS;
    case 'Paused':      return ProjectStatus.PAUSED;
    case 'Done':        return ProjectStatus.DONE;
    default:            return ProjectStatus.BACKLOG;
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ projects });
  } catch (err: any) {
    console.error("Collection read pipeline failure:", err);
    return NextResponse.json({ error: "Failed to load database stream" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      company, 
      logoColor, 
      status, 
      summaryTitle, 
      summaryDesc, 
      progress, 
      members, 
      extraMembers 
    } = body;

    const newProject = await prisma.project.create({
      data: {
        name: name || "Untitled Scope Initialization",
        company,
        logoColor: logoColor || "bg-blue-600",
        status: status ? mapStatusToEnum(status) : ProjectStatus.BACKLOG,
        summaryTitle,
        summaryDesc,
        progress: progress !== undefined ? Number(progress) : 0,
        extraMembers: extraMembers !== undefined ? Number(extraMembers) : 0,
        members: members ? {
          set: members.map((m: any) => ({
            name: m.name,
            avatar: m.avatar || null
          }))
        } : []
      }
    });

    return NextResponse.json({ project: newProject });
  } catch (err: any) {
    console.error("Collection POST entry execution failure:", err);
    return NextResponse.json({ error: err.message || "Failed to instantiate document" }, { status: 500 });
  }
}