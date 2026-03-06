export interface AnomalyScoreInput {
  timeSinceLastLoginMs: number;
  distanceKm: number;
  failuresInLastHour: number;
}

export function computeAnomalyScore(input: AnomalyScoreInput): number {
  let score = 0;

  // Rule 1: Geographical distance (proxy for impossible travel)
  if (input.distanceKm > 1000) score += 40;
  if (input.distanceKm > 5000) score += 30;

  // Rule 2: High velocity of failures
  if (input.failuresInLastHour > 3) score += 20;
  if (input.failuresInLastHour > 10) score += 40;

  // Rule 3: Irregular time (e.g. very rapid succession)
  if (input.timeSinceLastLoginMs < 60000 && input.distanceKm > 100) {
    score += 50; // Fast travel anomaly
  }

  return Math.min(score, 100);
}

export function detectRules(
  failures: number,
  distance: number,
  timeMs: number
): string[] {
  const flags: string[] = [];

  if (failures > 5) flags.push('brute_force_suspected');
  if (distance > 1000 && timeMs < 1000 * 60 * 60 * 12) {
    flags.push('impossible_travel');
  }

  // Add more arbitrary mock rules to demonstrate dashboard variety
  if (Math.random() > 0.95) flags.push('tor_exit_node');
  if (Math.random() > 0.98) flags.push('known_malicious_ip');

  return flags;
}
