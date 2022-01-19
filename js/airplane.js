const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$aliens = document.querySelectorAll('.alien');

let alienPoX = 10;
let smallSpeed;
let mideumSpeed;
let bigSpeed;

class Game {
  constructor() {
    this.alien = [];
    this.airplane = null;
    this.monsterList = [
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
  }

  // 화면 표시 - 아군
  paintAirplane() {
    const $airplane = document.createElement('div');
    const $airplaneHpBox = document.createElement('div');
    const $airplaneHp = document.createElement('div');

    $airplane.className = 'airplane';
    $airplaneHpBox.className = 'airplane-hp-box';
    $airplaneHp.className = 'airplane-hp';

    $airplaneHpBox.appendChild($airplaneHp);
    $airplane.appendChild($airplaneHpBox);
    $game.appendChild($airplane);
  }

  createAlien = () => {
    // 랜덤 숫자로 외계인 수 생성하기 (최대 5마리까지 생성)
    for (let i = 0; i < Math.floor(Math.random() * 6) + 2; i++) {
      // 랜덤으로 외계인 뽑기
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomAlien = this.monsterList[randomIndex];

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
    
    // 외계인 속도 구분
    const $$aliens = document.querySelectorAll('.alien');
    $$aliens.forEach((alien) => {
      if (alien.classList.contains('small-alien')) {
        smallSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
        }, 30);
      } else if (alien.classList.contains('mideum-alien')) {
        mideumSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
        }, 30);
      } else if (alien.classList.contains('big-alien')) {
        bigSpeed = setInterval(() => {
          alien.style.right = `${alienPoX}px`;
          alienPoX += 1;
        }, 30);
      }
    });

    console.log($$aliens);
    console.log(this.alien);
  };

  // 화면 표시 - 외계인
  paintAlien(i) {
    const $alien = document.createElement('div');
    const $alienHpBox = document.createElement('div');
    const $alienHp = document.createElement('div');

    $alien.className = 'alien';
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

    // 외계인 등급, 속도 구분
    // 문제: alien 모두 동일한 속력이 난다.
    // 원인: $alien 이 다 같게 인식되므로 반복문을 돌 때마다 앞서 지정된 setInterval 에서 새로운 setInterval 로 덮어씌워지기 때문에 결국 맨 마지막에 덮어씌워진 setInterval 의 속력으로 모든 alien 이 동일한 속력이 난다.
    // 해결:
    // 반복문으로 모든 alien 들이 $$aliens[] 에 생성된 후, $$aliens 에 forEach() 를 써서 contains 으로 클래스를 구별, speed 를 지정해준다.

    // 외계인 속도 구분
    // if (this.alien[i].name === '쪼렙') {
    //   $alien.classList.add('small-alien');
    //   const $$smallAlien = document.querySelectorAll('.small-alien');
    //   $$smallAlien.forEach((alien) => {
    //     smallSpeed = setInterval(() => {
    //       alien.style.right = `${alienPoX}px`;
    //       alienPoX += 1;
    //     }, 10);
    //   })
    // } else if (this.alien[i].name === '중렙') {
    //   $alien.classList.add('mideum-alien');
    //   const $$mideumAlien = document.querySelectorAll('.mideum-alien');
    //   $$mideumAlien.forEach((alien) => {
    //     mideumSpeed = setInterval(() => {
    //       alien.style.right = `${alienPoX}px`;
    //       alienPoX += 1;
    //     }, 50);
    //   })
    // } else if (this.alien[i].name === '만렙') {
    //   $alien.classList.add('big-alien');
    //   const $$bigAlien = document.querySelectorAll('.big-alien');
    //   $$bigAlien.forEach((alien) => {
    //     bigSpeed = setInterval(() => {
    //       alien.style.right = `${alienPoX}px`;
    //       alienPoX += 1;
    //     }, 80);
    //   })
    // }

    // 외계인 속도 구분
    // const $$aliens = document.querySelectorAll('.alien')
    // $$aliens.forEach((alien, i) => {

    //   if (alien.classList.contains('small-alien')) {
    //     smallSpeed = setInterval(() => {
    //       alien.style.right = `${alienPoX}px`;
    //       alienPoX += 1;
    //     }, 10);
    //   } else if (alien.classList.contains('mideum-alien')) {
    //     mideumSpeed = setInterval(() => {
    //       alien.style.right = `${alienPoX}px`;
    //       alienPoX += 1;
    //     }, 50);
    //   } else if (alien.classList.contains('big-alien')) {
    //     bigSpeed = setInterval(() => {
    //       alien.style.right = `${alienPoX}px`;
    //       alienPoX += 1;
    //     }, 100);
    //   }
    // })
  }
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