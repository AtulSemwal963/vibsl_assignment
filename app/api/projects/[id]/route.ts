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

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const { 
      name, 
      company, 
      status, 
      summaryTitle, 
      summaryDesc, 
      progress, 
      members, 
      extraMembers 
    } = body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        company,
        status: status ? mapStatusToEnum(status) : undefined,
        summaryTitle,
        summaryDesc,
        progress: progress !== undefined ? Number(progress) : undefined,
        extraMembers: extraMembers !== undefined ? Number(extraMembers) : undefined,
        members: members ? {
          set: members.map((m: any) => ({
            name: m.name,
            avatar: m.avatar || null
          }))
        } : undefined
      }
    });

    return NextResponse.json({ project: updatedProject });
  } catch (err: any) {
    console.error("Backend PATCH mutation pipeline execution failure:", err);
    return NextResponse.json({ error: err.message || "Failed to mutate document" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Backend DELETE destruction trace failure:", err);
    return NextResponse.json({ error: err.message || "Failed to drop document" }, { status: 500 });
  }
}