# APPLYTRACK: FULL APPLICATION BLUEPRINT
> **Document Target**: `FULL BLUEPRINT` | **Base Font**: `Bricolage Grotesque (16px)` | **Primary Color**: `1D4533` | **Date**: 2026-09-02

---

## 1. Executive Summary & Mission Overview
**ApplyTrack** adalah aplikasi web modern tingkat produksi yang dirancang dengan misi arsitektur berikut:
> "ApplyTrack adalah website personal untuk membantu pengguna mencatat dan memantau lowongan kerja yang telah dilamar dalam satu tempat. Aplikasi ini dibuat sebagai alternatif yang lebih praktis dibandingkan spreadsheet, sehingga pengguna dapat dengan mudah melihat detail setiap lamaran, mengetahui status proses rekrutmen, serta memperbarui perkembangan lamaran secara cepat.

Setiap lowongan dapat menyimpan informasi seperti nama perusahaan, posisi yang dilamar, lokasi, tanggal melamar, jenis pekerjaan, sumber lowongan, link lowongan, status rekrutmen, dan catatan tambahan. Pengguna dapat memantau seluruh proses lamaran melalui satu halaman dashboard yang sederhana, responsif, dan mudah digunakan.

Target utama ApplyTrack adalah job seeker, fresh graduate, mahasiswa, maupun profesional yang sedang aktif melamar ke banyak perusahaan dan membutuhkan cara yang lebih terorganisir untuk tracking proses rekrutmen."

### 1.1 Target Architecture Scope & Objectives
- **Arsitektur Modular**: Berbasis pola **Atomic Design** dengan pemisahan tanggung jawab yang jelas.
- **Desain Presisi**: Skala tipografi Golden Ratio dengan palet warna Tailwind 50-950 yang diturunkan secara matematis.
- **Kualitas Bebas Slop**: Mengintegrasikan seluruh guardrails anti-slop untuk menjamin keaslian visual, teks natural, dan aksesibilitas.

---

## 2. Technology Stack & Framework Matrix
| Layer | Technology | Specification / Role | Constraints |
|---|---|---|---|
| **Frontend** | `Astro + React` | Primary UI framework & reactive view layer | Strict TypeScript, Component Modularity |
| **Styling** | `Tailwind CSS` | Utility-first styling dengan custom design tokens | Design tokens only, no ad-hoc hex |
| **Backend** | `Supabase` | API endpoints, service integrations, & business logic | Typed routes, clean error handling |
| **Database** | `Supabase PostgreSQL` | Data persistence & schema layer | Sanitized queries, strong schemas |
| **State** | `React useState / useReducer` | Central reactive store | Single source of truth, typed actions |

---

