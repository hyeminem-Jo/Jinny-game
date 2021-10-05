let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

//숫자 버튼을 눌렀을 때
const onClickNumber = (e) => {

  //연산자가 없을 시
  // -> 첫번째 숫자 입력
  if (!operator) {
    numOne += e.target.textContent;
    $result.value += e.target.textContent;
    return;
  }

  // 연산자는 있는데 두번째 숫자가 없을 때
  if (!numTwo) {
    //결과 값 표시창 초기화
    //이전값 지우기
    $result.value = '';
  }
  // 두번째 숫자 입력
  numTwo += e.target.textContent;
  //결과 표시창에 새로 입력한 두번째 값 표시
  $result.value += e.target.textContent;
}

// 연산자 입력 시
const onClickOperator = (e) => {
  // 변수1, 2, 연산자까지 다 있을 때
  // -> 연속해서 연산을 시도할 때
  if (numOne && operator && numTwo) {
    calculate(e);
    return;
  }
  // 첫번째 값 존재하고 연산자가 - 인데 두번째 변수에 음수를 넣으려고 할 때
  if (numOne && operator === '-' && !numTwo && e.target.textContent === '-') {
    numTwo += '-'
    $result.value = '-';
    return;
  }

  // 첫번째 숫자만 있을 시
  if (numOne) {
    //연산자 입력
    operator = e.target.textContent;
    $operator.value = e.target.textContent;

    // 첫번째 숫자 입력 없는데 - 입력 시 첫번째 변수 음수입력
  } else if (e.target.textContent === '-') {
    numOne += '-';
    $result.value += '-';
  }
}

// 함수 -> 계산
// e = 이벤트 리스너의 값.
const calculate = (e) => {
  //마지막에 입력된 operator 값에 따라 연산.
  if ($operator.value === '+') {
    //변수 값을 연산해서 결과창에 표시
    $result.value = Number(numOne) + Number(numTwo);
    //결과 값을 첫번째 변수에 할당
    numOne = $result.value;
    //두번째 변수값 제거
    numTwo = '';
    //다시 입력된 연산자로 업데이트
    operator = e.target.textContent;
    //연산자 표시창 업데이트
    $operator.value = e.target.textContent;
    return;
  }
  if ($operator.value === '-') {
    $result.value = Number(numOne) - Number(numTwo);
    numOne = $result.value;
    numTwo = '';
    operator = e.target.textContent;
    $operator.value = e.target.textContent;
    return;
  }
  if ($operator.value === 'x') {
    $result.value = Number(numOne) * Number(numTwo);
    numOne = $result.value;
    numTwo = '';
    operator = e.target.textContent;
    $operator.value = e.target.textContent;
    return;
  }
  if ($operator.value === '/') {
    $result.value = Number(numOne) / Number(numTwo);
    numOne = $result.value;
    numTwo = '';
    operator = e.target.textContent;
    $operator.value = e.target.textContent;
    return;
  }
}


document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);
document.querySelector('#plus').addEventListener('click', onClickOperator);
document.querySelector('#minus').addEventListener('click', onClickOperator);
document.querySelector('#divide').addEventListener('click', onClickOperator);
document.querySelector('#multiply').addEventListener('click', onClickOperator);
document.querySelector('#clear').addEventListener('click', () => {
  numOne = '';
  operator = '';
  numTwo = '';
  $operator.value = '';
  $result.value = '';
});

document.querySelector('#calculate').addEventListener('click', (e) => {
  //두번째 변수값이 있으면
  // -> 모든 변수에 값이 할당 되었다.
  if (numTwo) {
    calculate(e);
  } else {
    alert('숫자를 먼저 입력하세요.')
  }
});