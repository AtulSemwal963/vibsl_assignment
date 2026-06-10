import { projectQueries } from './project-queries';

export const projectService = {
  async listAll(userId: string) {
    // Forward tenant token down to isolation fetch structures
    return projectQueries.findAll(userId);
  },

  async create(userId: string, data: Record<string, unknown>) {
    // Append tenant validation token parameter onto raw input object model parameters
    return projectQueries.create(userId, data);
  },

  async update(id: string, userId: string, data: Record<string, unknown>) {
    // Forward identity tracking parameter down to target verification layer
    return projectQueries.update(id, userId, data);
  },

  async remove(id: string, userId: string) {
    // Enforce matching identity parameters down to target deletion execution structures
    return projectQueries.remove(id, userId);
  },
};