## 3. Comprehensive Functional Requirements & Feature Architecture Breakdown
### 3.1 Fitur: Dashboard / Application Tracker
- **Technical Overview**: Implementasi modul dashboard / application tracker sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin dashboard / application tracker agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`dashboard-application-tracker-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.2 Fitur: Add Job Application
- **Technical Overview**: Implementasi modul add job application sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin add job application agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`add-job-application-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.3 Fitur: Edit Job Application
- **Technical Overview**: Implementasi modul edit job application sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin edit job application agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`edit-job-application-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.4 Fitur: Delete Job Application
- **Technical Overview**: Implementasi modul delete job application sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin delete job application agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`delete-job-application-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.5 Fitur: View Application Details
- **Technical Overview**: Implementasi modul view application details sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin view application details agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`view-application-details-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.6 Fitur: Search Applications
- **Technical Overview**: Implementasi modul search applications sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin search applications agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`search-applications-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.7 Fitur: Filter Applications by Status
- **Technical Overview**: Implementasi modul filter applications by status sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin filter applications by status agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`filter-applications-by-status-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.8 Fitur: Filter Applications by Date
- **Technical Overview**: Implementasi modul filter applications by date sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin filter applications by date agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`filter-applications-by-date-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.9 Fitur: Sort Applications
- **Technical Overview**: Implementasi modul sort applications sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin sort applications agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`sort-applications-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.10 Fitur: Application Status Tracking
- **Technical Overview**: Implementasi modul application status tracking sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin application status tracking agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`application-status-tracking-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.11 Fitur: Application Status History / Timeline
- **Technical Overview**: Implementasi modul application status history / timeline sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin application status history / timeline agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`application-status-history-timeline-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.12 Fitur: Company Information
- **Technical Overview**: Implementasi modul company information sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin company information agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`company-information-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.13 Fitur: Job Position Information
- **Technical Overview**: Implementasi modul job position information sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin job position information agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`job-position-information-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.14 Fitur: Application Date
- **Technical Overview**: Implementasi modul application date sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin application date agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`application-date-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.15 Fitur: Job Source & Job URL
- **Technical Overview**: Implementasi modul job source & job url sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin job source & job url agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`job-source-job-url-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.16 Fitur: Salary Information
- **Technical Overview**: Implementasi modul salary information sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin salary information agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`salary-information-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.17 Fitur: Personal Notes
- **Technical Overview**: Implementasi modul personal notes sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin personal notes agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`personal-notes-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.18 Fitur: Application Statistics
- **Technical Overview**: Implementasi modul application statistics sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin application statistics agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`application-statistics-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

### 3.19 Fitur: Responsive Mobile & Desktop Layout
- **Technical Overview**: Implementasi modul responsive mobile & desktop layout sebagai fondasi inti alur kerja sistem.
- **User Story**: *Sebagai pengguna sistem, saya ingin responsive mobile & desktop layout agar seluruh proses dapat berjalan cepat, terstruktur, dan tervalidasi.*
- **UI Components Hierarchy**:
  * Komponen Atom: Tombol aksi, input kontrol, badge status, dan wrapper ikon `Lucide Icons`.
  * Komponen Molekul: Field input berlabel, selector kustom, dan bilah filter.
  * Komponen Organisme: Panel alur kerja utama dan view data interaktif (`responsive-mobile-desktop-layout-panel`).
- **Interactions & Validation**:
  * Validasi field input secara real-time dengan feedback visual yang jelas.
  * Transisi status reaktif dan penanganan event keyboard.
- **Matriks 4 UI States**:
  * **Default State**: Kontrol aktif siap berinteraksi dengan pengguna.
  * **Loading State**: Animasi skeleton loader beresolusi halus.
  * **Empty State**: Pesan panduan informatif dengan tombol ajakan bertindak (CTA).
  * **Error State**: Notifikasi kesalahan ramah pengguna dengan tombol coba lagi (*retry*).

---

## 4. Complete Architecture & Repository File Tree
Struktur direktori repositori wajib mengikuti konvensi **`kebab-case`** dan disesuaikan dengan frontend framework **`Astro + React`**:

