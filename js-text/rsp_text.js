const $computer = document.querySelector('#computer')
const $score = document.querySelector('#score')
// const $btns = document.querySelectorAll('.btn')
const $btnRock = document.querySelector('#rock')
const $btnScissors = document.querySelector('#scissors')
const $btnPaper = document.querySelector('#paper')
const IMG_URL = '../img/rsp.png'

$computer.style.backgroundPosition = '0 0'
// $computer.style.background = `url(${IMG_URL}) 0 0`;

const rspX = { // 객체를 쓰는 이유: 여러개의 변수들을 하나의 공통으로 그룹화 하기 위해
  rock: '0', // '묵'
  scissors: '-200px', // '찌'
  paper: '-400px', // '빠'
}

let computerChoice = 'rock' // x 좌표 '0' 을 시작으로 한다.
const changeComputerHandler = () => {
  if (computerChoice === 'rock') { // '묵' 일때
    computerChoice = 'scissors' // => 화면상의 출력을 바꿀 때, 데이터 값도 항상 바꿔주어야 한다.
  } else if (computerChoice === 'scissors') { // '찌' 일 때
    computerChoice = 'paper'
  } else { // '빠' 일 때
    computerChoice = 'rock'
  }
  $computer.style.backgroundPosition = `${rspX[computerChoice]}, 0`
}

// rspX.computerChoice (x) 
// => 이유: computerChoice 자체는 문자열이기 때문에 rspX.'rock' 이 되어버림
// rspX.[computerChoice] (o) 
// => rspX.['rock'] (= rsp.rock) 이 되면서 맞는 표현이다.

let intervalId = setInterval(changeComputerHandler, 50)
// 함수 옆에 () 를 붙이면 안되는 이유: (changeComputerHandler() => x)
// 함수를 호출하게되어 return 되면서 return 값은 이때 undefined 이기 때문에

const scoreTable = {
  rock: 0,
  scissors: 1, 
  paper: -1,
}

// 버그: 연속으로 5번 눌릴 경우 1, 2, 3, 4번째 인터벌은 계속 돌아가고 5번째 인터벌만 clear 됨
let clickable = true
let computer = 0
let me = 0
const clickBtn = (event) => {
  if (clickable) {
    clearInterval(intervalId) 
    clickable = false // 1초간 버튼 기능 상실 

    const myChoice = // 누른 버튼의 id 값에 따라 바뀌는 변수
      event.target.id === 'rock' ? 'rock' 
      : event.target.id === 'scissors' ? 'scissors'
      : 'paper'
    const myScore = scoreTable[myChoice]
    const computerScore = scoreTable[computerChoice]
    const diff = myScore - computerScore
    // 승리 조건: 2, -1
    // 패배 조건: -2, 1
    // 무승부: 0
    let message
    if ([2, -1].includes(diff)) { // diff === 2 || diff === -1
      message = '승리'
      me += 1
    } else if ([-2, 1].includes(diff)) { // diff === -2 || diff === 1
      message = '패배'
      computer += 1
    } else {
      message = '무승부'
    }

    let $result = document.createElement('div')
    $result = `${message}입니다. 컴퓨터: ${computer}점 나: ${me}`
    $score.append(`${$result}`, document.createElement('br'))

    if (me >= 3) { // 버그에 의해 숫자가 3점보다 더 건너뛰어갈 경우 대비
      alert(`최종결과: 승리`,`컴퓨터 ${computer}: ${me} 나`)
    } else if (computer >= 3) {
      alert(`최종결과: 패배`,`컴퓨터 ${computer}: ${me} 나`)
    } 

    setTimeout(() => { // 1초 뒤 버튼 기능 활성화
      clickable = true
      intervalId = setInterval(changeComputerHandler, 50)
    }, 1000)
  }
}

// $btns.addEventListener('click', clickBtn)
$btnRock.addEventListener('click', clickBtn)
$btnScissors.addEventListener('click', clickBtn)
$btnPaper.addEventListener('click', clickBtn)