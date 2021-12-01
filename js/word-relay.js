const $em = document.querySelector('.suggestion em');

const $startBtn = document.querySelector('.start');
$startBtn.addEventListener('click', gameStart);

// 팝업창: 승리 여부
const $popUp = document.querySelector('#popUp');
const $greeting = document.querySelector('.greeting');
const $result = document.querySelector('.result');
// const $overLay = document.querySelector('.overlay');

function gameStart() {
  const numOfUser = Number(prompt('참가자 수를 입력하세요'));
  // 참여자 수가 입력되면 게임 시작
  if (numOfUser) {
    const $form = document.querySelector('#word-relay__form');
    const $input = $form.querySelector('input[type=text]');
    const $order = document.querySelector('#order');
    const $word = document.querySelector('#word');
    const $timer = document.getElementById('timer');

    let word;
    let newWord;
    let second;
    let timerId;

    // 타이머(제한시간) 작동
    const timer = () => {
      second = Number($timer.textContent);
      second -= 1;
      $timer.textContent = second;
      if (second > 0 && second <= 5) {
        $timer.style.color = 'red';
      } else if (second === 0) { // 한명이라도 패배 하는 경우
        $timer.style.color = 'red';
        clearInterval(timerId); // 0초 때 타이머 멈춤
        $form.removeEventListener('submit', onSubmitHandler);
        setTimeout(() => {
          $popUp.classList.remove('hidden');
          $greeting.append(`패배자: ${$order.textContent} 번째 참가자`, document.createElement('br'));
          $result.append(`TIME OVER!`, document.createElement('br'));
          $overLay.classList.remove('hidden');
        }, 500);
      }
    };

    // 글자를 입력했을 때
    const onSubmitHandler = (event) => {
      // 제한 시간 내에 글자를 넣어 클릭했을 시 타이머를 삭제 (타이머 중복 방지)
      if (second <= 30 || second > 0) {
        clearInterval(timerId);
      }
      event.preventDefault();
      newWord = $input.value;
      if (
        // 글자 입력 조건 모두 일치
        (!word || word[word.length - 1] === newWord[0]) &&
        newWord.length === 3
      ) {
        word = newWord;
        $word.textContent = word;
        $word.style.color = 'black';
        $em.classList.remove('hidden');
        const order = Number($order.textContent);
        if (order === numOfUser) {
          $order.textContent = 1;
        } else {
          $order.textContent = order + 1;
        }

        // 글자 조건에 맞게 입력후 클릭 시 타이머 시간 10으로 초기화
        $timer.textContent = '10';
        $timer.style.color = 'black';

      } else if (newWord.length !== 3) {
        alert('단어는 세글자로 입력해야합니다'); // 글자 수 조건 어김
      } else if (word && word[word.length - 1] !== newWord[0]) {
        alert('올바르지 않은 단어입니다'); // 글자 수 조건 어김
      }
      // 타이머 작동
      timerId = setInterval(timer, 1000);
      // 글자창 초기화
      $input.value = '';
      $input.focus();
    };

    $input.focus();
    $form.addEventListener('submit', onSubmitHandler);
    $input.addEventListener('focus', function () {
      this.setAttribute('placeholder', '');
    });
    $input.addEventListener('blur', function () {
      this.setAttribute('placeholder', '단어를 입력하세요');
    });
  } else if (isNaN(numOfUser)) {
    alert('숫자를 입력해주세요');
    // numOfUser = Number(prompt("참가자 수를 입력하세요"))
    document.querySelector('body > *').remove();
  } else {
    document.querySelector('body > *').remove();
  }
}

const $gameRule = document.querySelector('#gameRule');
const $overLay = document.querySelector('.overlay');
const $exitBtn = document.querySelector('.btn--exit');

// 게임 룰
function hideGameRule() {
  $gameRule.classList.add('hidden');
  $overLay.classList.add('hidden');
}

// 게임 시작하기
$startBtn.addEventListener('click', () => {
  hideGameRule();
  localStorage.setItem('readOrNot', 'read');
});

// gameRule 읽음 여부 확인
const savedRead = localStorage.getItem('readOrNot');
if (savedRead !== null) {
  hideGameRule();
  gameStart();
} else {
  $gameRule.classList.remove('hidden');
  $overLay.classList.remove('hidden');
}

$exitBtn.addEventListener('click', () => {
  localStorage.removeItem('readOrNot');
});