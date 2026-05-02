import { rollDice } from "./dice.js";
import { gameState } from "./gameState.js";
import { applyEffect } from "./effects.js";

function playTurn() {
    const result = rollDice();
    gameState.lastRoll = result;
    const playerSpace = getSpace(gameState.player.position);
    applyEffect(gameState, "player", playerSpace);

    gameState.turn += 1;
}