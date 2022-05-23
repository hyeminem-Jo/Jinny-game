const $form = document.querySelector('#form-difficulty');
const $time = document.querySelector('#time');
const $tbody = document.querySelector('table tbody');
const $startBtn = document.querySelector('.start');
const $result = document.querySelector('.result');
const $title = document.querySelector('.title');
const $greeting = document.querySelector('.greeting');
const $popUp = document.querySelector('#popUp');
const $overLay = document.querySelector('.overlay');
const $emotionLose = document.querySelector('.emotion-lose');

let row = 10; 
let cell = 10; 
let mine = 10; 
const CODE = {
  NORMAL: -1, 
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0, 
};

let data;
let openCount;
let startTime;
let interval;
let dev = false;
let time = 0;


// gameRule 읽음 되어있으면 바로 게임 시작
const savedRead = localStorage.getItem('readOrNot')
if(savedRead !== null) { 
  startGame();
}

// 게임 생성
function startGame(event) {
  openCount = 0; 
  firstClick = true; 
  clearInterval(interval); 
  $tbody.innerHTML = ''; 

  // 게임 시작
  drawTable();

  // 타이머 생성
  startTime = new Date();
  interval = setInterval(() => {
    time = ((time * 10) + 1) / 10;
    $time.textContent = time;
  }, 100); // 1초 씩 새로 생성
}

$startBtn.addEventListener('click', startGame);

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
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }

  // (3) 데이터상 테이블 생성 , CODE.NORMAL 삽입 (2차원 자료구조)
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // (4) 지뢰 심기 (shuffle 의 좌표 구하기)
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); 
    const hor = shuffle[k] % cell; 
    data[ver][hor] = CODE.MINE;
  }

  return data;
}

// 우클릭 이벤트 (물음표, 깃발)
function onRightClick(event) {
  event.preventDefault(); 

  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];

  if (cellData === CODE.MINE) {
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE; 
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION_MINE) {
    data[rowIndex][cellIndex] = CODE.FLAG_MINE; 
    target.className = 'flag';
    target.textContent = '🚩';
  } else if (cellData === CODE.FLAG_MINE) {
    data[rowIndex][cellIndex] = CODE.MINE; 
    target.className = '';
    dev && (target.textContent = 'X'); 
  } else if (cellData === CODE.NORMAL) {
    data[rowIndex][cellIndex] = CODE.QUESTION; 
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION) {
    data[rowIndex][cellIndex] = CODE.FLAG; 
    target.className = 'flag';
    target.textContent = '🚩';
  } else if (cellData === CODE.FLAG) {
    data[rowIndex][cellIndex] = CODE.NORMAL; 
    target.className = '';
    target.textContent = '';
  }
}

// 지뢰 개수 세기
function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;

  mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
  mines.includes(data[rowIndex][cellIndex - 1]) && i++;
  mines.includes(data[rowIndex][cellIndex + 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
  return i;
}

// 칸 열리면서 지뢰 개수 반환, 승리 여부 확인
function open(rowIndex, cellIndex) {
  // 한 번 열린 칸이면 return 해서 다시 열리지 않게 함
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;

  const target = $tbody.children[rowIndex]?.children[cellIndex];
  //
  if (!target) {
    return;
  }

  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || ''; 
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;

  // 열린 칸 세서 승리 여부 결정하기
  openCount++; 
  if (openCount === row * cell - mine) {
    clearInterval(interval); 
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    
    // 화면 바뀔 수 있는 시간 주기
    setTimeout(() => {
      $popUp.classList.remove('hidden');
      $overLay.classList.remove('hidden');
      $title.style.fontSize = '40px';
      $result.textContent = `${time} 초`;
    }, 500);
  }

  return count;
}

// 처음 좌클릭 시 주변 칸 열기
function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
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

let firstClick = true;

// 지뢰 옮기기 (첫 클릭이 지뢰일 때)
function transferMine(rI, cI) {
  if (normalCellFound) return; 
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return; 
  if (searched[rI][cI]) return; 

  // 빈 칸인 경우 (0 인칸)
  if (data[rI]?.[cI] === CODE.NORMAL) {
    normalCellFound = true;
    data[rI][cI] = CODE.MINE;
    const target = $tbody.children[rI]?.children[cI];
    dev && (target.textContent = 'X');
  } else {
    searched[rI][cI] = true;
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
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        $tbody.children[rowIndex].children[cellIndex].textContent = '💣';
      }
    });
  });
}

// 좌클릭 이벤트
function onLeftClick(event) {
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];

  // 첫 번째 클릭 시 지뢰 클릭 방지
  if (firstClick) {
    firstClick = false;

    // *** 안전 장치 (에러 방지)
    searched = Array(row)
      .fill()
      .map(() => []);

    // (1)첫 클릭이 지뢰일 때
    if (cellData === CODE.MINE) {
      transferMine(rowIndex, cellIndex); // (2)지뢰 옮기고
      // (3)지금 칸을 빈칸으로 만듦 (cellData 도)
      data[rowIndex][cellIndex] = CODE.NORMAL;
      cellData = CODE.NORMAL; // 복사된 개념이기 때문에
    }
  }

  console.log(searched);
  if (cellData === CODE.NORMAL) {
    // 일반(닫힌) 칸일 때
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    showMines();
    target.textContent = '💣';
    target.className = 'opened';
    clearInterval(interval); 
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    // 결과 팝업창 띄우기
    setTimeout(() => {
      $popUp.classList.remove('hidden');
      $overLay.classList.remove('hidden');
      $emotionLose.classList.remove('hidden');
      $title.textContent = `패배`;
      $result.textContent = '';
      $greeting.textContent = '아쉽네요';
    }, 700)
  }
}

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        dev && ($td.textContent = 'X'); // 개발 편의용 코드
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    // 이벤트 버블링 이용
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}
