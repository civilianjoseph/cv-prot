import { boardSquares } from '../data/boardSquares.js';

const ROAD_ROWS = [
  [23, 22, 21, 20, 19, 18],
  [12, 13, 14, 15, 16, 17],
  [11, 10,  9,  8,  7,  6],
  [ 0,  1,  2,  3,  4,  5]
];

const TURN_SIDES = ['right', 'left', 'right'];

function createCell(squareIndex, playerPosition) {
  const square = boardSquares[squareIndex];
  const cell = document.createElement('div');
  cell.classList.add('cell', `cell-${square.type}`);
  cell.dataset.square = squareIndex;
  cell.title = `Casa ${squareIndex} — clique para ver detalhes`;

  if (squareIndex === playerPosition) {
    cell.classList.add('player');
  } else if (squareIndex < playerPosition) {
    cell.classList.add('visited');
  }

  cell.innerHTML = `
    <div class="cell-number">${squareIndex}</div>
    <div class="cell-icon">${square.icon}</div>
    <div class="cell-label">${square.label}</div>
  `;

  return cell;
}

export function renderBoard(boardElement, playerPosition) {
  boardElement.innerHTML = '';

  ROAD_ROWS.forEach((rowSquares, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('road-row');

    rowSquares.forEach((squareIndex, positionInRow) => {
      if (positionInRow > 0) {
        const connector = document.createElement('div');
        connector.classList.add('road-h-connector');
        rowElement.appendChild(connector);
      }
      rowElement.appendChild(createCell(squareIndex, playerPosition));
    });

    boardElement.appendChild(rowElement);

    if (rowIndex < ROAD_ROWS.length - 1) {
      const turn = document.createElement('div');
      turn.classList.add('road-turn', `road-turn-${TURN_SIDES[rowIndex]}`);
      boardElement.appendChild(turn);
    }
  });
}

export function updatePlayerPosition(playerPosition) {
  document.querySelectorAll('.cell').forEach(cell => {
    const squareIndex = parseInt(cell.dataset.square);
    cell.classList.remove('player', 'visited');
    if (squareIndex === playerPosition) {
      cell.classList.add('player');
    } else if (squareIndex < playerPosition) {
      cell.classList.add('visited');
    }
  });
}
