import { NextResponse } from 'next/server';
import { projectService } from './project-service';

export const projectHandlers = {
  async list(req: Request) {
    try {
      const projects = await projectService.listAll();
      return NextResponse.json(projects);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },

  async create(req: Request) {
    try {
      const body = await req.json();
      const project = await projectService.create(body);
      return NextResponse.json(project, { status: 201 });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },

  async update(req: Request, id: string) {
    try {
      const body = await req.json();
      const project = await projectService.update(id, body);
      return NextResponse.json(project);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },

  async remove(req: Request, id: string) {
    try {
      await projectService.remove(id);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  },
};