const $table = document.getElementById('table');
const $score = document.getElementById('score');
const $back = document.getElementById('back');
// const $$score = document.getElementsByClassName('score')
let data = [];
const history = [];

// 되돌리기 버튼을 누르면 이전으로 되돌리기
$back.addEventListener('click', () => {
  const prevData = history.pop();
  if (!prevData) return; // 되돌릴게 없으면 종료
  $score.textContent = prevData.score; // 이전 점수로 돌리기
  data = prevData.table;
  draw();
  console.log(history);
})

// 게임 시작
// $table > $fragment > $tr > $td
function startGame() {
  // fragment: 데이터를 잠시 메모리로 보내놓고 화면에 띄워질 때 한 꺼번에 보내지도록 함
  const $fragment = document.createDocumentFragment();
  // 2차원 배열 만들기
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0); // cellData 에 0 넣기 (빈 칸 표시)
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell(); // 데이터 그리기 (숫자 2 랜덤 생성)
  draw(); // 화면 그리기
}

// 빈 칸에 랜덤으로 2 넣기 (게임 시작 때는 전부 빈칸 => (0))
// 배열을 돌아 빈 칸을 찾은 뒤 그 빈칸들 중 랜덤으로 선정해 2를 삽입
function put2ToRandomCell() {
  const emptyCells = []; // 빈칸들이 각각 몇 번째 줄, 몇 번째 칸인지 저장
  data.forEach(function (rowData, i) {
    rowData.forEach(function (cellData, j) {
      // 빈칸(0) 이면 실행 (!false = true)
      if (!cellData) {
        emptyCells.push([i, j]); // 줄, 칸을 하나의 세트[] 로 묶어 저장
        // ex) emptyCells = [[2, 3], [5, 8] ..]
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // ex) randomCell = [1, 2] 첫번째 줄, 두번째 칸인 빈칸이 랜덤으로 선정
  data[randomCell[0]][randomCell[1]] = 2; // 선정된 빈칸에 2 삽입
}

function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j];
      // $table.children[i] => row
      // $table.children[i].children[j] => cell

      // 빈 칸(0)이면 화면상 칸에 아무것도 띄우지 말고, 빈 칸이 아닐 때 테이블에 숫자 표시
      if (cellData > 0) {
        $target.textContent = cellData;
        $target.className = 'color-' + cellData; // css 색 적용
      } else {
        $target.textContent = '';
        $target.className = '';
      }
    });
  });
}

startGame();

// 개발 과정에서 실험을 위해 가짜로 데이터를 넣어줌(dummy data)
// 현재 다음과 같이 숫자가 배치되어있다고 가정
// data = [
//   [32, 2, 4, 4],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];

