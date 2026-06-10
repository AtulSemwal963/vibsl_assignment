import { NextResponse } from 'next/server';
import { ProjectStatus } from '@prisma/client';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

function mapStatusToEnum(status: string): ProjectStatus {
  switch (status) {
    case 'In Progress': return ProjectStatus.IN_PROGRESS;
    case 'Paused':      return ProjectStatus.PAUSED;
    case 'Done':        return ProjectStatus.DONE;
    default:            return ProjectStatus.BACKLOG;
  }
}

async function getAuthenticatedUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  return userId || null;
}

// 1. PATCH: Update a specific project safely within user boundaries
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized access blocked" }, { status: 401 });
    }

    const { id } = await params;
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

    // Verify ownership BEFORE executing any structural changes
    const existingProject = await prisma.project.findFirst({
      where: { id, ownerId: userId }
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Document not found or ownership missing" }, { status: 404 });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        company,
        logoColor,
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
    console.error("Dynamic update transaction error:", err);
    return NextResponse.json({ error: "Failed to update record context" }, { status: 500 });
  }
}

// 2. DELETE: Purge a specific project safely within user boundaries
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized access blocked" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership before executing erasure code
    const existingProject = await prisma.project.findFirst({
      where: { id, ownerId: userId }
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Document not found or ownership missing" }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Absolute document purge failure:", err);
    return NextResponse.json({ error: "Failed to purge database entry" }, { status: 500 });
  }
}