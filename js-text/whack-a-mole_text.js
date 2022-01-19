const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $life = document.querySelector('#life');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

// 구멍 
const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0]
// 3 * 3 의 2차원 배열이 아닌 1차원 배열로 나열
let started = false;
// 한번만 작동하는 것은 flag 변수로 만들어주기
// => 한번 만 시작하기 후 시작하기 작동 금지
let score = 0;
let time = 10;
let life = 3;
// 게임 오버, 종료시 타이머 등을 제거해주어야함
// 전역으로 선언을 해주어야 타이머 변수를 스코프 바깥에서도 제거할 수 있음
let timerId;
let tickId;

$start.addEventListener('click', () => {
  if (started) return; // 이미 시작했으면 무시 
  started = true;
  console.log('시작');
  // 타이머 (0.1 초씩 깎이기)
  timerId = setInterval(() => {
    time = (time * 10 - 1) / 10; // 소수점 계산 시 문제있음
    // time = time - 0.1 와 같이 소수점 계산 시 문제있음
    // 이유: 컴퓨터는 소수점이나 음수 같은 경우 잘 계산이 안될 때가 있기 때문에, 다음과 같이 정수로 바꿔준 후 10 으로 나누어 준다.
    // ex) 소수점 둘째 자리 경우 * 100, 셋째 자리 경우 * 1000 ...
    $timer.textContent = time;

    // 타임 오버
    if (time === 0) {
      setTimeout(() => {
        clearInterval(timerId);
        clearInterval(tickId);
        alert(`TIME OVER! 잡은 두더지 수:${score}`);
        // 게임 재시작
        // window.location.reload();
      }, 50); // alert 가 화면을 그리는 것을 막을 수 있기 때문에
    }
  }, 100)

  // 2. 두더지, 폭탄 1초마다 제각각 튀어오르기
  tickId = setInterval(tick, 1000);
  // 1. 초반 동작 시작
  tick();
})

// 두더지, 폭탄 굴에서 나오기
let gopherPercent = 0.3;
let bombPercent = 0.5;

function tick() {
  holes.forEach((hole, index) => {
    // holes = [0, 0, 0, 0, 0, 0, 0, 0, 0] 에 요소에 값( timerID )이 있으면 return
    if (hole) return; // 빈 칸에만 적용
    const randomValue = Math.random();
    // 두더지, 폭탄, 빈 칸
    if (randomValue < gopherPercent) {
      // 해당 순번 두더지 추출
      const $gopher = $$cells[index].querySelector('.gopher');
      holes[index] = setTimeout(() => {
        // 1. 숨겼다가
        $gopher.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      // 2. 1초 후 등장시키기
      $gopher.classList.remove('hidden');
    } else if (randomValue < bombPercent) {
      const $bomb = $$cells[index].querySelector('.bomb');
      holes[index] = setTimeout(() => {
        $bomb.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove('hidden');
    }
    // 생략된 else는 나머지 빈 칸 나오는 확률 50%
  })
}

// 두더지, 폭탄 클릭 이벤트
// forEach() 는 돔태그를 가져다 배열로 쓸 수 있다.
$$cells.forEach(($cell, index) => {
  // 두더지 클릭
  $cell.querySelector('.gopher').addEventListener('click', (event) => {
    // 두더지 클릭 시 점수 누적
    // 같은 두더지 여러 번 클릭시 점수 누적되는 버그 막기
    // 두더지 하나당 점수 1점씩만 부여
    // 이미 dead 된 이후로는 점수 부여x
    // add('dead') 코드보다 위에 위치해야함
    if (!event.target.classList.contains('dead')) {
      score += 1;
      $score.textContent = score;
    }
    event.target.classList.add('dead'); // 죽은 이미지로 변경
    event.target.classList.add('hidden'); // 클릭 시 바로 내려가게함 
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    // 이유: 기존의 타이머는 요소가 굴에서 1초 뒤에 사라지게 해놨는데, 요소를 클릭하면 클릭 직후에 사라지게 해야하므로
    setTimeout(() => {
      holes[index] = 0;
      // 1초 뒤에 클래스 dead 제거 (두더지 리셋)
      event.target.classList.remove('dead');
    }, 1000);
  })
  // 폭탄 클릭
  $cell.querySelector('.bomb').addEventListener('click', (event) => {
    event.target.classList.add('boom');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('boom');
    }, 1000);

    // 폭탄 클릭시 목숨 -1 씩
    life--;
    $life.textContent = life;
    if (life === 0) {
      clearInterval(timerId);
      clearTimeout(tickId);
      setTimeout(() => {
        alert(`GAME OVER! 잡은 두더지 수:${score}`)
      }, 50)
    }
  })
})