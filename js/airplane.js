const $game = document.querySelector('#game');
const $start = document.querySelector('#start');

let alienPoX = 10;

// setTimeout
let attackedId;
let removeId;
let crashRemoveId;
let smallSpeed;
let mideumSpeed;
let bigSpeed;

let airplaneCoordsRight;
let airplaneCoordsTop;
let airplaneCoordsBottom;
let alienCoordsLeft = [];
let alienCoordsBottom = [];
let alienCoordsTop = [];

class Game {
  constructor() {
    this.alien = [];
    this.airplane = null;
    this.alienList = [
      { name: '중렙', hp: 30, att: 20 },
      { name: '중렙', hp: 30, att: 20 },
      { name: '만렙', hp: 50, att: 35 },
    ];

    // 쪼렙 생성하기
    // 쪼렙은 다른 외계인에 비해 가장 빈번하게 등장하도록 하기 위해 반복문으로 수를 늘렸다.
    for (let i = 0; i < 5; i++) {
      this.alienList.push({ name: '쪼렙', hp: 10, att: 10 });
    }

    this.paintAirplane();
    this.createAlien();
    this.controlSpeed();
    this.removeAlien();
  }

  // 화면 표시 - 아군
  paintAirplane = () => {
    const $airplane = document.createElement('div');
    const $airplaneHpBox = document.createElement('div');
    const $airplaneHp = document.createElement('div');

    $airplane.className = 'airplane';
    $airplaneHpBox.className = 'airplane-hp-box';
    $airplaneHp.className = 'airplane-hp';

    $airplaneHpBox.appendChild($airplaneHp);
    $airplane.appendChild($airplaneHpBox);
    $game.appendChild($airplane);
  };

  createAlien = () => {
    // 랜덤 숫자로 외계인 수 생성하기 (최대 6마리까지 생성)
    for (let i = 0; i < Math.floor(Math.random() * 6) + 2; i++) {
      // 랜덤으로 외계인 뽑기
      const randomIndex = Math.floor(Math.random() * this.alienList.length);
      const randomAlien = this.alienList[randomIndex];

      // 랜덤으로 뽑힌 외계인들 삽입
      this.alien[i] = new Alien(
        this,
        randomAlien.hp,
        randomAlien.att,
        randomAlien.name
      );

      // 화면 표시 - 외계인
      this.paintAlien(i);
    }

    // 외계인 속도 지정
    this.controlSpeed();

    const $$aliens = document.querySelectorAll('.alien');
    console.log(this.alien);

    return $$aliens;
  };

  // 화면 밖 외계인 전부 없애기 (미해결-2)
  removeAlien = () => {
    removeId = setTimeout(() => {
      const $$aliens = document.querySelectorAll('.alien');
      const $airplane = document.querySelectorAll('.airplane');
      // NodeList > Array 로 바꾸기
      // const aliens = Array.prototype.slice.call($$aliens);

      $$aliens.forEach((alien) => {
        alien.remove();
        alien.style.right = `10px`;
      });

      // this.alien = [];
      alienCoordsLeft = [];
      alienCoordsBottom = [];
      alienCoordsTop = [];
      airplaneCoordsRight = null;
      airplaneCoordsBottom = null;
      airplaneCoordsTop = null;

      console.log($$aliens);
      console.log(this.alien);
    }, 1000);
    // }, 8000);

    // 화면 밖 외계인 화면 밖으로 나가면 전부 없애기 (미해결-2)
  };

  // 외계인 속도 지정 차선책 (미해결-1)
  // https://donggov.tistory.com/154
  // https://imki123.github.io/posts/33/
  controlSpeed = () => {
    const $$aliens = document.querySelectorAll('.alien');
    console.log($$aliens); // NodeList

    $$aliens.forEach((alien) => {
      if (alien.classList.contains('small-alien')) {
        // alien.classList.add('Im-small');
        smallSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
          this.crashAlien();
        }, 10);
      } else if (alien.classList.contains('mideum-alien')) {
        // alien.classList.add('Im-mideum');
        mideumSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
          this.crashAlien();
        }, 10);
      } else if (alien.classList.contains('big-alien')) {
        // alien.classList.add('Im-big');
        bigSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
          this.crashAlien();
        }, 10);
      }
    });
  };

  // 외계인에 따라 다른 속도 부여 (미해결-1)

  // 화면 표시 - 외계인
  paintAlien = (i) => {
    const $alien = document.createElement('div');
    const $alienHpBox = document.createElement('div');
    const $alienHp = document.createElement('div');

    $alien.className = 'alien';
    $alien.classList.add(`alien${i}`);
    $alienHpBox.className = 'alien-hp-box';
    $alienHp.className = 'alien-hp';

    $alienHpBox.appendChild($alienHp);
    $alien.appendChild($alienHpBox);
    $alien.style.top = `${Math.floor(Math.random() * 6) * 100 + 100}px`;

    // 만들어진 외계인 .aliens 로 감싸기
    const $aliens = document.querySelector('.aliens');
    $aliens.appendChild($alien);

    // 외계인 등급 구분
    if (this.alien[i].name === '쪼렙') {
      $alien.classList.add('small-alien');
    } else if (this.alien[i].name === '중렙') {
      $alien.classList.add('mideum-alien');
    } else if (this.alien[i].name === '만렙') {
      $alien.classList.add('big-alien');
    }
  };

  // 충돌 이벤트
  // 키 움직임 이벤트 때마다 발동되도록 하기! >> 좌표(coords) 갱신
  crashAlien = () => {
    const $airplane = document.querySelector('.airplane');
    const $$aliens = document.querySelectorAll('.alien');
    airplaneCoordsRight = $airplane.getBoundingClientRect().right;
    airplaneCoordsBottom = $airplane.getBoundingClientRect().bottom;
    airplaneCoordsTop = $airplane.getBoundingClientRect().top;

    $$aliens.forEach((alien, i) => {
      if (alien.classList.contains(`alien${i}`)) {
        alienCoordsLeft[i] = alien.getBoundingClientRect().left;
        alienCoordsBottom[i] = alien.getBoundingClientRect().bottom;
        alienCoordsTop[i] = alien.getBoundingClientRect().top;
      }
      if (
        airplaneCoordsRight >= alienCoordsLeft[i] &&
        airplaneCoordsTop < alienCoordsBottom[i] &&
        airplaneCoordsBottom >= alienCoordsTop[i]
      ) {
        // 주인공과 맞닿은 외계인 요소 사라지게 하기 (미해결-3)
        crashRemoveId = setTimeout(() => {
          alien.remove();
        }, 0 + [i]);

        // 사라지는 외계인 요소의 좌표 (미해결-4)

        $airplane.classList.add('attacked');
        attackedId = setTimeout(() => {
          $airplane.classList.remove('attacked');
          clearTimeout(attackedId);
        }, 500);

        alienCoordsBottom = [];
        alienCoordsLeft = [];
      }
      console.log(alienCoordsLeft, alienCoordsBottom);
    });
  };
}

// 공통
class Unit {
  constructor(game, hp, att) {
    this.game = game;
    this.hp = hp;
    this.att = att;
  }

  attack(target) {
    target.hp -= this.att;
  }
}

// 전투기(나)
class Airplane extends Unit {
  constructor(game) {
    super(game, 100, 10);
  }
}

// 외계인
class Alien extends Unit {
  constructor(game, hp, att, name) {
    super(game, hp, att);
    this.name = name;
  }
}

// 랜덤한 시간에

let game = null;
$start.addEventListener('click', () => {
  game = new Game();
});