```bash
applytrack/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── app-button.tsx
│   │   │   ├── app-input.tsx
│   │   │   └── app-icon.tsx
│   │   ├── molecules/
│   │   │   ├── app-select.tsx
│   │   │   └── form-field.tsx
│   │   └── organisms/
│       ├── dashboard-application-tracker-panel.tsx
│       └── dashboard-application-tracker-view.tsx
│       ├── add-job-application-panel.tsx
│       └── add-job-application-view.tsx
│       ├── edit-job-application-panel.tsx
│       └── edit-job-application-view.tsx
│       ├── delete-job-application-panel.tsx
│       └── delete-job-application-view.tsx
│       ├── view-application-details-panel.tsx
│       └── view-application-details-view.tsx
│       ├── search-applications-panel.tsx
│       └── search-applications-view.tsx
│       ├── filter-applications-by-status-panel.tsx
│       └── filter-applications-by-status-view.tsx
│       ├── filter-applications-by-date-panel.tsx
│       └── filter-applications-by-date-view.tsx
│       ├── sort-applications-panel.tsx
│       └── sort-applications-view.tsx
│       ├── application-status-tracking-panel.tsx
│       └── application-status-tracking-view.tsx
│       ├── application-status-history-timeline-panel.tsx
│       └── application-status-history-timeline-view.tsx
│       ├── company-information-panel.tsx
│       └── company-information-view.tsx
│       ├── job-position-information-panel.tsx
│       └── job-position-information-view.tsx
│       ├── application-date-panel.tsx
│       └── application-date-view.tsx
│       ├── job-source-job-url-panel.tsx
│       └── job-source-job-url-view.tsx
│       ├── salary-information-panel.tsx
│       └── salary-information-view.tsx
│       ├── personal-notes-panel.tsx
│       └── personal-notes-view.tsx
│       ├── application-statistics-panel.tsx
│       └── application-statistics-view.tsx
│       ├── responsive-mobile-desktop-layout-panel.tsx
│       └── responsive-mobile-desktop-layout-view.tsx
│   ├── pages/
│   │   ├── dashboard-page.tsx
│   │   └── dashboard-application-tracker-page.tsx
│   │   └── add-job-application-page.tsx
│   │   └── edit-job-application-page.tsx
│   │   └── delete-job-application-page.tsx
│   │   └── view-application-details-page.tsx
│   │   └── search-applications-page.tsx
│   │   └── filter-applications-by-status-page.tsx
│   │   └── filter-applications-by-date-page.tsx
│   │   └── sort-applications-page.tsx
│   │   └── application-status-tracking-page.tsx
│   │   └── application-status-history-timeline-page.tsx
│   │   └── company-information-page.tsx
│   │   └── job-position-information-page.tsx
│   │   └── application-date-page.tsx
│   │   └── job-source-job-url-page.tsx
│   │   └── salary-information-page.tsx
│   │   └── personal-notes-page.tsx
│   │   └── application-statistics-page.tsx
│   │   └── responsive-mobile-desktop-layout-page.tsx
│   ├── stores/
│   │   └── applytrack-store.ts
│   ├── types/
│   │   └── applytrack-types.ts
│   ├── composables/
│   │   └── use-applytrack-workflow.ts
│   ├── App.tsx
│   └── main.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 5. Design System & Design Token Master Guide

### 5.1 Skala Tipografi Golden Ratio (16px Base):
| Token | Size (px) | Size (rem) | Line Height | Role |
|---|---|---|---|---|
| `text-golden-xs` | **9.89px** | `0.618rem` | 1.4 | Micro / Badges |
| `text-golden-sm` | **12.58px** | `0.786rem` | 1.45 | Small / Captions |
| `text-golden-base` | **16px** | `1.000rem` | 1.55 | Body Base |
| `text-golden-h4` | **20.35px** | `1.272rem` | 1.35 | Heading 4 |
| `text-golden-h3` | **25.89px** | `1.618rem` | 1.3 | Heading 3 |
| `text-golden-h2` | **41.89px** | `2.618rem` | 1.2 | Heading 2 |
| `text-golden-h1` | **67.78px** | `4.236rem` | 1.15 | Heading 1 |
| `text-golden-hero` | **109.67px** | `6.854rem` | 1.05 | Hero Display |

### 5.2 Palet Warna Tailwind 50-950 (`1D4533`):
```js
// tailwind.config.js - colors.brand extension
brand: {
  50: '#E4E9E7',
  100: '#C7D1CC',
  200: '#99ABA3',
  300: '#6C867A',
  400: '#466658',
  500: '#1D4533', // Primary default
  600: '#183A2B',
  700: '#132E22',
  800: '#0F231A',
  900: '#0A1812',
  950: '#060E0A',
}
```

### 5.3 UI Constants:
- **Corner Radius**: `6px (rounded-md)`
- **Icon Set**: `Lucide Icons`
- **Surface Theme**: Dark Obsidian Hierarchy (`#08090C` base, `#101217` surface, `#161922` card, `#1A1E29` panel, `#252B3B` border)

