const $em = document.querySelector('.suggestion em');

const $startBtn = document.querySelector('.start')
$startBtn.addEventListener('click', gameStart)

function gameStart() {
  const numOfUser = Number(prompt('참가자 수를 입력하세요'));
  if (numOfUser) {
    const $form = document.querySelector('#word-relay__form');
    const $input = $form.querySelector('input[type=text]');
    const $order = document.querySelector('#order');
    const $word = document.querySelector('#word');
    const $timer = document.getElementById('timer');

    let word;
    let newWord;
    let second;

    const onSubmitHandler = (event) => {
      event.preventDefault();
      newWord = $input.value;
      if (
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

        // 타이머(제한시간) 작동
        clearInterval(timerId);
        intervalId = setInterval(timer, 1000);
        $timer.textContent = '30';
        const timer = () => {
          second = Number($timer.textContent);
          second -= 1;
          $timer.textContent = second;
          // $timer.textContent = second - 1 :
          // 계속 30에서 1을 한번 밖에 안 뺀 값인 29 만 나옴
          if (second > 0 && second <= 5) {
            $timer.style.color = 'red';
          } else if (second <= 0) {
            $timer.style.color = 'red';
            clearInterval(timerId); // 0초 때 타이머 멈춤
            // timerId = null // 흠
          }
        };
        let timerId = setInterval(timer, 1000);
      } else if (newWord.length !== 3) {
        alert('단어는 세글자로 입력해야합니다');
      } else if (word && word[word.length - 1] !== newWord[0]) {
        alert('올바르지 않은 단어입니다');
      }
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

const $gameRule = document.querySelector('#gameRule')
const $overLay = document.querySelector('.overlay')
const $exitBtn = document.querySelector('.btn--exit')

// 게임 룰 
function hideGameRule() {
  $gameRule.classList.add('hidden')
  $overLay.classList.add('hidden')
}

// 게임 시작하기
$startBtn.addEventListener('click', () => {
  hideGameRule()
  localStorage.setItem('readOrNot', 'read');
})

// gameRule 읽음 여부 확인
const savedRead = localStorage.getItem('readOrNot')
if(savedRead !== null) { 
  hideGameRule();
  gameStart();
} else {
  $gameRule.classList.remove('hidden')
  $overLay.classList.remove('hidden')
}

$exitBtn.addEventListener('click', () => {
  localStorage.removeItem('readOrNot')
})