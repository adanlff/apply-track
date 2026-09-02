// localStorage-based data layer for ApplyTrack.
// Designed to be swapped with Supabase by replacing these functions.

import type { JobApplication } from '../types/applytrack-types';

const STORAGE_KEY = 'applytrack_applications';

function readFromStorage(): JobApplication[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as JobApplication[];
  } catch {
    return [];
  }
}

function writeToStorage(applications: JobApplication[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export async function getApplications(): Promise<JobApplication[]> {
  return readFromStorage();
}

export async function createApplication(application: JobApplication): Promise<JobApplication> {
  const existing = readFromStorage();
  const updated = [application, ...existing];
  writeToStorage(updated);
  return application;
}

export async function updateApplication(application: JobApplication): Promise<JobApplication> {
  const existing = readFromStorage();
  const updated = existing.map((a) => (a.id === application.id ? application : a));
  writeToStorage(updated);
  return application;
}

export async function deleteApplication(id: string): Promise<void> {
  const existing = readFromStorage();
  const updated = existing.filter((a) => a.id !== id);
  writeToStorage(updated);
}
