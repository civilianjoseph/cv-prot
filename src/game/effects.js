export function applyEffects(gameState, effects) {
  gameState.score.environmental  = Math.max(0, Math.min(100, gameState.score.environmental  + (effects.environmental  || 0)));
  gameState.score.economic  = Math.max(0, Math.min(100, gameState.score.economic  + (effects.economic  || 0)));
  gameState.score.energetic = Math.max(0, Math.min(100, gameState.score.energetic + (effects.energetic || 0)));
}

export function formatEffect(value) {
  if (value > 0) return `+${value}`;
  return `${value}`;
}
