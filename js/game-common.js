const $startBtn = document.querySelector('.start')
const $gameRule = document.querySelector('#gameRule')
const $overLay = document.querySelector('.overlay')
const $exitBtn = document.querySelector('.btn--exit')

// 게임 룰 
function hideGameRule() {
  $gameRule.classList.add('hidden')
  $overLay.classList.add('hidden')
}

// 게임 시작하기, 읽음 여부 세팅
$startBtn.addEventListener('click', () => {
  hideGameRule()
  localStorage.setItem('readOrNot', 'read');
})

// gameRule 읽음 여부 확인
const savedRead = localStorage.getItem('readOrNot')
if(savedRead !== null) { 
  hideGameRule()
} else {
  $gameRule.classList.remove('hidden')
  $overLay.classList.remove('hidden')
}

$exitBtn.addEventListener('click', () => {
  localStorage.removeItem('readOrNot')
})
