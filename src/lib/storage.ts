// Storage layer for ApplyTrack:
// Supports Google Sheets (via Apps Script Web App) + localStorage fallback.

import type { JobApplication } from '../types/applytrack-types';

const STORAGE_KEY = 'applytrack_applications';
const GOOGLE_SHEET_API = import.meta.env.PUBLIC_GOOGLE_SHEET_API || '';

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

/**
 * Fetch all applications (from Google Sheets if configured, fallback to localStorage)
 */
export async function getApplications(): Promise<JobApplication[]> {
  if (GOOGLE_SHEET_API) {
    try {
      const res = await fetch(GOOGLE_SHEET_API);
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        writeToStorage(json.data);
        return json.data;
      }
    } catch (err) {
      console.warn('Google Sheets fetch failed, falling back to local storage:', err);
    }
  }
  return readFromStorage();
}

/**
 * Fetch a single application by its ID
 */
export async function getApplicationById(id: string): Promise<JobApplication | undefined> {
  const all = await getApplications();
  return all.find((a) => a.id === id);
}

/**
 * Add a new application
 */
export async function createApplication(application: JobApplication): Promise<JobApplication> {
  // Update local storage immediately for fast UI feedback
  const existing = readFromStorage();
  const updated = [application, ...existing];
  writeToStorage(updated);

  if (GOOGLE_SHEET_API) {
    try {
      await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain avoids CORS preflight issues with Google Apps Script
        body: JSON.stringify({ action: 'create', data: application }),
      });
    } catch (err) {
      console.error('Failed to sync new application to Google Sheets:', err);
    }
  }

  return application;
}

/**
 * Update an existing application
 */
export async function updateApplication(application: JobApplication): Promise<JobApplication> {
  const existing = readFromStorage();
  const updated = existing.map((a) => (a.id === application.id ? application : a));
  writeToStorage(updated);

  if (GOOGLE_SHEET_API) {
    try {
      await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update', data: application }),
      });
    } catch (err) {
      console.error('Failed to sync update to Google Sheets:', err);
    }
  }

  return application;
}

/**
 * Delete an application
 */
export async function deleteApplication(id: string): Promise<void> {
  const existing = readFromStorage();
  const updated = existing.filter((a) => a.id !== id);
  writeToStorage(updated);

  if (GOOGLE_SHEET_API) {
    try {
      await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'delete', id }),
      });
    } catch (err) {
      console.error('Failed to sync deletion to Google Sheets:', err);
    }
  }
}
