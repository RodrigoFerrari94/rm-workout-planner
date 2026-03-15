# RM Workout Planner — Features

## User Profile

Users can create a profile including:

- name
- body weight
- training level

Training levels:

- beginner
- intermediate
- advanced

The user's training level may influence the 1RM estimation method used by the system.


## 1RM Calculator

The calculator estimates the one-repetition maximum (1RM) for a selected exercise.

The estimation method may vary depending on the user's training level.  
Different formulas can provide better estimations depending on the athlete's experience and repetition range.

Inputs:

- exercise
- weight lifted
- repetitions

Optional inputs:

- equipment weight
- body weight contribution

User options:

- calculate a specific percentage of the estimated 1RM
- determine a target training load based on percentage

Outputs:

- estimated 1RM
- calculated training load based on the selected percentage


## Workout Builder

Users can add exercises to a workout plan.

Exercises can be added in two different ways:

### 1. Specific Load Mode

The user manually defines the working weight for the exercise.

### 2. Goal-Based Mode

The user selects a training goal.

Training goals:

- strength
- hypertrophy
- endurance

When a goal is selected, the system automatically determines:

- number of sets
- repetitions
- rest time


## Workout Session

During a workout session the user can:

- see the list of exercises
- track completed sets
- use a rest timer between sets


## Workout History

The system stores completed workouts including:

- exercises
- weights used
- sets performed
- workout date
