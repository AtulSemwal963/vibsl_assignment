"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, UserPlus, Trash2, Search, AlertTriangle } from 'lucide-react';
import { useProjectStore, type Project } from './store/useProjectStore';

const AVAILABLE_MOCK_USERS = [
  { id: "u1", name: "Sarah Connor", avatar: "https://randomuser.me/api/portraits/thumb/women/1.jpg" },
  { id: "u2", name: "Alex Mercer", avatar: "https://randomuser.me/api/portraits/thumb/men/2.jpg" },
  { id: "u3", name: "Elena Rostova", avatar: "https://randomuser.me/api/portraits/thumb/women/3.jpg" },
  { id: "u4", name: "David Kim", avatar: "https://randomuser.me/api/portraits/thumb/men/4.jpg" },
  { id: "u5", name: "James Holden", avatar: "https://randomuser.me/api/portraits/thumb/men/5.jpg" },
  { id: "u6", name: "Naomi Nagata", avatar: "https://randomuser.me/api/portraits/thumb/women/6.jpg" },
];

export default function ProjectSidePanel() {
  const {
    editingProject,
    isPanelOpen,
    closePanel,
    updateEditingProject,
    saveProjectChanges,
    deleteProject,
    projects
  } = useProjectStore();

  const [localDraft, setLocalDraft] = useState<Project | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingProject && isPanelOpen) {
      setLocalDraft(JSON.parse(JSON.stringify(editingProject)));
    } else if (!isPanelOpen) {
      setLocalDraft(null);
      setIsDropdownOpen(false);
      setSearchQuery('');
      setShowDeleteConfirm(false);
      setIsMutating(false);
    }
  }, [editingProject, isPanelOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isPanelOpen || !localDraft) return null;

  const isNewProject = !projects.some(p => String(p.id) === String(localDraft.id));

  const handleFieldChange = (field: keyof Project, value: string | number) => {
    if (!localDraft) return;
    
    // Compute the absolute object model state value first
    const updated: Project = { ...localDraft, [field]: value };

    if (field === 'progress') {
      const numericVal = Math.min(100, Math.max(0, Number(value) || 0));
      updated.progress = numericVal;
      if (numericVal === 100) updated.status = 'Done';
      else if (updated.status === 'Done' && numericVal < 100) updated.status = 'In Progress';
    }
    if (field === 'status' && value === 'Done') {
      updated.progress = 100;
    }

    // Safe updates executed outside functional loop contexts
    setLocalDraft(updated);
    updateEditingProject(updated);
  };

  const handleSelectMember = (user: typeof AVAILABLE_MOCK_USERS[number]) => {
    if (!localDraft) return;

    const exists = localDraft.members?.some((m) => m.name === user.name);
    if (exists) {
      setIsDropdownOpen(false);
      return;
    }

    const updatedMembers = [...(localDraft.members || []), { name: user.name, avatar: user.avatar }];
    const updatedProject: Project = {
      ...localDraft,
      members: updatedMembers,
      extraMembers: Math.max(0, updatedMembers.length - 3)
    };

    setLocalDraft(updatedProject);
    updateEditingProject(updatedProject);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleRemoveMember = (idx: number) => {
    if (!localDraft) return;

    const updatedMembers = localDraft.members.filter((_, i) => i !== idx);
    const updatedProject: Project = {
      ...localDraft,
      members: updatedMembers,
      extraMembers: Math.max(0, updatedMembers.length - 3)
    };

    setLocalDraft(updatedProject);
    updateEditingProject(updatedProject);
  };

  const handleSave = async () => {
    if (!localDraft) return;
    setIsMutating(true);
    try {
      await saveProjectChanges(localDraft);
      closePanel();
    } catch (err) {
      console.error("Pipeline update failure context details:", err);
    } // isMutating unmount drop handled smoothly by layout transitions
  };

  const handleDelete = async () => {
    if (!localDraft) return;
    setIsMutating(true);
    try {
      await deleteProject(localDraft.id);
      closePanel();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = AVAILABLE_MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${isPanelOpen ? 'visible' : 'invisible'}`}
      aria-hidden={!isPanelOpen}
    >
      <div
        className={`absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity duration-300 ${isPanelOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closePanel}
      />

      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-zinc-950 border-l border-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${localDraft.logoColor || 'bg-zinc-800'} flex items-center justify-center text-white font-bold text-xs`}>
              {localDraft.name?.charAt(0) || '?'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isNewProject ? 'Create Project' : 'Edit details'}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">{localDraft.company || 'New Scope Initialization'}</p>
            </div>
          </div>
          <button
            onClick={closePanel}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">

          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Project Name</label>
            <input
              type="text"
              value={localDraft.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-700 transition-colors"
              placeholder="e.g. Assessment Engine Core"
            />
          </div>

          {/* Company Context */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Company Context</label>
            <input
              type="text"
              value={localDraft.company || ''}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-700 transition-colors"
              placeholder="e.g. IMS Global Systems"
            />
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</label>
            <div className="relative">
              <select
                value={localDraft.status}
                onChange={(e) => handleFieldChange('status', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-700 transition-colors appearance-none cursor-pointer"
              >
                <option value="Backlog">Backlog</option>
                <option value="In Progress">In Progress</option>
                <option value="Paused">Paused</option>
                <option value="Done">Done</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Summary Metadata Card */}
          <div className="space-y-4 bg-zinc-900/30 border border-zinc-900 rounded-xl p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-1">Summary Node</span>
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-zinc-400">Headline</label>
              <input
                type="text"
                value={localDraft.summaryTitle || ''}
                onChange={(e) => handleFieldChange('summaryTitle', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-sm text-zinc-100 outline-none focus:border-zinc-700 transition-colors"
                placeholder="Brief structural objective"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-zinc-400">Description String</label>
              <textarea
                rows={2}
                value={localDraft.summaryDesc || ''}
                onChange={(e) => handleFieldChange('summaryDesc', e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-sm text-zinc-100 outline-none focus:border-zinc-700 transition-colors resize-none"
                placeholder="In depth deployment schema parameters..."
              />
            </div>
          </div>

          {/* Members Allocation Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between relative" ref={dropdownRef}>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Members allocation</label>
              
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/5 hover:bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/10"
              >
                <UserPlus className="w-3 h-3" />
                <span>Allocate Member</span>
              </button>

              {/* User Dropdown Select */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
                  <div className="p-2 border-b border-zinc-800 flex items-center gap-2 bg-zinc-950">
                    <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search workflow operators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-zinc-100 outline-none placeholder-zinc-600"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto p-1 space-y-0.5">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <button
                          type="button"
                          key={user.id}
                          onClick={() => handleSelectMember(user)}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left hover:bg-zinc-800/60 transition-colors group"
                        >
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-800 text-[8px] font-bold text-zinc-400 flex items-center justify-center ring-1 ring-zinc-700">
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">{user.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className="text-[11px] text-zinc-600 p-3 text-center">No matched items found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Allocated Member Grid Tokens */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {localDraft.members?.map((member, idx) => {
                return (
                  <div key={idx} className="flex items-center justify-between bg-zinc-900 border border-zinc-850/60 rounded-xl p-2 pl-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-400 font-bold ring-1 ring-zinc-700 overflow-hidden">
                        {member.avatar ? <img src={member.avatar} alt="" className="w-full h-full object-cover" /> : member.name.charAt(0)}
                      </div>
                      <span className="text-xs text-zinc-300 font-medium">{member.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors rounded-lg hover:bg-zinc-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Slider Track */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <span>Progress Layer</span>
              <span className="font-mono text-zinc-300 normal-case text-sm bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">{localDraft.progress}%</span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localDraft.progress || 0}
                onChange={(e) => handleFieldChange('progress', Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          {!isNewProject && (
            <div className="pt-4 border-t border-zinc-900 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-red-500/80 block">Danger Zone</label>
              
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  disabled={isMutating}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 border border-red-900/30 hover:border-red-900/60 rounded-xl py-2 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Project</span>
                </button>
              ) : (
                <div className="bg-red-950/10 border border-red-900/40 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2.5 text-red-400">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200">Are you absolutely sure?</h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                        This action cannot be undone. This will permanently delete <span className="text-zinc-300 font-medium">"{localDraft.name || 'this project'}"</span>.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isMutating}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 py-1.5 rounded-lg text-xs font-medium border border-zinc-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isMutating}
                      onClick={handleDelete}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-white py-1.5 rounded-lg text-xs font-medium transition-colors shadow-lg shadow-red-950/20 disabled:opacity-50"
                    >
                      {isMutating ? 'Purging...' : 'Confirm Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions Layout */}
        <div className="p-6 border-t border-zinc-900 bg-zinc-950 flex gap-3">
          <button
            onClick={closePanel}
            disabled={isMutating}
            className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 font-medium py-2.5 rounded-xl border border-zinc-800 text-sm transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isMutating}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-950/20 disabled:opacity-50"
          >
            {isMutating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}