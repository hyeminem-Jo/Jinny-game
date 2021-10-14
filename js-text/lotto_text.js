const candidate = Array(45).fill().map((v, i) => i + 1)
// 1 ~ 45 까지 뽑는 코드
// Array(45): length 가 45개인 빈 배열 만들기,
// fill(): 빈 배열 안에 undefined 로 45개 채우기,
// map(): 마지막으로 map 을 통해 index 에 1씩 더하기

console.log(candidate) // [ 1, 2, 3 ... 45 ] 생성

const shuffle = []
while (candidate.length > 0) {
  // 조건(candidate.length) 자체가 알아서 계속 변해주기 떄문에 i++, i-- 등이 필요 x
  const random = Math.floor(Math.random() * candidate.length) // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1) // 뽑은 값은 배열에 있음
  const value = spliceArray[0] // 배열에 들어있는 값을 꺼내어
  shuffle.push(value) // shuffle 배열에 넣기 
}
// 작동원리: 45개의 묶음이 있으면 랜덤으로 하나씩 뽑아서 완전히 랜덤으로 섞인 배열 하나를 새로 다시 만들어냄
console.log(shuffle)

const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b)
// 1. slice(0, 6): 0번째 것부터 하여 6번째 것 이전의 숫자까지 잘라내기 (원본 shuffle[] 은 훼손되지 x)
// 2. sort(): 작은숫자 => 큰숫자 순(오름차순) 으로 정렬
const bonus = shuffle[6] // 7번째 숫자: 보너스 숫자

console.log(winBalls, bonus)

const $result = document.querySelector('#result')
const $bonus = document.querySelector('#bonus')

const colorize = (number, $tag) => { // 공 색 바꾸기
  if (number < 10) {
    $tag.style.backgroundColor = 'crimson'
    $tag.style.color = 'white'
  } else if (number < 20) {
    $tag.style.backgroundColor = 'orange'
    $tag.style.color = 'white'
  } else if (number < 30) {
    $tag.style.backgroundColor = 'gold'
    $tag.style.color = 'white'
  } else if (number < 40) {
    $tag.style.backgroundColor = 'green'
    $tag.style.color = 'white'
  } else {
    $tag.style.backgroundColor = 'blue'
    $tag.style.color = 'white'
  }
}

const showBall = (number, target) => {
  const $ball = document.createElement('div')
  $ball.className = 'ball'
  colorize(number, $ball)
  $ball.textContent = number
  target.appendChild($ball)
}

for (let i = 0; i < winBalls.length; i++) { // [0, 1, 2, 3, 4, 5] => [1000, 2000 ... 6000]
  setTimeout(() => {
    showBall(winBalls[i], $result)
  }, (i + 1) * 1000)
}

setTimeout(() => {
  showBall(bonus, $bonus)
}, 7000)