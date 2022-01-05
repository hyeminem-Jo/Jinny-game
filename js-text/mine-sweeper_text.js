const $form = document.querySelector('#form-difficulty');
const $timer = document.querySelector('#timer');
const $tbody = document.querySelector('table tbody');
const $result = document.querySelector('#result');

let row; // 줄
let cell; // 칸
let mine; // 지뢰
const CODE = {
  NORMAL: -1, // 닫힌 칸(지뢰x)
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, // 0 이상이면 다 모두 열린 칸
  // 열린 칸 안에 주변 지뢰개수(0 ~ 8)를 의미하는 숫자들이 표시되기 때문
};
// 다음의 데이터들을 2차원 배열에 배치시킨다.
let data;
let openCount;
let startTime;
let interval;
let dev = true;

// 게임 난이도 결정 및 게임 생성
function onSubmit(event) {
  event.preventDefault();

  // 게임 난이도 설정, 초기화
  // 사용자로부터 받은 줄, 칸, 지뢰 개수 입력값 넣기
  row = parseInt(event.target.row.value);
  cell = parseInt(event.target.cell.value);
  mine = parseInt(event.target.mine.value);
  openCount = 0; // 열린 지뢰개수도 초기화
  firstClick = true; // 첫 번째 클릭 여부 초기화
  clearInterval(interval); // 타이머 초기화
  $tbody.innerHTML = ''; // 테이블 초기화

  // 게임 시작
  drawTable();

  // 타이머 생성
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time} 초`;
  }, 1000); // 1초 씩 새로 생성
}

$form.addEventListener('submit', onSubmit);

// 지뢰 심기
function plantMine() {
  // (1) 100개 칸 만들기
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });

  // (2) 100개 칸 중 지뢰를 넣을 칸 10개 숫자 랜덤뽑기
  const shuffle = [];
  // 해당 조건이 성립될 때까지 반복
  // candidate.length = 100, row * cell - mine = 90
  // candidate.length = 90 되는 순간 while 문 종료 (10번 반복)
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    // splice 된 숫자값 shuffle 에 삽입
    shuffle.push(chosen);
    // ex [50, 79, 36, 23, 10, 75, 61, 62, 97, 2]
    // 랜덤하게 뽑힌 해당 칸들에 지뢰를 삽입할
  }

  // (3) 데이터상 테이블 생성 , CODE.NORMAL 삽입 (2차원 자료구조)
  const data = [];
  // rowData 에 칸(CODE.NORMAL) 열번 삽입,
  // data 에 rowData 열 번 삽입
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // (4) 지뢰 심기 (shuffle 의 좌표 구하기)(강좌 12-2 17:00초)
  // 원리: ex) 85 번째 자리에 지뢰를 심는다면?
  // 10*10 의 형태이니 8번째 줄의 5번째 칸에 위치
  for (let k = 0; k < shuffle.length; k++) {
    // 10 의 자리 찾기 (수직)
    // ex) const ver = Math.floor(85 / 10) 의 경우 => 8번째'줄'
    // 10의 자리의 수만 찾기 때문에 소수점은 버린다.
    const ver = Math.floor(shuffle[k] / cell); // 10 나눈값
    // const ver = Math.floor(85 / 10);

    // 1 의 자리 찾기 (수평)
    const hor = shuffle[k] % cell; // 10 나누고 나머지 값
    // const ver = 85 % 10 => 5번째 '칸'

    data[ver][hor] = CODE.MINE;
  }

  return data;
}

// 우클릭 이벤트 (물음표, 깃발)
function onRightClick(event) {
  event.preventDefault(); // 기본 우클릭 이벤트 방지

  // 클릭된 대상 좌표를 구한 후 cellData 변수에 담기
  const target = event.target;
  // 클릭되는 target 은 cell 단위이므로 parentNode 로 rowIndex 구함
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];

  if (cellData === CODE.MINE) {
    // 지뢰일 때
    // 데이터 변화
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
    // 화면 변화
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION_MINE) {
    // 물음표 지뢰일 때
    // 데이터 변화
    data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
    // 화면 변화
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG_MINE) {
    // 깃발 지뢰일 때
    // 데이터 변화
    data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
    // 화면 변화
    target.className = '';
    dev && (target.textContent = 'X'); // 개발 편의용 코드
  } else if (cellData === CODE.NORMAL) {
    // 닫힌 칸일 때
    data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION) {
    // 물음표 일 때
    data[rowIndex][cellIndex] = CODE.FLAG; // 깃발로
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG) {
    // 깃발 일 때
    data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
    target.className = '';
    target.textContent = '';
  }
}

// 지뢰 개수 세기
// 정 가운데 칸을 기준으로 주변 8 개의 칸을 수색해 지뢰를 찾음
function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;

  // 1번 칸
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  // 2번 칸
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  // 3번 칸
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  // 4번 칸
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  // 6번 칸
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  // 7번 칸
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  // 8번 칸
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  // 9번 칸
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

// 칸 열리면서 지뢰 개수 반환, 승리 여부 확인
function open(rowIndex, cellIndex) {
  // 한 번 열린 칸이면 return 해서 다시 열리지 않게 함
  // 열린 칸의 데이터가 data[rowIndex][cellIndex] = count; 와 같이 바뀌는 점 참고해보면,
  // 열린 칸의 데이터는 음수(열린 칸 제외한 다른 칸은 음수(-))가 아닌 숫자 0 ~ 8 이 되므로 열린 칸으로 인식
  // data[rowIndex] 가 undefined 일 수 있으므로 .? 로 존재 확인, 에러 방지
  // 그냥 여기서 rowIndex 는 그냥 변수가 아니라 인수로 들어온 것인데, openAround() 재귀함수로 (rI -1 ..) 등의 형태인 매개변수로 들어갈 수 있기 때문에 .? 로 판별해야 함
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;

  // 이전 과정에서는 좌표를 화면 => 데이터 방향으로 구했다면 이번에는 데이터 => 화면 순으로 역으로 구함
  // ** onLeftClick() 에서 클릭된 이벤트 대상(target) 을 통해 데이터를 구했고, 앞서 구해 놓은 데이터로 다시 클릭된 target 을 구하는 방식
  const target = $tbody.children[rowIndex]?.children[cellIndex];
  //
  if (!target) {
    return;
  }

  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || ''; // count 가 없으면 오른쪽 실행
  // target: 화면상 요소 / data: 데이터상 요소
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;

  // 열린 칸 세서 승리 여부 결정하기
  openCount++; // 열린 칸 세기
  // console.log(openCount);
  if (openCount === row * cell - mine) {
    // 지뢰 제외하고 칸이 다 열렸을 때
    const time = (new Date() - startTime) / 1000;
    clearInterval(interval); // 타이머 종료
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    // 화면 바뀔 수 있는 시간 주기
    setTimeout(() => {
      alert(`승리했습니다! 걸린 시간: ${time} 초`);
    }, 500);
  }

  return count;
}

// 처음 좌클릭 시 주변 칸 열기
function openAround(rI, cI) {
  setTimeout(() => {
    // 호출스택 한도초과 에러 방지
    const count = open(rI, cI);
    // 주변에 지뢰가 없는 빈 칸을 누를 때 주변 8 칸 열기
    if (count === 0) {
      // 칸을 클릭해서 주변 칸이 열리면 그 주변 칸의 주변 칸이 열리는 형식으로 연속적으로 칸이 열리는 효과
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0); // 0 초로 맞추어 즉각적으로 백그라운드로 이동시킴
}

// *** 안전 장치 (에러 방지)
let normalCellFound = false;
let searched;

let firstClick = true; // 첫 번째 클릭은 기존의 openCount = 0 인 경우에도 해당되므로, 변수 openCount 를 재사용해도 무방하다

// 지뢰 옮기기 (첫 클릭이 지뢰일 때)
function transferMine(rI, cI) {
  // *** 안전 장치 (에러 방지)
  if (normalCellFound) return; // 이미 빈칸을 찾았으면 종료
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return; // 실수로 -1 이 되는 것을 막는 코드
  // -1 이 나오면 data 가 undefined 로 나오기 때문에
  // 또한 rI 가 row 보다 같거나 크면 안되는 이유는 줄의 길이가 3이면
  // rowIndex 가 [0], [1], [2]까지만 나올 수 있기 때문이다.
  // => optional chaining (?.) 으로 data 가 undefined 로  인식됨으로 인한 에러를 막아줬던 코드와 유사
  // 사실 이 코드가 있으면 아래에 data[rI]?.[cI] === CODE.NORMAL 부분에서 ?. 를 빼도 된다.
  if (searched[rI][cI]) return; // 이미 찾은 칸이면 종료

  // 빈 칸인 경우 (0 인칸)
  // 지금 내가 누른 칸이 빈 칸이 아니라면 else 로 넘어가고,
  // 재귀적으로 data[rI]?.[cI] 안에 주변 8칸의 위치가 들어감
  // ex) transferMine(rI - 1, cI - 1) ...
  // 그렇게 해서 주변칸 중 빈칸(data[rI]?.[cI])을 발견하면 다음의 코드를 실행
  if (data[rI]?.[cI] === CODE.NORMAL) {
    // 빈 칸을 찾았으면 true 로 transferMine() 을 종료시키고
    normalCellFound = true;
    // 찾은 빈칸 (ex. data[rI - 1][cI])에 지뢰 심기
    data[rI][cI] = CODE.MINE;

    // 지뢰가 옮겨진 칸에 X 표시 하기
    const target = $tbody.children[rI]?.children[cI];
    dev && (target.textContent = 'X');
  } else {
    // 지뢰 칸인 경우 8 방향 탐색
    searched[rI][cI] = true;
    // 재귀적 실행
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
  }
}

// 지뢰 공개
function showMines() {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  // 2차원 배열을 돌면서 지뢰있는 칸 찾아 열기
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        // 지뢰 칸이면
        $tbody.children[rowIndex].children[cellIndex].textContent = '💣';
      }
    });
  });
}

// 좌클릭 이벤트
function onLeftClick(event) {
  // 클릭된 대상 좌표를 구한 후 cellData 변수에 담기
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];

  // 첫 번째 클릭 시 지뢰 클릭 방지
  if (firstClick) {
    // 첫번째 클릭 이후로는 첫번째 클릭이 아니게 되므로 false 로 변경
    // => 첫 번째 클릭시 딱 한 번 작동 후 종료되는 방식
    firstClick = false;

    // *** 안전 장치 (에러 방지)
    // 지금의 줄의 수만큼 일단 빈 배열 searched[] 로 만듦
    // 내가 이미 찾았던 칸인지 인지하기 위함 (재귀 함수 에러 방지)
    // openAround() 때와 같이 searched 또한 재귀함수 에러를 방지하기 위한 코드
    // openAround() 의 경우 [이미 열려있는 칸이면 그 칸은 더이상 찾지 않아도 된다]는 명확한 기준이 있어 기존의 코드(CODE.OPENED 등)를 활용할 수 있었지만(>> if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;), transMine() 의 경우는 [이미 한번 찾아본 칸은 찾이 않아도 된다]는 불명확한 기준이기 때문에 새로운 2차원 배열 searched 를 따로 만들어서, 이미 한번 찾은 칸이면 그렇게 인식되도록 중간에 searched[rI][cI] = true;로 해준 후 해당 칸을 또 다시 탐색하려 할 때 if (searched[rI][cI]) return 로 막아주게 된다.
    searched = Array(row)
      .fill()
      .map(() => []);
    // ex) 줄(row)이 5줄 일 때
    // searched = Array(5).fill().map(() => []);
    // 0: []
    // 1: []
    // 2: []
    // 3: []
    // 4: []
    // transMine() 에서 이미 한번 찾아진 searched[][] 요소는 true 가 되어 if (searched[rI][cI]) return; 에서 종료됨

    // (1)첫 클릭이 지뢰일 때
    if (cellData === CODE.MINE) {
      transferMine(rowIndex, cellIndex); // (2)지뢰 옮기고
      // (3)지금 칸을 빈칸으로 만듦 (cellData 도)
      data[rowIndex][cellIndex] = CODE.NORMAL;
      cellData = CODE.NORMAL; // 복사된 개념이기 때문에
      // cellData = data[rowIndex][cellIndex];
      // 와 같나 그럼(??)
    }
  }

  console.log(searched);
  if (cellData === CODE.NORMAL) {
    // 일반(닫힌) 칸일 때
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    // 지뢰 칸이면
    showMines();
    // 펑~
    target.textContent = '💣';
    target.className = 'opened';
    clearInterval(interval); // 타이머 종료
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
  }
  // 지뢰칸이 아니라면 나머지는 무시
  // 물음표 칸이나 깃발 칸인 경우 아무 동작도 안함
  // => CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE
}

function drawTable() {
  // 10:20
  data = plantMine();
  // 화면상 테이블 생성 (data: 1~100 까지 만들어진 배열)
  // data
  data.forEach((row) => {
    // row = rowData
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      // cell = CODE.NORMAL
      const $td = document.createElement('td');
      // 심어진 지뢰 화면상 표시
      if (cell === CODE.MINE) {
        dev && ($td.textContent = 'X'); // 개발 편의용 코드
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    // 이벤트 버블링을 이용하여
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}
