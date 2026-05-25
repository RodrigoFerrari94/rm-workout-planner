# RM Workout Planner — Roadmap

This document describes the development plan for the RM Workout Planner application.

## Phase 1 — Planning

- Define application features
- Define system architecture
- Create project documentation

## Phase 2 — Project Setup

- Create project with React
- Configure folder structure
- Setup routing

## Phase 3 — Exercise Database

- Create exercise list
- Organize exercises by muscle group

## Phase 4 — 1RM Calculator

- User inputs weight and repetitions
- Calculate estimated 1RM
- Display recommended training load

## Phase 5 — Workout Builder

- User selects training goal
- User selects exercises
- System automatically defines:
  - sets
  - repetitions
  - rest time

## Phase 6 — Workout Session

- Display exercises in sequence
- Implement rest timer
- Allow user to mark sets as completed

## Phase 7 — User System

- Implement login
- Save user profile
- Store training goals

## Phase 8 — Workout History

- Save completed workouts
- Display workout history

## Phase 9 — Backend Integration

- Connect application to Firebase
- Save user data

## Phase 10 — UI Improvements

- Improve user interface
- Responsive design

## Phase 11 — Deployment

- Deploy application

## Post-MVP Improvements

### Saved Workout Plans

In the current MVP, `currentWorkout` represents the temporary workout being built or executed.

In a future version, the app should support saved workout plans, allowing users to create, reuse, and switch between multiple workouts, such as Workout A, Workout B, and Workout C.

The future data structure should separate:

- `savedWorkoutPlans`: reusable workout templates created by the user
- `activeWorkoutSession`: the workout currently being executed
- `completedWorkouts`: the history of completed workout sessions

This will allow users to finish a workout session without losing the original workout plan.
