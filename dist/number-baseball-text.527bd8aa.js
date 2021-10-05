// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/number-baseball-text.js":[function(require,module,exports) {
var $form = document.querySelector('form'); // html 태그를 선택하여 담은 변수는 $로 구분

var $input = $form.querySelector('input[type=text]');
var $btn = $form.querySelector('input[type=submit]');
var $logs = document.querySelector('#logs'); // 초기 상황
// numbers [1, 2, 3, 4, 5, 6, 7, 8, 9]
// answer []
// --------------------------------------------------------------------------------------------------
// 1. 1 ~ 9 의 숫자 생성

var numbers = []; // numbers 배열 안에 1 ~ 9 의 숫자 생성 -----------------------------------------------

for (var n = 0; n < 9; n++) {
  numbers.push(n + 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9] => 0 베이스이기 떄문에 1 더해주기
} // --------------------------------------------------------------------------------------------------
// 2. 상대편이 제시하는 수로, 1 ~ 9 의 숫자 중 랜덤의 숫자 뽑기 -------------------------------------------------
// answer 부분에서는 numbers 의 숫자중 '몇 번째' 숫자를 골라내는, index 개념으로 뽑음
// 예) 4번째 숫자를 고르고싶다면 index 번호는 그보다 1이 작은 3이여야 한다


var answer = []; // numbers[1 ~ 9] 의 숫자들을 랜덤으로 뽑은 후 answer 배열에 담기 (ex. [3, 1, 4, 6])

for (var _n = 0; _n < 4; _n++) {
  var index = Math.floor(Math.random() * numbers.length); // 0 ~ 현재 index 의 정수 (numbers 숫자중 랜덤으로 하려면 numbers.length 값을 곱해야 함)

  answer.push(numbers[index]); // index 엔 + 1 을 안한 이유는, 순서의 개념이기 때문에, 0이 들어가고 자동으로 1번째부터 시작하는 것이 맞다

  numbers.splice(index, 1); // splice(index 값, 제거할 요소의 개수) : 배열에서 아이템을 제거
  // 해석: 반복문에서 선택된 index 값의 숫자를 하나(1) 제거
  // ex) numbers[1 ~ 9]에서 index 값이 3인 [숫자 4]를 뽑아 answer 배열로 넘어가면, 
  // 다음에 랜덤식별될 숫자가 또 중복되지 않게 하기 위해 numbers 의 해당 [숫자4]를 삭제 
}

console.log(answer);
var tries = []; // [3416, 3948, 1234, 5289 ...] 등의 형태로 값이 들어가는 배열
// --------------------------------------------------------------------------------------------------

function checkInput(input) {
  // 4. 유저가 시도한 숫자인 input의 입력값을 검사 ---------------------------------
  if (input.length !== 4) {
    // (1) 길이는 4가 아닌가?
    return alert('4자리 숫자를 입력해주세요.'); // alert 값은 undefined 로, 중간에 if 문에 걸리면 undefined 값이 반환되는 것과 똑같다
  }

  if (new Set(input).size !== 4) {
    // (2) 중복된 숫자 있는가? (각 숫자리 중복표시)
    // new Set 은 배열과 비슷한 개념으로 중복이 없는 배열, 즉 알아서 중복을 제거해줌
    // ex) 만약 3144 라는 중복숫자가 들게 입력하면, 중복되는 두 개의 숫자4 중 하나를 자동으로 제거해서 314 가 된다.
    // (3144 => 314(실제 new Set 값))
    // 즉 new Set(input).size 값 3이 되고 (.length 의 개념으로, new Set 은 .length 가 아닌 .size 이다)
    // 실제 값인 3 !== 4 로 비교 연산되면서 경고창이 뜨게한다.
    return alert('중복되지 않게 입력해주세요.');
  }

  if (tries.includes(input)) {
    // (3) 이미 시도한 값은 아닌가?
    // 유저가 answer로 숫자를 뽑는 시도를 행할 때마다 tries 에 유저가 적었던 4자리 값들이 저장됨
    // tries 배열에 들어가는 값 중 이미 한번 시도했던 값이 있는 상태에서, 유저가 똑같은 값을 넣으면  
    // 그 값이 이미 포함 되어있다고 알려준다. (4자리 숫자 전체(숫자, 순서) 중복 표시)
    // includes() : 값이 안에 포함되어있으면 true 를 반환, 그렇지 않으면 false 를 반환함
    return alert('이미 시도한 값입니다');
  }

  return true; // 위의 if 문의 관문들을 모두 통과하면 true 값을 반환 해줌 (checkInput(value) === true)
  // alert 값은 undefined 로, 중간에 if 문에 하나라도 걸리면 undefined 값이 반환되는 것과 똑같다 
  // (return undefined, 즉 checkInput(value) === false)
} // --------------------------------------------------------------------------------------------------


