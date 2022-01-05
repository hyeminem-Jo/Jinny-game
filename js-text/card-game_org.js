const $wrapper = document.querySelector('#wrapper');

const total = parseInt(prompt('카드 개수를 짝수로 입력하세요. (최대 20개)'));
const colors = [
  'red', // A 하트
  'orange', // 2 다이아몬드
  'yellow', // 3 클럽
  'green', // 4 스페이드
  'white', // 5 하트
  'pink', // 6 다이아몬드
  'cyan', // 7 클럽
  'violet', // 8 스페이드
  'gray', // 9 하트
  'black', // 10 다이아몬드
];

// 카드 개수에 따른 색 선정
let colorSlice = colors.slice(0, total / 2);
let colorCopy = colorSlice.concat(colorSlice);

let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

// 카드 섞기
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

// 카드 생성
function createCard(i) {
  const card = document.createElement('div');
  const cardInner = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');
  card.className = 'card';
  cardInner.className = 'card-inner';
  cardFront.className = 'card-front';
  cardBack.className = 'card-back';

  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

// 카드 클릭 이벤트
function onClickCard(e) {
  // 첫 번째로 클릭한 카드와 이미 짝을 맞춘 카드는 클릭할 수 없음
  if(!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }

  this.classList.toggle('flipped');
  clicked.push(this);
  // 뒤집은 카드 수가 2장이 아닐 때
  if (clicked.length !== 2) {
    return;
  }

// 뒤집은 카드 수가 2장 일 때
  const firstBackColor =
    clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector('.card-back').style.backgroundColor;
  // 뒤집은 카드가 짝이 맞을 때
  if (firstBackColor === secondBackColor) {
    completed = completed.concat(clicked);
    clicked = [];

    // 모든 카드가 짝을 찾지 않았을 때 
    if (completed.length !== total) {
      return;
    }

    // 모든 카드가 짝을 찾았을 때
    let endTime = new Date();
    setTimeout(() => {
      alert(`축하합니다! ${Math.floor((endTime - startTime) / 1000)} 초 걸렸습니다.`);
      resetGame();
    }, 500);

    return
  }

  // 뒤집은 카드가 짝이 맞지 않을 때
  clickable = false;
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true
  }, 1000)
}

// 1. 게임 시작
function startGame() {
  // 카드 개수를 짝수로 입력하지 않았을 때
  if (total % 2 !== 0) {
    alert('짝수로 입력해주세요');
    window.location.reload();
  }
  clickable = false;
  shuffle();
  // 입력 받은 카드 개수 만큼 카드 생성
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  // 카드 일시 공개
  document.querySelectorAll('.card').forEach((card, index) => {
    // 카드 각각에 시간차 주기
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  // 카드 다시 비공개
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true;
    startTime = new Date();
  }, 5000);
}

startGame();

// 게임 다시 하기
function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colorSlice.concat(colorSlice);
  shuffled = [];
  completed = [];
  startGame();
}


// const $wrapper = document.querySelector('#wrapper');

// const total = parseInt(prompt('카드 개수를 짝수로 입력하세요. (최대 20개)'));
// const colors = [
//   'red',
//   'orange',
//   'yellow',
//   'green',
//   'white',
//   'pink',
//   'cyan',
//   'violet',
//   'gray',
//   'black',
// ];

// let colorSlice = colors.slice(0, total / 2);
// let colorCopy = colorSlice.concat(colorSlice);
// let shuffled = [];
// let clicked = [];
// let completed = [];
// let clickable = false;
// let startTime;

// function shuffle() {
//   for (let i = 0; colorCopy.length > 0; i++) {
//     const randomIndex = Math.floor(Math.random() * colorCopy.length);
//     shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
//   }
// }

// function createCard(i) {
//   const card = document.createElement('div');
//   const cardInner = document.createElement('div');
//   const cardFront = document.createElement('div');
//   const cardBack = document.createElement('div');
//   card.className = 'card';
//   cardInner.className = 'card-inner';
//   cardFront.className = 'card-front';
//   cardBack.className = 'card-back';

//   cardBack.style.backgroundColor = shuffled[i];
//   cardInner.appendChild(cardFront);
//   cardInner.appendChild(cardBack);
//   card.appendChild(cardInner);

//   return card;
// }

// function onClickCard() {
//   if (!clickable || completed.includes(this) || clicked[0] === this) {
//     return;
//   }

//   this.classList.toggle('flipped');
//   clicked.push(this);
//   if (clicked.length !== 2) {
//     return;
//   }
//   const firstBackColor =
//     clicked[0].querySelector('.card-back').style.backgroundColor;
//   const secondBackColor =
//     clicked[1].querySelector('.card-back').style.backgroundColor;

//   if (firstBackColor === secondBackColor) {
//     completed = completed.concat(clicked);
//     clicked = [];
//     if (completed.length !== total) {
//       return; 
//     }

//     let endTime = new Date();
//     setTimeout(() => {
//       alert(`축하합니다! ${(endTime - startTime) / 1000} 초 걸렸습니다.`);
//       resetGame();
//     }, 500);

//     return;
//   }

//   clickable = false;
//   setTimeout(() => {
//     clicked[0].classList.remove('flipped');
//     clicked[1].classList.remove('flipped');
//     clicked = [];
//     clickable = true;
//   }, 1000);
// }

// function startGame() {
//   clickable = false;
//   shuffle();
//   for (let i = 0; i < total; i++) {
//     const card = createCard(i);
//     card.addEventListener('click', onClickCard);
//     $wrapper.appendChild(card);
//   }

//   document.querySelectorAll('.card').forEach((card, index) => {
//     setTimeout(() => {
//       card.classList.add('flipped');
//     }, 1000 + 100 * index);
//   });

//   setTimeout(() => {
//     document.querySelectorAll('.card').forEach((card) => {
//       card.classList.remove('flipped');
//     });
//     clickable = true;
//     startTime = new Date();
//   }, 5000);
// }

// startGame();

// function resetGame() {
//   $wrapper.innerHTML = '';
//   colorCopy = colorSlice.concat(colorSlice);
//   shuffled = [];
//   completed = [];
//   startGame();
// }