---

## 6. Anti-Slop AI Guardrails & Skill Directives (.agents Skills)
### 6.1 [antislop-ui] UI & Desain Visual
- **Tujuan Desain**: Menolak dekorasi AI klise, gradien hampa tanpa tujuan fungsional, dan glowing orbs berlebih yang mengaburkan hierarki visual antarmuka.
- **Prinsip Visual & Rekayasa Desain**:
  * **Uji Tujuan (Purpose Test)**: Setiap elemen visual, garis pemisah (border), dan efek elevasi wajib memiliki fungsi navigasi atau penegasan status yang jelas.
  * **Hierarki Permukaan Obsidian Dark**: Terapkan skema permukaan berlapis secara disiplin (`#08090C` base canvas, `#101217` surface containers, `#161922` cards, `#1A1E29` panels/dialogs, dan `#252B3B` border divider).
  * **Larangan Pola AI Klise**: Dilarang menggunakan background blur mesh acak, gradien teks warna-warni yang sulit dibaca, atau bayangan melayang yang tidak konsisten.
  * **Design Token Enforced**: Seluruh warna wajib merujuk pada token Tailwind yang telah didefinisikan (mis. `brand-500`, `obsidian-card`), bukan nilai raw hex ad-hoc.

### 6.2 [antislop-copywriting] Copywriting & Human Voice
- **Tujuan Bahasa**: Menghilangkan nada bahasa pemasaran hiperbolis buatan mesin (*AI marketing slop*) dan menghadirkan komunikasi yang lugas, manusiawi, dan presisi.
- **Prinsip Bahasa & Tipografi**:
  * **Pembersihan Kosakata Klise AI**: Dilarang menggunakan kata-kata klise seperti *"Unleash"*, *"Elevate"*, *"Supercharge"*, *"Delve"*, *"Game-changer"*, *"Seamlessly"*, atau *"Revolutionize"*.
  * **Aturan Tanda Baca R-02**: DILARANG KERAS menggunakan karakter em dash (`—`) dalam teks narasi maupun judul. Gunakan tanda titik dua (:), koma (,), tanda kurung (), atau titik (.).
  * **Ajakan Bertindak (CTA) Spesifik**: Gunakan label tombol yang langsung mendeskripsikan tindakan nyata (contoh: *"Buat Transaksi Baru"*, *"Ekspor Dokumen .md"*, *"Simpan Perubahan"*), bukan kalimat mengambang (*"Mulai Sekarang"*, *"Pelajari Lebih Lanjut"*).
  * **Zero Fabricated Claims**: Dilarang keras menampilkan statistik rekayasa (*"99.9% Kepuasan Pengguna"* tanpa data riil) atau ulasan testimoni palsu.

### 6.3 [antislop-human] Aksesibilitas & Ergonomi Manusia
- **Tujuan Aksesibilitas**: Menjamin seluruh antarmuka dapat dioperasikan secara efisien oleh manusia dengan beragam kemampuan dan perangkat input.
- **Prinsip Ergonomi & Kepatuhan WCAG AA**:
  * **Rasio Kontras Warna**: Setiap pasangan warna teks dan latar belakang wajib memenuhi standar rasio kontras WCAG AA (minimal 4.5:1 untuk teks standar dan 3:1 untuk kontrol antarmuka / heading besar).
  * **Navigasi Keyboard Penuh**: Seluruh alur kerja dan dialog interaktif wajib dapat diakses secara berurutan menggunakan tombol `Tab`, `Shift+Tab`, `Enter`, `Space`, serta tombol `Escape` untuk menutup dropdown atau modal overlay.
  * **Focus Indicators Terlihat**: Setiap elemen yang menerima fokus wajib menampilkan focus ring kontras yang jelas (mis. `ring-2 ring-brand-500/50 outline-none`).
  * **Kelengkapan Status ARIA**: Komponen kustom wajib dilengkapi atribut semantik (`aria-expanded`, `aria-haspopup`, `aria-label`, `role`, dan relasi `id`/`for` pada form).

