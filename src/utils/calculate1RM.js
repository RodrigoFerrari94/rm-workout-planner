export function calculate1RM (weight, reps) {
 return Math.round(Number(weight) * (1 + Number(reps) / 30))
}