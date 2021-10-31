const {
  body
} = document;
const $result = document.createElement('div'); 
const $table = document.createElement('table'); // 화면상 테이블
const rows = []; // 데이터 상 테이블
let turn = 'o'; // 첫 턴은 'o' 로 지정

// (3) 승부, 무승부가 났는지 체크
const checkWinnerAndDraw = (target) => {
  // 승부 판단하기
  const hasWinner = checkWinner(target);
  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn} 님의 승리 !`;
    $table.removeEventListener('click', clickTd);
    return;
  }

  // 승자가 없으면 (무승부)
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = `무승부`;
    return;
  }

  // 승부도, 무승부도 아닐 때 차례 턴(turn) 바꾸기 => toggle
  turn = turn === 'x' ? 'o' : 'x';
}

// (2) 승부가 났는지 체크
const checkWinner = (target) => {
  // td 의 부모 태그(tr)의 index 값
  const rowIndex = target.parentNode.rowIndex;
  // 클릭된 td 의 cell index 값
  const cellIndex = target.cellIndex;

  // 세 칸이 다 채워졌나?
  let hasWinner = false; // boolean 검사를 할 시 항상 기본값은 false
  // 가로 줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }

  // 세로 줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }

  // 대각선 줄 검사
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
  return hasWinner; // 승자가 있으면 true, 없으면 false
};

// (1) 클릭했을 때 이벤트 => (4)
let clickable = true;
const clickTd = (event) => {
  // setTimeout 이 돌아가는 동안 클릭막기
  if (!clickable) {
    return;
  } 

  // ** 클릭한 칸이 빈칸이 아닐 때
  if (event.target.textContent !== '') {
    alert('빈 칸에 클릭해주세요');
    return;
    // event.currentTarget => $table 의 타겟
  }

  // ** 빈칸일 때
  // 내(o) 차례 ----------------------------------
  event.target.textContent = turn;
  // 승부 판단하기
  checkWinnerAndDraw(event.target)

  // 컴퓨터(x) 차례 ----------------------------------
  if (turn === 'x') {
      // 빈칸(textContent 가 없는)인 td 만을 색출하여 배열로 만듬
      // => (빈칸인 td 만 모여있는 배열)
      const emptyCells = rows.flat().filter((v) => !v.textContent);
      // 빈칸인 td 만 모여있는 배열 중 하나의 배열 요소를 랜덤으로 뽑아 저장
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

      clickable = false;
      setTimeout(() => {
        // 빈칸일 때
        randomCell.textContent = turn; // turn 이라고 해도되지 않을까..?
        // 승부 판단하기
        checkWinnerAndDraw(randomCell);
        // setTimeout 1초 뒤에 클릭 가능
        clickable = true;
    }, 1000)
  }
};

// table 생성
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.append($td);
  }
  $table.append($tr); // 화면상 표시 변경
  rows.push(cells); // 내부 데이터 값 변경
}
$table.addEventListener('click', clickTd);

// body 에 dom 요소 추가하기
body.append($table);
body.append($result);