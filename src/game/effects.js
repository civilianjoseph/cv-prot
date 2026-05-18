export function applyEffects(gameState, effects) {
    gameState.scores.sustentabilidade += effects.sustentabilidade;
    gameState.scores.economia += effects.economia;
    gameState.scores.popularidade += effects.popularidade;
}