### 6.4 [antislop-layoutmobile] Tata Letak Responsif Mobile Guard
- **Tujuan Tata Letak**: Memastikan antarmuka kokoh, nyaman disentuh, dan tidak mengalami kerusakan visual pada berbagai dimensi layar.
- **Prinsip Responsif & Layout Defensif**:
  * **Zero Horizontal Overflow**: Tata letak dilarang menimbulkan scroll horizontal yang tidak diinginkan pada viewport layar smartphone (lebar minimum 320px).
  * **Ukuran Touch Target Minimal 44px**: Seluruh tombol interaktif, selector dropdown, dan input kontrol wajib memiliki tinggi/lebar area sentuh minimal 44px (`h-11` atau `min-h-[44px]`).
  * **Dynamic Grid Reflow**: Grid data dan kartu fitur wajib reflow secara dinamis dari 1 kolom pada mobile (`grid-cols-1`) menjadi multi-kolom pada tablet dan desktop (`sm:grid-cols-2 lg:grid-cols-3`).
  * **Defensive Text Wrapping**: Terapkan kelas pembungkus teks seperti `break-words`, `text-balance`, dan `min-w-0` pada kontainer fleksibel agar teks panjang tidak memotong pembatas kartu.

### 6.5 [antislop-code] Kebersihan Kode & Komentar
- **Tujuan Kualitas Kode**: Menjaga repositori tetap bersih dari komentar sampah buatan AI dan mempertahankan arsitektur perangkat lunak yang berdisiplin tinggi.
- **Prinsip Rekayasa Kode**:
  * **Higienitas Komentar**: Hapus seluruh komentar generik yang hanya menyatakan hal-hal yang sudah jelas terlihat dari kode (seperti `// render component`, `// handle click`, `// return JSX`).
  * **Pertahankan Invariant Arsitektur**: Komentar dan docstrings hanya boleh digunakan untuk menjelaskan aturan domain bisnis krusial, alasan arsitektur non-intuitif, atau penanganan edge-case rumit.
  * **Strict TypeScript (Zero Any)**: Dilarang keras menggunakan tipe data `any`. Seluruh parameter fungsi, props komponen, payload API, dan state store wajib memiliki interface atau type definisi eksplisit.
  * **Pola Komponen Bersih**: Gunakan idiomatik framework modern (mis. `<script setup lang="ts">` pada Vue 3 atau Server/Client Components modular pada Next.js) dengan pemisahan business logic ke dalam composables/hooks.

---

## 7. Step-by-Step Phased Implementation Roadmap for AI Coding Agents
- [ ] **Phase 1: Scaffolding & Setup**: Inisialisasi proyek, konfigurasi Tailwind tokens, dan setup types interface.
- [ ] **Phase 2: Atomic Components**: Pembuatan komponen atom (Button, Input, Textarea, Select, Icon) dengan aksesibilitas penuh.
- [ ] **Phase 3: Core Business Logic**: Implementasi state store `React useState / useReducer` dan alur kerja reaktif.
- [ ] **Phase 4: Feature Views & Layout**: Penyusunan halaman utama (dashboard-application-tracker-page, add-job-application-page, edit-job-application-page, delete-job-application-page, view-application-details-page, search-applications-page, filter-applications-by-status-page, filter-applications-by-date-page, sort-applications-page, application-status-tracking-page, application-status-history-timeline-page, company-information-page, job-position-information-page, application-date-page, job-source-job-url-page, salary-information-page, personal-notes-page, application-statistics-page, responsive-mobile-desktop-layout-page), dan penanganan 4 UI states.
- [ ] **Phase 5: Anti-Slop Audit & Quality Gates**: Verifikasi kontras WCAG AA, pengetesan keyboard, dan pembersihan kode.