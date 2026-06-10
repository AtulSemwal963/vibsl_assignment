import { NextResponse } from 'next/server';
import { projectService } from './project-service';
import { cookies } from 'next/headers';

// HELPER: Extract internal MongoDB User._id string from session context safely
async function getAuthenticatedUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('session_token')?.value; 
  return userId || null;
}

export const projectHandlers = {
  async list(req: Request) {
    try {
      const userId = await getAuthenticatedUserId();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized access blocked" }, { status: 401 });
      }

      // Pass tenant boundary down to isolation query layer
      const projects = await projectService.listAll(userId);
      return NextResponse.json({ projects });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const userId = await getAuthenticatedUserId();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized operation blocked" }, { status: 401 });
      }

      const body = await req.json();
      // Enforce tenant identity ownership onto mutation payload parameters
      const project = await projectService.create(userId, body);
      return NextResponse.json({ project }, { status: 201 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },

  async update(req: Request, id: string) {
    try {
      const userId = await getAuthenticatedUserId();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized operation blocked" }, { status: 401 });
      }

      const body = await req.json();
      // Enforce target data validation check via identity reference verification parameters
      const project = await projectService.update(id, userId, body);
      return NextResponse.json({ project });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },

  async remove(req: Request, id: string) {
    try {
      const userId = await getAuthenticatedUserId();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized operation blocked" }, { status: 401 });
      }

      // Block generic structural teardowns without verified entity verification matches
      await projectService.remove(id, userId);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },
};