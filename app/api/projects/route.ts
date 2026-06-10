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

// HELPER: Extract internal MongoDB User._id string from session/cookie context
async function getAuthenticatedUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  // FIX: Align identifier extraction with the active 'session_token' key found in user/me route
  const userId = cookieStore.get('session_token')?.value; 
  return userId || null;
}

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized access blocked" }, { status: 401 });
    }

    // FIX: Restrict lookups exclusively to the authenticated project owner
    const projects = await prisma.project.findMany({
      where: { 
        ownerId: userId,
        isArchived: false 
      },
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
    const userId = await getAuthenticatedUserId();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized operation blocked" }, { status: 401 });
    }

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

    // FIX: Enforce mandatory ownerId mapping on creation payload
    const newProject = await prisma.project.create({
      data: {
        ownerId: userId, 
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