import { gameState } from './game/gameState.js';
import { rollDice } from './game/dice.js';
import { applyEffects, formatEffect } from './game/effects.js';
import { renderBoard, updatePlayerPosition } from './game/board.js';
import { regions } from './data/regions.js';
import { events } from './data/events.js';
import { boardSquares } from './data/boardSquares.js';

const startButton = document.getElementById('startBtn');

if (startButton) {
  let selectedRegion = null;

  document.querySelectorAll('.region-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.region-card').forEach(otherCard => otherCard.classList.remove('selected'));
      card.classList.add('selected');
      selectedRegion = regions.find(region => region.key === card.dataset.region);
    });
  });

  startButton.addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
    const errorMessage = document.getElementById('msg');

    if (!nickname) {
      errorMessage.textContent = 'Digite um nickname para continuar.';
      return;
    }
    if (!selectedRegion) {
      errorMessage.textContent = 'Escolha uma região do Brasil.';
      return;
    }

    gameState.player.nickname = nickname;
    gameState.player.region = selectedRegion;
    gameState.player.position = 0;
    gameState.score = { environmental: 50, economic: 50, energetic: 50 };
    gameState.history = [];
    gameState.finished = false;

    localStorage.setItem('cvprot', JSON.stringify(gameState));
    window.location.href = 'game.html';
  });
}

const boardElement = document.getElementById('board');

if (boardElement) {
  const savedState = JSON.parse(localStorage.getItem('cvprot'));
  if (!savedState || !savedState.player.region) {
    window.location.href = 'index.html';
  } else {
    gameState.player = savedState.player;
    gameState.score = savedState.score;
    gameState.history = savedState.history || [];
    gameState.finished = savedState.finished || false;
  }

  const region = gameState.player.region;

  document.getElementById('regionIcon').textContent = region.icon;
  document.getElementById('regionName').textContent = `${region.name} — ${region.city}`;
  document.getElementById('energyProfile').textContent = region.energyProfile;
  document.getElementById('playerName').textContent = `👤 ${gameState.player.nickname}`;

  renderBoard(boardElement, gameState.player.position);
  updateScore();

  boardElement.addEventListener('click', (clickEvent) => {
    const overlay = document.getElementById('overlay');
    if (!overlay.classList.contains('hidden')) return;
    const cell = clickEvent.target.closest('[data-square]');
    if (!cell) return;
    showSquarePreview(boardSquares[parseInt(cell.dataset.square)]);
  });

  const diceButton = document.getElementById('rollDiceBtn');

  diceButton.addEventListener('click', () => {
    if (gameState.finished) return;
    diceButton.disabled = true;
    const diceResult = rollDice();
    showDicePopup(diceResult);
  });

  document.getElementById('closeDicePopup').addEventListener('click', () => {
    hidePopup('dicePopup');
    movePlayer(parseInt(document.getElementById('diceNumber').textContent));
  });

  document.getElementById('closeEventPopup').addEventListener('click', () => {
    hidePopup('eventPopup');
    enableDiceRoll();
  });

  document.getElementById('closeInfoPopup').addEventListener('click', () => {
    hidePopup('infoPopup');
    enableDiceRoll();
  });

  document.getElementById('closeBonusPopup').addEventListener('click', () => {
    hidePopup('bonusPopup');
    enableDiceRoll();
  });

  document.getElementById('closeConsequencePopup').addEventListener('click', () => {
    hidePopup('consequencePopup');
    updateScore();
    saveGame();
    enableDiceRoll();
  });

  document.getElementById('viewScoreBtn').addEventListener('click', () => {
    saveGame();
    window.location.href = 'score.html';
  });

  document.getElementById('stopGameBtn').addEventListener('click', () => {
    showPopup('stopPopup');
  });

  document.getElementById('historyBtn').addEventListener('click', () => {
    renderHistoryPopup();
    showPopup('historyPopup');
  });

  document.getElementById('closeHistoryPopup').addEventListener('click', () => {
    hidePopup('historyPopup');
  });

  document.getElementById('confirmStopBtn').addEventListener('click', () => {
    localStorage.removeItem('cvprot');
    window.location.href = 'index.html';
  });

  document.getElementById('cancelStopBtn').addEventListener('click', () => {
    hidePopup('stopPopup');
  });

  document.getElementById('closePreviewPopup').addEventListener('click', () => {
    hidePopup('previewPopup');
  });
}

const scoreContainer = document.getElementById('scoreContainer');

