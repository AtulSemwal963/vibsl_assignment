import { create } from 'zustand';

export interface ProjectMember {
  name: string;
  avatar?: string;
}

export interface Project {
  id: string | number; 
  name: string;
  company: string;
  logoColor: string;
  status: string;
  summaryTitle: string;
  summaryDesc: string;
  members: ProjectMember[]; 
  extraMembers: number;
  progress: number;
}

interface ProjectState {
  projects: Project[];
  editingProject: Project | null;
  isPanelOpen: boolean;
  isLoading: boolean;
  error: string | null;

  fetchProjects: () => Promise<void>;
  openPanel: (project: Project) => void;
  closePanel: () => void;
  updateEditingProject: (updatedProject: Project) => void;
  saveProjectChanges: (updatedProject: Project) => Promise<void>;
  deleteProject: (id: string | number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  editingProject: null,
  isPanelOpen: false,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Data stream dropped. Server responded with status: ${res.status}`);
      }
      const data = await res.json();
      set({ projects: data.projects || [], isLoading: false });
    } catch (err: any) {
      console.error("Store execution pipeline synchronization failure:", err);
      set({ error: err.message || "Failed to load projects", isLoading: false });
    }
  },

  openPanel: (project) => set({ 
    // Deep clone arrays and primitive references cleanly
    editingProject: JSON.parse(JSON.stringify(project)), 
    isPanelOpen: true 
  }),

  closePanel: () => {
    set({ isPanelOpen: false });
    setTimeout(() => set({ editingProject: null }), 300);
  },

  // Synchronizes modifications in panel layout explicitly with store visibility mechanisms
  updateEditingProject: (updatedProject) => set((state) => ({
    editingProject: updatedProject,
    // Live reload mutations tracking onto structural background grids
    projects: state.projects.map((p) => p.id === updatedProject.id ? updatedProject : p)
  })),

  saveProjectChanges: async (updatedProject) => {
    const originalProjects = [...get().projects];
    const originalEditingProject = get().editingProject ? { ...get().editingProject! } : null;
    let finalProject = JSON.parse(JSON.stringify(updatedProject));

    const numericVal = Math.min(100, Math.max(0, Number(finalProject.progress) || 0));
    finalProject.progress = numericVal;

    if (finalProject.status === 'Done') {
      finalProject.progress = 100;
    } else if (numericVal === 100) {
      finalProject.status = 'Done';
    }

    // Determine persistence paths based on whether identity looks like a runtime temporary number or DB string
    const isExistingRecord = typeof finalProject.id === 'string' || (typeof finalProject.id === 'number' && finalProject.id < 10000000000);

    set((state) => {
      const exists = state.projects.some((p) => p.id === finalProject.id);
      return {
        projects: exists
          ? state.projects.map((p) => p.id === finalProject.id ? finalProject : p)
          : [...state.projects, finalProject],
        editingProject: state.editingProject?.id === finalProject.id ? finalProject : state.editingProject
      };
    });

    try {
      const url = isExistingRecord ? `/api/projects/${finalProject.id}` : '/api/projects';
      const method = isExistingRecord ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalProject),
      });

      if (!res.ok) throw new Error(`Persistence failure with status: ${res.status}`);
      
      const responseData = await res.json();
      
      // FIX: Map using finalProject.id reference so the temporary numerical ID is replaced with the MongoDB String ID
      if (responseData && responseData.project) {
        const structuralSavedProject = responseData.project;
        set((state) => ({
          projects: state.projects.map((p) => p.id === finalProject.id ? structuralSavedProject : p),
          editingProject: state.editingProject?.id === finalProject.id ? structuralSavedProject : state.editingProject
        }));
      } else {
        await get().fetchProjects();
      }

    } catch (err) {
      console.error("Server synchronization dropped. Rolling back state mutation matrix:", err);
      set({ 
        projects: originalProjects,
        editingProject: originalEditingProject
      });
    }
  },

  deleteProject: async (id) => {
    const originalProjects = [...get().projects];

    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      editingProject: state.editingProject?.id === id ? null : state.editingProject
    }));

    if (typeof id === 'number' && id > 10000000000) return; // Prevent raw runtime stamps from dropping down network pipes

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Absolute document purge failed with status: ${res.status}`);
    } catch (err) {
      console.error("Server network fault during record destruction. Reverting UI state:", err);
      set({ projects: originalProjects });
    }
  }
}));