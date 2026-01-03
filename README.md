# Looma - AI-Powered Video Creation Platform

<div align="center">
  <h3>Transform screen recordings into polished videos and step-by-step documentation</h3>
  <p>A comprehensive clone of Clueso.io built with React, Node.js, and AI services</p>
</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [Environment Variables](#environment-variables)

---

## Overview

Looma is an AI-powered platform that simplifies video and documentation creation. Users can upload screen recordings, and the system automatically:

- Extracts audio from videos
- Transcribes audio to text using Deepgram
- Generates studio-quality voiceovers using ElevenLabs
- Organizes projects in a clean, intuitive dashboard

---

## Features

### User Authentication

- Email/Password authentication via Supabase
- Google OAuth integration
- Protected routes and session management
- User profile management

### Video Processing

- Upload video files (MP4, MOV, AVI, WebM)
- Automatic audio extraction using FFmpeg
- Speech-to-text transcription via Deepgram AI
- AI-powered voice generation via ElevenLabs
- Real-time upload progress tracking

### Dashboard

- Clean, modern UI with black & blue theme
- Recent projects overview
- All projects page with grid layout
- Project cards with play and download functionality
- Empty state for first-time users

### Project Management

- View all uploaded and processed videos
- Play videos directly in browser
- Download processed videos
- Project metadata (creation date, title, etc.)

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Pages   │  │  Dashboard   │  │  All Projects│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                   │             │
│         └──────────────────┴───────────────────┘             │
│                          │                                   │
│                 ┌────────▼────────┐                         │
│                 │  Upload Modal   │                         │
│                 └────────┬────────┘                         │
└──────────────────────────┼──────────────────────────────────┘
                           │ HTTP POST (FormData)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              POST /api/upload-video                 │    │
│  │  1. Receive video file (Multer)                    │    │
│  │  2. Save to uploads/ directory                      │    │
│  │  3. Extract audio → FFmpeg                         │    │
│  │  4. Transcribe audio → Deepgram API                │    │
│  │  5. Generate new audio → ElevenLabs API            │    │
│  │  6. Return processed data                           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    ┌─────────┐      ┌─────────┐    ┌─────────┐
    │ FFmpeg  │      │Deepgram │    │ElevenLabs│
    │(Audio   │      │(Speech  │    │(Voice    │
    │Extract) │      │to Text) │    │Generate) │
    └─────────┘      └─────────┘    └─────────┘
```

### Data Flow

```
User Upload → Backend Receives → FFmpeg Extracts Audio
                                         ↓
                                  Deepgram Transcribes
                                         ↓
                               ElevenLabs Generates Audio
                                         ↓
                            Results Returned to Frontend
                                         ↓
                              Added to ProjectsContext
                                         ↓
                            Displayed on Dashboard
```

## Tech Stack

### Frontend

- **Framework:** React 18 with Vite
- **Routing:** React Router DOM
- **Authentication:** Supabase Auth
- **State Management:** React Context API
- **Styling:** Inline CSS with color system
- **Icons:** React Icons (Font Awesome)

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **File Upload:** Multer
- **Audio Processing:** FFmpeg
- **Speech-to-Text:** Deepgram SDK
- **Voice Generation:** ElevenLabs SDK
- **CORS:** Enabled for frontend communication

### Database & Auth

- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Email + OAuth)

### External Services

- **Deepgram:** AI speech recognition and transcription
- **ElevenLabs:** AI voice generation
- **Google OAuth:** Social authentication

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **FFmpeg** - Required for audio extraction
  - **Mac:** `brew install ffmpeg`
  - **Ubuntu/Debian:** `sudo apt install ffmpeg`
  - **Windows:** [Download from ffmpeg.org](https://ffmpeg.org/download.html)
- **Git** - [Download](https://git-scm.com/)

### API Keys Required

1. **Supabase Account** - [Create at supabase.com](https://supabase.com)
2. **Deepgram API Key** - [Get from deepgram.com](https://deepgram.com)
3. **ElevenLabs API Key** - [Get from elevenlabs.io](https://elevenlabs.io)
4. **Google OAuth Credentials** - [Google Cloud Console](https://console.cloud.google.com)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/looma.git
cd looma
```

### 2. Set Up Frontend

```bash
cd frontend
npm install
```

**Create `frontend/.env` file:**

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Backend

```bash
cd ../backend
npm install
```

**Create `backend/.env` file:**

```env
PORT=3000
DEEPGRAM_API_KEY=your_deepgram_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### 4. Configure Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Navigate to **Authentication** → **Providers**
4. **Enable Email Provider:**
   - Toggle ON
5. **Enable Google Provider:**
   - Add your Google OAuth Client ID and Secret
6. **Configure URL Settings:**
   - Go to **Authentication** → **URL Configuration**
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/dashboard`

### 5. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID**
5. Add **Authorized redirect URIs:**

```
   https://your-project-ref.supabase.co/auth/v1/callback
```

6. Copy Client ID and Secret to Supabase

### 6. Verify FFmpeg Installation

````bash
ffmpeg -version

## Running the Project

### Development Mode (Recommended)

You'll need **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
# OR
npm start
````

**Terminal 2 - Frontend Development Server:**

```bash
cd frontend
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/api/health

---

## Project Structure

```
Looma/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── AuthForm.jsx
│   │   │   │   ├── AuthToggle.jsx
│   │   │   │   ├── GoogleAuth.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   ├── Common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Logo.jsx
│   │   │   │   └── Divider.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── TopBar.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   └── UploadVideoModal.jsx
│   │   │   └── Layout/
│   │   │       └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AllProjects.jsx
│   │   ├── Context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProjectsContext.jsx
│   │   ├── styles/
│   │   │   └── colors.js
│   │   ├── supabaseClient.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── utils/
│   │   ├── videoProcessor.js
│   │   ├── deepgramService.js
│   │   └── elevenlabsService.js
│   ├── uploads/              (created automatically)
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## Design Decisions

### 1. Authentication Strategy

**Decision:** Use Supabase for authentication instead of building custom auth

- Faster development and deployment
- Built-in security best practices
- Easy OAuth integration
- Session management out of the box

### 2. State Management

**Decision:** Use React Context API instead of Redux

- Simpler for this scale of application
- Less boilerplate code

### 3. Styling Approach

**Decision:** Inline CSS with a centralized color system

- Component-scoped styles prevent conflicts
- Easy to maintain and modify

- Consistent color scheme via `colors.js`

### 4. File Storage

**Decision:** Local file system storage in development

- Simple implementation for MVP
- No additional cloud storage costs during development
- Easy to test and debug
- Can be migrated to S3/Cloud Storage later

### 5. Video Processing Pipeline

**Decision:** Sequential processing (Upload → Extract → Transcribe → Generate)  
**Reasoning:**

- Clear error handling at each step
- Easy to debug and monitor
- Simpler implementation than parallel processing
- Adequate performance for MVP

### 6. Frontend Framework

**Decision:** React with Vite instead of Create React App  
**Reasoning:**

- Faster build times with Vite
- Better development experience

---

## Environment Variables

### Frontend (.env)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Backend (.env)

```env
PORT=3000
DEEPGRAM_API_KEY=your_deepgram_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

---
