# AI Gym Posture Detection & Workout Coach

An advanced, privacy-first computer vision fitness application that analyzes exercise movements, counts repetitions, scores posture, and provides personalized coaching feedback in real time.

---

## Features

- **Real-Time 3D Pose Estimation**: Powered by MediaPipe BlazePose (33 key body landmarks) running entirely client-side via WebAssembly with automatic GPU/CPU fallback.
- **Biomechanical State Machines**: Robust exercise detection for:
  - **Squats**: Tracks knee flexion angles, hip depth, and torso alignment.
  - **Push-Ups**: Evaluates elbow flexion and body plank integrity.
  - **Bicep Curls**: Monitors full range of motion from extension to peak contraction.
  - **Shoulder Press**: Assesses overhead vertical extension and lock-out control.
- **Anti-False-Rep Logic**: Employs hysteresis thresholds and temporal smoothing to prevent false counts and accidental triggerings.
- **Comprehensive Workout Reports**:
  - Breakdown of total, correct, and incorrect repetitions.
  - Normalized Form Score (0–100) based on joint alignment and movement stability.
  - Detected warning frequency and average relevant joint angles.
  - Post-session AI Coach feedback summarizing strengths, primary fixes, and training cues.
- **Progress & Analytics Dashboard**:
  - Visual trendlines showing form score improvements over time.
  - Exercise-specific progress breakdowns and personal best records (🏆 Best Score, 🔥 Rep Record).
  - Weekly summary metrics.
- **Privacy First & Zero Latency**: Video frames are analyzed locally in the browser—raw video never leaves your device. Only aggregated workout metrics are sent to the backend for optional coaching summaries.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Computer Vision**: `@mediapipe/tasks-vision` (MediaPipe Pose Landmarker)
- **Backend / API**: Node.js, Express, `@google/genai`
- **Build Tools**: Vite, esbuild, TypeScript

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or bun

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd ai-gym-posture-coach
npm install
```

### 2. Configure Environment Variables

Copy the sample environment file:

```bash
cp .env.example .env
```

Add your Gemini API key (optional, used for post-workout coaching recommendations):

```env
GEMINI_API_KEY="your_api_key_here"
PORT=3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser. Grant webcam access when prompted.

---

## Production Build & Deployment

### Build the Application

```bash
npm run build
```

This compiles both the Vite frontend assets to `dist/` and bundles the Express server to `dist/server.cjs`.

### Start Production Server

```bash
npm start
```

The application will listen on the port defined by `PORT` (default `3000`).

---

## Project Structure

```
├── public/                 # Static assets
├── server.ts               # Express backend proxy for AI coaching feedback
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Camera.tsx      # Video analyzer component
│   │   ├── Header.tsx      # App navigation bar
│   │   ├── ProgressAnalytics.tsx # Charts and trend dashboard
│   │   ├── VideoAnalyzer.tsx     # File-based video processing
│   │   └── WorkoutReport.tsx     # Session summary modal/view
│   ├── pages/              # App view routes
│   │   ├── About.tsx       # Project details & documentation
│   │   ├── Camera.tsx      # Live webcam workout session
│   │   ├── Dashboard.tsx   # Main landing & exercise selector
│   │   ├── History.tsx     # Session history logs
│   │   └── Workout.tsx     # Video upload analysis page
│   ├── utils/
│   │   ├── exerciseDetectors.ts # Biomechanical state machines & angles
│   │   ├── poseUtils.ts         # MediaPipe Pose Landmarker loader
│   │   └── storage.ts           # LocalStorage workout persistence
│   ├── App.tsx             # Main routing and layout
│   └── main.tsx            # React application entry point
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

---

## License

MIT License. Free for educational and personal use.