if (scoreContainer) {
  const { getRating, getWeakestArea } = await import('./game/score.js');

  const savedState = JSON.parse(localStorage.getItem('cvprot'));
  if (!savedState) {
    window.location.href = 'index.html';
  } else {
    const score = savedState.score;
    const region = savedState.player.region;
    const nickname = savedState.player.nickname;

    document.getElementById('finalNickname').textContent = nickname;
    document.getElementById('finalRegion').textContent = `${region.icon} ${region.name} — ${region.city}`;

    const rating = getRating(score);
    const weakestArea = getWeakestArea(score);

    document.getElementById('ratingIcon').textContent = rating.icon;
    document.getElementById('ratingLabel').textContent = rating.label;
    document.getElementById('ratingMsg').textContent = rating.msg;
    document.getElementById('ratingLabel').style.color = rating.color;

    setScoreBar('Environmental', score.environmental, '#22c55e');
    setScoreBar('Economic', score.economic, '#f59e0b');
    setScoreBar('Energetic', score.energetic, '#3b82f6');

    document.getElementById('weakestArea').textContent =
      `${weakestArea.icon} Área que precisa de mais atenção: ${weakestArea.label} (${weakestArea.value} pts)`;

    document.getElementById('playAgainBtn').addEventListener('click', () => {
      localStorage.removeItem('cvprot');
      window.location.href = 'index.html';
    });

    const historyList = document.getElementById('scoreHistoryList');
    const history = savedState.history || [];
    if (historyList) {
      if (history.length === 0) {
        historyList.innerHTML = '<p style="color:#94a3b8;text-align:center">Nenhum evento registrado.</p>';
      } else {
        historyList.innerHTML = history.map((entry, index) => {
          const effectItems = entry.effects
            ? [
                { label: '🌿', value: entry.effects.environmental },
                { label: '💰', value: entry.effects.economic },
                { label: '⚡', value: entry.effects.energetic }
              ].filter(item => item.value !== 0 && item.value !== undefined)
            : [];
          const effectsHTML = effectItems.map(item => {
            const cls = item.value > 0 ? 'effect-positive' : 'effect-negative';
            const sign = item.value > 0 ? '+' : '';
            return `<div class="effect-tag ${cls}">${item.label}: ${sign}${item.value}</div>`;
          }).join('');
          return `
            <div class="history-entry">
              <div class="history-entry-num">${index + 1}</div>
              <div class="history-entry-body">
                <div class="history-entry-text">${entry.icon} ${entry.text}</div>
                ${effectsHTML ? `<div class="history-entry-effects">${effectsHTML}</div>` : ''}
              </div>
            </div>`;
        }).join('');
      }
    }
  }
}

function setScoreBar(indicator, value, color) {
  const bar = document.getElementById(`bar${indicator}`);
  const label = document.getElementById(`score${indicator}`);
  if (bar) {
    bar.style.width = `${value}%`;
    bar.style.background = color;
  }
  if (label) label.textContent = `${value} pts`;
}

function showSquarePreview(square) {
  const typeLabels = {
    start:    '🏁 Início',
    end:      '🏆 Chegada',
    decision: '🤔 Decisão',
    event:    '⚡ Evento Regional',
    info:     '📚 Sabia que?',
    bonus:    '🎉 Bônus',
    penalty:  '⚠️ Penalidade'
  };

  document.getElementById('previewBadge').textContent = typeLabels[square.type] || square.type;

  let title = '';
  let body = '';

  switch (square.type) {
    case 'decision':
      title = square.label;
      body = square.scenario;
      break;
    case 'info':
      title = square.title;
      body = square.content;
      break;
    case 'bonus':
    case 'penalty':
      title = square.title;
      body = square.description;
      break;
    case 'event':
      title = '⚡ Evento Regional';
      body = 'Um evento aleatório ocorrerá ao cair aqui, com efeitos que variam conforme a sua região no Brasil.';
      break;
    case 'start':
      title = '🏁 Início da Jornada';
      body = 'Ponto de partida da sua jornada pela CidadeVerde sustentável.';
      break;
    case 'end':
      title = '🏆 Chegada!';
      body = 'Parabéns — você completou a jornada pela CidadeVerde!';
      break;
  }

  document.getElementById('previewTitle').textContent = title;
  document.getElementById('previewBody').textContent = body;

  const effectsElement = document.getElementById('previewEffects');
  effectsElement.innerHTML = square.effects ? buildEffectsHTML(square.effects) : '';

  showPopup('previewPopup');
}

function showDicePopup(diceNumber) {
  document.getElementById('diceNumber').textContent = diceNumber;
  addToHistory('🎲', `Tirou ${diceNumber} no dado`);
  showPopup('dicePopup');
}

function movePlayer(squaresToMove) {
  gameState.player.position = Math.min(23, gameState.player.position + squaresToMove);
  updatePlayerPosition(gameState.player.position);

  if (gameState.player.position >= 23) {
    gameState.finished = true;
    saveGame();
    showPopup('endPopup');
    return;
  }

  triggerSquare(gameState.player.position);
}

function triggerSquare(squareIndex) {
  const square = boardSquares[squareIndex];

  switch (square.type) {
    case 'decision': showDecisionPopup(square); break;
    case 'event':    triggerEvent(); break;
    case 'info':     showInfoPopup(square); break;
    case 'bonus':    showBonusPenaltyPopup(square); break;
    case 'penalty':  showBonusPenaltyPopup(square); break;
    default:         enableDiceRoll();
  }
}

