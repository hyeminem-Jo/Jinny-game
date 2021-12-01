const $startScreen = document.querySelector('#start-screen');
const $startScreenInput = document.querySelector('#start-screen input');
const $startScreenOverlay = document.querySelector('.start-screen-overlay');
const $changeNameBtn = document.querySelector('#change-hero-name');
const $monsterImage = document.getElementById('monster-img');
const $startBtn = document.querySelector('.start');

// 메뉴
// 일반 모드
const $gameMenu = document.querySelector('#game-menu');
const $btnAdventure = document.querySelector('#menu-1');
const $btnRest = document.querySelector('#menu-2');
const $btnEndGame = document.querySelector('#menu-3');
// 전투 모드
const $battleMenu = document.querySelector('#battle-menu');
const $btnAttack = document.querySelector('#battle-1');
const $btnHeal = document.querySelector('#battle-2');
const $btnEscape = document.querySelector('#battle-3');

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
const $monsterXp = document.querySelector('#monster-xp');
const $monsterAtt = document.querySelector('#monster-att');
// 메시지
const $message = document.querySelector('#message');

$startBtn.addEventListener('click', () => {
  $startScreenInput.focus();
});

// (2) Hero 클래스 생성, 입력한 name 값을 인수로 받음
class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10, lev: 3 },
      { name: '슬라임', hp: 25, att: 10, xp: 10, lev: 3 },
      { name: '슬라임', hp: 25, att: 10, xp: 10, lev: 3 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20, lev: 9 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20, lev: 9 },
      { name: '마왕', hp: 150, att: 35, xp: 50, lev: 20 },
    ];
    this.start(name);
  }
  // Game class 내 메서드(1)
  start(name) {
    // button
    // 일반 모드
    $btnAdventure.addEventListener('click', this.btnAdventureClicked);
    $btnRest.addEventListener('click', this.btnRestClicked);
    $btnEndGame.addEventListener('click', this.btnEndGameClicked);
    // 전투 모드
    $btnAttack.addEventListener('click', this.btnAttackClicked);
    $btnHeal.addEventListener('click', this.btnHealClicked);
    $btnEscape.addEventListener('click', this.btnEscapeClicked);

    this.changeScreen('game');

    this.hero = new Hero(this, name);
    this.paintHeroStat();
  }
  // Game class 내 메서드(2)
  changeScreen(screen) {
    if (screen === 'start') {
      $startScreen.style.display = 'flex';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
      $startScreenOverlay.style.display = 'block';
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

  // 일반모드 - 1. 모험하기
  btnAdventureClicked = () => {
    this.changeScreen('battle');
    const randomIndex = Math.floor(Math.random() * this.monsterList.length);
    const randomMonster = this.monsterList[randomIndex];

    this.monster = new Monster(
      this,
      randomMonster.name,
      randomMonster.hp,
      randomMonster.att,
      randomMonster.xp,
      randomMonster.lev
    );
    console.log(this.monster);
    this.paintMonsterStat();
    this.showMessage(
      `"몬스터가 나타났다! [ ${this.monster.name} ]인 것 같다!"`
    );

    // 몬스터 이미지 생성
    $monsterImage.style.display = 'block';
    if (this.monster.name === '슬라임') {
      $monsterImage.style.backgroundImage =
        'url(http://img.stargram.kr/boardImage/stargram/20200407/MC41NjUyNTYwMCAxNTg2MjU2MzA3.jpeg)';
      // $monsterImage.style.backgroundImage = "url('../img/slime.jpeg')";
      $monsterImage.src = 'img/slime.jpeg';
    } else if (this.monster.name === '스켈레톤') {
      // $monsterImage.style.backgroundColor = 'gray';
      $monsterImage.style.backgroundImage =
        'url(https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MDRfMTY0%2FMDAxNTk2NTA1Njg3MDU5.Vk46k94WUeZ5x5h0gAAPXPgdeUak137IcI89VtexpVgg.v7jhFKselicwDLU2CXo83HWqHCskqJu0h76QkP2g4S0g.PNG.bongrye1004%2F%25B8%25DE%25C0%25CC%25C7%25C3%25BD%25BA%25C5%25E4%25B8%25AE_%25B8%25DE%25C0%25CC%25C7%25C3_%25BA%25F1%25BC%25F3_%25BB%25E7%25B3%25C9%25C5%25CD_25.png&type=a340)';
    } else if (this.monster.name === '마왕') {
      // $monsterImage.style.backgroundColor = 'black';
      $monsterImage.style.backgroundImage =
        'url(https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA4MjZfNDYg%2FMDAxNTM1Mjc2OTQxMDA3.55eXWAwoBGudoNFchzVA-R_1TxhthfbVh6GU6uwvKycg.ZKzXcsR-8zyASojruzvUnSWwjgNV4UR8CzXovu1b-tMg.PNG.wishut3281%2F2b9e4c62126e4616741fdecd3c216c627363bb7bd5f70c78b84633802a576091963320a551a5.png&type=sc960_832)';
    }
  };

  // 일반모드 - 2. 휴식하기
  btnRestClicked = () => {
    this.hero.hp = this.hero.maxHp;
    this.paintHeroStat();
    this.showMessage(`"충분한 휴식을 취했다."`);
  };

  // 일반모드 - 3. 게임 종료하기
  btnEndGameClicked = () => {
    this.showMessage('');
    this.quit();
  };

  // 전투모드 - 1. 공격하기
  btnAttackClicked = () => {
    const { hero, monster } = this;
    hero.attack(monster);
    monster.attack(hero);
    // 주인공 or 몬스터가 죽었을 때
    if (hero.hp <= 0) {
      this.showMessage(`"${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요!"`);
      this.quit();
      $monsterImage.style.display = 'none';
    } else if (monster.hp <= 0) {
      this.showMessage(
        `"몬스터 [${monster.name}]을(를) 잡아 경험치를 얻었다!" (+${monster.xp}xp)`
      );
      hero.getXp(monster.xp);
      this.monster = null;
      this.changeScreen('game');
      $monsterImage.style.display = 'none';
    } else if (hero.hp > 0 && monster.hp > 0) {
      this.showMessage(
        `"${hero.name} 은(는) ${hero.att} 의 데미지를 주고, 
          ${monster.name} (으)로부터 ${monster.att} 만큼의 데미지를 받았다!"
          (-${monster.att}hp)`
      );
    }
    this.paintHeroStat();
    this.paintMonsterStat();
  };

  // 전투모드 - 2. 회복하기
  btnHealClicked = () => {
    const { hero, monster } = this;
    // 조건: 회복 20을 해도, maxHp 를 넘어갈 수 없다.
    hero.hp = Math.min(hero.maxHp, hero.hp + 20);
    // 패널티: 회복 하는 도중, 몬스터에게 공격을 한 번 당함
    monster.attack(hero);
    this.showMessage(
      `"체력을 조금 회복했다.. 하지만, 방심한 틈에 공격을 당해버렸다!"`
    );
    this.paintHeroStat();
  };

  // 전투모드 - 3. 도망가기
  btnEscapeClicked = () => {
    this.changeScreen('game');
    this.showMessage(`"부리나케 도망쳤다!"`);
    this.monster = null;
    this.paintMonsterStat();
    $monsterImage.style.display = 'none';
  };

  // Game class 내 메서드(3)
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
    $heroName.textContent = `Hero: ${hero.name}`;
    $heroLevel.textContent = `Level: ${hero.lev}Lv`;
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp} / ${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }
  paintMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterLevel.textContent = '';
      $monsterHp.textContent = '';
      $monsterXp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }
    $monsterName.textContent = `Monster: ${monster.name}`;
    $monsterLevel.textContent = `Level: ${monster.lev}Lv`;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterXp.textContent = `XP: ${monster.xp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }

  // 메시지
  showMessage(text) {
    $message.textContent = text;
  }

  // 게임 종료: 초기화
  quit() {
    this.hero = null;
    this.monster = null;
    this.paintHeroStat();
    this.paintMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    $startScreenInput.focus();
    game = null;
  }
}

// 클래스 공통부분 클래스
class Unit {
  constructor(game, name, hp, att, xp, lev) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
    this.lev = lev;
  }
  attack(target) {
    target.hp -= this.att;
  }
}

// 주인공 객체
class Hero extends Unit {
  constructor(game, name) {
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
      this.xp -= this.lev * 15; // 레벨업 필요에 쓰인 경험치 차감
      this.lev += 1;
      this.maxHp += 5;
      this.hp = this.maxHp; // hp 최대로 다시 채워주기
      this.att += 5;
      this.game.showMessage(`레벨업! 현재 Level: ${this.lev}Lv`);
    }
  }
}

// 몬스터 객체
class Monster extends Unit {
  constructor(game, name, hp, att, xp, lev) {
    super(game, name, hp, att, xp, lev);
  }
}

// (1) 게임 시작, 새 Game 클래스 생성
let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  $message.textContent = ''; // 이전 게임에서 생성된 메시지 삭제
  game = new Game(name);
  $startScreenOverlay.style.display = 'none';
});
