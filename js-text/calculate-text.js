let numOne = '' // 문자데이터가 들어가야 하므로 '' 넣어주기
let operator = ''
let numTwo = ''

const $operator = document.querySelector('#operator')
const $result = document.querySelector('#result')

// 숫자 입력 -----------------------------------------------------

const onClickNum = (event) => { // 함수 안의 함수에 실제 기능을 넣어줌
  // 연산자가 없을 때
  if (!operator) {
    numOne += event.target.textContent
    $result.value += event.target.textContent
    return
  }
  // 연산자가 있을 때
  if (!numTwo) { // 연산자가 뜨고 numTwo 를 입력하기 전에 화면에서 numOne 값 숨기기
    $result.value = '';
  }
  numTwo += event.target.textContent // numTwo = numTwo + number
  $result.value += event.target.textContent
  console.log('num1: ' + numOne + ' num2: ' + numTwo)
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


// 연산자 입력 -----------------------------------------------------

const onClickOperator = (event) => {

  // operator = event.target.textContent
  if (numOne && operator && numTwo) { // 일일히 (=) 누르는 동작 없이 바로 다음 연산자를 누르면서 연달아 계산하기
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
      default:
        break
    }

    numOne = $result.value
    numTwo = ''
    console.log('num1 ' + numOne)
  }

  if (numOne) {
    operator = event.target.textContent
    $operator.value = operator
  } else if (event.target.textContent === '-') {
    numOne += '-'
    $result.value = '0'
  }

  // numTwo 부분 음수로 만들기 >> 보류

  // if(operator && !numTwo && event.target.textContent === '-') {
  //   numTwo += '-'
  //   $result.value = '0'
  //   $operator.value = ''
  //   console.log('num2 : '+ numTwo)
  // }
}

document.querySelector('#plus').addEventListener('click', onClickOperator)
document.querySelector('#minus').addEventListener('click', onClickOperator)
document.querySelector('#divide').addEventListener('click', onClickOperator)
document.querySelector('#multifly').addEventListener('click', onClickOperator)

// (=)버튼 입력 -----------------------------------------------------

document.querySelector('#calculate').addEventListener('click', () => { // = 버튼
  // + 외의 다른 연산자는 문자열을 숫자열로 바꿔주기 때문에 parseInt를 해줄 필요가 x
  if (numTwo) {
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
      default:
        break
    }

    // (=)를 누른 후 값이 나온 상태에도 연달아 계산하기
    $operator.value = ''
    numOne = $result.value
    numTwo = ''
    operator = ''
  }
})


// clear 버튼 입력 -----------------------------------------------------

document.querySelector('#clear').addEventListener('click', () => { // 초기화 버튼
  numOne = '' // 변수 값 초기화
  operator = ''
  numTwo = ''
  $operator.value = '' // 화면에 있는 것도 초기화
  $result.value = ''
})