// 칸 옮기기
draw();
function moveCells(direction) {
  // 이전 데이터 저장
  history.push({
    table: JSON.parse(JSON.stringify(data)), // data 깊은 복사
    // > history === [d1, d2, d3, ...] 과거의 data 저장
    // table: data, => 참조관계를 끊지 않고 data 를 그대로 넣으면 x
    // > history === [data, data, data, ...] 똑같은 현재의 참조관계로 이루어진 data 들만 생성
    score: $score.textContent, // push 되기 전 현재 점수 넣기 (과거 점수 저장)
  });

  switch (direction) {
    // 왼쪽 키를 눌렀을 때
    case 'left': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            // 빈 칸(0)을 제외하고 숫자 삽입
            const currentRow = newData[i]; // 지금 줄
            // 지금 줄에서 이전 값
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) {
              // 이전 값과 현재 값이 같다면:
              // 이전 값 === (newData[] 로 push 되기 전, 현재 처리되고 있는 data[] 의 요소)
              // ** data[]의 요소가 반복문으로 도는 중이며, 아직 newData[]에 push 가 안됐음을 참고! (예비로 push 될 요소)

              // 합쳐진 숫자 점수 메기기
              const score = parseInt($score.textContent);
              $score.textContent =
                score + currentRow[currentRow.length - 1] * 2;

              // 숫자 합치기(같은 숫자이므로 합치면 두배)
              currentRow[currentRow.length - 1] *= -2;
              // 연속으로 합쳐짐 방지(양수 => 음수)
            } else {
              // 정렬
              newData[i].push(cellData);
              // newData[i] = row
              // newData[i][j] = cell
            }
          }
        });
      });
      // newData[] >> data[] 업데이트 하기
      // newData 는 임시방편 데이터, newData 사용 후 원본 데이터 data 업데이트
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0;
          // a || b : a 가 없으면 b 실행, a가 있으면 a 실행
          // Math.abs() 로 음수를 양수로 도로 바꿈
          // Math.abs(): 주어진 숫자의 절대값을 반환
          // ex) x가 양수이거나 0이라면 x를 리턴하고, x가 음수라면 x의 반대값, 즉 양수를 반환
        });
      });
      break;
    }

    // 오른쪽 키를 눌렀을 때
    case 'right': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        // i 1(두번째)
        rowData.forEach((cellData, j) => {
          if (rowData[3 - j]) {
            // j 1 / 0을 제외하고 넣어라..?
            const currentRow = newData[i]; // 현재 줄(row)
            const prevData = currentRow[currentRow.length - 1];
            // 숫자 합치기
            if (prevData === rowData[3 - j]) {
              // 합쳐진 숫자 점수 메기기
              const score = parseInt($score.textContent);
              $score.textContent =
                score + currentRow[currentRow.length - 1] * 2;

              currentRow[currentRow.length - 1] *= -2;
            } else {
              // 오른쪽 정렬
              newData[i].push(rowData[3 - j]);
            }
          }
        });
      });
      // newData[] >> data[] 업데이트 하기
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][3 - j] = Math.abs(newData[i][j]) || 0;
          // 수평대칭으로 뒤집어진 숫자 순서 다시 정렬
          // j에 첫번째 (0)이 들어가면서 data[i]의 요소 자리 중 맨 끝자리부터 요소가 들어감 (인덱스 끝자리 ~ 첫자리)
        });
      });
      break;
    }

    // 위쪽 키를 눌렀을 때
    case 'up': {
      const newData = [[], [], [], []]; // 첫째줄 2 를 넣어보자
      data.forEach((rowData, i) => {
        // index [0] 줄
        rowData.forEach((cellData, j) => {
          // index [1] 칸
          if (cellData) {
            const currentRow = newData[j]; // i 가 아닌 j
            const prevData = currentRow[currentRow.length - 1];

            if (prevData === cellData) {
              // 합쳐진 숫자 점수 메기기
              const score = parseInt($score.textContent);
              $score.textContent =
                score + currentRow[currentRow.length - 1] * 2;

              // 숫자 합치기
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(cellData);
            }
          }
        });
      });
      // newData[] >> data[] 업데이트 하기
      console.log(newData);
      // cellData > rowData 순으로 돌려짐
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          // data[j][i] 로 i 와 j 의 순이 바껴있음
          data[j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }

    // 아래쪽 키를 눌렀을 때
    case 'down': {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          // 가로줄에서 세로줄로 인식하여 보면,
          // 위>아래 는 왼쪽방향이었고, 아래>위 는 오른쪽 방향에서 오는 것이기 때문에
          // 즉 오른쪽 방향을 다루었을 때와 같이 수평 대칭을 위해 [3 - i] 를 해준다.
          // 위쪽 방향: 왼쪽으로 붙게하여 위에서 아래로 향하게 함
          // 아래쪽 방향: 오른쪽으로 붙게하여 아래에서 위로 향하게 함

          if (data[3 - i][j]) {
            const currentRow = newData[j]; // i 가 아닌 j
            const prevData = currentRow[currentRow.length - 1];
            // 숫자 합치기
            if (prevData === data[3 - i][j]) {
              // 인접한 같은 숫자 요소는, 방향대로 합쳐지기 때문에 a1 와 a2 가 서로 같은 숫자라면 a1 > a2 방향으로 합쳐질때, a1 은 a2 가 newData[] 에 삽입되기 이전의 값이므로 a2가 삽입되기 전엔 a1 이 가장 마지막 index 요소이기 때문에 맨끝의 index 값을 가져온다.

              // 합쳐진 숫자 점수 메기기
              const score = parseInt($score.textContent);
              $score.textContent =
                score + currentRow[currentRow.length - 1] * 2;

              // 숫자 합치기
              currentRow[currentRow.length - 1] *= -2;
            } else {
              // 정렬 하기
              newData[j].push(data[3 - i][j]);
            }
          }
        });
      });
      // newData[] >> data[] 업데이트 하기
      // newData = [
      //   [2],
      //   [16, 2, 2],
      //   [4, 8, 4],
      //   [4, 8, 2],
      // ]

      // data = [
      //   [0, 0, 0, 0],
      //   [0, 2, 4, 2],
      //   [0, 2, 8, 8],
      //   [2, 16, 4, 4],
      // ];
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        // i 3 j 2
        [1, 2, 3, 4].forEach((rowData, j) => {
          // 대칭된 배열을 맨 아래에서부터 다시 newData[] > data[] 로 push 함
          data[3 - j][i] = Math.abs(newData[i][j]) || 0;
          // 첫번째 칸이 다 도는 동안 줄의 인덱스값이 변하기 때문에 cellData 와 rowData 바뀜 => [i] 가 한 번 변할 때 [j]는 4번 동작함
          // [1번째 칸 4번째 줄] 을 시작으로 한칸씩 위로 처리됨
          // 맨 아래 줄에서 위로, 한줄의 칸이 4개씩 끝날 때마다 다른 줄로 이동
          // 세로 줄의 칸을 다 돌아야 다음 세로줄 이동
          // ex) 반복문 돌아가는 순서
          // 1번째 칸 - 4번째줄 > 3번째줄 > 2번째줄 > 1번째 줄
          // 2번째 칸 - 4번째줄 > 3번째줄 ... 순으로 요소가 선택됨
        });
      });
      break;
    }
  }

  // 승패 여부
  if (data.flat().includes(2048)) {
    draw();
    setTimeout(() => {
      alert('축하합니다. 2048 을 만들었습니다.');
    }, 0);
  } else if (!data.flat().includes(0)) {
    // 빈칸이 없으면 패배
    alert(`패배했습니다... ${$score.textContent}점`);
  } else {
    put2ToRandomCell();
    draw();
  }
}

// 키보드 이벤트
window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'ArrowRight') {
    moveCells('right');
  }
});

// 마우스 이벤트
let startCoord;
// x, y 좌표 배열로 저장
// 초기 좌표
window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY];
});
// 끝 좌표
window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY];
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('left');
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells('right');
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('down');
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells('up');
  }
  // 완벽하게 45도로 드래그했을 경우도 포함해야하기 때문에 <= 표시
  // => 큼 / 작거나 같음
});

// 수평으로 x 축 수직으로 y 축
// endCrood - startCoord = x, y 축만큼 움직인 거리

// ex) 우측 하단으로 드래그를 했을 때
// diffX < 0 :
// 0 기준으로 양수(+) 값만큼 가는 것은 우측 방향
// Math.abs(diffX) > Math.abs(diffY):
// 수평으로 조금만 옆으로 가고, 수직으로 많이 내려가면 그것은 아래가 된다.
// (오른쪽으로 5만큼 가고 아래쪽으로 10만큼 갔다면 아래쪽으로 판정)
