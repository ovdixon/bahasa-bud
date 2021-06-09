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
})({"2PVJC":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "37a3c9ee151bf14179cbed2574db6116";
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

},{}],"XClqM":[function(require,module,exports) {
var StarRating=function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function i(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}var s={classNames:{active:"gl-active",base:"gl-star-rating",selected:"gl-selected"},clearable:!0,maxStars:10,prebuilt:!1,stars:null,tooltip:"Select a Rating"},n=function(e,t,i){e.classList[t?"add":"remove"](i)},a=function(e){var t=document.createElement("span");for(var i in e=e||{})t.setAttribute(i,e[i]);return t},l=function(e,t,i){var s=a(i);return e.parentNode.insertBefore(s,t?e.nextSibling:e),s},r=function e(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];var n={};return i.forEach((function(t){Object.keys(t||{}).forEach((function(s){if(void 0!==i[0][s]){var a=t[s];"Object"!==o(a)||"Object"!==o(n[s])?n[s]=a:n[s]=e(n[s],a)}}))})),n},o=function(e){return{}.toString.call(e).slice(8,-1)},u=function(){function t(i,s){var n,a,l;e(this,t),this.direction=window.getComputedStyle(i,null).getPropertyValue("direction"),this.el=i,this.events={change:this.onChange.bind(this),keydown:this.onKeyDown.bind(this),mousedown:this.onPointerDown.bind(this),mouseleave:this.onPointerLeave.bind(this),mousemove:this.onPointerMove.bind(this),reset:this.onReset.bind(this),touchend:this.onPointerDown.bind(this),touchmove:this.onPointerMove.bind(this)},this.indexActive=null,this.indexSelected=null,this.props=s,this.tick=null,this.ticking=!1,this.values=function(e){var t=[];return[].forEach.call(e.options,(function(e){var i=parseInt(e.value,10)||0;i>0&&t.push({index:e.index,text:e.text,value:i})})),t.sort((function(e,t){return e.value-t.value}))}(i),this.widgetEl=null,this.el.widget&&this.el.widget.destroy(),n=this.values.length,a=1,l=this.props.maxStars,/^\d+$/.test(n)&&a<=n&&n<=l?this.build():this.destroy()}return i(t,[{key:"build",value:function(){this.destroy(),this.buildWidget(),this.selectValue(this.indexSelected=this.selected(),!1),this.handleEvents("add"),this.el.widget=this}},{key:"buildWidget",value:function(){var e,t,i=this;this.props.prebuilt?(e=this.el.parentNode,t=e.querySelector("."+this.props.classNames.base+"--stars")):((e=l(this.el,!1,{class:this.props.classNames.base})).appendChild(this.el),t=l(this.el,!0,{class:this.props.classNames.base+"--stars"}),this.values.forEach((function(e,s){var n=a({"data-index":s,"data-value":e.value});"function"==typeof i.props.stars&&i.props.stars.call(i,n,e,s),[].forEach.call(n.children,(function(e){return e.style.pointerEvents="none"})),t.innerHTML+=n.outerHTML}))),e.dataset.starRating="",e.classList.add(this.props.classNames.base+"--"+this.direction),this.props.tooltip&&t.setAttribute("role","tooltip"),this.widgetEl=t}},{key:"changeIndexTo",value:function(e,t){var i=this;if(this.indexActive!==e||t){if([].forEach.call(this.widgetEl.children,(function(t,s){n(t,s<=e,i.props.classNames.active),n(t,s===i.indexSelected,i.props.classNames.selected)})),"function"==typeof this.props.stars||this.props.prebuilt||(this.widgetEl.classList.remove("s"+10*(this.indexActive+1)),this.widgetEl.classList.add("s"+10*(e+1))),this.props.tooltip){var s=e<0?this.props.tooltip:this.values[e].text;this.widgetEl.setAttribute("aria-label",s)}this.indexActive=e}this.ticking=!1}},{key:"destroy",value:function(){this.indexActive=null,this.indexSelected=this.selected();var e=this.el.parentNode;e.classList.contains(this.props.classNames.base)&&(this.props.prebuilt?(this.widgetEl=e.querySelector("."+this.props.classNames.base+"--stars"),e.classList.remove(this.props.classNames.base+"--"+this.direction),delete e.dataset.starRating):e.parentNode.replaceChild(this.el,e),this.handleEvents("remove")),delete this.el.widget}},{key:"eventListener",value:function(e,t,i,s){var n=this;i.forEach((function(i){return e[t+"EventListener"](i,n.events[i],s||!1)}))}},{key:"handleEvents",value:function(e){var t=this.el.closest("form");t&&"FORM"===t.tagName&&this.eventListener(t,e,["reset"]),this.eventListener(this.el,e,["change"]),"add"===e&&this.el.disabled||(this.eventListener(this.el,e,["keydown"]),this.eventListener(this.widgetEl,e,["mousedown","mouseleave","mousemove","touchend","touchmove"],!1))}},{key:"indexFromEvent",value:function(e){var t,i,s=(null===(t=e.touches)||void 0===t?void 0:t[0])||(null===(i=e.changedTouches)||void 0===i?void 0:i[0])||e,n=document.elementFromPoint(s.clientX,s.clientY);return[].slice.call(n.parentNode.children).indexOf(n)}},{key:"onChange",value:function(){this.changeIndexTo(this.selected(),!0)}},{key:"onKeyDown",value:function(e){var t=e.key.slice(5);if(~["Left","Right"].indexOf(t)){var i="Left"===t?-1:1;"rtl"===this.direction&&(i*=-1);var s=this.values.length-1,n=Math.min(Math.max(this.selected()+i,-1),s);this.selectValue(n,!0)}}},{key:"onPointerDown",value:function(e){e.preventDefault();var t=this.indexFromEvent(e);this.props.clearable&&t===this.indexSelected&&(t=-1),this.selectValue(t,!0)}},{key:"onPointerLeave",value:function(e){var t=this;e.preventDefault(),cancelAnimationFrame(this.tick),requestAnimationFrame((function(){return t.changeIndexTo(t.indexSelected)}))}},{key:"onPointerMove",value:function(e){var t=this;e.preventDefault(),this.ticking||(this.tick=requestAnimationFrame((function(){return t.changeIndexTo(t.indexFromEvent(e))})),this.ticking=!0)}},{key:"onReset",value:function(){var e,t=this.valueIndex(null===(e=this.el.querySelector("[selected]"))||void 0===e?void 0:e.value);this.selectValue(t||-1,!1)}},{key:"selected",value:function(){return this.valueIndex(this.el.value)}},{key:"selectValue",value:function(e,t){var i;this.el.value=(null===(i=this.values[e])||void 0===i?void 0:i.value)||"",this.indexSelected=this.selected(),!1===t?this.changeIndexTo(this.selected(),!0):this.el.dispatchEvent(new Event("change"))}},{key:"valueIndex",value:function(e){return this.values.findIndex((function(t){return t.value===+e}))}}]),t}();return function(){function t(i,s){e(this,t),this.destroy=this.destroy.bind(this),this.rebuild=this.rebuild.bind(this),this.widgets=[],this.buildWidgets(i,s)}return i(t,[{key:"buildWidgets",value:function(e,t){var i=this;this.queryElements(e).forEach((function(e){var n=r(s,t,JSON.parse(e.getAttribute("data-options")));"SELECT"!==e.tagName||e.widget||(!n.prebuilt&&e.parentNode.classList.contains(n.classNames.base)&&i.unwrap(e),i.widgets.push(new u(e,n)))}))}},{key:"destroy",value:function(){this.widgets.forEach((function(e){return e.destroy()}))}},{key:"queryElements",value:function(e){return"HTMLSelectElement"===o(e)?[e]:"NodeList"===o(e)?[].slice.call(e):"String"===o(e)?[].slice.call(document.querySelectorAll(e)):[]}},{key:"rebuild",value:function(){this.widgets.forEach((function(e){return e.build()}))}},{key:"unwrap",value:function(e){var t=e.parentNode,i=t.parentNode;i.insertBefore(e,t),i.removeChild(t)}}]),t}()}();

},{}]},["2PVJC","XClqM"], "XClqM", "parcelRequiref77e")

//# sourceMappingURL=index.74db6116.js.map
