const $startScreen = document.querySelector('#start-screen');
const $startScreenInput = document.querySelector('#start-screen input');
const $changeNameBtn = document.querySelector('#change-hero-name');
// 메뉴
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
// 주인공 스탯
const $heroStat = document.querySelector('#hero-stat');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
// 몬스터 스탯
const $monsterName = document.querySelector('#monster-name');
const $monsterLevel = document.querySelector('#monster-level');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
// 메시지
const $message = document.querySelector('#message');

// (2) Hero 클래스 생성, 입력한 name 값을 인수로 받음
// 게임 내에서 주인공과 몬스터가 생성되고 상호작용하는 등의 실행, 게임 자체도 클래스로 지정
// => Game class: 게임을 총괄하는 class
class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 },
    ];
    this.start(name);
  }
  // Game class 내 메서드(1)
  // 시작하는 함수 동작 코드 구분해 묶음
  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');

    // Hero 클래스와 연결되어 새로운 주인공 객체 생성
    this.hero = new Hero(this, name);
    // ex) Game 클래스를 game1, game2 등과 같이 여러 개로 생성할 떄,
    // hero가 어디 game 에 해당하는지 구분을 해주기 위해 Game 클래스와
    // Hero 클래스 끼리 연결지어준다.
    this.paintHeroStat();
  }
  // Game class 내 메서드(2)
  // 화면 전환 동작 코드 구분해 묶음
  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') {
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }

  // 일반 모드
  // function onGameMenuInput(event) {} (x)
  // 바깥쪽 this(Game) 를 가져오기위해 arrow 함수 이용
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if (input === '1') {
      // 모험
      this.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];

      // 비어있던 monster 변수에, Monster 클래스 바탕의 새로운 객체 생성 후
      // monsterList 중 랜덤으로 뽑힌 몬스터의 데이터값이 들어감
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      console.log(this.monster);
      this.paintMonsterStat();
      this.showMessage(
        `몬스터가 나타났다! [ ${this.monster.name} ]인 것 같다!`
      );
    } else if (input === '2') {
      // 휴식
      this.hero.hp = this.hero.maxHp;
      this.paintHeroStat();
      this.showMessage(`충분한 휴식을 취했다.`);
    } else if (input === '3') {
      // 종료
      this.showMessage('');
      this.quit();
    }
  };
  // 전투 모드
  // function onBattleMenuInput(event) {} (x)
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') {
      // 공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      // 주인공 or 몬스터가 죽었을 때
      if (hero.hp <= 0) {
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요!`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(
          `몬스터 [${monster.name}]을(를) 잡아 경험치를 얻었다! (+${monster.xp}xp)`
        );
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else if (hero.hp > 0 && monster.hp > 0) {
        this.showMessage(
          `${hero.name} 은(는) ${hero.att} 의 데미지를 주고, 
          ${monster.name} (으)로부터 ${monster.att} 만큼의 데미지를 받았다! 
          (-${monster.att}hp)`
        );
      }
      this.paintHeroStat();
      this.paintMonsterStat();
    } else if (input === '2') {
      // 회복
      const { hero, monster } = this;
      // 조건: 회복 20을 해도, maxHp 를 넘어갈 수 없다.
      hero.hp = Math.min(hero.maxHp, hero.hp + 20);
      // 패널티: 회복 하는 도중, 몬스터에게 공격을 한 번 당함 
      monster.attack(hero);
      this.showMessage(`체력을 조금 회복했다!`);
      this.paintHeroStat();
    } else if (input === '3') {
      // 도망
      this.changeScreen('game');
      this.showMessage(`부리나케 도망쳤다!`);
      this.monster = null;
      this.paintMonsterStat();
    }
  };

  // Game class 내 메서드(3)
  // 주인공 스탯 화면상 표현
  paintHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }
    $heroName.textContent = `Name: ${hero.name}`;
    $heroLevel.textContent = `Level: ${hero.lev}Lv`;
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp} / ${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }
  // 몬스터 스탯 화면상 표현
  paintMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }
    $monsterName.textContent = `Monster: ${monster.name}`;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }

  // 메시지
  showMessage(text) {
    $message.textContent = text;
  }

  // 게임 종료: 초기화
  // 1. let 으로 설정되었던 변수들 null 로 초기화
  // 2. 초기화된 데이터값들 화면상으로 표시
  // 3. Game 클래스의 메서드 start() 로 인해 실행된 이벤트들 초기화
  quit() {
    this.hero = null;
    this.monster = null;
    this.paintHeroStat();
    this.paintMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null; // Game 클래스 밖에서 설정된 변수이므로 this(x)
  }
}

// 클래스 공통부분 클래스
class Unit {
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    target.hp -= this.att;
  }
}

// 주인공 객체
// Unit: Hero 의 부모클래스
class Hero extends Unit {
  constructor(game, name) {
    // super: 부모클래스(Unit)의 생성자 함수(constructor)호출
    super(game, name, 100, 10, 0);
    this.lev = 1; // level 은 안겹침 (공통부분이 x)
  }

  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
  getXp(xp) {
    this.xp += xp;
    // 경험치를 다 채울 때
    if (this.xp >= this.lev * 15) {
      // this.xp = 0 이라 적으면 (x)
      // 경험치가 반드시 조건에 딱떨어지게 쌓이지 않기 때문이다.
      // ex) 만약 레벨업 시 필요한 경험치가 15인데 20이 쌓인 경우
      // 레벨업 후 차감되고 남은 경험치가 0이 아닌 5이다.
      this.xp -= this.lev * 15; // 레벨업 필요에 쓰인 경험치 차감
      this.lev += 1;
      this.maxHp += 5;
      this.hp = this.maxHp; // hp 최대로 다시 채워주기
      this.att += 5;
      // Game 클래스의 메서드 가져다 쓰기
      this.game.showMessage(`레벨업! 현재 Level: ${this.lev}Lv`);
    }
  }
}

// 몬스터 객체
class Monster extends Unit {
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  }
}

// (1) 게임 시작, 새 Game 클래스 생성
let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  $message.textContent = ''; // 이전 게임에서 생성된 메시지 삭제
  game = new Game(name);
});
