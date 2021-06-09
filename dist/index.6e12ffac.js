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
})({"1AAOn":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "c05e7e006de3318d8808a8376e12ffac";
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

},{}],"5w8eA":[function(require,module,exports) {

/* myStarCollection.push("className"); */
var mouseClickedStarRating=false;
function rateSystem(className, obj, fnc=function(){}, fncMove=function(){}, fncLeave=function(){}){
    /* window.myStarCollection.push(className); */
for(let i=0; i<obj.length; i++){

    document.getElementsByClassName(className)[i].style.width = (obj[i].rating*obj[i].starSize) + "px";
    document.getElementsByClassName(className)[i].style.height = obj[i].starSize + "px";
    document.getElementsByClassName(className)[i].style.backgroundSize=obj[i].starSize + "px";
    document.getElementsByClassName(className)[i].style.backgroundImage = "url('" + obj[i].starImage + "')" ;
    document.getElementsByClassName(className)[i].style.backgroundRepeat="repeat-x";
    document.getElementsByClassName(className)[i].parentElement.style.width = (parseInt(obj[i].starSize)*parseInt(obj[i].maxRating) ) + "px";
    document.getElementsByClassName(className)[i].parentElement.style.maxWidth = (parseInt(obj[i].starSize)*parseInt(obj[i].maxRating) ) + "px";
    document.getElementsByClassName(className)[i].parentElement.style.height = parseInt(obj[i].starSize)+"px";

    if(obj[i].minRating){
        document.getElementsByClassName(className)[i].style.minWidth = (obj[i].minRating*obj[i].starSize) + "px";
    }else{
        document.getElementsByClassName(className)[i].style.minWidth = "0px";
    }

    if(obj[i].backgroundStarImage){
        document.getElementsByClassName(className)[i].parentElement.style.backgroundSize=obj[i].starSize + "px";
        document.getElementsByClassName(className)[i].parentElement.style.backgroundRepeat="repeat-x";
        document.getElementsByClassName(className)[i].parentElement.style.backgroundImage = "url('" + obj[i].backgroundStarImage + "')" ;
    }

    if(obj[i].emptyStarImage){
    document.getElementsByClassName(className)[i].innerHTML = '<div class="emptyStarRating"></div>';
    document.getElementsByClassName(className)[i].getElementsByClassName("emptyStarRating")[0].style.backgroundSize = parseInt(obj[i].starSize) + "px";
    document.getElementsByClassName(className)[i].getElementsByClassName("emptyStarRating")[0].style.backgroundImage = "url('" + obj[i].emptyStarImage + "')" ;
    document.getElementsByClassName(className)[i].getElementsByClassName("emptyStarRating")[0].style.backgroundRepeat="repeat-x";
    document.getElementsByClassName(className)[i].getElementsByClassName("emptyStarRating")[0].style.width = (parseInt(obj[i].starSize)*parseInt(obj[i].maxRating) ) + "px";
    document.getElementsByClassName(className)[i].getElementsByClassName("emptyStarRating")[0].style.height = parseInt(obj[i].starSize)+"px";
    }

    document.getElementsByClassName(className)[i].style.maxWidth = obj[i].starSize*obj[i].maxRating + "px";
    /* document.getElementsByClassName(className)[i].title = obj[i].rating; */
    document.getElementsByClassName(className)[i].dataset.rating = obj[i].rating;
    document.getElementsByClassName(className)[i].dataset.step = obj[i].step;
    if(obj[i].readOnly==="yes"){
        document.getElementsByClassName(className)[i].classList.add("readOnlyStarRating");
    }
/*     document.getElementsByClassName(className)[i].innerHTML=obj[i].rating; */
document.getElementsByClassName(className)[i].parentElement.addEventListener("mousemove", function(){ zmouseMoveStarRating(fncMove) }, false);
document.getElementsByClassName(className)[i].parentElement.addEventListener("click", function(){ zmouseMoveStarRatingClick(fnc) }, false);
document.getElementsByClassName(className)[i].parentElement.addEventListener("mouseleave", function(){ zmouseMoveStarRatingLeave(fncLeave) }, false);

document.getElementsByClassName(className)[i].parentElement.addEventListener("touchstart", function(){ zmouseMoveStarRatingTouch(fncMove) }, false);
document.getElementsByClassName(className)[i].parentElement.addEventListener("touchend", function(){zmouseMoveStarRatingLeaveTouch(fnc, fncLeave)}, false);
document.getElementsByClassName(className)[i].parentElement.addEventListener("touchmove", function(){zmouseMoveStarRatingTouchMove(fncMove)}, false);
}

}

function zmouseMoveStarRating(fncMove){
    if(mouseClickedStarRating==false){
        if(event.target.classList.contains("starRatingContainer")){
            let myDiv = event.target.getElementsByTagName("DIV")[0];
            let realStep = parseFloat(myDiv.dataset.step)*parseInt(myDiv.style.backgroundSize);
            realStep=1/realStep;
            /* console.log(realStep); */

            if(!myDiv.classList.contains("readOnlyStarRating")){
                if((event.clientX-myDiv.getBoundingClientRect().left)<=parseInt(myDiv.style.maxWidth)){
                    if((event.clientX-myDiv.getBoundingClientRect().left)>=parseInt(myDiv.style.minWidth)){
                    myDiv.style.width=(Math.round((event.clientX-myDiv.getBoundingClientRect().left)*realStep)/realStep)+"px";
                    }else{
                    myDiv.style.width=(Math.round((parseInt(myDiv.style.minWidth))*realStep)/realStep)+"px";    
                    }
                }else{
                /* myDiv.style.width= myDiv.style.maxWidth;  */ 
                }
         /* myDiv.title = (parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2); */
            }
            fncMove((parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2), myDiv, false);

    }else if(event.target.classList.contains("emptyStarRating")){
     
        if(!event.target.parentElement.classList.contains("readOnlyStarRating")){
            if((event.clientX-event.target.parentElement.getBoundingClientRect().left)<=parseInt(event.target.parentElement.style.maxWidth)){
                
                let realStep = parseFloat(event.target.parentElement.dataset.step)*parseInt(event.target.parentElement.style.backgroundSize);
                realStep=1/realStep;
                /* console.log(realStep); */
                if((event.clientX-event.target.parentElement.getBoundingClientRect().left)>=parseInt(event.target.parentElement.style.minWidth)){
                event.target.parentElement.style.width=(Math.round((event.clientX-event.target.parentElement.getBoundingClientRect().left)*realStep)/realStep)+"px";
                }else{
                event.target.parentElement.style.width=(Math.round((parseInt(event.target.parentElement.style.minWidth))*realStep)/realStep)+"px";    
                }
            }else{
            /* event.target.style.width =  event.target.style.maxWidth; */
            }
            /* event.target.title = (parseInt(event.target.parentElement.style.width)/parseInt(event.target.parentElement.style.backgroundSize)).toFixed(2); */
        }
        fncMove((parseInt(event.target.parentElement.style.width)/parseInt(event.target.parentElement.style.backgroundSize)).toFixed(2), event.target.parentElement, false);

        }else{

         if(!event.target.classList.contains("readOnlyStarRating")){
            if((event.clientX-event.target.getBoundingClientRect().left)<=parseInt(event.target.style.maxWidth)){
                
                let realStep = parseFloat(event.target.dataset.step)*parseInt(event.target.style.backgroundSize);
                realStep=1/realStep;
                /* console.log(realStep); */
                if((event.clientX-event.target.getBoundingClientRect().left)>=parseInt(event.target.style.minWidth)){
                event.target.style.width=(Math.round((event.clientX-event.target.getBoundingClientRect().left)*realStep)/realStep)+"px";
                }else{
                event.target.style.width=(Math.round((parseInt(event.target.style.minWidth))*realStep)/realStep)+"px";    
                }
            }else{
            /* event.target.style.width =  event.target.style.maxWidth; */
            }
            /* event.target.title = (parseInt(event.target.style.width)/parseInt(event.target.style.backgroundSize)).toFixed(2); */
        }
        fncMove((parseInt(event.target.style.width)/parseInt(event.target.style.backgroundSize)).toFixed(2), event.target, false);

            }
        }
    }
    


    function zmouseMoveStarRatingClick(fnc){
        if(event.target.classList.contains("starRatingContainer")){
            let myDiv = event.target.getElementsByTagName("DIV")[0];
            if(!myDiv.classList.contains("readOnlyStarRating")){
            mouseClickedStarRating=true;
           myDiv.dataset.rating=(parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2);
            fnc(myDiv.dataset.rating, myDiv, false);
            }
        }else if(event.target.classList.contains("emptyStarRating")){
            if(!event.target.parentElement.classList.contains("readOnlyStarRating")){
                mouseClickedStarRating=true;
                event.target.parentElement.dataset.rating=(parseInt(event.target.parentElement.style.width)/parseInt(event.target.parentElement.style.backgroundSize)).toFixed(2);
                fnc(event.target.parentElement.dataset.rating, event.target.parentElement, false);
                }
        }else{
            if(!event.target.classList.contains("readOnlyStarRating")){
                mouseClickedStarRating=true;
                event.target.dataset.rating=(parseInt(event.target.style.width)/parseInt(event.target.style.backgroundSize)).toFixed(2);
                fnc(event.target.dataset.rating, event.target, false);
                }
        }
}


function zmouseMoveStarRatingLeave(fncLeave){
    if(!event.target.classList.contains("starRatingContainer")){
     /*    if(!event.target.classList.contains("readOnlyStarRating")){
    event.target.style.width=event.target.dataset.rating*parseInt(event.target.style.backgroundSize)+"px";
    mouseClickedStarRating=false;
        } */
    }else{
        let myDiv = event.target.getElementsByTagName("DIV")[0];
            if(!myDiv.classList.contains("readOnlyStarRating")){
                myDiv.style.width=myDiv.dataset.rating*parseInt(myDiv.style.backgroundSize)+"px";
                mouseClickedStarRating=false;
            }
            fncLeave((parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2), myDiv, false);
        }
    }
    

    function zmouseMoveStarRatingTouch(fncMove){
        try{
       event.preventDefault();
        }catch(err){

        }

        if(event.target.classList.contains("starRatingContainer")){

            let myDiv = event.target.getElementsByTagName("DIV")[0];
            fncMove((parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2), myDiv, true);

        }else if(event.target.classList.contains("emptyStarRating")){
           
            fncMove((parseInt(event.target.parentElement.style.width)/parseInt(event.target.parentElement.style.backgroundSize)).toFixed(2), event.target.parentElement, true);

        }else{
            fncMove((parseInt(event.target.style.width)/parseInt(event.target.style.backgroundSize)).toFixed(2), event.target, true);
        }

        }

        function zmouseMoveStarRatingLeaveTouch(fnc, fncLeave){
            
            if(event.target.classList.contains("starRatingContainer")){
                let myDiv = event.target.getElementsByTagName("DIV")[0];
                if(!myDiv.classList.contains("readOnlyStarRating")){
                    if((event.changedTouches[0].clientX-myDiv.getBoundingClientRect().left)<=parseInt(myDiv.style.maxWidth)){
                        let realStep = parseFloat(myDiv.dataset.step)*parseInt(myDiv.style.backgroundSize);
                        realStep=1/realStep;
                if((event.changedTouches[0].clientX-myDiv.getBoundingClientRect().left)>=parseInt(myDiv.style.minWidth)){
                myDiv.style.width=(Math.round((parseInt(event.changedTouches[0].clientX)-parseInt(myDiv.getBoundingClientRect().left))*realStep)/realStep)+"px";
                }else{
                myDiv.style.width=(Math.round((parseInt(myDiv.style.minWidth)*realStep))/realStep)+"px";   
                }
                    }else{
                        myDiv.style.width=myDiv.style.maxWidth;      
                    }
                myDiv.dataset.rating=(parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2);
                fnc(myDiv.dataset.rating, myDiv, true);
                }
                fncLeave(myDiv.dataset.rating, myDiv, true);
            }else if(event.target.classList.contains("emptyStarRating")){
                if(!event.target.parentElement.classList.contains("readOnlyStarRating")){
                    if((event.changedTouches[0].clientX-event.target.parentElement.getBoundingClientRect().left)<=parseInt(event.target.parentElement.style.maxWidth)){
                    
                        let realStep = parseFloat(event.target.parentElement.dataset.step)*parseInt(event.target.parentElement.style.backgroundSize);
                        realStep=1/realStep;
                    if((event.changedTouches[0].clientX-event.target.parentElement.getBoundingClientRect().left)>=parseInt(event.target.parentElement.style.minWidth)){
                    event.target.parentElement.style.width=(Math.round((parseInt(event.changedTouches[0].clientX)-parseInt(event.target.parentElement.getBoundingClientRect().left))*realStep)/realStep)+"px";
                    }else{
                    event.target.parentElement.style.width=(Math.round((parseInt(event.target.parentElement.style.minWidth))*realStep)/realStep)+"px";    
                    }
                
                    }else{
                        event.target.parentElement.style.width=event.target.parentElement.style.maxWidth;    
                    }
                    event.target.parentElement.dataset.rating=(parseInt(event.target.parentElement.style.width)/parseInt(event.target.parentElement.style.backgroundSize)).toFixed(2);
                    fnc(event.target.parentElement.dataset.rating, event.target.parentElement, true);
                    }
                    fncLeave(event.target.parentElement.dataset.rating, event.target.parentElement, true);

            }else{

                if(!event.target.classList.contains("readOnlyStarRating")){
                    if((event.changedTouches[0].clientX-event.target.getBoundingClientRect().left)<=parseInt(event.target.style.maxWidth)){

                        let realStep = parseFloat(event.target.dataset.step)*parseInt(event.target.style.backgroundSize);
                        realStep=1/realStep;
                    if((event.changedTouches[0].clientX-event.target.getBoundingClientRect().left)>=parseInt(event.target.style.minWidth)){
                    event.target.style.width=(Math.round((parseInt(event.changedTouches[0].clientX)-parseInt(event.target.getBoundingClientRect().left))*realStep)/realStep)+"px";
                    }else{
                    event.target.style.width=(Math.round((parseInt(event.target.style.minWidth))*realStep)/realStep)+"px";    
                    }
                
                    }else{
                        event.target.style.width=event.target.style.maxWidth;    
                    }
                    event.target.dataset.rating=(parseInt(event.target.style.width)/parseInt(event.target.style.backgroundSize)).toFixed(2);
                    fnc(event.target.dataset.rating, event.target, true);
                    }
                    fncLeave(event.target.dataset.rating, event.target, true)

            }
        }

        function zmouseMoveStarRatingTouchMove(fncMove){
           
            if(event.target.classList.contains("starRatingContainer")){

                let myDiv = event.target.getElementsByTagName("DIV")[0];
                if(!myDiv.classList.contains("readOnlyStarRating")){
                    if((event.changedTouches[0].clientX-myDiv.getBoundingClientRect().left)<=parseInt(myDiv.style.maxWidth)){
                        let realStep = parseFloat(myDiv.dataset.step)*parseInt(myDiv.style.backgroundSize);
                        realStep=1/realStep;
                myDiv.style.width=(Math.round((parseInt(event.changedTouches[0].clientX)-parseInt(myDiv.getBoundingClientRect().left))*realStep)/realStep)+"px";
                    }else{
                        myDiv.style.width=myDiv.style.maxWidth;      
                    }

                }
                fncMove((parseInt(myDiv.style.width)/parseInt(myDiv.style.backgroundSize)).toFixed(2), myDiv, true);

            }else if(event.target.classList.contains("emptyStarRating")){
                if(!event.target.parentElement.classList.contains("readOnlyStarRating")){
                    if((event.changedTouches[0].clientX-event.target.parentElement.getBoundingClientRect().left)<=parseInt(event.target.parentElement.style.maxWidth)){
                        let realStep = parseFloat(event.target.parentElement.dataset.step)*parseInt(event.target.parentElement.style.backgroundSize);
                        realStep=1/realStep;
                        event.target.parentElement.style.width=(Math.round((parseInt(event.changedTouches[0].clientX)-parseInt(event.target.parentElement.getBoundingClientRect().left))*realStep)/realStep)+"px";
                    }else{
                        event.target.parentElement.style.width=event.target.parentElement.style.maxWidth;    
                    }
                   
                    }
                    fncMove((parseInt(event.target.parentElement.style.width)/parseInt(event.target.parentElement.style.backgroundSize)).toFixed(2), event.target.parentElement, true);
            }else{

                if(!event.target.classList.contains("readOnlyStarRating")){
                    if((event.changedTouches[0].clientX-event.target.getBoundingClientRect().left)<=parseInt(event.target.style.maxWidth)){
                        let realStep = parseFloat(event.target.dataset.step)*parseInt(event.target.style.backgroundSize);
                        realStep=1/realStep;
                    event.target.style.width=(Math.round((parseInt(event.changedTouches[0].clientX)-parseInt(event.target.getBoundingClientRect().left))*realStep)/realStep)+"px";
                    }else{
                        event.target.style.width=event.target.style.maxWidth;    
                    }
                   
                    }
                    fncMove((parseInt(event.target.style.width)/parseInt(event.target.style.backgroundSize)).toFixed(2), event.target, true);

            }

             }
},{}]},["1AAOn","5w8eA"], "5w8eA", "parcelRequiref77e")

//# sourceMappingURL=index.6e12ffac.js.map
