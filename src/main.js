import { rollDice } from "./dice.js";
import { gameState } from "./gameState.js";
import { applyEffect } from "./effects.js";

const btn = document.getElementById("startBtn");

btn.addEventListener("click", () => {
    const nickname =
    document.getElementById("nickname").value.trim();

    const gender =
    document.getElementById("gender").value;

    const msg =
    document.getElementById("msg");

    if(nickname === "" || gender === "") {
        msg.textContent =
        "Por favor, preencha todos os campos.";
        return;
    }

    gameState.nickname = nickname;
    gameState.gender = gender;
    
    localStorage.setItem("cidadeverdePlayer", JSON.stringify(gameState));

    window.location.href = "game.html";
});

function playTurn() {
    const result = rollDice();
    gameState.lastRoll = result;
    const playerSpace = getSpace(gameState.player.position);
    applyEffect(gameState, "player", playerSpace);

    gameState.turn += 1;
}