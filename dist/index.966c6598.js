// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2frUp":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d7a7d941cd9697f9ef498476966c6598";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"34QsN":[function(require,module,exports) {
'use strict';var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}();(function(a){function b(){return k.defaultDifficulty?k.defaultDifficulty:i((k.highestDifficulty-k.lowestDifficulty)/2)}function c(){l&&localStorage.setItem('deck-'+m,JSON.stringify(l))}function d(){n=-1,o.correct=0,o.incorrect=0,o.correctCards=[],o.incorrectCards=[],o.minDiff=k.lowestDifficulty,o.maxDiff=k.highestDifficulty}function e(a){return a!==void 0&&'number'==typeof a&&a<=k.highestDifficulty&&a>=k.lowestDifficulty}function f(a){if(!a.length)return null;var b=a.reduce(function(a,b){return{difficulty:parseInt(a.difficulty,10)+parseInt(b.difficulty,10)}}).difficulty;return i(b/a.length)}function g(a){this.name=a||'temp',this.displayName=a,this.cards=[]}function h(a){this.side1=Array.isArray(a.side1)?a.side1:[a.side1],this.side2=Array.isArray(a.side2)?a.side2:[a.side2],this.difficulty=a.difficulty===void 0?b():a.difficulty}var i=Math.round,j={},k={questionSide:'side1',answerSide:'side2',caseSensitive:!1,adjustDifficultyUp:1,adjustDifficultyDown:-1,lowestDifficulty:0,highestDifficulty:10};j.settings=k;var l=!1,m=!1,n=-1,o={correct:0,incorrect:0,correctCards:[],incorrectCards:[],minDiff:!1,maxDiff:!1};j.openDeck=function(a,b,c){if(!a)throw new TypeError('Must specify a deck name to open');null===localStorage.getItem('deck-'+a)&&localStorage.setItem('deck-'+a,JSON.stringify(new g(a))),l=JSON.parse(localStorage.getItem('deck-'+a)),m=a,d(),o.minDiff=e(b)?b:k.lowestDifficulty,o.maxDiff=e(c)?c:k.highestDifficulty},j.addCard=function(a,b,d){if(2>arguments.length||3<arguments.length)throw new TypeError('Cards must have exactly 2 sides');if(d&&!e(d))throw new TypeError('Difficulty must be a number between 0 and 1');l.cards.push(new h({difficulty:d,side1:a,side2:b})),c()},j.addCards=function(){for(var a=arguments.length,b=Array(a),d=0;d<a;d++)b[d]=arguments[d];for(var e=0;e<b.length;e+=1)if(Array.isArray(b[e])&&2<=b[e].length)this.addCard(b[e][0],b[e][1],b[e][2]);else throw l.cards.splice(l.cards.length-e,e+1),new TypeError('Each card array must contain data for exactly 2 card sides');c()},j.editCard=function(a,b,d){if(l.cards[a]===void 0)throw new TypeError('No card at that index');else if(3!==arguments.length)throw new TypeError('Must have three arguments');switch(b){case'side1':l.cards[a].side1=Array.isArray(d)?d:[d];break;case'side2':l.cards[a].side2=Array.isArray(d)?d:[d];break;case'difficulty':if(!e(d))throw new TypeError('Difficulty must be a number from 0 to 1');l.cards[a].difficulty=d;break;default:throw new TypeError('The second argument must be difficulty or a valid side');}c()},j.addToCard=function(a,b,d){if(l.cards[a][b]===void 0)throw new TypeError('Must choose a valid card and side');else if(3!==arguments.length)throw new TypeError('Must have three arguments');l.cards[a][b].push(d),c()},j.deleteCard=function(a){a!==void 0&&l.cards.splice(a,1),c()},j.deleteDeck=function(a){localStorage.removeItem('deck-'+a),a===m&&(l=!1)},j.draw=function(a){return n=a,!!l.cards[a]&&{question:l.cards[a][k.questionSide],difficulty:l.cards[a].difficulty}},j.drawNext=function(a,b){var c=e(a)?a:o.minDiff,d=e(b)?b:o.maxDiff,f=l.cards.length;if(0===f||n>=f-1)return!1;for(var g=0;g<f;g+=1){n+=1;var h=l.cards[n];if(!h)return!1;if(h.difficulty>=c&&h.difficulty<=d)return{question:h[k.questionSide],difficulty:h.difficulty}}return!1},j.checkAnswer=function(a){for(var b,d=!1,f=l.cards[n],g=f[k.answerSide],h=k.caseSensitive?a:a.toLowerCase(),j=0;j<g.length;j+=1)if(b=k.caseSensitive?g[j]:g[j].toLowerCase(),h===b){o.correct+=1,o.correctCards.push(n),d=!0;break}d||(o.incorrect+=1,o.incorrectCards.push(n));var m=f.difficulty;return m+=d?k.adjustDifficultyDown:k.adjustDifficultyUp,f.difficulty=e(m)?m:f.difficulty,c(),{outcome:d,newDifficulty:f.difficulty,answers:g}},j.revealAnswer=function(){return{answers:l.cards[n][k.answerSide],difficulty:l.cards[n].difficulty}},j.shuffle=function(){for(var a=l,b=a.cards,e=b.length-1;0<e;e-=1){var f=Math.floor(Math.random()*(e+1)),g=[b[f],b[e]];b[e]=g[0],b[f]=g[1]}d(),c()},j.flipDeck=function(){var a=k.questionSide;k.questionSide=k.answerSide,k.answerSide=a},j.deckLength=function(){return l.cards.length},j.getSessionInfo=function(){return o.currentIndex=n,o},j.setSessionInfo=function(a){var b=Number.isInteger;if(!b(a.correct)||!b(a.incorrect)||!Array.isArray(a.correctCards)||!Array.isArray(a.incorrectCards)||!b(a.currentIndex))throw new TypeError('Missing or illegal value for sessionInfo');else o.correct=a.correct,o.incorrect=a.incorrect,o.correctCards=a.correctCards,o.incorrectCards=a.incorrectCards,o.minDiff=e(a.minDiff)?a.minDiff:o.minDiff,o.maxDiff=e(a.maxDiff)?a.maxDiff:o.maxDiff,n=a.currentIndex},j.listDecks=function(){for(var a=[],b=localStorage.length,c=0;c<b;c+=1){var d=localStorage.key(c).match(/deck-(.*)/),e={};if(d){var g=JSON.parse(localStorage.getItem(d[0])),h=_slicedToArray(d,2);e.name=h[1],e.displayName=g.displayName,a.push(e),e.averageDifficulty=f(g.cards),e.cardLength=g.cards.length}}return a},j.setDisplayName=function(a){l.displayName=a.toString(),c()},j.getDisplayName=function(){return l.displayName.length?l.displayName:l.name},j.exposeDeck=function(){return l},a.flashcards=j})(window||module||{});

},{}]},["2frUp","34QsN"], "34QsN", "parcelRequiref77e")

//# sourceMappingURL=index.966c6598.js.map
