import { gameState } from "./gameState.js";
import { rollDice } from "./dice.js";
import { applyEffect } from "./effects.js";

const result = rollDice();
gameState.lastRoll = result;
gameState.player.position += result;

applyEffect(gameState, 'solar');
applyEffect(gameState, 'pollution');

console.log(gameState.player);
console.log(result);