# RM Workout Planner — Data Model

This document defines the core data structures used in the application.

The system is designed to help users calculate their estimated one-rep max (1RM) and build workouts based on training goals.

The data model focuses on simplicity for the first version of the application (MVP).

---

# User

Represents an application user.

Fields:

- id
- name
- bodyWeight
- trainingLevel

The training level determines which formula will be used to estimate the 1RM.

Examples:

- beginner → beginner-oriented formula
- advanced → athlete-oriented formula

---

# Exercise

Represents an exercise available in the system.

Fields:

- id
- name
- muscleGroup

Examples:

- Bench Press
- Squat
- Deadlift

---

# One Rep Max Record (1RM)

Represents a stored 1RM estimation calculated by the user.

Fields:

- id
- userId
- exerciseId
- weightLifted
- repetitions
- estimated1RM
- date

This value is used later to determine training loads for workouts.

---

# Workout Plan

Represents a workout created by the user.

Fields:

- id
- userId
- name
- goal

Training goals determine how the workout will be structured.

Examples of goals:

- strength
- hypertrophy
- endurance

The goal influences:

- repetition ranges
- rest time
- load calculation based on the user's 1RM.

---

# Workout Exercise

Represents an exercise inside a workout plan.

Fields:

- id
- workoutId
- exerciseId
- sets
- repetitions
- restTime
- load

Default values:

- sets = 3

Users can modify sets, repetitions and rest time after the exercise is added to the workout.
