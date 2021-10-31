const {
  body
} = document;
// => const body = document.body 와 같은 의미
// '구조 분해 할당' 이라는 문법으로 불림
// 쓰이는 때: 객체의 속성과 담는 변수명이 같을 때
// (const 변수명 = document.속성), (변수명 === 속성)
const $result = document.createElement('div');
const $table = document.createElement('table'); // 화면상 테이블
const rows = []; // 데이터 상 테이블
let turn = 'o'; // 첫 턴은 'o' 로 지정

// 현재 rows[] 의 형태
// rows = [
//   [$td, $td, $td],
//   [$td, $td, $td],
//   [$td, $td, $td]
// ]

// (3) 승부, 무승부가 났는지 체크
const checkWinnerAndDraw = (target) => {
  // 승부 판단하기
  const hasWinner = checkWinner(target);
  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn} 님의 승리 !`;
    $table.removeEventListener('click', clickTd);
    // td 에 이벤트를 걸었다면 일일히 9개의 td 에
    // removeEventListener 를 삽입해야 했을 것이다.
    return;
  }

  // 승자가 없으면 (무승부)
  // 위의 checkWinner()에서 false 가 나오면 다음 나올 동작의 조건
  const draw = rows.flat().every((cell) => cell.textContent);
  // => td 의 textContent 가 '모두' 존재 해야 true
  // 첫 칸부터 빈칸이면 바로 false 가 출력되고 그후로 반복문이 재개되지 x
  // rows.flat().some((td) => {td.textContent})
  // => td 의 textContent 가 '하나라도' 존재 하면 true
  if (draw) {
    $result.textContent = `무승부`;
    return;
  }

  // 승부도, 무승부도 아닐 때 
  // 차례 턴(turn) 바꾸기 => toggle
  // 삼항연산자 코드
  turn = turn === 'x' ? 'o' : 'x';
  // if 문 코드
  // if (turn === 'o') {
  //   turn = 'x';
  // } else if (turn === 'x') {
  //   turn = 'o';
  // }
}

// (2) 승부가 났는지 체크
// 몇 번째 줄, 몇 번째 칸인지 클릭된 칸 위치 구분
const checkWinner = (target) => {
  // target: 클릭된 td
  // td 의 부모 태그(tr)의 index 값
  const rowIndex = target.parentNode.rowIndex;
  // 클릭된 td 의 cell index 값
  const cellIndex = target.cellIndex;

  // 세 칸이 다 채워졌나?
  let hasWinner = false; // boolean 검사를 할 시 항상 기본값은 false
  if (
    // 가로 줄 검사
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
  // if (event.target.textContent) return;
  if (event.target.textContent !== '') {
    alert('빈 칸에 입력해주세요');
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
      // 빈칸인 td 만 모여있는 배열 중 하나의 배열 요소를 랜덤으로 뽑아 저 장
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
// => 화면 상: $table / $tr / $td
// => 데이터 상: rows / cells / cell
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    // 한 번 쓰인 변수는 제외하고 다른 이름의 변수명을 쓰는 것이 좋음(i, j ...)
    // tr 이 한 번 생성될 때마다 td 가 그안에 3번 생성
    const $td = document.createElement('td');
    cells.push($td);
    // $td.addEventListener('click', clickTd);
    $tr.append($td);
  }
  $table.append($tr); // 화면상 표시 변경
  rows.push(cells); // 내부 데이터 값 변경
}
$table.addEventListener('click', clickTd);

// body 에 dom 요소 추가하기
body.append($table);
body.append($result);