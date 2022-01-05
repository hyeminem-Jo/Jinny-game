const $wrapper = document.querySelector('#wrapper');

// const total = 12;
const total = parseInt(prompt('카드 개수를 짝수로 입력하세요. (최대 20개)'));
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink', 'cyan', 'violet', 'gray', 'black'];

// 6 개의 색을 각각 하나씩 더 추가 (6 + 6)
// concat() 을 통해 얕은 복사도 할 수 있다.

// ex) 사용자가 카드 개수를 10장으로 선택하면, colors[] 에서 카드 색은 5종류 까지만 가져가고 나머지는 자른다.
let colorSlice = colors.slice(0, total / 2);
// 색 종류 하나씩 복사해서 2배로(10개) 불리기
let colorCopy = colorSlice.concat(colorSlice);
let shuffled = [];
// 클릭된 카드, 두 개일 때 이벤트 발생 후 초기화
let clicked = [];
// 클릭된 카드 두개가 서로 일치할 때, 이미 사용된 카드들로 인지 후 분리
let completed = [];
let clickable = false;
let startTime; // 처음 카드를 공개후 다시 뒤집은 시점에 시간 측정

// 카드 무작위로 섞기
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
    // colorCopy 중 [랜덤의 인덱스]의 요소를 기점으로 1개 빼고 그 값을 shuffled 에 합치기
  }
}

// 카드 화면에 생성
function createCard(i) {
  // div.card > div.card-inner > (div.card-front + div.card-back)
  const card = document.createElement('div');
  const cardInner = document.createElement('div');
  const cardFront = document.createElement('div');
  const cardBack = document.createElement('div');
  card.className = 'card'; // .card 태그 생성
  cardInner.className = 'card-inner'; // .card-inner 태그 생성
  cardFront.className = 'card-front'; // .card-front 태그 생성
  cardBack.className = 'card-back'; // .card-back 태그 생성

  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

function onClickCard() {
  // onClickedCard() 가 화살표함수이면 this 는 window 를 가르키게됨

  // 카드 클릭 방지
  // 이미 짝맞춰진 카드 클릭 방지
  // 이미 방금 선택한 카드 클릭 방지
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }

  this.classList.toggle('flipped'); // this: 누른 card
  clicked.push(this);

  // 클릭한 카드가 두 장이 될 때 검사
  // 뒤집은 카드 수가 2장이 아닐 때 << 왜 필요한가?
  // 밑의 코드에서 querySelector('.card-back') 를 이중으로 쓰게되어 에러가 발생한다. 왜냐하면 처음 클릭으로 firstBack 의 쿼리셀렉터 발생 후 두번째 클릭을 하기 전에 같은 이름의 secondBack 의 쿼리 셀렉터는 undefined, 즉 정의되지 않은 상태이기 때문이다.
  if (clicked.length !== 2) {
    return;
  }
  
  const firstBackColor =
    clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector('.card-back').style.backgroundColor;

  // # 클릭한 두 카드 뒷면의 색이 일치할 때
  if (firstBackColor === secondBackColor) {
    completed = completed.concat(clicked);
    // clicked[] 에 들어간 일치되는 두 카드를 completed[] 에 저장
    // concat() 을 사용하지 않을 때:
    // completed.push(clicked[0]);
    // completed.push(clicked[1]);

    // 빈 배열로 초기화
    clicked = [];

    // 아직 일치된 카드가 전부 차지 않았을 때 (게임 계속 진행)
    if (completed.length !== total) {
      return;
    }
    // 일치된 카드가 전부 찼을 때
    let endTime = new Date();
    setTimeout(() => {
      // 미래 시간 - 현재 시간
      // 밀리 초 단위이므로 1000 나누기
      alert(`축하합니다! ${(endTime - startTime) / 1000} 초 걸렸습니다.`);
      resetGame(); // 게임이 끝난 후 리셋됨
    }, 500);
    return;
  }

  // # 클릭한 두 카드 뒷면의 색이 다를 때
  // 연속으로 4개가 클릭되었을 때
  clickable = false;
  // setTimeout 으로 1초를 안주면 두 번째 카드가 열리기도 전에 (flipped 클래스가 제거되어) 첫번째, 두번째 카드가 바로 다시 뒤집어 지기 때문에 시간차를 주어야 한다.
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true;
  }, 1000);
}

// 게임 시작: 카드 섞기, 카드 생성 실행
function startGame() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i++) {
    // createCard 함수 안에 0 부터 시작하여 들어가 shuffled[]의 1, 2..번째 인덱스 값으로 들어간다.
    const card = createCard(i);
    // $wrapper (전체)에 이벤트를 주어 이벤트 버블링을 사용하면 카드 외의 범위에도 클릭이벤트가 인식되도록 설정되므로 이번엔 카드 하나하나에 클릭이벤트를 부여해준다.
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  // 초반: 카드 잠깐 공개
  // card 각각에 시간차를 주어 애니메이션 생성
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  // 일정시간 후 다시 비공개(뒤집기)
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true; // 카드 세팅이 완료되었을 때 클릭할 수 있음
    startTime = new Date();
  }, 5000);
}

startGame();

function resetGame() {
  $wrapper.innerHTML = '';
  // colorCopy 는 splice 로 인해 원본이 바뀌었기 때문에 초기화 해주어야함
  colorCopy = colorSlice.concat(colorSlice);
  shuffled = [];
  completed = [];
  startGame();
}