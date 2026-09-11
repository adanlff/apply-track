// Storage layer for ApplyTrack:
// Supports Google Sheets (via Apps Script Web App) + localStorage fallback.

import type { JobApplication } from '../types/applytrack-types';

const STORAGE_KEY = 'applytrack_applications';
const GOOGLE_SHEET_API = import.meta.env.PUBLIC_GOOGLE_SHEET_API || '';

function normalizeApplication(app: JobApplication): JobApplication {
  let statusHistory = Array.isArray(app.statusHistory) ? [...app.statusHistory] : [];

  if (statusHistory.length === 0) {
    if (app.status === 'applied') {
      statusHistory = [{ status: 'applied', changedAt: app.appliedDate || app.createdAt || new Date().toISOString() }];
    } else {
      statusHistory = [
        { status: 'applied', changedAt: app.appliedDate || app.createdAt || new Date().toISOString() },
        { status: app.status, changedAt: app.updatedAt || app.createdAt || new Date().toISOString() },
      ];
    }
  } else {
    const appliedIdx = statusHistory.findIndex((h) => h.status === 'applied');
    if (appliedIdx !== -1 && app.appliedDate) {
      statusHistory[appliedIdx] = {
        ...statusHistory[appliedIdx],
        changedAt: app.appliedDate,
      };
    }
  }

  return {
    ...app,
    statusHistory,
  };
}

function readFromStorage(): JobApplication[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as JobApplication[];
    return Array.isArray(parsed) ? parsed.map(normalizeApplication) : [];
  } catch {
    return [];
  }
}

function writeToStorage(applications: JobApplication[]): void {
  if (typeof window === 'undefined') return;
  const normalized = applications.map(normalizeApplication);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
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
        const normalized = json.data.map(normalizeApplication);
        writeToStorage(normalized);
        return normalized;
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
  const normalized = normalizeApplication(application);
  // Update local storage immediately for fast UI feedback
  const existing = readFromStorage();
  const updated = [normalized, ...existing.filter((a) => a.id !== normalized.id)];
  writeToStorage(updated);

  if (GOOGLE_SHEET_API) {
    try {
      await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain avoids CORS preflight issues with Google Apps Script
        body: JSON.stringify({ action: 'create', data: normalized }),
      });
    } catch (err) {
      console.error('Failed to sync new application to Google Sheets:', err);
    }
  }

  return normalized;
}

/**
 * Update an existing application
 */
export async function updateApplication(application: JobApplication): Promise<JobApplication> {
  const normalized = normalizeApplication(application);
  const existing = readFromStorage();
  const updated = existing.map((a) => (a.id === normalized.id ? normalized : a));
  writeToStorage(updated);

  if (GOOGLE_SHEET_API) {
    try {
      await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update', data: normalized }),
      });
    } catch (err) {
      console.error('Failed to sync update to Google Sheets:', err);
    }
  }

  return normalized;
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
