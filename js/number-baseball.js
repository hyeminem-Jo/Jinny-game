const $form = document.querySelector('form');
const $input = document.querySelector('form input[type=text]');
const $logs = document.querySelector('#logs');
const $popUp = document.querySelector('#popUp');
const $greeting = document.querySelector('.greeting');
const $result = document.querySelector('.result');
const $answer = document.querySelector('.answer');
const $overLay = document.querySelector('.overlay');
const $startBtn = document.querySelector('.start');

// 1. 1 ~ 9 의 숫자 생성
const numbers = [];
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

// 2. 상대편이 제시하는 수로, 1 ~ 9 의 숫자 중 랜덤의 숫자 뽑기
const answer = [];
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

// 4. 유저가 시도한 숫자인 input의 입력값 검사
const tries = [];

function checkInputValue(input) {
  if (input.length !== 4) {
    alert('4자리 숫자를 입력해주세요.');
    return;
  }
  if (input.includes(0)) {
    alert('1 ~ 9 까지의 숫자만 입력해주세요.');
    return;
  }
  if (new Set(input).size !== 4) {
    alert('숫자가 중복되지 않게 입력해주세요');
    return;
  }
  if (tries.includes(input)) {
    alert('이미 시도한 값입니다.');
    return;
  }
  return true;
}

function fillBillBoard(value, strike, ball, row, out) {
  const $rows = document.createElement('td');
  const $tries = document.createElement('td');
  const $ball = document.createElement('td');
  const $strike = document.createElement('td');
  const $out = document.createElement('td');

  $rows.classList.add('rows');
  $rows.textContent = row;

  $tries.classList.add('tries');
  $tries.textContent = value;

  $ball.classList.add('ball');
  $ball.textContent = ball;

  $strike.classList.add('strike');
  $strike.textContent = strike;

  $out.classList.add('out');
  $out.textContent = out;

  const $row = document.createElement('tr');
  $row.classList.add(`row`);
  $row.appendChild($rows);
  $row.appendChild($tries);
  $row.appendChild($ball);
  $row.appendChild($strike);
  $row.appendChild($out);

  const $tbody = document.querySelector('tbody');
  $tbody.appendChild($row);
}

function defeated() {
  $popUp.classList.remove('hidden');
  const $emotionLose = document.querySelector('.emotion-lose');
  $emotionLose.classList.remove('hidden');
  $greeting.append(`아쉽네요`, document.createElement('br'));
  $result.prepend(`패배`, document.createElement('br'));
  $answer.append(`정답: ${answer.join()}`);
  $overLay.classList.remove('hidden');
}

function win() {
  $popUp.classList.remove('hidden');
  const $emotionWin = document.querySelector('.emotion-win');
  $emotionWin.classList.remove('hidden');
  $greeting.append(`축하합니다`, document.createElement('br'));
  $result.prepend(`홈런`, document.createElement('br'));
  $answer.append(`정답: ${answer.join()}`);
  $overLay.classList.remove('hidden');
}

// 3. 5. 유저가 숫자 맞추기 시도
let out = 0;
let row = 1;
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = $input.value;
  $input.value = '';
  $input.focus();
  if (!checkInputValue(value)) {
    return;
  }

  // 입력값 조건 문제 없을 시 실행
  if (answer.join('') === value) {
    win();
    return;
  }
  if (tries.length >= 9) {
    defeated();
    return;
  }

  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;

  answer.forEach((answerItem, i) => {
    const index = value.indexOf(answerItem);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  });

  // 아웃 일 때
  if (strike === 0 && ball === 0) {
    out++;
    fillBillBoard(value, strike, ball, row, out);
  } else {
    fillBillBoard(value, strike, ball, row);
  }
  if (out === 3) {
    defeated();
    return;
  }

  // row 가 4개 이상일 때 앞선 row 세개 삭제
  if (row === 6) {
    const $row1 = document.querySelector('tr:nth-child(2)');
    const $row2 = document.querySelector('tr:nth-child(3)');
    const $row3 = document.querySelector('tr:nth-child(4)');
    const $row4 = document.querySelector('tr:nth-child(5)');
    const $row5 = document.querySelector('tr:nth-child(6)');

    $row1.remove();
    $row2.remove();
    $row3.remove();
    $row4.remove();
    $row5.remove();
  }

  tries.push(value);
  row++;
});

$startBtn.addEventListener('click', () => {
  $input.focus();
});
