"use client";

import React, { useEffect } from 'react';
import {
  Plus,
  Search,
  SlidersHorizontal,
  List,
  Grid,
  MoreHorizontal,
  ChevronDown,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useProjectStore, type Project, type ProjectMember } from './store/useProjectStore';
import ProjectSidePanel from './ProjectSidePanel';

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Done':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'In Progress':
      return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
    case 'Paused':
      return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    case 'Backlog':
      return 'bg-violet-500/10 text-violet-400 border border-violet-500/20';
    default:
      return 'bg-zinc-800 text-zinc-400';
  }
};

export default function ProjectsDashboard() {
  const projects = useProjectStore((state) => state.projects);
  const openPanel = useProjectStore((state) => state.openPanel);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const isLoading = useProjectStore((state) => state.isLoading);
  const error = useProjectStore((state) => state.error);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddNewProjectClick = () => {
    const blankTemplate: Project = {
      id: Date.now(), 
      name: "",
      company: "",
      logoColor: "bg-blue-600",
      status: "Backlog",
      summaryTitle: "",
      summaryDesc: "",
      members: [],
      extraMembers: 0,
      progress: 0,
    };
    openPanel(blankTemplate);
  };

  const getMemberInitial = (member: string | ProjectMember, index: number): string => {
    if (typeof member === 'string') return String.fromCharCode(65 + index);
    return member.name ? member.name.charAt(0).toUpperCase() : String.fromCharCode(65 + index);
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-6 lg:p-8 font-sans antialiased text-zinc-200 relative overflow-x-hidden">
      
      <div className="flex flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Projects</h1>
        <button 
          onClick={handleAddNewProjectClick}
          className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors text-xs sm:text-sm shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-zinc-900">
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900 text-zinc-200 rounded-xl text-xs sm:text-sm font-medium border border-zinc-800 shadow-sm whitespace-nowrap">
            All project
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-zinc-500 hover:text-zinc-300 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            <span>Archived</span>
          </button>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-zinc-500 hidden sm:inline">Sort by</span>
            <button className="inline-flex items-center justify-between w-24 sm:w-28 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 font-medium text-xs sm:text-sm">
              <span>Newest</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 ml-1" />
            </button>
          </div>

          <div className="relative flex-1 md:flex-initial min-w-[140px] sm:min-w-[200px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-zinc-900 text-xs sm:text-sm border border-zinc-800 rounded-xl pl-3 pr-8 py-1.5 sm:py-2 outline-none focus:border-zinc-600 placeholder-zinc-500 text-zinc-200 transition-colors"
            />
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center border border-zinc-800 rounded-xl p-1 bg-zinc-900 shrink-0">
            <button className="p-1 sm:p-1.5 bg-zinc-800 text-blue-500 rounded-lg shadow-sm border border-zinc-700">
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button className="p-1 sm:p-1.5 text-zinc-500 hover:text-zinc-300">
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          System Sync Fault: {error}
        </div>
      )}

      {isLoading && projects.length === 0 ? (
        <div className="w-full pt-12 flex justify-center items-center text-sm text-zinc-500 font-mono tracking-wider animate-pulse">
          FETCHING CLUSTER DATA ENTITIES...
        </div>
      ) : (
        <div className="w-full pt-2">
          
          {/* Mobile Adaption Stack Layer */}
          <div className="block sm:hidden space-y-3">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 space-y-3 font-sans"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${project.logoColor} flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
                      {project.name ? project.name.charAt(0) : '?'}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-zinc-100 text-sm truncate">{project.name || 'Unnamed Project'}</span>
                      <span className="text-[11px] text-zinc-500 truncate">{project.company || 'No Company'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => openPanel(project)}
                    className="text-zinc-500 hover:text-zinc-300 p-1 shrink-0 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-lg p-2.5">
                  <div className="text-xs font-medium text-zinc-300 truncate">{project.summaryTitle || 'No Headline'}</div>
                  <div className="text-[11px] text-zinc-500 truncate mt-0.5">{project.summaryDesc || 'No Description String'}</div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-md ${getStatusStyles(project.status)}`}>
                      {project.status}
                    </span>
                    <div className="flex items-center -space-x-1 overflow-hidden">
                      {project.members?.slice(0, 3).map((member, index) => (
                        <div
                          key={index}
                          className="inline-block h-5 w-5 rounded-full ring-2 ring-zinc-950 bg-zinc-800 flex items-center justify-center text-[7px] text-zinc-400 font-bold overflow-hidden"
                          title={typeof member === 'string' ? undefined : member.name}
                        >
                          {typeof member !== 'string' && member.avatar ? (
                            <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            getMemberInitial(member, index)
                          )}
                        </div>
                      ))}
                      {project.extraMembers > 0 && (
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-900/60 ring-2 ring-zinc-950 text-[8px] font-bold text-blue-400">
                          +{project.extraMembers}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-16 bg-zinc-850 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    {project.progress === 100 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                    ) : (
                      <span className="text-[10px] font-mono font-semibold text-zinc-400 w-6 text-right">{project.progress}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <th className="py-4 px-4 font-bold text-zinc-400 flex items-center gap-1">
                    Name
                    <SlidersHorizontal className="w-3 h-3 rotate-90 stroke-[2.5] text-zinc-600" />
                  </th>
                  <th className="py-4 px-4 font-bold text-zinc-400">Status</th>
                  <th className="py-4 px-4 font-bold text-zinc-400 flex items-center gap-1">
                    Summary
                    <SlidersHorizontal className="w-3 h-3 rotate-90 stroke-[2.5] text-zinc-600" />
                  </th>
                  <th className="py-4 px-4 font-bold text-zinc-400">
                    <div className="flex items-center gap-1">
                      Members
                      <SlidersHorizontal className="w-3 h-3 rotate-90 stroke-[2.5] text-zinc-600" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-bold text-zinc-400">
                    <div className="flex items-center gap-1">
                      Progress
                      <SlidersHorizontal className="w-3 h-3 rotate-90 stroke-[2.5] text-zinc-600" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-bold text-zinc-400 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-zinc-900/20 group transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${project.logoColor} flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
                          {project.name ? project.name.charAt(0) : '?'}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-zinc-100 text-[14px] leading-tight truncate">{project.name || 'Unnamed Project'}</span>
                          <span className="text-xs text-zinc-500 mt-0.5 truncate">{project.company || 'No Company'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-md ${getStatusStyles(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-[220px] lg:max-w-[280px]">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-medium text-zinc-100 tracking-tight leading-tight truncate">{project.summaryTitle || 'No Headline'}</span>
                        <span className="text-xs text-zinc-500 mt-0.5 truncate">{project.summaryDesc || 'No Description'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center -space-x-1.5 overflow-hidden">
                        {project.members?.map((member, index) => (
                          <div
                            key={index}
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-950 bg-zinc-800 flex items-center justify-center text-[8px] text-zinc-400 font-bold overflow-hidden"
                            title={typeof member === 'string' ? undefined : member.name}
                          >
                            {typeof member !== 'string' && member.avatar ? (
                              <img src={member.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              getMemberInitial(member, index)
                            )}
                          </div>
                        ))}
                        {project.extraMembers > 0 && (
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-900/60 ring-2 ring-zinc-950 text-[10px] font-bold text-blue-400">
                            +{project.extraMembers}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[150px]">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-zinc-850 rounded-full h-1.5 max-w-[110px]">
                          <div
                            className={`h-1.5 rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        {project.progress === 100 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                        ) : (
                          <span className="text-xs font-mono font-semibold text-zinc-400 w-8">{project.progress}%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right pr-6 border-l border-zinc-900/20">
                      <button 
                        onClick={() => openPanel(project)}
                        className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg hover:bg-zinc-800/50 transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProjectSidePanel />
    </div>
  );
}