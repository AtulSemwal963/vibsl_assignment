import { projectQueries } from './project-queries';

export const projectService = {
  async listAll() {
    return projectQueries.findAll();
  },

  async create(data: Record<string, unknown>) {
    return projectQueries.create(data);
  },

  async update(id: string, data: Record<string, unknown>) {
    return projectQueries.update(id, data);
  },

  async remove(id: string) {
    return projectQueries.remove(id);
  },
};