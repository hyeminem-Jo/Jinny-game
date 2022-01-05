const $wrapper = document.querySelector('#wrapper');
const $timer = document.querySelector('#time');
const $startBtn = document.querySelector('.start');
const $popUp = document.querySelector('#popUp');
const $result = $popUp.querySelector('.result');
const $overLay = document.querySelector('.overlay');

// 1. 카드 개수 입력받기
const total = 20;
const cardsNum = [
  'card-a',
  'card-2',
  'card-3',
  'card-4',
  'card-5',
  'card-6',
  'card-7',
  'card-8',
  'card-9',
  'card-10',
];

// 2. 카드 개수 만큼 자르기
let cardSlice = cardsNum.slice(0, total / 2);
let cardCopy = cardSlice.concat(cardSlice);

let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;
let timerId;
let time = 0;

// 3-1. 카드 섞기
function shuffle() {
  for (let i = 0; cardCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * cardCopy.length);
    shuffled = shuffled.concat(cardCopy.splice(randomIndex, 1));
  }
}

// 3-2. 화면에 카드 생성
function createCard(i) {
  const card = document.createElement('div');
  const cardInner = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');

  card.className = 'card';
  cardInner.className = 'card-inner';
  cardFront.className = 'card-front';
  cardBack.className = 'card-back';

  let randomCard = shuffled[i];
  cardBack.classList.add(`${randomCard}`);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

// 3-2. 카드 클릭 이벤트
function onClickCard() {
  // 클릭 방지, 이미 짝맞춰진 카드 클릭 방지, 이미 방금 선택한 카드 클릭 방지
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }

  this.classList.toggle('flipped');
  clicked.push(this);
  // 뒤집은 카드 수가 2장이 아닐 때 
  if (clicked.length !== 2) {
    return;
  }

  // (1) 두 장의 카드가 모두 뒤집혔을 때
  const firstBack = clicked[0].querySelector('.card-back').className;
  const secondBack = clicked[1].querySelector('.card-back').className;

  // (1-1) 두 장의 카드가 일치할 때
  if (firstBack === secondBack) {
    completed = completed.concat(clicked);
    clicked = []; // 빈 배열로 초기화

    // 아직 일치된 카드가 전부 차지 않았을 때 
    if (completed.length !== total) {
      return; // 게임 계속 진행
    }

    // 일치된 카드가 전부 찼을 때
    let endTime = new Date();
    setTimeout(() => {
      clearInterval(timerId);
      $popUp.classList.remove('hidden');
      $overLay.classList.remove('hidden');
      $result.textContent = `${Math.floor((endTime - startTime) / 1000)} 초`
      resetGame(); // 게임 종료 후 리셋
    }, 50);

    return;
  }

  // (1-2) 두 장의 카드가 불일치 할 때
  clickable = false;
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true;
  }, 1000)
}

// 3. 게임 시작하기
function startGame() {
  // 카드의 공개, 비공개 과정까지 클릭 방지
  clickable = false;

  // 3-1. 카드 섞기
  shuffle();
  // 3-2. 입력 받은 total 만큼 화면에 카드 생성, 이벤트 삽입
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  // 3-3. 카드 일시 공개
  const $$card = document.querySelectorAll('.card');
  $$card.forEach((card, i) => {
    // 카드 각각에 시간차 주기
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * i);
  });

  // 3-4. 카드 다시 비공개
  setTimeout(() => {
    $$card.forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true;
    // 타이머 세기 (0.1, 0.2, 0.3 ...)
    timerId = setInterval(() => {
      time = ((time * 10) + 1) / 10;
      $timer.textContent = time;
    }, 100)
    startTime = new Date();
  }, 5000)
}

$startBtn.addEventListener('click', () => {
  startGame();
})

// gameRule 읽음 되어있으면 바로 게임 시작
const savedRead = localStorage.getItem('readOrNot')
if(savedRead !== null) { 
  startGame();
}

// 4. 게임 초기화
function resetGame() {
  $wrapper.innerHTML = '';
  cardCopy = [];
  completed = [];
  time = 0;
  startGame();
}