const $popUp = document.querySelector('#popUp')
const $greeting = document.querySelector('.greeting')
const $result = document.querySelector('.result')
const $answer = document.querySelector('.answer')

function defeated() {
  $popUp.classList.remove('hidden')
  const $emotionLose = document.querySelector('.emotion-lose')
  $emotionLose.classList.remove('hidden')
  $greeting.append(`아쉽네요`, document.createElement('br'))
  $result.prepend(`패배`, document.createElement('br'))
  $answer.append(`정답: ${answer.join()}`)
  $overLay.classList.remove('hidden')
}

function win() {
  $popUp.classList.remove('hidden')
  const $emotionWin = document.querySelector('.emotion-win')
  $emotionWin.classList.remove('hidden')
  $greeting.append(`축하합니다`, document.createElement('br'))
  $result.prepend(`홈런`, document.createElement('br'))
  $answer.append(`정답: ${answer.join()}`)
  $overLay.classList.remove('hidden')
}