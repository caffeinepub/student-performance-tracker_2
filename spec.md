# Student Performance Tracker

## Current State
New project with no existing application code.

## Requested Changes (Diff)

### Add
- Full authentication system: email/password signup and login, with role-based access (admin vs regular user)
- Admin user: Muhammad Basharat Bashir Khan (basharatbashir033@gmail.com)
- Dashboard page showing: total subjects, marks obtained, current GPA/CGPA
- Subject management: Add, edit, delete subjects with credits, marks, and grades
- Automatic GPA & CGPA calculator based on 4.0 scale
- Performance charts: line chart (GPA over semesters) and bar chart (per-subject performance)
- Study recommendations engine: generate tips based on GPA thresholds and weak subjects
- Timetable generator: create weekly class schedules with day/time/subject entries
- Home page: landing with hero section, feature highlights, CTA
- About page: professional bio of the developer/owner
- Contact page: contact form + email display
- Navigation bar: Home, Dashboard, About, Contact
- AdSense placeholder sections
- Premium feature lock indicator for advanced analytics

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- User profile storage (name, email, role: admin/student)
- Subject/course records per user: subject name, code, credits, marks obtained, total marks, semester, instructor
- Timetable entries per user: day, time, subject, room
- Contact message storage: name, email, message, timestamp
- CRUD operations for subjects and timetable entries
- GPA/CGPA calculation logic (grade points based on percentage)
- Admin-only: view all users and their data

### Frontend (React + TypeScript)
- Multi-page SPA with React Router: /, /dashboard, /about, /contact, /admin
- Auth flow: signup/login forms stored in backend, session via localStorage
- Dashboard: stat cards (subjects, avg marks, GPA/CGPA), performance charts, subject table with add/edit/delete
- Study recommendations panel: conditional tips based on GPA
- Timetable generator: form to add slots, weekly grid display
- Charts: Recharts library for line + bar charts
- About page: developer profile section
- Contact page: form that saves messages to backend
- Responsive layout with sidebar for authenticated users
- Blue/white professional color scheme matching design preview
