import { gameState }from "./game/gameState.js";
import { rollDice }from "./game/dice.js";
import { decisions }from "./game/decisions.js";
import { applyEffects }from "./game/effects.js";


const startBtn = document.getElementById("startBtn");

if(startBtn){

    startBtn.addEventListener("click", () => {

        const nickname = document.getElementById("nickname").value;

        const msg = document.getElementById("msg");

        if(nickname === ""){msg.textContent ="Digite um nickname";

            return;
        }

        gameState.player.nickname = nickname;

        localStorage.setItem("cidadeverdePlayer",JSON.stringify(gameState));

        window.location.href ="game.html";
    });
}


const board = document.getElementById("board");

if(board){

    const savedData =JSON.parse(localStorage.getItem("cidadeverdePlayer"));

    if(savedData){

        gameState.player =
        savedData.player;

        gameState.score =
        savedData.score;
    }


    updateScore();


    for(let i = 0; i < 20; i++){

        const cell =
        document.createElement("div");

        cell.classList.add("cell");

        cell.textContent = i;

        board.appendChild(cell);
    }


    updateBoard();


    const rollDiceBtn =
    document.getElementById("rollDiceBtn");


    rollDiceBtn.addEventListener("click", () => {

        const result =
        rollDice();

        showDicePopup(result);

    });

}


function showDicePopup(number){

    const popup =
    document.getElementById("dicePopup");

    popup.classList.remove("hidden");

    document.getElementById("diceNumber")
    .textContent = number;


    document.getElementById("closeDicePopup")
    .onclick = () => {

        popup.classList.add("hidden");

        movePlayer(number);
    };
}



function movePlayer(steps){

    gameState.player.position += steps;

    if(gameState.player.position > 19){

        gameState.player.position = 19;
    }

    updateBoard();

    showDecision();
}



function updateBoard(){

    const cells =
    document.querySelectorAll(".cell");

    cells.forEach(cell => {

        cell.classList.remove("player");
    });

    cells[
        gameState.player.position
    ].classList.add("player");
}



function showDecision(){

    const popup =
    document.getElementById("decisionPopup");

    popup.classList.remove("hidden");

    const decision =
    decisions[
        gameState.player.position %
        decisions.length
    ];

    document.getElementById("question")
    .textContent =
    decision.question;

    const options =
    document.getElementById("options");

    options.innerHTML = "";


    decision.options.forEach(option => {

        const btn =
        document.createElement("button");

        btn.textContent =
        option.text;

        btn.style.display = "block";

        btn.style.margin =
        "10px auto";


        btn.onclick = () => {

            applyEffects(
                gameState,
                option.effects
            );


            updateScore();

            popup.classList.add("hidden");

            localStorage.setItem(
                "cidadeverdePlayer",
                JSON.stringify(gameState)
            );
        };

        options.appendChild(btn);
    });
}


function updateScore(){

    document.getElementById("eco")
    .textContent =
    gameState.score.sustentabilidade;

    document.getElementById("money")
    .textContent =
    gameState.score.economia;

    document.getElementById("popularity")
    .textContent =
    gameState.score.popularidade;
}