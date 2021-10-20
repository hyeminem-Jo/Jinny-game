const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

// 시간 차를 저장하려면 첫 시간과 끝 시간의 값을 변수로 저장해서 연산을 한다.
// 변수를 바깥에 설정하는 이유 (전역 변수)
// 1. if 문 안에 넣을 경우 :
//    => 유효범위가 블록 내에서만 변수가 적용되므로 다른 블록에서 실행이 안됨 (스코프 문제)
// 2. addEventListener 안에 넣을 경우 :
//    => 함수가 한번 실행('click')되면 변수 값이 사라져 함수 내 다른 조건에서 실행이 안됨
let startTime;
let endTime;
const records = []; // 평균낼 반응속도 값들을 담는 변수
let timeoutId;
// 무슨색 화면인가?
$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) { // 파란 화면일 때 클릭
    // 클릭한 태그에 해당 클래스가 존재하는가?, 파랑화면을 클릭할 때 빨간화면이 됨
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '※ 초록색이 되면 클릭하세요 ※';

    timeoutId = setTimeout(() => {
      // 타이머 => 일정시간 후 빨강 > 초록화면으로 전환
      startTime = new Date(); // 1. 첫 시간 재기 (일정시간 지난 후 초록화면으로 바뀐 순간의 시간)
      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '▶ 클릭하세요! ◀';
    }, Math.floor(Math.random() * 1000) + 2000); // 2000~3000 사이의 수
  } else if (event.target.classList.contains('ready')) { // 빨강화면을 클릭할 때 (부정출발)
    clearTimeout(timeoutId) // 성급한 클릭 방지(타이머 제거)
    $screen.classList.remove('ready')
    $screen.classList.add('waiting')
    $screen.textContent = '너무 성급하시네요!'
    setTimeout(() => {
      $screen.textContent = '▷ 클릭해서 다시 시작하기 ◁'
    }, 1000)
  } else if (event.target.classList.contains('now')) { // 초록화면을 클릭할 때
    endTime = new Date(); // 2. 끝시간 재기
    // 시간 차이 저장하기
    const current = endTime - startTime;
    records.push(current); // const 로 정의한 배열도 push 할 수 있음
    // const 는 대입(=)이 안될 뿐, 내부 요소를 수정하는 것은 가능함

    // 평균 구하기 => 중요 (자주 쓰임)
    const average = Math.floor(
      records.reduce((a, c) => a + c) / records.length
    );
    $result.textContent = `현재: ${current}ms / 평균 속도: ${average}ms`; // 자바스크립트로 날짜를 계산하면 그 값 단위는 밀리세컨드(ms) 로 나옴
    startTime = null; // 데이터 초기화 : 예전 값이 들어가는 실수 예방
    endTime = null;
    console.log(records)

    // 1 ~ 5위 까지 순위 정하기
    const topFive = records.sort((a, b) => a - b).slice(0, 5)
    // records 아이템의 상위 5개 까지 잘라내어 화면에 표시됨
    topFive.forEach((top, index) => {
      $result.append(
        document.createElement('br'),
        `${index + 1}위: ${top}ms`
      )
    })

    // 초록 > 파란 화면으로 전환
    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '▷ 클릭해서 시작하세요 ◁';
  }
});

// 퀴즈 !!
// 2021년 2월 21일 과 2021년 3월 3일은 '며칠' 차이가 나는가?
// const diff = new Date(2021, 2, 3) - new Date(2021, 1, 21) = 864000000 (ms)
// // 1. 밀리초(ms) 에서 초(s) => 1000으로 나누기
// // 2. 초(s) 에서 분(min) => 60 으로 나누기
// // 3. 분(min) 에서 시(hour) => 60 으로 나누기
// // 4. 시(hour) 에서 일(day) => 24 로 나누기 (하루는 24시간)

// (new Date(2021, 2, 3) - new Date(2021, 1, 21)) / 1000 / 60 / 60 / 24
// = 10일(day)