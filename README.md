# Jinny Game
> 여러 가지 다양한 게임을 경험할 수 있는 PC 게임 사이트 입니다.

![image](https://user-images.githubusercontent.com/83049523/169818505-9e4bd072-743e-454d-b7fa-7f9c5686acdb.png)


## 개요
본 프로젝트는 흔히 아는 끝말잇기 게임부터, 숫자 야구, 틱택토 등 바닐라 자바스크립트로 구현 된 여러 가지 다양한 게임들로 구성되어있습니다. 또한 기능 뿐만 아닌 캐릭터 디자인과 배경디자인, 게임에 필요한 UI 요소들을 추가하여 나만의 게임 사이트로 제작하였습니다.

### 사용된 언어 및 플러그인
- html / scss / javascript


## 게임 종류

### 1. 끝말 잇기 
제한 시간내에 첫 말과 끝 말이 동일한 단어를 제시해야 통과하는 게임입니다. 

![image](https://user-images.githubusercontent.com/83049523/169819338-52cd7bb0-a6e0-418b-a00a-b4b26b553800.png)

**문제 해결 및 성능 개선:**

성능 개선: 
- 끝자리에 깜박거리는 애니메이션 효과를 넣어 첫글자로 입력해야할 글자를 시각적으로 명시
- 제한시간(타이머) 생성
- 타임오버 됐을 시 누가 패배했는지에 대한 알림과 다시 하기 선택지 생성

문제 해결: 

  끝말잇기를 할 때, 우리는 시간에 제한을 두고 한다. 그래서 타이머를 설정하고자 `setInterval` 을 사용하였지만, 중간에 다음 순서로 넘어가면서 새로고침 이후에 타이머가 점점 빠르게 작동하는 것이었다. 여러 구글링을 통해 원인을 알아냈는데, 바로 `setInterval` 은 한 번 작동후 완전히 사라지는 것이 아닌, 점점 쌓이면서 동작들이 중복되어 점점 빨라지는 버그가 있다는 것이었다. `clearInterval` 을 중간 여러 군데에 배치해보았지만 실패하였고, 재귀적 동작을 통한 `setTimeout` 으로 다시 시도를 해보았지만 결국 모두 실패하였다. 

  그러나 `clearInterval` 을 어디에 활용할 지 마침내 찾아냈다. 게임에서 글자를 [타임오버가 아닌 제한 시간내에 입력한 경우] input 을 누르는 그 타이밍에 `clearInterval` 을 넣어주었더니 타이머 중복 현상이 생기지 않았다. 무작정 넣는 것이 아닌, 타이머가 사라질 때의 조건을 제대로 인지한 후 그 부분에 `clearInterval` 을 배치했어야 했다.

```javascript
// 제한 시간 내에 글자를 넣어 클릭했을 시 타이머를 삭제 (타이머 중복 방지)
if (second <= 30 || second > 0) {
  clearInterval(timerId);
}
```

해당 코드는 두 개의 조건을 만족해야 실행되도록 하였다. 

- 조건(1): 글자를 제대로 입력함  

- 조건(2): 제한 시간 내에 입력함

- 조건(1) 코드 내부에 해당 내용인 조건(2)의 내용을 넣었다.

또한, 조건을 갖춘 후 타이머가 리셋하면서 그전의 턴에서 깎인 `second` 도 같이 리셋해주어야 하므로 `$timer.textContent` 값을 10으로 리셋해주는 코드 역시 위에서 말한 조건(1) 부분에 삽입해주었다.

해당 버그에 시간을 너무 할애하게 되어 나는 시간이 남는 날이면 중간마다 틈틈히 고치는 노력을 하였고, 결국 해결했다. 이러한 과정은 내가 `setInterval` 에 대한 버그에 대해 제대로 이해하고 평상시의 문제 해결 능력에서 한 단계 더 발전됐다는 점에서 의미가 크다고 생각한다.

---

### 2. 숫자 야구

4개의 숫자를 제한된 기회 안에 맞추는 게임입니다.(야구의 규칙 용어만 가져옴)

![image](https://user-images.githubusercontent.com/83049523/169820625-8a3b6f9a-56d0-4d8c-9a28-2ee2e88bc263.png)

**문제 해결 및 성능 개선:**

성능 개선:

- 숫자를 입력할 때마다 차례, 유저가 입력한 숫자, 결과값(볼, 스트라이크, 아웃 여부)을 표시하기에 테이블 태그가 적절하다 생각하여 활용하였다. 이를 통해 화면상으로 결과값들이 더 미적으로 표현되게 하였고, 시멘틱적인 태그 사용을 경험했다.
- 처음 게임을 시작할 때 게임룰을 팝업창 형식으로 띄우고, '게임 룰을 읽음'의 여부를 저장하여 그 이후로 유저가 게임을 다시 시작할 때 게임룰 팝업창이 다시 뜨지 않도록 하는 기능을 추가하였다. 또한 해당 게임을 나갔다가 다시 들어오면 다시 게임룰이 뜨게 하게끔 만들어보았다.

문제 해결:

보통 처음 게임을 접할 때 우리는 게임 방법을 인지를 해야하므로 게임 설명을 먼저 읽는다. 하지만 게임을 하고 나면, 룰을 이미 알고있어 설명을 보지 않아도 게임을 진행할 수 있다. 게임 룰 창을 만든 후 테스트해본 결과 게임 창을 열때마다 이미 읽지않아도 되는 룰이 계속 뜨는 부분이 번거로웠다. 이를 해결하기 위해, 이전에 다른 강의에서 localStorage() 를 통해 로컬저장소에 저장하면 새로고침을 해도 데이터의 손상없이 저장되는 방법을 기억하여 그부분을 응용해보았다. 그렇게 하여 게임 룰을 한 번 닫으면 게임 다시하기 버튼을 눌러도 게임룰이 더이상 뜨지 않고 게임을 진행할 수 있게 되었다. 하지만 룰을 잊을 경우를 대비하여 다시 따로 게임 설명을 킬 수 있는 버튼도 만들었다. 그리고 앞으로의 모든 게임에 적용시키기 위해 공통코드로 만들어 주었다.


### 3. 다함께 틱택토

오목게임과 룰이 같으며, 3목으로 승부합니다. 3 * 3 = 9개의 칸 안에 o 와 x 를 턴마다 삽입하여 세 개 연속 같은 모양일 경우 승리하는 게임입니다.

![image](https://user-images.githubusercontent.com/83049523/169821493-606736d8-5941-4fc6-a2a3-d3930f3ff281.png)


---

### 4. 잡아라 몬스터

4개의 숫자를 제한된 기회 안에 맞추는 게임입니다.(야구의 규칙 용어만 가져옴)

![image](https://user-images.githubusercontent.com/83049523/169822593-5a64dd62-333f-42e9-aaf5-c222fdba04d5.png)

**문제 해결 및 성능 개선:**

성능 개선:

- `input` 에 메뉴 번호값을 기입하는 방식 대신 버튼을 클릭해 메뉴를 고르는 방식으로 코드 수정
- 메시지, 게임 캐릭터들의 스택표시 등의 배치를 기존 시판에 있는 게임처럼 고려하여 디자인 작업
- 저렙 몬스터일 수록 더 많이 출몰하게 약간의 코드를 수정

문제 해결:

1. 강의에서는 `input` 에 메뉴의 번호 값을 입력하는 식의 번거로운 메뉴로 작업이 되었고, 이를 버튼을 누르는 식의 작업으로 다시 리뉴얼 하였다. 그런 과정에서 문제가 생겼는데, 메뉴들을 전부 버튼으로 만든 뒤 기존의 `input` 태그와 `input` 태그와 관련된 스크립트들을 지우고 게임을 실행하니 버튼을 누를때마다 새로고침이 되는 것이었다. 확인 끝에 나는 메뉴들이 `form` 태그로 감싸져 있어 버튼 클릭 후 새로고침이 되었던 것이고, `input` 관련 스크립트 부분을 지우는 과정에서 `event.perventDeault()`도 같이 작동이 되지 않았던 것이다. 해결 방법은 간단했다. `form` 태그를 `div` 태그로 다시 바꾼 후 실행하니 중간에 새로고침되는 현상은 없어졌다. 또한 버튼 하나하나에 다시 `addEventListener` 이벤트를 주었고, 콜백함수를 클래스에 메서드로 넣어 작업하며 한번 더 복습을 하게 되었다.

2. (실패) `javascript` 를 통해 몬스터가 바뀔 때마다 `style.backgroundImage` 를 통해 배경이미지를 바꾸려 했지만, 되지 않았다. 그 이유를 찾는 도중 Open Live Server 를 통해서는 이미지가 뜨고, `npm run dev` 를 통해 브라우저를 띄우면 이미지가 뜨지 않는 현상이 발생했고, 그 과정에서 난 parcel-bundler 때문인 것을 알 수 있었다. parcel 번들러를 사용하면 파일들이 `dist` 폴더에 올라가 브라우저에 뜨는데, 이미지 같은 정적 파일들은 따로 패키지를 통해 `dist` 폴더로 자동으로 이동시켜야했던 것이다. 하지만 이렇게 고쳐보았지만 여전히 작동이 되지 않아 다시 해결해야할 문제로 남았다

---

### 5. 지뢰 찾기

지뢰를 피해가면서 빈 사각형을 찾는 게임으로, 시간이 적게 걸릴 수록 점수가 높은 게임입니다.

![image](https://user-images.githubusercontent.com/83049523/169823889-4b3a0ee3-3708-4579-a257-2321ebb5ca9b.png)

**문제 해결 및 성능 개선:**

문제 해결:

개발 과정에서 첫 클릭시 지뢰가 있으면, 그 지뢰가 옮겨질 때 어디로 옮겨졌는지 알 수 있어야 하는데, 수업중에 그런 내용이 없어서 스스로 생각해보았고, 방법은 간단했다.

```javascript
// 지뢰가 옮겨진 칸에 X 표시 하기
const target = $tbody.children[rI]?.children[cI];
dev && (target.textContent = 'X');
```

수업 내용 중 데이터 값에서 역으로 돔태그 `target` 위치를 얻었던 것을 기억하여, 그때와 똑같이 `target` 값을 구한 뒤 그 곳에 X표시를 넣는 코드를 작성해보았다. 이 역시 개발하는 환경에서 작동해야 되므로 `&&` 로 조건을 걸어두었다.

---

### 6. 카드 맞추기

지뢰를 피해가면서 빈 사각형을 찾는 게임으로, 시간이 적게 걸릴 수록 점수가 높은 게임입니다.

![image](https://user-images.githubusercontent.com/83049523/169824156-ef7ad81e-8f22-4469-a548-995d2cfe8fe9.png)

**문제 해결 및 성능 개선:**

성능 개선:

색으로 이루어진 카드가 아닌 트럼프 카드로 바꾸기

게임을 할때 카드의 색으로 구분하면 직관적으로 잘 구분할 수 있어 자칫 게임이 쉬워지기 때문에, 난이도를 더 높이고자 숫자, 모양으로 이루어진 트럼프 카드로 종류를 바꾸었다. 원래 배열안의 색을 카드의 `cardBack` 요소에`style.backgroundColor` 로 지정해주던 것을, 배열에 트럼프 카드 이미지로 연결된 클래스 이름으로 요소를 넣은 후 생성되는 카드에 랜덤으로 해당 배열 요소를 클래스로 추가하는 코드로 짜보았다.

  ```javascript
  const cardsNum = ['card-a', 'card-2', 'card-3' ... ]

  // shuffle() 함수로 cardsNum[] >> shuffled[] 옮긴 후
  let randomCard = shuffled[i];
  cardBack.classList.add(`${randomCard}`);
  ```

  카드 두장이 같은 것인지 비교할 때도 원래는 카드 색으로 구분할 땐 style.backgroundColor 의 값으로 비교했지만, 트럼프 카드로 할 때는 클래스 네임이 같은지의 여부로 판단하게끔 하였다.

  ```javascript
  // 두 장의 카드가 모두 뒤집혔을 때
  const firstBack = clicked[0].querySelector('.card-back').className;
  const secondBack = clicked[1].querySelector('.card-back').className;

  if (firstBack === secondBack) {
    alert('같은 카드입니다');
  }
  ```

문제 해결:

카드 개수 입력시 짝수로만 받기 (후에 리뉴얼해서 코딩할 땐 prompt 사용없이 20개로 고정시켰다.)

해당 카드 게임은 카드의 개수가 짝수로 이루어져야하는 게임이다. 사용자가 홀수로 카드 개수를 입력해버리면 게임이 제대로 종료되지 않고 카드 한장이 반드시 남기 때문이다. 그럼 조건문을 걸어주어야 하는데, 숫자가 짝수가 되도록 선별하려면 어떻게 조건을 걸어주어야 할 지 방법을 찾아보았다. 짝수는 2로 나누어주면 항상 나머지로 0 이 남는 특징이 있었는데, 이 나머지를 구하는 연산자가 `%` 임을 알게 되었다. 그렇게 해결한 코드가 다음과 같다.

```javascript
const total = parseInt(prompt('카드 개수를 짝수로 입력하세요. (최대 20개)'));

// 카드 개수를 짝수로 입력하지 않았을 때
if (total % 2 !== 0) {
  alert('짝수로 입력해주세요');
  window.location.reload();
} else if (total > 20) {
    alert('20개 이하로 입력해주세요');
    window.location.reload();
  }
```

게임이 시작하는 부분에 코드를 작성하였고, 짝수가 입력되지 않을 시 페이지가 reload 되도록 하였다. `let` 을 이용해 다시 `total` 에 `prompt` 를 삽입하는 방법을 시도했지만, 변수 `total` 의 값이 변화하면서 버그를 일으켰다. `return` 을 걸어버리면 그대로 화면이 종료되어 사용자가 다시 새로고침을 해야했으므로 자동으로 새로고침이 되도록 `window.location.reload();` 코드를 삽입해주었다. 더 나은 방법이 있는지 앞으로의 해결과정으로 남겨두었다.

---

## 프로젝트 의의
자바스크립트의 정수를 모두 이 게임사이트 하나로 배웠다고 해도 과언이 아니었습니다. 평소 웹사이트 하나에 구현되는 javascript 의 간단한 기능만 구현하다가 본 프로젝트를 통해  여러 다양한 메서드를 프로그래밍적 사고와 함께 사용하는 연습을 거치면서 자바스크립트에 대한 이해도가 전보다 훨씬 깊어졌습니다. 또한 가장 중요한 성능 개선에 대한 생각과 문제 해결 능력도 기른데 큰 의의가 있었습니다.
