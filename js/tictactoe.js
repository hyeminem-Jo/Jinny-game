const { body } = document;
const $result = document.querySelector('.result');
const $winner = document.querySelector('.winner');
const $table = document.createElement('table');
const rows = [];
let turn = 'O';

// 승부가 났는지에 대한 여부 판단
const checkWinnerAndDraw = (target) => {
  // 승자가 있으면
  const hasWinner = checkWinner(target);
  if (hasWinner) {
    $popUp.classList.remove('hidden');
    if (turn === 'O') {
      const $emotionWin = document.querySelector('.emotion-win');
      $emotionWin.classList.remove('hidden');
      $greeting.append(`축하합니다`, document.createElement('br'));
      $result.append(`승리!`, document.createElement('br'));
      $overLay.classList.remove('hidden');
    } else if (turn === 'x') {
      const $emotionLose = document.querySelector('.emotion-lose');
      $emotionLose.classList.remove('hidden');
      $greeting.append(`아쉽네요`, document.createElement('br'));
      $result.append(`패배!`, document.createElement('br'));
      $overLay.classList.remove('hidden');
    }
    $winner.append(`승자: ${turn}`, document.createElement('br'));
    $table.removeEventListener('click', clickTd);
    return;
  }
  // 승자가 없으면 (무승부)
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    // $result.textContent = `무승부 입니다`;
    $result.append(`무승부!`, document.createElement('br'));
    $popUp.classList.remove('hidden');
    $overLay.classList.remove('hidden');
    return;
  }
  // 턴 교체
  turn = turn === 'x' ? 'O' : 'x';
};

// 승자가 있는 지 판단
const checkWinner = (target) => {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let hasWinner = false;

  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선줄 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
};

// table 클릭 시 이벤트
let clickable = true;
const clickTd = (event) => {
  if (!clickable) {
    return;
  }

  if (event.target.textContent !== '') {
    alert('빈 칸에 클릭해주세요');
    return;
  }

  // turn = 'O' 일 때
  event.target.textContent = turn;
  checkWinnerAndDraw(event.target);

  // turn = 'x' (상대)일 때
  if (turn === 'x') {
    const emptyCells = rows.flat().filter((ec) => !ec.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    clickable = false;
    setTimeout(() => {
      randomCell.textContent = turn;
      checkWinnerAndDraw(randomCell);
      clickable = true;
    }, 1000);
  }
};

// table 내 tr, td 태그 생성
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    $tr.append($td);
    cells.push($td);
  }
  $table.append($tr);
  rows.push(cells);
}

$table.addEventListener('click', clickTd);

body.append($table);
// body.append($result);

// 팝업창: 승리 여부
const $popUp = document.querySelector('#popUp');
const $greeting = document.querySelector('.greeting');
const $answer = document.querySelector('.answer');
const $overLay = document.querySelector('.overlay');

// function defeated() {
//   $popUp.classList.remove('hidden')
//   const $emotionLose = document.querySelector('.emotion-lose')
//   $emotionLose.classList.remove('hidden')
//   $greeting.append(`아쉽네요`, document.createElement('br'))
//   $result.prepend(`패배! 승자: ${turn}`, document.createElement('br'))
//   $overLay.classList.remove('hidden')
// }

// function win() {
//   $popUp.classList.remove('hidden')
//   const $emotionWin = document.querySelector('.emotion-win')
//   $emotionWin.classList.remove('hidden')
//   $greeting.append(`축하합니다`, document.createElement('br'))
//   $result.prepend(`승리! 승자: ${turn}`, document.createElement('br'))
//   $overLay.classList.remove('hidden')
// }
