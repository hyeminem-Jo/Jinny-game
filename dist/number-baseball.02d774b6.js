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
})({"js/number-baseball.js":[function(require,module,exports) {
var $form = document.querySelector('form');
var $input = document.querySelector('form input[type=text]');
var $logs = document.querySelector('#logs');
var $startBtn = document.querySelector('.start');
var $gameRule = document.querySelector('#gameRule');
var $overLay = document.querySelector('.overlay');
var $popUp = document.querySelector('#popUp');
var $greeting = document.querySelector('.greeting');
var $result = document.querySelector('.result');
var $answer = document.querySelector('.answer');
var $exitBtn = document.querySelector('.btn--exit'); // 1. 1 ~ 9 의 숫자 생성

var numbers = [];

for (var n = 0; n < 9; n++) {
  numbers.push(n + 1);
} // 2. 상대편이 제시하는 수로, 1 ~ 9 의 숫자 중 랜덤의 숫자 뽑기 


var answer = [];

for (var _n = 0; _n < 4; _n++) {
  var index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

console.log(answer); // 4. 유저가 시도한 숫자인 input의 입력값 검사 

var tries = [];

function checkInputValue(input) {
  if (input.length !== 4) {
    alert('4자리 숫자를 입력해주세요.');
    return;
  }

  if (input.includes(0)) {
    alert('1 ~ 9 까지의 숫자만 입력해주세요.');
    return;
  }

  if (new Set(input).size !== 4) {
    alert('숫자가 중복되지 않게 입력해주세요');
    return;
  }

  if (tries.includes(input)) {
    alert('이미 시도한 값입니다.');
    return;
  }

  return true;
}

function fillBillBoard(value, strike, ball, row, out) {
  var $rows = document.createElement('td');
  var $tries = document.createElement('td');
  var $ball = document.createElement('td');
  var $strike = document.createElement('td');
  var $out = document.createElement('td');
  $rows.classList.add('rows');
  $rows.textContent = row;
  $tries.classList.add('tries');
  $tries.textContent = value;
  $ball.classList.add('ball');
  $ball.textContent = ball;
  $strike.classList.add('strike');
  $strike.textContent = strike;
  $out.classList.add('out');
  $out.textContent = out;
  var $row = document.createElement('tr');
  $row.classList.add("row");
  $row.appendChild($rows);
  $row.appendChild($tries);
  $row.appendChild($ball);
  $row.appendChild($strike);
  $row.appendChild($out);
  var $tbody = document.querySelector('tbody');
  $tbody.appendChild($row);
}

function defeated() {
  $popUp.classList.remove('hidden');
  var $emotionLose = document.querySelector('.emotion-lose');
  $emotionLose.classList.remove('hidden');
  $greeting.append("\uC544\uC27D\uB124\uC694", document.createElement('br'));
  $result.prepend("\uD328\uBC30", document.createElement('br'));
  $answer.append("\uC815\uB2F5: ".concat(answer.join()));
  $overLay.classList.remove('hidden');
}

function win() {
  $popUp.classList.remove('hidden');
  var $emotionWin = document.querySelector('.emotion-win');
  $emotionWin.classList.remove('hidden');
  $greeting.append("\uCD95\uD558\uD569\uB2C8\uB2E4", document.createElement('br'));
  $result.prepend("\uD648\uB7F0", document.createElement('br'));
  $answer.append("\uC815\uB2F5: ".concat(answer.join()));
  $overLay.classList.remove('hidden');
}

function hideGameRule() {
  $gameRule.classList.add('hidden');
  $overLay.classList.add('hidden');
} // 3. 5. 유저가 숫자 맞추기 시도


var out = 0;
var row = 1;
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var value = $input.value;
  $input.value = '';
  $input.focus();

  if (!checkInputValue(value)) {
    return;
  } // 입력값 조건 문제 없을 시 실행


  if (answer.join('') === value) {
    win();
    return;
  }

  if (tries.length >= 9) {
    defeated();
    return;
  } // 몇 스트라이크 몇 볼인지 검사


  var strike = 0;
  var ball = 0;
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
    fillBillBoard(value, strike, ball, row, out);
  } else {
    fillBillBoard(value, strike, ball, row);
  }

  if (out === 3) {
    defeated();
    return;
  } // row 가 4개 이상일 때 앞선 row 세개 삭제


  if (row === 6) {
    var $row1 = document.querySelector('tr:nth-child(2)');
    var $row2 = document.querySelector('tr:nth-child(3)');
    var $row3 = document.querySelector('tr:nth-child(4)');
    var $row4 = document.querySelector('tr:nth-child(5)');
    var $row5 = document.querySelector('tr:nth-child(6)');
    $row1.remove();
    $row2.remove();
    $row3.remove();
    $row4.remove();
    $row5.remove();
  }

  tries.push(value);
  row++;
});
$startBtn.addEventListener('click', function () {
  hideGameRule();
  localStorage.setItem('readOrNot', 'read');
}); // gameRule 읽음 여부 확인

var savedRead = localStorage.getItem('readOrNot');

if (savedRead !== null) {
  hideGameRule();
} else {
  $gameRule.classList.remove('hidden');
  $overLay.classList.remove('hidden');
}

$exitBtn.addEventListener('click', function () {
  localStorage.removeItem('readOrNot');
});
$input.focus();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61910" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/number-baseball.js"], null)
//# sourceMappingURL=/number-baseball.02d774b6.js.map