const {
  body
} = document;
const $result = document.createElement('div');
const $table = document.createElement('table');
const rows = [];
let turn = 'o';

// 승부가 났는지에 대한 여부 판단
const checkWinnerAndDraw = (target) => {
  // 승자가 있으면
  const hasWinner = checkWinner(target);
  if (hasWinner) {
    $result.textContent = `승자는 ${turn} 입니다.`;
  }
  // 승자가 없으면 (무승부)
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = `무승부 입니다`;
    return;
  }
  // 턴 교체
  turn = turn === 'x' ? 'o' : 'x';
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

  // turn = 'o'
  event.target.textContent = turn;
  checkWinnerAndDraw(event.target);

  // turn = 'x' (상대)
  if (turn === 'x') {
    const emptyCells = rows.flat().filter((ec) => !ec.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    clickable = false;
    setTimeout(() => {
      randomCell.textContent = turn;
      checkWinnerAndDraw(randomCell)
      clickable = true;
    }, 1000)
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
body.append($result);