function showDecisionPopup(square) {
  document.getElementById('decisionScenario').textContent = square.scenario;

  const optionsList = document.getElementById('decisionOptions');
  optionsList.innerHTML = '';

  square.options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.classList.add('option-btn');
    optionButton.textContent = option.text;

    optionButton.addEventListener('click', () => {
      hidePopup('decisionPopup');
      applyEffects(gameState, option.effects);
      addToHistory('🤔', `Decisão: ${option.text}`, option.effects);
      showConsequencePopup(option);
    });

    optionsList.appendChild(optionButton);
  });

  showPopup('decisionPopup');
}

function showConsequencePopup(option) {
  document.getElementById('consequenceText').textContent = option.consequence;
  document.getElementById('consequenceEffects').innerHTML = buildEffectsHTML(option.effects);
  showPopup('consequencePopup');
}

function triggerEvent() {
  const region = gameState.player.region;
  const probabilities = events.map(gameEvent => gameEvent.probability[region.key] || 0.2);
  const totalProbability = probabilities.reduce((accumulated, probability) => accumulated + probability, 0);

  let randomRoll = Math.random() * totalProbability;
  let selectedEvent = events[events.length - 1];
  for (let index = 0; index < events.length; index++) {
    randomRoll -= probabilities[index];
    if (randomRoll <= 0) { selectedEvent = events[index]; break; }
  }

  applyEffects(gameState, selectedEvent.effects);
  addToHistory(selectedEvent.icon, `Evento: ${selectedEvent.name}`, selectedEvent.effects);

  document.getElementById('eventTitle').textContent = `${selectedEvent.icon} ${selectedEvent.name}`;
  document.getElementById('eventDescription').textContent = selectedEvent.description;
  document.getElementById('eventEffects').innerHTML = buildEffectsHTML(selectedEvent.effects);

  updateScore();
  saveGame();
  showPopup('eventPopup');
}

function showInfoPopup(square) {
  document.getElementById('infoTitle').textContent = square.title;
  document.getElementById('infoContent').textContent = square.content;
  showPopup('infoPopup');
}

function showBonusPenaltyPopup(square) {
  document.getElementById('bonusTitle').textContent = square.title;
  document.getElementById('bonusDescription').textContent = square.description;
  document.getElementById('bonusEffects').innerHTML = buildEffectsHTML(square.effects);

  applyEffects(gameState, square.effects);
  addToHistory(square.icon, square.title, square.effects);
  updateScore();
  saveGame();
  showPopup('bonusPopup');
}

function buildEffectsHTML(effects) {
  const effectItems = [
    { label: '🌿 Ambiental', value: effects.environmental },
    { label: '💰 Econômico', value: effects.economic },
    { label: '⚡ Energético', value: effects.energetic }
  ].filter(item => item.value !== 0 && item.value !== undefined);

  return effectItems.map(item => {
    const effectClass = item.value > 0 ? 'effect-positive' : 'effect-negative';
    return `<div class="effect-tag ${effectClass}">${item.label}: ${formatEffect(item.value)}</div>`;
  }).join('');
}

function updateScore() {
  const score = gameState.score;

  document.getElementById('scoreEnvironmental').textContent = `${score.environmental} pts`;
  document.getElementById('scoreEconomic').textContent = `${score.economic} pts`;
  document.getElementById('scoreEnergetic').textContent = `${score.energetic} pts`;

  updateBar('barEnvironmental', score.environmental, '#22c55e');
  updateBar('barEconomic', score.economic, '#f59e0b');
  updateBar('barEnergetic', score.energetic, '#3b82f6');
}

function updateBar(elementId, value, color) {
  const bar = document.getElementById(elementId);
  if (bar) {
    bar.style.width = `${value}%`;
    bar.style.background = color;
  }
}

function addToHistory(icon, text, effects = null) {
  gameState.history.push({ icon, text, effects });
}

function renderHistoryPopup() {
  const list = document.getElementById('historyList');
  if (!list) return;
  if (gameState.history.length === 0) {
    list.innerHTML = '<p style="color:#94a3b8;text-align:center">Nenhum evento ainda.</p>';
    return;
  }
  list.innerHTML = gameState.history.map((entry, index) => {
    const effectsHTML = entry.effects ? buildEffectsHTML(entry.effects) : '';
    return `
      <div class="history-entry">
        <div class="history-entry-num">${index + 1}</div>
        <div class="history-entry-body">
          <div class="history-entry-text">${entry.icon} ${entry.text}</div>
          ${effectsHTML ? `<div class="history-entry-effects">${effectsHTML}</div>` : ''}
        </div>
      </div>`;
  }).join('');
}

function enableDiceRoll() {
  const diceButton = document.getElementById('rollDiceBtn');
  if (diceButton) diceButton.disabled = false;
}

function saveGame() {
  localStorage.setItem('cvprot', JSON.stringify(gameState));
}

function showPopup(popupId) {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById(popupId).classList.remove('hidden');
}

function hidePopup(popupId) {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById(popupId).classList.add('hidden');
}
