const candidate = Array(45).fill().map((v, i) => i + 1)

const shuffle = []
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length) 
  const spliceArray = candidate.splice(random, 1) 
  const value = spliceArray[0] 
  shuffle.push(value) 
}

const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b) 
const bonus = shuffle[6] 

const $result = document.querySelector('#result')
const $bonus = document.querySelector('#bonus')

const colorize = (number, $tag) => {
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

for(let i = 0; i < 6; i++) { // [0, 1, 2, 3, 4, 5] => [1000, 2000 ... 6000]
  setTimeout(() => {
    showBall(winBalls[i], $result)
  }, (i + 1) * 1000)
}

setTimeout(() => { 
  showBall(bonus, $bonus)
}, 7000)