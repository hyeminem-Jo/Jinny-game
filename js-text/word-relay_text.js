const numOfUser = Number(prompt('몇 명이 참가하나요?'))

if (numOfUser) {
  const $input = document.querySelector('input')
  const $button = document.querySelector('button')
  const $word = document.querySelector('#word')
  const $order = document.querySelector('#order')

  let word
  let newWord

  const onClickBtn = () => {
    // 제시어가 비어있는가?
    if ((!word || word[word.length - 1] === newWord[0]) && newWord.length === 3) { // 비어있음
      word = newWord // 입력한 단어가 제시어가 됨
      $word.textContent = word // 제시어 화면에 표시
      const order = Number($order.textContent)
      if (order + 1 > numOfUser) { // order === numOfUser 도 가능
        $order.textContent = 1 // 다음 순서를 1로 
      } else {
        $order.textContent = order + 1 // 현재 순서 +1
      }
    } else if (newWord.length !== 3) {
      alert('단어는 세글자로 입력해야합니다')
    } else if (word && word[word.length - 1] !== newWord[0]) {
      alert('올바르지 않은 단어입니다')
    }
    $input.value = '' // 제시어 화면에 표시 후 텍스트창 비우기
    $input.focus()
  }

  const onInput = (event) => {
    newWord = event.target.value
  }

  $button.addEventListener('click', onClickBtn)
  $input.addEventListener('input', onInput)
} else if (typeof(numOfUser) === string ) {
  "숫자를 입력해주세요"
} else {
  document.querySelector('body > *').remove()
}