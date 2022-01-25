const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
// const $airplane = document.querySelector('.airplane');
// const $$aliens = document.querySelectorAll('.alien');

let alienPoX = 10;
let smallSpeed;
let mideumSpeed;
let bigSpeed;
let removeId;

let airplaneCoordsX;
let airplaneCoordsY;
let alienCoordsX = [];
let alienCoordsY = [];

// let windowWidth = window.innerWidth;
// let windowHeight = window.innerHeight;

class Game {
  constructor() {
    this.alien = [];
    this.airplane = null;
    this.alienList = [
      { name: '쪼렙', hp: 10, att: 10 },
      { name: '쪼렙', hp: 10, att: 10 },
      { name: '쪼렙', hp: 10, att: 10 },
      { name: '쪼렙', hp: 10, att: 10 },
      { name: '쪼렙', hp: 10, att: 10 },
      { name: '중렙', hp: 30, att: 20 },
      { name: '중렙', hp: 30, att: 20 },
      { name: '만렙', hp: 50, att: 35 },
    ];

    this.paintAirplane();
    this.createAlien();
    this.controlSpeed();
    // this.crashAlien();
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
    } // 여기 까지 반복문

    // 외계인 속도 지정
    this.controlSpeed();
    // 외계인 없애기
    this.removeAlien();
    console.log(this.alien);
  };

  // 화면 밖 외계인 전부 없애기 (미해결(2))
  removeAlien = () => {
    removeId = setTimeout(() => {
      const $$aliens = document.querySelectorAll('.alien');
      $$aliens.forEach((alien, i) => {
        alien.remove();
      });

      this.alien = [];
      console.log(this.alien);
    }, 8000);

    // 화면 밖 외계인 화면 밖으로 나가면 전부 없애기 (미해결)
    // 문제: 원래 외계인마다 속력을 다 다르게 주려 하였고, 속력에 따라 화면 밖으로 빠져나가는 시간도 다르게 하려고 하였지만 안됐다.
    // 원인: 원인 불명
    // 시도: position right 값이 1500px 이상이 되는 조건에 따라 외계인을 차례로 사라지게 하려 하였으나 작동하지 않았다. => 실패
    // 차선책: 시간이 지남에 따라 사라지도록 수정

    // const $$aliens = document.querySelectorAll('.alien');
    // setTimeout(() => {
    //   $$aliens.forEach((alien, i) => {
    //     const right = parseInt(alien.style.right.replace('px', ''));
    //     // right.replace('px','');
    //     if (right > 500) {
    //       alien.remove();
    //       alert('alien 500 넘음');
    //     }
    //     console.log(right);
    //   });
    // }, 1000);
  };

  // 외계인 속도 지정 차선책 (미해결(1))
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
        }, 30);
      } else if (alien.classList.contains('mideum-alien')) {
        // alien.classList.add('Im-mideum');
        mideumSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
          this.crashAlien();
        }, 30);
      } else if (alien.classList.contains('big-alien')) {
        // alien.classList.add('Im-big');
        bigSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
          this.crashAlien();
        }, 30);
      }
    });
  };

  // 외계인에 따라 다른 속도 부여 (미해결)
  // 문제: alien 모두 동일한 속력이 난다.
  // 원인: $alien 이 다 같게 인식되므로 반복문을 돌 때마다 앞서 지정된 setInterval 에서 새로운 setInterval 로 덮어씌워지기 때문에 결국 맨 마지막에 덮어씌워진 setInterval 의 속력으로 모든 alien 이 동일한 속력이 난다.
  // 시도: 반복문으로 모든 alien 들이 $$aliens[] 에 생성된 후, $$aliens 에 forEach() 를 써서 contains 으로 클래스를 구별, speed 를 지정해준다. >> 실패
  // 차선책: 외계인들 모두 동일한 속력으로 방치

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
    $game.appendChild($alien);

    // 외계인 등급 구분
    if (this.alien[i].name === '쪼렙') {
      $alien.classList.add('small-alien');
    } else if (this.alien[i].name === '중렙') {
      $alien.classList.add('mideum-alien');
    } else if (this.alien[i].name === '만렙') {
      $alien.classList.add('big-alien');
    }
  };

  // 키 움직임 이벤트 때마다 발동되도록 하기! >> 좌표(coords) 갱신
  crashAlien = () => {
    const $airplane = document.querySelector('.airplane');
    const $$aliens = document.querySelectorAll('.alien');
    airplaneCoordsX = $airplane.getBoundingClientRect().right;
    airplaneCoordsY = $airplane.getBoundingClientRect().bottom;

    $$aliens.forEach((alien, i) => {
      if (alien.classList.contains(`alien${i}`)) {
        alienCoordsX[i] = alien.getBoundingClientRect().right;
        alienCoordsY[i] = alien.getBoundingClientRect().bottom;
      }
      // x 좌표: (비행기의 client right 값) >= (외계인의 client right 값) + (외계인 width) &&
      if (airplaneCoordsX >= alienCoordsX[i] - 50) {
        alien.remove();
        // alienCoordsX.splice([i], 1);
        // alienCoordsX.filter((coordX, i) => {
        //   return coordX !== coordX[i];
        // });
        alienCoordsY = [];
      }
      console.log(alienCoordsX, alienCoordsY);
      // console.log(`X:${alienCoordsX}, Y:${alienCoordsY}`);
      // console.log(airplaneCoordsX, airplaneCoordsY, alienCoordsX, alienCoordsY);
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
