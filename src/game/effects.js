export function applyEffects(gameState, effects) {
    gameState.score.sustentabilidade += effects.sustentabilidade;
    gameState.score.economia += effects.economia;
    gameState.score.popularidade += effects.popularidade;
}