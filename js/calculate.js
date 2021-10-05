const $operator = document.querySelector('#operator')
const $result = document.querySelector('#result')

let numOne = ''
let numTwo = ''
let operator = ''

const onClickNum = (event) => {
  if (!operator) {
    numOne += event.target.textContent
    $result.value += event.target.textContent
    return
  }
  if (!numTwo) {
    $result.value = ''
  }
  numTwo += event.target.textContent
  $result.value += event.target.textContent
}

document.querySelector('#num-0').addEventListener('click', onClickNum)
document.querySelector('#num-1').addEventListener('click', onClickNum)
document.querySelector('#num-2').addEventListener('click', onClickNum)
document.querySelector('#num-3').addEventListener('click', onClickNum)
document.querySelector('#num-4').addEventListener('click', onClickNum)
document.querySelector('#num-5').addEventListener('click', onClickNum)
document.querySelector('#num-6').addEventListener('click', onClickNum)
document.querySelector('#num-7').addEventListener('click', onClickNum)
document.querySelector('#num-8').addEventListener('click', onClickNum)
document.querySelector('#num-9').addEventListener('click', onClickNum)

const onClickOperator = (event) => {
  if (numTwo) {
    calculator()
    numOne = $result.value
    numTwo = ''
  }

  if (numOne) {
    operator = event.target.textContent
    $operator.value = event.target.textContent
  } else if (event.target.textContent === '-') {
    numOne += '-'
    $result.value = '0' // '-' 같이 음수표시가 안됨 ㅠ
  }
}

document.querySelector('#plus').addEventListener('click', onClickOperator)
document.querySelector('#minus').addEventListener('click', onClickOperator)
document.querySelector('#divide').addEventListener('click', onClickOperator)
document.querySelector('#multifly').addEventListener('click', onClickOperator)

const calculator = () => {
  switch (operator) {
    case '+': {
      $result.value = Number(numOne) + Number(numTwo)
      break
    }
    case '-': {
      $result.value = numOne - numTwo
      break
    }
    case '/': {
      $result.value = numOne / numTwo
      break
    }
    case 'x': {
      $result.value = numOne * numTwo
      break
    }
  }
}

document.querySelector('#calculate').addEventListener('click', () => {
  if (numTwo) {
    calculator()
    $operator.value = ''
    numOne = $result.value
    numTwo = ''
    operator = ''
  }
})

document.querySelector('#clear').addEventListener('click', () => {
  $result.value = ''
  $operator.value = ''
  operator = ''
  numOne = ''
  numTwo = ''
})