function defeated() {
  var message = document.createTextNode("\uD328\uBC30! \uC815\uB2F5\uC740 ".concat(answer.join('')));
  $logs.appendChild(message);
} // --------------------------------------------------------------------------------------------------


var out = 0;
$form.addEventListener('submit', function (event) {
  // 3. 유저가 숫자 맞추기 시도 ------------------------------
  event.preventDefault();
  var value = $input.value; // const toDo = input.value 와 같음

  $input.value = ''; // 숫자 입력, 제출 후 바로 다음 숫자를 입력이 가능하도록 value 값 비우기

  if (!checkInput(value)) {
    // 위의 checkInput(value)에서 모든 if 문 과정 끝에 true 값을 받으면, 해당 함수가 작동됨
    return;
  } // 입력값 문제 없음 (합격)


  if (answer.join('') === value) {
    // join('') : 배열안의 아이템들을 문자열로 바꾸어 나열된 문자형태로 만들어줌 (순서 확인을 위해 문자열로 묶어 나열)
    // ex) [3, 1, 4, 6] => 3146
    $logs.textContent = '홈런!';
    return;
  }

  if (tries.length >= 9) {
    // 10번째 시도에서는 tries.length 가 9이다
    // 9번째까지 온 상태에서 10번째 턴이 틀리면 
    defeated();
    return;
  } // 몇 스트라이크 몇 볼인지 검사
  // (length 의 길이가 같은 두 개의 배열을 비교해 겹치는 배열아이템 선별 알고리즘)
  // 항상 


  var strike = 0;
  var ball = 0; // 예시를 들어가며 코드 풀이 
  // ex) answer = [3, 1, 4, 6] 
  //      value = [1, 3, 4, 7]
  // for (let i = 0; i < answer.length; i++) {
  //   const index = value.indexOf(answer[i])
  //   // 방법 : answer 의 아이템(answer[i])값을 'value 아이템의 인덱스 확인하는 용도'의 메서드에 넣어 확인
  //   // value 와 answer 의 아이템 중 겹치는 것이 있는지 확인 후 변수에 담음
  //   if (index > -1) { // 겹치는 숫자가 있는가? 
  //     // (indexOf() 로 값을 찾을 때, 값이 안들어있으면 -1 을 반환함)
  //     if (index === i) { // 순서, 숫자 모두 같은가? (index: value 인덱스순서, i: answer 인덱스 순서)
  //       strike += 1
  //     } else { // 순서 x 숫자만 같은가?
  //       ball += 1
  //     }
  //   }
  // }
  // for => forEach() 문으로 바꾸기
  // forEach(요소 값, 요소 인덱스, 배열)

  answer.forEach(function (answerItem, i) {
    var index = value.indexOf(answerItem);

    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }); // 아웃 일 때

  if (strike === 0 && ball === 0) {
    out++;
    $logs.append("".concat(value, ": ").concat(out, "\uC544\uC6C3 "), document.createElement('br'));
  } else {
    $logs.append("".concat(value, " : ").concat(strike, " \uC2A4\uD2B8\uB77C\uC774\uD06C / ").concat(ball, " \uBCFC"), document.createElement('br')); // append() 에는 , 를 찍어 여러 개의 요소를 넣을 수 있음
  }

  if (out === 3) {
    defeated();
    return;
  }

  tries.push(value); // 홈런도 안되고, 아웃도 안됐으면 마저 계속 입력값을 넣어 숫자맞추기 진행
}); // appendChild() 와 append() 의 차이
// appendChild() : createTextNode() 추가 후 안에 입력해야함
// append() : Node 추가가 필요 없고, 태그 등 여러 요소를 넣을 수 있음
// while 문으로 해보면?
// const numbers2 = []
// let i = 0;
// while (i < 11) {
//   numbers2.push(i + 1)
//   i++
// }
// console.log(numbers2)

Array(5); // length 가 5 인 (텅 빈) 배열

Array(5).fill(0); // 0 값이 채워짐
// => [0, 0, 0, 0, 0] 
// 빈 배열에 1 ~ 9 까지의 요소를 넣고 싶다면?

Array(9).fill(0).map(function (item, index) {
  return index + 1;
}); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59899" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/number-baseball-text.js"], null)
//# sourceMappingURL=/number-baseball-text.527bd8aa.js.map