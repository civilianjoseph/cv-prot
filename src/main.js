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

const playerData = JSON.parse(localStorage.getItem("cidadeverdePlayer"));

if (playerData) {
    gameState.nickname = playerData.nickname;
    gameState.gender = playerData.gender;
}

document.getElementById("playerName").textContent = "Jogador: " + gameState.nickname;


const totalCasas = 20;

const board = document.getElementById("board");

for (let i = 0; i < totalCasas; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = i;
    board.appendChild(cell);
}

function atualizarTabuleiro() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("player"));
    cells[gameState.position].classList.add("player");
}

const btn = document.getElementById("rollDice");

btn.addEventListener("click", () => {
    const valor = rollDice();
    
    document.getElementById("diceResult").textContent = "Você tirou: " + valor;

    if (gameState.position + valor >= totalCasas) {
        gameState.position = totalCasas - 1;
    }

    atualizarTabuleiro
});

atualizarTabuleiro();