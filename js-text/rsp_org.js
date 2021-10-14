const $computer = document.querySelector('#computer')
const $score = document.querySelector('#score')
const $btnRock = document.querySelector('#rock')
const $btnScissors = document.querySelector('#scissors')
const $btnPaper = document.querySelector('#paper')
const IMG_URL = '../img/rsp.png'

$computer.style.backgroundPosition = '0 0'

const rspX = {
  rock: '0',
  scissors: '-200px',
  paper: '-400px',
}

let computerChoice = 'rock'
const changeComputerHandler = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors'
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper'
  } else {
    computerChoice = 'rock'
  }
  $computer.style.backgroundPosition = `${rspX[computerChoice]}, 0`
}
let intervalId = setInterval(changeComputerHandler, 50)

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
}

let clickable = true
let computer = 0
let me = 0
const clickBtn = (event) => {
  if (clickable) {
    clearInterval(intervalId)
    clickable = false
    const myChoice = // 누른 버튼의 id 값에 따라 바뀌는 변수
      event.target.id === 'rock' ? 'rock' :
      event.target.id === 'scissors' ? 'scissors' :
      'paper'
    const myScore = scoreTable[myChoice]
    const computerScore = scoreTable[computerChoice]
    const diff = myScore - computerScore

    let message
    if ([2, -1].includes(diff)) {
      message = '승리'
      me += 1
    } else if ([-2, 1].includes(diff)) {
      message = '패배'
      computer += 1
    } else {
      message = '무승부'
    }

    let $result = document.createElement('div')
    $result = `${message}입니다. 컴퓨터: ${computer}점 나: ${me}`
    $score.append(`${$result}`, document.createElement('br'))

    if (me >= 3) {
      alert(`최종결과: 승리`,`컴퓨터 ${computer}: ${me} 나`)
    } else if (computer >= 3) {
      alert(`최종결과: 패배`,`컴퓨터 ${computer}: ${me} 나`)
    } 

    setTimeout(() => {
      clickable = true
      intervalId = setInterval(changeComputerHandler, 50)
    }, 1000)
  }
}

$btnRock.addEventListener('click', clickBtn)
$btnScissors.addEventListener('click', clickBtn)
$btnPaper.addEventListener('click', clickBtn)