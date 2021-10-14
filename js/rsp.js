const $computer = document.querySelector('#computer')
const $btnRock = document.querySelector('#rock')
const $btnScissors = document.querySelector('#scissors')
const $btnPaper = document.querySelector('#paper')
const $score = document.querySelector('#score')

$computer.style.backgroundPosition = '0 0'

const rspX = {
  rock: '0',
  scissors: '-200px',
  paper: '-400px',
}

// computer 가위바위보 반복 동작
let computerChoice = 'rock'

const computerChoiceHandler = () => {
  if (computerChoice === 'rock') {
    computerChoice = 'scissors'
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper'
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock'
  }
  $computer.style.backgroundPosition = `${rspX[computerChoice]}, 0`
}

let intervalId = setInterval(computerChoiceHandler, 50)

const numberTable = {
  rock: 0,
  scissors: 1,
  paper: 2,
}

let clickable = true // 버그 방지용 버튼클릭 여부
let computerScore = 0 // 이긴 횟수 (화면 표시용)
let myScore = 0 // 이긴 횟수 (화면 표시용)
const clickBtn = (event) => {
  if (clickable) {
    clearInterval(intervalId)
    clickable = false
    const myChoice = 
    event.target.id === 'rock'? 'rock'
    : event.target.id === 'scissors' ? 'scissors'
    : 'paper'
    const myNum = numberTable[myChoice]
    const ComputerNum = numberTable[computerChoice]
    const diff = myNum - ComputerNum
    
    let message 
    if ([2, -1].includes(diff)) {
      message = '승리'
      myScore += 1
    } else if([-2, 1].includes(diff)) {
      message = '패배'
      computerScore += 1
    } else if (diff === 0) {
      message = '무승부'
    }

    let $result = document.createElement('div')
    $result = `${message} - 컴퓨터: ${computerScore}점 나: ${myScore}`
    $score.append(`${$result}`, document.createElement('br'))

    if (myScore >= 3) {
      alert(`최종결과: 승리 컴퓨터 ${computerScore} : ${myScore} 나`)
      return
    } else if (computerScore >= 3) {
      alert(`최종결과: 패배 컴퓨터 ${computerScore} : ${myScore} 나`)
      return
    }

    setTimeout(() => {
      clickable = true
      intervalId = setInterval(computerChoiceHandler, 50)
    }, 1000) // 1초 뒤 실행
  }
}

$btnRock.addEventListener('click', clickBtn)
$btnScissors.addEventListener('click', clickBtn)
$btnPaper.addEventListener('click', clickBtn)
