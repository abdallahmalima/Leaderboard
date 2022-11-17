import './style.css';

const title = document.querySelector('h1');

title.textContent = 'Leaderboard';

const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const getGameId = () => localStorage.getItem('gameId') || 'game-id';
const saveGameId = (gameId) => {
  localStorage.setItem('gameId', gameId);
};

const getPostParams = (body) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}
);

const createNewGame = async () => {
  if (getGameId() !== 'game-id') return;

  const response = await fetch(`${BASE_URL}/games/`, getPostParams({ name: 'game-1' }));

  const { result } = await response.json();
  const getId = result.split(' ')[3];
  saveGameId(getId);
};

const getScores = async (gameId) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/scores`);
  const scores = await response.json();
  return scores;
};

const updatetableUI = ({ result }) => {
  const tableContainer = document.querySelector('table');
  const tableRows = result.map(({ user, score }) => `<tr><td>${user}:${score}</td></tr>`).join('');
  tableContainer.innerHTML = tableRows;
};

const displayScores = async () => {
  const gameId = getGameId();
  getScores(gameId).then(updatetableUI);
};
createNewGame();
displayScores();

const postNewScore = async (score, gameId) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/scores`, getPostParams(score));

  const { result } = await response.json();

  return result;
};

const createNewcore = ({ name, score }) => {
  const pName = name.value.trim();
  const pScore = score.value.trim();
  name.value = '';
  score.value = '';
  if (pName.length === 0 || pScore.length === 0) return;
  const gameId = getGameId();
  postNewScore({ user: pName, score: pScore }, gameId)
    .then(() => displayScores());
};

const addScoreForm = document.querySelector('.add-score-form');
addScoreForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { target } = e;
  createNewcore(target);
});

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
  displayScores();
});
