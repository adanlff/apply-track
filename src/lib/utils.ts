import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for ApplyTrack

/**
 * Generates a unique ID for new job applications.
 * Uses crypto.randomUUID when available, falls back to timestamp-based ID.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Formats a date string (ISO format) to localized Indonesian display format.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a date string for datetime-local input (YYYY-MM-DD).
 */
export function toInputDate(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.split('T')[0];
}

/**
 * Formats salary range into a readable Indonesian currency string.
 */
export function formatSalary(min?: number, max?: number, currency = 'IDR'): string {
  if (!min && !max) return '-';
  const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (min) return `ab ${fmt(min)}`;
  return `s.d. ${fmt(max!)}`;
}

/**
 * Calculates days since application date for time-elapsed display.
 */
export function daysSince(dateStr: string): number {
  const now = new Date();
  const applied = new Date(dateStr);
  const diff = now.getTime() - applied.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Truncates a string to maxLength with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}…`;
}
