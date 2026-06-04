# rm-workout-planner

Workout planner and 1RM calculator built with React

# RM Workout Planner

RM Workout Planner is a fitness web application that helps users calculate their estimated one-rep max (1RM), build goal-based workouts, execute workout sessions, and review completed workouts.

The main goal of the project is to transform strength data into a structured training experience.

---

## Overview

Many people know how much weight they can lift for a given number of repetitions, but do not always know how to use that information to plan an effective workout.

RM Workout Planner connects the calculation of estimated 1RM with workout planning and workout execution.

The app allows the user to:

- calculate estimated 1RM
- save calculation history
- build a workout based on calculated exercises
- select training goals
- execute a workout session
- track completed sets
- use a rest timer
- save completed workouts locally
- review workout history

---

## Live Demo

Deployment link will be added soon.

---

## Repository

[GitHub Repository](https://github.com/rodrigoferrari94/rm-workout-planner)

---

## Main App Flow

```txt
Home
↓
Login / User Setup
↓
1RM Calculator
↓
Workout Builder
↓
Workout Session
↓
Workout History
```

---

## Features

### User Setup

The user can enter basic information:

- name
- body weight
- training level

This information is currently stored locally using `localStorage`.

---

### 1RM Calculator

The calculator estimates the user's one-rep max based on:

- selected exercise
- weight used
- repetitions performed

The result is saved in a local calculation history.

---

### Workout Builder

The Workout Builder uses the user's 1RM calculation history to create workouts.

The user can select a training goal and add calculated exercises to the current workout.

Available training goals:

- Adaptation
- Strength
- Hypertrophy
- Endurance

Each exercise added to the workout stores its own goal, load range, sets, reps, and rest time.

This allows the user to mix different goals in the same workout if needed.

---

### Workout Session

The Workout Session allows the user to execute the current workout.

The user can:

- view one exercise at a time
- see load range
- see suggested sets and reps
- track completed sets
- use a rest timer
- skip rest
- finish or restart exercises
- finish the full workout

Completed sets are compared with the suggested set range.

---

### Workout History

Completed workouts are saved locally and displayed in the Workout History page.

Each completed workout includes:

- date
- total exercises
- exercise names
- training goal
- completed sets
- load range

---

## Training Goals

| Goal        | Load Range | Sets |  Reps |     Rest |
| ----------- | ---------: | ---: | ----: | -------: |
| Adaptation  |    50% 1RM |  2-3 | 12-15 |   60-90s |
| Strength    | 85-95% 1RM |  4-6 |   1-5 | 180-300s |
| Hypertrophy | 70-84% 1RM |  3-4 |  8-12 |  90-180s |
| Endurance   | 55-69% 1RM |  2-3 | 12-20 |   30-60s |

---

## Technologies

- React
- Vite
- JavaScript
- React Router
- SCSS
- localStorage
- Lucide React

---

## UI Direction

The interface follows a mobile-first dark fitness style.

Main visual decisions:

- dark premium background
- elevated cards
- lime green as primary action color
- blue for secondary and timer elements
- red for destructive or warning states
- mobile-first layout
- reusable SCSS structure

---

## Data Persistence

The current MVP uses `localStorage`.

Stored data includes:

- user information
- 1RM calculation history
- current workout
- completed workouts

Firebase integration is planned for a future version.

---

## Project Structure

```txt
src/
├── components/
├── data/
├── pages/
├── styles/
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   └── pages/
├── utils/
└── main.jsx
```

---

## How to Run Locally

Clone the repository:

```bash
git clone https://github.com/rodrigoferrari94/rm-workout-planner.git
```

Enter the project folder:

```bash
cd rm-workout-planner
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Current Status

The project is currently in MVP stage.

Current version includes:

- complete local app flow
- mobile-first UI
- local data persistence
- workout creation
- workout execution
- completed workout history

---

## MVP Scope

The MVP focuses on proving the core product idea:

```txt
1RM calculation
→ workout generation
→ workout execution
→ workout history
```

Current limitations:

- data is stored locally
- only one active workout is supported
- no real authentication yet
- no backend integration yet
- no multiple saved workout plans yet

---

## Future Improvements

Planned improvements:

- Firebase Authentication
- Firestore database integration
- separate Login and Profile pages
- save user profile online
- save 1RM calculations per user
- save multiple workout plans
- allow named workout plans
- add exercise videos
- improve validation messages
- add progress charts
- add desktop dashboard layout
- improve workout analytics

---

## Portfolio Purpose

This project was built as a portfolio application to demonstrate:

- React component architecture
- state management with hooks
- form handling
- local persistence
- dynamic UI rendering
- workout generation logic
- SCSS architecture
- mobile-first interface design
- incremental product development
