const $form = document.querySelector('form') // html 태그를 선택하여 담은 변수는 $로 구분
const $input = $form.querySelector('input[type=text]')
// const $btn = $form.querySelector('input[type=submit]')
const $logs = document.querySelector('#logs')

// 1. 1 ~ 9 의 숫자 생성
const numbers = [] 
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1) 
}

// 2. 상대편이 제시하는 수로, 1 ~ 9 의 숫자 중 랜덤의 숫자 뽑기 --------------------------------
const answer = [] 
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * (numbers.length))
  answer.push(numbers[index])
  numbers.splice(index, 1)
}
console.log(answer)

// 4. 유저가 시도한 숫자인 input의 입력값을 검사 ---------------------------------
const tries = [] 

function checkInput(input) { 
  if (input.length !== 4) { // (1) 길이는 4가 아닌가?
    return alert('4자리 숫자를 입력해주세요.')
  }
  if (new Set(input).size !== 4) { // (2) 4자리 숫자 중 중복된 숫자가 있는가? (각 숫자리 중복표시)
    return alert('중복되지 않게 입력해주세요.')
  }
  if (tries.includes(input)) { // (3) 이미 시도한 값은 아닌가?
    return alert('이미 시도한 값입니다')
  }
  return true // 위의 if 문의 관문들을 모두 통과하면 true 값 반환
}

function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`)
  $logs.appendChild(message)
}

// 3. 5. 유저가 숫자 맞추기 시도 ------------------------------
let out = 0

$form.addEventListener('submit', (event) => { 
  event.preventDefault();
  const value = $input.value 
  $input.value = '' 
  if (!checkInput(value)) { 
    return
  }
  // 입력값 문제 없음 (합격)
  if (answer.join('') === value) {
    $logs.textContent = '홈런!'
    return
  }
  if (tries.length >= 9) { // 10번째 시도에서는 tries.length 가 9이다
    defeated()
    return
  }

  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  answer.forEach((answerItem, i) => {
    const index = value.indexOf(answerItem)
    if (index > -1) {
      if (index === i) {
        strike += 1
      } else {
        ball += 1
      }
    }
  })

  // 아웃 일 때
  if (strike === 0 && ball === 0) {
    out++
    $logs.append(`${value}: ${out}아웃 `, document.createElement('br'))
  } else {
    $logs.append(`${value} : ${strike} 스트라이크 / ${ball} 볼`, document.createElement('br'))
  }
  if (out === 3) {
    defeated()
    return
  }
  
  tries.push(value) // 홈런도 안되고, 아웃도 안됐으면 마저 계속 입력값을 넣어 숫자맞추기 진행
})
