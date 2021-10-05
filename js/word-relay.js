const numOfUser = Number(prompt("참가자 수를 입력하세요"))
const $em = document.querySelector('.suggestion em')

if (numOfUser) {
  const $form = document.querySelector('#word-relay__form')
  const $input = $form.querySelector('input[type=text]')
  const $order = document.querySelector('#order')
  const $word = document.querySelector('#word')
  const $timer = document.getElementById('timer')

  let word
  let newWord
  let second

  const onSubmitHandler = (event) => {
    event.preventDefault()
    newWord = $input.value
    if ((!word || word[word.length - 1] === newWord[0]) && newWord.length === 3) {
      word = newWord
      $word.textContent = word
      $word.style.color = 'black'
      $em.classList.remove('hidden')
      const order = Number($order.textContent)
      if (order === numOfUser) {
        $order.textContent = 1
      } else {
        $order.textContent = order + 1
      }


      let timer = null
      $timer.textContent = '8'
      timer = setInterval(() => {
        second = Number($timer.textContent)
        second -= 1 // second = second - 1
        $timer.textContent = second
        // $timer.textContent = second - 1 : 계속 30에서 1을 한번밖에 안뺸 값인 29 만 나옴
        if (second > 0 && second <= 5) {
          $timer.style.color = 'red'
        } else if (second <= 0) {
          $timer.style.color = 'red'
          clearInterval(timer)
        }
      }, 1000)

      // $timer.textContent = '8'
      // const timer = setInterval(() => {
      //   second = Number($timer.textContent)
      //   second -= 1 // second = second - 1
      //   $timer.textContent = second
      //   // $timer.textContent = second - 1 : 계속 30에서 1을 한번밖에 안뺸 값인 29 만 나옴
      //   if (second > 0 && second <= 5) {
      //     $timer.style.color = 'red'
      //   } else if (second <= 0) {
      //     $timer.style.color = 'red'
      //     clearInterval(timer)
      //   }
      // }, 1000)

      // clearInterval(timer)
      // let TIME_ID = setInterval(timer, 1000)
      // TIME_ID = null
      // clearInterval(TIME_ID)

    } else if (newWord.length !== 3) {
      alert('단어는 세글자로 입력해야합니다')
    } else if (word && word[word.length - 1] !== newWord[0]) {
      alert('올바르지 않은 단어입니다')
    }
    $input.value = ''
    $input.focus()



  }

  $input.focus()
  $form.addEventListener('submit', onSubmitHandler)
  $input.addEventListener('focus', function () {
    this.setAttribute('placeholder', '')
  })
  $input.addEventListener('blur', function () {
    this.setAttribute('placeholder', '단어를 입력하세요')
  })
} else if (isNaN(numOfUser)) {
  alert("숫자를 입력해주세요")
  // numOfUser = Number(prompt("참가자 수를 입력하세요"))
  document.querySelector('body > *').remove()
} else {
  document.querySelector('body > *').remove()
}