const holes = document.querySelectorAll('.hole');
// console.log(holes);
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.dora');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const overlay = document.querySelector('.overlay')

let lastHole;
let timeUp = false;
let timeLimit = 10000;
let score = 0;
let countdown;
let isAnswered;
let correct = 0;
let totalScore = 0;

startButton.textContent = 'Start!';

// ランダムに出てくる場所
function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
    // 繰り返す
  }
  lastHole = hole;
  return hole;
}

// ドラの飛び出し
function popOut() {
  const time = Math.random() * 1200 + 500;
  const hole = pickRandomHole(holes);
  hole.classList.add('up');
  setTimeout(function () {
    hole.classList.remove('up');
    if (!timeUp) popOut();
  }, time);
}
// popOut();

// ゲームスタート
function startGame() {
  if (correct < 2) {
    countdown = timeLimit / 1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function () {
      timeUp = true;
    }, timeLimit);

    // カウントダウン
    let startCountdown = setInterval(function () {
      countdown -= 1;
      countdownBoard.textContent = countdown;
      if (countdown < 0) {
        countdown = 0;
        clearInterval(startCountdown);
        countdownBoard.textContent = 'Times Up!!';
        startButton.classList.remove('disabled');
      }
    }, 1000);
  } else {
    
    countdownBoard.textContent = 'finish!!';
    scoreBoard.textContent = totalScore
  }
}

// スタート

startButton.addEventListener('click', () => {
  startGame();
  startButton.classList.add('disabled');
  correct++
});


// ドラクリック
function whack(e) {
  // クリックしたらスコア＋とドラミの画像
  score++;
  totalScore++;
  this.style.backgroundImage = 'url("img/dorami.png")';
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    this.style.backgroundImage = 'url("img/dora.png")'
    this.style.pointerEvents = 'all';
  }, 400);
  scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', whack));