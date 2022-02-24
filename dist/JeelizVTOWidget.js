/**
 * Jeeliz Glasses VTO Widget - https://github.com/jeeliz/jeelizGlassesVTOWidget
 *
 * Copyright 2020 WebAR.rocks ( https://webar.rocks )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function (na, pa) {
  return Object.prototype.hasOwnProperty.call(na, pa);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (na, pa, ya) {
        if (na == Array.prototype || na == Object.prototype) return na;
        na[pa] = ya.value;
        return na;
      };
$jscomp.getGlobal = function (na) {
  na = [
    "object" == typeof globalThis && globalThis,
    na,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var pa = 0; pa < na.length; ++pa) {
    var ya = na[pa];
    if (ya && ya.Math == Math) return ya;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (na, pa) {
  var ya = $jscomp.propertyToPolyfillSymbol[pa];
  if (null == ya) return na[pa];
  ya = na[ya];
  return void 0 !== ya ? ya : na[pa];
};
$jscomp.polyfill = function (na, pa, ya, Ja) {
  pa &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(na, pa, ya, Ja)
      : $jscomp.polyfillUnisolated(na, pa, ya, Ja));
};
$jscomp.polyfillUnisolated = function (na, pa, ya, Ja) {
  ya = $jscomp.global;
  na = na.split(".");
  for (Ja = 0; Ja < na.length - 1; Ja++) {
    var ua = na[Ja];
    if (!(ua in ya)) return;
    ya = ya[ua];
  }
  na = na[na.length - 1];
  Ja = ya[na];
  pa = pa(Ja);
  pa != Ja &&
    null != pa &&
    $jscomp.defineProperty(ya, na, {
      configurable: !0,
      writable: !0,
      value: pa,
    });
};
$jscomp.polyfillIsolated = function (na, pa, ya, Ja) {
  var ua = na.split(".");
  na = 1 === ua.length;
  Ja = ua[0];
  Ja = !na && Ja in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var zb = 0; zb < ua.length - 1; zb++) {
    var ma = ua[zb];
    if (!(ma in Ja)) return;
    Ja = Ja[ma];
  }
  ua = ua[ua.length - 1];
  ya = $jscomp.IS_SYMBOL_NATIVE && "es6" === ya ? Ja[ua] : null;
  pa = pa(ya);
  null != pa &&
    (na
      ? $jscomp.defineProperty($jscomp.polyfills, ua, {
          configurable: !0,
          writable: !0,
          value: pa,
        })
      : pa !== ya &&
        (($jscomp.propertyToPolyfillSymbol[ua] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(ua)
          : $jscomp.POLYFILL_PREFIX + ua),
        (ua = $jscomp.propertyToPolyfillSymbol[ua]),
        $jscomp.defineProperty(Ja, ua, {
          configurable: !0,
          writable: !0,
          value: pa,
        })));
};
$jscomp.assign =
  $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign
    ? Object.assign
    : function (na, pa) {
        for (var ya = 1; ya < arguments.length; ya++) {
          var Ja = arguments[ya];
          if (Ja) for (var ua in Ja) $jscomp.owns(Ja, ua) && (na[ua] = Ja[ua]);
        }
        return na;
      };
$jscomp.polyfill(
  "Object.assign",
  function (na) {
    return na || $jscomp.assign;
  },
  "es6",
  "es3"
);
$jscomp.arrayIteratorImpl = function (na) {
  var pa = 0;
  return function () {
    return pa < na.length ? { done: !1, value: na[pa++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (na) {
  return { next: $jscomp.arrayIteratorImpl(na) };
};
$jscomp.makeIterator = function (na) {
  var pa =
    "undefined" != typeof Symbol && Symbol.iterator && na[Symbol.iterator];
  return pa ? pa.call(na) : $jscomp.arrayIterator(na);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill(
  "Promise",
  function (na) {
    function pa() {
      this.batch_ = null;
    }
    function ya(ma) {
      return ma instanceof ua
        ? ma
        : new ua(function (za, Ka) {
            za(ma);
          });
    }
    if (na && !$jscomp.FORCE_POLYFILL_PROMISE) return na;
    pa.prototype.asyncExecute = function (ma) {
      if (null == this.batch_) {
        this.batch_ = [];
        var za = this;
        this.asyncExecuteFunction(function () {
          za.executeBatch_();
        });
      }
      this.batch_.push(ma);
    };
    var Ja = $jscomp.global.setTimeout;
    pa.prototype.asyncExecuteFunction = function (ma) {
      Ja(ma, 0);
    };
    pa.prototype.executeBatch_ = function () {
      for (; this.batch_ && this.batch_.length; ) {
        var ma = this.batch_;
        this.batch_ = [];
        for (var za = 0; za < ma.length; ++za) {
          var Ka = ma[za];
          ma[za] = null;
          try {
            Ka();
          } catch (Ua) {
            this.asyncThrow_(Ua);
          }
        }
      }
      this.batch_ = null;
    };
    pa.prototype.asyncThrow_ = function (ma) {
      this.asyncExecuteFunction(function () {
        throw ma;
      });
    };
    var ua = function (ma) {
      this.state_ = 0;
      this.result_ = void 0;
      this.onSettledCallbacks_ = [];
      var za = this.createResolveAndReject_();
      try {
        ma(za.resolve, za.reject);
      } catch (Ka) {
        za.reject(Ka);
      }
    };
    ua.prototype.createResolveAndReject_ = function () {
      function ma(Ua) {
        return function (db) {
          Ka || ((Ka = !0), Ua.call(za, db));
        };
      }
      var za = this,
        Ka = !1;
      return { resolve: ma(this.resolveTo_), reject: ma(this.reject_) };
    };
    ua.prototype.resolveTo_ = function (ma) {
      if (ma === this)
        this.reject_(new TypeError("A Promise cannot resolve to itself"));
      else if (ma instanceof ua) this.settleSameAsPromise_(ma);
      else {
        a: switch (typeof ma) {
          case "object":
            var za = null != ma;
            break a;
          case "function":
            za = !0;
            break a;
          default:
            za = !1;
        }
        za ? this.resolveToNonPromiseObj_(ma) : this.fulfill_(ma);
      }
    };
    ua.prototype.resolveToNonPromiseObj_ = function (ma) {
      var za = void 0;
      try {
        za = ma.then;
      } catch (Ka) {
        this.reject_(Ka);
        return;
      }
      "function" == typeof za
        ? this.settleSameAsThenable_(za, ma)
        : this.fulfill_(ma);
    };
    ua.prototype.reject_ = function (ma) {
      this.settle_(2, ma);
    };
    ua.prototype.fulfill_ = function (ma) {
      this.settle_(1, ma);
    };
    ua.prototype.settle_ = function (ma, za) {
      if (0 != this.state_)
        throw Error(
          "Cannot settle(" +
            ma +
            ", " +
            za +
            "): Promise already settled in state" +
            this.state_
        );
      this.state_ = ma;
      this.result_ = za;
      this.executeOnSettledCallbacks_();
    };
    ua.prototype.executeOnSettledCallbacks_ = function () {
      if (null != this.onSettledCallbacks_) {
        for (var ma = 0; ma < this.onSettledCallbacks_.length; ++ma)
          zb.asyncExecute(this.onSettledCallbacks_[ma]);
        this.onSettledCallbacks_ = null;
      }
    };
    var zb = new pa();
    ua.prototype.settleSameAsPromise_ = function (ma) {
      var za = this.createResolveAndReject_();
      ma.callWhenSettled_(za.resolve, za.reject);
    };
    ua.prototype.settleSameAsThenable_ = function (ma, za) {
      var Ka = this.createResolveAndReject_();
      try {
        ma.call(za, Ka.resolve, Ka.reject);
      } catch (Ua) {
        Ka.reject(Ua);
      }
    };
    ua.prototype.then = function (ma, za) {
      function Ka(lb, ub) {
        return "function" == typeof lb
          ? function (Tb) {
              try {
                Ua(lb(Tb));
              } catch (Jb) {
                db(Jb);
              }
            }
          : ub;
      }
      var Ua,
        db,
        Gb = new ua(function (lb, ub) {
          Ua = lb;
          db = ub;
        });
      this.callWhenSettled_(Ka(ma, Ua), Ka(za, db));
      return Gb;
    };
    ua.prototype.catch = function (ma) {
      return this.then(void 0, ma);
    };
    ua.prototype.callWhenSettled_ = function (ma, za) {
      function Ka() {
        switch (Ua.state_) {
          case 1:
            ma(Ua.result_);
            break;
          case 2:
            za(Ua.result_);
            break;
          default:
            throw Error("Unexpected state: " + Ua.state_);
        }
      }
      var Ua = this;
      null == this.onSettledCallbacks_
        ? zb.asyncExecute(Ka)
        : this.onSettledCallbacks_.push(Ka);
    };
    ua.resolve = ya;
    ua.reject = function (ma) {
      return new ua(function (za, Ka) {
        Ka(ma);
      });
    };
    ua.race = function (ma) {
      return new ua(function (za, Ka) {
        for (
          var Ua = $jscomp.makeIterator(ma), db = Ua.next();
          !db.done;
          db = Ua.next()
        )
          ya(db.value).callWhenSettled_(za, Ka);
      });
    };
    ua.all = function (ma) {
      var za = $jscomp.makeIterator(ma),
        Ka = za.next();
      return Ka.done
        ? ya([])
        : new ua(function (Ua, db) {
            function Gb(Tb) {
              return function (Jb) {
                lb[Tb] = Jb;
                ub--;
                0 == ub && Ua(lb);
              };
            }
            var lb = [],
              ub = 0;
            do
              lb.push(void 0),
                ub++,
                ya(Ka.value).callWhenSettled_(Gb(lb.length - 1), db),
                (Ka = za.next());
            while (!Ka.done);
          });
    };
    return ua;
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Math.log2",
  function (na) {
    return na
      ? na
      : function (pa) {
          return Math.log(pa) / Math.LN2;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Promise.prototype.finally",
  function (na) {
    return na
      ? na
      : function (pa) {
          return this.then(
            function (ya) {
              return Promise.resolve(pa()).then(function () {
                return ya;
              });
            },
            function (ya) {
              return Promise.resolve(pa()).then(function () {
                throw ya;
              });
            }
          );
        };
  },
  "es9",
  "es3"
);
$jscomp.polyfill(
  "Math.sign",
  function (na) {
    return na
      ? na
      : function (pa) {
          pa = Number(pa);
          return 0 === pa || isNaN(pa) ? pa : 0 < pa ? 1 : -1;
        };
  },
  "es6",
  "es3"
);
var JeelizVTOWidget = (function () {
  function na() {
    Pa.mode = eb.realtime;
    Pa.isRT = !0;
    qa.adjust = document.getElementById("JeelizVTOWidgetAdjust");
    if (qa.adjust) {
      qa.adjustNotice = document.getElementById("JeelizVTOWidgetAdjustNotice");
      qa.adjustExit = document.getElementById("JeelizVTOWidgetAdjustExit");
      qa.changeModelContainer = document.getElementById(
        "JeelizVTOWidgetChangeModelContainer"
      );
      qa.buttonResizeCanvas = document.getElementById("buttonResizeCanvas");
      var W = qa.adjust;
      W && W.addEventListener("click", lb, !1);
      (W = qa.adjustExit) && W.addEventListener("click", ub, !1);
      [qa.adjust, qa.changeModelContainer, qa.buttonResizeCanvas].forEach(ya);
    }
    Kb.enabled && Ra.do_instantDetection(Kb.interval, Kb.callback);
    Ub && (Ub(!0), (Ub = null));
  }
  function pa() {
    var W = document.createElement("style");
    W.setAttribute("type", "text/css");
    W.innerHTML =
      "._jeelizVTOForceHide { display: none!important }._jeelizVTOForceShow { display: revert!important }";
    var wa = document.getElementsByTagName("head");
    1 <= wa.length ? wa[0].appendChild(W) : document.body.appendChild(W);
  }
  function ya(W) {
    W &&
      (W.classList.remove("_jeelizVTOForceHide"),
      "none" === window.getComputedStyle(W).display &&
        W.classList.add("_jeelizVTOForceShow"));
  }
  function Ja(W) {
    W &&
      (W.classList.add("_jeelizVTOForceHide"),
      W.classList.remove("_jeelizVTOForceShow"));
  }
  function ua(W, wa) {
    if (W) for (var La in wa) W.style[La] = wa[La];
  }
  function zb(W) {
    if (W) return W.clientWidth;
  }
  function ma(W) {
    if (W) return W.clientHeight;
  }
  function za(W) {
    return new Promise(function (wa, La) {
      var Fa = new XMLHttpRequest();
      Fa.open("GET", W, !0);
      Fa.onreadystatechange = function () {
        if (4 === Fa.readyState)
          if (200 === Fa.status || 0 === Fa.status)
            try {
              var gb = JSON.parse(Fa.responseText);
              wa(gb);
            } catch (Sa) {
              La("INVALID JSON");
            }
          else La("HTTP ERROR " + Fa.status);
      };
      Fa.send();
    });
  }
  function Ka(W) {
    Pa.isRT = !1;
    db(W || "NO_ERROR_LABEL");
  }
  function Ua() {
    db("INVALID_SKU");
  }
  function db(W) {
    rc.error ? rc.error(W) : console.log("ERROR:", W);
  }
  function Gb() {
    dc = zb(qa.container);
    ec = ma(qa.container);
    console.log(
      "INFO in JeelizVTOWidget.resize: _width =" +
        dc.toString() +
        " _height =" +
        ec.toString() +
        " oFactor = " +
        (1).toString()
    );
    fc = Math.round(1 * dc);
    gc = Math.round(1 * ec);
    ua(qa.cv, { width: dc.toString() + "px", height: ec.toString() + "px" });
    qa.cv.width = fc;
    qa.cv.height = gc;
    Ra &&
      (Pa.mode === eb.notLoaded
        ? Ra.set_size(fc, gc, !1)
        : Ra.resize(fc, gc, !1));
  }
  function lb() {
    [qa.adjust, qa.changeModelContainer, qa.buttonResizeCanvas].forEach(Ja);
    Pa.mode = eb.adjust;
    [qa.adjustNotice, qa.adjustExit].forEach(ya);
    qa.cv.style.cursor = "move";
    Ra.switch_modeInteractor("movePinch");
    hc("ADJUST_START");
  }
  function ub() {
    [qa.adjustNotice, qa.adjustExit].forEach(Ja);
    [qa.adjust, qa.changeModelContainer, qa.buttonResizeCanvas].forEach(ya);
    qa.cv.style.cursor = "auto";
    Pa.mode = Pa.realtime;
    Ra.switch_modeInteractor("idle");
    hc("ADJUST_END");
  }
  function Tb() {
    if (!qa.trackIframe) {
      var W = ic.appstaticURL + "jeewidget/";
      qa.trackIframe = document.createElement("iframe");
      qa.trackIframe.width = "10";
      qa.trackIframe.height = "10";
      qa.trackIframe.src = W + "trackIframe.html";
      ua(qa.trackIframe, {
        position: "absolute",
        zIndex: -1,
        bottom: "0px",
        right: "0px",
      });
      qa.container.appendChild(qa.trackIframe);
    }
  }
  function Jb(W, wa, La) {
    Ra.load_model(
      wa.mod + ".json",
      wa.mats,
      function () {
        Pa.mode = eb.realtime;
        La && La();
        pb.toggle_loading(!1);
        if (qa.trackIframe) {
          var Fa = location.href.split("?").shift().split("://").pop();
          Fa = Fa.split("/").shift();
          Fa = Fa.split("www.").pop();
          try {
            qa.trackIframe.contentWindow.postMessage(
              { action: "COUNTTRYONSESSION", domain: Fa, sku: W },
              "*"
            );
          } catch (gb) {}
        }
      },
      W
    );
  }
  function hc(W) {
    (W = Bc[W]) && W();
  }
  var Ra = (function () {
    function W(a, c) {
      return a[0] * (1 - c) + a[1] * c;
    }
    function wa(a, c) {
      var e = new XMLHttpRequest();
      e.open("GET", a, !0);
      e.withCredentials = !1;
      e.onreadystatechange = function () {
        4 !== e.readyState ||
          (200 !== e.status && 0 !== e.status) ||
          c(e.responseText);
      };
      e.send();
    }
    function La(a, c) {
      if (0 === c || "object" !== typeof a) return a;
      a = Object.assign({}, a);
      c = void 0 === c || -1 === c ? -1 : c - 1;
      for (var e in a) a[e] = La(a[e], c);
      return a;
    }
    function Fa(a) {
      return 0.5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
    }
    function gb(a) {
      switch (a) {
        case "relu":
          return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
        case "elu":
          return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
        case "elu01":
          return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
        case "arctan":
          return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
        case "copy":
          return "";
        default:
          return !1;
      }
    }
    function Sa(a, c) {
      var e = c % 8;
      return (a[(c - e) / 8] >> (7 - e)) & 1;
    }
    function Db(a, c, e) {
      var d = 1,
        n = 0;
      for (e = c + e - 1; e >= c; --e) (n += d * Sa(a, e)), (d *= 2);
      return n;
    }
    function Ca(a) {
      a =
        "undefined" === typeof btoa
          ? Buffer.from(a.data, "base64").toString("latin1")
          : atob(a.data);
      for (var c = a.length, e = new Uint8Array(c), d = 0; d < c; ++d)
        e[d] = a.charCodeAt(d);
      return e;
    }
    function $a(a) {
      var c = JSON.parse(a);
      a = c.nb;
      var e = c.n;
      c = Ca(c);
      for (var d = new Uint32Array(e), n = 0; n < e; ++n)
        d[n] = Db(c, n * a, a);
      return d;
    }
    function hb(a) {
      var c = JSON.parse(a);
      a = c.ne;
      var e = c.nf,
        d = c.n;
      c = Ca(c);
      for (
        var n = new Float32Array(d),
          l = new Float32Array(e),
          A = a + e + 1,
          p = 0;
        p < d;
        ++p
      ) {
        var u = A * p,
          t = 0 === Sa(c, u) ? 1 : -1,
          y = Db(c, u + 1, a);
        u = u + 1 + a;
        for (var H = l.length, C = 0, w = u; w < u + H; ++w)
          (l[C] = Sa(c, w)), ++C;
        for (H = u = 0; H < e; ++H) u += l[H] * Math.pow(2, -H - 1);
        n[p] =
          0 === u && 0 === y
            ? 0
            : t * (1 + u) * Math.pow(2, 1 + y - Math.pow(2, a - 1));
      }
      return n;
    }
    function Eb(a) {
      var c = null,
        e = null,
        d = null,
        n = 0;
      this.m = function (l) {
        this.En(l.zd);
        d.Hk({ Uf: l.Uf, Rf: l.Rf });
      };
      this.zl = function (l) {
        return c[l];
      };
      this.En = function (l) {
        var A = null;
        n = l.length;
        c = l.map(function (p, u) {
          p = Object.assign({}, p, {
            index: u,
            parent: this,
            Ld: A,
            gm: u === n - 1,
          });
          return (A = 0 === u ? Qc.instance(p) : Rc.instance(p));
        });
        e = c[0];
        d = c[n - 1];
        c.forEach(function (p, u) {
          0 !== u && p.Rm();
        });
      };
      this.wa = function (l) {
        l.g(0);
        var A = l;
        c.forEach(function (p) {
          A = p.wa(A, !1);
        });
        return A;
      };
      this.Bh = function () {
        return e.L();
      };
      this.$e = function () {
        return d.Cl();
      };
      this.xh = function () {
        return d.xh();
      };
      this.v = function () {
        c &&
          (c.forEach(function (l) {
            l.v();
          }),
          (d = e = c = null),
          (n = 0));
      };
      "undefined" !== typeof a && this.m(a);
    }
    function mb(a, c) {
      a[c] = !0;
      a.setAttribute(c, "true");
    }
    function Vb() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    function Wb() {
      var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return a && a.length && 2 < a.length
        ? [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)]
        : [0, 0, 0];
    }
    function Lb() {
      var a = navigator.userAgent.toLowerCase();
      return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1;
    }
    function Mb(a) {
      if (!a) return a;
      var c = null;
      if (a.video) {
        var e = function (d) {
          return d && "object" === typeof d ? Object.assign({}, d) : d;
        };
        c = {};
        "undefined" !== typeof a.video.width && (c.width = e(a.video.width));
        "undefined" !== typeof a.video.height && (c.height = e(a.video.height));
        "undefined" !== typeof a.video.facingMode &&
          (c.facingMode = e(a.video.facingMode));
      }
      c = { audio: a.audio, video: c };
      "undefined" !== typeof a.deviceId && Xb(c, a.deviceId);
      return c;
    }
    function Xb(a, c) {
      c &&
        ((a.video = a.video || {}),
        (a.video.deviceId = { exact: c }),
        a.video.facingMode && delete a.video.facingMode);
    }
    function Yb(a) {
      var c = a.video.width;
      a.video.width = a.video.height;
      a.video.height = c;
      return a;
    }
    function jc(a) {
      function c(C) {
        return [
          480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920,
        ].sort(function (w, E) {
          return Math.abs(w - C) - Math.abs(E - C);
        });
      }
      function e(C) {
        var w = Mb(a);
        C = C(w);
        n.push(C);
        d(C);
      }
      function d(C) {
        if (C.video && C.video.facingMode && C.video.facingMode.exact) {
          var w = C.video.facingMode.exact;
          C = Mb(C);
          delete C.video.facingMode.exact;
          C.video.facingMode.ideal = w;
          n.push(C);
        }
      }
      var n = [];
      if (!a || !a.video) return n;
      d(a);
      if (a.video.width && a.video.height) {
        if (a.video.width.ideal && a.video.height.ideal) {
          var l = c(a.video.width.ideal).slice(0, 3),
            A = c(a.video.height.ideal).slice(0, 3),
            p = {},
            u = 0;
          for (p.gb = void 0; u < l.length; p = { gb: p.gb }, ++u) {
            p.gb = l[u];
            var t = {},
              y = 0;
            for (t.fb = void 0; y < A.length; t = { fb: t.fb }, ++y)
              if (
                ((t.fb = A[y]),
                p.gb !== a.video.width.ideal || t.fb !== a.video.height.ideal)
              ) {
                var H = Math.max(p.gb, t.fb) / Math.min(p.gb, t.fb);
                H < 4 / 3 - 0.1 ||
                  H > 16 / 9 + 0.1 ||
                  e(
                    (function (C, w) {
                      return function (E) {
                        E.video.width.ideal = C.gb;
                        E.video.height.ideal = w.fb;
                        return E;
                      };
                    })(p, t)
                  );
              }
          }
        }
        e(function (C) {
          return Yb(C);
        });
      }
      a.video.width &&
        a.video.height &&
        (a.video.width.ideal &&
          a.video.height.ideal &&
          e(function (C) {
            delete C.video.width.ideal;
            delete C.video.height.ideal;
            return C;
          }),
        e(function (C) {
          delete C.video.width;
          delete C.video.height;
          return C;
        }));
      a.video.facingMode &&
        (e(function (C) {
          delete C.video.facingMode;
          return C;
        }),
        a.video.width &&
          a.video.height &&
          e(function (C) {
            Yb(C);
            delete C.video.facingMode;
            return C;
          }));
      n.push({ audio: a.audio, video: !0 });
      return n;
    }
    function sc(a) {
      try {
        var c = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
      } catch (d) {
        c = window.innerHeight > window.innerWidth;
      }
      if (c && a && a.video) {
        c = a.video.width;
        var e = a.video.height;
        c &&
          e &&
          c.ideal &&
          e.ideal &&
          c.ideal > e.ideal &&
          ((a.video.height = c), (a.video.width = e));
      }
    }
    function Hb(a) {
      a.volume = 0;
      mb(a, "muted");
      if (Lb()) {
        if (1 === a.volume) {
          var c = function () {
            a.volume = 0;
            window.removeEventListener("mousemove", c, !1);
            window.removeEventListener("touchstart", c, !1);
          };
          window.addEventListener("mousemove", c, !1);
          window.addEventListener("touchstart", c, !1);
        }
        setTimeout(function () {
          a.volume = 0;
          mb(a, "muted");
        }, 5);
      }
    }
    function Zb(a) {
      var c = Aa.element,
        e = Aa.ah;
      return null === c
        ? Promise.resolve()
        : new Promise(function (d, n) {
            if (c.srcObject && c.srcObject.getVideoTracks) {
              var l = c.srcObject.getVideoTracks();
              1 !== l.length
                ? n("INVALID_TRACKNUMBER")
                : ((l = l[0]), a ? $b(c, d, n, e) : (l.stop(), d()));
            } else n("BAD_IMPLEMENTATION");
          });
    }
    function ac(a, c, e, d) {
      function n(A) {
        l || ((l = !0), e(A));
      }
      var l = !1;
      navigator.mediaDevices
        .getUserMedia(d)
        .then(function (A) {
          function p() {
            setTimeout(function () {
              if (a.currentTime) {
                var t = a.videoWidth,
                  y = a.videoHeight;
                if (0 === t || 0 === y) n("VIDEO_NULLSIZE");
                else {
                  t && (a.style.width = t.toString() + "px");
                  y && (a.style.height = y.toString() + "px");
                  var H = { Ck: null, ng: null, Cm: null };
                  try {
                    var C = A.getVideoTracks()[0];
                    C &&
                      ((H.Cm = C),
                      (H.Ck = C.getCapabilities()),
                      (H.ng = C.getSettings()));
                  } catch (w) {}
                  Lb() || Vb()
                    ? a.parentNode && null !== a.parentNode
                      ? (l || c(a, A, H),
                        setTimeout(function () {
                          a.play();
                        }, 100))
                      : (document.body.appendChild(a),
                        Hb(a),
                        setTimeout(function () {
                          a.style.transform = "scale(0.0001,0.0001)";
                          a.style.position = "fixed";
                          a.style.bottom = "0px";
                          a.style.right = "0px";
                          Hb(a);
                          setTimeout(function () {
                            a.play();
                            l || c(a, A, H);
                          }, 100);
                        }, 80))
                    : l || c(a, A, H);
                }
              } else n("VIDEO_NOTSTARTED");
            }, 700);
          }
          function u() {
            a.removeEventListener("loadeddata", u, !1);
            var t = a.play();
            Hb(a);
            "undefined" === typeof t
              ? p()
              : t
                  .then(function () {
                    p();
                  })
                  .catch(function () {
                    n("VIDEO_PLAYPROMISEREJECTED");
                  });
          }
          "undefined" !== typeof a.srcObject
            ? (a.srcObject = A)
            : ((a.src = window.URL.createObjectURL(A)), (a.videoStream = A));
          Hb(a);
          a.addEventListener("loadeddata", u, !1);
        })
        .catch(function (A) {
          n(A);
        });
    }
    function $b(a, c, e, d) {
      if (a)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          if (d && d.video) {
            if (Vb()) {
              var n = Wb();
              0 !== n[0] && (12 > n[0] || (12 === n[0] && 2 > n[1])) && sc(d);
            }
            d.video.width &&
              d.video.width.ideal &&
              (a.style.width = d.video.width.ideal + "px");
            d.video.height &&
              d.video.height.ideal &&
              (a.style.height = d.video.height.ideal + "px");
          }
          mb(a, "autoplay");
          mb(a, "playsinline");
          d && d.audio ? (a.volume = 0) : mb(a, "muted");
          ac(
            a,
            c,
            function () {
              function l(p) {
                if (0 === p.length) e("INVALID_FALLBACKCONSTRAINTS");
                else {
                  var u = p.shift();
                  ac(
                    a,
                    c,
                    function () {
                      l(p);
                    },
                    u
                  );
                }
              }
              var A = jc(d);
              l(A);
            },
            d
          );
        } else e && e("MEDIASTREAMAPI_NOTFOUND");
      else e && e("VIDEO_NOTPROVIDED");
    }
    function Sc(a) {
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
        ? navigator.mediaDevices
            .enumerateDevices()
            .then(function (c) {
              (c = c.filter(function (e) {
                return (
                  e.kind &&
                  -1 !== e.kind.toLowerCase().indexOf("video") &&
                  e.label &&
                  e.deviceId
                );
              })) &&
              c.length &&
              0 < c.length
                ? a(c, !1)
                : a(!1, "NODEVICESFOUND");
            })
            .catch(function () {
              a(!1, "PROMISEREJECTED");
            })
        : a(!1, "NOTSUPPORTED");
    }
    function Tc() {
      function a() {
        var B = kc.Se;
        Nb = B * N.width;
        Ob = B * N.height;
      }
      function c() {
        ++x;
        2 === x &&
          (t(),
          w(),
          E(),
          Ea.jj(),
          e(),
          R.Rc.forEach(function (B) {
            B();
          }),
          R.Rc.splice(0),
          T.model && !R.isBusy && Ea.gi(T.model));
      }
      function e() {
        R.load_model = function (B, Q, fa) {
          if (R.isBusy) return !1;
          R.isBusy = !0;
          if (T.model)
            R.set_model(
              B,
              function () {
                R.set_materials(Q, function () {
                  R.isBusy = !1;
                  fa && fa();
                });
              },
              function () {
                R.isBusy = !1;
              }
            );
          else {
            var ia = N.aa + N.ua + N.If + "/",
              Ha = Q.map(function (fb) {
                return ia + fb;
              });
            T.model = {
              url: N.aa + N.ua + N.Mf + "/" + B,
              Ec: Ha,
              Db: !1,
              Cb: !1,
            };
            Ea.gi(T.model, function () {
              R.isBusy = !1;
              fa && fa();
            });
          }
          return !0;
        };
        R.set_offset = function (B) {
          r = B;
          Ea.ae();
        };
        R.set_scale = function (B) {
          M = B;
          Ea.be();
        };
        R.set_rx = function (B) {
          J = B;
          Ea.vj();
        };
        R.switch_shadow = sa.sg;
        R.switch_bgBlur = sa.rg;
        R.set_zoom = sa.fg;
        R.is_viewer3D = function () {
          return aa === X.Ea;
        };
        R.switch_viewer3D = function (B, Q) {
          if (
            aa === X.hc ||
            aa === X.ic ||
            (aa === X.W && !B) ||
            (aa === X.Ea && B) ||
            ka
          )
            return !1;
          if (aa === X.ya)
            return Ma !== X.Ea || B
              ? Ma === X.W && B
                ? ((Ma = X.Ea), sa.sa(U.yb), sa.Ya(1), Q && Q(), !0)
                : !1
              : ((Ma = X.W), sa.sa(U.cb), sa.Ya(0), Q && Q(), !0);
          var fa = 0,
            ia = -1,
            Ha = 0;
          aa === X.W
            ? ((aa = X.hc), (ia = N.Ao))
            : aa === X.Ea && ((aa = X.ic), (ia = N.Do));
          var fb = tc.Xe();
          oa = setInterval(function () {
            var vb = tc.Xe();
            fa += (vb - fb) / ia;
            1 <= fa &&
              ((fa = 1),
              aa === X.hc
                ? ((aa = X.Ea), sa.sa(U.yb))
                : ((aa = X.W), sa.sa(U.cb)),
              Q && Q(),
              clearInterval(oa),
              (oa = null));
            var wb = aa === X.ic || aa === X.W ? 1 - N.yo(fa) : N.xo(fa);
            sa.Ya(wb);
            (aa !== X.ic && aa !== X.hc) ||
              0 !== Ha++ % 2 ||
              (sa.sa(U.Lf), U.Lf.Ln(wb));
            fb = vb;
          }, 0.016);
          return !0;
        };
        R.capture_image = function (B, Q, fa, ia) {
          la = B;
          ka = !0;
          "undefined" === typeof isAllocate && (fa = !1);
          (ia = "undefined" === typeof ia ? !1 : ia) && sa.Vd(!1);
          u();
          Ba = function () {
            sa.Fi(0);
            b.flush();
            var Ha = ab.zh(fa);
            Q(Ha);
            ia && sa.Vd(!0);
          };
        };
        R.capture_detection = function (B, Q) {
          la = B;
          ka = !0;
          var fa = null === K.zb ? K.xb : K.Oc;
          Ba = function () {
            var ia = Cc.instance({
              Ge: P.Mc.clone(),
              mi: bb.Fh(),
              li: bb.Dh(),
              background: fa.clone(),
              Va: ta.hb.Nl().clone(),
              Hf: Xa,
            });
            Q(ia);
          };
        };
        R.process_offlineRendering = function (B, Q, fa, ia, Ha) {
          function fb() {
            if (2 === ++vb) {
              V.Va || (V.Va = bc.instance({}));
              B.Ch() && (V.Va.Yi(B.Ch()), sa.sa(V.Va));
              V.Ke.set();
              d();
              V.Ke = !1;
              Ea.jn(
                ia
                  ? function () {
                      ab.ob().parentNode.removeChild(R.Ab);
                    }
                  : !1
              );
              var wb = ab.zh(!1);
              setTimeout(function () {
                Ha(wb);
              }, 1);
            }
          }
          Ea.mn();
          ia &&
            (R.Hj.drawImage(ab.ob(), 0, 0),
            ab.ob().parentNode.insertBefore(R.Ab, ab.ob()),
            R.Ab.setAttribute("class", "jeefitMask"));
          V.Ke = B;
          var vb = 0;
          R.set_model(Q, function () {
            fb();
            R.set_materials(fa, function () {
              setTimeout(fb, 1);
            });
          });
        };
        R.serialize_detection = function (B) {
          return B.Hc();
        };
        R.unserialize_detection = function (B, Q, fa) {
          return Cc.Nc(B, Q, fa);
        };
        R.do_instantDetection = function (B, Q) {
          Dc.m(P.Mc);
          Dc.start(B, Q);
        };
        R.relieve_DOM = function (B, Q) {
          if (q.Rb) return !1;
          l(Q || 160);
          D = !1;
          v && clearTimeout(v);
          v = setTimeout(function () {
            l(N.za);
            v = !1;
            p();
          }, B);
          return !0;
        };
        R.switch_slow = function (B, Q) {
          if (q.Rb) return !1;
          "undefined" === typeof Q && (Q = N.Oj);
          v && (l(N.za), p(), clearTimeout(v), (v = !1));
          B ? (D = !1) : p();
          l(B ? Q : N.za);
          return !0;
        };
        R.switch_deepSleep = function (B) {
          if (Da === B) return !1;
          Da = !1;
          R.switch_sleep(B);
          Da = B;
          return !0;
        };
        R.switch_sleep = function (B, Q) {
          function fa() {
            R.isBusy = !1;
            B ? ((Ma = aa), (aa = X.ya)) : ((aa = Ma), d());
          }
          if (q.Rb || Da || R.isBusy) return Q ? Promise.reject() : null;
          if ((B && aa === X.ya) || (!B && aa !== X.ya))
            return Q ? Promise.resolve(!1) : !1;
          oa && (clearInterval(oa), (oa = null));
          aa === X.ic
            ? ((aa = X.W), sa.sa(U.cb), sa.Ya(0))
            : aa === X.hc && ((aa = X.Ea), sa.sa(U.yb), sa.Ya(1));
          xb.stop();
          var ia = null;
          R.isBusy = !0;
          Q ? (ia = Zb(!B).then(fa)) : fa();
          return Q ? ia : !0;
        };
        R.set_modelStandalone = function (B, Q) {
          sa.Wd(!1);
          uc.instance({
            url: B.model,
            Ec: B.materials,
            Db: !1,
            Cb: !1,
            R: function (fa) {
              ib = [0, 0, 0];
              nb = 1;
              qb = g = k = 0;
              rb = N.Cc;
              R.ready && Ea.ce();
              Q && Q();
              n(fa);
              Ea.pg();
              sa.Wd(!0);
            },
          });
        };
        R.start_rendering = Ea.pg;
        R.update_material = function (B, Q) {
          bb && bb.lo(B, Q);
        };
        R.set_model = function (B, Q, fa) {
          bb &&
            bb.replace(
              "http" === B.substring(0, 4).toLowerCase()
                ? B
                : N.aa + N.ua + N.Mf + "/" + B,
              function () {
                Q && Q(bb.Gk());
              },
              fa
            );
        };
        R.set_tweaker = function (B, Q) {
          function fa(ia) {
            R.Pg(ia);
            Q && Q();
          }
          "string" === typeof B ? wa(N.aa + N.ua + N.co + "/" + B, fa) : fa(B);
        };
        R.Pg = function (B) {
          B &&
            (B.preOffset && (ib = B.preOffset),
            B.preScale && (nb = B.preScale),
            B.rx && (k = B.rx),
            B.beginBendZ && (g = B.beginBendZ),
            B.bendStrength && (qb = B.bendStrength),
            B.maskBranchStartEnd && (rb = B.maskBranchStartEnd),
            R.ready && Ea.ce());
        };
        R.set_materials = function (B, Q) {
          if (bb) {
            var fa = N.aa + N.ua + N.If + "/";
            B = B.map(function (ia) {
              var Ha = ia;
              "string" === typeof ia &&
                ((Ha = fa + ia), (Ha = Ha.replace(/([^:])\/\//, "$1/")));
              return Ha;
            });
            bb.gg(B, Q);
          }
        };
      }
      function d() {
        Ab.reset();
        xb.stop();
        A(0);
      }
      function n(B) {
        bb && (sa.dn(bb), bb.remove());
        sa.Kj(B);
        bb = B;
      }
      function l(B) {
        O = B;
        xb.update({ za: O });
      }
      function A(B) {
        ea = -1;
        ka
          ? (ea = la)
          : V.isEnabled
          ? (ea = V.pi)
          : D
          ? (u(), (ea = aa === X.W ? Ab.T() : 1))
          : ((ea = N.Pc[0]), u());
        va.fa();
        for (var Q = 0; Q < ea; ++Q)
          ca.set("s55"),
            K.rf.M(),
            K.xb.g(0),
            P.Fc.g(1),
            Y.l(!1, !1),
            m.wa(K.rf);
        ka
          ? (Ba(), (ka = !1), b.flush(), xb.ag(A))
          : (sa.animate(B),
            K.Xf &&
              ba - U.di > U.kj &&
              N.Vb &&
              aa === X.W &&
              (va.fa(),
              (U.di = ba),
              U.Id.M(),
              ca.set("s63"),
              K.Xf.g(0),
              Y.l(!1, !1),
              ta.hb.xj(Aa.ka, U.Id, U.Ud),
              va.$()),
            V.isEnabled ||
              (D &&
                (Ab.oj(),
                (Q = Ab.yh(1)),
                (S = W(N.Mj, Q)),
                N.Vb &&
                  aa === X.W &&
                  ((U.kj = W(N.fi, Q)),
                  (U.Ud = W(N.um, Q)),
                  (U.Ud = Math.min(U.Ud, 0.5)))),
              (ba = B),
              aa !== X.ya && xb.ag(A)));
      }
      function p() {
        ba = tc.Xe();
        D = !0;
      }
      function u() {
        var B = Aa.element.currentTime - Na;
        0 > B && (Na = Aa.element.currentTime);
        1e3 * B < N.so ||
          (Aa.ka.refresh(),
          (Na += B),
          (Aa.gd = B),
          (ja = !0),
          va.fa(),
          ca.set("s0"),
          P.Yf.M(),
          P.Fc.qk(0),
          Y.l(!1, !0),
          ca.set("s53"),
          K.xb.M(),
          Aa.ka.g(0),
          Y.l(!1, !1),
          null !== K.zb &&
            (ca.set("s54"), K.Oc.o(), K.xb.g(0), K.zb.g(1), Y.l(!1, !1)));
      }
      function t() {
        K.zj = Z.instance({
          isPot: !0,
          isLinear: !0,
          isFloat: !1,
          url: N.aa + N.ua + N.to,
        });
        var B = { isPot: !1, isLinear: !0, isFloat: !1, width: Nb, height: Ob };
        K.xb = Z.instance(B);
        K.Oc = Z.instance(B);
        q.lj.push(K.xb, K.Oc);
        K.rf = Z.instance({ isPot: !0, isFloat: !1, width: m.Bh() });
        N.Bd &&
          (ha = Z.instance({
            isPot: !1,
            isFloat: !1,
            isLinear: !0,
            url: (N.Gf || -1 !== N.Ff.indexOf("//") ? "" : N.aa + N.ua) + N.Ff,
          }));
      }
      function y() {
        function B() {
          return {
            width: 3,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          };
        }
        var Q = {
          width: 3,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        };
        P.Fc = Ec.instance(B());
        P.Yf = Z.instance(B());
        P.Mc = Z.instance(B());
        P.Hd = Ec.instance(B());
        P.Me = Z.instance(Q);
        Q = {
          width: 2,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]),
        };
        P.Fg = Z.instance(Q);
        P.ee = Z.instance(Q);
        U.Id = Z.instance({
          width: 1,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0]),
        });
      }
      function H(B) {
        K.Xf = B;
        if (ja) {
          ja = !1;
          ca.set("s61");
          P.Fg.M();
          P.ee.g(2);
          var Q = W(N.sk, Ab.yh(0.5));
          ca.G("u63", Q);
          P.Yf.g(1);
          ca.G("u64", 1e3 * Aa.gd);
          Y.l(!1, !1);
          ca.set("s62");
          P.ee.o();
          P.Fg.g(0);
          Y.l(!1, !1);
        }
        B.g(0);
        P.Fc.Ui(1);
        b.viewport(0, 0, 1, 1);
        ca.set("s56");
        ca.lg("u43", Fc.get(0));
        Y.l(!1, !1);
        ca.set("s57");
        b.viewport(1, 0, 2, 1);
        Y.l(!1, !1);
        P.Me.M();
        ca.set("s58");
        ca.N("u54", N.se[0] * S, N.se[1]);
        P.Fc.g(0);
        P.Hd.g(1);
        Y.l(!1, !1);
        ca.set("s59");
        P.Hd.Ui(1);
        P.Me.g(0);
        P.ee.g(2);
        P.Fc.g(3);
        Y.l(!1, !1);
        ca.set("s60");
        P.Hd.g(0);
        P.Mc.o();
        Y.l(!1, !1);
      }
      function C() {
        var B = N.aa,
          Q = N.le.split("://").shift();
        if ("http" === Q || "https" === Q) B = "";
        B += N.le;
        "json" !== B.split(".").pop() && (B += N.neuralNetworkPath);
        wa(B, function (fa) {
          fa = JSON.parse(fa);
          if (fa.exportData) {
            var ia = fa.exportData;
            L.Wa = L.Wa || ia.rotationEulerAnglesFactors;
            L.vc = L.vc || ia.deformScaleXFactor;
            L.qa = L.qa || ia.translationScalingFactors;
          }
          m = new Eb({ zd: fa.layers, Uf: "gpuRawAvg", Rf: H });
          c();
        });
      }
      function w() {
        a();
        G.kb[0] = 1;
        G.kb[1] = Nb / Ob;
        Fc.m({
          Gd: N.scanOverlapFactors,
          oi: N.scanNScaleLevels,
          ta: Nb,
          kf: Ob,
          Li: N.scanScale0Factor,
          qa: L.qa,
          Mi: !0,
        });
        ra =
          N.width > N.height
            ? [N.width / N.height, 1]
            : [1, N.height / N.width];
        q.Ha = !0;
      }
      function E() {
        ca.j("s55", [
          { type: "1i", name: "u1", value: 0 },
          { type: "1i", name: "u39", value: 1 },
          { type: "2f", name: "u40", value: G.kb },
          { type: "1f", name: "u41", value: L.vc },
        ]);
        ca.j("s56", [
          { type: "1i", name: "u42", value: 0 },
          { type: "1i", name: "u39", value: 1 },
          { type: "1f", name: "u47", value: N.ao },
          { type: "1f", name: "u48", value: N.Pk },
          {
            type: "3f",
            name: "u44",
            value: [L.qa[0] * G.kb[0], L.qa[1] * G.kb[1], L.qa[2]],
          },
          {
            type: "3f",
            name: "u45",
            value: [N.jc[0][0], N.jc[1][0], N.jc[2][0]],
          },
          {
            type: "3f",
            name: "u46",
            value: [N.jc[0][1], N.jc[1][1], N.jc[2][1]],
          },
        ]);
        ca.j("s57", [
          { type: "1i", name: "u42", value: 0 },
          { type: "1i", name: "u39", value: 1 },
          { type: "2f", name: "u51", value: N.Um },
          { type: "3f", name: "u49", value: L.Wa },
          { type: "3f", name: "u50", value: N.nj },
          { type: "1f", name: "u52", value: N.ml },
        ]);
        ca.j("s58", [
          { type: "1i", name: "u39", value: 0 },
          { type: "1i", name: "u53", value: 1 },
          { type: "2f", name: "u54", value: N.se },
          { type: "1f", name: "u55", value: N.kn },
          { type: "1f", name: "u56", value: N.Tm },
        ]);
        ca.j("s59", [
          { type: "1i", name: "u53", value: 1 },
          { type: "1i", name: "u57", value: 0 },
          { type: "1i", name: "u58", value: 2 },
          { type: "1i", name: "u59", value: 3 },
          { type: "2f", name: "u40", value: G.kb },
          { type: "1f", name: "u61", value: m.Bh() },
          { type: "2f", name: "u60", value: N.gn },
        ]);
        ca.j("s60", [
          { type: "1i", name: "u39", value: 0 },
          { type: "1f", name: "u62", value: N.nn },
        ]);
        ca.j("s61", [
          { type: "1i", name: "u42", value: 0 },
          { type: "1i", name: "u39", value: 1 },
          { type: "1i", name: "u58", value: 2 },
          { type: "3f", name: "u49", value: L.Wa },
          { type: "3f", name: "u50", value: N.nj },
        ]);
        ca.j("s62", [
          { type: "1i", name: "u58", value: 0 },
          { type: "2f", name: "u66", value: N.bo },
          { type: "2f", name: "u67", value: N.ln },
        ]);
        ca.j("s63", [{ type: "1i", name: "u42", value: 0 }]);
        ca.j("s54", [
          { type: "1i", name: "u1", value: 0 },
          { type: "1i", name: "u68", value: 1 },
        ]);
      }
      var k,
        g,
        G = { kb: [-1, -1] },
        I = null,
        h = [0.5, 0, 0, 0.5],
        q = { bb: null, Rb: !1, Ha: !1, lj: [] },
        f = [0, N.Kd[1], N.Kd[2]],
        L = { Wa: [-N.Wa[0], -N.Wa[1], N.Wa[2]], vc: N.vc, qa: N.qa },
        O = N.za,
        v = null,
        m = null;
      a();
      var r = [0, 0, 0],
        M = 1,
        J = 0,
        K = { xb: null, Oc: null, rf: null, zj: null, Xf: null, zb: null },
        P = { Yf: null, Mc: null, Hd: null, Me: null, Fg: null, ee: null },
        ba = 0,
        ja = !1,
        U = {
          cb: null,
          yb: null,
          Lf: null,
          di: 0,
          kj: N.fi[1],
          Ud: 0.1,
          Id: null,
        },
        x = 0,
        z = !1,
        D = !0,
        S = 1,
        ea = -1,
        X = { ya: -1, W: 0, Ea: 1, hc: 2, ic: 3 },
        aa = X.W,
        oa = null,
        Ma = X.W,
        Da = !1,
        ka = !1,
        la = 1,
        Ba = !1,
        V = { isEnabled: !1, Ke: null, Va: null, pi: 0 },
        ha = null,
        ra = -1,
        Ga = !1,
        Ia = !1,
        sb = !1,
        Wa = [0, 0, 0],
        Ta = 1,
        Va,
        jb,
        lc,
        ib = [0, 0, 0],
        nb = 1,
        qb = (g = k = 0),
        rb = N.Cc,
        Fb = [0, 0, 0],
        Xa = { scale: 1, offsetX: 0, offsetY: 0 },
        Na = 0,
        Ea = {
          m: function () {
            ca.re([
              {
                id: "s53",
                name: "_",
                s: "attribute vec2 a0;uniform mat2 u38;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u38*a0;}",
                I: ["a0"],
                P: [2],
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1", "u38"],
                precision: "lowp",
              },
              {
                id: "s55",
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                s: "attribute vec2 a0;uniform sampler2D u39;uniform vec2 u40;uniform float u41;const vec2 f=vec2(.16,.5),g=vec2(.5,.5),h=vec2(.84,.5),p=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u39,f);vec2 j=a.gb,b=a.a*u40;vec4 k=texture2D(u39,g);float l=k.y;vec2 m=vec2(mix(1.,1./cos(l),u41),1.);b*=m;vec2 n=a0*.5;float c=texture2D(u39,h).r,d=cos(c),e=sin(c);vec2 o=mat2(d,e,-e,d)*n;vv0=j+o*b,gl_Position=vec4(a0,0.,1.);}",
                I: ["a0"],
                P: [2],
                i: ["u1", "u39", "u40", "u41"],
                precision: "lowp",
              },
              {
                id: "s56",
                name: "_",
                s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                h: "uniform sampler2D u42,u39;uniform vec3 u43,u44,u45,u46;uniform float u47,u48;const vec4 e=vec4(.25,.25,.25,.25);const vec2 f=vec2(.16,.5),g=vec2(.5,.5),h=vec2(.83,.5);const vec3 i=vec3(1.,1.,1.);void main(){vec4 j=texture2D(u42,vec2(.625,.625)),k=texture2D(u42,vec2(.875,.625));float l=dot(j-k,e);bool m=l>u48;vec4 a=texture2D(u39,f);m?a.r=2.:a.r>u47?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u43);else{float n=dot(e,texture2D(u42,vec2(.875,.875))),o=dot(e,texture2D(u42,vec2(.125,.625))),p=dot(e,texture2D(u42,vec2(.375,.625))),b=texture2D(u39,h).r,c=cos(b),d=sin(b);vec2 q=mat2(c,d,-d,c)*vec2(n,o);float r=texture2D(u39,g).a;vec3 s=mix(u45,u46,r*i);a.r*=step(1.9,a.r),a.gba+=vec3(q,p)*u44*s*a.a;}gl_FragColor=a;}",
                i: "u42 u39 u43 u47 u44 u48 u45 u46".split(" "),
              },
              {
                id: "s57",
                name: "_",
                h: "uniform sampler2D u42,u39;uniform vec3 u49,u50;uniform vec2 u51;uniform float u52;const vec4 v=vec4(1.,1.,1.,1.),f=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);const vec2 g=vec2(.16,.5),h=vec2(.5,.5),i=vec2(.84,.5);varying vec2 vv0;void main(){float k=step(vv0.x,.5);vec4 l=texture2D(u39,g);if(l.r<1.9){gl_FragColor=f;return;}float m=dot(texture2D(u42,vec2(.125,.125)),e),a=smoothstep(u51.x,u51.y,m);vec4 n=texture2D(u39,h);float o=n.a;a=mix(a,o,.3);float p=dot(e,texture2D(u42,vec2(.125,.875))),q=dot(e,texture2D(u42,vec2(.375,.875))),r=dot(e,texture2D(u42,vec2(.625,.875)));vec3 s=vec3(p,q,r),b=u50+s*u49;float c=texture2D(u39,i).r,d=b.z*u52;c+=d,b.z-=d;vec4 t=vec4(b,a),u=vec4(c,0.,0.,0.);gl_FragColor=mix(u,t,k);}",
                i: "u42 u39 u51 u49 u50 u52".split(" "),
              },
              {
                id: "s58",
                name: "_",
                h: "uniform sampler2D u39,u53;uniform vec2 u54;uniform float u55,u56;const vec4 f=vec4(1.,1.,1.,1.),h=vec4(1.,0.,0.,0.),i=vec4(0.,0.,0.,1.);const vec2 g=vec2(.5,.5);varying vec2 vv0;void main(){vec4 c=texture2D(u39,vv0),d=texture2D(u53,vv0),o=texture2D(u39,g),j=texture2D(u53,g);float k=pow(j.a,u56),l=mix(u54.x,u54.y,1.-k),a=step(.34,vv0.x)*step(vv0.x,.66);vec4 m=mix(h,i,a),b=max(l*f,m);b*=mix(f,u55*vec4(1.,1.,1.,0.)+vec4(0.,0.,0.,1.),a);vec4 n=c-d;gl_FragColor=n*b;}",
                i: ["u39", "u53", "u54", "u55", "u56"],
                precision: "highp",
              },
              {
                id: "s59",
                name: "_",
                h: "uniform sampler2D u53,u57,u58,u59;uniform vec2 u40,u60;uniform float u61;const vec4 u=vec4(1.,1.,1.,1.);const vec2 g=vec2(.25,.5),h=vec2(.75,.5),f=vec2(.16,.5),i=vec2(.5,.5);varying vec2 vv0;void main(){float j=step(.33,vv0.x)*step(vv0.x,.66),v=step(.66,vv0.x);vec4 k=texture2D(u59,i);float a=k.a;a*=texture2D(u58,g).a,a*=texture2D(u58,h).a;vec4 l=texture2D(u53,vv0),m=texture2D(u57,vv0),b=l+m;b.a=mix(b.a,a,j);vec4 c=texture2D(u53,f),n=texture2D(u59,f);vec2 o=c.gb,p=n.gb;float q=c.a;vec2 d=u61*abs(o-p)/(u40*q);float r=max(d.x,d.y),s=smoothstep(u60.x,u60.y,r);vec4 t=texture2D(u59,vv0);gl_FragColor=mix(b,t,s);}",
                i: "u53 u57 u58 u59 u40 u61 u60".split(" "),
                precision: "highp",
              },
              {
                id: "s60",
                name: "_",
                h: "uniform sampler2D u39;uniform float u62;const vec4 g=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u39,vv0);float b=step(vv0.x,.33),c=texture2D(u39,f).g;a.a+=b*a.a*u62*abs(sin(c)),gl_FragColor=a;}",
                i: ["u39", "u62"],
                precision: "highp",
              },
              {
                id: "s61",
                name: "_",
                h: "uniform sampler2D u39,u58,u42;uniform vec3 u49,u50;uniform float u63,u64;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(1.,1.,1.);const vec2 h=vec2(.5,.5);const vec3 i=vec3(1.,1.,4.);varying vec2 vv0;void main(){vec4 c=texture2D(u39,h);float d=step(vv0.x,.5),a=1.-d;vec4 j=texture2D(u58,vv0);float t=c.a;vec2 k=mix(vec2(.875,.875),vec2(.125,.875),a),l=mix(vec2(.125,.625),vec2(.375,.875),a),m=mix(vec2(.375,.625),vec2(.625,.875),a);float n=dot(e,texture2D(u42,k)),o=dot(e,texture2D(u42,l)),p=dot(e,texture2D(u42,m));vec3 q=mix(i,u49,a),b=q*vec3(n,o,p),r=c.rgb;b=mix(b,u50+b-r,a)/u64;vec4 s=mix(vec4(b,0.),j,vec4(u63*g,0.));gl_FragColor=s;}",
                i: "u39 u58 u42 u63 u64 u49 u50".split(" "),
                precision: "highp",
              },
              {
                id: "s62",
                name: "_",
                h: "uniform sampler2D u58;uniform vec2 u66,u67;const vec4 h=vec4(.25,.25,.25,.25);varying vec2 vv0;void main(){float a=step(.5,vv0.x),c=mix(u66.x,u67.x,a),d=mix(u66.y,u67.y,a);vec3 b=texture2D(u58,vv0).rgb;float f=length(b),g=1.-smoothstep(c,d,f);gl_FragColor=vec4(b,g);}",
                i: ["u58", "u66", "u67"],
                precision: "highp",
              },
              {
                id: "s63",
                name: "_",
                s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                h: "uniform sampler2D u42;const vec4 g=vec4(1.,1.,1.,1.),h=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);const float f=3.1415;void main(){float a=dot(texture2D(u42,vec2(.25,.25)),e),b=dot(texture2D(u42,vec2(.5,.25)),e),c=f/2.*dot(texture2D(u42,vec2(.75,.25)),e),d=4.18*dot(texture2D(u42,vec2(0.,.25)),e);gl_FragColor=vec4(d,a,b,c);}",
                i: ["u42"],
              },
              {
                id: "s54",
                name: "_",
                h: "uniform sampler2D u1,u68;varying vec2 vv0;vec4 i(vec4 a,sampler2D g){mediump float b=a.b*63.;mediump vec2 c;c.y=floor(floor(b)/8.),c.x=floor(b)-c.y*8.;mediump vec2 d;d.y=floor(ceil(b)/8.),d.x=ceil(b)-d.y*8.;highp vec2 e;e.x=c.x*.125+9.765625e-4+.123047*a.r,e.y=c.y*.125+9.765625e-4+.123047*a.g;highp vec2 f;f.x=d.x*.125+9.765625e-4+.123047*a.r,f.y=d.y*.125+9.765625e-4+.123047*a.g;lowp vec4 j=texture2D(g,e),k=texture2D(g,f),l=mix(j,k,fract(b));return l;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=i(a,u68);}",
                i: ["u1", "u68"],
              },
            ]);
            y();
            C();
            xb.m({ Vh: !1, za: O });
            Ab.m({ Of: 0, n: N.Pc[1] - N.Pc[0] + 1, ei: N.Pc[0] });
            R.set_videoRotation = function (B) {
              Ya.rotate = B;
              R.ready &&
                (cb.mg(Aa.element.videoWidth, Aa.element.videoHeight), cb.tg());
            };
            R.set_viewRotation = function () {};
            R.set_LUT = function (B) {
              B
                ? Z.instance({
                    url: B,
                    isFloat: !1,
                    isFlipY: !1,
                    R: function (Q) {
                      K.zb = Q;
                      Ea.Lc();
                    },
                  })
                : ((K.zb = null), Ea.Lc());
            };
            R.resize = function (B, Q, fa) {
              function ia() {
                xb.stop();
                q.bb && (clearTimeout(q.bb), (q.bb = null));
                if (!q.Rb)
                  if (N.width === Ha && N.height === fb) d();
                  else if (aa !== X.W && aa !== X.Ea)
                    q.bb = setTimeout(ia, N.Ji);
                  else {
                    var vb = "undefined" === typeof tb ? !1 : tb.get_mode(),
                      wb = aa;
                    aa = X.ya;
                    ka = q.Rb = !0;
                    Ba = function () {
                      ka = !1;
                      q.Rb = !1;
                      p();
                      l(N.za);
                      v && clearTimeout(v);
                      v = !1;
                      aa = wb;
                    };
                    N.width = Ha;
                    N.height = fb;
                    w();
                    E();
                    q.lj.forEach(function (Uc) {
                      Uc.resize(Ha, fb);
                    });
                    da.resize(Nb, Ob);
                    Ea.Lc();
                    cb.mg(
                      Aa.element.videoWidth
                        ? Aa.element.videoWidth
                        : Aa.element.width,
                      Aa.element.videoHeight
                        ? Aa.element.videoHeight
                        : Aa.element.height
                    );
                    cb.tg();
                    cb.jj();
                    d();
                    aa === X.Ea && ((aa = X.W), R.switch_viewer3D(!0, !1));
                    vb && tb.switch_mode(vb);
                  }
              }
              if (R.ready) {
                q.bb && (clearTimeout(q.bb), (q.bb = null));
                xb.stop();
                fa = fa ? kc.Se : 1;
                var Ha = B * fa,
                  fb = Q * fa;
                q.bb = setTimeout(ia, N.Ji);
              }
            };
          },
          v: function () {
            xb.v();
            return new Promise(function (B) {
              R.switch_sleep(!0, !0)
                .finally(function () {
                  m && m.v();
                  da.v();
                  ab.v();
                  b && (b = null);
                  m = null;
                  N.Gf = !1;
                  bb = null;
                  D = !0;
                  S = 1;
                  ea = -1;
                  aa = X.W;
                  oa = null;
                  Ma = X.W;
                  Object.assign(Aa, Gc);
                  Object.assign(N, Hc);
                  B();
                })
                .catch(function (Q) {
                  throw Error(Q);
                });
            });
          },
          Lc: function () {
            sa.Si(P.Mc, null === K.zb ? K.xb : K.Oc, U.Id, K.zj);
          },
          Bl: function () {
            return Xa;
          },
          Zi: function (B) {
            Xa = B;
          },
          ae: function () {
            Fb[0] = r[0] - Xa.offsetX;
            Fb[1] = r[1] + Xa.offsetY;
            Fb[2] = r[2];
            sa.tn(f, ib, Fb);
          },
          be: function () {
            sa.un(M * N.Pm, nb, Xa.scale);
          },
          vj: function () {
            sa.vn(J + k);
          },
          io: function () {
            sa.rn(N.Wc + g, N.Fb + qb);
          },
          ko: function () {
            sa.sn(rb);
          },
          ce: function () {
            Ea.ae();
            Ea.be();
            Ea.vj();
            Ea.io();
            Ea.ko();
          },
          mn: function () {
            xb.stop();
            oa && (clearInterval(oa), (oa = null));
            V.isEnabled = !0;
            V.pi = 0;
            Ga = sa.Al();
            Ia = bb.Fh();
            sb = bb.Dh();
            Ta = nb;
            Wa = ib;
            Va = rb;
            jb = g;
            lc = qb;
            ka = !1;
            sa.Vd(!1);
          },
          jn: function (B) {
            function Q() {
              2 === ++fa &&
                ((V.isEnabled = !1),
                (nb = Ta),
                (ib = Wa),
                (rb = Va),
                (g = jb),
                (qb = lc),
                Ea.ce(),
                sa.sa(Ga),
                d(),
                B && B());
            }
            var fa = 0;
            aa === X.hc ? (aa = X.Ea) : aa === X.ic && (aa = X.W);
            sa.Ya(aa === X.W ? 0 : 1);
            bb.replace(Ia, Q);
            bb.gg(sb, Q);
            Ea.Lc();
            sa.Vd(!0);
          },
          jj: function () {
            var B = Math.tan(Aa.Lb / 2);
            sa.Ri({
              Ue: N.Ue / B,
              on: B,
              Sm: Aa.Ai,
              Ca: N.Ca,
              Nf: N.Nf,
              Cj: G.kb,
              Gj: N.wo,
              xc: N.xc,
              jf: N.jf,
              gf: N.gf,
              hf: N.hf,
              Cc: rb,
              te: N.te,
              Fe: N.Fe,
              $f: N.$f,
              dc: N.dc,
              Rn: N.ej,
              Sn: N.fj,
              Td: N.Td,
              ec: N.ec,
              ad: N.ad,
              Je: N.Je,
              Ie: N.Ie,
              He: N.He,
              we: N.we,
              ve: N.aa + N.ua + N.ve,
              Wc: N.Wc + g,
              Fb: N.Fb + qb,
              ef: N.ef,
              Kg: N.Kg,
              Jg: N.Jg,
              he: N.he,
              Co: N.Bo,
              ge: Aa.ge,
              Bd: N.Bd,
              wm: ha,
              Ad: N.Ad,
              Cd: N.Cd,
              Ef: N.Ef,
              vm: ra,
              ug: N.ug,
            });
          },
          Dk: function () {
            var B = Ya.ke,
              Q = Ya.je,
              fa = 1 / Math.tan(Aa.Lb / 2),
              ia = ab.Y() / ab.L();
            Aa.Ai = [
              fa,
              0,
              0,
              0,
              0,
              fa / ia,
              0,
              0,
              0,
              0,
              -(Q + B) / (Q - B),
              -1,
              0,
              0,
              (-2 * B * Q) / (Q - B),
              0,
            ];
            Aa.ge = 1 / Math.tan((N.zo * Math.PI) / 360) / fa;
          },
          mg: function (B, Q) {
            I = [0.5, 0.5];
            B = Q / B;
            Q = ab.Y() / ab.L();
            90 === Math.abs(Ya.rotate) && (B = 1 / B);
            B > Q ? (I[1] *= Q / B) : (I[0] *= B / Q);
            h[0] = 0;
            h[1] = 0;
            h[2] = 0;
            h[3] = 0;
            switch (Ya.rotate) {
              case 0:
                h[0] = I[0];
                h[3] = I[1];
                break;
              case 180:
                h[0] = -I[0];
                h[3] = -I[1];
                break;
              case 90:
                h[1] = I[0];
                h[2] = -I[1];
                break;
              case -90:
                (h[1] = -I[0]), (h[2] = I[1]);
            }
            Aa.Lb =
              2 *
              Math.atan(
                2 *
                  I[0] *
                  Math.tan(
                    ((1 < B ? Ya.FOVmobile : Ya.FOVdesktop) * Math.PI) / 180 / 2
                  )
              );
            Ea.Dk();
          },
          tg: function () {
            ca.j("s53", [
              { type: "1i", name: "u1", value: 0 },
              { type: "mat2", name: "u38", value: h },
            ]);
          },
          pf: function (B, Q) {
            Ea.Xl(B, Q);
            Ea.m();
            if (!Ea.Ul())
              return (
                R.jb && R.jb("GL_INCOMPATIBLE", "Cannot init JEELIZVTO"), !1
              );
            Ea.Nh();
            return !0;
          },
          Xl: function (B, Q) {
            R.Bb = document.createElement("canvas");
            R.Ab = document.createElement("canvas");
            R.Ab.width = N.width;
            R.Ab.height = N.height;
            R.Hj = R.Ab.getContext("2d");
            R.replace_video = function (fa) {
              Aa.element = fa;
              Aa.Ag.ia = Aa.element;
              return !0;
            };
            R.oc = R.Bb.getContext("2d");
            R.capture_background = function (fa, ia) {
              fa = "undefined" === typeof fa ? B : fa;
              ia = "undefined" === typeof ia ? Q : ia;
              R.Bb.width = fa;
              R.Bb.height = ia;
              var Ha = fa / ia,
                fb = 0,
                vb = 0;
              if (B / Q > Ha) {
                var wb = Q * Ha;
                Ha = Q;
                fb = Math.round((B - wb) / 2);
              } else (wb = B), (Ha = B / Ha), (vb = Math.round((Q - Ha) / 2));
              R.oc.save();
              R.oc.translate(fa, 0);
              R.oc.scale(-1, 1);
              R.oc.drawImage(Aa.element, fb, vb, wb, Ha, 0, 0, fa, ia);
              R.oc.restore();
              fa = document.createElement("canvas");
              fa.width = R.Bb.width;
              fa.height = R.Bb.height;
              fa.getContext("2d").drawImage(R.Bb, 0, 0);
              return fa;
            };
          },
          Nh: function () {
            window.CanvasListeners &&
              (tb.init({ pa: ab.ob() }),
              (R.init_listeners = Ea.Nh),
              (R.add_listener = tb.add_listener),
              (R.remove_listener = tb.remove_listener),
              (R.animate_swipe = tb.animate_swipe),
              (R.switch_modeInteractor = tb.switch_mode),
              (R.get_modeInteractor = tb.get_mode),
              tb
                .add_listener(
                  "move",
                  function (B, Q) {
                    aa === X.W &&
                      (N.xm &&
                        ((Xa.offsetX -= Q[0] * N.ii),
                        (Xa.offsetX = Math.min(
                          Math.max(Xa.offsetX, -N.Dd),
                          N.Dd
                        ))),
                      (Xa.offsetY -= Q[1] * N.ii),
                      (Xa.offsetY = Math.min(
                        Math.max(Xa.offsetY, -N.Dd),
                        N.Dd
                      )),
                      Ea.ae());
                  },
                  !0
                )
                .add_listener(
                  "pinch",
                  function (B, Q) {
                    aa === X.W &&
                      ((Xa.scale += Q * N.ym),
                      (Xa.scale = Math.min(
                        Math.max(Xa.scale, N.ji[0]),
                        N.ji[1]
                      )),
                      Ea.be());
                  },
                  !0
                ));
          },
          Ul: function () {
            return da.m({
              wd: !1,
              Bk: !1,
              expand: !1,
              pa: ab.ob(),
              Mb: ab,
              onload: function () {
                U.yb = bc.instance({
                  Eb: N.aa + N.ua + Za.uo,
                  qc: N.aa + N.ua + Za.vo,
                  pc: Za.Aj,
                  rc: Za.Bj,
                });
                N.Vb
                  ? ((U.cb = bc.instance({})), ta.hb.sa(U.cb))
                  : (U.cb = U.yb);
                sa.sa(U.cb);
                U.Lf = N.Vb ? Vc.instance({ tm: U.cb, rm: U.yb }) : U.yb;
                c();
              },
            });
          },
          pg: function () {
            z ||
              (Ea.Lc(),
              N.Vb && (va.reset(), ta.hb.uk(Aa.ka), ta.hb.tk()),
              (R.ready = !0),
              (ba = 0),
              d(),
              (x = 0),
              (z = !0),
              da.Eg(kc.ll),
              Ea.ce(),
              sa.Xn(),
              R.Sc.forEach(function (B) {
                B();
              }),
              R.Sc.splice(0));
          },
          gi: function (B, Q) {
            B = uc.instance({
              R: function () {
                Ea.pg();
                Q && Q();
              },
              url: B.url,
              Ec: B.Ec,
              Db: B.Db,
              Cb: B.Cb,
            });
            n(B);
          },
          $n: function () {
            if (N.Vb) {
              var B = Object.assign({}, Za, { Yb: N.aa + N.ua + Za.Yb });
              ta.hb.hg(B);
            }
          },
        };
      return Ea;
    }
    function Pb(a) {
      return 3 === arguments.length ? this.lb(arguments) : this.set(a);
    }
    function Ic(a, c) {
      c = Math.floor(c);
      a.r = ((c >> 16) & 255) / 255;
      a.X = ((c >> 8) & 255) / 255;
      a.b = (c & 255) / 255;
    }
    function Wc(a, c) {
      function e(p) {
        void 0 !== p &&
          1 > parseFloat(p) &&
          console.warn(
            "JETHREE.Color: Alpha component of " + c + " will be ignored."
          );
      }
      var d;
      if ((d = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(c))) {
        var n = d[2];
        switch (d[1]) {
          case "rgb":
          case "rgba":
            if (
              (d =
                /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  n
                ))
            ) {
              a.r = Math.min(255, parseInt(d[1], 10)) / 255;
              a.X = Math.min(255, parseInt(d[2], 10)) / 255;
              a.b = Math.min(255, parseInt(d[3], 10)) / 255;
              e(d[5]);
              return;
            }
            if (
              (d =
                /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  n
                ))
            ) {
              a.r = Math.min(100, parseInt(d[1], 10)) / 100;
              a.X = Math.min(100, parseInt(d[2], 10)) / 100;
              a.b = Math.min(100, parseInt(d[3], 10)) / 100;
              e(d[5]);
              return;
            }
            break;
          case "hsl":
          case "hsla":
            if (
              (d =
                /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  n
                ))
            ) {
              n = parseFloat(d[1]) / 360;
              var l = parseInt(d[2], 10) / 100,
                A = parseInt(d[3], 10) / 100;
              e(d[5]);
              a.qn(n, l, A);
              return;
            }
        }
      } else if ((d = /^#([A-Fa-f0-9]+)$/.exec(c))) {
        d = d[1];
        n = d.length;
        if (3 === n) {
          a.r = parseInt(d.charAt(0) + d.charAt(0), 16) / 255;
          a.X = parseInt(d.charAt(1) + d.charAt(1), 16) / 255;
          a.b = parseInt(d.charAt(2) + d.charAt(2), 16) / 255;
          return;
        }
        if (6 === n) {
          a.r = parseInt(d.charAt(0) + d.charAt(1), 16) / 255;
          a.X = parseInt(d.charAt(2) + d.charAt(3), 16) / 255;
          a.b = parseInt(d.charAt(4) + d.charAt(5), 16) / 255;
          return;
        }
      }
      c &&
        0 < c.length &&
        ((d = Xc[c]),
        void 0 !== d
          ? Ic(a, d)
          : console.warn("JETHREE.Color: Unknown color " + c));
    }
    function mc(a, c, e, d) {
      this.B = a || 0;
      this.C = c || 0;
      this.D = e || 0;
      this.O = void 0 !== d ? d : 1;
    }
    function Jc(a, c, e) {
      var d = c.B,
        n = c.C,
        l = c.D;
      c = c.O;
      var A = e.B,
        p = e.C,
        u = e.D;
      e = e.O;
      a.B = d * e + c * A + n * u - l * p;
      a.C = n * e + c * p + l * A - d * u;
      a.D = l * e + c * u + d * p - n * A;
      a.O = c * e - d * A - n * p - l * u;
      return a;
    }
    function Qb(a, c) {
      this.x = a || 0;
      this.y = c || 0;
    }
    function Oa(a, c, e) {
      this.x = a || 0;
      this.y = c || 0;
      this.z = e || 0;
    }
    function Kc(a, c) {
      var e = a.x,
        d = a.y,
        n = a.z;
      a.x = d * c.z - n * c.y;
      a.y = n * c.x - e * c.z;
      a.z = e * c.y - d * c.x;
    }
    function Rb(a, c, e, d) {
      this.B = a || 0;
      this.C = c || 0;
      this.D = e || 0;
      this.Na = d || Rb.Dj;
    }
    function vc(a, c) {
      this.min = void 0 !== a ? a : new Oa(Infinity, Infinity, Infinity);
      this.max = void 0 !== c ? c : new Oa(-Infinity, -Infinity, -Infinity);
    }
    function nc(a) {
      return new Oa().Tc(a.min, a.max).Ba(0.5);
    }
    function Yc(a, c) {
      a.min.min(c);
      a.max.max(c);
    }
    function Sb() {
      this.elements = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ]);
      0 < arguments.length &&
        console.error(
          "JETHREE.Matrix4: the constructor no longer reads arguments. use .set() instead."
        );
    }
    function Lc(a, c, e) {
      var d = c.elements,
        n = e.elements;
      e = a.elements;
      c = d[0];
      var l = d[4],
        A = d[8],
        p = d[12],
        u = d[1],
        t = d[5],
        y = d[9],
        H = d[13],
        C = d[2],
        w = d[6],
        E = d[10],
        k = d[14],
        g = d[3],
        G = d[7],
        I = d[11];
      d = d[15];
      var h = n[0],
        q = n[4],
        f = n[8],
        L = n[12],
        O = n[1],
        v = n[5],
        m = n[9],
        r = n[13],
        M = n[2],
        J = n[6],
        K = n[10],
        P = n[14],
        ba = n[3],
        ja = n[7],
        U = n[11];
      n = n[15];
      e[0] = c * h + l * O + A * M + p * ba;
      e[4] = c * q + l * v + A * J + p * ja;
      e[8] = c * f + l * m + A * K + p * U;
      e[12] = c * L + l * r + A * P + p * n;
      e[1] = u * h + t * O + y * M + H * ba;
      e[5] = u * q + t * v + y * J + H * ja;
      e[9] = u * f + t * m + y * K + H * U;
      e[13] = u * L + t * r + y * P + H * n;
      e[2] = C * h + w * O + E * M + k * ba;
      e[6] = C * q + w * v + E * J + k * ja;
      e[10] = C * f + w * m + E * K + k * U;
      e[14] = C * L + w * r + E * P + k * n;
      e[3] = g * h + G * O + I * M + d * ba;
      e[7] = g * q + G * v + I * J + d * ja;
      e[11] = g * f + G * m + I * K + d * U;
      e[15] = g * L + G * r + I * P + d * n;
      return a;
    }
    function wc(a, c, e, d, n, l) {
      this.a = a;
      this.b = c;
      this.c = e;
      this.Ka = d instanceof Oa ? d : new Oa();
      this.fe = Array.isArray(d) ? d : [];
      this.color = n instanceof Pb ? n : new Pb();
      this.Hg = Array.isArray(n) ? n : [];
      this.Wb = void 0 !== l ? l : 0;
    }
    function Zc(a, c, e) {
      var d = new XMLHttpRequest();
      d.open("GET", a, !0);
      var n = (d.withCredentials = !1);
      d.onreadystatechange = function () {
        404 !== d.status || n || ((n = !0), e && e(404));
        if (4 === d.readyState && 200 === d.status) {
          var l = null;
          try {
            l = JSON.parse(d.responseText);
          } catch (A) {
            e && e(-1);
          }
          c && l && c(l);
        }
      };
      d.onerror = function () {
        e && e(0);
      };
      d.send();
    }
    function xc(a, c, e) {
      "object" === typeof a ? c(a) : Zc(a, c, e);
    }
    function $c(a, c) {
      for (var e = new Oa(), d = new Oa(), n = 0, l = c.length; n < l; n++) {
        var A = c[n],
          p = a[A.a],
          u = a[A.b];
        e.ab(a[A.c], u);
        d.ab(p, u);
        Kc(e, d);
        0 !== e.xf() && (e.normalize(), A.Ka.J(e));
      }
    }
    function ad(a, c) {
      for (var e = Array(a.length), d = 0, n = a.length; d < n; ++d)
        e[d] = new Oa();
      d = new Oa();
      n = new Oa();
      for (var l = 0, A = c.length; l < A; ++l) {
        var p = c[l],
          u = a[p.a],
          t = a[p.b];
        d.ab(a[p.c], t);
        n.ab(u, t);
        Kc(d, n);
        e[p.a].add(d);
        e[p.b].add(d);
        e[p.c].add(d);
      }
      d = 0;
      for (a = a.length; d < a; ++d) e[d].normalize();
      a = 0;
      for (d = c.length; a < d; ++a)
        (n = c[a]),
          (l = n.fe),
          3 === l.length
            ? (l[0].J(e[n.a]), l[1].J(e[n.b]), l[2].J(e[n.c]))
            : ((l[0] = e[n.a].clone()),
              (l[1] = e[n.b].clone()),
              (l[2] = e[n.c].clone()));
      return e;
    }
    function bd(a, c, e, d) {
      function n(L) {
        q.J(c[L]);
        f.J(q);
        var O = p[L];
        I.J(O);
        I.sub(q.Ba(q.cd(O))).normalize();
        var v = f.x,
          m = f.y,
          r = f.z,
          M = O.x,
          J = O.y;
        O = O.z;
        h.x = m * O - r * J;
        h.y = r * M - v * O;
        h.z = v * J - m * M;
        v = 0 > h.cd(u[L]) ? -1 : 1;
        A[4 * L] = I.x;
        A[4 * L + 1] = I.y;
        A[4 * L + 2] = I.z;
        A[4 * L + 3] = v;
      }
      for (
        var l = a.length,
          A = new Float32Array(4 * l),
          p = Array(l),
          u = Array(l),
          t = 0;
        t < l;
        t++
      )
        (p[t] = new Oa()), (u[t] = new Oa());
      var y = new Oa(),
        H = new Oa(),
        C = new Oa(),
        w = new Qb(),
        E = new Qb(),
        k = new Qb(),
        g = new Oa(),
        G = new Oa();
      d.forEach(function (L) {
        var O = L.a,
          v = L.b;
        L = L.c;
        y.J(a[O]);
        H.J(a[v]);
        C.J(a[L]);
        w.J(e[O]);
        E.J(e[v]);
        k.J(e[L]);
        var m = H.x - y.x,
          r = C.x - y.x,
          M = H.y - y.y,
          J = C.y - y.y,
          K = H.z - y.z,
          P = C.z - y.z,
          ba = E.x - w.x,
          ja = k.x - w.x,
          U = E.y - w.y,
          x = k.y - w.y,
          z = 1 / (ba * x - ja * U);
        g.set((x * m - U * r) * z, (x * M - U * J) * z, (x * K - U * P) * z);
        G.set(
          (ba * r - ja * m) * z,
          (ba * J - ja * M) * z,
          (ba * P - ja * K) * z
        );
        p[O].add(g);
        p[v].add(g);
        p[L].add(g);
        u[O].add(G);
        u[v].add(G);
        u[L].add(G);
      });
      var I = new Oa(),
        h = new Oa(),
        q = new Oa(),
        f = new Oa();
      d.forEach(function (L) {
        n(L.a);
        n(L.b);
        n(L.c);
      });
      return A;
    }
    function Mc(a, c, e, d) {
      return Math.sqrt((a - e) * (a - e) + (c - d) * (c - d));
    }
    var T = {
        eh: !0,
        ap: !1,
        bp: !1,
        Ok: !1,
        dh: !1,
        $o: !1,
        Ja: !1,
        Vm: !1,
        wd: !1,
        Jp: !1,
        aa: "",
        Bm: "",
        hk: 700,
        gk: 200,
        fh: !1,
        oo: !1,
        po: !1,
        no: !1,
        Pj: 3,
        Ib: !1,
        Qg: !0,
        Eb: "images/backgrounds/interior2.jpg",
        qc: "images/backgrounds/interior_light.jpg",
        jk: [256, 256, 512, 512],
        pc: 2.1,
        rc: 8,
        ik: [64, 128, 256, 256],
        $l: [60, 96, 160, 250],
        Zl: [8, 12, 18, 40],
        Xb: 2.2,
        Jd: 1,
        xe: 300,
        Ug: 500,
        ye: 50,
        vk: 0,
        wk: 0,
        Qo: 45,
        So: 1,
        Ro: 1e3,
        Vg: 20,
        Eo: 10,
        Fo: 10,
        Go: 5,
        Om: 0.1,
        ui: 20,
        xi: 100,
        yi: 100,
        Nm: -Math.PI / 3,
        Mm: Math.PI / 3,
        wi: 0,
        mj: 0,
        gd: [40, 32, 16, 16],
        Nj: [0, 0.87, 0.92, 0.9],
        Jm: 2,
        Fm: 100,
        da: !1,
        Qj: 16,
        Rj: 0.4,
        Tj: [0.72, 0.73, 0.72, 0.74],
        ck: 1.2,
        $j: [0.5, 0.5, 0.5, 1],
        ek: 140,
        dk: 280,
        fk: 1.2,
        Uj: 20,
        Vj: 40,
        bk: [6, 9, 9, 12],
        Zj: [0.03, 0.02, 0.02, 0.018],
        Yj: [0.35, 0.35, 0.4, 0.5],
        Wj: [0.2, 0.2, 0.2, 0.2],
        Sj: [0.1, 0.15, 0.15, 0.15],
        ak: [200, 200, 150, 120],
        Xj: [1, 2, 3, 5],
        Tn: 1.1,
        Zp: [0.25, 0.5, 1, 2],
        $p: 256,
        Yp: 256,
        Xp: 200,
        Un: [40, 80, 200, 500],
        Vn: [35, 45, 80, 120],
        Ik: !0,
        Jk: "CCW",
      },
      Nc = {},
      ca = (function () {
        function a(v, m, r) {
          m = v.createShader(m);
          v.shaderSource(m, r);
          v.compileShader(m);
          return v.getShaderParameter(m, v.COMPILE_STATUS) ? m : !1;
        }
        function c(v, m, r) {
          m = a(v, v.VERTEX_SHADER, m);
          r = a(v, v.FRAGMENT_SHADER, r);
          v === b && p.push(m, r);
          var M = v.createProgram();
          v.attachShader(M, m);
          v.attachShader(M, r);
          v.linkProgram(M);
          return M;
        }
        function e(v) {
          return ["float", "sampler2D", "int"]
            .map(function (m) {
              return "precision " + v + " " + m + ";\n";
            })
            .join("");
        }
        function d(v, m) {
          m.ba = m.ba ? !0 : !1;
          if (!m.ba) {
            m.s =
              m.s ||
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}";
            m.I = m.I || ["a0"];
            m.P = m.P || [2];
            m.precision = m.precision || C;
            m.id = y++;
            void 0 !== m.Ni &&
              (m.Ni.forEach(function (J, K) {
                m.h = m.h.replace(J, m.Da[K]);
              }),
              m.Ni.splice(0));
            m.Ig = 0;
            m.P.forEach(function (J) {
              m.Ig += 4 * J;
            });
            var r = e(m.precision);
            m.na = c(v, r + m.s, r + m.h);
            m.A = {};
            m.i.forEach(function (J) {
              m.A[J] = v.getUniformLocation(m.na, J);
            });
            m.attributes = {};
            m.va = [];
            m.I.forEach(function (J) {
              var K = v.getAttribLocation(m.na, J);
              m.attributes[J] = K;
              m.va.push(K);
            });
            if (m.u) {
              v.useProgram(m.na);
              t = m;
              u = m.id;
              for (var M in m.u) v.uniform1i(m.A[M], m.u[M]);
            }
            m.Ha = !0;
          }
        }
        function n(v) {
          ob.bj(O);
          u !== v.id &&
            (O.H(),
            (u = v.id),
            (t = v),
            b.useProgram(v.na),
            v.va.forEach(function (m) {
              0 !== m && b.enableVertexAttribArray(m);
            }));
        }
        function l(v, m, r) {
          d(v, m, r);
          v.useProgram(m.na);
          v.enableVertexAttribArray(m.attributes.a0);
          u = -1;
          return (t = m);
        }
        function A() {
          return {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            u: { u1: 0 },
          };
        }
        var p = [],
          u = -1,
          t = null,
          y = 0,
          H = !1,
          C = "highp",
          w = ["u1"],
          E = ["u0"],
          k = { u1: 0 },
          g = { u0: 0 },
          G = { u1: 0, u2: 1 },
          I = { u3: 0 },
          h = {
            s0: A(),
            s1: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              i: w,
              u: k,
              precision: "lowp",
            },
            s2: {
              h: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
              i: ["u1", "u2"],
              u: G,
            },
            s3: {
              h: "uniform sampler2D u1;uniform vec2 u4,u5;varying vec2 vv0;void main(){vec2 a=vv0*u4+u5;gl_FragColor=texture2D(u1,a);}",
              i: ["u1", "u4", "u5"],
              u: k,
              ba: !0,
            },
            s4: {
              h: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
              i: w,
              u: k,
            },
            s5: {
              h: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
              i: ["u1", "u2"],
              u: G,
            },
            s6: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
              i: w,
              u: k,
            },
            s7: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
              i: w,
              u: k,
            },
            s8: {
              h: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
              i: ["u0", "u4"],
              u: g,
            },
            s9: {
              h: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,f);gl_FragColor=b*g;}",
              i: ["u0", "u4"],
              u: g,
            },
            s10: {
              h: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
              i: w,
              u: k,
            },
            s11: {
              h: "uniform sampler2D u1,u6;uniform float u7;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u6,vv0);gl_FragColor=mix(b,a,u7*f);}",
              i: ["u1", "u6", "u7"],
              u: { u1: 0, u6: 1 },
            },
            s12: {
              h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u8)+texture2D(u1,vv0+u8*vec2(1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,1.)));}",
              i: ["u1", "u8"],
              u: k,
            },
            s13: {
              h: "uniform sampler2D u1;uniform vec4 u9;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u9);gl_FragColor=j(a);}",
              i: ["u1", "u9"],
              u: k,
            },
            s14: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
              i: E,
              u: g,
              ba: !0,
            },
            s15: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
              i: E,
              u: g,
            },
            s16: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
              i: E,
              u: g,
            },
            s17: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
              i: E,
              u: g,
            },
            s18: {
              h: "uniform sampler2D u0,u7,u10;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u7,vv0),d=texture2D(u10,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
              i: ["u0", "u7", "u10"],
              u: { u0: 0, u7: 1, u10: 2 },
              ba: !0,
            },
            s19: {
              h: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
              i: E,
              u: g,
            },
            s20: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(f+a);gl_FragColor=b;}",
              i: E,
              u: g,
              ba: !0,
            },
            s21: {
              h: "uniform sampler2D u0,u11;uniform float u12;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,e);float b=u12*u12;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
              i: ["u0", "u11", "u12"],
              u: { u0: 0, u11: 1 },
              ba: !0,
            },
            s22: {
              h: "uniform sampler2D u1;uniform vec2 u13;varying vec2 vv0;void main(){float a=u13.x*u13.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u13.y),f=floor(u13.x*fract(b*u13.y)),g=(f*u13.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
              i: ["u1", "u13"],
              u: k,
            },
            s23: {
              h: "uniform sampler2D u14,u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u16,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u14,b),f=texture2D(u15,c);gl_FragColor=d*f;}",
              i: ["u14", "u15", "u16"],
              u: { u15: 0, u14: 1, u16: 2 },
              ba: !0,
            },
            s24: {
              h: "uniform float u17;uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec2 a=fract(vv0*u17);vec4 b=texture2D(u14,vv0),c=texture2D(u15,a);gl_FragColor=b*c;}",
              i: ["u15", "u14", "u17"],
              u: { u15: 0, u14: 1 },
            },
            s25: {
              h: "uniform float u17;uniform sampler2D u14,u15,u18,u19,u20,u21;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 h=vv0*u17,l=floor(h),c=h-l;vec4 m=texture2D(u14,vv0),d=texture2D(u15,c),a=texture2D(u21,vv0);a=a*255.;vec4 n=texture2D(u18,c),o=texture2D(u19,c),p=texture2D(u20,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b;d=i*d+j*n+k*o+q*p,gl_FragColor=m*d;}",
              i: "u14 u15 u17 u21 u18 u19 u20".split(" "),
              u: { u15: 0, u14: 1, u21: 3, u18: 4, u19: 5, u20: 6 },
              ba: !0,
            },
            s26: {
              h: "uniform sampler2D u14,u15,u22;uniform float u17,u23,u24,u25;varying vec2 vv0;const vec2 j=vec2(1.,1.),k=vec2(0.,0.);void main(){vec2 b=floor(u23*vv0),c=u23*vv0-b;float d=u17/u23;vec2 f=floor(c*d),g=c*d-f,h=(b+g)/u23;float l=u23*u25/u17;vec2 m=l*f,a=(m+g*u24)/u25;a+=.25/u25;vec2 i=step(a,j)*step(k,a);vec4 n=texture2D(u14,h),o=texture2D(u15,a),p=n*o,q=texture2D(u22,h);gl_FragColor=(p*u24*u24+q)*i.x*i.y;}",
              i: "u14 u15 u17 u23 u24 u25 u22".split(" "),
              u: { u15: 0, u14: 1, u22: 2 },
            },
            s27: {
              h: "uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u14,vv0),b=texture2D(u15,vv0);gl_FragColor=a*b;}",
              i: ["u14", "u15"],
              u: { u15: 0, u14: 1 },
              ba: !0,
            },
            s28: {
              h: "uniform sampler2D u1,u22;uniform float u26;varying vec2 vv0;void main(){gl_FragColor=texture2D(u22,vv0)+u26*texture2D(u1,vv0);}",
              i: ["u1", "u22", "u26"],
              u: { u1: 0, u22: 1 },
            },
            s29: {
              h: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
              i: w,
              u: k,
              precision: "lowp",
            },
            s30: {
              h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
              i: ["u1", "u27"],
              u: k,
              precision: "lowp",
            },
            s31: {
              h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
              i: ["u1", "u27"],
              u: k,
              precision: "lowp",
            },
            s32: {
              h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
              i: ["u1", "u2", "u28"],
              u: G,
              ba: !0,
            },
            s33: {
              h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u28,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
              i: ["u1", "u2", "u28"],
              u: G,
              ba: !0,
            },
            s34: {
              h: "uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u8*g;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*h),d=texture2D(u3,a+u8*i),j=texture2D(u3,a+u8),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
              i: ["u3", "u8"],
              u: I,
            },
            s35: {
              h: "uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*k),d=texture2D(u3,a+u8*l),g=texture2D(u3,a+u8),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u8*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u8*m),d=f(a+u8*2.),g=f(a+u8*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}",
              i: ["u3", "u8"],
              u: I,
              ba: !0,
            },
            s36: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
              i: ["u1"],
              u: k,
              precision: "lowp",
              ba: !0,
            },
            s37: {
              h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u8)+2002./e*texture2D(u1,vv0-2.*u8)+3003./e*texture2D(u1,vv0-u8)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u8)+2002./e*texture2D(u1,vv0+2.*u8)+1001./e*texture2D(u1,vv0+3.*u8);gl_FragColor=a;}",
              i: ["u8", "u1"],
              u: k,
              precision: "lowp",
              ba: !0,
            },
            s38: {
              h: "uniform sampler2D u1,u11,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u11,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
              i: ["u1", "u11", "u29"],
              u: { u1: 0, u11: 1, u29: 2 },
              ba: !0,
            },
          },
          q = {
            s39: {
              h: "uniform float u17,u30;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u22,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u17,xyTo=floor(vv0*u17+eps2);float weightSize=toSparsity*u17;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u17,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: ["u17", "u14", "u15", "u22", "u30"],
              Da: ["1.1111", "gl_FragColor\\*=2.2222;"],
            },
            s40: {
              h: "uniform float u17,u30,u25;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u22,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u25,xyTo=floor(vv0*u17+eps2);float weightSize=fromSparsity*u25;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u17;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u25,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: "u17 u25 u14 u15 u22 u30".split(" "),
              Da: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
            },
          },
          f = null,
          L = null,
          O = {
            Ub: function () {
              return H;
            },
            m: function () {
              if (!H) {
                f = La(h, 2);
                L = La(q, 2);
                C = "highp";
                b.getShaderPrecisionFormat &&
                  (b.getShaderPrecisionFormat(
                    b.FRAGMENT_SHADER,
                    b.MEDIUM_FLOAT
                  ),
                  b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT));
                for (var v in f) d(b, f[v], v);
                ca.set("s0");
                b.enableVertexAttribArray(0);
                H = !0;
              }
            },
            re: function (v) {
              v.forEach(function (m) {
                O.oa(m);
              });
            },
            oa: function (v) {
              f[v.id] = v;
              d(b, v, v.id);
            },
            Oh: function (v, m, r) {
              m || (m = v);
              f[m] = Object.create(L[v]);
              f[m].fm = !0;
              L[v].Da &&
                L[v].Da.forEach(function (M, J) {
                  f[m].h = f[m].h.replace(new RegExp(M, "g"), r[J]);
                });
              d(b, f[m], m);
            },
            set: function (v) {
              var m = f[v];
              m.ba && ((m.ba = !1), d(b, m, v));
              n(m);
            },
            ub: function (v) {
              return l(v, A(), "s41");
            },
            Pd: function (v) {
              return l(
                v,
                {
                  h: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                  i: [],
                  precision: C,
                },
                "s42"
              );
            },
            kl: function (v) {
              return "undefined" === typeof f[v] ? !1 : f[v].Ha;
            },
            H: function () {
              -1 !== u &&
                ((u = -1),
                t.va.forEach(function (v) {
                  0 !== v && b.disableVertexAttribArray(v);
                }));
            },
            Rd: function () {
              var v = 0;
              t.va.forEach(function (m, r) {
                r = t.P[r];
                b.vertexAttribPointer(m, r, b.FLOAT, !1, t.Ig, v);
                v += 4 * r;
              });
            },
            jl: function () {
              b.enableVertexAttribArray(0);
            },
            ac: function () {
              O.bc(b);
            },
            bc: function (v) {
              v.vertexAttribPointer(t.va[0], 2, v.FLOAT, !1, 8, 0);
            },
            Qd: function (v, m) {
              b.uniform1i(t.A[v], m);
            },
            G: function (v, m) {
              b.uniform1f(t.A[v], m);
            },
            N: function (v, m, r) {
              b.uniform2f(t.A[v], m, r);
            },
            cj: function (v, m) {
              b.uniform2fv(t.A[v], m);
            },
            lg: function (v, m) {
              b.uniform3fv(t.A[v], m);
            },
            kg: function (v, m, r, M) {
              b.uniform3f(t.A[v], m, r, M);
            },
            Nn: function (v, m, r, M, J) {
              b.uniform4f(t.A[v], m, r, M, J);
            },
            xa: function (v, m) {
              b.uniform4fv(t.A[v], m);
            },
            On: function (v, m) {
              b.uniformMatrix2fv(t.A[v], !1, m);
            },
            Pn: function (v, m) {
              b.uniformMatrix3fv(t.A[v], !1, m);
            },
            Jc: function (v, m) {
              b.uniformMatrix4fv(t.A[v], !1, m);
            },
            j: function (v, m) {
              O.set(v);
              m.forEach(function (r) {
                switch (r.type) {
                  case "4f":
                    b.uniform4fv(t.A[r.name], r.value);
                    break;
                  case "3f":
                    b.uniform3fv(t.A[r.name], r.value);
                    break;
                  case "2f":
                    b.uniform2fv(t.A[r.name], r.value);
                    break;
                  case "1f":
                    b.uniform1f(t.A[r.name], r.value);
                    break;
                  case "1i":
                    b.uniform1i(t.A[r.name], r.value);
                    break;
                  case "mat2":
                    b.uniformMatrix2fv(t.A[r.name], !1, r.value);
                    break;
                  case "mat3":
                    b.uniformMatrix3fv(t.A[r.name], !1, r.value);
                    break;
                  case "mat4":
                    b.uniformMatrix4fv(t.A[r.name], !1, r.value);
                }
              });
            },
            qp: function () {
              return "lowp";
            },
            v: function () {
              O.H();
              b.disableVertexAttribArray(0);
              for (var v in f) {
                var m = f[v];
                m.Ha && ((m.Ha = !1), b.deleteProgram(m.na));
                m.fm && delete f[v];
              }
              p.forEach(function (r) {
                b.deleteShader(r);
              });
              p.splice(0);
              y = 0;
              H = !1;
              t = null;
              u = -1;
            },
          };
        return O;
      })(),
      b = null,
      ab = (function () {
        function a(w) {
          console.log("ERROR in ContextFF: ", w);
          return !1;
        }
        function c() {
          return (
            navigator.userAgent &&
            -1 !== navigator.userAgent.indexOf("forceWebGL1")
          );
        }
        function e(w) {
          function E() {
            Bb.v();
            xa.reset();
            g.getExtension("WEBGL_lose_context").loseContext();
          }
          if (c()) return !1;
          var k = document.createElement("canvas");
          k.setAttribute("width", 5);
          k.setAttribute("height", 5);
          var g = null;
          try {
            g = k.getContext("webgl2", w);
          } catch (G) {
            return !1;
          }
          if (!g) return !1;
          d(g);
          xa.nh(g);
          w = xa.Le(g);
          if (!w.Ra && !w.Ta) return E(), !1;
          w = Bb.Wg(g, w);
          E();
          return w ? !0 : !1;
        }
        function d(w) {
          w.clearColor(0, 0, 0, 0);
          w.disable(w.DEPTH_TEST);
          w.disable(w.BLEND);
          w.disable(w.DITHER);
          w.disable(w.STENCIL_TEST);
          w.disable(w.CULL_FACE);
          w.GENERATE_MIPMAP_HINT && w.hint(w.GENERATE_MIPMAP_HINT, w.FASTEST);
          w.disable(w.SAMPLE_ALPHA_TO_COVERAGE);
          w.disable(w.SAMPLE_COVERAGE);
          w.depthFunc(w.LEQUAL);
          w.clearDepth(1);
        }
        var n = null,
          l = null,
          A = null,
          p = null,
          u = !0,
          t = null,
          y = null,
          H = [],
          C = {
            L: function () {
              return n.width;
            },
            Y: function () {
              return n.height;
            },
            ob: function () {
              return n;
            },
            ol: function () {
              return b;
            },
            ja: function () {
              return u;
            },
            flush: function () {
              b.flush();
            },
            yp: function () {
              va.fa();
              Z.reset();
              Y.reset();
              ca.H();
              ca.jl();
              b.disable(b.DEPTH_TEST);
              b.disable(b.BLEND);
              Y.Zc();
              ca.ac();
            },
            tl: function () {
              t || (t = new Uint8Array(n.width * n.height * 4));
              b.readPixels(0, 0, n.width, n.height, b.RGBA, b.UNSIGNED_BYTE, t);
              return t;
            },
            lp: function () {
              return n.toDataURL("image/jpeg");
            },
            mp: function () {
              va.$();
              l ||
                ((l = document.createElement("canvas")),
                (A = l.getContext("2d")));
              l.width = n.width;
              l.height = n.height;
              for (
                var w = C.tl(),
                  E = A.createImageData(l.width, l.height),
                  k = l.width,
                  g = l.height,
                  G = E.data,
                  I = 0;
                I < g;
                ++I
              )
                for (var h = g - I - 1, q = 0; q < k; ++q) {
                  var f = 4 * (I * k + q),
                    L = 4 * (h * k + q);
                  G[f] = w[L];
                  G[f + 1] = w[L + 1];
                  G[f + 2] = w[L + 2];
                  G[f + 3] = w[L + 3];
                }
              A.putImageData(E, 0, 0);
              return l.toDataURL("image/png");
            },
            zh: function (w) {
              !l &&
                w &&
                ((l = document.createElement("canvas")),
                (A = l.getContext("2d")));
              var E = w ? l : document.createElement("canvas");
              E.width = n.width;
              E.height = n.height;
              (w ? A : E.getContext("2d")).drawImage(n, 0, 0);
              return E;
            },
            m: function (w) {
              w = Object.assign(
                {
                  Sa: null,
                  Qf: null,
                  pa: null,
                  Ee: null,
                  width: 512,
                  height: 512,
                  premultipliedAlpha: !1,
                  cm: !0,
                  antialias: !1,
                  debug: !1,
                  Zo: !1,
                },
                w
              );
              w.Sa
                ? ((b = w.Sa), (n = w.Sa.canvas))
                : w.Ee && !w.pa
                ? (n = document.getElementById(w.Ee))
                : w.pa && (n = w.pa);
              n || (n = document.createElement("canvas"));
              n.width = w.width;
              n.height = w.height;
              if (b) u = b instanceof WebGL2RenderingContext;
              else {
                u = !0;
                var E = {
                  antialias: w.antialias,
                  alpha: !0,
                  preserveDrawingBuffer: !0,
                  premultipliedAlpha: w.premultipliedAlpha,
                  stencil: !1,
                  depth: w.cm,
                  failIfMajorPerformanceCaveat: !0,
                  powerPreference: "high-performance",
                };
                navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                  (E.antialias = !1);
                var k = e(E);
                k || !E.antialias || c() || ((E.antialias = !1), (k = e(E)));
                k && (b = n.getContext("webgl2", E));
                b
                  ? (u = !0)
                  : ((b = n.getContext("webgl", E)) ||
                      (b = n.getContext("experimental-webgl", E)),
                    (u = !1));
              }
              if (!b) return a("WebGL1 and 2 are not enabled");
              w.Qf &&
                n.addEventListener &&
                (p = b.getExtension("WEBGL_lose_context")) &&
                ((y = w.Qf), n.addEventListener("webglcontextlost", y, !1));
              if (!xa.m()) return a("Not enough GL capabilities");
              d(b);
              ca.m();
              Y.m();
              Bb.Wg(b, xa.ql());
              H.forEach(function (g) {
                g(b);
              });
              H.splice(0);
              return !0;
            },
            Po: function () {
              return new Promise(function (w) {
                b ? w(b) : H.push(w);
              });
            },
            v: function () {
              b && (xa.v(), ca.v(), Bb.v());
              p &&
                y &&
                (n.removeEventListener("webglcontextlost", y, !1),
                (p = y = null));
              b = t = A = l = n = null;
              H.splice(0);
            },
          };
        return C;
      })(),
      ob = (function () {
        function a() {
          null === c &&
            ("undefined" !== typeof ca
              ? (c = ca)
              : "undefined" !== typeof F && (c = F));
        }
        var c = null;
        return {
          reset: function () {
            c = null;
          },
          bj: function (e) {
            c !== e && (c && c.H(), (c = e));
          },
          Ub: function () {
            return c.Ub();
          },
          ac: function () {
            return c.ac();
          },
          bc: function (e) {
            return c.bc(e);
          },
          Rd: function () {
            return c.Rd();
          },
          H: function () {
            return c.H();
          },
          set: function (e) {
            a();
            return c.set(e);
          },
          ub: function (e) {
            a();
            return c.ub(e);
          },
          Pd: function (e) {
            a();
            return c.Pd(e);
          },
        };
      })(),
      Z = (function () {
        function a(r) {
          b.bindTexture(b.TEXTURE_2D, r);
        }
        function c(r) {
          var M = new Uint16Array(r.length);
          r.forEach(function (J, K) {
            L[0] = J;
            var P = O[0];
            var ba = (P >> 16) & 32768;
            J = (P >> 12) & 2047;
            var ja = (P >> 23) & 255;
            P =
              103 > ja
                ? ba
                : 142 < ja
                ? ba | 31744 | ((255 == ja ? 0 : 1) && P & 8388607)
                : 113 > ja
                ? ((J |= 2048),
                  ba | ((J >> (114 - ja)) + ((J >> (113 - ja)) & 1)))
                : (ba | ((ja - 112) << 10) | (J >> 1)) + (J & 1);
            M[K] = P;
          });
          return M;
        }
        function e() {
          if (null !== v.lf) return v.lf;
          var r = d(c([0.5, 0.5, 0.5, 0.5]), !0);
          return null === r ? !0 : (v.lf = r);
        }
        function d(r, M) {
          if (!ob.Ub() || !w) return null;
          var J = null,
            K = Math.sqrt(r.length / 4);
          try {
            var P = b.getError();
            if ("FUCKING_BIG_ERROR" === P) return !1;
            J = m.instance({ isFloat: !1, S: M, array: r, width: K });
            P = b.getError();
            if (P !== b.NO_ERROR) return !1;
          } catch (ba) {
            return !1;
          }
          va.$();
          b.viewport(0, 0, K, K);
          b.clearColor(0, 0, 0, 0);
          b.clear(b.COLOR_BUFFER_BIT);
          ob.set("s0");
          J.Oa(0);
          Y.l(!0, !0);
          r = 4 * K * K;
          M = new Uint8Array(r);
          b.readPixels(0, 0, K, K, b.RGBA, b.UNSIGNED_BYTE, M);
          K = !0;
          for (P = 0; P < r; ++P) K = K && 3 > Math.abs(M[P] - 127);
          J.remove();
          va.fa();
          return K;
        }
        var n = 0,
          l = null,
          A = 0,
          p = null,
          u = null,
          t = null,
          y = null,
          H = null,
          C = null,
          w = !1,
          E = [],
          k = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            ia: null,
            Hh: null,
            dm: !1,
            S: !1,
            R: null,
            F: 4,
            Jf: 0,
          },
          g = !1,
          G = null,
          I = null,
          h = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
          ],
          q = !1,
          f = !1,
          L = new Float32Array(1),
          O = new Int32Array(L.buffer),
          v = { lf: null, mf: null },
          m = {
            m: function () {
              w ||
                ((H = [b.RGBA, null, b.RGBA, b.RGBA]),
                (C = [b.RGBA, null, b.RGBA, b.RGBA]),
                (l = [
                  b.TEXTURE0,
                  b.TEXTURE1,
                  b.TEXTURE2,
                  b.TEXTURE3,
                  b.TEXTURE4,
                  b.TEXTURE5,
                  b.TEXTURE6,
                  b.TEXTURE7,
                ]),
                (q = "undefined" !== typeof da),
                (f = "undefined" !== typeof xa),
                (p = [-1, -1, -1, -1, -1, -1, -1, -1]),
                (y = [b.UNSIGNED_BYTE, b.FLOAT, b.FLOAT]),
                (w = !0));
            },
            Vl: function () {
              if (!u) {
                for (var r = new Float32Array(16384), M = 0; 16384 > M; ++M)
                  r[M] = 2 * Math.random() - 1;
                u = {
                  random: m.instance({
                    isFloat: !0,
                    isPot: !0,
                    array: r,
                    width: 64,
                  }),
                  qj: m.instance({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0]),
                  }),
                };
              }
              m.jo();
            },
            Gh: function () {
              return u.qj;
            },
            jo: function () {
              y[1] = xa.Ye(b);
            },
            In: function () {
              C = H = [b.RGBA, b.RGBA, b.RGBA, b.RGBA];
            },
            Gi: function (r) {
              ca.set("s1");
              va.$();
              var M = r.L(),
                J = r.Y();
              b.viewport(0, 0, M, J);
              r.g(0);
              Y.l(!1, !1);
            },
            Kp: function (r, M) {
              m.Gi(r);
              b.readPixels(0, 0, r.L(), r.Y(), b.RGBA, b.UNSIGNED_BYTE, M);
            },
            Lp: function (r, M) {
              m.Gi(r);
              return xa.Zf(0, 0, r.L(), r.Y(), M);
            },
            uh: function (r, M, J, K, P, ba, ja) {
              r.activeTexture(r.TEXTURE0);
              var U = r.createTexture();
              r.bindTexture(r.TEXTURE_2D, U);
              P = P instanceof Float32Array ? P : new Float32Array(P);
              r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE);
              r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE);
              r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST);
              r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST);
              r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, ba);
              r.texImage2D(
                r.TEXTURE_2D,
                0,
                r.RGBA,
                J,
                K,
                0,
                r.RGBA,
                r.FLOAT,
                P
              );
              r.bindTexture(r.TEXTURE_2D, null);
              r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1);
              ja && (va.fa(), ca.ub(r));
              r.viewport(0, 0, J, K);
              r.framebufferTexture2D(
                r.FRAMEBUFFER,
                r.COLOR_ATTACHMENT0,
                r.TEXTURE_2D,
                M,
                0
              );
              r.bindTexture(r.TEXTURE_2D, U);
              ja ? Y.l(!0, !0) : Y.Kb(r);
              r.deleteTexture(U);
              w && ((p[0] = -1), (t = null), (n = 0));
            },
            qe: function (r) {
              r !== n && (b.activeTexture(l[r]), (n = r));
            },
            instance: function (r) {
              function M() {
                ka = void 0 !== x.ia.videoWidth ? x.ia.videoWidth : x.ia.width;
                la =
                  void 0 !== x.ia.videoHeight ? x.ia.videoHeight : x.ia.height;
              }
              function J(B) {
                var Q = b.getError();
                if ("FUCKING_BIG_ERROR" === Q) return !1;
                b.texImage2D(b.TEXTURE_2D, 0, Wa, Ta, Va, B);
                Q = b.getError();
                Q !== b.NO_ERROR &&
                  Ta !== b.RGBA &&
                  ((Ta = b.RGBA), b.texImage2D(b.TEXTURE_2D, 0, Wa, Ta, Va, B));
                return !0;
              }
              function K() {
                if (!V) {
                  a(oa);
                  jb && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, jb);
                  x.isPot
                    ? (b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_S,
                        x.isMirrorX ? b.MIRRORED_REPEAT : b.REPEAT
                      ),
                      b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_T,
                        x.isMirrorY ? b.MIRRORED_REPEAT : b.REPEAT
                      ))
                    : (b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_S,
                        b.CLAMP_TO_EDGE
                      ),
                      b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_WRAP_T,
                        b.CLAMP_TO_EDGE
                      ));
                  x.isAnisotropicFiltering &&
                    "undefined" !== typeof T &&
                    b.texParameterf(
                      b.TEXTURE_2D,
                      da.ul().TEXTURE_MAX_ANISOTROPY_EXT,
                      T.Pj
                    );
                  b.texParameteri(
                    b.TEXTURE_2D,
                    b.TEXTURE_MAG_FILTER,
                    x.isLinear ? b.LINEAR : b.NEAREST
                  );
                  x.isLinear
                    ? b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_MIN_FILTER,
                        x.isMipmap && !ib ? b.NEAREST_MIPMAP_LINEAR : b.LINEAR
                      )
                    : b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_MIN_FILTER,
                        x.isMipmap && !ib ? b.NEAREST_MIPMAP_NEAREST : b.NEAREST
                      );
                  Ta = H[x.F - 1];
                  Wa = C[x.F - 1];
                  Va = y[D];
                  if (xa.ja()) {
                    var B = xa.wl();
                    Ta === b.RGBA && Va === b.FLOAT
                      ? x.isMipmap || x.isLinear
                        ? (Wa = Bb.yl(b))
                        : xa.ea()
                        ? B && (Wa = B)
                        : (Wa = b.RGBA16F || b.RGBA)
                      : Ta === b.RGB &&
                        Va === b.FLOAT &&
                        B &&
                        ((Wa = B), (Ta = b.RGBA));
                  }
                  if (
                    (x.S && !x.isFloat) ||
                    (x.isFloat && x.isMipmap && Bb.mm())
                  )
                    (Wa = xa.xl()), (Va = xa.Ye(b));
                  x.Jf && (qb = x.Jf);
                  x.isSrgb && 4 === x.F && (Ta = da.Ml());
                  if (x.ia) J(x.ia);
                  else if (x.url) J(Ma);
                  else if (Da) {
                    B = Da;
                    try {
                      "FUCKING_BIG_ERROR" !== b.getError() &&
                        (b.texImage2D(
                          b.TEXTURE_2D,
                          0,
                          Wa,
                          ka,
                          la,
                          0,
                          Ta,
                          Va,
                          B
                        ),
                        b.getError() !== b.NO_ERROR &&
                          (b.texImage2D(
                            b.TEXTURE_2D,
                            0,
                            Wa,
                            ka,
                            la,
                            0,
                            Ta,
                            Va,
                            null
                          ),
                          b.getError() !== b.NO_ERROR &&
                            b.texImage2D(
                              b.TEXTURE_2D,
                              0,
                              b.RGBA,
                              ka,
                              la,
                              0,
                              b.RGBA,
                              b.UNSIGNED_BYTE,
                              null
                            )));
                    } catch (fb) {
                      b.texImage2D(
                        b.TEXTURE_2D,
                        0,
                        Wa,
                        ka,
                        la,
                        0,
                        Ta,
                        Va,
                        null
                      );
                    }
                    x.isKeepArray || (Da = null);
                  } else
                    (B = b.getError()),
                      "FUCKING_BIG_ERROR" !== B &&
                        (b.texImage2D(
                          b.TEXTURE_2D,
                          0,
                          Wa,
                          ka,
                          la,
                          0,
                          Ta,
                          Va,
                          null
                        ),
                        (B = b.getError()),
                        B !== b.NO_ERROR &&
                          ((Ta = b.RGBA),
                          x.S &&
                            Va !== b.FLOAT &&
                            ((Va = b.FLOAT),
                            b.texImage2D(
                              b.TEXTURE_2D,
                              0,
                              Wa,
                              ka,
                              la,
                              0,
                              Ta,
                              Va,
                              null
                            ))));
                  if (x.isMipmap)
                    if (!ib && Na) Na.nd(), (rb = !0);
                    else if (ib) {
                      B = Math.log2(Math.min(ka, la));
                      nb = Array(1 + B);
                      nb[0] = oa;
                      for (var Q = 1; Q <= B; ++Q) {
                        var fa = Math.pow(2, Q),
                          ia = ka / fa;
                        fa = la / fa;
                        var Ha = b.createTexture();
                        a(Ha);
                        b.texParameteri(
                          b.TEXTURE_2D,
                          b.TEXTURE_MIN_FILTER,
                          b.NEAREST
                        );
                        b.texParameteri(
                          b.TEXTURE_2D,
                          b.TEXTURE_MAG_FILTER,
                          b.NEAREST
                        );
                        b.texImage2D(
                          b.TEXTURE_2D,
                          0,
                          Wa,
                          ia,
                          fa,
                          0,
                          Ta,
                          Va,
                          null
                        );
                        a(null);
                        nb[Q] = Ha;
                      }
                      rb = !0;
                    }
                  a(null);
                  p[n] = -1;
                  jb && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                  Ba = !0;
                  x.R && Na && (x.R(Na), (x.R = null));
                }
              }
              function P() {
                for (
                  var B = ka * la, Q = 2 * B, fa = 3 * B, ia = 0;
                  ia < B;
                  ++ia
                )
                  (ra[0][ia] = sb[ia]),
                    (ra[1][ia] = sb[ia + B]),
                    (ra[2][ia] = sb[ia + Q]),
                    (ra[3][ia] = sb[ia + fa]);
              }
              function ba() {
                var B = ka * la * 4;
                Ga = [
                  new Uint8Array(B),
                  new Uint8Array(B),
                  new Uint8Array(B),
                  new Uint8Array(B),
                ];
                ra = [
                  new Float32Array(Ga[0].buffer),
                  new Float32Array(Ga[1].buffer),
                  new Float32Array(Ga[2].buffer),
                  new Float32Array(Ga[3].buffer),
                ];
                Ia = new Uint8Array(4 * B);
                sb = new Float32Array(Ia.buffer);
                ha = !0;
              }
              function ja() {
                U = new Uint8Array(ka * la * 4);
                Xa = new Float32Array(U.buffer);
                Fb = !0;
              }
              var U,
                x = Object.assign({}, k, r),
                z = A++;
              null === x.isFlipY && (x.isFlipY = x.url ? !0 : !1);
              x.data &&
                ((x.array =
                  "string" === typeof x.data
                    ? hb(x.data)
                    : x.isFloat
                    ? new Float32Array(x.data)
                    : new Uint8Array(x.data)),
                (x.isFlipY = !1));
              var D = 0,
                S = x.ia ? !0 : !1,
                ea = null,
                X = null,
                aa = !1;
              x.S = x.S || x.isFloat;
              x.S && (D = 1);
              !x.dm && x.isFloat && f && !xa.ea() && (x.isFloat = !1);
              x.isFloat && (D = 2);
              x.isAnisotropicFiltering &&
                q &&
                !da.lm() &&
                (x.isAnisotropicFiltering = !1);
              var oa = x.Hh || b.createTexture(),
                Ma = null,
                Da = !1,
                ka = 0,
                la = 0,
                Ba = !1,
                V = !1,
                ha = !1,
                ra = null,
                Ga = null,
                Ia = null,
                sb = null,
                Wa = null,
                Ta = null,
                Va = null,
                jb = x.isFlipY,
                lc = (r = x.S && x.isMipmap) && Bb.yk(),
                ib = r && lc ? !0 : !1,
                nb = null,
                qb = -1,
                rb = !1,
                Fb = !1,
                Xa = (U = null);
              x.width && ((ka = x.width), (la = x.height ? x.height : ka));
              var Na = {
                get: function () {
                  return oa;
                },
                L: function () {
                  return ka;
                },
                Y: function () {
                  return la;
                },
                Ol: function () {
                  return x.url;
                },
                $h: function () {
                  return x.isFloat;
                },
                ai: function () {
                  return x.S;
                },
                Dp: function () {
                  return x.isLinear;
                },
                nd: function () {
                  b.generateMipmap(b.TEXTURE_2D);
                },
                pk: function (B, Q) {
                  ib
                    ? (B || (B = Na.Eh()), m.qe(Q), a(nb[B]), (p[Q] = -1))
                    : Na.g(Q);
                },
                Eh: function () {
                  -1 === qb && (qb = Math.log(ka) / Math.log(2));
                  return qb;
                },
                nl: function (B) {
                  if (ib) {
                    B || (B = Na.Eh());
                    ca.set("s12");
                    m.qe(0);
                    for (var Q = ka, fa = la, ia = 1; ia <= B; ++ia)
                      (Q /= 2),
                        (fa /= 2),
                        ca.N("u8", 0.25 / Q, 0.25 / fa),
                        b.viewport(0, 0, Q, fa),
                        a(nb[ia - 1]),
                        b.framebufferTexture2D(
                          va.rd(),
                          b.COLOR_ATTACHMENT0,
                          b.TEXTURE_2D,
                          nb[ia],
                          0
                        ),
                        Y.l(!1, 1 === ia);
                    p[0] = -1;
                  } else Na.nd();
                },
                Wp: function (B) {
                  (S = !(
                    Array.isArray(B) ||
                    B.constructor === Float32Array ||
                    B.constructor === Uint8Array
                  ))
                    ? ((Da = null), (x.ia = B), M())
                    : (Da = B);
                },
                g: function (B) {
                  if (!Ba) return !1;
                  m.qe(B);
                  if (p[B] === z) return !1;
                  a(oa);
                  p[B] = z;
                  return !0;
                },
                Oa: function (B) {
                  b.activeTexture(l[B]);
                  n = B;
                  a(oa);
                  p[B] = z;
                },
                o: function () {
                  t = Na;
                  b.framebufferTexture2D(
                    va.rd(),
                    b.COLOR_ATTACHMENT0,
                    b.TEXTURE_2D,
                    oa,
                    0
                  );
                },
                M: function () {
                  t = Na;
                  b.viewport(0, 0, ka, la);
                  b.framebufferTexture2D(
                    va.rd(),
                    b.COLOR_ATTACHMENT0,
                    b.TEXTURE_2D,
                    oa,
                    0
                  );
                },
                $d: m.$d,
                Bn: function (B, Q) {
                  ka = B;
                  la = Q;
                },
                resize: function (B, Q) {
                  Na.Bn(B, Q);
                  K();
                },
                clone: function (B) {
                  B = m.instance({
                    width: ka,
                    height: la,
                    S: x.S,
                    isFloat: x.isFloat,
                    isLinear: x.isLinear,
                    isMirrorY: x.isMirrorY,
                    isFlipY: B ? !jb : jb,
                    isPot: x.isPot,
                  });
                  ob.set("s0");
                  va.fa();
                  B.o();
                  b.viewport(0, 0, ka, la);
                  Na.g(0);
                  Y.l(!0, !0);
                  return B;
                },
                Kc: function () {
                  b.viewport(0, 0, ka, la);
                },
                remove: function () {
                  b.deleteTexture(oa);
                  V = !0;
                  E.splice(E.indexOf(Na), 1);
                  Na = null;
                },
                refresh: function () {
                  Na.Oa(0);
                  jb && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  S
                    ? b.texImage2D(b.TEXTURE_2D, 0, Wa, Ta, Va, x.ia)
                    : b.texImage2D(b.TEXTURE_2D, 0, Wa, ka, la, 0, Ta, Va, Da);
                  jb && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Ei: function () {
                  ha || ba();
                  b.readPixels(0, 0, ka, 4 * la, b.RGBA, b.UNSIGNED_BYTE, Ia);
                  P();
                  return ra;
                },
                Ym: function () {
                  ha || ba();
                  return xa.Zf(0, 0, ka, 4 * la, Ia).then(function () {
                    P();
                    return ra;
                  });
                },
                $m: function () {
                  Fb || ja();
                  b.readPixels(0, 0, ka, la, b.RGBA, b.UNSIGNED_BYTE, U);
                  return Xa;
                },
                Zm: function () {
                  Fb || ja();
                  return xa.Zf(0, 0, ka, la, U);
                },
                jh: function (B) {
                  va.$();
                  ca.set("s13");
                  Na.g(0);
                  if (B)
                    b.viewport(0, 0, ka, la),
                      ca.Nn("u9", 0.25, 0.25, 0.25, 0.25),
                      Y.l(!1, !0);
                  else
                    for (B = 0; 4 > B; ++B)
                      b.viewport(0, la * B, ka, la),
                        ca.xa("u9", h[B]),
                        Y.l(!1, 0 === B);
                },
                Dg: function (B) {
                  var Q;
                  if ((Q = Va === y[0]))
                    null !== v.mf
                      ? (Q = v.mf)
                      : ((Q = d(new Uint8Array([127, 127, 127, 127]), !1)),
                        (Q = null === Q ? !0 : (v.mf = Q))),
                      (Q = !Q);
                  a(oa);
                  jb && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  Q
                    ? (aa ||
                        ((ea = document.createElement("canvas")),
                        (ea.width = ka),
                        (ea.height = la),
                        (X = ea.getContext("2d")),
                        X.createImageData(ka, la),
                        (aa = !0)),
                      null.data.set(B),
                      X.putImageData(null, 0, 0),
                      b.texImage2D(b.TEXTURE_2D, 0, Wa, Ta, Va, ea))
                    : b.texImage2D(b.TEXTURE_2D, 0, Wa, ka, la, 0, Ta, Va, B);
                  p[n] = z;
                  jb && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                hq: function (B, Q) {
                  a(oa);
                  Q && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  b.texImage2D(b.TEXTURE_2D, 0, Wa, Ta, Va, B);
                  p[n] = z;
                  Q && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Hc: function (B, Q) {
                  var fa = ka * la,
                    ia = 4 * fa;
                  B = x.S ? (B ? "RGBE" : "JSON") : "RGBA";
                  Q && (B = Q);
                  Q = xa.ja() && !1;
                  var Ha = null;
                  switch (B) {
                    case "RGBE":
                      Ha = "s43";
                      break;
                    case "JSON":
                      Ha = Q ? "s0" : "s13";
                      break;
                    case "RGBA":
                    case "RGBAARRAY":
                      Ha = "s7";
                  }
                  ha ||
                    ("RGBA" === B || "RGBE" === B || "RGBAARRAY" === B
                      ? ((Ga = new Uint8Array(ia)), (ha = !0))
                      : "JSON" !== B || Q || ba());
                  va.$();
                  ca.set(Ha);
                  Na.g(0);
                  ia = null;
                  if ("RGBA" === B || "RGBE" === B || "RGBAARRAY" === B) {
                    b.viewport(0, 0, ka, la);
                    Y.l(!0, !0);
                    b.readPixels(0, 0, ka, la, b.RGBA, b.UNSIGNED_BYTE, Ga);
                    if ("RGBAARRAY" === B) return { data: Ga };
                    g ||
                      ((G = document.createElement("canvas")),
                      (I = G.getContext("2d")),
                      (g = !0));
                    G.width = ka;
                    G.height = la;
                    fa = I.createImageData(ka, la);
                    fa.data.set(Ga);
                    I.putImageData(fa, 0, 0);
                    ia = G.toDataURL("image/png");
                  } else if ("JSON" === B)
                    if (Q)
                      (ia = new Float32Array(fa)),
                        b.viewport(0, 0, ka, la),
                        Y.l(!0, !0),
                        b.readPixels(0, 0, ka, la, b.RGBA, b.FLOAT, ia);
                    else {
                      for (ia = 0; 4 > ia; ++ia)
                        b.viewport(0, la * ia, ka, la),
                          ca.xa("u9", h[ia]),
                          Y.l(!ia, !ia);
                      Na.Ei();
                      ia = Array(fa);
                      for (Q = 0; Q < fa; ++Q)
                        (ia[4 * Q] = ra[0][Q]),
                          (ia[4 * Q + 1] = ra[1][Q]),
                          (ia[4 * Q + 2] = ra[2][Q]),
                          (ia[4 * Q + 3] = ra[3][Q]);
                    }
                  return {
                    format: B,
                    data: ia,
                    width: ka,
                    height: la,
                    isMirrorY: x.isMirrorY,
                    isFlipY: "RGBA" === B ? x.isFlipY : !x.isFlipY,
                  };
                },
              };
              x.isMipmap && !ib && Ba && !rb && (Na.nd(), (rb = !0));
              if (x.url)
                a(oa),
                  b.texImage2D(
                    b.TEXTURE_2D,
                    0,
                    b.RGBA,
                    1,
                    1,
                    0,
                    b.RGBA,
                    b.UNSIGNED_BYTE,
                    null
                  ),
                  (Ma = new Image()),
                  (Ma.Yo = "Anonymous"),
                  (Ma.crossOrigin = "Anonymous"),
                  (Ma.src = x.url),
                  (Ma.onload = function () {
                    ka = Ma.width;
                    la = Ma.height;
                    K();
                  });
              else if (x.ia) {
                var Ea = function () {
                  M();
                  ka ? K() : setTimeout(Ea, 1);
                };
                Ea();
              } else
                x.array
                  ? (x.S && !x.isFloat
                      ? x.array instanceof Uint16Array
                        ? ((Da = x.array), K())
                        : e()
                        ? ((Da = c(x.array)), K())
                        : (K(), m.uh(b, oa, Na.L(), Na.Y(), x.array, jb, !0))
                      : ((Da = x.isFloat
                          ? x.array instanceof Float32Array
                            ? x.array
                            : new Float32Array(x.array)
                          : x.array instanceof Uint8Array
                          ? x.array
                          : new Uint8Array(x.array)),
                        K()),
                    x.isKeepArray ||
                      (Da && Da !== x.array && (Da = null), delete x.array))
                  : x.Hh
                  ? (Ba = !0)
                  : K();
              Na.up = Na.L;
              x.R && Ba && (x.R(Na), (x.R = null));
              E.push(Na);
              return Na;
            },
            $: function (r) {
              r !== n && (b.activeTexture(l[r]), (n = r));
              p[r] = -1;
              a(null);
            },
            rk: function (r) {
              u.random.g(r);
            },
            $d: function () {
              t = null;
              b.framebufferTexture2D(
                va.rd(),
                b.COLOR_ATTACHMENT0,
                b.TEXTURE_2D,
                null,
                0
              );
            },
            reset: function () {
              0 !== n && b.activeTexture(l[0]);
              for (var r = 0; r < l.length; ++r) p[r] = -1;
              n = -1;
            },
            Op: function () {
              n = -1;
            },
            sj: function () {
              for (var r = 0; r < l.length; ++r) m.$(r);
            },
            K: function () {
              u && (u.random.remove(), u.qj.remove());
            },
            Nc: function (r, M) {
              if ("RGBA" === r.format || "RGBE" === r.format) {
                var J = new Image();
                J.src = r.data;
                J.onload = function () {
                  m.instance({
                    isMirrorY: r.isMirrorY,
                    isFlipY: r.isFlipY,
                    isFloat: !1,
                    ia: J,
                    R: function (K) {
                      if ("RGBA" === r.format) M(K);
                      else {
                        var P = r.width,
                          ba = r.height,
                          ja = m.instance({
                            isMirrorY: r.isMirrorY,
                            isFloat: !0,
                            width: P,
                            height: ba,
                            isFlipY: r.isFlipY,
                          });
                        va.fa();
                        b.viewport(0, 0, P, ba);
                        ca.set("s44");
                        ja.o();
                        K.g(0);
                        Y.l(!0, !0);
                        m.$(0);
                        M(ja);
                        xa.flush();
                        setTimeout(K.remove, 50);
                      }
                    },
                  });
                };
              } else
                "JSON" === r.format
                  ? M(
                      m.instance({
                        isFloat: !0,
                        isFlipY: r.isFlipY,
                        width: r.width,
                        height: r.height,
                        array: new Float32Array(r.data),
                      })
                    )
                  : M(!1);
            },
            Ek: c,
            v: function () {
              t && (va.fa(), m.$d(), va.$());
              m.sj();
              E.slice(0).forEach(function (r) {
                r.remove();
              });
              E.splice(0);
              w = !1;
              A = 0;
              "undefined" !== typeof Bb && Bb.v();
              u = null;
            },
          };
        return m;
      })(),
      Ec = {
        instance: function (a) {
          var c = [Z.instance(a), Z.instance(a)],
            e = [c[1], c[0]],
            d = e,
            n = {
              Ui: function (l) {
                d[1].o();
                d[0].g(l);
                n.gj();
              },
              wn: function (l) {
                d[1].M();
                d[0].g(l);
                n.gj();
              },
              gj: function () {
                d = d === c ? e : c;
              },
              refresh: function () {
                d[0].refresh();
                d[1].refresh();
              },
              g: function (l) {
                d[0].g(l);
              },
              Oa: function (l) {
                d[0].Oa(l);
              },
              qk: function (l) {
                d[1].g(l);
              },
              pp: function () {
                return d[0];
              },
              sp: function () {
                return d[1];
              },
              Dg: function (l) {
                d[0].Dg(l);
                d[1].Dg(l);
              },
              remove: function () {
                d[0].remove();
                d[1].remove();
                d = null;
              },
              sync: function () {
                n.wn(0);
                ca.set("s0");
                Y.l(!1, !1);
              },
            };
          return n;
        },
      },
      Y = (function () {
        function a(u) {
          var t = { ha: null, U: null };
          t.ha = u.createBuffer();
          u.bindBuffer(u.ARRAY_BUFFER, t.ha);
          u.bufferData(
            u.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            u.STATIC_DRAW
          );
          t.U = u.createBuffer();
          u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, t.U);
          u.bufferData(
            u.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2]),
            u.STATIC_DRAW
          );
          return t;
        }
        var c = null,
          e = 0,
          d = !1,
          n = [],
          l = -2,
          A = -2,
          p = {
            reset: function () {
              A = l = -2;
            },
            m: function () {
              d || ((c = a(b)), p.Zc(), (d = !0));
            },
            instance: function (u) {
              var t = e++,
                y = u.U ? u.U.length : 0,
                H = "undefined" === typeof u.mode ? b.STATIC_DRAW : u.mode,
                C = b.createBuffer();
              b.bindBuffer(b.ARRAY_BUFFER, C);
              b.bufferData(
                b.ARRAY_BUFFER,
                u.ha instanceof Float32Array ? u.ha : new Float32Array(u.ha),
                H
              );
              l = t;
              var w = null,
                E = null,
                k = null;
              if (u.U) {
                w = b.createBuffer();
                b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, w);
                var g = null;
                65536 > u.U.length
                  ? ((g = Uint16Array), (E = b.UNSIGNED_SHORT), (k = 2))
                  : ((g = Uint32Array), (E = b.UNSIGNED_INT), (k = 4));
                g = u.U instanceof g ? u.U : new g(u.U);
                b.bufferData(b.ELEMENT_ARRAY_BUFFER, g, H);
                A = t;
              }
              var G = {
                sc: function (I) {
                  l !== t && (b.bindBuffer(b.ARRAY_BUFFER, C), (l = t));
                  I && ob.Rd();
                },
                mk: function () {
                  A !== t && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, w), (A = t));
                },
                bind: function (I) {
                  G.sc(I);
                  G.mk();
                },
                V: function () {
                  b.drawElements(b.TRIANGLES, y, E, 0);
                },
                Ga: function (I, h) {
                  b.drawElements(b.TRIANGLES, I, E, h * k);
                },
                remove: function () {
                  b.deleteBuffer(C);
                  u.U && b.deleteBuffer(w);
                  G = null;
                },
              };
              n.push(G);
              return G;
            },
            Zc: function () {
              -1 !== l && (b.bindBuffer(b.ARRAY_BUFFER, c.ha), (l = -1));
              -1 !== A && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c.U), (A = -1));
            },
            l: function (u, t) {
              u && Y.Zc();
              t && ob.ac();
              b.drawElements(b.TRIANGLES, 3, b.UNSIGNED_SHORT, 0);
            },
            Kb: function (u) {
              u = u || b;
              var t = a(u);
              u.bindBuffer(u.ARRAY_BUFFER, t.ha);
              u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, t.U);
              ob.bc(u);
              u.clear(u.COLOR_BUFFER_BIT);
              u.drawElements(u.TRIANGLES, 3, u.UNSIGNED_SHORT, 0);
              u.flush();
              u.bindBuffer(u.ARRAY_BUFFER, null);
              u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, null);
              u.deleteBuffer(t.ha);
              u.deleteBuffer(t.U);
              p.reset();
              d && (p.Zc(), ob.ac());
            },
            K: function () {
              var u = b,
                t = c;
              u.deleteBuffer(t.ha);
              u.deleteBuffer(t.U);
            },
            v: function () {
              p.K();
              n.forEach(function (u) {
                u.remove();
              });
              b.bindBuffer(b.ARRAY_BUFFER, null);
              b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
              p.reset();
              d = !1;
              n.splice(0);
              e = 0;
            },
          };
        return p;
      })(),
      va = (function () {
        var a = null,
          c = null,
          e = null,
          d = !1,
          n = [],
          l = { ma: -2, th: 1 },
          A = {
            Ub: function () {
              return d;
            },
            m: function () {
              if (!d) {
                a = b.createFramebuffer();
                var p = xa.ja();
                c =
                  p && b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER;
                e =
                  p && b.READ_FRAMEBUFFER ? b.READ_FRAMEBUFFER : b.FRAMEBUFFER;
                d = !0;
              }
            },
            vl: function () {
              return c;
            },
            Ah: function () {
              return e;
            },
            rd: function () {
              return b.FRAMEBUFFER;
            },
            tp: function () {
              return l;
            },
            ip: function () {
              return a;
            },
            instance: function (p) {
              void 0 === p.yc && (p.yc = !1);
              var u = p.ka ? p.ka : null,
                t = p.width,
                y = void 0 !== p.height ? p.height : p.width,
                H = a,
                C = null,
                w = !1,
                E = !1,
                k = 0;
              u && ((t = t ? t : u.L()), (y = y ? y : u.Y()));
              var g = {
                Oi: function () {
                  w || ((H = b.createFramebuffer()), (w = !0), (k = l.th++));
                },
                Uc: function () {
                  g.Oi();
                  g.o();
                  C = b.createRenderbuffer();
                  b.bindRenderbuffer(b.RENDERBUFFER, C);
                  b.renderbufferStorage(
                    b.RENDERBUFFER,
                    b.DEPTH_COMPONENT16,
                    t,
                    y
                  );
                  b.framebufferRenderbuffer(
                    c,
                    b.DEPTH_ATTACHMENT,
                    b.RENDERBUFFER,
                    C
                  );
                  b.clearDepth(1);
                },
                bind: function (G, I) {
                  k !== l.ma && (b.bindFramebuffer(c, H), (l.ma = k));
                  u && u.o();
                  I && b.viewport(0, 0, t, y);
                  G && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                },
                Rg: function () {
                  k !== l.ma && (b.bindFramebuffer(c, H), (l.ma = k));
                },
                clear: function () {
                  b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                },
                Ae: function () {
                  b.clear(b.COLOR_BUFFER_BIT);
                },
                Yg: function () {
                  b.clear(b.DEPTH_BUFFER_BIT);
                },
                Kc: function () {
                  b.viewport(0, 0, t, y);
                },
                o: function () {
                  k !== l.ma && (b.bindFramebuffer(c, H), (l.ma = k));
                },
                rtt: function (G) {
                  u = G;
                  l.ma !== k &&
                    (b.bindFramebuffer(b.FRAMEBUFFER, H), (l.ma = k));
                  G.o();
                },
                $: function () {
                  b.bindFramebuffer(c, null);
                  l.ma = -1;
                },
                resize: function (G, I) {
                  t = G;
                  y = I;
                  C &&
                    (b.bindRenderbuffer(b.RENDERBUFFER, C),
                    b.renderbufferStorage(
                      b.RENDERBUFFER,
                      b.DEPTH_COMPONENT16,
                      t,
                      y
                    ));
                },
                remove: function () {
                  H === a ||
                    E ||
                    (b.bindFramebuffer(c, H),
                    b.framebufferTexture2D(
                      c,
                      b.COLOR_ATTACHMENT0,
                      b.TEXTURE_2D,
                      null,
                      0
                    ),
                    C &&
                      b.framebufferRenderbuffer(
                        c,
                        b.DEPTH_ATTACHMENT,
                        b.RENDERBUFFER,
                        null
                      ),
                    b.bindFramebuffer(c, null),
                    b.deleteFramebuffer(H),
                    C && b.deleteRenderbuffer(C));
                  E = !0;
                },
              };
              p.yc && g.Uc();
              n.push(g);
              return g;
            },
            $: function () {
              b.bindFramebuffer(c, null);
              l.ma = -1;
            },
            fq: function () {
              b.bindFramebuffer(c, null);
              b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
              xa.dj();
              l.ma = -1;
            },
            reset: function () {
              l.ma = -2;
            },
            fa: function () {
              0 !== l.ma && (b.bindFramebuffer(c, a), (l.ma = 0));
            },
            clear: function () {
              xa.dj();
              b.clear(b.COLOR_BUFFER_BIT);
            },
            v: function () {
              A.$();
              n.forEach(function (p) {
                p.remove();
              });
              null !== a && (b.deleteFramebuffer(a), (a = null));
              A.reset();
              d = !1;
              n.splice(0);
              l.th = 1;
            },
          };
        return A;
      })(),
      xa = (function () {
        function a() {
          p = "undefined" === typeof ab ? da : ab;
          u = !0;
        }
        function c(h, q) {
          for (var f = 0; f < h.length; ++f) {
            var L = q.getExtension(h[f]);
            if (L) return L;
          }
          return null;
        }
        function e() {
          null !== g.Zd && (clearTimeout(g.Zd), (g.Zd = null));
          g.Pb = !1;
        }
        function d(h) {
          if (0 === g.rb.length) {
            g.Aa = b.PIXEL_PACK_BUFFER;
            g.rb.splice(0);
            g.sd.splice(0);
            for (var q = 0; q < g.uc; ++q)
              g.rb.push(b.createBuffer()), g.sd.push(-1);
            g.Pa = 0;
            g.Pf = 0;
          }
          b.bindBuffer(g.Aa, g.rb[g.Pa]);
          h.byteLength !== g.sd[g.Pa] &&
            (b.bufferData(g.Aa, h.byteLength, b.STREAM_READ),
            (g.sd[g.Pa] = h.byteLength));
          g.zp = !0;
        }
        function n() {
          b.bindBuffer(g.Aa, null);
        }
        function l() {
          g.Nb.forEach(function (h) {
            b.deleteSync(h);
          });
          g.Nb.splice(0);
        }
        function A() {
          g.Pa = (g.Pa + 1) % g.uc;
          ++g.Pf;
        }
        var p = null,
          u = !1,
          t = {
            Th: !1,
            wg: null,
            xg: null,
            Xh: !1,
            jm: !1,
            yg: null,
            Yh: !1,
            zg: null,
            Uh: !1,
            Be: null,
            am: !1,
            Ce: null,
            bm: !1,
          },
          y = null,
          H = { Ra: !0, Ta: !0, Te: !0, Di: !1 },
          C = null,
          w = !0,
          E = null,
          k = null,
          g = {
            Fk: 1,
            uc: -1,
            Pa: 0,
            Pf: 0,
            Pb: !1,
            rb: [],
            Nb: [],
            sd: [],
            Aa: null,
            Zd: null,
          },
          G = "undefined" === typeof window ? {} : window,
          I = {
            m: function () {
              if (u) return !0;
              I.reset();
              u || a();
              var h = b;
              if (!y.Th) {
                y.wg = I.qh(h);
                G.GL_EXT_FLOAT = y.wg;
                y.Xh = y.wg ? !0 : !1;
                if (y.Xh || I.ja())
                  (y.xg = I.rh(h)),
                    (y.jm = y.xg ? !0 : !1),
                    (G.GL_EXT_FLOATLINEAR = y.xg);
                y.Th = !0;
              }
              if (!y.Uh) {
                y.yg = I.jd(h);
                y.yg && ((y.Yh = !0), (G.GL_EXT_HALFFLOAT = y.yg));
                if (y.Yh || I.ja())
                  (y.zg = I.sh(h)), (G.GL_EXT_HALFFLOATLINEAR = y.zg);
                y.Bp = y.zg ? !0 : !1;
                y.Uh = !0;
              }
              y.Be = I.oh(h);
              y.am = y.Be ? !0 : !1;
              G.GL_EXT_COLORBUFFERFLOAT = y.Be;
              y.Ce = I.ph(h);
              y.bm = y.Ce ? !0 : !1;
              G.GL_EXT_COLORBUFFERHALFFLOAT = y.Ce;
              va.m();
              Z.m();
              if (!I.Rk()) return !1;
              Y.m();
              Z.Vl();
              return !0;
            },
            reset: function () {
              y = Object.assign({}, t);
              C = Object.assign({}, H);
            },
            L: function () {
              u || a();
              return p.L();
            },
            Y: function () {
              u || a();
              return p.Y();
            },
            ja: function () {
              u || a();
              return p.ja();
            },
            nh: function (h) {
              I.oh(h);
              I.ph(h);
              I.qh(h);
              I.rh(h);
              I.jd(h);
              I.sh(h);
            },
            oh: c.bind(null, [
              "EXT_color_buffer_float",
              "WEBGL_color_buffer_float",
              "OES_color_buffer_float",
            ]),
            ph: c.bind(null, [
              "EXT_color_buffer_half_float",
              "WEBGL_color_buffer_half_float",
              "OES_color_buffer_half_float",
            ]),
            qh: c.bind(null, [
              "OES_texture_float",
              "MOZ_OES_texture_float",
              "WEBKIT_OES_texture_float",
            ]),
            rh: c.bind(null, [
              "OES_texture_float_linear",
              "MOZ_OES_texture_float_linear",
              "WEBKIT_OES_texture_float_linear",
            ]),
            jd: c.bind(null, [
              "OES_texture_half_float",
              "MOZ_OES_texture_half_float",
              "WEBKIT_OES_texture_half_float",
            ]),
            sh: c.bind(null, [
              "OES_texture_half_float_linear",
              "MOZ_OES_texture_half_float_linear",
              "WEBKIT_OES_texture_half_float_linear",
            ]),
            Ye: function (h) {
              var q = I.jd(h);
              return q && q.HALF_FLOAT_OES
                ? q.HALF_FLOAT_OES
                : h.HALF_FLOAT || h.FLOAT;
            },
            wl: function () {
              return k || b.RGBA32F || b.RGBA;
            },
            xl: function () {
              return E || b.RGBA16F || b.RGBA;
            },
            ql: function () {
              return C;
            },
            ea: function () {
              return C.Ra;
            },
            To: function () {
              return C.Ta;
            },
            xk: function () {
              return C.Te;
            },
            Ak: function () {
              return C.Di && w;
            },
            pj: function (h) {
              w = h;
              !h && g.Pb && (l(), b.bindBuffer(g.Aa, null), (g.Pb = !1));
            },
            Ep: function () {
              return g.Pb;
            },
            Xd: function (h, q, f) {
              function L() {
                h.bindTexture(h.TEXTURE_2D, null);
                h.bindFramebuffer(O, null);
                h.deleteTexture(r);
                h.deleteFramebuffer(m);
              }
              var O = h.FRAMEBUFFER,
                v = h.NEAREST,
                m = h.createFramebuffer();
              h.bindFramebuffer(O, m);
              var r = h.createTexture();
              h.activeTexture(h.TEXTURE0);
              h.bindTexture(h.TEXTURE_2D, r);
              h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, !1);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, h.CLAMP_TO_EDGE);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, h.CLAMP_TO_EDGE);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, v);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, v);
              h.texImage2D(h.TEXTURE_2D, 0, q, 3, 3, 0, h.RGBA, f, null);
              h.framebufferTexture2D(
                h.FRAMEBUFFER,
                h.COLOR_ATTACHMENT0,
                h.TEXTURE_2D,
                r,
                0
              );
              if (
                h.checkFramebufferStatus(
                  h.READ_FRAMEBUFFER || h.FRAMEBUFFER
                ) !== h.FRAMEBUFFER_COMPLETE
              )
                return L(), !1;
              ob.Pd(h);
              h.clearColor(0, 0, 0, 0);
              h.viewport(0, 0, 3, 3);
              h.disable(h.DEPTH_TEST);
              h.clear(h.COLOR_BUFFER_BIT);
              Y.Kb(h);
              h.bindFramebuffer(O, null);
              ob.ub(h);
              h.activeTexture(h.TEXTURE0);
              h.bindTexture(h.TEXTURE_2D, r);
              Y.Kb(h);
              q = new Uint8Array(36);
              h.readPixels(0, 0, 3, 3, h.RGBA, h.UNSIGNED_BYTE, q);
              L();
              for (f = 0; 36 > f; ++f)
                if (3 !== f % 4 && 3 < Math.abs(q[f] - 127)) return !1;
              return !0;
            },
            Le: function (h) {
              var q = { Ra: !1, Ta: !1 };
              h.disable(h.BLEND);
              h.clearColor(0, 0, 0, 0);
              h.clear(h.COLOR_BUFFER_BIT);
              h.RGBA32F &&
                I.Xd(h, h.RGBA32F, h.FLOAT) &&
                ((q.Ra = !0), (k = h.RGBA32F));
              !q.Ra && I.Xd(h, h.RGBA, h.FLOAT) && ((q.Ra = !0), (k = h.RGBA));
              var f = I.Ye(h);
              E = null;
              h.RGBA16F &&
                I.Xd(h, h.RGBA16F, f) &&
                ((q.Ta = !0), (E = h.RGBA16F));
              !q.Ta && I.Xd(h, h.RGBA, f) && ((q.Ta = !0), (E = h.RGBA));
              return q;
            },
            Tk: function () {
              var h = va.instance({ width: 2 });
              h.Oi();
              var q = Z.instance({ width: 2, isFloat: !0, F: 3 });
              h.o();
              q.o();
              I.flush();
              b.checkFramebufferStatus(va.Ah()) !== b.FRAMEBUFFER_COMPLETE
                ? (Z.In(), (C.Te = !1))
                : (C.Te = !0);
              h.remove();
              q.remove();
            },
            Uk: function () {
              var h = !1;
              I.ja() &&
                (h =
                  "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer"
                    .split(" ")
                    .every(function (q) {
                      return "undefined" !== typeof b[q];
                    }));
              C.Di = h;
            },
            Rk: function () {
              var h = I.Le(b);
              Object.assign(C, h);
              if (!C.Ra && !C.Ta) return !1;
              I.Tk();
              I.Uk();
              return !0;
            },
            an: function (h, q, f, L, O) {
              b.readPixels(h, q, f, L, b.RGBA, b.UNSIGNED_BYTE, O);
              return Promise.resolve(O, !1);
            },
            Zf: function (h, q, f, L, O, v, m) {
              if (!I.Ak()) return I.an(h, q, f, L, O);
              g.uc = m || g.Fk;
              d(O);
              b.readPixels(h, q, f, L, b.RGBA, b.UNSIGNED_BYTE, 0);
              g.Nb[g.Pa] = b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE, 0);
              I.flush();
              var r = !1;
              return new Promise(function (M, J) {
                function K() {
                  if (!g.Pb) return e(), n(), A(), J(), !1;
                  var P = (g.Pa + 1) % g.uc;
                  switch (b.clientWaitSync(g.Nb[P], 0, 0)) {
                    case b.TIMEOUT_EXPIRED:
                    case b.WAIT_FAILED:
                      break;
                    default:
                      return (
                        e(),
                        b.deleteSync(g.Nb[P]),
                        (g.Nb[P] = null),
                        b.bindBuffer(g.Aa, g.rb[P]),
                        b.getBufferSubData(g.Aa, 0, O),
                        n(),
                        A(),
                        M(O, r),
                        !0
                      );
                  }
                  g.Zd = setTimeout(K, 0);
                  return !1;
                }
                e();
                g.Pf + 1 < g.uc
                  ? (n(), A(), M(O, !1))
                  : ((g.Pb = !0), K() || !v || r || ((r = !0), v()));
              });
            },
            dj: function () {
              b.viewport(0, 0, I.L(), I.Y());
            },
            flush: function () {
              b.flush();
            },
            v: function () {
              e();
              l();
              Z.v();
              va.v();
              Y.v();
              g.rb.forEach(function (h) {
                b.deleteBuffer(h);
              });
              g.rb.splice(0);
              ob.reset();
              u = !1;
            },
          };
        return I;
      })(),
      Bb = (function () {
        function a(f, L, O, v) {
          g.texParameteri(
            g.TEXTURE_2D,
            g.TEXTURE_MIN_FILTER,
            v ? g.NEAREST_MIPMAP_NEAREST : g.LINEAR
          );
          var m = null;
          if (null !== O)
            try {
              m = g.getError();
              if ("FUCKING_BIG_ERROR" === m) return !1;
              g.texImage2D(g.TEXTURE_2D, 0, f, 4, 4, 0, g.RGBA, L, O);
              m = g.getError();
              if (m !== g.NO_ERROR) return !1;
            } catch (r) {
              return !1;
            }
          v && g.generateMipmap(g.TEXTURE_2D);
          g.clear(g.COLOR_BUFFER_BIT);
          Y.Kb(g);
          m = g.getError();
          if ("FUCKING_BIG_ERROR" === m) return !1;
          g.readPixels(0, 0, 2, 2, g.RGBA, g.UNSIGNED_BYTE, y);
          m = g.getError();
          m === g.INVALID_OPERATION &&
            "undefined" !== typeof g.PIXEL_PACK_BUFFER &&
            (g.bindBuffer(g.PIXEL_PACK_BUFFER, null),
            g.readPixels(0, 0, 2, 2, g.RGBA, g.UNSIGNED_BYTE, y),
            (m = g.getError()));
          if (m !== g.NO_ERROR) return !1;
          O = !0;
          for (v = 0; 16 > v; ++v) O = O && 4 > Math.abs(y[v] - 127);
          O && ((u.zi = L), (u.Rh = f));
          return O;
        }
        function c(f, L) {
          return G.Ra && a(f, g.FLOAT, new Float32Array(H), L)
            ? ((p = A.Og), !0)
            : !1;
        }
        function e(f, L, O) {
          if (!G.Ta) return !1;
          var v = Z.Ek(H),
            m = xa.jd(g);
          if (
            (m && m.HALF_FLOAT_OES && a(f, m.HALF_FLOAT_OES, v, L)) ||
            (g.HALF_FLOAT && a(f, g.HALF_FLOAT, v, L))
          )
            return (p = A.nc), !0;
          v = new Float32Array(H);
          if (a(f, g.FLOAT, v, L)) return (p = A.nc), !0;
          g.bindTexture(g.TEXTURE_2D, O);
          g.texImage2D(
            g.TEXTURE_2D,
            0,
            g.RGBA,
            2,
            2,
            0,
            g.RGBA,
            g.UNSIGNED_BYTE,
            null
          );
          g.bindFramebuffer(u.dd, q);
          Z.uh(g, O, 2, 2, v, !1, !1);
          g.bindFramebuffer(u.dd, null);
          g.bindTexture(g.TEXTURE_2D, O);
          return a(f, null, null, L) ? ((p = A.nc), !0) : !1;
        }
        function d(f, L, O) {
          t = !0;
          if (e(f, !0, O) || c(L, !0)) return !0;
          t = !1;
          return e(f, !1, O) || c(L, !1) ? !0 : !1;
        }
        function n(f) {
          if (p === A.H) {
            g = f || b;
            p = A.RGBA8;
            t = !0;
            xa.nh(g);
            G || (G = xa.Le(g));
            va.reset();
            q = g.createFramebuffer();
            u.dd = g.DRAW_FRAMEBUFFER || g.FRAMEBUFFER;
            g.bindFramebuffer(u.dd, null);
            g.clearColor(0, 0, 0, 0);
            g.viewport(0, 0, 2, 2);
            ca.H();
            I = ca.ub(g);
            f = g.createTexture();
            g.activeTexture(g.TEXTURE0);
            g.bindTexture(g.TEXTURE_2D, f);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.REPEAT);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.REPEAT);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST);
            h = f;
            var L = (f = g.RGBA),
              O = g.RGBA16F,
              v = g.RGBA32F;
            v && (f = v);
            O && (L = O);
            if ((O || v) && d(L, f, h)) return l(), !0;
            f = L = g.RGBA;
            if (d(L, f, h)) return l(), !0;
            p = A.RGBA8;
            l();
            return !1;
          }
        }
        function l() {
          g.deleteProgram(I.na);
          g.deleteTexture(h);
          h = I = null;
        }
        for (
          var A = { H: -1, Og: 3, nc: 2, RGBA8: 0 },
            p = A.H,
            u = { zi: null, Rh: null, dd: null },
            t = !0,
            y = new Uint8Array(16),
            H = Array(64),
            C = 0;
          4 > C;
          ++C
        )
          for (var w = 0; 4 > w; ++w) {
            var E = 0 === (w + C) % 2 ? 1 : 0,
              k = 4 * C + w;
            H[4 * k] = E;
            H[4 * k + 1] = E;
            H[4 * k + 2] = E;
            H[4 * k + 3] = E;
          }
        var g = null,
          G = null,
          I = null,
          h = null,
          q = null;
        return {
          yk: function (f) {
            n(f);
            return t;
          },
          Wg: function (f, L) {
            p === A.H && (typeof ("undefined" !== L) && (G = L), n(f));
            return p !== A.RGBA8;
          },
          Cp: function (f) {
            n(f);
            return p === A.Og;
          },
          mm: function (f) {
            n(f);
            return p === A.nc;
          },
          op: function (f) {
            n(f);
            return u.zi;
          },
          yl: function (f) {
            n(f);
            return u.Rh;
          },
          v: function () {
            g = null;
            t = !0;
            p = A.H;
            G = null;
          },
        };
      })(),
      cd = {
        instance: function (a) {
          var c = Z.instance(a.alpha),
            e = Z.instance(a.beta);
          return {
            al: function () {
              c.g(1);
              e.g(2);
            },
          };
        },
      },
      Qc = {
        instance: function (a) {
          var c = null,
            e = !1,
            d = !1,
            n = null,
            l = !1,
            A = !1,
            p = null,
            u = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing,
            t =
              "undefined" === typeof a.preprocessingSize
                ? a.size
                : a.preprocessingSize;
          a.mask &&
            ((e = !0),
            N && void 0 !== N.aa && (a.mask = N.aa + a.mask),
            (c = Z.instance({ isFloat: !1, url: a.mask })));
          var y = !1;
          a.customInputShader &&
            ((y = "s45"),
            ca.oa({
              name: "_",
              id: y,
              h: a.customInputShader,
              gq: ["uSource"],
              precision: "lowp",
            }),
            ca.j(y, [{ type: "1i", name: "_", value: 0 }]));
          switch (u) {
            case "sobel":
              p = "s32";
              l = !0;
              break;
            case "meanNormalization":
              p = "s33";
              l = !0;
              break;
            case "grayScale":
              p = "s29";
              l = !1;
              break;
            case "grayScaleTilt":
              p = "s30";
              A = !0;
              l = !1;
              break;
            case "rgbGrayTilt":
              p = "s31";
              A = !0;
              l = !1;
              break;
            case "copy":
              p = y ? y : "s0";
              break;
            case "inputLightRegulation":
              p = y ? y : "s29";
              n = dd.instance({ Qh: t, ti: a.size, ni: a.nBlurPass, xd: !1 });
              d = !0;
              break;
            case "inputMix0":
              p = "none";
              n = ed.instance({
                ta: t,
                yj: a.varianceMin,
                Sg: a.blurKernelSizePx,
                xd: !1,
              });
              d = !0;
              break;
            case "direct":
            case "none":
              p = "abort";
              break;
            default:
              p = "s4";
          }
          A && ca.j(p, [{ name: "u27", type: "1f", value: a.tilt }]);
          e && (p += "Mask");
          var H = Z.instance({ isFloat: !1, isPot: !1, width: a.size }),
            C = {
              L: function () {
                return t;
              },
              Ze: function () {
                return C.L();
              },
              Cl: function () {
                return d ? n.$e() : H;
              },
              wa: function (w) {
                va.fa();
                "abort" !== p &&
                  ("none" !== p &&
                    (ca.set(p),
                    l && ca.G("u28", 1 / a.size),
                    H.M(),
                    e && c.g(1),
                    Y.l(!1, !1),
                    H.g(0),
                    (w = H)),
                  d && n.process(w));
              },
              v: function () {
                H.remove();
                e && c.remove();
              },
            };
          return C;
        },
      },
      Rc = {
        instance: function (a) {
          function c(J) {
            n.forEach(function (K, P) {
              l[P][0] = J[0][K];
              l[P][1] = J[1][K];
              l[P][2] = J[2][K];
              l[P][3] = J[3][K];
            });
            return l;
          }
          a.normalize = a.normalize || !1;
          var e = {
              input: null,
              bias: null,
              qf: null,
              La: null,
              Fd: null,
              Sf: null,
              Tf: null,
            },
            d = null,
            n = [],
            l = [],
            A = !1,
            p = null,
            u = !0,
            t = -1,
            y = a.isReorganize ? a.isReorganize : !1,
            H = a.kernelsCount ? !0 : !1,
            C = a.dynPelu ? cd.instance(a.dynPelu) : !1,
            w = C ? !0 : !1,
            E = { isEnabled: !1 };
          a.gm
            ? ((a.sparsity =
                "undefined" !== typeof a.sparsity ? a.sparsity : a.Ld.Ze()),
              (u = !1))
            : "full" === a.connectivityUp && (a.sparsity = a.Ld.Ze());
          var k = {
              elu: "s16",
              elu01: "s17",
              relu: "s15",
              arctan: "s19",
              sigmoid: "s14",
              copy: "s0",
              softplus: "s20",
              dynPelu: "s18",
            }[a.activation],
            g = a.sparsity * a.sparsity,
            G = !1,
            I = a.size,
            h = "";
          if (a.maxPooling) {
            switch (a.maxPooling.size) {
              case 2:
                h = "s34";
                break;
              case 4:
                h = "s35";
            }
            G = !0;
            I /= a.maxPooling.size;
            e.Sf = Z.instance({ isFloat: !0, isPot: !1, width: I });
          }
          var q = a.normalization ? !0 : !1,
            f = null,
            L = null,
            O = null;
          if (q) {
            f = "s46" + a.index.toString();
            ca.Oh("s46", f, [((a.normalization.n - 1) / 2).toFixed(1)]);
            ca.j(f, [
              { type: "1i", name: "u1", value: 0 },
              { type: "2f", name: "u8", value: [1 / a.size, 1 / a.size] },
              { type: "1f", name: "u7", value: a.normalization.alpha },
              { type: "1f", name: "u10", value: a.normalization.beta },
              { type: "1f", name: "u31", value: a.normalization.k },
            ]);
            var v = { isFloat: !0, isPot: !0, width: a.size };
            L = Z.instance(v);
            O = Z.instance(v);
          }
          var m = -1,
            r = null;
          u && (e.La = Z.instance({ isFloat: !0, isPot: !1, width: a.size }));
          e.bias = Z.instance(a.bias);
          var M = {
            L: function () {
              return a.size;
            },
            Ze: function () {
              return I;
            },
            xh: function () {
              return a.classesCount;
            },
            nk: function (J) {
              d.g(J);
            },
            Rm: function () {
              a.remap &&
                a.remap.isEnabled &&
                (E = {
                  isEnabled: !0,
                  Am: Z.instance({
                    isFloat: !1,
                    isFlipY: !1,
                    array: new Uint8Array(a.remap.maskTexture.data),
                    width: a.remap.maskTexture.width,
                    isPot: !1,
                  }),
                  zd: a.remap.layers.map(function (J) {
                    return a.parent.zl(J);
                  }),
                  depth: a.remap.depth,
                });
            },
            Jn: function () {
              switch (a.connectivityUp) {
                case "direct":
                  r = fd.instance(a.connectivity);
                  break;
                case "square":
                  r = gd.instance(a.connectivity);
                  break;
                case "squareFast":
                  r = hd.instance(a.connectivity, a.activation);
                  break;
                case "full":
                  r = id.instance(a.connectivity);
                  break;
                case "conv":
                  (t = a.kernelsCount),
                    (r = jd.instance(a.connectivity)),
                    y &&
                      (e.Fd = Z.instance({
                        width: I,
                        isFloat: !0,
                        isFlipY: !1,
                        isPot: !1,
                      }));
              }
              if (r.fc) {
                var J = a.size * a.sparsity;
                m = Math.log(J / a.size) / Math.log(2);
                e.input = Z.instance({
                  isMipmap: !0,
                  isFloat: !0,
                  isPot: !0,
                  width: J,
                  Jf: m,
                });
                e.qf = Z.instance({ isFloat: !0, isPot: !0, width: a.size });
              }
            },
            wa: function (J, K) {
              d = J;
              r.fc
                ? (e.input.M(),
                  H && e.bias.g(2),
                  r.wa(E),
                  e.input.g(0),
                  e.input.nl(m),
                  e.qf.M(),
                  H
                    ? ca.set("s0")
                    : (ca.set("s28"), ca.G("u26", g), e.bias.g(1)),
                  e.input.pk(m, 0),
                  Y.l(!1, !1),
                  ca.set(k),
                  q ? L.o() : e.La.o(),
                  e.qf.g(0),
                  w && C.al(),
                  Y.l(!1, !1))
                : (e.La.M(), e.bias.g(1), r.wa());
              q &&
                (ca.set(f),
                O.o(),
                L.g(0),
                Y.l(!1, !1),
                ca.set("s47"),
                ca.G("u7", 1),
                e.La.o(),
                O.g(1),
                Y.l(!1, !1));
              if (u)
                return (
                  G
                    ? (e.Sf.M(),
                      e.La.g(0),
                      ca.set(h),
                      ca.N("u8", 1 / a.size, 1 / a.size),
                      Y.l(!1, !1),
                      (K = e.Sf))
                    : (K = e.La),
                  K.g(0),
                  y &&
                    (e.Fd.o(),
                    ca.set("s22"),
                    ca.N("u13", t, I / t),
                    Y.l(!1, !1),
                    (K = e.Fd),
                    e.Fd.g(0)),
                  K
                );
              var P = e.La;
              a.normalize &&
                (ca.set("gpuRawAvg" === A ? "s9" : "s8"),
                ca.G("u4", 1 / a.size),
                e.Tf.M(),
                e.La.g(0),
                Y.l(!1, !1),
                (P = e.Tf));
              J = null;
              switch (A) {
                case "cpuRGBA2Float":
                  P.jh(!1);
                  K ? (J = M.Wm(P).then(p)) : ((P = M.Xm(P)), p(P));
                  break;
                case "cpuMeanFloat":
                  P.jh(!0);
                  if (K) J = P.Zm().then(p);
                  else {
                    P = P.$m();
                    for (var ba = 0; ba < P.length; ++ba);
                    p(P);
                  }
                  break;
                case "gpuRawAvg":
                case "gpuRaw":
                  P.g(0);
                case "none":
                  null !== p && p(P);
              }
              K && null === J && (J = Promise.resolve());
              return J;
            },
            Hk: function (J) {
              J && ((A = J.Uf || "none"), (p = J.Rf || null));
              e.La = Z.instance({
                isFloat: !0,
                isPot: !0,
                isMipmap: !1,
                width: a.size,
              });
              J =
                "undefined" !== typeof a.classesCount && a.classesCount
                  ? a.classesCount
                  : a.size * a.size;
              for (var K = 0, P = 0, ba = 0; K < J; ++K)
                n.push(P + (a.size - 1 - ba) * a.size),
                  l.push([-1, -1, -1, -1]),
                  ++P,
                  P === a.size && ((P = 0), ++ba);
              a.normalize &&
                (e.Tf = Z.instance({ isFloat: !0, isPot: !0, width: a.size }));
            },
            Wm: function (J) {
              return J.Ym().then(c);
            },
            Xm: function (J) {
              J = J.Ei();
              c(J);
              return l;
            },
            v: function () {
              for (var J in e) {
                var K = e[J];
                K && K.remove();
              }
              r && (r.v(), (r = null));
            },
          };
          a.Ld && M.Jn(a.Ld);
          return M;
        },
      },
      fd = {
        instance: function (a) {
          var c = Z.instance(a.weights);
          return {
            fc: !0,
            qd: function () {
              return 1;
            },
            v: function () {
              c.remove();
            },
            Pl: function () {
              return c;
            },
            wa: function () {
              ca.set("s27");
              c.g(1);
              Y.l(!1, !1);
            },
          };
        },
      },
      id = {
        instance: function (a) {
          var c = a.fromLayerSize,
            e = Z.instance(a.weights);
          return {
            fc: !0,
            qd: function () {
              return c;
            },
            v: function () {
              e.remove();
            },
            wa: function (d) {
              if (d.isEnabled) {
                ca.set("s25");
                d.Am.g(3);
                var n,
                  l = Math.min(d.zd.length, d.depth);
                for (n = 0; n < l; ++n) d.zd[n].nk(4 + n);
              } else ca.set("s24");
              ca.G("u17", a.toLayerSize);
              e.g(1);
              Y.l(!1, !1);
            },
          };
        },
      },
      gd = {
        instance: function (a) {
          for (
            var c = a.fromLayerSize,
              e = a.toLayerSize,
              d = a.toSparsity,
              n = d * e,
              l = n / c,
              A = c / e,
              p = 0,
              u = 0,
              t = 0,
              y = Array(d * e * d * e * 4),
              H = Array(d * e * d * e * 4),
              C = Array(c * c),
              w = 0;
            w < C.length;
            ++w
          )
            C[w] = 0;
          w = Math.floor(d / 2);
          for (var E = 0.5 / e, k = 0.5 / c, g = 0.5 / n, G = 0; G < e; ++G)
            for (var I = Math.round(G * A), h = 0; h < e; ++h) {
              var q = Math.round(h * A),
                f = G / e,
                L = h / e;
              f += E;
              L += E;
              for (var O = 0; O < d; ++O) {
                var v = I + O - w;
                0 > v && (v += c);
                v >= c && (v -= c);
                for (var m = 0; m < d; ++m) {
                  var r = p / n,
                    M = u / n,
                    J = q + m - w;
                  0 > J && (J += c);
                  J >= c && (J -= c);
                  var K = v / c,
                    P = J / c;
                  M = 1 - M - 1 / n;
                  K += k;
                  P += k;
                  r += g;
                  M += g;
                  var ba = G * d + O,
                    ja = h * d + m;
                  ja = e * d - ja - 1;
                  ba = ja * e * d + ba;
                  y[4 * ba] = r;
                  y[4 * ba + 1] = M;
                  y[4 * ba + 2] = K;
                  y[4 * ba + 3] = P;
                  P = C[J * c + v]++;
                  ba = P % l;
                  K = v * l + ba;
                  J = J * l + (P - ba) / l;
                  J = c * l - 1 - J;
                  J = J * c * l + K;
                  H[4 * J] = r;
                  H[4 * J + 1] = M;
                  H[4 * J + 2] = f;
                  H[4 * J + 3] = L;
                  ++p >= n && ((p = 0), ++u);
                  ++t;
                }
              }
            }
          C = null;
          var U = Z.instance(a.weights);
          delete a.weights.data;
          var x = Z.instance({
            width: n,
            isFloat: !0,
            array: new Float32Array(H),
            isPot: !0,
          });
          H = null;
          var z = Z.instance({
            width: n,
            isFloat: !0,
            array: new Float32Array(y),
            isPot: !0,
          });
          y = null;
          return {
            fc: !0,
            qd: function () {
              return l;
            },
            v: function () {
              x.remove();
              z.remove();
              U.remove();
            },
            wa: function () {
              ca.set("s23");
              U.g(1);
              z.g(2);
              Y.l(!1, !1);
            },
          };
        },
      },
      jd = {
        instance: function (a) {
          var c = a.kernelsCount,
            e = a.toSparsity,
            d = (e * a.toLayerSize) / a.fromLayerSize,
            n = Z.instance(a.weights);
          return {
            fc: !0,
            qd: function () {
              return d;
            },
            wp: function () {
              return e;
            },
            Pl: function () {
              return n;
            },
            v: function () {
              n.remove();
            },
            wa: function () {
              ca.set("s26");
              ca.G("u23", c);
              ca.G("u24", e);
              ca.G("u17", a.toLayerSize);
              ca.G("u25", a.fromLayerSize);
              n.g(1);
              Y.l(!1, !1);
            },
          };
        },
      },
      hd = {
        instance: function (a, c) {
          var e = a.fromLayerSize,
            d = a.toLayerSize,
            n = a.toSparsity,
            l = a.stride ? a.stride : 1,
            A = (n * d) / e,
            p = d < e,
            u = e / d,
            t = Z.instance(a.weights),
            y =
              "s48" +
              [e.toString(), d.toString(), n.toString(), l.toString(), c].join(
                "_"
              );
          ca.kl(y) ||
            ((a = gb(c)),
            (d = [
              { type: "1f", name: "u17", value: d },
              { type: "1f", name: "u30", value: l },
            ]),
            p && d.push({ type: "1f", name: "u25", value: e }),
            (e = [(p ? A : n).toFixed(1), a]),
            p && e.push(u.toFixed(1)),
            ca.Oh(p ? "s40" : "s39", y, e),
            ca.j(
              y,
              d.concat([
                { type: "1i", name: "u15", value: 0 },
                { type: "1i", name: "u22", value: 1 },
                { type: "1i", name: "u14", value: 3 },
              ])
            ));
          return {
            fc: !1,
            qd: function () {
              return A;
            },
            v: function () {
              t.remove();
            },
            wa: function () {
              ca.set(y);
              t.g(3);
              Y.l(!1, !1);
            },
          };
        },
      },
      dd = {
        instance: function (a) {
          var c = a.ni ? a.ni : 3,
            e = a.Qh ? a.Qh : 64,
            d = a.ti ? a.ti : 64,
            n = a.xd ? !0 : !1;
          a = { isFloat: !1, width: e, isPot: !1, isFlipY: !1 };
          var l = Z.instance(a),
            A = Z.instance(a),
            p = Z.instance(a),
            u = Z.instance(a),
            t = Z.instance({ isFloat: !0, width: d, isPot: !1, isFlipY: !1 }),
            y = 1 / e;
          return {
            process: function (H) {
              ca.set("s36");
              u.o();
              Y.l(n, !1);
              ca.set("s37");
              for (var C = 0; C < c; ++C)
                l.o(),
                  ca.N("u8", y, 0),
                  Y.l(n, !1),
                  p.o(),
                  u.g(0),
                  Y.l(n, !1),
                  A.o(),
                  l.g(0),
                  ca.N("u8", 0, y),
                  Y.l(n, !1),
                  u.o(),
                  p.g(0),
                  Y.l(n, !1),
                  C !== c - 1 && A.g(0);
              ca.set("s38");
              t.o();
              H.g(0);
              A.g(1);
              u.g(2);
              Y.l(n, !1);
              t.g(0);
            },
            $e: function () {
              return t;
            },
          };
        },
      },
      ed = {
        instance: function (a) {
          function c(t) {
            return Z.instance({
              isFloat: t,
              width: e.ta,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var e = Object.assign({ yj: 0.1, Sg: 9, ta: 128, xd: !1 }, a),
            d = c(!1),
            n = [c(!1), c(!1), c(!1)],
            l = [c(!1), c(!1), c(!1)],
            A = c(!0),
            p = [d, l[0], l[1]];
          a =
            "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u32;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u32*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}"
              .replace("1.1111", Math.round((e.Sg - 1) / 2).toFixed(2))
              .replace("2.2222", (1 / e.ta).toFixed(6));
          var u = { u1: 0 };
          ca.re([
            {
              id: "s50",
              name: "_",
              h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.,1.,1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}",
              u: u,
              i: ["u1"],
              precision: "lowp",
            },
            {
              id: "s51",
              name: "_",
              h: a,
              u: u,
              i: ["u1", "u32"],
              precision: "lowp",
            },
            {
              id: "s52",
              name: "_",
              h: "uniform sampler2D u33,u34,u35,u36;const float f=1.1111;const vec3 g=vec3(1.,1.,1.);varying vec2 vv0;void main(){vec3 a=texture2D(u33,vv0).rgb;float c=texture2D(u34,vv0).r,d=texture2D(u35,vv0).r,h=texture2D(u36,vv0).r,i=a.r*a.r;vec3 b=vec3(c,d,h),j=max(g*f,abs(i-b*b)),k=sqrt(j);gl_FragColor=vec4(a.r,(a-b)/k);}".replace(
                "1.1111",
                e.yj.toFixed(4)
              ),
              u: { u33: 0, u34: 1, u35: 2, u36: 3 },
              i: ["u33", "u34", "u35", "u36"],
              precision: "highp",
            },
          ]);
          return {
            process: function () {
              ca.set("s50");
              d.M();
              Y.l(e.xd, !1);
              ca.set("s51");
              for (var t = 0; 3 > t; ++t)
                ca.N("u32", 1, 0),
                  n[t].o(),
                  p[t].g(0),
                  Y.l(!1, !1),
                  ca.N("u32", 0, 1),
                  l[t].o(),
                  n[t].g(0),
                  Y.l(!1, !1);
              ca.set("s52");
              A.o();
              d.g(0);
              l[0].g(1);
              l[1].g(2);
              l[2].g(3);
              Y.l(!1, !1);
              A.g(0);
            },
            $e: function () {
              return A;
            },
          };
        },
      },
      Ab = (function () {
        function a(E, k, g, G, I, h, q) {
          if (!C)
            if (q === h.length) I();
            else {
              switch (h[q]) {
                case "A":
                  g();
                  break;
                case "D":
                  E();
                  break;
                case "S":
                  k()
                    .then(function (f, L) {
                      w.oj();
                      a(E, k, g, L ? null : G, I, h, ++q);
                    })
                    .catch(function () {
                      I();
                    });
                  return;
                case "R":
                  G && G();
              }
              a(E, k, g, G, I, h, ++q);
            }
        }
        var c = {
            n: 5,
            Of: 1,
            ei: 0,
            md: [35, 49],
            hd: [2, 200],
            k: 0.7,
            ho: 200,
            Lm: 0.05,
          },
          e = -1,
          d = null,
          n = -1,
          l = -1,
          A = 0,
          p = -1,
          u = -1,
          t = 0,
          y = 0,
          H = c.hd[1],
          C = !0,
          w = {
            T: function () {
              switch (e) {
                case -1:
                  return -1;
                case 0:
                  return u + d.ei;
                case 1:
                  return t;
              }
            },
            yh: function (E) {
              return Math.pow(
                Math.min(Math.max(p, 0), d.n - 1) / (d.n - 1),
                E || 1
              );
            },
            m: function (E) {
              d = Object.assign({}, c, E);
              p = u = d.Of;
              e = 0;
              w.reset();
            },
            oj: function (E) {
              E = ("undefined" === typeof E ? Date.now() : E) || 0;
              var k = Math.min(Math.max(E - y, d.hd[0]), d.hd[1]);
              H = k;
              y = E;
              var g = -1 === n ? 0 : d.k;
              n = Math.min(Math.max(1e3 / k, 5), 120) * (1 - g) + n * g;
              E - l > d.ho &&
                5 < ++A &&
                ((k = d.k),
                (p =
                  p * (1 - k) +
                  (n < d.md[0] ? u - 1 : n > d.md[1] ? u + 1 : u) * k),
                Math.abs(p - u) > 1 - d.Lm &&
                  ((k = Math.min(Math.max(Math.round(p), 0), d.n - 1)),
                  k !== u && ((p = u = k), (n = (d.md[1] - d.md[0]) / 2))),
                (l = E));
            },
            ag: function (E, k, g, G, I, h) {
              C = !1;
              a(E, k, g, G, I, h, 0);
            },
            stop: function () {
              C = !0;
            },
            Dn: function (E) {
              t = E;
              e = 1;
            },
            fo: function () {
              e = 0;
              w.reset();
            },
            reset: function () {
              H = c.hd[1];
              l = n = -1;
              A = 0;
            },
            np: function () {
              return H;
            },
          };
        return w;
      })(),
      Fc = (function () {
        var a = {
            oi: 4,
            Gd: [1.5, 1.5, 2],
            qa: [0.1, 0.1, 0.1],
            Li: 1,
            ta: -1,
            kf: -1,
            Zn: 2,
            Im: 1,
            Mi: !0,
            il: 0.8,
          },
          c = null,
          e = [],
          d = [0],
          n = [0.5, 0.5, 1];
        return {
          m: function (l) {
            c = Object.assign({}, a, l);
            e.splice(0);
            l = c.Gd[0] * c.qa[0];
            var A = c.Gd[1] * c.qa[1],
              p = 1 / (1 + c.Gd[2] * c.qa[2]),
              u = c.Li * Math.min(c.ta, c.kf),
              t = u / c.ta;
            u /= c.kf;
            var y = 0.5 * c.il;
            y *= y;
            for (var H = 0; H < c.oi; ++H) {
              var C = Math.pow(p, H),
                w = t * C,
                E = u * C;
              C = w * c.Im;
              var k = w * l,
                g = E * A;
              w /= 2;
              E /= 2;
              for (
                var G = 1 + (1 - w - w) / k, I = 1 + (1 - E - E) / g, h = 0;
                h < I;
                ++h
              )
                for (var q = E + h * g, f = q - 0.5, L = 0; L < G; ++L) {
                  var O = w + L * k,
                    v = O - 0.5;
                  v * v + f * f > y || e.push([O, q, C]);
                }
            }
            c.Mi &&
              e.sort(function (m, r) {
                var M = m[0] - 0.5;
                m = m[1] - 0.5;
                var J = r[0] - 0.5;
                r = r[1] - 0.5;
                return M * M + m * m - (J * J + r * r);
              });
          },
          get: function (l) {
            var A = e.length;
            if (0 === A) return n;
            for (; l >= d.length; ) d.push(0);
            d[l] >= A && (d[l] = 0);
            var p = e[Math.floor(d[l])];
            d[l] = (d[l] + 1 / c.Zn) % A;
            return p;
          },
          reset: function () {
            for (var l = e.length / d.length, A = 0; A < d.length; ++A)
              d[A] = Math.floor(A * l);
          },
        };
      })(),
      xb = (function () {
        function a() {
          e(k + w.Kf);
          g.port.postMessage("DONE");
        }
        function c() {
          q.Vc = 0 === w.za ? I(e) : I(d);
        }
        function e(m) {
          h.Sb &&
            null !== E &&
            ((m -= k),
            (m = Math.min(Math.max(m, w.mh[0]), w.mh[1])),
            (k += m),
            l(),
            f.isEnabled && f.zc && h.Ia && k - f.vf > w.Ng && (t(), (f.vf = k)),
            E(k));
        }
        function d(m) {
          h.Sb && (q.timeout = setTimeout(e.bind(null, m), w.za));
        }
        function n() {
          E = null;
          h.Sb = !1;
          l();
        }
        function l() {
          q.Vc && (window.cancelAnimationFrame(q.Vc), (q.Vc = null));
          q.timeout && (window.clearTimeout(q.timeout), (q.timeout = null));
        }
        function A(m) {
          m && !h.Ia
            ? ((h.Ia = !0),
              G && Ab.fo(),
              g.port.postMessage("STOP"),
              xa.pj(!0),
              c())
            : !m &&
              h.Ia &&
              ((h.Ia = !1),
              G && Ab.Dn(1),
              xa.pj(!1),
              g.port.postMessage("START"));
        }
        function p(m) {
          m.target.hidden ? O() : L();
        }
        function u(m, r, M) {
          r = m.createShader(r);
          m.shaderSource(r, M);
          m.compileShader(r);
          return r;
        }
        function t() {
          f.zc = !1;
          var m = f.Sa,
            r = f.td,
            M = f.ud,
            J = f.Aa;
          m.uniform1f(f.Ih, Math.random());
          f.Tb ? r.beginQueryEXT(J, M) : m.beginQuery(J, M);
          m.drawElements(m.POINTS, 1, m.UNSIGNED_SHORT, 0);
          f.Tb ? r.endQueryEXT(J) : m.endQuery(J);
          xa.flush();
          H()
            .then(function (K) {
              K = (w.Ej * w.Mg * 1e3) / K;
              f.de = (f.de + 1) % w.mc;
              f.wf[f.de] = K;
              ++f.ci > w.mc &&
                (f.yd.set(f.wf),
                f.yd.sort(function (P, ba) {
                  return P - ba;
                }),
                (K = f.yd[Math.floor(w.mc / 2)]),
                (f.ld = Math.max(f.ld, K)),
                w.Lg(K / f.ld));
              f.zc = !0;
            })
            .catch(function () {
              f.zc = !0;
            });
        }
        function y(m) {
          var r = f.Sa,
            M = f.td,
            J = f.ud;
          J = f.Tb
            ? M.hp(J, M.QUERY_RESULT_AVAILABLE_EXT)
            : r.getQueryParameter(J, r.QUERY_RESULT_AVAILABLE);
          r = r.getParameter(M.GPU_DISJOINT_EXT);
          J ? m(!r) : setTimeout(y.bind(null, m), 0.1);
        }
        function H() {
          return new Promise(function (m, r) {
            y(function (M) {
              if (M) {
                M = f.Sa;
                var J = f.td,
                  K = f.ud;
                M = f.Tb
                  ? J.getQueryObjectEXT(K, J.QUERY_RESULT_EXT)
                  : M.getQueryParameter(K, M.QUERY_RESULT);
                m(M);
              } else r();
            });
          });
        }
        var C = {
            Vh: !0,
            mh: [1, 200],
            Kf: 20,
            za: 0,
            Mg: 50,
            Ej: 240,
            Ng: 3e3,
            mc: 3,
            Lg: null,
          },
          w = null,
          E = null,
          k = 0,
          g = null,
          G = !1,
          I = null,
          h = { Ha: !1, Ia: !0, uf: !1, tf: !1, sf: !1, Sb: !1 },
          q = { Vc: null, timeout: null },
          f = {
            isEnabled: !1,
            zc: !1,
            Sa: null,
            td: null,
            ud: null,
            Aa: null,
            Ih: null,
            Tb: !0,
            vf: 0,
            ci: 0,
            wf: null,
            yd: null,
            de: 0,
            ld: 0,
          },
          L = A.bind(null, !0),
          O = A.bind(null, !1),
          v = {
            m: function (m) {
              w = Object.assign(C, m);
              Object.assign(h, { Ia: !0, Ha: !0, Sb: !1 });
              I =
                window.requestPostAnimationFrame ||
                window.requestAnimationFrame;
              if (null !== w.Lg) {
                m = document.createElement("canvas");
                m.setAttribute("width", "1");
                m.setAttribute("height", "1");
                var r = { antialias: !1 };
                m = m.getContext("webgl2", r) || m.getContext("webgl", r);
                if (
                  (r =
                    m.getExtension("EXT_disjoint_timer_query") ||
                    m.getExtension("EXT_disjoint_timer_query_webgl2"))
                ) {
                  f.Sa = m;
                  f.td = r;
                  f.isEnabled = !0;
                  f.Tb = r.beginQueryEXT ? !0 : !1;
                  var M = u(
                      m,
                      m.VERTEX_SHADER,
                      "attribute vec4 a0;void main(){gl_Position=a0;}"
                    ),
                    J = u(
                      m,
                      m.FRAGMENT_SHADER,
                      "precision lowp float;uniform float u37;void main(){vec4 a=u37*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace(
                        "666",
                        w.Mg.toString()
                      )
                    ),
                    K = m.createProgram();
                  m.attachShader(K, M);
                  m.attachShader(K, J);
                  m.linkProgram(K);
                  M = m.getAttribLocation(K, "a0");
                  f.Ih = m.getUniformLocation(K, "u37");
                  m.useProgram(K);
                  m.enableVertexAttribArray(M);
                  K = m.createBuffer();
                  m.bindBuffer(m.ARRAY_BUFFER, K);
                  m.bufferData(
                    m.ARRAY_BUFFER,
                    new Float32Array([0.5, 0.5, 0, 1]),
                    m.STATIC_DRAW
                  );
                  m.vertexAttribPointer(M, 4, m.FLOAT, !1, 16, 0);
                  K = m.createBuffer();
                  m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, K);
                  m.bufferData(
                    m.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array([0]),
                    m.STATIC_DRAW
                  );
                  m.disable(m.DEPTH_TEST);
                  m.disable(m.DITHER);
                  m.disable(m.STENCIL_TEST);
                  m.viewport(0, 0, 1, 1);
                  K = f.Tb ? r.createQueryEXT() : m.createQuery();
                  f.ud = K;
                  f.Aa = r.TIME_ELAPSED_EXT || m.TIME_ELAPSED;
                  f.vf = -w.Ng;
                  f.wf = new Float32Array(w.mc);
                  f.yd = new Float32Array(w.mc);
                  f.ld = 0;
                  f.de = 0;
                  f.ci = 0;
                  f.zc = !0;
                }
              }
              if (w.Vh) {
                m = !1;
                try {
                  if ("undefined" === typeof SharedWorker) {
                    var P = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                              w.Kf.toString() +
                              ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      ba = new Worker(P);
                    ba.addEventListener("message", a);
                    g = { Ci: ba, port: ba };
                    h.uf = !0;
                  } else {
                    var ja = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                              w.Kf.toString() +
                              ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      U = new SharedWorker(ja);
                    U.port.start();
                    U.port.addEventListener("message", a);
                    g = { Ci: U, port: U.port };
                    h.tf = !0;
                  }
                  m = !0;
                } catch (x) {}
                m &&
                  ("onvisibilitychange" in document
                    ? document.addEventListener("visibilitychange", p)
                    : (window.addEventListener("blur", O),
                      window.addEventListener("focus", L)),
                  (h.sf = !0));
              }
              G = "undefined" !== typeof Ab;
            },
            v: function () {
              n();
              h.sf &&
                ("onvisibilitychange" in document
                  ? document.removeEventListener("visibilitychange", p)
                  : (window.removeEventListener("blur", O),
                    window.removeEventListener("focus", L)),
                (h.sf = !1));
              h.tf
                ? (g.port.close(), (h.tf = !1))
                : h.uf && (g.Ci.terminate(), (h.uf = !1));
              Object.assign(h, { Ia: !0, Ha: !1, Sb: !1 });
              E = null;
            },
            Hp: function () {
              return h.Ia;
            },
            update: function (m) {
              Object.assign(w, m);
            },
            ag: function (m) {
              h.Ha || v.m({});
              l();
              h.Sb = !0;
              E = m;
              h.Ia && c();
            },
            stop: n,
          };
        return v;
      })(),
      tc = {
        Xe: function () {
          return Date.now();
        },
        kp: function () {
          return performance.now();
        },
      },
      tb = (function () {
        function a(V) {
          switch (L) {
            case f.movePinch:
              var ha = -V.deltaY;
              0 === O && k("pinch", -1, 0.001 * ha, null);
          }
          V.deltaY;
          V.preventDefault();
        }
        function c(V) {
          if (-1 !== O)
            switch (L) {
              case f.swipe:
                if (1 !== O) break;
                u();
                y(V, m);
                var ha = m[0] - v[0];
                n(ha);
                V = ha / ((20 * I.offsetWidth) / 100);
                k("swipeMove", Math.min(Math.max(V, -1), 1), V, null);
                break;
              case f.movePinch:
                if (2 === O || 3 === O) {
                  y(V, m);
                  ha = m[0] - v[0];
                  var ra = m[1] - v[1];
                  2 === O
                    ? ((X += Math.sqrt(ha * ha + ra * ra)),
                      10 > X
                        ? ((v[0] = m[0]), (v[1] = m[1]))
                        : (Ma || ((Ma = !0), k("moveStart", null, null, null)),
                          (aa[0] = ha),
                          (aa[1] = ra),
                          (M[0] = ha - r[0]),
                          (M[1] = ra - r[1]),
                          k("move", aa, M, null),
                          (r[0] = aa[0]),
                          (r[1] = aa[1])))
                    : 3 === O &&
                      ((V = t(V) / oa), k("pinch", V, V - Da, null), (Da = V));
                }
            }
        }
        function e(V) {
          if (-1 !== O)
            switch (L) {
              case f.swipe:
                if (1 !== O) break;
                u();
                y(V, m);
                V = m[0] - v[0];
                var ha = 0 > V;
                (V = 20 < (100 * Math.abs(V)) / I.offsetWidth) && ha
                  ? k("swipeLeft", J, null, null)
                  : V && !ha && k("swipeRight", J, null, null);
                var ra = function () {
                  setTimeout(function () {
                    p();
                    O = 0;
                    k("swipeEnd", null, null, null);
                  }, 202);
                };
                V
                  ? ((V = function () {
                      var Ga = (ha ? -1 : 1) * I.width,
                        Ia = ((ha ? 1 : -1) * Ga) / I.width;
                      J.style.transitionDuration = (400).toString() + "ms";
                      J.style.left = (U[0] + Ga).toString() + "px";
                      J.style.top = U[1].toString() + "px";
                      J.style.transform = "rotate( " + Ia.toString() + "rad )";
                      ra();
                    }),
                    ja ? V() : (x = V))
                  : ((J.style.transitionDuration = (200).toString() + "ms"),
                    (J.style.opacity = "0"),
                    (J.style.left = U[0].toString() + "px"),
                    (J.style.top = U[1].toString() + "px"),
                    (J.style.transform = ""),
                    ra());
                O = -1;
                break;
              case f.movePinch:
                if (2 === O || 3 === O)
                  O === O.move
                    ? k("moveEnd", null, null, null)
                    : 3 === O && k("pinchEnd", null, null, null),
                    (O = 0);
            }
        }
        function d(V) {
          V.preventDefault();
          if (-1 !== O)
            switch (L) {
              case f.swipe:
                if (0 !== O) break;
                u();
                O = 1;
                z = setTimeout(function () {
                  p();
                  z = null;
                  1 === O && ((O = 0), k("swipeEnd", null, null, null));
                }, 1e3);
                l();
                k("swipeStart", null, null, null);
                k("swipeGetCanvas", J, P, K);
                y(V, v);
                break;
              case f.movePinch:
                0 !== O
                  ? 2 !== O ||
                    Ma ||
                    (void 0 === V.changedTouches && void 0 === V.touches) ||
                    ((oa = t(V)),
                    20 < oa &&
                      ((O = 3), (Da = 1), k("pinchStart", null, null, null)))
                  : 3 !== O &&
                    ((Ma = !1),
                    y(V, v),
                    (r[0] = 0),
                    (r[1] = 0),
                    (O = 2),
                    (X = 0));
            }
        }
        function n(V) {
          var ha = 0 > V;
          J.style.left = U[0] + V + "px";
          J.style.transformOrigin = ha ? S : D;
          J.style.transform =
            "rotate( " + (((ha ? 1 : -1) * V) / I.width).toString() + "rad )";
        }
        function l() {
          ja = !1;
          var V = I.getBoundingClientRect();
          U[0] = V.left;
          U[1] = V.top;
          J.width = Math.round(I.width / 4);
          J.height = Math.round(I.height / 4);
          K.width = J.width;
          K.height = J.height;
          J.style.width = I.offsetWidth + "px";
          J.style.height = I.offsetHeight + "px";
          J.style.left = U[0] + "px";
          J.style.top = U[1] + "px";
          setTimeout(A, 0);
        }
        function A() {
          P.drawImage(I, 0, 0, J.width, J.height);
          ba.drawImage(J, 0, 0);
          ja = !0;
          document.body.appendChild(J);
          x && (x(), (x = !1));
        }
        function p() {
          J.style.transitionDuration = "0ms";
          J.style.opacity = "1";
          J.style.transform = "";
          ja && (document.body.removeChild(J), (ja = !1));
        }
        function u() {
          z && (window.clearTimeout(z), (z = null));
        }
        function t(V) {
          H(V, ka, 0);
          H(V, la, 1);
          return Math.sqrt(ka[0] * ka[0] + la[0] * la[0]);
        }
        function y(V, ha) {
          void 0 !== V.changedTouches || void 0 !== V.touches
            ? H(V, ha, 0)
            : ((ha[0] = V.pageX), (ha[1] = V.pageY));
        }
        function H(V, ha, ra) {
          V.touches.length > ra
            ? ((ha[0] = V.touches[ra].pageX), (ha[1] = V.touches[ra].pageY))
            : ((ha[0] = V.changedTouches[ra].pageX),
              (ha[1] = V.changedTouches[ra].pageY));
        }
        function C() {
          q.forEach(function (V) {
            I.removeEventListener(V.type, V.mb, !1);
          });
          return q.splice(0, q.length);
        }
        function w(V) {
          V.forEach(function (ha) {
            E(ha.type, ha.mb);
          });
        }
        function E(V, ha) {
          I.removeEventListener(V, ha, !1);
          J.removeEventListener(V, ha, !1);
          I.addEventListener(V, ha, !1);
          J.addEventListener(V, ha, !1);
          0 ===
            q.filter(function (ra) {
              return ra.type === V && ra.mb === ha;
            }).length && q.push({ type: V, mb: ha });
        }
        function k(V, ha, ra, Ga) {
          h[V].forEach(function (Ia) {
            Ia.mb(ha, ra, Ga);
          });
        }
        function g(V) {
          return V[0] + "% " + (100 - V[1]).toString() + "%";
        }
        var G = !1,
          I = null,
          h = {
            swipeStart: [],
            swipeEnd: [],
            swipeLeft: [],
            swipeRight: [],
            swipeMove: [],
            swipeGetCanvas: [],
            pinch: [],
            pinchStart: [],
            pinchEnd: [],
            move: [],
            moveStart: [],
            moveEnd: [],
          },
          q = [],
          f = { idle: 0, swipe: 1, movePinch: 2 },
          L = f.idle,
          O = 0,
          v = [0, 0],
          m = [0, 0],
          r = [0, 0],
          M = [0, 0],
          J = document.createElement("canvas"),
          K = document.createElement("canvas"),
          P = J.getContext("2d"),
          ba = K.getContext("2d");
        J.style.position = "fixed";
        J.style.zIndex = "800";
        J.style.cursor = "move";
        J.style.pointerEvents = "none";
        J.className = "swipeImage";
        J.setAttribute("draggable", !1);
        var ja = !1,
          U = [0, 0],
          x = null,
          z = null,
          D = g([50, 100]),
          S = g([50, 0]),
          ea = null,
          X = 0,
          aa = [0, 0],
          oa = 0,
          Ma = !1,
          Da = 1,
          ka = [0, 0],
          la = [0, 0],
          Ba = {
            init: function (V) {
              if (G) Ba.switch_canvas(V.pa);
              else
                return (
                  (I = V.pa),
                  E("mousedown", d),
                  E("mouseup", e),
                  E("mouseout", e),
                  E("mousemove", c),
                  E("mousemove", c),
                  E("wheel", a),
                  E("touchstart", d),
                  E("touchend", e),
                  E("touchmove", c),
                  (G = !0),
                  Ba
                );
            },
            switch_canvas: function (V) {
              if (!G) Ba.init({ pa: V });
              else if (I !== V) {
                var ha = C();
                I = V;
                w(ha);
                for (var ra in h)
                  for (V = h[ra], ha = V.length - 1; 0 <= ha; --ha)
                    V[ha].cn && V.splice(ha, 1);
              }
            },
            get_mode: function () {
              for (var V in f) if (f[V] === L) return V;
              return !1;
            },
            switch_mode: function (V) {
              G &&
                "undefined" !== typeof f[V] &&
                ((V = f[V]), L !== V && (u(), (L = V), (O = 0)));
            },
            add_listener: function (V, ha, ra) {
              h[V].push({ mb: ha, cn: "undefined" === typeof ra ? !1 : ra });
              return Ba;
            },
            remove_listener: function (V) {
              h[V].splice(0, h[V].length);
              return Ba;
            },
            animate_swipe: function (V, ha) {
              ea && (clearInterval(ea), (ea = null));
              l();
              var ra = (I.width / (ha / 1e3)) * ("left" === V ? -1 : 1),
                Ga = 0,
                Ia,
                sb = Date.now();
              ea = setInterval(function () {
                ea &&
                  ((Ia = Date.now()),
                  (Ga += ((Ia - sb) / 1e3) * ra),
                  n(Ga),
                  (sb = Ia),
                  Math.abs(Ga) > 0.75 * I.width &&
                    ea &&
                    (clearInterval(ea), (ea = null), p()));
              }, 16);
            },
          };
        return Ba;
      })();
    window.CanvasListeners = tb;
    var R = {
        VERSION: "3.3.8",
        Sc: [],
        Rc: [],
        oe: !1,
        me: !1,
        pe: !1,
        ready: !1,
        isBusy: !1,
      },
      Ya = {
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1280,
        minHeight: 480,
        maxHeight: 1280,
        FOVdesktop: 60,
        rotate: 0,
        FOVmobile: 45,
        ke: 10,
        je: 8e3,
      },
      Hc = {
        Mf: "models3D",
        If: "materials",
        co: "tweakers",
        neuralNetworkPath: "built/jeefitNNC.json",
        aa: "",
        ua: "",
        le: "",
        za: 0,
        Oj: 20,
        width: 1024,
        height: 1024,
        Km: [2, 3.5],
        Ji: 300,
        Pc: [1, 6],
        scanOverlapFactors: [2, 2, 3],
        scanNScaleLevels: 2,
        scanScale0Factor: 0.7,
        qa: [0.2, 0.2, 0.3],
        jc: [
          [0.8, 0.5],
          [0.8, 0.5],
          [1, 1],
        ],
        ao: 30,
        Pk: 1.92,
        Um: [0.3, 0.7],
        Tm: 1,
        bo: [0.005, 0.025],
        ln: [0.002, 0.005],
        ug: [0, 0.6],
        ml: 0.2,
        Wa: [0.698111, 1.047166, 0.122169],
        nj: [-0.1, 0, 0],
        Kd: [0, -62, 8],
        Pm: 1.03,
        Ca: [0, -60, 0],
        Nf: 40,
        vc: 0.4,
        Ue: 73,
        se: [0.04, 1],
        Mj: [4, 1],
        sk: [0, 0.5],
        nn: 0.3,
        kn: 1,
        gn: [0.5, 4],
        so: 20,
        fp: !1,
        xc: 145,
        jf: -18,
        gf: 20,
        hf: 3,
        Cc: [-110, 0],
        dc: 1,
        ej: 0.4,
        fj: 3,
        Td: [0, 0, 0],
        ec: [1.1, 1],
        ad: 0,
        Je: 0.95,
        Ie: 90,
        He: 50,
        Wc: 30,
        Fb: 0.05,
        ef: !0,
        Bd: !0,
        Ff: "images/masks/target.jpg",
        Gf: !1,
        Ad: [1 / 255, 175 / 255, 236 / 255, 0],
        Cd: -0.001,
        Ef: 3.14,
        we: 0,
        ve: "images/masks/burka.png",
        te: Math.PI - Math.PI / 4,
        Fe: Math.PI / 4,
        $f: [0.3, 0.2, 0.1],
        Vb: 1,
        fi: [700, 90],
        um: [0.2, 0.04],
        to: "images/backgrounds/viewer3D.png",
        Kg: [0, 0, 0],
        Jg: [0, 15, 60],
        he: 0.3,
        Bo: 50,
        xo: Nc ? Fa : !1,
        yo: Nc ? Fa : !1,
        Ao: 1e3,
        Do: 1e3,
        zo: 40,
        wo: [0, 0, -400],
        ii: 0.1,
        ym: 0.5,
        ji: [0.5, 1.5],
        Dd: 30,
        xm: !0,
      },
      N = Object.assign({}, Hc);
    T.model = !1;
    T.Xb = 1;
    T.Jd = 1;
    T.eh = !0;
    T.fh = !0;
    T.dh = !1;
    T.Ja = !0;
    var Za = {
      cg: 3.5,
      Yb: "images/debug/picsou.png",
      Md: 45,
      Bf: 0.785,
      Cf: 0.3925,
      Df: 5,
      zf: 2,
      Af: 0,
      yf: 0,
      uo: "images/backgrounds/bg1.jpg",
      vo: "images/backgrounds/bg1_light.jpg",
      Aj: 1,
      Bj: 2,
    };
    N.fx = [4, 50];
    N.Cc = [-110, 0];
    N.ej = 0.25;
    N.fj = 3;
    N.Td = [0, -2, 20];
    N.ec = [0.95, 1];
    T.Xb = 2.1289;
    T.Jd = 1;
    Za.cg = 2.5858;
    Za.Bf = 0.4388;
    Za.Cf = 0.118;
    Za.Yb = "images/debug/hdri2.png";
    Za.Md = 180;
    Za.bg = 0.8065;
    Za.Df = 5.3887;
    Za.zf = 0.5351;
    Za.Af = -0.3019;
    Za.yf = 0;
    Za.Aj = 3.5288;
    Za.Bj = 6.2168;
    var Gc = {
        element: null,
        ah: null,
        ka: null,
        Ag: null,
        deviceId: -1,
        Lb: -1,
        gd: 0,
        Ai: null,
        ge: -1,
      },
      Aa = Object.assign({}, Gc),
      bb = null,
      Nb = -1,
      Ob = -1,
      Oc = N.Km,
      yc = window.devicePixelRatio ? window.devicePixelRatio : 1;
    var kc = { ll: Math.max(Oc[0], yc) / yc, Se: Math.min(yc, Oc[1]) };
    var cb = null;
    R.onLoad = function (a) {
      R.ready ? a() : R.Sc.push(a);
    };
    R.onHalfLoad = function (a) {
      R.load_model ? a() : R.Rc.push(a);
    };
    R.onWebcamAsk = function (a) {
      R.oe = a;
    };
    R.onContextLost = function (a) {
      R.me = a;
    };
    R.onWebcamGet = function (a) {
      R.pe = a;
    };
    R.get_onHalfLoadCallstack = function () {
      return R.Rc;
    };
    R.set_size = function (a, c, e) {
      e = e ? kc.Se : 1;
      N.width = a * e;
      N.height = c * e;
    };
    R.get_videoDevices = function (a) {
      Sc(a);
    };
    R.set_videoDevice = function (a) {
      Aa.deviceId = a;
    };
    R.set_videoSizes = function (a, c, e, d, n, l) {
      Ya.idealWidth = a;
      Ya.idealHeight = c;
      Ya.minWidth = e;
      Ya.maxWidth = d;
      Ya.minHeight = n;
      Ya.maxHeight = l;
    };
    R.set_loading = function (a, c, e) {
      a && ((N.Gf = !0), (N.Ff = a));
      "number" === typeof c && ((a = new Pb(c)), (N.Ad = [a.r, a.X, a.b, 0]));
      "number" === typeof e && (N.Cd = e);
    };
    R.set_settings = function (a, c, e) {
      a && Object.assign(N, a);
      c && Object.assign(Ya, c);
      e && Object.assign(Za, e);
    };
    R.get_size = function () {
      return { width: N.width, height: N.height };
    };
    R.get_cv = function () {
      return ab.ob();
    };
    R.set_NNCPath = function (a) {
      N.le = a;
    };
    R.set_materialsPath = function (a) {
      N.If = a;
    };
    R.set_modelsPath = function (a) {
      N.Mf = a;
    };
    R.destroy = function () {
      return cb ? cb.v() : Promise.resolve();
    };
    R.init = function (a, c, e, d) {
      cb = Tc();
      R.jb = e
        ? function (n, l) {
            e(n, l);
            R.jb = !1;
          }
        : function () {};
      R.Jo = cb;
      a && (N.aa = a);
      c && R.Sc.push(c);
      cb.$n();
      if (
        !ab.m({
          Ee: "jeefitCanvas",
          pa: d,
          width: Nb,
          height: Ob,
          debug: !1,
          Qf: function () {
            R.me && R.me();
          },
          premultipliedAlpha: !0,
        })
      )
        return R.jb && R.jb("GL_INCOMPATIBLE", "Cannot init Context"), !1;
      R.oe && R.oe();
      a = {
        width: { min: Ya.minWidth, max: Ya.maxWidth, ideal: Ya.idealWidth },
        height: { min: Ya.minHeight, max: Ya.maxHeight, ideal: Ya.idealHeight },
        facingMode: { ideal: "user" },
      };
      c = { video: a, audio: !1 };
      Aa.ah = c;
      a && -1 !== Aa.deviceId && Xb(c, Aa.deviceId);
      $b(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
          ? document.createElement("video")
          : !1,
        function (n) {
          R.pe && R.pe(n);
          Aa.element = n;
          n = Aa.element.videoWidth;
          var l = Aa.element.videoHeight;
          Aa.Ag = { ia: Aa.element, isPot: !1, isFloat: !1, isFlipY: !0 };
          Aa.ka = Z.instance(Aa.Ag);
          cb.mg(n, l);
          cb.pf(n, l) && cb.tg();
        },
        function (n) {
          R.jb && R.jb("WEBCAM_UNAVAILABLE", n);
        },
        c
      );
      return !0;
    };
    window.JEELIZVTO = R;
    var Dc = (function () {
        function a() {
          va.$();
          b.viewport(0, 0, 1, 1);
          ca.set("s64");
          d.g(0);
          Y.l(!1);
          b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, l);
          c(0 < l[0]);
        }
        var c = null,
          e = !1,
          d = null,
          n = !1,
          l = null,
          A = {
            m: function (p) {
              if (n) return !1;
              d = p;
              ca.re([
                {
                  id: "s64",
                  name: "_",
                  h: "uniform sampler2D u39;const vec2 e=vec2(.16,.5);void main(){vec4 a=texture2D(u39,e);float b=step(1.99,a.r);gl_FragColor=vec4(b,0.,0.,1.);}",
                  i: ["u39"],
                  precision: "lowp",
                },
              ]);
              ca.j("s64", [{ type: "1i", name: "u39", value: 0 }]);
              l = new Uint8Array(4);
              return (n = !0);
            },
            start: function (p, u) {
              A.stop();
              c = u;
              e = window.setInterval(a, p);
            },
            stop: function () {
              e && (window.clearInterval(a), (e = !1));
            },
          };
        return A;
      })(),
      oc = oc || {};
    Pb.prototype = {
      constructor: Pb,
      r: 1,
      X: 1,
      b: 1,
      set: function (a) {
        a instanceof Pb
          ? this.J(a)
          : "number" === typeof a
          ? Ic(this, a)
          : "string" === typeof a && Wc(this, a);
        return this;
      },
      qn: (function () {
        function a(c, e, d) {
          0 > d && (d += 1);
          1 < d && --d;
          return d < 1 / 6
            ? c + 6 * (e - c) * d
            : 0.5 > d
            ? e
            : d < 2 / 3
            ? c + 6 * (e - c) * (2 / 3 - d)
            : c;
        }
        return function (c, e, d) {
          c = oc.Math.gp(c, 1);
          e = oc.Math.ze(e, 0, 1);
          d = oc.Math.ze(d, 0, 1);
          0 === e
            ? (this.r = this.X = this.b = d)
            : ((e = 0.5 >= d ? d * (1 + e) : d + e - d * e),
              (d = 2 * d - e),
              (this.r = a(d, e, c + 1 / 3)),
              (this.X = a(d, e, c)),
              (this.b = a(d, e, c - 1 / 3)));
          return this;
        };
      })(),
      clone: function () {
        return new this.constructor(this.r, this.X, this.b);
      },
      J: function (a) {
        this.r = a.r;
        this.X = a.X;
        this.b = a.b;
        return this;
      },
      add: function (a) {
        this.r += a.r;
        this.X += a.X;
        this.b += a.b;
        return this;
      },
      multiply: function (a) {
        this.r *= a.r;
        this.X *= a.X;
        this.b *= a.b;
        return this;
      },
      Ba: function (a) {
        this.r *= a;
        this.X *= a;
        this.b *= a;
        return this;
      },
      lb: function (a, c) {
        void 0 === c && (c = 0);
        this.r = a[c];
        this.X = a[c + 1];
        this.b = a[c + 2];
        return this;
      },
    };
    var Xc = {};
    mc.prototype = {
      constructor: mc,
      get x() {
        return this.B;
      },
      set x(a) {
        this.B = a;
      },
      get y() {
        return this.C;
      },
      set y(a) {
        this.C = a;
      },
      get z() {
        return this.D;
      },
      set z(a) {
        this.D = a;
      },
      get w() {
        return this.O;
      },
      set w(a) {
        this.O = a;
      },
      set: function (a, c, e, d) {
        this.B = a;
        this.C = c;
        this.D = e;
        this.O = d;
        return this;
      },
      clone: function () {
        return new this.constructor(this.B, this.C, this.D, this.O);
      },
      J: function (a) {
        this.B = a.x;
        this.C = a.y;
        this.D = a.z;
        this.O = a.w;
        return this;
      },
      inverse: function () {
        this.B *= -1;
        this.C *= -1;
        this.D *= -1;
        this.normalize();
        return this;
      },
      cd: function (a) {
        return this.B * a.B + this.C * a.C + this.D * a.D + this.O * a.O;
      },
      xf: function () {
        return (
          this.B * this.B + this.C * this.C + this.D * this.D + this.O * this.O
        );
      },
      length: function () {
        return Math.sqrt(
          this.B * this.B + this.C * this.C + this.D * this.D + this.O * this.O
        );
      },
      normalize: function () {
        var a = this.length();
        0 === a
          ? ((this.D = this.C = this.B = 0), (this.O = 1))
          : ((a = 1 / a),
            (this.B *= a),
            (this.C *= a),
            (this.D *= a),
            (this.O *= a));
        return this;
      },
      multiply: function (a, c) {
        return void 0 !== c
          ? (console.warn(
              "JETHREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
            ),
            Jc(this, a, c))
          : Jc(this, this, a);
      },
      lb: function (a, c) {
        void 0 === c && (c = 0);
        this.B = a[c];
        this.C = a[c + 1];
        this.D = a[c + 2];
        this.O = a[c + 3];
        return this;
      },
    };
    Qb.prototype = {
      constructor: Qb,
      get width() {
        return this.x;
      },
      set width(a) {
        this.x = a;
      },
      get height() {
        return this.y;
      },
      set height(a) {
        this.y = a;
      },
      set: function (a, c) {
        this.x = a;
        this.y = c;
        return this;
      },
      Pi: function (a) {
        this.x = a;
        return this;
      },
      Qi: function (a) {
        this.y = a;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y);
      },
      J: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this;
      },
      add: function (a, c) {
        if (void 0 !== c)
          return (
            console.warn(
              "JETHREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.Tc(a, c)
          );
        this.x += a.x;
        this.y += a.y;
        return this;
      },
      Tc: function (a, c) {
        this.x = a.x + c.x;
        this.y = a.y + c.y;
        return this;
      },
      sub: function (a, c) {
        if (void 0 !== c)
          return (
            console.warn(
              "JETHREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.ab(a, c)
          );
        this.x -= a.x;
        this.y -= a.y;
        return this;
      },
      ab: function (a, c) {
        this.x = a.x - c.x;
        this.y = a.y - c.y;
        return this;
      },
      multiply: function (a) {
        this.x *= a.x;
        this.y *= a.y;
        return this;
      },
      Ba: function (a) {
        isFinite(a) ? ((this.x *= a), (this.y *= a)) : (this.y = this.x = 0);
        return this;
      },
      Ne: function (a) {
        return this.Ba(1 / a);
      },
      min: function (a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        return this;
      },
      max: function (a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        return this;
      },
      ze: function (a, c) {
        this.x = Math.max(a.x, Math.min(c.x, this.x));
        this.y = Math.max(a.y, Math.min(c.y, this.y));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      },
      cd: function (a) {
        return this.x * a.x + this.y * a.y;
      },
      xf: function () {
        return this.x * this.x + this.y * this.y;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      normalize: function () {
        return this.Ne(this.length());
      },
      lb: function (a, c) {
        void 0 === c && (c = 0);
        this.x = a[c];
        this.y = a[c + 1];
        return this;
      },
    };
    Oa.prototype = {
      constructor: Oa,
      set: function (a, c, e) {
        this.x = a;
        this.y = c;
        this.z = e;
        return this;
      },
      Pi: function (a) {
        this.x = a;
        return this;
      },
      Qi: function (a) {
        this.y = a;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y, this.z);
      },
      J: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this;
      },
      add: function (a, c) {
        if (void 0 !== c)
          return (
            console.warn(
              "JETHREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.Tc(a, c)
          );
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this;
      },
      Tc: function (a, c) {
        this.x = a.x + c.x;
        this.y = a.y + c.y;
        this.z = a.z + c.z;
        return this;
      },
      sub: function (a, c) {
        if (void 0 !== c)
          return (
            console.warn(
              "JETHREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.ab(a, c)
          );
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
      },
      ab: function (a, c) {
        this.x = a.x - c.x;
        this.y = a.y - c.y;
        this.z = a.z - c.z;
        return this;
      },
      multiply: function (a, c) {
        if (void 0 !== c)
          return (
            console.warn(
              "JETHREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
            ),
            (this.x = a.x * c.x),
            (this.y = a.y * c.y),
            (this.z = a.z * c.z),
            this
          );
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this;
      },
      Ba: function (a) {
        isFinite(a)
          ? ((this.x *= a), (this.y *= a), (this.z *= a))
          : (this.z = this.y = this.x = 0);
        return this;
      },
      Ne: function (a) {
        return this.Ba(1 / a);
      },
      min: function (a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        this.z = Math.min(this.z, a.z);
        return this;
      },
      max: function (a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        this.z = Math.max(this.z, a.z);
        return this;
      },
      ze: function (a, c) {
        this.x = Math.max(a.x, Math.min(c.x, this.x));
        this.y = Math.max(a.y, Math.min(c.y, this.y));
        this.z = Math.max(a.z, Math.min(c.z, this.z));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
      },
      cd: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
      },
      xf: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      normalize: function () {
        return this.Ne(this.length());
      },
      lb: function (a, c) {
        void 0 === c && (c = 0);
        this.x = a[c];
        this.y = a[c + 1];
        this.z = a[c + 2];
        return this;
      },
    };
    Rb.Dj = "XYZ";
    Rb.prototype = {
      constructor: Rb,
      get x() {
        return this.B;
      },
      set x(a) {
        this.B = a;
      },
      get y() {
        return this.C;
      },
      set y(a) {
        this.C = a;
      },
      get z() {
        return this.D;
      },
      set z(a) {
        this.D = a;
      },
      get order() {
        return this.Na;
      },
      set order(a) {
        this.Na = a;
      },
      set: function (a, c, e, d) {
        this.B = a;
        this.C = c;
        this.D = e;
        this.Na = d || this.Na;
        return this;
      },
      clone: function () {
        return new this.constructor(this.B, this.C, this.D, this.Na);
      },
      J: function (a) {
        this.B = a.B;
        this.C = a.C;
        this.D = a.D;
        this.Na = a.Na;
        return this;
      },
      lb: function (a) {
        this.B = a[0];
        this.C = a[1];
        this.D = a[2];
        void 0 !== a[3] && (this.Na = a[3]);
        return this;
      },
    };
    vc.prototype = {
      constructor: vc,
      set: function (a, c) {
        this.min.J(a);
        this.max.J(c);
        return this;
      },
      clone: function () {
        return new this.constructor().J(this);
      },
      J: function (a) {
        this.min.J(a.min);
        this.max.J(a.max);
        return this;
      },
      empty: function () {
        return (
          this.max.x < this.min.x ||
          this.max.y < this.min.y ||
          this.max.z < this.min.z
        );
      },
      size: function (a) {
        return (a || new Oa()).ab(this.max, this.min);
      },
      getParameter: function (a, c) {
        return (c || new Oa()).set(
          (a.x - this.min.x) / (this.max.x - this.min.x),
          (a.y - this.min.y) / (this.max.y - this.min.y),
          (a.z - this.min.z) / (this.max.z - this.min.z)
        );
      },
      translate: function (a) {
        this.min.add(a);
        this.max.add(a);
        return this;
      },
    };
    Sb.prototype = {
      constructor: Sb,
      set: function (a, c, e, d, n, l, A, p, u, t, y, H, C, w, E, k) {
        var g = this.elements;
        g[0] = a;
        g[4] = c;
        g[8] = e;
        g[12] = d;
        g[1] = n;
        g[5] = l;
        g[9] = A;
        g[13] = p;
        g[2] = u;
        g[6] = t;
        g[10] = y;
        g[14] = H;
        g[3] = C;
        g[7] = w;
        g[11] = E;
        g[15] = k;
        return this;
      },
      clone: function () {
        return new Sb().lb(this.elements);
      },
      J: function (a) {
        this.elements.set(a.elements);
        return this;
      },
      multiply: function (a, c) {
        return void 0 !== c
          ? (console.warn(
              "JETHREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
            ),
            Lc(this, a, c))
          : Lc(this, this, a);
      },
      Ba: function (a) {
        var c = this.elements;
        c[0] *= a;
        c[4] *= a;
        c[8] *= a;
        c[12] *= a;
        c[1] *= a;
        c[5] *= a;
        c[9] *= a;
        c[13] *= a;
        c[2] *= a;
        c[6] *= a;
        c[10] *= a;
        c[14] *= a;
        c[3] *= a;
        c[7] *= a;
        c[11] *= a;
        c[15] *= a;
        return this;
      },
      setPosition: function (a) {
        var c = this.elements;
        c[12] = a.x;
        c[13] = a.y;
        c[14] = a.z;
        return this;
      },
      translate: function () {
        console.error("JETHREE.Matrix4: .translate() has been removed.");
      },
      scale: function (a) {
        var c = this.elements,
          e = a.x,
          d = a.y;
        a = a.z;
        c[0] *= e;
        c[4] *= d;
        c[8] *= a;
        c[1] *= e;
        c[5] *= d;
        c[9] *= a;
        c[2] *= e;
        c[6] *= d;
        c[10] *= a;
        c[3] *= e;
        c[7] *= d;
        c[11] *= a;
        return this;
      },
      lb: function (a) {
        this.elements.set(a);
        return this;
      },
    };
    wc.prototype = {
      constructor: wc,
      clone: function () {
        return new this.constructor().J(this);
      },
      J: function (a) {
        this.a = a.a;
        this.b = a.b;
        this.c = a.c;
        this.Ka.J(a.Ka);
        this.color.J(a.color);
        this.Wb = a.Wb;
        for (var c = 0, e = a.fe.length; c < e; c++)
          this.fe[c] = a.fe[c].clone();
        c = 0;
        for (e = a.Hg.length; c < e; c++) this.Hg[c] = a.Hg[c].clone();
        return this;
      },
    };
    var F = (function () {
        function a(q, f, L) {
          f = q.createShader(f);
          q.shaderSource(f, L);
          q.compileShader(f);
          return q.getShaderParameter(f, q.COMPILE_STATUS) ? f : !1;
        }
        function c(q, f) {
          da.ja() && (f.h = f.h.replace(/gl_FragData\[([0-3])\]/g, "gbuf$1"));
          f.df = a(q, q.VERTEX_SHADER, f.s, f.name + " VERTEX");
          f.cf = a(q, q.FRAGMENT_SHADER, f.h, f.name + " FRAGMENT");
          var L = q.createProgram();
          q.attachShader(L, f.df);
          q.attachShader(L, f.cf);
          q.linkProgram(L);
          return L;
        }
        function e(q) {
          q.s = "#version 300 es\n" + q.s.replace(/varying/g, "out");
          q.h = "#version 300 es\n" + q.h.replace(/varying/g, "in");
          q.s = q.s.replace(/texture2D\(/g, "texture(");
          q.h = q.h.replace(/texture2D\(/g, "texture(");
          q.ca ||
            ((q.h = q.h.replace(
              /void main/g,
              "out vec4 FragColor;\nvoid main"
            )),
            (q.h = q.h.replace(/gl_FragColor/g, "FragColor")));
          var f = 0,
            L = [];
          q.s = q.s.replace(
            /attribute ([a-z]+[0-4]*) ([_a-zA-Z,0-9\s]+);/g,
            function (O, v, m) {
              var r = "";
              m.split(",").forEach(function (M) {
                M = M.trim();
                r += "layout(location = " + f + ") in " + v + " " + M + ";\n";
                L.push(M);
                ++f;
              });
              return r;
            }
          );
          q.Ij = L;
        }
        function d(q) {
          return ["float", "sampler2D", "int"]
            .map(function (f) {
              return "precision " + q + " " + f + ";\n";
            })
            .join("");
        }
        function n(q, f) {
          if (f.Ph) return !1;
          var L = da.ja();
          T.Ap || L || q.enableVertexAttribArray(0);
          void 0 === f.ca && (f.ca = !1);
          f.ca && (f.Qc = L ? 3 : 2);
          f.id = I++;
          void 0 === f.Qc && (f.Qc = 2);
          void 0 === f.precision && (f.precision = "highp");
          f.ca &&
            (f.h =
              (da.ja()
                ? "precision highp float;\n          layout(location = 0) out vec4 gbuf0;\n          layout(location = 1) out vec4 gbuf1;\n          layout(location = 2) out vec4 gbuf2;\n          layout(location = 3) out vec4 gbuf3;\n"
                : "#extension GL_EXT_draw_buffers : require\n") + f.h);
          void 0 === f.s &&
            (f.s =
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
          var O = d(f.precision);
          f.h = O + f.h;
          f.s = O + f.s;
          L && 3 <= f.Qc && e(f);
          f.Da &&
            f.Da.forEach(function (v) {
              f.s = f.s.replace(v.search, v.replace);
              f.h = f.h.replace(v.search, v.replace);
            });
          f.na = c(q, f);
          f.A = {};
          f.i.forEach(function (v) {
            f.A[v] = q.getUniformLocation(f.na, v);
          });
          f.attributes = {};
          f.va = [];
          f.Gg = 0;
          void 0 === f.I && (f.I = ["a0"]);
          void 0 === f.P && (f.P = [2]);
          f.I.forEach(function (v, m) {
            var r =
              L && 3 <= f.Qc ? f.Ij.indexOf(v) : q.getAttribLocation(f.na, v);
            f.attributes[v] = r;
            f.va.push(r);
            f.Gg += 4 * f.P[m];
          });
          f.set = function () {
            g !== f.id &&
              (-1 !== g && G.H(),
              (g = f.id),
              (G = f),
              q.useProgram(f.na),
              f.va.forEach(function (v) {
                0 !== v && q.enableVertexAttribArray(v);
              }));
          };
          f.H = function () {
            g = -1;
            f.va.forEach(function (v) {
              0 !== v && q.disableVertexAttribArray(v);
            });
          };
          f.Ph = !0;
        }
        function l(q, f) {
          n(q, f);
          f.set();
          g = -1;
          return f;
        }
        function A() {
          return {
            name: "_",
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            precision: "highp",
          };
        }
        function p() {
          h.j("s93", [{ type: "1i", name: "u1", value: 0 }]);
          h.j("s94", [{ type: "1i", name: "u148", value: 0 }]);
          h.j("s95", [{ type: "1i", name: "u70", value: 0 }]);
        }
        function u() {
          var q = "u39 u138 u139 u140 u141 u40 u74".split(" ").concat(w, E);
          k.s96 = {
            name: "_",
            h: "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
            s: "attribute vec3 a0;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u144,u145,u140,u141,u147;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.,1.);const vec3 o=vec3(1.,1.,1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,p);vec2 f=u81*e;vec3 c=u81*o;vec2 t=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,q).rgb+vec3(u75,0.,0.),u78,c);float u=mix(texture2D(u39,r).r,0.,u81);a.z+=u;mat3 v=s(a);vec3 w=mix(u138,u79,c);float x=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 y=mat2(h,i,-i,h);b.xy=y*b.xy;float z=mix(u77,1.,u81);vec2 j=u76/t;vec3 k=a0;float A=max(0.,-a0.z-u140)*u141;k.x+=A*sign(a0.x)*(1.-u81);vec3 l=v*(k+w)*x+b;vec2 B=j*z;vec3 C=vec3(g*B,-j)+l*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(C,1.)),vv0=l,vv1=smoothstep(u144,u145,a0.z);}",
            i: ["u144", "u145"].concat(q),
            I: ["a0"],
            precision: "highp",
          };
          k.s97 = {
            name: "_",
            h: "uniform sampler2D u1;uniform vec3 u142;uniform float u69;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u142,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u142,b,u69),a.a);gl_FragColor=c;}",
            s: "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u140,u141,u147;varying vec2 vv0;const vec2 e=vec2(1.,1.);const vec3 m=vec3(1.,1.,1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,n);vec2 f=u81*e;vec3 c=u81*m;vec2 r=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,o).rgb+vec3(u75,0.,0.),u78,c);float s=mix(texture2D(u39,p).r,0.,u81);a.z+=s;mat3 t=q(a);vec3 u=mix(u138,u79,c);float v=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u77,1.,u81);vec2 j=u76/r;vec3 k=a0;float y=max(0.,-a0.z-u140)*u141;k.x+=y*sign(a0.x)*(1.-u81);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(B,1.)),vv0=a1;}",
            i: ["u142"].concat(H, q),
            I: ["a0", "a1"],
            P: [3, 2],
            precision: "lowp",
          };
          k.s98 = {
            name: "_",
            h: "uniform vec3 u142;void main(){gl_FragColor=vec4(u142,0.);}",
            s: "attribute vec3 a0;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u140,u141,u147;const vec2 e=vec2(1.,1.);const vec3 l=vec3(1.,1.,1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,m);vec2 f=u81*e;vec3 c=u81*l;vec2 q=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,n).rgb+vec3(u75,0.,0.),u78,c);float r=mix(texture2D(u39,o).r,0.,u81);a.z+=r;mat3 s=p(a);vec3 t=mix(u138,u79,c);float u=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u77,1.,u81);vec2 j=u76/q;vec3 k=a0;float x=max(0.,-a0.z-u140)*u141;k.x+=x*sign(a0.x)*(1.-u81);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(A,1.));}",
            i: ["u142"].concat(q),
            P: [3],
            precision: "lowp",
          };
          k.s99 = {
            name: "_",
            h: "uniform vec4 u7;varying vec3 vv0;varying float vv1;void main(){float a=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv1);gl_FragColor=vec4(normalize(vv0),a);}",
            s: "attribute vec3 a0,a2;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u140,u141,u147;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.,1.);const vec3 o=vec3(1.,1.,1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,p);vec2 f=u81*e;vec3 c=u81*o;vec2 t=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,q).rgb+vec3(u75,0.,0.),u78,c);float u=mix(texture2D(u39,r).r,0.,u81);a.z+=u;mat3 h=s(a);vec3 v=mix(u138,u79,c);float w=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 x=mat2(i,j,-j,i);b.xy=x*b.xy;float y=mix(u77,1.,u81);vec2 k=u76/t;vec3 l=a0;float z=max(0.,-a0.z-u140)*u141;l.x+=z*sign(a0.x)*(1.-u81);vec3 A=h*(l+v)*w+b;vec2 B=k*y;vec3 C=vec3(g*B,-k)+A*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(C,1.)),vv0=h*a2*vec3(1.,-1.,-1.),vv1=a0.y;}",
            i: ["u7", "u74"].concat(q),
            I: ["a0", "a2"],
            precision: "highp",
          };
          k.s100 = {
            name: "_",
            h: "uniform sampler2D u148;uniform vec4 u7;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=vec3(0.,0.,-1.),c=normalize(vv1),b=texture2D(u148,vv2).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv1:a;float m=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv3);gl_FragColor=vec4(a,m);}",
            s: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u140,u141,u147;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec2 e=vec2(1.,1.);const vec3 q=vec3(1.,1.,1.);const vec2 F=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,r);vec2 f=u81*e;vec3 c=u81*q;vec2 v=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,s).rgb+vec3(u75,0.,0.),u78,c);float w=mix(texture2D(u39,t).r,0.,u81);a.z+=w;mat3 h=u(a);vec3 x=mix(u138,u79,c);float y=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 z=mat2(i,j,-j,i);b.xy=z*b.xy;float A=mix(u77,1.,u81);vec2 k=u76/v;vec3 l=a0;float B=max(0.,-a0.z-u140)*u141;l.x+=B*sign(a0.x)*(1.-u81);vec3 C=h*(l+x)*y+b;vec2 D=k*A;vec3 E=vec3(g*D,-k)+C*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv0=a3,vv2=a1,vv3=a0.y;}",
            i: ["u7", "u74", "u148"].concat(q),
            I: ["a3", "a0", "a2", "a1"],
            P: [4, 3, 3, 2],
            precision: "highp",
          };
          k.s101 = {
            name: "_",
            h: "uniform vec4 u107;uniform float u143;void main(){float b=u143;vec4 a=u107;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
            s: "attribute vec3 a0;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u140,u141,u147;const vec2 e=vec2(1.,1.);const vec3 l=vec3(1.,1.,1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,m);vec2 f=u81*e;vec3 c=u81*l;vec2 q=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,n).rgb+vec3(u75,0.,0.),u78,c);float r=mix(texture2D(u39,o).r,0.,u81);a.z+=r;mat3 s=p(a);vec3 t=mix(u138,u79,c);float u=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u77,1.,u81);vec2 j=u76/q;vec3 k=a0;float x=max(0.,-a0.z-u140)*u141;k.x+=x*sign(a0.x)*(1.-u81);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(A,1.));}",
            i: ["u107", "u143"].concat(q),
            precision: "lowp",
          };
          k.s102 = {
            name: "_",
            h: "uniform sampler2D u70;uniform vec4 u107,u71;uniform float u143;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u143;vec4 a=u107,d=texture2D(u70,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u71*e),c=mix(c,l,u71.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
            s: "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u140,u141,u147;varying vec2 vv0;const vec2 e=vec2(1.,1.);const vec3 m=vec3(1.,1.,1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,n);vec2 f=u81*e;vec3 c=u81*m;vec2 r=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,o).rgb+vec3(u75,0.,0.),u78,c);float s=mix(texture2D(u39,p).r,0.,u81);a.z+=s;mat3 t=q(a);vec3 u=mix(u138,u79,c);float v=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u77,1.,u81);vec2 j=u76/r;vec3 k=a0;float y=max(0.,-a0.z-u140)*u141;k.x+=y*sign(a0.x)*(1.-u81);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(B,1.)),vv0=a1;}",
            i: ["u107", "u143"].concat(C, q),
            I: ["a0", "a1"],
            P: [3, 2],
            precision: "lowp",
          };
          q = ["u131", "u119", "u132"];
          k.s103 = {
            name: "_",
            h: "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
            s: "attribute vec3 a0;uniform mat4 u131,u119,u132;varying vec3 vv0;varying float vv1;void main(){vec4 a=u132*vec4(a0,1.);gl_Position=u131*u119*a,vv0=a.xyz,vv1=1.;}",
            i: q,
            precision: "highp",
          };
          k.s104 = {
            name: "_",
            h: "varying vec3 vv0;void main(){gl_FragColor=vec4(normalize(vv0),1.);}",
            s: "attribute vec3 a0,a2;uniform mat4 u131,u119,u132;varying vec3 vv0;varying float vv1;void main(){vec4 a=u132*vec4(a2,0.);gl_Position=u131*u119*u132*vec4(a0,1.),vv0=a.xyz,vv1=a0.y;}",
            i: q,
            I: ["a0", "a2"],
            precision: "highp",
          };
          k.s94 = {
            name: "_",
            h: "uniform sampler2D u148;uniform vec3 u149;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=normalize(vv1+u149),c=normalize(vv2),b=texture2D(u148,vv3).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv2:a,gl_FragColor=vec4(a,1.);}",
            s: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;void main(){vec4 b=u132*vec4(a2,0.),a=u132*vec4(a0,1.);gl_Position=u131*u119*a,vv0=a3,vv2=b.xyz,vv3=a1,vv1=a.xyz;}",
            i: ["u148", "u149"].concat(q),
            I: ["a0", "a2", "a1", "a3"],
            precision: "highp",
          };
          k.s93 = {
            name: "_",
            h: "uniform sampler2D u1;uniform vec3 u142;uniform float u69;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u142,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u142,b,u69),a.a);gl_FragColor=c;}",
            s: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec2 vv0;const vec4 f=vec4(0.,0.,5e-4,0.);void main(){gl_Position=u131*u119*u132*vec4(a0,1.)+f,vv0=a1;}",
            i: ["u142"].concat(H, q),
            I: ["a0", "a1"],
            Da: [{ search: "0.0005", replace: xa.ea() ? "0.0005" : "0.0" }],
            precision: "lowp",
          };
          k.s105 = {
            name: "_",
            h: "uniform vec4 u107;uniform float u143;void main(){float b=u143;vec4 a=u107;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
            s: "attribute vec3 a0;uniform mat4 u131,u119,u132;void main(){gl_Position=u131*u119*u132*vec4(a0,1.);}",
            i: ["u107"].concat(q),
            precision: "highp",
          };
          k.s95 = {
            name: "_",
            h: "uniform sampler2D u70;uniform vec4 u107,u71;uniform float u143;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u143;vec4 a=u107,d=texture2D(u70,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u71*e),c=mix(c,l,u71.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
            s: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec2 vv0;void main(){gl_Position=u131*u119*u132*vec4(a0,1.),vv0=a1;}",
            i: ["u107"].concat(C, q),
            I: ["a0", "a1"],
            P: [3, 2],
            precision: "highp",
          };
        }
        function t() {
          for (var q in k) n(b, k[q]);
        }
        var y = !1,
          H = ["u1", "u69"],
          C = ["u70", "u71"],
          w = "u72 u73 u74 u75 u76 u77".split(" "),
          E = "u78 u79 u80 u81 u82 u83".split(" "),
          k = {},
          g = -1,
          G = null,
          I = 0,
          h = {
            oa: function (q, f) {
              k[q] = f;
              y && n(b, k[q]);
            },
            Np: function (q, f) {
              k[q] = f;
              f.Ph = !1;
              n(b, k[q]);
            },
            Ub: function () {
              return y;
            },
            m: function () {
              k.s0 = A();
              k.s1 = {
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1"],
                precision: "lowp",
              };
              k.s65 = {
                name: "_",
                h: "uniform sampler2D u1,u6;uniform float u7;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){gl_FragColor=vec4(mix(texture2D(u6,vv0).rgb,texture2D(u1,vv0).rgb,u7*f),1.);}",
                i: ["u1", "u6", "u7"],
                precision: "highp",
              };
              k.s66 = {
                name: "_",
                h: "uniform sampler2D u1,u6;uniform float u7;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){gl_FragColor=mix(texture2D(u6,vv0),texture2D(u1,vv0),u7*f);}",
                i: ["u1", "u6", "u7"],
                precision: "highp",
              };
              k.s12 = {
                name: "_",
                h: "uniform sampler2D u1,u84;uniform vec2 u85;uniform float u86,u87;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 b=texture2D(u84,vv0*u85),c=texture2D(u1,vv0*u85);float a=smoothstep(u86,0.,vv0.y);a+=smoothstep(1.-u86,1.,vv0.y),gl_FragColor=pow(mix(c,b,a*f),u87*f);}",
                i: ["u1", "u85", "u84", "u86", "u87"],
              };
              k.s67 = {
                name: "_",
                h: "uniform sampler2D u1,u84;uniform vec2 u85;uniform float u86,u87;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),f=exp2(c);vec3 g=clamp(b/f,0.,1.);return vec4(g,(c+128.)/256.);}void main(){vec2 a=vv0*u85;float c=floor(a.x),d=mod(c,2.);a.x=mod(a.x,1.),a.x=mix(a.x,1.-a.x,d);vec3 f=texture2D(u84,a).rgb,g=texture2D(u1,a).rgb;float b=smoothstep(u86,0.,vv0.y);b+=smoothstep(1.-u86,1.,vv0.y);vec3 j=mix(g,f,b*h);vec4 k=i(pow(j,u87*h));gl_FragColor=k;}",
                i: ["u1", "u85", "u84", "u86", "u87"],
                precision: "highp",
              };
              k.s68 = {
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);if(a.a<.5)discard;gl_FragColor=a;}",
                i: ["u1"],
                precision: "lowp",
              };
              k.s69 = {
                name: "_",
                h: "uniform sampler2D u1,u88;uniform vec2 u8;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u8*f).rgb+texture2D(u1,a+u8*g).rgb+texture2D(u1,a+u8*h).rgb+texture2D(u1,a+u8*i).rgb;gl_FragColor=vec4(b/5.,1.);}",
                i: ["u1", "u8"],
                precision: "lowp",
              };
              k.s70 = {
                name: "_",
                h: "uniform sampler2D u1,u88,u39;uniform vec2 u8,u89;varying vec2 vv0;const vec3 k=vec3(1.,1.,1.);const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u8*f).rgb+texture2D(u1,a+u8*g).rgb+texture2D(u1,a+u8*h).rgb+texture2D(u1,a+u8*i).rgb;float c=texture2D(u39,vec2(.5,.5)).a,d=u89.x+pow(c,2.)*(u89.y-u89.x);vec3 j=mix(b/5.,texture2D(u88,a).rgb,d);gl_FragColor=vec4(j,1.);}",
                i: ["u1", "u88", "u8", "u39", "u89"],
                precision: "lowp",
              };
              k.s71 = {
                name: "_",
                h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;const vec3 f=vec3(.299,.587,.114);const float m=.007813,n=.125,h=8.;void main(){vec2 x=vv0;vec3 o=texture2D(u1,vv0+vec2(-1.,-1.)*u8).xyz,p=texture2D(u1,vv0+vec2(1.,-1.)*u8).xyz,q=texture2D(u1,vv0+vec2(-1.,1.)*u8).xyz,r=texture2D(u1,vv0+vec2(1.,1.)*u8).xyz,s=texture2D(u1,vv0).xyz;float b=dot(o,f),c=dot(p,f),e=dot(q,f),g=dot(r,f),i=dot(s,f),t=min(i,min(min(b,c),min(e,g))),u=max(i,max(max(b,c),max(e,g)));vec2 a;a.x=-(b+c-(e+g)),a.y=b+e-(c+g);float v=max((b+c+e+g)*(.25*n),m),w=1./(min(abs(a.x),abs(a.y))+v);a=min(vec2(h,h),max(vec2(-h,-h),a*w))*u8;vec3 j=.5*(texture2D(u1,vv0+a*-.166667).rgb+texture2D(u1,vv0+a*.166667).rgb),k=j*.5+.25*(texture2D(u1,vv0+a*-.5).rgb+texture2D(u1,vv0+a*.5).rgb);float l=dot(k,f);gl_FragColor=l<t||l>u?vec4(j,1.):vec4(k,1.);}",
                i: ["u1", "u8"],
                precision: "lowp",
              };
              k.s43 = {
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(0.,0.,0.);vec4 g(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),h=exp2(c);vec3 i=clamp(b/h,0.,1.);return vec4(i,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=g(max(a,f));}",
                i: ["u1"],
                precision: "highp",
              };
              k.s72 = {
                name: "_",
                h: "uniform sampler2D u90,u91;uniform float u92,u93;varying vec2 vv0;void main(){vec3 a=texture2D(u91,vv0).rgb,b=texture2D(u90,vv0).rgb;gl_FragColor=vec4(b*u93+u92*a,1.);}",
                i: ["u90", "u91", "u92", "u93"],
                precision: "highp",
              };
              k.s73 = {
                name: "_",
                h: "uniform sampler2D u94,u95;uniform float u87;varying vec2 vv0;const int j=8888;const float e=3.141592;const vec2 k=vec2(0.,0.);const vec3 n=vec3(1.,1.,1.),o=vec3(0.,0.,0.);void main(){float p=e*(vv0.x*2.-1.),q=e/2.*(vv0.y*2.-1.),b,c,r,l,m;vec4 d;vec3 f=o;vec2 g=k,a=k;for(int h=0;h<j;h+=1)a.x=float(h),a.y=floor(a.x/64.),d=texture2D(u95,a/64.),b=e*d.r,c=2.*asin(sqrt(.25+d.g*.25)),l=p+c*cos(b),m=q+c*sin(b),g.x=.5+.5*l/e,g.y=.5+m/e,f+=pow(texture2D(u94,g).rgb,u87*n);f/=float(j),gl_FragColor=vec4(f,1.);}",
                i: ["u94", "u95", "u87"],
                precision: "lowp",
                Da: [{ search: "8888", replace: T.$l[da.T()] }],
              };
              k.s74 = {
                name: "_",
                h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);float b=.031496*texture2D(u1,vv0-3.*u8).a+.110236*texture2D(u1,vv0-2.*u8).a+.220472*texture2D(u1,vv0-u8).a+.275591*a.a+.220472*texture2D(u1,vv0+u8).a+.110236*texture2D(u1,vv0+2.*u8).a+.031496*texture2D(u1,vv0+3.*u8).a;gl_FragColor=vec4(a.rgb,4.*b);}",
                i: ["u1", "u8"],
                precision: "lowp",
              };
              k.s75 = {
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=.3*pow(a.a,2.);gl_FragColor=vec4(a.rgb+b*f,1.);}",
                i: ["u1"],
                precision: "lowp",
              };
              k.s76 = {
                name: "_",
                h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){vec4 a=.031496*texture2D(u1,vv0-3.*u8)+.110236*texture2D(u1,vv0-2.*u8)+.220472*texture2D(u1,vv0-u8)+.275591*texture2D(u1,vv0)+.220472*texture2D(u1,vv0+u8)+.110236*texture2D(u1,vv0+2.*u8)+.031496*texture2D(u1,vv0+3.*u8);gl_FragColor=a;}",
                i: ["u1", "u8"],
                precision: "lowp",
              };
              k.s77 = {
                name: "_",
                h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0-3.*u8)+texture2D(u1,vv0-2.*u8)+texture2D(u1,vv0-u8)+texture2D(u1,vv0)+texture2D(u1,vv0+u8)+texture2D(u1,vv0+2.*u8)+texture2D(u1,vv0+3.*u8);gl_FragColor=a/7.;}",
                i: ["u1", "u8"],
                precision: "lowp",
              };
              k.s78 = {
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.);const float e=256.;void main(){vec4 b=g;float c=0.;vec2 d;for(float a=0.;a<e;a+=1.)d=vec2((a+.5)/e,vv0.y),b+=texture2D(u1,d),c+=1.;gl_FragColor=b/c;}",
                i: ["u1"],
                precision: "highp",
              };
              k.s79 = {
                name: "_",
                h: "uniform sampler2D u1,u84;varying vec2 vv0;const vec4 h=vec4(1.,1.,1.,1.);const float f=0.,g=.3;void main(){vec4 b=texture2D(u84,vv0),c=texture2D(u1,vv0);float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=mix(c,b,a*h);}",
                i: ["u1", "u84"],
                precision: "highp",
              };
              k.s80 = {
                name: "_",
                h: "uniform sampler2D u1,u84;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);const float f=0.,g=.3;vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),j=exp2(c);vec3 k=clamp(b/j,0.,1.);return vec4(k,(c+128.)/256.);}void main(){vec3 b=texture2D(u84,vv0).rgb,c=texture2D(u1,vv0).rgb;float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=i(mix(c,b,a*h));}",
                i: ["u1", "u84"],
                precision: "highp",
              };
              k.s81 = {
                name: "_",
                h: "uniform sampler2D u1,u96,u2,u97;uniform vec4 u98;uniform vec2 u99;uniform float u100,u101,u102,u103;varying vec2 vv0;const vec2 g=vec2(1.,1.),h=vec2(.5,.5);const float e=3.141592;void main(){vec4 d=texture2D(u1,vv0),i=texture2D(u96,vec2(1.-vv0.x,vv0.y));float j=step(texture2D(u97,vec2(.25,.5)).r,1.);vec2 a=vv0*2.-g;float k=texture2D(u2,a*u99*.5+h).r,l=atan(a.x,a.y),m=-(mod(u100,2.*e)-e),b=mod(l-m+e,2.*e)-e,n=smoothstep(0.,u101,b),c=.5+u103*(.5-n);c*=(sign(b)+1.)/2.;vec4 o=i+c*u98*k;gl_FragColor=mix(d,o,j*u102);}",
                i: "u1 u2 u97 u96 u98 u100 u101 u102 u99 u103".split(" "),
                precision: "lowp",
              };
              var q =
                "u104 u105 u106 u107 u94 u108 u22 u109 u96 u110 u111 u112 u113 u114 u8".split(
                  " "
                );
              T.da &&
                (k.s82 = {
                  name: "_",
                  h: "uniform sampler2D u104,u105,u106,u107,u94,u108,u115,u96;uniform vec3 u109,u112;uniform vec2 u8;uniform float u22,u116,u111,u113,u110;varying vec2 vv0;const float j=3.141592;const vec3 u=vec3(0.,0.,0.),v=vec3(.299,.587,.114);const float w=2.;vec3 l(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 x(vec3 a){float b=atan(a.x,a.z),c=acos(-a.y);return vec2(.5-.5*b/j,1.-c/j);}vec2 y(vec3 a,float b){vec2 d=vec2(1.,.5)/pow(2.,b),f=vec2(0.,1.-pow(.5,b));float g=atan(a.x,a.z),h=acos(-a.y),c=.5+.5*g/j,i=h/j,k=pow(2.,b)/u110;c=(1.-k)*c;return f+vec2(c,i)*d;}void main(){vec4 c=texture2D(u104,vv0);vec3 k=texture2D(u96,vec2(1.-vv0.x,vv0.y)).rgb;if(c.a<.01){gl_FragColor=vec4(k,0.);return;}float z=c.a;vec3 A=c.rgb,B=A+u109;vec4 b=texture2D(u107,vv0),m=texture2D(u105,vv0);vec3 d=m.rgb;float f=m.a;vec4 n=texture2D(u106,vv0);vec3 C=n.rgb;float o=b.r,D=b.g,p=floor(b.b*255.),g=floor(p/16.),E=(p-16.*g)/16.;g/=16.;float F=b.a;f=1.-(1.-f)*(1.-n.a);vec2 G=x(-d);vec3 q=(1.-F)*l(texture2D(u108,G)),r=normalize(B),h=u,s=reflect(-r,d);vec2 H=y(s,floor(D*u22));float I=acos(-s.z),J=smoothstep(u111-u113,u111+u113,I);h=mix(l(texture2D(u94,H)),u112,J);float a=o+(E-o)*pow(1.-dot(d,-r),g*16.);a=clamp(a,0.,1.);float t=1.-u116*texture2D(u115,vv0).r;h*=pow(t,2.),q*=t;vec3 i=C*mix(q,h,a),M=mix(k,i,z*(f*(1.-a)+a));float K=dot(i,v),L=max(0.,(K-1.)/(w-1.));gl_FragColor=vec4(i,L);}",
                  i: q.concat(["u115", "u116"]),
                  precision: "highp",
                });
              k.s83 = {
                name: "_",
                h: "uniform sampler2D u104,u105,u106,u107,u94,u108,u96;uniform vec3 u109,u112;uniform vec2 u8;uniform float u22,u111,u113,u114,u117,u118,u110;varying vec2 vv0;const float g=3.141592;const vec3 G=vec3(0.,0.,0.),m=vec3(1.,1.,1.),H=vec3(.299,.587,.114);const float I=2.;vec3 q(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 J(vec3 a){float b=atan(a.x,-a.z),c=acos(-a.y);return vec2(.5-.5*b/g,1.-c/g);}vec2 K(vec3 a,float e){float b=pow(2.,e);vec2 f=vec2(1.,.5)/b,h=vec2(0.,1.-1./b);float i=atan(a.x,a.z),j=acos(-a.y),c=.5+.5*i/g,k=j/g,l=.5*b/u110;c=(1.-l)*c;return h+vec2(c,k)*f;}float n(vec3 a,vec3 b){return abs(acos(dot(a,b)));}float o(vec2 a){float b=texture2D(u104,a).a;return step(.01,b);}vec3 p(vec2 a){return texture2D(u96,vec2(1.-a.x,a.y)).rgb;}void main(){vec4 h=texture2D(u104,vv0);if(h.a<.01){gl_FragColor=vec4(p(vv0),0.);return;}float i=h.a;vec3 L=h.rgb,M=L+u109;vec4 c=texture2D(u107,vv0),r=texture2D(u105,vv0);vec3 a=r.rgb;float j=r.a;vec4 k=texture2D(u106,vv0);vec3 e=k.rgb;if(i>1.){gl_FragColor=vec4(mix(p(vv0),e,k.a),1.);return;}e=pow(e,u117*m);float s=c.r,N=c.g,O=c.a,t=floor(c.b*255.),l=floor(t/16.),P=(t-16.*l)/16.;l/=16.,j=1.-(1.-j)*(1.-k.a);vec2 u=vv0+vec2(-1.,0.)*u8,v=vv0+vec2(1.,0.)*u8,w=vv0+vec2(0.,1.)*u8,x=vv0+vec2(0.,-1.)*u8;vec3 Q=texture2D(u105,u).rgb,R=texture2D(u105,v).rgb,S=texture2D(u105,w).rgb,T=texture2D(u105,x).rgb;float U=n(a,Q)*o(u),V=n(a,R)*o(v),W=n(a,S)*o(w),X=n(a,T)*o(x),Y=2.*max(max(U,V),max(W,X)),Z=1.2*clamp(Y/g,0.,1.),_=max(N,Z);vec2 aa=J(a);vec3 ba=q(texture2D(u108,aa)),ca=(1.-O)*ba,y=normalize(M),z=G,A=reflect(-y,a);float da=floor(_*u22);vec2 ea=K(A,da);float fa=acos(-A.z),ga_=smoothstep(u111-u113,u111+u113,fa);vec3 ha=q(texture2D(u94,ea));z=mix(ha,u112,ga_*u114);float b=s+(P-s)*pow(1.+dot(a,y),l*15.);b=clamp(b,0.,1.);vec2 B=vv0;vec3 C=refract(vec3(0.,0.,-1.),a,.666667);float ia=smoothstep(.1,.3,length(C.xy)),D=sqrt(u8.y/u8.x),ja=smoothstep(.3,.8,i);B+=ja*C.xy*vec2(1./D,D)*ia*.03;vec3 ka=e*mix(ca,z,b);float E=i*(j*(1.-b)+b);vec3 f=mix(p(B),pow(ka,m/u117),E);float F=dot(f,H),la=max(0.,(F-1.)/(I-1.));f=mix(F*m,f,mix(1.,u118,E)*m),gl_FragColor=vec4(f,la);}",
                i: q.concat(["u117", "u118"]),
                precision: "highp",
              };
              T.da &&
                ((k.s84 = {
                  name: "_",
                  h: "uniform sampler2D u104,u105;uniform mat4 u119;uniform vec2 u120,u8,u121;uniform float u122,u123,u124,u125,u126,u127,u128,u129,u116;varying vec2 vv0;const float PI=3.141593,HALFPI=1.570796,N=8888.8;void main(){vec2 uvt=vv0+u121;vec4 pos=texture2D(u104,uvt);if(pos.a<.01){gl_FragColor=vec4(0.,0.,0.,1.);return;}vec3 co0=pos.rgb;float c=cos(u122),s=sin(u122);vec3 no0=texture2D(u105,uvt).rgb;float zv=(u119*vec4(co0,1.)).z;vec3 co;vec2 scale=u120/abs(zv),uv,duv=u8*vec2(c,s)*scale;vec3 dp,dpn;float dzMax=0.,angleMin=0.,angle;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u104,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u128,u129,length(dp)),angleMin=max(angleMin,angle),dzMax=max(dzMax,sin(angle)*length(dp));float angleMinInv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u104,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u128,u129,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMinInv=max(angleMinInv,angle);duv=u8*vec2(s,c)*scale;float angleMin2=0.;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u104,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u128,u129,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2=max(angleMin2,angle);float angleMin2Inv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u104,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u128,u129,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2Inv=max(angleMin2Inv,angle);float omegaMin=PI/4.*(angleMin+angleMinInv)*(angleMin2+angleMin2Inv),dzFactor=clamp(dzMax/u125,u126,1.),ao=dzFactor*clamp(u124*omegaMin*u127,0.,u116);gl_FragColor=vec4(ao,ao,ao,u123);}",
                  i: "u104 u105 u124 u123 u122 u8 u130 u125 u126 u127 u128 u129 u119 u120 u116".split(
                    " "
                  ),
                  Da: [{ search: "8888.8", replace: T.bk[da.T()].toFixed(1) }],
                  precision: "lowp",
                }),
                (k.s85 = {
                  name: "_",
                  h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4),j=vec2(-1.9,.9),k=vec2(.9,1.9),l=vec2(-.9,-1.9),m=vec2(1.9,-.9);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u8*f)+texture2D(u1,a+u8*g)+texture2D(u1,a+u8*h)+texture2D(u1,a+u8*i);b+=texture2D(u1,a+u8*j)+texture2D(u1,a+u8*k)+texture2D(u1,a+u8*l)+texture2D(u1,a+u8*m),gl_FragColor=b/9.;}",
                  i: ["u1", "u8"],
                  precision: "lowp",
                }));
              k.s86 = {
                name: "_",
                h: "varying vec3 vv0;void main(){gl_FragColor=vec4(vv0,1.);}",
                s: "attribute vec3 a0;uniform mat4 u131,u119,u132;varying vec3 vv0;void main(){vec4 a=u131*u119*u132*vec4(a0,1.);gl_Position=a,vv0=a.xyz/a.w;}",
                i: ["u131", "u119", "u132"],
                precision: "lowp",
              };
              k.s87 = {
                name: "_",
                h: "uniform sampler2D u133,u108,u95;uniform mat4 u131,u134;uniform vec2 u135;uniform float u136;varying vec2 vv0;const float n=8888.8,o=9999.9,p=25.,v=50.,w=1.2,e=3.141592;const vec4 x=vec4(0.,0.,0.,0.),A=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);vec2 y(vec3 a){float b=atan(a.x,a.z),c=acos(a.y);return vec2(.5-.5*b/e,1.-c/e);}void main(){float d,a,q;vec2 z=vec2(vv0.x,1.-vv0.y),b;vec3 r=vec3(u135*(z-f),0.),B=vec3(u134*vec4(r,1.)),g,s;vec4 t=x,h,c,u;vec3 i;int j;for(float k=0.;k<n;k+=1.){b.x=k,b.y=floor(b.x/64.),c=texture2D(u95,b/64.),d=e*c.r,a=2.*asin(sqrt(.25+c.g*.25)),g=vec3(cos(d)*sin(a),sin(d)*sin(a),-cos(a)),q=p+(.5+.5*c.b)*(v-p),j=0;for(float l=0.;l<=o;l+=1.){u=vec4(r+g*q*pow(l/o,w),1.),h=u131*u,i=h.xyz/h.w;if(texture2D(u133,f+f*i.xy).z<i.z){j=1;break;}}if(j==1)continue;s=vec3(u134*vec4(g,0.)),t+=texture2D(u108,y(s));}gl_FragColor=vec4(u136*t.rgb/n,1.);}",
                i: "u133 u108 u95 u131 u134 u135 u136".split(" "),
                Da: [
                  { search: "8888.8", replace: T.Un[da.T()].toFixed(1) },
                  { search: "9999.9", replace: T.Vn[da.T()].toFixed(1) },
                ],
                precision: "lowp",
              };
              k.s88 = {
                name: "_",
                h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){vec4 a=.285714*texture2D(u1,vv0-u8)+.428571*texture2D(u1,vv0)+.285714*texture2D(u1,vv0+u8);gl_FragColor=a;}",
                i: ["u1", "u8"],
                precision: "lowp",
              };
              k.s89 = {
                name: "_",
                h: "uniform sampler2D u1,u137;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                s: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u131,u119;varying vec2 vv0;void main(){vec4 a=u131*u119*vec4(a0,1.);gl_Position=a,vv0=a1;}",
                i: ["u131", "u119", "u1"],
                I: ["a0", "a1"],
                precision: "lowp",
              };
              if (da.Z()) {
                q =
                  "u39 u138 u139 u140 u141 u40 u107 u142 u143 u7 u144 u145 u74"
                    .split(" ")
                    .concat(w, E);
                da.Zh() ||
                  (k.s90 = {
                    name: "_",
                    s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    h: "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,0.,0.),gl_FragData[2]=vec4(0.,0.,0.,0.),gl_FragData[3]=vec4(0.,0.,0.,0.);}",
                    i: [],
                    precision: "lowp",
                    ca: !0,
                  });
                k.s91 = {
                  name: "_",
                  s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                  h: "uniform vec4 color;void main(){gl_FragData[0]=color,gl_FragData[1]=color,gl_FragData[2]=color,gl_FragData[3]=color;}",
                  i: ["color"],
                  ca: !0,
                };
                k.s92NNGLcolor = {
                  name: "_",
                  h: "uniform vec4 u107,u7;uniform vec3 u142;uniform float u143;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv3),c=u143;vec4 a=u107;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u142,0.),gl_FragData[3]=a;}",
                  s: "attribute vec3 a0,a2;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u144,u145,u140,u141,u147;varying vec3 vv0,vv1;varying float vv2,vv3;const vec2 e=vec2(1.,1.);const vec3 r=vec3(1.,1.,1.);const vec2 F=vec2(-1.,1.),s=vec2(.16,.5),t=vec2(.5,.5),u=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 v(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,s);vec2 f=u81*e;vec3 c=u81*r;vec2 w=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,t).rgb+vec3(u75,0.,0.),u78,c);float x=mix(texture2D(u39,u).r,0.,u81);a.z+=x;mat3 h=v(a);vec3 y=mix(u138,u79,c);float z=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 A=mat2(i,j,-j,i);b.xy=A*b.xy;float B=mix(u77,1.,u81);vec2 k=u76/w;vec3 l=a0;float C=max(0.,-a0.z-u140)*u141;l.x+=C*sign(a0.x)*(1.-u81);vec3 m=h*(l+y)*z+b;vec2 D=k*B;vec3 E=vec3(g*D,-k)+m*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv2=smoothstep(u144,u145,a0.z),vv0=m,vv3=a0.y;}",
                  i: q,
                  I: ["a0", "a2"],
                  P: [3, 3],
                  ca: !0,
                };
                k.s92NNGLtexture = {
                  name: "_",
                  h: "uniform sampler2D u1;uniform vec4 u107,u7;uniform vec3 u142;uniform float u143,u69;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv4),d=u143;vec4 b=u107;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u142,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u142,l,u69),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}",
                  s: "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u144,u145,u140,u141,u147;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.,1.);const vec3 s=vec3(1.,1.,1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,t);vec2 f=u81*e;vec3 c=u81*s;vec2 x=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,u).rgb+vec3(u75,0.,0.),u78,c);float y=mix(texture2D(u39,v).r,0.,u81);a.z+=y;mat3 h=w(a);vec3 z=mix(u138,u79,c);float A=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u77,1.,u81);vec2 k=u76/x;vec3 l=a0;float D=max(0.,-a0.z-u140)*u141;l.x+=D*sign(a0.x)*(1.-u81);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u144,u145,a0.z),vv2=a1,vv0=m,vv4=a0.y;}",
                  i: q.concat(H),
                  I: ["a0", "a2", "a1"],
                  P: [3, 3, 2],
                  ca: !0,
                };
                k.s92NNGLtextureNormalMap = {
                  name: "_",
                  h: "uniform vec4 u107,u7;uniform vec3 u142;uniform sampler2D u1,u148;uniform float u143,u69;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u148,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u143;vec4 c=u107;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u142,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u142,t,u69),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}",
                  s: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u144,u145,u140,u141,u147;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.,1.);const vec3 t=vec3(1.,1.,1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,u);vec2 f=u81*e;vec3 c=u81*t;vec2 y=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,v).rgb+vec3(u75,0.,0.),u78,c);float z=mix(texture2D(u39,w).r,0.,u81);a.z+=z;mat3 h=x(a);vec3 A=mix(u138,u79,c);float B=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u77,1.,u81);vec2 k=u76/y;vec3 l=a0;float E=max(0.,-a0.z-u140)*u141;l.x+=E*sign(a0.x)*(1.-u81);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u144,u145,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}",
                  i: q.concat(H, ["u148"]),
                  I: ["a3", "a0", "a2", "a1"],
                  P: [4, 3, 3, 2],
                  ca: !0,
                };
                k.s92NNGLtextureParamsMap = {
                  name: "_",
                  h: "uniform sampler2D u1,u70;uniform vec4 u107,u7,u71;uniform vec3 u142;uniform float u143,u69;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv4),d=u143;vec4 a=u107,e=texture2D(u70,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u71*f),d=mix(d,r,u71.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u142,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u142,u,u69),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}",
                  s: "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u144,u145,u140,u141,u147;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.,1.);const vec3 s=vec3(1.,1.,1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,t);vec2 f=u81*e;vec3 c=u81*s;vec2 x=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,u).rgb+vec3(u75,0.,0.),u78,c);float y=mix(texture2D(u39,v).r,0.,u81);a.z+=y;mat3 h=w(a);vec3 z=mix(u138,u79,c);float A=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u77,1.,u81);vec2 k=u76/x;vec3 l=a0;float D=max(0.,-a0.z-u140)*u141;l.x+=D*sign(a0.x)*(1.-u81);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u144,u145,a0.z),vv2=a1,vv0=m,vv4=a0.y;}",
                  i: q.concat(H, C),
                  I: ["a0", "a2", "a1"],
                  P: [3, 3, 2],
                  ca: !0,
                };
                k.s92NNGLtextureNormalParamsMap = {
                  name: "_",
                  h: "uniform sampler2D u1,u148,u70;uniform vec4 u107,u7,u71;uniform vec3 u142;uniform float u143,u69;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u148,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u143;vec4 a=u107,f=texture2D(u70,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u71*l),e=mix(e,z,u71.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u142,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u142,C,u69),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}",
                  s: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u146;uniform float u139,u144,u145,u140,u141,u147;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.,1.);const vec3 t=vec3(1.,1.,1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,u);vec2 f=u81*e;vec3 c=u81*t;vec2 y=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,v).rgb+vec3(u75,0.,0.),u78,c);float z=mix(texture2D(u39,w).r,0.,u81);a.z+=z;mat3 h=x(a);vec3 A=mix(u138,u79,c);float B=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u77,1.,u81);vec2 k=u76/y;vec3 l=a0;float E=max(0.,-a0.z-u140)*u141;l.x+=E*sign(a0.x)*(1.-u81);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u144,u145,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}",
                  i: q.concat(H, ["u148"], C),
                  I: ["a3", "a0", "a2", "a1"],
                  P: [4, 3, 3, 2],
                  ca: !0,
                };
                q = "u131 u119 u132 u107 u142 u143 u7".split(" ");
                k.s92color = {
                  name: "_",
                  h: "uniform vec4 u107,u7;uniform vec3 u142;uniform float u143;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv3),c=u143;vec4 a=u107;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u142,0.),gl_FragData[3]=a;}",
                  s: "attribute vec3 a0,a2;uniform mat4 u131,u119,u132;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){vec4 a=u132*vec4(a0,1.),b=u132*vec4(a2,0.);gl_Position=u131*u119*a,vv0=a.xyz,vv1=b.xyz,vv2=1.,vv3=a0.y;}",
                  i: q,
                  I: ["a0", "a2"],
                  ca: !0,
                };
                k.s92 = {
                  name: "_",
                  h: "uniform sampler2D u1;uniform vec4 u107,u7;uniform vec3 u142;uniform float u143,u69;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv4),d=u143;vec4 b=u107;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u142,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u142,l,u69),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}",
                  s: "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u132*vec4(a0,1.),b=u132*vec4(a2,0.);gl_Position=u131*u119*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                  i: q.concat(H),
                  I: ["a0", "a2", "a1"],
                  ca: !0,
                };
                var f = ["u148", "u149"];
                k.s92NormalMap = {
                  name: "_",
                  h: "uniform sampler2D u1,u148;uniform vec4 u107,u7;uniform vec3 u149,u142;uniform float u143,u69;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u148,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u143;vec4 c=u107;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u142,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u142,t,u69),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}",
                  s: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u132*vec4(a0,1.),b=u132*vec4(a2,0.);gl_Position=u131*u119*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                  i: q.concat(H, f),
                  I: ["a0", "a2", "a1", "a3"],
                  ca: !0,
                };
                k.s92ParamsMap = {
                  name: "_",
                  h: "uniform sampler2D u1,u70;uniform vec4 u107,u7,u71;uniform vec3 u142;uniform float u143,u69;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv4),d=u143;vec4 a=u107,e=texture2D(u70,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u71*f),d=mix(d,r,u71.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u142,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u142,u,u69),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}",
                  s: "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u132*vec4(a0,1.),b=u132*vec4(a2,0.);gl_Position=u131*u119*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                  i: q.concat(H, C),
                  I: ["a0", "a2", "a1"],
                  ca: !0,
                };
                k.s92NormalParamsMap = {
                  name: "_",
                  h: "uniform sampler2D u1,u148,u70;uniform vec4 u107,u7,u71;uniform vec3 u149,u142;uniform float u143,u69;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u148,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u143;vec4 a=u107,f=texture2D(u70,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u71*l),e=mix(e,z,u71.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u142,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u142,C,u69),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}",
                  s: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u131,u119,u132;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u132*vec4(a0,1.),b=u132*vec4(a2,0.);gl_Position=u131*u119*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                  i: q.concat(H, f, C),
                  I: ["a0", "a2", "a1", "a3"],
                  ca: !0,
                };
              } else u();
              t();
              q = [{ type: "1i", name: "u1", value: 0 }];
              h.j("s0", q);
              h.j("s1", q);
              h.j("s65", [{ type: "1i", name: "u6", value: 1 }].concat(q));
              h.j("s66", [{ type: "1i", name: "u6", value: 1 }].concat(q));
              h.j("s12", [{ type: "1i", name: "u84", value: 1 }].concat(q));
              h.j("s67", [{ type: "1i", name: "u84", value: 1 }].concat(q));
              h.j("s68", q);
              h.j("s69", q);
              h.j(
                "s70",
                [
                  { type: "1i", name: "u88", value: 1 },
                  { type: "1i", name: "u39", value: 2 },
                ].concat(q)
              );
              h.j("s71", q);
              h.j("s43", q);
              h.j("s72", [
                { type: "1i", name: "u90", value: 0 },
                { type: "1i", name: "u91", value: 1 },
              ]);
              h.j("s73", [
                { type: "1i", name: "u94", value: 0 },
                { type: "1i", name: "u95", value: 1 },
              ]);
              h.j("s74", q);
              h.j("s75", q);
              h.j("s76", q);
              h.j("s77", q);
              h.j("s78", q);
              h.j("s79", [{ type: "1i", name: "u84", value: 1 }].concat(q));
              h.j("s80", [{ type: "1i", name: "u84", value: 1 }].concat(q));
              T.da &&
                (h.j("s84", [
                  { type: "1i", name: "u104", value: 0 },
                  { type: "1i", name: "u105", value: 1 },
                  { type: "1f", name: "u125", value: T.Qj },
                  { type: "1f", name: "u126", value: T.Rj },
                  { type: "1f", name: "u127", value: T.ck },
                  { type: "1f", name: "u128", value: T.Uj },
                  { type: "1f", name: "u129", value: T.Vj },
                  { type: "1f", name: "u124", value: 1 },
                  { type: "1f", name: "u116", value: 1 },
                ]),
                h.j("s85", q));
              f = [
                { type: "1i", name: "u104", value: 0 },
                { type: "1i", name: "u105", value: 1 },
                { type: "1i", name: "u106", value: 2 },
                { type: "1i", name: "u94", value: 3 },
                { type: "1i", name: "u108", value: 4 },
                { type: "1i", name: "u107", value: 6 },
                { type: "1i", name: "u96", value: 7 },
                { type: "1f", name: "u114", value: 0 },
                { type: "1f", name: "u111", value: 0 },
                { type: "1f", name: "u113", value: 0 },
              ];
              T.da &&
                h.j(
                  "s82",
                  f.concat([
                    { type: "1f", name: "u116", value: T.Tj[da.T()] },
                    { type: "1i", name: "u115", value: 5 },
                  ])
                );
              h.j(
                "s83",
                f.concat([
                  { type: "1f", name: "u117", value: T.Xb },
                  { type: "1f", name: "u118", value: T.Jd },
                ])
              );
              h.j("s87", [
                { type: "1i", name: "u133", value: 0 },
                { type: "1i", name: "u108", value: 1 },
                { type: "1i", name: "u95", value: 2 },
                { type: "1f", name: "u136", value: T.Tn },
              ]);
              h.j("s88", q);
              h.j("s89", q);
              h.j(
                "s81",
                [
                  { type: "1i", name: "u2", value: 1 },
                  { type: "1i", name: "u97", value: 2 },
                  { type: "1i", name: "u96", value: 3 },
                  { type: "1f", name: "u102", value: 1 },
                  { type: "2f", name: "u99", value: [0, 0] },
                ].concat(q)
              );
              da.Z()
                ? (h.j("s92", q),
                  h.j(
                    "s92NormalMap",
                    [{ type: "1i", name: "u148", value: 1 }].concat(q)
                  ),
                  h.j(
                    "s92ParamsMap",
                    [{ type: "1i", name: "u70", value: 1 }].concat(q)
                  ),
                  h.j(
                    "s92NormalParamsMap",
                    [
                      { type: "1i", name: "u148", value: 1 },
                      { type: "1i", name: "u70", value: 2 },
                    ].concat(q)
                  ))
                : p();
              y = !0;
            },
            Hn: function () {
              u();
              t();
              p();
            },
            pd: function () {
              return G.id;
            },
            af: function () {
              return w;
            },
            bf: function () {
              return E;
            },
            set: function (q) {
              ob.bj(h);
              k[q].set();
            },
            ub: function (q) {
              return l(q, A());
            },
            Pd: function (q) {
              return l(q, {
                name: "_",
                h: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                i: [],
                precision: "highp",
              });
            },
            Kn: function (q) {
              return l(q, {
                name: "_",
                h: "const vec4 d=vec4(.5,.5,.5,.5);void main(){gl_FragData[0]=d,gl_FragData[1]=d,gl_FragData[2]=d,gl_FragData[3]=d;}",
                i: [],
                precision: "highp",
                ca: !0,
              });
            },
            H: function () {
              -1 !== g && G.H();
            },
            Rd: function () {
              var q = 0;
              G.va.forEach(function (f, L) {
                L = G.P[L];
                b.vertexAttribPointer(f, L, b.FLOAT, !1, G.Gg, q);
                q += 4 * L;
              });
            },
            ac: function () {
              h.bc(b);
            },
            bc: function (q) {
              q.vertexAttribPointer(G.va[0], 2, q.FLOAT, !1, 8, 0);
            },
            Rp: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 12, 0);
            },
            Ma: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 32, 0);
            },
            Xa: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 24, 0);
            },
            Vi: function () {
              b.vertexAttribPointer(G.attributes.a2, 3, b.FLOAT, !1, 32, 12);
            },
            Wi: function () {
              b.vertexAttribPointer(G.attributes.a2, 3, b.FLOAT, !1, 24, 12);
            },
            Ic: function () {
              b.vertexAttribPointer(G.attributes.a1, 2, b.FLOAT, !1, 32, 24);
            },
            Sp: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 20, 0);
              b.vertexAttribPointer(G.attributes.a1, 2, b.FLOAT, !1, 20, 12);
            },
            xn: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 32, 0);
              b.vertexAttribPointer(G.attributes.a2, 3, b.FLOAT, !1, 32, 12);
              b.vertexAttribPointer(G.attributes.a1, 2, b.FLOAT, !1, 32, 24);
            },
            yn: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 32, 0);
              b.vertexAttribPointer(G.attributes.a2, 3, b.FLOAT, !1, 32, 12);
            },
            zn: function () {
              b.vertexAttribPointer(G.attributes.a0, 3, b.FLOAT, !1, 24, 0);
              b.vertexAttribPointer(G.attributes.a2, 3, b.FLOAT, !1, 24, 12);
            },
            Nd: function () {
              b.vertexAttribPointer(G.attributes.a3, 4, b.FLOAT, !1, 16, 0);
            },
            Qd: function (q, f) {
              b.uniform1i(G.A[q], f);
            },
            G: function (q, f) {
              b.uniform1f(G.A[q], f);
            },
            N: function (q, f, L) {
              b.uniform2f(G.A[q], f, L);
            },
            cj: function (q, f) {
              b.uniform2fv(G.A[q], f);
            },
            kg: function (q, f, L, O) {
              b.uniform3f(G.A[q], f, L, O);
            },
            lg: function (q, f) {
              b.uniform3fv(G.A[q], f);
            },
            xa: function (q, f) {
              b.uniform4fv(G.A[q], f);
            },
            On: function (q, f) {
              b.uniformMatrix2fv(G.A[q], !1, f);
            },
            Pn: function (q, f) {
              b.uniformMatrix3fv(G.A[q], !1, f);
            },
            Jc: function (q, f) {
              b.uniformMatrix4fv(G.A[q], !1, f);
            },
            j: function (q, f) {
              h.set(q);
              f.forEach(function (L) {
                switch (L.type) {
                  case "4f":
                    b.uniform4fv(G.A[L.name], L.value);
                    break;
                  case "3f":
                    b.uniform3fv(G.A[L.name], L.value);
                    break;
                  case "2f":
                    b.uniform2fv(G.A[L.name], L.value);
                    break;
                  case "1f":
                    b.uniform1f(G.A[L.name], L.value);
                    break;
                  case "1i":
                    b.uniform1i(G.A[L.name], L.value);
                    break;
                  case "mat2":
                    b.uniformMatrix2fv(G.A[L.name], !1, L.value);
                    break;
                  case "mat4":
                    b.uniformMatrix4fv(G.A[L.name], !1, L.value);
                }
              });
            },
            K: function () {
              for (var q in k) {
                var f = k[q];
                b.detachShader(f.na, f.df);
                b.detachShader(f.na, f.cf);
                b.deleteShader(f.df);
                b.deleteShader(f.cf);
                b.deleteProgram(f.na);
              }
            },
            v: function () {
              b.disableVertexAttribArray(0);
              h.H();
              h.K();
              I = 0;
              y = !1;
              G = null;
              g = -1;
            },
          };
        return h;
      })(),
      Qa = (function () {
        var a = {},
          c = [],
          e = !1,
          d = 0,
          n = 0,
          l = -1,
          A = -1,
          p = -1,
          u = 1,
          t = null,
          y = !1,
          H = null,
          C = !1,
          w = !1,
          E = !1,
          k = !1,
          g = !1,
          G = !1,
          I = !1,
          h = null,
          q = null,
          f = -1,
          L = -1,
          O = null,
          v = -1,
          m,
          r = null,
          M = null,
          J = null,
          K = null,
          P = null,
          ba = null,
          ja = null,
          U = [
            { type: "1f", name: "u81", value: 0 },
            { type: "1f", name: "u144", value: 0 },
            { type: "1f", name: "u145", value: 0 },
            { type: "1f", name: "u76", value: 1 },
            { type: "1f", name: "u73", value: 0 },
            { type: "1f", name: "u83", value: 1 },
          ],
          x = {
            m: function (z, D) {
              a.ng = z;
              da.Cg();
              zc.Re();
              Ib.Re(z.he);
              l = z.Ue;
              A = z.Co;
              p = z.Nf;
              u = z.ge;
              var S = [
                { type: "1f", name: "u76", value: l },
                { type: "1f", name: "u73", value: p },
                { type: "1f", name: "u77", value: z.on },
                { type: "mat4", name: "u72", value: z.Sm },
                { type: "2f", name: "u40", value: z.Cj },
              ];
              z.Bg = S;
              var ea = [
                { type: "3f", name: "u78", value: [0, 0, 0] },
                { type: "3f", name: "u79", value: z.Kg },
                { type: "3f", name: "u80", value: z.Jg },
                { type: "1f", name: "u81", value: 0 },
                { type: "1f", name: "u82", value: z.he },
                { type: "1f", name: "u83", value: 1 },
              ];
              z.tj = ea;
              x.Wl(z, D);
              e || void 0 !== z.Ca || (z.Ca = [0, 0, 120]);
              I = G = N.ef;
              if (!e && G) {
                D = 1 * da.qb();
                var X = 1 * da.pb(),
                  aa = { isLinear: !0, isPot: !1, width: D, height: X };
                h = Z.instance(aa);
                q = Z.instance(aa);
                f = 1 / D;
                L = 1 / X;
              }
              S = [
                { type: "1i", name: "u39", value: 1 },
                { type: "3f", name: "u74", value: z.Ca },
                { type: "1f", name: "u140", value: z.Wc },
                { type: "1f", name: "u141", value: z.Fb },
              ].concat(S, ea);
              t = z.Cc;
              ea = [
                { type: "1f", name: "u144", value: t[0] },
                { type: "1f", name: "u145", value: t[1] },
              ];
              da.Z()
                ? ((D = [{ type: "1i", name: "u1", value: 0 }]),
                  (X = [{ type: "1i", name: "u148", value: 2 }]),
                  F.j("s92NNGLcolor", S.concat(ea)),
                  F.j("s92NNGLtexture", [].concat(D, S, ea)),
                  F.j("s92NNGLtextureNormalMap", [].concat(D, X, S, ea)),
                  F.j(
                    "s92NNGLtextureParamsMap",
                    [{ type: "1i", name: "u70", value: 2 }].concat(D, S, ea)
                  ),
                  F.j(
                    "s92NNGLtextureNormalParamsMap",
                    [{ type: "1i", name: "u70", value: 3 }].concat(D, X, S, ea)
                  ))
                : (F.j("s96", S.concat(ea)),
                  F.j("s97", [{ type: "1i", name: "u1", value: 0 }].concat(S)),
                  F.j("s98", S),
                  F.j("s99", S),
                  F.j(
                    "s100",
                    S.concat([{ type: "1i", name: "u148", value: 0 }])
                  ),
                  F.j("s101", S),
                  F.j(
                    "s102",
                    S.concat([{ type: "1i", name: "u70", value: 0 }])
                  ));
              F.j("s70", [{ type: "2f", name: "u89", value: z.ug }]);
              F.j(T.da ? "s82" : "s83", [
                { type: "1f", name: "u111", value: z.te },
                { type: "3f", name: "u112", value: z.$f },
                { type: "1f", name: "u113", value: z.Fe },
                { type: "1f", name: "u114", value: 1 },
                { type: "3f", name: "u109", value: z.Gj },
              ]);
              if ((m = z.Bd))
                (O = z.wm),
                  (v = z.Cd),
                  F.j("s81", [
                    { type: "4f", name: "u98", value: z.Ad },
                    { type: "1f", name: "u101", value: z.Ef },
                    { type: "2f", name: "u99", value: z.vm },
                    { type: "1f", name: "u103", value: Math.sign(v) },
                  ]);
              c.forEach(function (oa) {
                oa.Ri(z);
              });
              e = !0;
            },
            Zb: function (z) {
              w && ta.la.Zb(z);
              E && ta.ra.Zb(z);
            },
            Wl: function (z, D) {
              void 0 !== ta.la &&
                z.dc &&
                da.Z() &&
                (ta.la.m(z),
                (C = !0),
                D.push(function (S) {
                  ta.la.Zb(S);
                  w = !0;
                }));
              void 0 !== ta.ra &&
                z.ad &&
                (ta.ra.m(z),
                D.push(function (S) {
                  ta.ra.Zb(S);
                  E = !0;
                }));
              void 0 !== ta.lc && z.we && (ta.lc.m(z), (g = k = !0));
              void 0 !== ta.ib &&
                (ta.ib.m(z),
                (H = ta.ib.Yl({
                  width: z.xc,
                  height: 2 * z.xc,
                  depth: 1.5 * z.xc,
                  hl: -z.jf,
                  Qa: z.gf,
                  Kk: z.hf,
                })),
                (y = !0));
            },
            Mn: function (z, D, S, ea) {
              z &&
                ((ja = z),
                C && ta.la.$b(z),
                E && ta.ra.$b(z),
                k && ta.lc.$b(z),
                c.forEach(function (X) {
                  X.$b(z);
                }));
              S && (K = S);
              ea && (P = ea);
            },
            vb: function (z) {
              da.Z()
                ? (F.j("s92NNGLcolor", z),
                  F.j("s92NNGLtexture", z),
                  F.j("s92NNGLtextureNormalMap", z),
                  F.j("s92NNGLtextureParamsMap", z),
                  F.j("s92NNGLtextureNormalParamsMap", z))
                : (F.j("s96", z),
                  F.j("s97", z),
                  F.j("s98", z),
                  F.j("s99", z),
                  F.j("s100", z),
                  F.j("s101", z),
                  F.j("s102", z));
            },
            Za: function (z, D, S) {
              var ea = [z[0] + D[0], z[1] + D[1], z[2] + D[2]];
              ea = [ea[0] + S[0], ea[1] + S[1], ea[2] + S[2]];
              a.Kd = ea;
              a.Dm = D;
              a.qo = S;
              x.vb([{ type: "3f", name: "u138", value: ea }]);
              da.Z() && (C && ta.la.Za(z, D, S), E && ta.ra.Za(ea));
              y && ta.ib.Za(z);
            },
            $a: function (z, D, S) {
              var ea = z * D * S;
              a.Em = D;
              a.ro = S;
              a.Ql = z;
              x.vb([{ type: "1f", name: "u139", value: ea }]);
              da.Z() && (C && ta.la.$a(z * D, S), E && ta.ra.$a(ea));
              y && ta.ib.$a(z);
            },
            Ki: function () {
              x.Za(a.Kd, a.Dm, a.qo);
              x.$a(a.Ql, a.Em, a.ro);
              x.$i(a.rx);
              x.m(a.ng);
              x.Xi(a.kk, a.Fb);
            },
            $i: function (z) {
              a.rx = z;
              x.vb([{ type: "1f", name: "u75", value: z }]);
              da.Z() && (C && ta.la.ig(z), E && ta.ra.ig(z));
            },
            Xi: function (z, D) {
              a.kk = z;
              a.Fb = D;
              x.vb([
                { type: "1f", name: "u140", value: z },
                { type: "1f", name: "u141", value: D },
              ]);
            },
            Fn: function (z) {
              t = z;
              0 === d &&
                x.vb([
                  { type: "1f", name: "u144", value: t[0] },
                  { type: "1f", name: "u145", value: t[1] },
                ]);
            },
            Ya: function (z) {
              function D() {
                y && ta.ib.toggle(!1);
                m && F.j("s81", [{ type: "1f", name: "u102", value: 0 }]);
              }
              0 >= z
                ? ((n = 0),
                  0 !== d &&
                    ((d = 0),
                    Ib.hn(),
                    y && ta.ib.toggle(!0),
                    m && F.j("s81", [{ type: "1f", name: "u102", value: 1 }])))
                : 1 <= z
                ? ((n = 1), 1 !== d && ((d = 1), Ib.ij(!0)), D())
                : ((n = z), 2 !== d && (Ib.ij(!1), (d = 2), D()));
              F.j("s83", [{ type: "1f", name: "u114", value: 1 - z }]);
              U[0].value = n;
              U[1].value = t[0] * (1 - z) + -300 * z;
              U[2].value = t[1] * (1 - z) + -300 * z;
              U[3].value = l * (1 - z) + z * A;
              U[4].value = p * (1 - z);
              U[5].value = 1 - z + z * u;
              w && ta.la.jg(n, U);
              E && ta.ra.jg(n, U);
              x.vb(U);
            },
            el: function (z) {
              ja.g(1);
              z.forEach(function (D) {
                D.Zk();
              });
              y && H.V();
            },
            pm: function () {
              return 1 === d;
            },
            ue: function (z) {
              ja.Oa(z);
            },
            Lj: function (z) {
              c.push(z);
            },
            sg: function (z) {
              w = z && C;
            },
            rg: function (z) {
              g = z && k;
            },
            fg: function (z) {
              E && da.Z() && ta.ra.Qn(z);
            },
            wb: function (z) {
              da.Z() && (C && ta.la.wb(z), E && ta.ra.wb(z));
            },
            bl: function (z, D) {
              if (!I) return !1;
              h.M();
              z.g(0);
              F.set("s74");
              F.N("u8", 0, L);
              Y.l(!1, !1);
              q.o();
              h.g(0);
              F.N("u8", f, 0);
              Y.l(!1, !1);
              F.set("s75");
              D.M();
              q.g(0);
              Y.l(!1, !1);
              return !0;
            },
            hj: function (z) {
              I = z && G;
            },
            resize: function (z, D, S) {
              G &&
                ((z *= S),
                (D *= S),
                h.resize(z, D),
                q.resize(z, D),
                (f = 1 / z),
                (L = 1 / D));
            },
            dg: function (z, D) {
              var S = z.L(),
                ea = z.Y(),
                X = { width: S, height: ea, isPot: !1 };
              C && (J && J.remove(), (J = Z.instance(X)));
              r = va.instance({ width: S, height: ea });
              k || E
                ? (ta.lc.eg(S, ea), M && M.remove(), (M = Z.instance(X)))
                : (M = z);
              C && ta.la.eg(S, ea);
              D && (ba && ba.remove(), (ba = Z.instance(X)));
            },
            Xk: function (z) {
              var D = null;
              switch (d) {
                case 0:
                  D = z;
                  break;
                case 2:
                  r.bind(!1, !0);
                  ba.o();
                  F.set("s65");
                  F.G("u7", n);
                  z.g(1);
                  P.g(0);
                  Y.l(!0, !0);
                  D = ba;
                  break;
                case 1:
                  D = P;
              }
              if (!w || 1 === d || !da.Z()) return D;
              D.Oa(0);
              g && ta.lc.V(D, M);
              r.bind(!1, !g);
              E && (g ? D.g(0) : (M.o(), F.set("s1"), Y.l(!0, !0)), ta.ra.V());
              M.g(0);
              K.Oa(2);
              ta.la.V();
              J.o();
              F.set("s1");
              g || E ? M.g(0) : D.g(0);
              Y.l(!0, !T.da);
              ta.la.add();
              return J;
            },
            cl: function (z, D) {
              if (!m) return !1;
              F.set("s81");
              F.G("u100", z * v);
              O.g(1);
              Qa.ue(2);
              M ? M.g(3) : D.g(3);
              return !0;
            },
            v: function () {
              e = !1;
              n = d = 0;
              p = A = l = -1;
              u = 1;
              t = null;
              y = !1;
              H = null;
              g = k = E = w = C = !1;
              ta.la.v();
              ta.hb.v();
            },
          };
        return x;
      })(),
      sa = (function () {
        function a() {
          p.forEach(function (D) {
            D.fl(K);
          });
        }
        function c() {
          p.forEach(function (D) {
            D.ed(K);
          });
        }
        function e() {
          p.forEach(function (D) {
            D.dl(K);
          });
        }
        function d() {
          p.forEach(function (D) {
            D.fd(K);
          });
        }
        function n() {
          K
            ? Qa.el(p)
            : p.forEach(function (D) {
                D.$k();
              });
        }
        function l() {
          r && clearTimeout(r);
          r = setTimeout(function () {
            r = f = !1;
          }, 16);
        }
        function A(D) {
          D();
        }
        var p = [],
          u = [],
          t = { ga_: !1, position: !1, sb: !1 },
          y = [],
          H = [],
          C = null,
          w = 0,
          E = null,
          k = null,
          g = null,
          G = null,
          I = !1,
          h = !1,
          q = !1,
          f = !1,
          L = !1,
          O = !1,
          v = null,
          m = null,
          r = null,
          M = null,
          J = !1,
          K = !1,
          P = !1,
          ba = !1,
          ja = !1,
          U = !1,
          x = !1,
          z = {
            m: function () {
              b.enable(b.DEPTH_TEST);
              b.depthFunc(b.LEQUAL);
              b.clearDepth(1);
              T.Ik
                ? (b.enable(b.CULL_FACE),
                  b.frontFace("CCW" === T.Jk ? b.CCW : b.CW),
                  b.cullFace(b.BACK))
                : b.disable(b.CULL_FACE);
              z.bh();
              var D = {
                isPot: !1,
                isLinear: !1,
                width: da.qb(),
                height: da.pb(),
                F: 4,
                isFloat: !1,
              };
              E = Z.instance(D);
              D = Object.assign({}, D, {
                isLinear: !0,
                width: da.L(),
                height: da.Y(),
              });
              k = Z.instance(D);
              g = Z.instance(D);
              T.Ja &&
                ((D = Object.assign({}, D, { isLinear: !1 })),
                (G = Z.instance(D)));
              O = xa.ea();
              T.Ja ||
                (C = bc.instance({ Eb: T.Eb, qc: T.qc, rc: T.rc, pc: T.pc }));
              I = !0;
            },
            bh: function () {
              da.Z()
                ? (t = pc.instance({}))
                : ((t.ga_ = Cb.instance({
                    cc: T.Ja ? !1 : "s93",
                    isFloat: !1,
                    Qb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })),
                  (t.position = Cb.instance({
                    cc: T.Ja ? !1 : "s103",
                    isFloat: !0,
                    Qb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })),
                  (t.sb = Cb.instance({
                    cc: !1,
                    isFloat: !0,
                    Qb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })),
                  (t.Dc = Cb.instance({
                    cc: !1,
                    isFloat: !1,
                    Qb: !0,
                    clearColor: [0, 0, 0, 0],
                    F: 4,
                  })));
            },
            Al: function () {
              return C;
            },
            sa: function (D) {
              C = D;
            },
            eq: function () {},
            wb: function (D) {
              Qa.wb(D);
            },
            Ri: function (D) {
              Qa.m(D, y);
              da.Z() || (t.ga_.aj(!1), t.position.aj("s96"));
              K = ba = !0;
            },
            Pp: function () {
              Qa.Ki();
            },
            Ko: function (D) {
              Qa.Lj(D);
            },
            tn: function (D, S, ea) {
              Qa.Za(D, S, ea);
            },
            un: function (D, S, ea) {
              Qa.$a(D, S, ea);
            },
            rn: function (D, S) {
              Qa.Xi(D, S);
            },
            sn: function (D) {
              Qa.Fn(D);
            },
            vn: function (D) {
              Qa.$i(D);
            },
            Ya: function (D) {
              Qa.Ya(D);
            },
            Si: function (D, S, ea, X) {
              Qa.Mn(D, S, ea, X);
              S && z.dg(S, X ? !0 : !1);
              P = !0;
            },
            sg: function (D) {
              Qa.sg(D);
            },
            fg: function (D) {
              Qa.fg(D);
            },
            rg: function (D) {
              Qa.rg(D);
            },
            hj: function (D) {
              Qa.hj(D);
            },
            Lo: function (D) {
              J &&
                ((ja = !0),
                (U = Z.instance({ width: M.L(), height: M.Y(), isPot: !1 })),
                (x = D));
            },
            dg: function (D, S) {
              M =
                "string" === typeof D ? Z.instance({ url: D, isFloat: !1 }) : D;
              K && Qa.dg(M, S);
              J = !0;
            },
            Kj: function (D) {
              p.push(D);
              0 !== y.length &&
                (y.forEach(function (S) {
                  S(D);
                }),
                y.splice(0, y.length));
            },
            dn: function (D) {
              D = p.indexOf(D);
              -1 !== D && p.splice(D, 1);
            },
            Mo: function (D) {
              u.push(D);
            },
            Mp: function (D) {
              D = u.indexOf(D);
              -1 !== D && u.splice(D, 1);
            },
            Wd: function (D) {
              K && (h = D);
            },
            animate: function (D) {
              !T.Ja || (K && P)
                ? h &&
                  (f || (w > T.Fm && L)
                    ? (v && clearTimeout(v),
                      ++w,
                      window.cancelAnimationFrame(z.animate),
                      (v = setTimeout(function () {
                        window.requestAnimationFrame(z.animate);
                      }, 16)))
                    : (z.Fi(D),
                      ++w,
                      K || (h && window.requestAnimationFrame(z.animate))))
                : setTimeout(z.animate, 100);
            },
            Oo: function (D) {
              H.push(D);
            },
            Fi: function (D) {
              if ((!T.Ja || (K && P)) && I) {
                H.forEach(A);
                if (da.Z()) {
                  if (!t.set() && !da.ja()) {
                    da.eo();
                    z.bh();
                    Cb.Uc();
                    F.Hn();
                    T.Ja && Qa.Ki();
                    b.flush();
                    window.requestAnimationFrame(z.animate);
                    return;
                  }
                  K || uc.fn();
                  n();
                  t.H();
                  O && b.depthMask(!1);
                } else
                  K && Qa.ue(1),
                    t.ga_.set(!0, !0, !0),
                    c(),
                    t.ga_.H(),
                    O && b.depthMask(!1),
                    t.Dc.set(!1, !O, !1),
                    e(),
                    t.Dc.H(),
                    t.position.set(!0, !O, !1),
                    kb.V(),
                    a(),
                    t.position.H(),
                    t.sb.set(!1, !O, !1),
                    d(),
                    t.sb.H();
                b.disable(b.DEPTH_TEST);
                O || b.depthMask(!1);
                T.da && yb.V();
                var S = z.vh();
                null !== S &&
                  (S.g(7),
                  F.set(T.da ? "s82" : "s83"),
                  F.N("u8", 1 / da.qb(), 1 / da.pb()),
                  Cb.lk(),
                  E.M(),
                  T.Vm
                    ? (b.enable(b.BLEND),
                      b.clearColor(0, 0, 0, 0),
                      b.clear(b.COLOR_BUFFER_BIT),
                      b.blendFunc(b.ONE, b.ONE_MINUS_SRC_ALPHA))
                    : b.disable(b.BLEND),
                  K || kb.Qe(),
                  t.position.g(0),
                  t.sb.g(1),
                  t.ga_.g(2),
                  C.Xc(3),
                  t.Dc.g(6),
                  C.Yc(4),
                  C.gh(),
                  T.da && yb.g(5),
                  Y.l(!0, !0),
                  va.fa(),
                  Qa.bl(E, k) || (F.set("s1"), k.M(), E.g(0), Y.l(!1, !1)),
                  F.set("s71"),
                  g.M(),
                  k.g(0),
                  Y.l(!1, !1),
                  k.o(),
                  g.g(0),
                  ba && K
                    ? (F.set("s70"),
                      G.g(1),
                      Qa.ue(2),
                      Y.l(!1, !1),
                      F.set("s1"),
                      G.M(),
                      k.g(0),
                      Y.l(!1, !1))
                    : (F.set("s69"), Y.l(!1, !1), k.g(0)),
                  va.$(),
                  b.viewport(0, 0, da.L(), da.Y()),
                  (K && Qa.cl(D, S)) || F.set("s1"),
                  Y.l(!1, !1),
                  b.enable(b.DEPTH_TEST),
                  b.depthMask(!0),
                  b.flush());
              }
            },
            vh: function () {
              if (!J) return Z.Gh();
              if (!K) return M;
              if (ja && !Qa.pm()) {
                F.set(x);
                va.fa();
                U.Kc();
                U.o();
                M.g(0);
                var D = U;
                Y.l(!0, !0);
              } else D = M;
              return Qa.Xk(D);
            },
            Xn: function () {
              T.Ok ||
                h ||
                ((h = !0),
                z.animate(Date.now()),
                q || qc.Yn(),
                q || Ib.kc(!1),
                m && clearTimeout(m),
                T.da && yb.Od(),
                (m = setTimeout(z.ya, T.hk)),
                q || da.Tl(),
                (q = !0));
            },
            bq: function () {
              h && ((L = h = !1), cancelAnimationFrame(z.animate));
            },
            ya: function () {
              L ||
                !q ||
                f ||
                T.eh ||
                ((L = f = !0),
                m && clearTimeout(m),
                r && clearTimeout(r),
                kb.We().Hi(),
                (m = setTimeout(function () {
                  da.Eg(T.Jm);
                  T.da && yb.uj();
                  w = 0;
                  l();
                }, 24)));
            },
            wake: function () {
              L &&
                q &&
                !f &&
                ((f = !0),
                (L = !1),
                (w = 0),
                kb.We().Hi(),
                m && clearTimeout(m),
                r && clearTimeout(r),
                (m = setTimeout(function () {
                  da.Eg(1);
                  T.da && yb.Od();
                  l();
                }, 16)));
            },
            xp: function () {},
            cp: function () {},
            Vd: function (D) {
              ba = D;
            },
            iq: function () {
              F.j("s83", [
                { type: "1f", name: "u117", value: T.Xb },
                { type: "1f", name: "u118", value: T.Jd },
              ]);
            },
            resize: function (D, S, ea) {
              E.resize(D * ea, S * ea);
              k.resize(D, S);
              g.resize(D, S);
              T.Ja && G.resize(D, S);
              Qa.resize(D, S, ea);
              D = [{ type: "2f", name: "u8", value: [1 / D, 1 / S] }];
              F.j("s71", D);
              F.j("s69", D);
            },
            K: function () {
              v && clearTimeout(v);
              m && clearTimeout(m);
              r && clearTimeout(r);
              p.concat(u).forEach(function (D) {
                D.K();
              });
              p.splice(0, p.length);
              u.splice(0, u.length);
              t.ga_.remove();
              t.sb.remove();
              t.Dc.remove();
              t.position.remove();
              E.remove();
              k.remove();
              g.remove();
              G && G.remove();
              f = !0;
            },
            v: function () {
              z.K();
              O = L = f = q = h = K = P = f = !1;
            },
          };
        return z;
      })(),
      ta = {},
      da = (function () {
        function a() {
          Cb.resize(e * u, d * u);
          E.Z() && pc.resize(e * u, d * u);
          sa.resize(e, d, u);
          T.da && yb.resize(e * u, d * u, u);
          E.Cg();
        }
        var c = null,
          e = 0,
          d = 0,
          n = -1,
          l = !1,
          A = {
            Yd: !1,
            vg: !1,
            rj: !1,
            og: !1,
            drawBuffers: !1,
            im: !1,
            Wh: !1,
            km: !1,
            Ac: !1,
            Ua: !1,
          },
          p = Object.assign({}, A),
          u = 1,
          t = !1,
          y = !1,
          H = !1,
          C = !1,
          w = !1,
          E = {
            m: function (k) {
              void 0 !== k.onload && k.onload && (y = k.onload);
              void 0 === k.expand && (k.expand = !1);
              void 0 === k.wd && (k.wd = !1);
              void 0 === k.pa && (k.pa = !1);
              void 0 === k.Mb && (k.Mb = !1);
              void 0 === k.alpha && (k.alpha = !1);
              void 0 === k.preserveDrawingBuffer &&
                (k.preserveDrawingBuffer = !1);
              k.wd && (l = !0);
              c = k.pa ? k.pa : document.getElementById(k.Bk);
              k.expand && E.expand();
              try {
                window.Ho = k.Mb
                  ? k.Mb.ol()
                  : c.getContext("webgl", {
                      antialias: !1,
                      alpha: k.alpha,
                      depth: !0,
                      premultipliedAlpha: !1,
                      stencil: !1,
                      preserveDrawingBuffer: k.preserveDrawingBuffer,
                    });
                C = k.Mb ? k.Mb.ja() : !1;
                H = !C;
                8 > b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS) &&
                  E.bd("too few texture image units");
                if (!xa.m()) return E.bd("invalid config");
                T.no &&
                  ((p.vg = b.getExtension("EXT_texture_filter_anisotropic")),
                  p.vg && (p.Wh = !0));
                T.oo &&
                  ((p.Yd = b.getExtension("WEBGL_compressed_texture_s3tc")),
                  p.Yd &&
                    void 0 !== p.Yd.COMPRESSED_RGBA_S3TC_DXT5_EXT &&
                    p.Yd.COMPRESSED_RGBA_S3TC_DXT5_EXT &&
                    (p.im = !0));
                H &&
                  ((p.rj =
                    b.getExtension("OES_element_index_uint") ||
                    b.getExtension("MOZ_OES_element_index_uint") ||
                    b.getExtension("WEBKIT_OES_element_index_uint")),
                  p.rj && (p.km = !0));
                !C &&
                  T.po &&
                  ((p.og = b.getExtension("EXT_sRGB")), p.og && (p.Ac = !0));
                H
                  ? ((p.drawBuffers = b.getExtension("WEBGL_draw_buffers")),
                    p.drawBuffers && !T.dh && (p.Ua = !0))
                  : (p.Ua = 4 <= b.getParameter(b.MAX_DRAW_BUFFERS));
                if (p.Ua) {
                  var g = E.Qk();
                  p.Ua = p.Ua && g;
                }
              } catch (G) {
                return E.bd(G);
              }
              if (null === b || !b) return E.bd("NO_GL");
              k.expand && window.addEventListener("resize", E.expand, !1);
              c.addEventListener(
                "contextmenu",
                function (G) {
                  G.preventDefault();
                  return !1;
                },
                !1
              );
              e = c.width;
              d = c.height;
              E.pf();
              return !0;
            },
            pf: function () {
              n = l ? 3 : 2;
              xa.ea() || (n = Math.min(n, 1));
              xa.xk() || (n = Math.min(n, 0));
              zc.m();
              Cb.m();
              for (var k in ta) ta[k].Gc();
              F.m();
              kb.m();
              Ib.m();
              sa.m();
              qc.m();
              T.da && yb.m();
              "undefined" !== typeof FPSCounter && FPSCounter.m();
              E.Cg();
              E.Sk();
              t = !0;
              y && y();
              return !0;
            },
            Sk: function () {
              if (p.Ua) {
                var k = pc.instance({ width: 256, height: 1 });
                k.bind();
                b.viewport(0, 0, 256, 1);
                F.set("s91");
                F.xa("color", [1, 0, 0, 1]);
                Y.l(!0, !0);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT || b.DEPTH_BUFFER_BIT);
                va.$();
                F.set("s1");
                k.sb.g(0);
                Y.l(!1, !1);
                k = new Uint8Array(1024);
                b.readPixels(0, 0, 256, 1, b.RGBA, b.UNSIGNED_BYTE, k);
                w = 1 >= k[1020];
              }
            },
            Qk: function () {
              var k = pc.instance({ width: 1, height: 1 });
              if (!k.set()) return k.remove(), !1;
              F.Kn(b);
              Y.Kb(b);
              b.bindFramebuffer(b.FRAMEBUFFER, null);
              F.ub(b);
              k.ga_.Oa(0);
              Y.Kb(b);
              var g = new Uint8Array(4);
              b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, g);
              k.remove();
              return 3 < Math.abs(g[0] - 127) ? !1 : !0;
            },
            ja: function () {
              return C;
            },
            L: function () {
              return e;
            },
            Y: function () {
              return d;
            },
            qb: function () {
              return u * E.L();
            },
            pb: function () {
              return u * E.Y();
            },
            pl: function () {
              return e / d;
            },
            T: function () {
              return n;
            },
            nm: function () {
              return 3 === n;
            },
            Zh: function () {
              return w;
            },
            Z: function () {
              return p.Ua;
            },
            eo: function () {
              p.Ua = !1;
            },
            Fp: function () {
              return !1;
            },
            zk: function () {
              return 0 < E.T();
            },
            Uo: function () {
              return E.Z() && 0 < E.T();
            },
            Ve: function (k) {
              var g = b,
                G = "";
              C || ((g = p.drawBuffers), (G = "_WEBGL"));
              return [
                g["COLOR_ATTACHMENT0" + G],
                g["COLOR_ATTACHMENT1" + G],
                g["COLOR_ATTACHMENT2" + G],
                g["COLOR_ATTACHMENT3" + G],
              ].splice(0, k);
            },
            od: function (k) {
              return E.Ve(4)[k];
            },
            Ml: function () {
              return C
                ? b.SRGB
                  ? b.SRGB
                  : b.RGBA
                : p.Ac
                ? p.og.SRGB_ALPHA_EXT
                : b.RGBA;
            },
            lm: function () {
              return p.Wh;
            },
            ul: function () {
              return p.vg;
            },
            zm: function (k) {
              E.ja()
                ? b.drawBuffers(E.Ve(k))
                : p.drawBuffers.drawBuffersWEBGL(E.Ve(k));
            },
            expand: function () {
              sa.wake();
              E.resize(window.innerWidth, window.innerHeight);
              sa.ya();
            },
            resize: function (k, g) {
              !c ||
                (k === e && g === d) ||
                ((e = k),
                (d = g),
                (c.width = e),
                (c.height = d),
                t && (kb.resize(), a()));
            },
            Cg: function () {
              var k = [
                { type: "2f", name: "u8", value: [1 / da.qb(), 1 / da.pb()] },
              ];
              F.j("s71", k);
              F.j("s69", k);
            },
            Eg: function (k) {
              u = k;
              a();
            },
            Fa: function (k, g) {
              c.addEventListener(k, g, !1);
            },
            bd: function () {
              n = -1;
              return !1;
            },
            Xg: function () {
              return 0 <= n;
            },
            Ip: function () {},
            Qp: function () {},
            aq: function () {
              var k = document.getElementById("loading");
              k && (k.style.display = "block");
            },
            Tl: function () {
              var k = document.getElementById("loading");
              k && (k.style.display = "none");
            },
            K: function () {
              E.Xg() &&
                (Z.sj(),
                sa.K(),
                Y.K(),
                Cb.K(),
                T.da && yb.K(),
                bc.K(),
                qc.K(),
                F.K(),
                Z.K(),
                b.flush(),
                (b = null));
            },
            v: function () {
              sa.v();
              Qa.v();
              F.v();
              Object.assign(p, A);
              t = !1;
            },
          };
        return E;
      })(),
      kb = (function () {
        var a = !1,
          c = !1,
          e = [];
        return {
          m: function () {},
          instance: function (d) {
            void 0 === d.Ii && (d.Ii = !0);
            void 0 === d.ke && (d.ke = 0.1);
            void 0 === d.je && (d.je = 100);
            void 0 === d.direction && (d.direction = [0, 0, -1]);
            void 0 === d.Lb && (d.Lb = 45);
            var n = new Sb(),
              l = new Oa(50, -50, -400),
              A = null;
            n.setPosition(l);
            var p = new Int8Array(20),
              u = new Int8Array(20),
              t = 0,
              y = 0,
              H = 0,
              C = 0,
              w = {
                V: function () {
                  u[F.pd()] || (F.Jc("u119", n.elements), (u[F.pd()] = 1));
                  p[F.pd()] || (F.Jc("u131", A), (p[F.pd()] = 1));
                },
                Pe: function () {
                  y || (F.Jc("u119", n.elements), (y = 1));
                  t || (F.N("u120", A[0], A[5]), (t = 1));
                },
                Qe: function () {
                  H || (F.kg("u109", l.x, l.y, l.z), (H = 1));
                },
                Hb: function () {
                  C || (F.kg("u149", l.x, l.y, l.z), (C = 1));
                },
                Zg: function () {
                  var E = d.ke,
                    k = d.je,
                    g = Math.tan((0.5 * d.Lb * Math.PI) / 180);
                  A = [
                    0.5 / g,
                    0,
                    0,
                    0,
                    0,
                    (0.5 * da.pl()) / g,
                    0,
                    0,
                    0,
                    0,
                    -(k + E) / (k - E),
                    -1,
                    0,
                    0,
                    (-2 * k * E) / (k - E),
                    0,
                  ];
                  for (E = 0; 20 > E; ++E) p[E] = 0;
                  t = 0;
                },
                Gn: function (E, k) {
                  l.Pi(k[0]).Qi(k[1]).z = k[2];
                  n.elements.set(E);
                  for (E = 0; 20 > E; ++E) u[E] = 0;
                  C = H = y = 0;
                },
                Hi: function () {
                  for (var E = (C = H = 0); 20 > E; ++E) u[E] = 0;
                },
              };
            w.Zg();
            a = w;
            c = !0;
            d.Ii && e.push(w);
            return w;
          },
          V: function () {
            c && a.V();
          },
          Pe: function () {
            c && a.Pe();
          },
          Qe: function () {
            c && a.Qe();
          },
          Hb: function () {
            c && a.Hb();
          },
          resize: function () {
            e.forEach(function (d) {
              d.Zg();
            });
          },
          We: function () {
            return a;
          },
        };
      })(),
      Cb = (function () {
        var a = [],
          c = null;
        return {
          m: function () {
            c = va.instance({ width: da.qb(), height: da.pb(), yc: !da.Z() });
          },
          instance: function (e) {
            void 0 === e.width && (e.width = da.qb());
            void 0 === e.height && (e.height = da.pb());
            void 0 === e.isFloat && (e.isFloat = !1);
            void 0 === e.Qb && (e.Qb = !1);
            void 0 === e.clearColor && (e.clearColor = [0, 0, 0, 0]);
            void 0 === e.F && (e.F = 4);
            var d = Z.instance({
                isFloat: e.isFloat && xa.ea(),
                S: e.isFloat,
                width: e.width,
                height: e.height,
                isPot: !1,
                isLinear: !1,
                F: e.F,
              }),
              n = void 0 !== e.cc && e.cc ? !0 : !1,
              l = e.cc,
              A = {
                set: function (p, u, t) {
                  t && c.bind(!1, t);
                  d.o();
                  p &&
                    (b.clearColor(
                      e.clearColor[0],
                      e.clearColor[1],
                      e.clearColor[2],
                      e.clearColor[3]
                    ),
                    c.Ae());
                  u && c.Yg();
                  n && F.set(l);
                },
                aj: function (p) {
                  n = (l = p) ? !0 : !1;
                },
                H: function () {
                  d.$d();
                },
                g: function (p) {
                  d.g(p);
                },
                resize: function (p, u) {
                  d.resize(p, u);
                },
                debug: function () {
                  d.debug();
                },
                remove: function () {
                  d.remove();
                },
              };
            e.Qb && a.push(A);
            return A;
          },
          resize: function (e, d) {
            c.resize(e, d);
            a.forEach(function (n) {
              n.resize(e, d);
            });
          },
          lk: function () {
            c.Rg();
          },
          Uc: function () {
            c.Uc();
          },
          Kc: function () {
            c.Kc();
          },
          Xo: function () {
            c.Yg();
          },
          Wo: function () {
            c.Ae();
          },
          Vo: function () {
            c.clear();
          },
          K: function () {
            c.remove();
          },
        };
      })(),
      pc = (function () {
        var a = [];
        return {
          instance: function (c) {
            void 0 === c.width && (c.width = da.qb());
            void 0 === c.height && (c.height = da.pb());
            var e = b.createFramebuffer(),
              d = c.width,
              n = c.height,
              l = !0;
            c = {
              isFloat: xa.ea(),
              S: !0,
              width: d,
              height: n,
              isPot: !1,
              isLinear: !1,
              F: 4,
            };
            var A = Z.instance(c),
              p = Z.instance(c),
              u = Z.instance(c),
              t = Z.instance(c),
              y = va.vl(),
              H = va.Ah();
            b.bindFramebuffer(y, e);
            var C = b.createRenderbuffer();
            b.bindRenderbuffer(b.RENDERBUFFER, C);
            b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, d, n);
            b.framebufferRenderbuffer(y, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, C);
            b.clearDepth(1);
            b.framebufferTexture2D(y, da.od(0), b.TEXTURE_2D, A.get(), 0);
            b.framebufferTexture2D(y, da.od(1), b.TEXTURE_2D, p.get(), 0);
            b.framebufferTexture2D(y, da.od(2), b.TEXTURE_2D, t.get(), 0);
            b.framebufferTexture2D(y, da.od(3), b.TEXTURE_2D, u.get(), 0);
            da.zm(4);
            b.bindFramebuffer(y, null);
            va.reset();
            var w = {
              position: A,
              sb: p,
              Dc: u,
              ga_: t,
              bind: function () {
                b.bindFramebuffer(y, e);
                va.reset();
              },
              set: function () {
                l && b.checkFramebufferStatus(H);
                b.bindFramebuffer(y, e);
                va.reset();
                if (l) {
                  if (b.checkFramebufferStatus(H) !== b.FRAMEBUFFER_COMPLETE)
                    return !1;
                  l = !1;
                }
                b.viewport(0, 0, d, n);
                b.clearColor(0, 0, 0, 0);
                F.Ub() && !da.Zh() && (F.set("s90"), Y.l(!1, !1));
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                return !0;
              },
              H: function () {},
              resize: function (E, k) {
                d = E;
                n = k;
                A.resize(E, k);
                p.resize(E, k);
                t.resize(E, k);
                u.resize(E, k);
                b.bindRenderbuffer(b.RENDERBUFFER, C);
                b.renderbufferStorage(
                  b.RENDERBUFFER,
                  b.DEPTH_COMPONENT16,
                  d,
                  n
                );
                b.bindRenderbuffer(b.RENDERBUFFER, null);
              },
              remove: function () {
                A.remove();
                p.remove();
                t.remove();
                u.remove();
                b.deleteRenderbuffer(C);
                b.deleteFramebuffer(e);
                var E = a.indexOf(w);
                -1 !== E && a.splice(E, 1);
              },
            };
            a.push(w);
            return w;
          },
          resize: function (c, e) {
            a.forEach(function (d) {
              d.resize(c, e);
            });
          },
        };
      })(),
      bc = (function () {
        var a = [],
          c = T.Qg;
        return {
          instance: function (e) {
            function d() {
              u
                ? n()
                : ((g = kd.instance({ ka: H, hm: c })),
                  (p = T.ik[da.T()]),
                  (C = Z.instance({
                    isFloat: xa.ea(),
                    S: !0,
                    isPot: !0,
                    isLinear: !1,
                    Ob: !0,
                    width: p,
                    height: p / 2,
                    F: 3,
                  })),
                  (w = Z.instance({
                    isFloat: xa.ea(),
                    S: !0,
                    isPot: !0,
                    isLinear: !1,
                    Ob: !0,
                    width: p,
                    height: p / 2,
                    F: 3,
                  })),
                  (E = Z.instance({
                    isFloat: xa.ea(),
                    S: !0,
                    isPot: !0,
                    width: 1,
                    height: p / 2,
                    F: 3,
                  })),
                  (k = Z.instance({
                    isFloat: xa.ea() && !c,
                    S: !c,
                    isPot: !1,
                    isLinear: !0,
                    Ob: !0,
                    isMipmap: !1,
                    width: p,
                    height: p / 2,
                    F: c ? 4 : 3,
                  })),
                  (u = !0),
                  n(),
                  I.forEach(function (h) {
                    h();
                  }),
                  I.splice(0, I.length));
            }
            function n() {
              if (u) {
                va.fa();
                g.bn();
                C.M();
                F.set("s73");
                H.g(0);
                F.G("u87", T.Xb);
                Z.rk(1);
                Y.l(!0, !0);
                for (var h = T.Zl[da.T()], q = 0; q < h; ++q)
                  w.o(),
                    F.set("s76"),
                    F.N("u8", 1 / p, 0),
                    C.g(0),
                    Y.l(!1, !1),
                    C.o(),
                    F.N("u8", 0, 2 / p),
                    w.g(0),
                    Y.l(!1, !1);
                E.M();
                F.set("s78");
                C.g(0);
                Y.l(!1, !1);
                F.set(c ? "s80" : "s79");
                k.M();
                C.g(0);
                E.g(1);
                Y.l(!1, !1);
                Z.$(0);
                Z.$(1);
              }
            }
            var l = Object.assign({ Eb: null, qc: null, pc: 0, rc: 0 }, e),
              A = 0,
              p = 0,
              u = !1,
              t = null,
              y = null,
              H = null,
              C = null,
              w = null,
              E = null,
              k = null,
              g = null,
              G = 0,
              I = [];
            e = {
              m: function () {
                function h() {
                  2 === ++q &&
                    ((H = Z.instance({
                      isFloat: xa.ea(),
                      S: !0,
                      isPot: !1,
                      isMipmap: !1,
                      isLinear: !1,
                      Ob: !0,
                      width: A,
                      height: A / 2,
                      F: 3,
                    })),
                    va.fa(),
                    H.M(),
                    F.set("s72"),
                    F.G("u92", l.rc),
                    F.G("u93", l.pc),
                    t.g(0),
                    y.g(1),
                    Y.l(!0, !0),
                    d());
                }
                var q = 0;
                A = T.jk[da.T()];
                G = Math.log2(A) - 1;
                l.Eb &&
                  ((t = Z.instance({
                    isPot: !1,
                    url: l.Eb,
                    R: h,
                    F: 3,
                    isFlipY: !1,
                  })),
                  (y = Z.instance({
                    isPot: !1,
                    url: l.qc,
                    R: h,
                    F: 3,
                    isFlipY: !1,
                  })));
              },
              Yi: function (h) {
                H = h;
                d();
              },
              Xc: function (h) {
                u && (g.g(h), F.G("u110", g.L()));
              },
              Yc: function (h) {
                u && k.g(h);
              },
              gh: function () {
                F.G("u22", G);
              },
              wh: function () {
                return G;
              },
              L: function () {
                return A;
              },
              Gb: function (h) {
                u ? h() : I.push(h);
              },
              K: function () {
                t && t.remove();
                y && y.remove();
                C.remove();
                E.remove();
                w.remove();
                g.remove();
                k.remove();
                H.remove();
              },
            };
            a.push(e);
            e.m();
            return e;
          },
          K: function () {
            a.forEach(function (e) {
              e.K();
            });
          },
        };
      })(),
      Vc = {
        instance: function (a) {
          var c = a.tm,
            e = a.rm,
            d = 0,
            n = c.L();
          a = T.Qg;
          var l = Z.instance({
              isFloat: xa.ea() && !a,
              S: !a,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: n,
              F: a ? 4 : 3,
              isFlipY: !1,
            }),
            A = Z.instance({
              isFloat: xa.ea() && !a,
              S: !a,
              isPot: !1,
              isLinear: !0,
              Ob: !0,
              isMipmap: !1,
              width: n,
              height: n / 2,
              F: a ? 4 : 3,
            }),
            p = va.instance({ width: n, height: n }),
            u = a ? "s66" : "s65";
          return {
            Ln: function (t) {
              d = t;
              F.set(u);
              b.viewport(0, 0, n, n);
              p.o();
              l.o();
              F.G("u7", d);
              c.Xc(1);
              e.Xc(0);
              Y.l(!0, !0);
              b.viewport(0, 0, n, n / 2);
              A.o();
              c.Yc(1);
              e.Yc(0);
              Y.l(!1, !1);
              b.flush();
            },
            Xc: function (t) {
              l.g(t);
            },
            Yc: function (t) {
              A.g(t);
            },
            gh: function () {
              F.G("u22", c.wh() * (1 - d) + e.wh() * d);
            },
          };
        },
      },
      Ib = (function () {
        function a(M) {
          var J = (f - T.ye) / (T.Ug - T.ye);
          J = 1 - Math.pow(1 - J, T.Fo);
          f += M * (1 + J * T.Go);
          f = Math.min(Math.max(f, T.ye), T.Ug);
          r.kc();
        }
        function c(M) {
          -1 !== p &&
            ((G = g = 0),
            A(),
            a((T.Eo * M.deltaY) / window.innerHeight),
            M.preventDefault());
        }
        function e() {
          h += g;
          q += G;
          q = Math.min(Math.max(q, T.Nm), T.Mm);
          r.kc();
        }
        function d(M) {
          if (0 === p || -1 === p) return !1;
          var J = void 0 !== M.touches && M.touches.length;
          M.preventDefault();
          if (2 === p) {
            var K = Mc(
              M.touches[0].pageX,
              M.touches[0].pageY,
              M.touches[1].pageX,
              M.touches[1].pageY
            );
            a(-(E - K) * T.Om);
            E = K;
          } else
            (K = J ? M.touches[0].clientX : M.clientX),
              (M = J ? M.touches[0].clientY : M.clientY),
              (g = (2 * (K - C) * Math.PI) / da.L()),
              (G = (2 * (M - w) * Math.PI) / da.Y()),
              4 === p
                ? ((m[0] += g * T.ui),
                  (m[1] -= G * T.ui),
                  (m[0] = Math.min(Math.max(m[0], -T.xi), T.xi)),
                  (m[1] = Math.min(Math.max(m[1], -T.yi), T.yi)),
                  r.kc())
                : e(),
              (C = K),
              (w = M);
        }
        function n() {
          0 !== p &&
            -1 !== p &&
            ((0 === g && 0 === G) || 1 !== p || !O
              ? sa.ya()
              : (A(), (k = Date.now()), (L = setInterval(r.qm, I))),
            (p = 0));
        }
        function l(M) {
          if (2 !== p && -1 !== p) {
            G = g = 0;
            A();
            sa.wake();
            var J = void 0 !== M.changedTouches && M.touches.length;
            M.preventDefault();
            J && 2 === M.touches.length
              ? ((p = 2),
                (E = Mc(
                  M.touches[0].pageX,
                  M.touches[0].pageY,
                  M.touches[1].pageX,
                  M.touches[1].pageY
                )))
              : ((p = J || 2 !== M.button ? 1 : 4),
                (C = J ? M.touches[0].clientX : M.clientX),
                (w = J ? M.touches[0].clientY : M.clientY));
            return !1;
          }
        }
        function A() {
          L && (clearInterval(L), (L = !1));
        }
        var p = 0,
          u = !1,
          t = !1,
          y = !1,
          H = 1,
          C = 0,
          w = 0,
          E = 0,
          k = 0,
          g = 0,
          G = 0,
          I = 16,
          h = T.mj,
          q = T.wi,
          f = T.xe,
          L = !1,
          O = 0,
          v = new Float32Array([0, 0, 0, 0, 0]),
          m = [T.vk, T.wk],
          r = {
            m: function () {
              O = T.Nj[da.T()];
              I = T.gd[da.T()];
              da.Fa("mousedown", l);
              da.Fa("mouseup", n);
              da.Fa("mouseout", n);
              da.Fa("mousemove", d);
              da.Fa("mousemove", d);
              da.Fa("wheel", c);
              da.Fa("touchstart", l);
              da.Fa("touchend", n);
              da.Fa("touchmove", d);
            },
            kc: function (M) {
              u
                ? ((t[0] = -q),
                  (t[1] = h),
                  (y[1].value = (H / T.xe) * f),
                  Qa.vb(y))
                : ((v[0] = h),
                  (v[1] = q),
                  (v[2] = f),
                  (v[3] = m[0]),
                  (v[4] = m[1]),
                  qc.pn(v, M));
            },
            qm: function () {
              if ((1e-4 > g && 1e-4 > G) || -1 === p)
                A(), (G = g = 0), 0 === p && sa.ya();
              var M = Date.now(),
                J = M - k;
              k = M;
              M = Math.pow(O, J / I);
              g *= M;
              G *= M;
              e();
            },
            Re: function (M) {
              u ||
                ((u = !0),
                (p = -1),
                (t = [0, 0, 0]),
                (y = [
                  { name: "u78", type: "3f", value: t },
                  { name: "u82", type: "1f", value: 1 },
                ]),
                (H = M));
            },
            ij: function (M) {
              -1 === p && M && (p = 0);
              M || (p = -1);
            },
            hn: function () {
              G = g = 0;
              h = T.mj;
              q = T.wi;
              f = T.xe;
              r.kc();
            },
            Up: function (M) {
              f = M;
            },
            Vp: function (M) {
              m[0] = M[0];
              m[1] = M[1];
              T.Vg = M[2];
            },
            Tp: function (M, J) {
              h = M;
              q = J;
            },
          };
        return r;
      })(),
      uc = (function () {
        var a = {
          s92: !1,
          s92color: !1,
          s92NormalMap: !1,
          s92ParamsMap: !1,
          s92NormalParamsMap: !1,
        };
        return {
          instance: function (c) {
            function e(x) {
              if (U) {
                x.tweaker &&
                  window.JEELIZVTO &&
                  "undefined" !== typeof R &&
                  R.Pg(x.tweaker);
                v.splice(0, v.length);
                v.push({ n: 0, offset: 0 });
                f.min.set(Infinity, Infinity, Infinity);
                f.max.set(-Infinity, -Infinity, -Infinity);
                var z = x.uvs;
                z &&
                  (z = z.filter(function (ha) {
                    return ha;
                  }));
                ba = z && 0 < z.length && 0 < z[0].length ? !0 : !1;
                "undefined" !== typeof $a &&
                  "string" === typeof x.faces &&
                  (x.faces = $a(x.faces));
                "undefined" !== typeof hb &&
                  ("string" === typeof x.vertices &&
                    (x.vertices = hb(x.vertices)),
                  z &&
                    z.length &&
                    z.forEach(function (ha, ra) {
                      "string" === typeof ha && (z[ra] = hb(ha));
                    }));
                var D = x.metadata.faces,
                  S = 1 + (ba ? 1 : 0);
                D = (x.faces.length - D) / (x.metadata.faces * S);
                (6 !== D && 8 !== D) || ba || (++S, (D /= 2));
                if (4 === D) {
                  D = 6 * S + 2;
                  for (
                    var ea = 4 * S + 1, X = Array(x.metadata.faces * D), aa = 0;
                    aa < x.metadata.faces;
                    ++aa
                  )
                    for (var oa = 0; oa < S; ++oa)
                      (X[aa * D + 4 * oa] = x.faces[aa * ea + 5 * oa]),
                        (X[aa * D + 4 * oa + 1] =
                          x.faces[aa * ea + 5 * oa + 1]),
                        (X[aa * D + 4 * oa + 2] =
                          x.faces[aa * ea + 5 * oa + 2]),
                        0 === oa && (X[aa * D + 3] = x.faces[aa * ea + 4]),
                        (X[aa * D + 4 * oa + 3 * S + 1] =
                          x.faces[aa * ea + 5 * oa]),
                        (X[aa * D + 4 * oa + 3 * S + 2] =
                          x.faces[aa * ea + 5 * oa + 2]),
                        (X[aa * D + 4 * oa + 3 * S + 3] =
                          x.faces[aa * ea + 5 * oa + 3]),
                        0 === oa &&
                          (X[aa * D + 3 * S + 4] = x.faces[aa * ea + 4]);
                  x.faces = X;
                  x.metadata.faces *= 2;
                }
                C = Array(x.metadata.vertices);
                for (D = 0; D < x.metadata.vertices; ++D)
                  (C[D] = new Oa(
                    x.vertices[3 * D],
                    x.vertices[3 * D + 1],
                    x.vertices[3 * D + 2]
                  )),
                    Yc(f, C[D]);
                w = Array(x.metadata.faces);
                S = 3 * S + 1;
                for (D = 0; D < x.metadata.faces; ++D)
                  (w[D] = new wc(
                    x.faces[S * D],
                    x.faces[S * D + 1],
                    x.faces[S * D + 2]
                  )),
                    (w[D].Wb = x.faces[S * D + 3]);
                r = 3 < C.length;
                U && (U.visible = r);
                $c(C, w);
                E = ad(C, w);
                if (ba) {
                  S = Array(C.length);
                  D = ["a", "b", "c"];
                  for (ea = 0; ea < x.metadata.faces; ++ea)
                    for (X = 0; 3 > X; ++X)
                      if (
                        ((aa = x.faces[7 * ea + X]),
                        (oa = x.faces[7 * ea + 1 + X + 3]),
                        "undefined" === typeof S[aa])
                      )
                        S[aa] = [[aa, oa]];
                      else if (S[aa][0][1] !== oa) {
                        for (var Ma = -1, Da = 1; Da < S[aa].length; ++Da)
                          if (S[aa][Da][1] === oa) {
                            Ma = S[aa][Da][0];
                            break;
                          }
                        Da = -1;
                        -1 === Ma
                          ? ((Da = C.length),
                            C.push(C[aa].clone()),
                            E.push(E[aa].clone()),
                            S[aa].push([Da, oa]),
                            (S[Da] = [[Da, oa]]))
                          : (Da = Ma);
                        x.faces[7 * ea + X] = Da;
                        w[ea][D[X]] = Da;
                      }
                  k = Array(C.length);
                  for (x = 0; x < C.length; ++x)
                    (D = "undefined" === typeof S[x] ? x : S[x][0][1]),
                      (k[x] = new Qb(z[0][2 * D], z[0][2 * D + 1]));
                }
                var ka = nc(f);
                c.Cb &&
                  (C.forEach(function (ha) {
                    ha.x -= ka.x;
                    ha.z -= ka.z;
                    ha.y -= f.min.y;
                  }),
                  (f.min.x -= ka.x),
                  (f.max.x -= ka.x),
                  (f.min.z -= ka.z),
                  (f.max.z -= ka.z),
                  (f.max.y -= f.min.y),
                  (f.min.y = 0));
                if (c.Db) {
                  var la =
                    T.gk /
                    Math.max(
                      f.max.x - f.min.x,
                      f.max.y - f.min.y,
                      f.max.z - f.min.z
                    );
                  C.forEach(function (ha) {
                    ha.Ba(la);
                  });
                  f.min.Ba(la);
                  f.max.Ba(la);
                }
                x = ba ? 8 : 6;
                S = new Float32Array(C.length * x);
                for (D = 0; D < C.length; ++D)
                  (S[x * D] = C[D].x),
                    (S[x * D + 1] = C[D].y),
                    (S[x * D + 2] = C[D].z),
                    (S[x * D + 3] = E[D].x),
                    (S[x * D + 4] = E[D].y),
                    (S[x * D + 5] = E[D].z),
                    ba && ((S[x * D + 6] = k[D].x), (S[x * D + 7] = k[D].y));
                w.sort(function (ha, ra) {
                  return ha.Wb - ra.Wb;
                });
                var Ba = new (65536 > 3 * w.length ? Uint16Array : Uint32Array)(
                    3 * w.length
                  ),
                  V = 0;
                w.forEach(function (ha, ra) {
                  ha.Wb === V
                    ? (v[V].n += 3)
                    : (v.push({ n: 3, offset: 3 * ra }), ++V);
                  Ba[3 * ra] = ha.a;
                  Ba[3 * ra + 1] = ha.b;
                  Ba[3 * ra + 2] = ha.c;
                });
                g && g.remove();
                g = Y.instance({ ha: S, U: Ba });
                h = I = !1;
                P && U.$g();
                M = !0;
                U.Oe();
                c.R && (c.R(U), (c.R = null));
              }
            }
            function d(x) {
              g.Ga(x.n, x.offset);
            }
            function n(x, z) {
              K[z] &&
                (F.set(K[z].Hl()),
                g.bind(!1),
                ba ? (F.Ma(), F.Vi()) : (F.Xa(), F.Wi()),
                K[z].Bc() && (F.Ic(), I.sc(!1), F.Nd(), kb.Hb()),
                K[z].Vk(),
                K[z].fd(),
                g.Ga(x.n, x.offset));
            }
            function l(x, z) {
              K[z] &&
                (F.set(K[z].Il()),
                g.bind(!1),
                ba ? (F.Ma(), F.Vi()) : (F.Xa(), F.Wi()),
                K[z].Bc() && (F.Ic(), I.sc(!1), F.Nd(), kb.Hb()),
                U.wc(),
                K[z].fd(),
                g.Ga(x.n, x.offset));
            }
            function A(x, z) {
              ja && K[z] && (K[z].Wk(), g.Ga(x.n, x.offset));
            }
            function p(x, z) {
              ja && K[z] && (K[z].Yk(ba), g.Ga(x.n, x.offset));
            }
            function u(x, z) {
              K[z] && (F.set(K[z].Dl()), K[z].lh(), g.Ga(x.n, x.offset));
            }
            function t(x, z) {
              K[z] &&
                (F.set(K[z].El()), U.wc(), K[z].lh(), g.Ga(x.n, x.offset));
            }
            function y(x, z) {
              K[z] &&
                (F.set(K[z].Fl()),
                K[z].Bc() && (I.sc(!1), F.Nd(), kb.Hb()),
                g.bind(!1),
                K[z].ih(ba),
                g.Ga(x.n, x.offset));
            }
            function H(x, z) {
              if (K[z]) {
                var D = K[z].Gl();
                F.set(D);
                K[z].Bc() && (I.sc(!1), F.Nd(), kb.Hb(), g.bind(!1));
                a[D] || (U.wc(), g.bind(!1), (a[D] = !0));
                K[z].ih(ba);
                g.Ga(x.n, x.offset);
              }
            }
            if (!da.Xg()) return !1;
            void 0 === c.Cb && (c.Cb = !1);
            void 0 === c.Db && (c.Db = !1);
            void 0 === c.Tg && (c.Tg = !1);
            var C = null,
              w = null,
              E = null,
              k = null,
              g = null,
              G = null,
              I = null,
              h = !1,
              q = new Sb(),
              f = new vc(),
              L = [],
              O = null,
              v = [{ n: 0, offset: 0 }],
              m = [],
              r = !1,
              M = !1,
              J = [],
              K = [],
              P = !1,
              ba = !1,
              ja = !1,
              U = {
                visible: r,
                Gk: function () {
                  return v.length;
                },
                $g: function () {
                  !h &&
                    ba &&
                    ((w = w.filter(function (x) {
                      return null !== x;
                    })),
                    (G = bd(C, E, k, w)),
                    (I = Y.instance({ ha: G, U: !1 })),
                    (k = E = w = C = G = null),
                    (h = !0));
                },
                wc: function () {
                  kb.V();
                  U.kh();
                },
                kh: function () {
                  F.Jc("u132", q.elements);
                },
                ep: function () {
                  r && (U.kh(), g.bind(!1), ba ? F.Ma() : F.Xa(), g.V());
                },
                fl: function (x) {
                  r && (x || U.wc(), g.bind(!1), ba ? F.Ma() : F.Xa(), g.V());
                },
                gl: function () {
                  r && (g.bind(!1), ba ? F.Ma() : F.Xa(), v.forEach(A));
                },
                hh: function () {
                  r && (g.bind(!1), ba ? F.Ma() : F.Xa(), m.forEach(d));
                },
                dl: function (x) {
                  ja &&
                    r &&
                    (g.bind(!1),
                    ba ? F.Ma() : F.Xa(),
                    x ? v.forEach(u) : v.forEach(t));
                },
                ed: function (x) {
                  r &&
                    (x || U.wc(),
                    g.bind(!1),
                    x || (F.Ma(), F.Ic()),
                    ja && v.forEach(p));
                },
                fd: function (x) {
                  ja && r && (x ? v.forEach(n) : v.forEach(l));
                },
                $k: function () {
                  ja && r && v.forEach(H);
                },
                Zk: function () {
                  ja && r && v.forEach(y);
                },
                Fh: function () {
                  return O;
                },
                Dh: function () {
                  return J;
                },
                lo: function (x, z) {
                  K[x].update(z);
                  U.wj();
                },
                gg: function (x, z) {
                  function D(X, aa) {
                    X &&
                      ((X.R = function () {
                        U &&
                          ++ea === S &&
                          ((ja = !0),
                          P && U.Gb(U.$g, 5),
                          U.Oe(),
                          z &&
                            U.Gb(function () {
                              z(U);
                            }, 10));
                      }),
                      (X = zc.instance(X)),
                      K[aa] && K[aa].K(),
                      (K[aa] = X),
                      (P = P || X.Bc()));
                  }
                  J = x;
                  ja = !1;
                  var S = x.length,
                    ea = 0;
                  K = Array(S);
                  P = !1;
                  x.forEach(function (X, aa) {
                    "string" === typeof X
                      ? xc(
                          -1 === X.indexOf(".json") ? X + ".json" : X,
                          function (oa) {
                            oa.name = X;
                            D(oa, aa, X);
                          }
                        )
                      : D(X, aa, !1);
                  });
                  U.Gb(function () {
                    U.wj();
                    sa.wb(U);
                    sa.Wd(!0);
                  }, 4);
                },
                wj: function () {
                  m.splice(0, m.length);
                  v.forEach(function (x, z) {
                    K[z] && K[z].om() && m.push(x);
                  });
                },
                Gb: function (x, z) {
                  M && ja ? x(U) : L.push({ mb: x, order: z ? z : 0 });
                },
                Oe: function () {
                  M &&
                    ja &&
                    (L.sort(function (x, z) {
                      return 0 > x.order - z.order ? 1 : -1;
                    }),
                    L.forEach(function (x) {
                      x.mb(U);
                    }),
                    L.splice(0, L.length));
                },
                remove: function () {
                  U.K();
                  U = null;
                },
                K: function () {
                  r = M = !1;
                  g && g.remove();
                  K.forEach(function (x) {
                    x.K();
                  });
                  h && I.remove();
                },
                Kl: function () {
                  return f.size().x;
                },
                Ll: function () {
                  return f.size().y;
                },
                vp: function () {
                  return f.size().z;
                },
                rl: function () {
                  return nc(f).x;
                },
                sl: function () {
                  return nc(f).y;
                },
                jp: function () {
                  return nc(f).z;
                },
                rp: function () {
                  return f.min.y;
                },
                replace: function (x, z, D) {
                  if (x === O) return z && U && (U.Oe(), z(U)), !1;
                  O = x;
                  sa.Wd(!1);
                  xc(
                    x,
                    function (S) {
                      e(S);
                      z && z(U);
                    },
                    D
                  );
                  return !0;
                },
              };
            c.Ec && U.gg(c.Ec, c.Tg);
            O = c.url;
            xc(c.url, e);
            return U;
          },
          fn: function () {
            a.s92 = !1;
            a.s92color = !1;
            a.s92NormalMap = !1;
            a.s92ParamsMap = !1;
            a.s92NormalParamsMap = !1;
          },
        };
      })(),
      qc = (function () {
        var a = null,
          c = !1,
          e = !1,
          d = null,
          n = new Float32Array(16),
          l = new Float32Array(3),
          A = { data: 0 },
          p = {
            m: function () {
              a = T.Ib
                ? new Worker("js/worker.php")
                : {
                    postMessage: function (u) {
                      A.data = u;
                      Ac.Hm(A);
                    },
                    terminate: function () {},
                  };
              a.onmessage = function (u) {
                switch (u.data[0]) {
                  case 3:
                    for (var t = 0; 16 > t; ++t) n[t] = u.data[t + 1];
                    for (t = 0; 3 > t; ++t) l[t] = u.data[t + 17];
                    kb.We().Gn(n, l);
                    break;
                  case 6:
                    p.An(), (c = !0), Ib.kc(!1), T.da && (yb.enable(), yb.Od());
                }
              };
              d = new Float32Array(6);
              d[0] = 2;
              T.Ib || Ac.Cn(a);
            },
            Yn: function () {
              T.fh || (e = !0);
            },
            cq: function () {
              e = !1;
            },
            pn: function (u, t) {
              if (t || (c && e))
                (d[1] = u[0]),
                  (d[2] = u[1]),
                  (d[3] = u[2]),
                  (d[4] = u[3]),
                  (d[5] = u[4]),
                  a.postMessage(d);
            },
            An: function () {
              a.postMessage([5, T.Vg]);
            },
            K: function () {
              T.Ib && a.terminate();
            },
          };
        return p;
      })(),
      Ac = (function () {
        var a = 0,
          c = 0,
          e = 0,
          d = [0, 0],
          n = new Sb(),
          l = new mc(),
          A = new mc(),
          p = new Oa(),
          u = new Oa(),
          t = new Rb(),
          y = 0,
          H = new Float32Array(20);
        H[0] = 3;
        var C = !1,
          w = { data: !1 },
          E = {
            m: function () {
              "undefined" === typeof T && (self.Io = { Ib: !0 });
              T.Ib && E.Vf([6]);
            },
            Hm: function (k) {
              switch (k.data[0]) {
                case 2:
                  E.hg(k.data);
                  break;
                case 5:
                  y = k.data[1];
              }
            },
            Vf: function (k) {
              T.Ib ? postMessage(k) : ((w.data = k), C.onmessage(w));
            },
            hg: function (k) {
              a = k[1];
              c = k[2];
              e = k[3];
              d[0] = k[4];
              d[1] = k[5];
              p.set(d[0], d[1], -e);
              t.set(c, a, 0, "XYZ");
              if (!1 === t instanceof Rb)
                throw Error(
                  "JETHREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order."
                );
              k = Math.cos(t.B / 2);
              var g = Math.cos(t.C / 2),
                G = Math.cos(t.D / 2),
                I = Math.sin(t.B / 2),
                h = Math.sin(t.C / 2),
                q = Math.sin(t.D / 2),
                f = t.order;
              "XYZ" === f
                ? ((l.B = I * g * G + k * h * q),
                  (l.C = k * h * G - I * g * q),
                  (l.D = k * g * q + I * h * G),
                  (l.O = k * g * G - I * h * q))
                : "YXZ" === f
                ? ((l.B = I * g * G + k * h * q),
                  (l.C = k * h * G - I * g * q),
                  (l.D = k * g * q - I * h * G),
                  (l.O = k * g * G + I * h * q))
                : "ZXY" === f
                ? ((l.B = I * g * G - k * h * q),
                  (l.C = k * h * G + I * g * q),
                  (l.D = k * g * q + I * h * G),
                  (l.O = k * g * G - I * h * q))
                : "ZYX" === f
                ? ((l.B = I * g * G - k * h * q),
                  (l.C = k * h * G + I * g * q),
                  (l.D = k * g * q - I * h * G),
                  (l.O = k * g * G + I * h * q))
                : "YZX" === f
                ? ((l.B = I * g * G + k * h * q),
                  (l.C = k * h * G + I * g * q),
                  (l.D = k * g * q - I * h * G),
                  (l.O = k * g * G - I * h * q))
                : "XZY" === f &&
                  ((l.B = I * g * G - k * h * q),
                  (l.C = k * h * G - I * g * q),
                  (l.D = k * g * q + I * h * G),
                  (l.O = k * g * G + I * h * q));
              p.y -= y;
              k = n.elements;
              q = l.x;
              var L = l.y,
                O = l.z;
              I = l.w;
              var v = q + q,
                m = L + L;
              h = O + O;
              g = q * v;
              G = q * m;
              q *= h;
              f = L * m;
              L *= h;
              O *= h;
              v *= I;
              m *= I;
              I *= h;
              k[0] = 1 - (f + O);
              k[4] = G - I;
              k[8] = q + m;
              k[1] = G + I;
              k[5] = 1 - (g + O);
              k[9] = L - v;
              k[2] = q - m;
              k[6] = L + v;
              k[10] = 1 - (g + f);
              k[3] = 0;
              k[7] = 0;
              k[11] = 0;
              k[12] = 0;
              k[13] = 0;
              k[14] = 0;
              k[15] = 1;
              n.setPosition(p);
              A.J(l).inverse();
              k = u.J(p);
              L = k.x;
              v = k.y;
              O = k.z;
              g = A.x;
              G = A.y;
              I = A.z;
              h = A.w;
              q = h * L + G * O - I * v;
              f = h * v + I * L - g * O;
              m = h * O + g * v - G * L;
              L = -g * L - G * v - I * O;
              k.x = q * h + L * -g + f * -I - m * -G;
              k.y = f * h + L * -G + m * -g - q * -I;
              k.z = m * h + L * -I + q * -G - f * -g;
              for (k = 1; 17 > k; ++k) H[k] = n.elements[k - 1];
              H[17] = u.x;
              H[18] = u.y;
              H[19] = u.z;
              E.Vf(H);
            },
            Cn: function (k) {
              C = k;
              E.Vf([6]);
            },
          };
        return E;
      })();
    Ac.m();
    var zc = (function () {
        function a(A) {
          var p = A.split(":").shift();
          return "data" === p || "blob" === p
            ? A
            : ("undefined" !== typeof N && N.aa ? N : T).aa + T.Bm + A;
        }
        function c(A, p) {
          return Math.min(p + A + p * A, 1);
        }
        var e = !1,
          d = null,
          n = 1,
          l = {
            diffuseTexture: null,
            normalTexture: null,
            paramsTexture: null,
            colorTextureUsage: 0,
            metalness: 0.5,
            roughness: 0.5,
            fresnelMin: 0,
            fresnelMax: 1,
            fresnelPow: 5,
            alpha: 1,
            diffuseColor: [255, 255, 255],
            paramsMapMask: [0, 0, 0, 0],
            R: null,
          };
        return {
          m: function () {
            d = Z.instance({
              width: 1,
              height: 1,
              isMipmap: !1,
              F: 4,
              array: new Uint8Array([255, 255, 255, 255]),
              Ac: !1,
            });
          },
          Re: function () {
            e = !0;
            n = 2;
          },
          instance: function (A) {
            function p(r) {
              function M() {
                ++K === J && r && r();
              }
              var J = 1,
                K = 0;
              (t = w.normalTexture && da.zk() ? !0 : !1) &&
                !g.Ka &&
                (++J,
                (g.Ka = Z.instance({
                  url: a(w.normalTexture),
                  isLinear: !0,
                  isMipmap: !0,
                  Sh: da.nm(),
                  isPot: !0,
                  F: 3,
                  R: M,
                })));
              (y = w.diffuseTexture && "" !== w.diffuseTexture ? !0 : !1) &&
              !g.ga_
                ? (++J,
                  (g.ga_ = Z.instance({
                    url: a(w.diffuseTexture),
                    isMipmap: !0,
                    isLinear: !0,
                    isPot: !0,
                    Sh: !0,
                    Ac: !1,
                    Ob: !1,
                    em: !1,
                    F: 4,
                    R: M,
                  })),
                  (k = "s97"))
                : g.ga_ || ((k = "s98"), (g.ga_ = d));
              E = [
                w.diffuseColor[0] / 255,
                w.diffuseColor[1] / 255,
                w.diffuseColor[2] / 255,
              ];
              (G = w.paramsTexture ? !0 : !1) &&
                !g.tb &&
                (w.paramsTexture === w.diffuseTexture
                  ? (g.tb = g.ga_)
                  : (++J,
                    (g.tb = Z.instance({
                      url: a(w.paramsTexture),
                      isMipmap: !0,
                      isLinear: !0,
                      isPot: !0,
                      Sh: !0,
                      Ac: !1,
                      Ob: !1,
                      em: !1,
                      F: 4,
                      R: M,
                    }))));
              M();
            }
            function u(r) {
              "number" === typeof w.alpha
                ? ((H[0] = w.alpha), (H[1] = 0), (H[2] = 0), (H[3] = 0))
                : ((H[0] = w.alpha[0]),
                  (H[1] = w.alpha[1] - w.alpha[0]),
                  (H[2] = w.alpha[2]),
                  (H[3] = w.alpha[3]));
              var M = 1 <= w.fresnelPow ? w.fresnelMin : w.fresnelMax;
              C[0] = c(H[0], M);
              C[1] = c(H[1], M);
              C[2] = H[2];
              C[3] = H[3];
              I = {
                vi: w.fresnelMax,
                hi: [w.fresnelMin, w.roughness, w.fresnelPow / 15, w.metalness],
                ki: w.paramsMapMask,
              };
              r = w.R ? w.R.bind(null, r) : null;
              p(r);
              t || G || y
                ? t || G
                  ? t && !G
                    ? ((h = "s92NormalMap"), (q = "s92NNGLtextureNormalMap"))
                    : !t && G
                    ? ((h = "s92ParamsMap"), (q = "s92NNGLtextureParamsMap"))
                    : ((h = "s92NormalParamsMap"),
                      (q = "s92NNGLtextureNormalParamsMap"))
                  : ((h = "s92"), (q = "s92NNGLtexture"))
                : ((h = "s92color"), (q = "s92NNGLcolor"));
              f = t ? "s100" : "s99";
              L = t ? "s94" : "s104";
              O = G ? "s102" : "s101";
              v = G ? "s95" : "s105";
            }
            var t,
              y,
              H = [1, 0, 0, 0],
              C = [0, 0, 0, 0],
              w = Object.assign({}, l, A),
              E = null,
              k = null,
              g = { ga_: null, Ka: null, tb: null },
              G = (t = y = !1),
              I = null,
              h = null,
              q = null,
              f = null,
              L = null,
              O = null,
              v = null,
              m = {
                update: function (r) {
                  Object.assign(w, r);
                  u();
                },
                Bc: function () {
                  return t;
                },
                om: function () {
                  return 0.99 > H[0];
                },
                Il: function () {
                  return L;
                },
                Hl: function () {
                  return f;
                },
                El: function () {
                  return v;
                },
                Dl: function () {
                  return O;
                },
                Gl: function () {
                  return h;
                },
                Fl: function () {
                  return q;
                },
                fd: function () {
                  t && g.Ka.g(0);
                },
                Yk: function (r) {
                  e && F.set(k);
                  r ? F.Ma() : F.Xa();
                  y && F.Ic();
                  m.ed();
                },
                ed: function () {
                  y && (F.G("u69", w.colorTextureUsage), g.ga_.g(0));
                  F.lg("u142", E);
                },
                lh: function () {
                  G && (g.tb.g(0), F.xa("u71", I.ki), F.Ic());
                  F.xa("u107", I.hi);
                  F.G("u143", I.vi);
                },
                ih: function (r) {
                  G && !t
                    ? g.tb.g(n)
                    : t && (y || d.g(0), g.Ka.g(n), G && g.tb.g(n + 1));
                  G && F.xa("u71", I.ki);
                  y || t ? F.xn() : r ? F.yn() : F.zn();
                  m.ed();
                  F.xa("u7", H);
                  F.xa("u107", I.hi);
                  F.G("u143", I.vi);
                },
                Vk: function () {
                  F.xa("u7", H);
                },
                Wk: function () {
                  F.xa("u7", C);
                },
                K: function () {
                  y && g.ga_.remove();
                  t && g.Ka.remove();
                  G && w.paramsTexture !== w.diffuseTexture && g.tb.remove();
                },
              };
            u(m);
            return m;
          },
        };
      })(),
      yb = (function () {
        var a = 0,
          c = 0,
          e = 0,
          d = 0,
          n = 0,
          l = 0,
          A = T.ek,
          p = T.dk,
          u = T.fk,
          t = 0,
          y = 0,
          H = null,
          C = null,
          w = 0,
          E = 0,
          k = 0,
          g = 0,
          G = 0,
          I = null,
          h = 0,
          q = 0,
          f = 0,
          L = Date.now(),
          O = null,
          v = !1,
          m = !1,
          r = !1,
          M = 1,
          J = !1,
          K = {
            m: function () {
              a = T.$j[da.T()];
              c = T.Zj[da.T()];
              e = T.Yj[da.T()];
              q = T.ak[da.T()];
              d = T.Sj[da.T()];
              n = T.Wj[da.T()];
              k = T.Xj[da.T()];
              g = da.L();
              G = da.Y();
              t = Math.round(g * a);
              y = Math.round(G * a);
              C = va.instance({ width: t, height: y, yc: !1 });
              H = Z.instance({ width: t, height: y, isPot: !1, isLinear: !0 });
              I = Z.instance({
                width: t,
                height: y,
                isPot: !1,
                isLinear: !0,
                F: 1,
              });
              v = !0;
            },
            resize: function (P, ba, ja) {
              M = ja;
              g = P;
              G = ba;
              t = Math.round(P * a);
              y = Math.round(ba * a);
              C.resize(t, y);
              m = !0;
            },
            V: function () {
              var P = Math.exp(-(Date.now() - L) / q);
              h = r ? f + (1 - P) * (1 - f) : f * P;
              w = c + h * (e - c);
              E = d + (1 - h) * (1 - d);
              l = n + (1 - h) * (1 - n);
              Z.$(5);
              if (m && v)
                Z.$(6),
                  I.resize(t, y),
                  F.set("s0"),
                  F.Qd("u1", 6),
                  C.bind(!1, !0),
                  I.o(),
                  C.Ae(),
                  H.g(6),
                  Y.l(!0, !0),
                  H.resize(t, y),
                  H.o(),
                  I.g(6),
                  Y.l(!1, !1),
                  F.Qd("u1", 0),
                  (m = !1);
              else {
                b.enable(b.BLEND);
                b.blendFunc(b.CONSTANT_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                P = w / k;
                b.blendColor(P, P, P, P);
                b.colorMask(!0, !1, !1, !0);
                F.set("s84");
                kb.Pe();
                F.G("u123", w);
                q && (F.G("u124", E), F.G("u116", l));
                var ba = M * (A + Math.pow(Math.random(), u) * (p - A));
                F.N("u8", ba / g, ba / G);
                C.Rg();
                C.Kc();
                H.o();
                ba = 2 * Math.PI * Math.random();
                for (var ja = !0, U = 0; U < k; ++U)
                  1 === U && (b.blendFunc(b.SRC_ALPHA, b.ONE), F.G("u123", P)),
                    F.G("u122", ba + (U / k) * (Math.PI / 2)),
                    F.N(
                      "u121",
                      (Math.random() - 0.5) / g,
                      (Math.random() - 0.5) / G
                    ),
                    Y.l(ja, ja),
                    (ja = !1);
                b.disable(b.BLEND);
                F.set("s85");
                F.N("u8", 1 / t, 1 / y);
                I.o();
                H.g(7);
                Y.l(!1, !1);
                b.colorMask(!0, !0, !0, !0);
              }
            },
            g: function (P) {
              I.g(P);
            },
            enable: function () {
              J = !0;
            },
            Qm: function () {
              if (r || !J) return !1;
              O && clearTimeout(O);
              K.Od();
              O = setTimeout(K.uj, 400);
            },
            Od: function () {
              O && (clearTimeout(O), (O = !1));
              !r &&
                J &&
                (window.Fj.disable(), (r = !0), (L = Date.now()), (f = h));
            },
            uj: function () {
              r &&
                J &&
                (O && (clearTimeout(O), (O = null)),
                window.Fj.enable(),
                (r = !1),
                (L = Date.now()),
                (f = h));
            },
            K: function () {
              H.remove();
              I.remove();
              C.remove();
            },
          };
        K.Qm();
        return K;
      })(),
      kd = {
        instance: function (a) {
          var c = a.ka.L(),
            e = a.hm ? !0 : !1,
            d = e ? "s67" : "s12",
            n = Z.instance({
              isFloat: a.ka.$h() && xa.ea() && !e,
              S: a.ka.ai() && !e,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: c,
              height: c,
              F: e ? 4 : 3,
            }),
            l = Z.instance({
              isFloat: a.ka.$h() && xa.ea(),
              S: a.ka.ai(),
              isPot: !0,
              width: 1,
              height: c / 2,
              F: 3,
            });
          l.o();
          F.set("s78");
          a.ka.g(0);
          Y.l(!0, !0);
          var A = Math.round(Math.log(c) / Math.log(2));
          n.bn = function () {
            n.o();
            F.set(d);
            F.G("u87", T.Xb);
            a.ka.g(0);
            l.g(1);
            for (var p = 0, u = 0; u <= A; ++u) {
              var t = Math.pow(2, A - u),
                y = t / 2;
              b.viewport(0, p, c, y);
              F.N("u85", c / t, 1);
              F.G("u86", Math.min(6 / y, 0.6));
              p += t / 2;
              Y.l(0 === u, 0 === u);
            }
          };
          n.en = n.remove;
          n.remove = function () {
            n.en();
            l.remove();
          };
          return n;
        },
      };
    ta.hb = (function () {
      var a = {
          Md: 45,
          bg: 1,
          Yb: "../../images/debug/picsou.png",
          cg: 0.8,
          Bf: 3.14 / 6,
          Cf: 0.314,
          Df: 4,
          zf: 0.5,
          Af: -0.25,
          sm: 1,
          ta: 256,
          yf: 0.15,
        },
        c = { Jb: null, kd: null, screen: null },
        e = !1,
        d = !1,
        n = -1,
        l = null,
        A = null,
        p = null,
        u = Math.PI / 180,
        t = [1, 1],
        y = {
          m: function (H) {
            n = H.width;
            H = {
              isFloat: xa.ea(),
              S: !0,
              isPot: !1,
              isMipmap: !1,
              isLinear: !1,
              isMirrorY: !0,
              width: n,
              height: n / 2,
              F: 3,
            };
            c.Jb = Z.instance(H);
            c.kd = Z.instance(H);
            F.j("s106", [{ type: "1i", name: "u150", value: 0 }]);
            F.j("s107", [{ type: "1i", name: "u155", value: 0 }]);
            y.mo();
          },
          mo: function () {
            F.j("s107", [
              { type: "1f", name: "u156", value: a.Bf },
              { type: "1f", name: "u157", value: a.Cf },
              { type: "1f", name: "u158", value: a.Df },
              { type: "1f", name: "u159", value: a.zf },
              { type: "1f", name: "u160", value: a.Af },
            ]);
          },
          Gp: function () {
            return d;
          },
          sa: function (H) {
            l = H;
          },
          Gc: function () {
            A =
              "uniform sampler2D u150;uniform vec2 u151,u152,u4;uniform int u153;uniform float u154,u136;varying vec2 vv0;const float h=3.141593;const vec2 i=vec2(.5,.5);const float e=1.2;const vec3 g=vec3(1.,1.,1.);void main(){vec2 c=vec2(vv0.x*2.,-vv0.y+.5)*h,a=i+u4*(c-u151)/u152;float b=1.;if(u153==0){if(a.x<0.||a.x>1.||a.y<0.||a.y>1.)discard;}else b*=smoothstep(-e,0.,a.x),b*=1.-smoothstep(1.,1.+e,a.x),b*=smoothstep(-e,0.,a.y),b*=1.-smoothstep(1.,1.+e,a.y);vec3 d=mix(u154*g,texture2D(u150,a).rgb*u136,b*g);gl_FragColor=vec4(d,1.);}";
            p =
              "uniform sampler2D u155;uniform float u156,u157,u158,u159,u160;varying vec2 vv0;const float f=3.141593;const vec2 o=vec2(.5,.5);const vec3 h=vec3(1.,1.,1.);void main(){float i=(vv0.x*2.-1.)*f,c=(-vv0.y+.5)*f;vec4 a=texture2D(u155,vec2(.5,.5));float d=a.r,j=u158*a.g,k=u159*(a.b+u160),b=a.a,g=asin(cos(b)*cos(d)),l=atan(cos(b)*sin(d),-sin(b)),m=acos(sin(c)*sin(g)+cos(c)*cos(g)*cos(i-l)),n=1.-smoothstep(u156-u157,u156+u157,m);gl_FragColor=vec4(h*(max(k,0.)+max(j,0.)*n),1.);}";
            F.oa("s106", {
              name: "_",
              h: A,
              i: "u150 u151 u153 u152 u154 u136 u4".split(" "),
              precision: "highp",
            });
            F.oa("s107", {
              name: "_",
              h: p,
              i: "u155 u156 u157 u158 u159 u160".split(" "),
              precision: "highp",
            });
          },
          qg: function (H, C, w, E, k, g, G) {
            F.N("u151", C, w);
            F.Qd("u153", E ? 1 : 0);
            F.N("u152", k, k / g);
            F.cj("u4", G);
            H.g(0);
            Y.l(!1, !1);
          },
          Jj: function (H) {
            b.viewport(0, 0, a.ta, a.ta / 2);
            F.set("s107");
            H.g(0);
            Y.l(!1, !1);
          },
          Nl: function () {
            return c.Jb;
          },
          uk: function (H) {
            y.m({ width: a.ta });
            y.xj(H, !1, 1);
            d = !0;
          },
          tk: function () {
            (e && c.screen.Ol() === a.Yb) ||
              ((e = !1),
              (c.screen = Z.instance({
                url: a.Yb,
                isFloat: !1,
                R: function () {
                  e = !0;
                },
              })));
          },
          hg: function (H) {
            Object.assign(a, H);
          },
          xj: function (H, C, w) {
            var E = a.ta;
            va.fa();
            c.kd.M();
            F.set("s0");
            c.Jb.g(0);
            Y.l(!0, !0);
            c.Jb.o();
            F.set("s106");
            F.G("u154", a.yf);
            F.G("u136", a.sm);
            y.qg(H, Math.PI, 0, !0, 90 * u, H.L() / H.Y(), t);
            e &&
              (F.G("u136", a.cg),
              b.viewport(0, 0, E / 2, E / 2),
              y.qg(c.screen, 0, 0, !1, 2 * a.Md * u, 2 * a.bg, t),
              b.viewport(E / 2, 0, E / 2, E / 2),
              y.qg(c.screen, 2 * Math.PI, 0, !1, 2 * a.Md * u, 2 * a.bg, t));
            b.enable(b.BLEND);
            b.blendFunc(b.ONE, b.ONE);
            C && y.Jj(C);
            F.set("s0");
            b.blendColor(0, 0, 0, 1 - w);
            b.blendFunc(b.CONSTANT_ALPHA, b.ONE_MINUS_CONSTANT_ALPHA);
            c.kd.g(0);
            Y.l(!1, !1);
            b.disable(b.BLEND);
            l.Yi(c.Jb);
          },
          v: function () {
            Object.assign(c, { Jb: null, kd: null, screen: null });
            d = e = !1;
            n = -1;
            l = null;
          },
        };
      return y;
    })();
    ta.ib = (function () {
      var a = !1,
        c = !0,
        e = !1,
        d = !1,
        n = {
          Gc: function () {
            da.Z() &&
              (F.oa("s108", {
                name: "_",
                s: "attribute vec3 a0;uniform sampler2D u39;uniform vec2 u40;uniform vec3 u138;const float l=1.,m=0.,n=0.,E=1.;const vec2 e=vec2(1.,1.);const vec3 o=vec3(1.,1.,1.);const vec2 F=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,p);vec2 f=u81*e;vec3 c=u81*o;vec2 t=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,q).rgb+vec3(u75,0.,0.),u78,c);float u=mix(texture2D(u39,r).r,0.,u81);a.z+=u;mat3 v=s(a);vec3 w=mix(u138,u79,c);float x=mix(l,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 y=mat2(h,i,-i,h);b.xy=y*b.xy;float z=mix(u77,1.,u81);vec2 j=u76/t;vec3 k=a0;float A=max(0.,-a0.z-m)*n;k.x+=A*sign(a0.x)*(1.-u81);vec3 B=v*(k+w)*x+b;vec2 C=j*z;vec3 D=vec3(g*C,-j)+B*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(D,1.));}",
                h: "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,1.,1.),gl_FragData[2]=vec4(1.,0.,0.,0.),gl_FragData[3]=vec4(0.,.5,1.,0.);}",
                i: ["u39", "u40", "u74", "u138"].concat(F.af(), F.bf()),
                I: ["a0"],
                P: [3],
                ca: !0,
              }),
              (a = !0));
          },
          m: function (l) {
            a &&
              F.j(
                "s108",
                [
                  { type: "1i", name: "u39", value: 1 },
                  { type: "3f", name: "u74", value: l.Ca },
                  { type: "1f", name: "u75", value: 0 },
                  { type: "1f", name: "u83", value: 1 },
                ].concat(l.Bg)
              );
          },
          $a: function (l) {
            d = l;
            e && n.Mh();
          },
          Za: function (l) {
            e = l;
            d && n.Mh();
          },
          Mh: function () {
            da.Z() &&
              (F.j("s108", [
                {
                  type: "3f",
                  name: "u138",
                  value: [e[0] * d, e[1] * d, e[2] * d],
                },
              ]),
              F.H());
          },
          Yl: function (l) {
            for (
              var A = l.width / 2,
                p = l.height / 2,
                u = l.depth,
                t = l.hl,
                y = l.height / 4,
                H = l.Kk,
                C = 2 * H + 4,
                w = [],
                E = [],
                k = -A + l.Qa,
                g = -t - l.Qa,
                G = A - l.Qa,
                I = -t - l.Qa,
                h = 0;
              h < C;
              ++h
            ) {
              var q = 0,
                f = 0;
              0 === h
                ? ((q = -A), (f = -t - u))
                : 1 <= h && h <= 1 + H
                ? ((f = (((h - 1) / H) * Math.PI) / 2),
                  (q = k - Math.cos(f) * l.Qa),
                  (f = g + Math.sin(f) * l.Qa))
                : h >= 2 + H && h <= 2 + 2 * H
                ? ((f = (((h - 2 - H) / H) * Math.PI) / 2),
                  (q = G + Math.sin(f) * l.Qa),
                  (f = I + Math.cos(f) * l.Qa))
                : h === C - 1 && ((q = A), (f = -t - u));
              w.push(q, p + y, f, q, -p + y, f);
              0 !== h &&
                E.push(
                  2 * h,
                  2 * h - 2,
                  2 * h - 1,
                  2 * h,
                  2 * h - 1,
                  2 * h + 1
                );
            }
            return n.instance({ ha: w, U: E });
          },
          toggle: function (l) {
            c = l;
          },
          instance: function (l) {
            var A = Y.instance({ ha: l.ha, U: l.U });
            return {
              V: function () {
                a && c && (F.set("s108"), A.bind(!0), A.V());
              },
            };
          },
        };
      return n;
    })();
    ta.la = (function () {
      var a = {
        ff: -87,
        Sl: [85, 95],
        Lh: [90, 90],
        Kh: [85, 70],
        $c: 24,
        Lk: 12,
        Mk: 2,
        Wf: [-80, 10],
        Jh: [40, 140],
        vd: [1, 8],
        Rl: 80,
        si: [-120, -10],
        Gm: 2,
        Sd: [0, -15],
        ie: 1024,
        eb: 256,
        Ed: 4,
        Wn: [6, 30],
        ri: 1.2,
      };
      a.Bi = a.Wf;
      var c = !1,
        e = !1,
        d = !1,
        n = null,
        l = null,
        A = null,
        p = null,
        u = null,
        t = null,
        y = !1,
        H = !1,
        C = null,
        w = null,
        E = null,
        k = null,
        g = 0.5,
        G = [{ type: "1f", name: "u162", value: 1 }],
        I = null,
        h = null,
        q = null,
        f = null,
        L = null,
        O = {
          Jl: function () {
            return {
              name: "_",
              s: "attribute vec3 a0,a2;attribute vec2 a1;varying vec2 vv0;varying float vv1;uniform sampler2D u39;uniform vec2 u40;uniform float u139;uniform vec3 u138;const float o=0.,p=0.;const vec2 e=vec2(1.,1.);const vec3 q=vec3(1.,1.,1.);const vec2 G=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,r);vec2 f=u81*e;vec3 c=u81*q;vec2 v=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,s).rgb+vec3(u75,0.,0.),u78,c);float w=mix(texture2D(u39,t).r,0.,u81);a.z+=w;mat3 h=u(a);vec3 x=mix(u138,u79,c);float y=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float i=cos(a.z),j=sin(a.z);mat2 z=mat2(i,j,-j,i);b.xy=z*b.xy;float A=mix(u77,1.,u81);vec2 k=u76/v;vec3 l=a0;float B=max(0.,-a0.z-o)*p;l.x+=B*sign(a0.x)*(1.-u81);vec3 C=h*(l+x)*y+b;vec2 D=k*A;vec3 E=vec3(g*D,-k)+C*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(E,1.)),vv0=a1,gl_Position*=vec4(-1.,1.,1.,1.);vec3 F=h*a2;vv1=-F.z;}",
              h: "uniform sampler2D u169,u155;uniform vec2 u85,u170;uniform float u171,u162;varying vec2 vv0;varying float vv1;void main(){vec2 b=u170*u171+u85*vv0;vec4 a=u162*texture2D(u169,b);a.r*=step(0.,vv0.y),gl_FragColor=vec4(0.,0.,0.,a.r*vv1);}",
              i: "u39 u169 u155 u40 u74 u171 u170 u139 u138 u85 u162"
                .split(" ")
                .concat(F.af())
                .concat(F.bf()),
              I: ["a0", "a2", "a1"],
              P: [3, 3, 2],
              precision: "lowp",
            };
          },
          Gc: function () {
            F.oa("s109", {
              name: "_",
              s: "attribute vec3 a0;uniform vec3 u138;uniform vec2 u163,u164;uniform float u139,u165,u166,u167;varying float vv0,vv1;void main(){vec3 a=(a0+u138)*u139;float b=atan(a.x,a.z-u165),d=2.*(a.y-u166)/(u167-u166)-1.;vv0=a0.y;float g=1.-u163.x*u163.x/(u163.y*u163.y),c=u163.x/sqrt(1.-g*pow(cos(b),2.));vec3 h=vec3(c*sin(b),a.y,c*cos(b)+u165);vv1=smoothstep(u164.x,u164.y,length(h-a)),gl_Position=vec4(b,d,0.,1.);}",
              h: "uniform float u168;uniform vec4 u7;varying float vv0,vv1;void main(){float a=u7.x+u7.y*smoothstep(-u7.w,-u7.z,vv0),b=min(a,1.)*u168;gl_FragColor=vec4(b,vv1,1.,1.);}",
              i: "u139 u138 u163 u164 u165 u166 u167 u7 u168".split(" "),
              I: ["a0"],
              P: [3],
              precision: "highp",
            });
            F.oa("s110", O.Jl());
            F.oa("s111", {
              name: "_",
              h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u1,vv0-3.*u8),c=texture2D(u1,vv0-2.*u8),d=texture2D(u1,vv0-u8),f=texture2D(u1,vv0+u8),g=texture2D(u1,vv0+2.*u8),h=texture2D(u1,vv0+3.*u8);float j=.031496*b.r+.110236*c.r+.220472*d.r+.275591*a.r+.220472*f.r+.110236*g.r+.031496*h.r;vec2 i=b.gb*b.b+c.gb*c.b+d.gb*d.b+a.gb*a.b+f.gb*f.b+g.gb*g.b+h.gb*h.b;i/=b.b+c.b+d.b+a.b+f.b+g.b+h.b,gl_FragColor=vec4(mix(j,a.r,1.-i.x),i,1);}",
              i: ["u1", "u8"],
              precision: "lowp",
            });
            c = !0;
          },
          m: function (v) {
            if (c) {
              if (void 0 === v.dc || !v.dc) return !1;
              if (e) O.Ti(v);
              else {
                p = Z.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: a.ie,
                  height: a.ie / 4,
                  F: 4,
                });
                var m = a.eb / 4,
                  r = {
                    isFloat: !1,
                    isPot: !1,
                    isMipmap: !1,
                    isLinear: !1,
                    width: a.eb,
                    height: m,
                    F: 4,
                  };
                A = Z.instance(r);
                t = Z.instance(r);
                u = Z.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: a.eb,
                  height: m * a.Ed,
                  F: 4,
                });
                m = 0.5 - 0.5 / v.ec[1];
                r = 0.5 + 0.5 / v.ec[1];
                for (
                  var M = a.Lk + 1,
                    J = [],
                    K = [],
                    P = new Float32Array(16 * a.$c),
                    ba = new Uint16Array(6 * (a.$c - 1)),
                    ja = 0,
                    U = 0,
                    x = 0,
                    z = 0;
                  z < a.$c;
                  ++z
                ) {
                  var D = (2 * z) / (a.$c - 1) - 1;
                  D = Math.sign(D) * Math.pow(Math.abs(D), a.Mk);
                  D = (Math.PI * (D + 1)) / 2 - Math.PI / 2;
                  var S = Math.sin(D),
                    ea = Math.cos(D),
                    X = Math.sin(D * a.ri),
                    aa = Math.cos(D * a.ri),
                    oa = D / (Math.PI * v.ec[0]) + 0.5,
                    Ma = a.Kh[0] * S,
                    Da = a.Bi[0],
                    ka = a.Kh[1] * ea + a.ff,
                    la = oa,
                    Ba = m,
                    V = a.Lh[0] * S,
                    ha = a.Bi[1],
                    ra = a.Lh[1] * ea + a.ff,
                    Ga = r,
                    Ia = 16 * z;
                  P[Ia] = V;
                  P[Ia + 1] = ha;
                  P[Ia + 2] = ra;
                  P[Ia + 3] = X;
                  P[Ia + 4] = 0;
                  P[Ia + 5] = aa;
                  P[Ia + 6] = oa;
                  P[Ia + 7] = Ga;
                  P[Ia + 8] = Ma;
                  P[Ia + 9] = Da;
                  P[Ia + 10] = ka;
                  P[Ia + 11] = X;
                  P[Ia + 12] = 0;
                  P[Ia + 13] = aa;
                  P[Ia + 14] = la;
                  P[Ia + 15] = Ba;
                  0 !== z &&
                    ((la = 2 * z),
                    (Ba = 6 * (z - 1)),
                    (ba[Ba] = la),
                    (ba[Ba + 1] = la - 1),
                    (ba[Ba + 2] = la - 2),
                    (ba[Ba + 3] = la),
                    (ba[Ba + 4] = la + 1),
                    (ba[Ba + 5] = la - 1));
                  Ba = Math.pow(
                    0.5 *
                      (1 +
                        Math.cos(
                          Math.min(
                            Math.max((Math.PI / a.Jh[0]) * Ma, -Math.PI),
                            Math.PI
                          )
                        )),
                    a.Gm
                  );
                  Da -= a.Rl * Ba;
                  la = a.Jh[1] * Ba;
                  Ma -= S * a.vd[0];
                  ka -= ea * a.vd[1];
                  V -= S * a.vd[0];
                  ra -= ea * a.vd[1];
                  S = 0.001 > Ba ? 2 : M;
                  for (ea = 0; ea < S; ++ea)
                    (Ba = ea / (S - 1)),
                      (oa = Da * (1 - Ba) + ha * Ba),
                      (Ga = a.si[0]),
                      (Ga = Math.min(
                        Math.max((oa - Ga) / (a.si[1] - Ga), 0),
                        1
                      )),
                      (Ga = Ga * Ga * (3 - 2 * Ga)),
                      J.push(
                        Ma * (1 - Ba) + V * Ba,
                        oa,
                        (ka +
                          la * Math.exp(400 * -Math.abs(D) * Math.pow(Ba, 4))) *
                          (1 - Ga) +
                          ra * Ga,
                        X,
                        0,
                        aa,
                        0,
                        0
                      );
                  D = 0 === z ? 0 : 2 < S && 2 < U ? S - 1 : 1;
                  for (X = 1; X <= D; ++X)
                    (aa = S > U ? S - 2 : 0),
                      K.push(
                        ja + X + aa,
                        ja + X - 1,
                        x + X - 1,
                        x + X - 1,
                        x + X + (S < U ? U - 2 : 0),
                        ja + X + aa
                      );
                  U = S;
                  x = ja;
                  ja += S;
                }
                f = Y.instance({
                  ha: new Float32Array(J),
                  U: new Uint16Array(K),
                });
                L = Y.instance({ ha: P, U: ba });
                O.Ti(v);
                F.j("s111", [{ type: "1i", name: "u1", value: 0 }]);
                e = !0;
              }
            }
          },
          Ti: function (v) {
            g = v.Rn;
            k = v.Td;
            I = [
              { type: "1i", name: "u39", value: 1 },
              { type: "1i", name: "u169", value: 0 },
              { type: "1i", name: "u155", value: 2 },
              {
                type: "3f",
                name: "u74",
                value: [v.Ca[0], v.Ca[1] - a.Sd[0], v.Ca[2] + a.Sd[1]],
              },
              { type: "1f", name: "u171", value: v.Sn },
              { type: "2f", name: "u85", value: [1, 1 / a.Ed] },
              { type: "2f", name: "u170", value: [0, 1 / a.Ed] },
              { type: "1f", name: "u162", value: 1 },
            ].concat(v.Bg, v.tj);
            F.j("s110", I);
          },
          $b: function (v) {
            n = v;
          },
          Zb: function (v) {
            h = v;
            h.Gb(O.tc);
          },
          bi: function () {
            return d && null !== h && null !== q;
          },
          tc: function () {
            if (!(d || (H && y)) || null === h || null === q) return !1;
            b.viewport(0, 0, a.ie, a.ie / 4);
            va.fa();
            p.o();
            b.clearColor(0, 0, 0, 0);
            b.clear(b.COLOR_BUFFER_BIT);
            F.j("s109", [
              { type: "1f", name: "u165", value: a.ff },
              { type: "1f", name: "u166", value: a.Wf[0] },
              { type: "1f", name: "u167", value: a.Wf[1] },
              {
                type: "3f",
                name: "u138",
                value: [C[0] + w[0], C[1] + w[1], C[2] + w[2]],
              },
              { type: "1f", name: "u168", value: g },
              { type: "2f", name: "u163", value: a.Sl },
              { type: "2f", name: "u164", value: a.Wn },
            ]);
            h.gl();
            F.set("s1");
            var v = a.eb / 4;
            b.viewport(0, 0, a.eb, v);
            A.o();
            p.g(0);
            p.nd();
            Y.l(!0, !0);
            for (var m = 0; m < a.Ed; ++m)
              F.set("s111"),
                0 !== m && b.viewport(0, 0, a.eb, v),
                t.o(),
                A.g(0),
                F.N("u8", 1 / a.eb, 0),
                Y.l(!1, !1),
                A.o(),
                t.g(0),
                F.N("u8", 0, 1 / v),
                Y.l(!1, !1),
                a.Nk && b.colorMask(0 === m, 1 === m, 2 === m, !0),
                F.set("s1"),
                u.o(),
                A.g(0),
                b.viewport(0, m * v, a.eb, v),
                Y.l(!1, !1),
                a.Nk && b.colorMask(!0, !0, !0, !0);
            return (d = !0);
          },
          V: function () {
            O.bi() &&
              (q.bind(!1, !1),
              l.o(),
              b.clearColor(0, 0, 0, 0),
              b.enable(b.DEPTH_TEST),
              b.depthMask(!0),
              b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT),
              F.set("s110"),
              n.g(1),
              u.g(0),
              f.bind(!0),
              f.V(),
              L.bind(!0),
              L.V(),
              b.disable(b.DEPTH_TEST),
              b.depthMask(!1));
          },
          add: function () {
            O.bi() &&
              (b.enable(b.BLEND),
              b.blendFunc(b.ONE, b.ONE_MINUS_SRC_ALPHA),
              l.g(0),
              Y.l(!1, !1),
              b.disable(b.BLEND));
          },
          eg: function (v, m) {
            q = va.instance({ width: v, height: m, yc: !0 });
            l = Z.instance({ width: v, height: m, isFloat: !1, isPot: !1 });
            O.tc();
          },
          Za: function (v, m, r) {
            v || ((v = C), (m = w), (r = E));
            F.j("s110", [
              {
                type: "3f",
                name: "u138",
                value: [
                  r[0] + k[0],
                  r[1] + k[1] - a.Sd[0],
                  r[2] + k[2] + a.Sd[1],
                ],
              },
            ]);
            C = v;
            w = m;
            E = r;
            H = !0;
            !d && y && O.tc();
            F.H();
          },
          $a: function (v, m) {
            F.j("s109", [{ type: "1f", name: "u139", value: v }]);
            F.j("s110", [{ type: "1f", name: "u139", value: m }]);
            y = !0;
            !d && H && O.tc();
            F.H();
          },
          ig: function (v) {
            F.j("s110", [{ type: "1f", name: "u75", value: v }]);
            F.H();
          },
          wb: function (v) {
            v && (h = v);
            O.tc();
          },
          jg: function (v, m) {
            G[0].value = 1 - v;
            F.j("s110", G);
            F.j("s110", m);
          },
          K: function () {},
          v: function () {
            d = e = c = !1;
            t = u = p = A = l = n = null;
          },
        };
      return O;
    })();
    ta.ra = (function () {
      var a = !1,
        c = null,
        e = 0,
        d = 0,
        n = 0,
        l = [{ type: "1f", name: "u162", value: 1 }],
        A = null,
        p = null,
        u = null,
        t = {
          Gc: function () {
            F.oa("s112", {
              name: "_",
              s: "attribute vec3 a0;uniform vec2 u172,u173;varying vec2 vv0;void main(){vec2 a=2.*(a0.xy-u173)/u172;gl_Position=vec4(a,0.,1.),vv0=a0.xy;}",
              h: "uniform vec2 u174;uniform float u175,u176,u177;varying vec2 vv0;void main(){vec2 b=vec2(sign(vv0.x)*.5*u175,u176),a=vv0-b,c=u177*a,d=(c-a)*u174;gl_FragColor=vec4(d,0.,1.);}",
              i: "u172 u173 u175 u176 u177 u174".split(" "),
              I: ["a0"],
              P: [3],
              precision: "highp",
            });
            F.oa("s113", {
              name: "_",
              s: "attribute vec3 a0;varying vec2 vv0,vv1;uniform sampler2D u39;uniform vec3 u138;uniform vec2 u40,u172,u173;uniform float u139;const float n=0.,o=0.;const vec2 e=vec2(1.,1.);const vec3 p=vec3(1.,1.,1.);const vec2 F=vec2(-1.,1.),q=vec2(.16,.5),r=vec2(.5,.5),s=vec2(.84,.5);uniform mat4 u72;uniform vec3 u74,u78,u79,u80;uniform float u73,u81,u82,u75,u76,u77,u83;mat3 t(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u39,q);vec2 f=u81*e;vec3 c=u81*p;vec2 u=mix(d.a*u40,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u39,r).rgb+vec3(u75,0.,0.),u78,c);float v=mix(texture2D(u39,s).r,0.,u81);a.z+=v;mat3 w=t(a);vec3 x=mix(u138,u79,c);float y=mix(u139,u82,u81);vec3 b=mix(u74,u80,c);b.x+=u73*sin(a.y);float h=cos(a.z),i=sin(a.z);mat2 z=mat2(h,i,-i,h);b.xy=z*b.xy;float A=mix(u77,1.,u81);vec2 j=u76/u;vec3 k=a0;float B=max(0.,-a0.z-n)*o;k.x+=B*sign(a0.x)*(1.-u81);vec3 C=w*(k+x)*y+b;vec2 D=j*A;vec3 E=vec3(g*D,-j)+C*vec3(1.,-1.,-1.);gl_Position=u72*(vec4(u83*e,e)*vec4(E,1.)),gl_Position*=vec4(-1.,1.,1.,1.),vv0=vec2(.5,.5)+(a0.xy-u173)/u172,vv1=vec2(.5,.5)+.5*gl_Position.xy/gl_Position.w;}",
              h: "uniform sampler2D u178,u179;uniform float u162;varying vec2 vv0,vv1;void main(){vec2 a=u162*texture2D(u178,vv0).rg;gl_FragColor=texture2D(u179,a+vv1);}",
              i: "u162 u39 u178 u179 u172 u173 u40 u74 u139 u138"
                .split(" ")
                .concat(F.af(), F.bf()),
              I: ["a0"],
              P: [3],
              precision: "lowp",
            });
            a = !0;
          },
          m: function (y) {
            if (a) {
              if (void 0 === y.dc || !y.ad) return !1;
              p = Z.instance({
                isFloat: !0,
                isPot: !1,
                isMipmap: !1,
                isLinear: !1,
                width: 256,
                height: 128,
                F: 4,
              });
              u = va.instance({ width: 256, height: 128 });
              F.j(
                "s113",
                [
                  { type: "1i", name: "u39", value: 1 },
                  { type: "1i", name: "u178", value: 2 },
                  { type: "1i", name: "u179", value: 0 },
                  { type: "3f", name: "u74", value: y.Ca },
                  { type: "1f", name: "u162", value: 1 },
                ].concat(y.tj, y.Bg)
              );
              d = y.Ie;
              n = y.He;
              e = y.Je;
            }
          },
          $b: function (y) {
            c = y;
          },
          Zb: function (y) {
            A = y;
            A.Gb(t.De);
          },
          De: function () {
            b.viewport(0, 0, 256, 128);
            u.o();
            p.o();
            var y = A.Kl(),
              H = A.Ll(),
              C = [
                { type: "2f", name: "u172", value: [y, H] },
                { type: "2f", name: "u173", value: [A.rl(), A.sl()] },
              ];
            F.j(
              "s112",
              C.concat([
                { type: "1f", name: "u175", value: d },
                { type: "1f", name: "u176", value: n },
                { type: "1f", name: "u177", value: e },
                { type: "2f", name: "u174", value: [1 / y, -1 / H] },
              ])
            );
            A.hh();
            F.j("s113", C);
          },
          V: function () {
            F.set("s113");
            c.g(1);
            p.g(2);
            A.hh();
          },
          Za: function (y) {
            F.j("s113", [{ type: "3f", name: "u138", value: y }]);
            F.H();
          },
          $a: function (y) {
            F.j("s113", [{ type: "1f", name: "u139", value: y }]);
            F.H();
          },
          ig: function (y) {
            F.j("s113", [{ type: "1f", name: "u75", value: y }]);
            F.H();
          },
          Qn: function (y) {
            e = y;
            t.De();
            F.H();
            sa.animate(Date.now());
          },
          wb: function (y) {
            y && (A = y);
            t.De();
          },
          jg: function (y, H) {
            l.u162 = 1 - y;
            F.j("s113", l);
            F.j("s113", H);
          },
          K: function () {},
        };
      return t;
    })();
    ta.lc = (function () {
      var a = [0, -0.5],
        c = !1,
        e = !1,
        d = null,
        n = null,
        l = null,
        A = null,
        p = null,
        u = -1,
        t = -1;
      return {
        Gc: function () {
          F.oa("s114", {
            name: "_",
            s: "attribute vec2 a0;uniform sampler2D u39;uniform vec2 u40,u5;uniform float u4;varying vec2 vv0;const vec2 f=vec2(1.,1.);void main(){vec4 a=texture2D(u39,vec2(.25,.5));vec2 b=a.a*u40,c=2.*a.gb-f,d=u5+a0*u4;gl_Position=vec4(c+b*d,0.,1.),vv0=vec2(.5,.5)+.5*a0;}",
            h: "uniform sampler2D u180;varying vec2 vv0;void main(){gl_FragColor=texture2D(u180,vv0);}",
            i: ["u39", "u180", "u40", "u5", "u4"],
            precision: "lowp",
          });
          F.oa("s115", {
            name: "_",
            h: "uniform sampler2D u2,u181,u182;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){float a=texture2D(u2,vv0).r;vec3 b=texture2D(u182,vv0).rgb,c=texture2D(u181,vv0).rgb;gl_FragColor=vec4(mix(b,c,a*f),1.);}",
            i: ["u2", "u182", "u181"],
            precision: "lowp",
          });
          c = !0;
        },
        m: function (y) {
          c &&
            ((p = Z.instance({
              isFloat: !1,
              isPot: !0,
              url: y.ve,
              R: function () {
                e = !0;
              },
            })),
            F.j("s114", [
              { type: "1i", name: "u39", value: 1 },
              { type: "1i", name: "u180", value: 0 },
              { type: "2f", name: "u40", value: y.Cj },
              { type: "2f", name: "u5", value: a },
              { type: "1f", name: "u4", value: 3.8 },
            ]),
            F.j("s115", [
              { type: "1i", name: "u181", value: 0 },
              { type: "1i", name: "u2", value: 1 },
              { type: "1i", name: "u182", value: 2 },
            ]));
        },
        $b: function (y) {
          n = y;
        },
        eg: function (y, H) {
          var C = {
            isFloat: !1,
            isPot: !1,
            isMipmap: !1,
            isLinear: !1,
            width: y,
            height: H,
            F: 4,
          };
          u = 2 / y;
          t = 2 / H;
          l = Z.instance(C);
          A = Z.instance(C);
          d = va.instance({ width: y, height: H });
        },
        V: function (y, H) {
          if (e) {
            d.bind(!1, !0);
            F.set("s77");
            for (var C = 0; 2 > C; ++C) {
              F.N("u8", u, 0);
              l.o();
              0 !== C && A.g(0);
              var w = 0 === C && !T.da;
              Y.l(w, w);
              F.N("u8", 0, t);
              A.o();
              l.g(0);
              Y.l(!1, !1);
            }
            F.set("s114");
            n.g(1);
            p.g(0);
            l.o();
            b.clearColor(1, 0, 0, 1);
            b.clear(b.COLOR_BUFFER_BIT);
            Y.l(!1, !1);
            F.set("s115");
            H.o();
            A.g(0);
            l.g(1);
            y.g(2);
            Y.l(!1, !1);
          }
        },
        K: function () {},
      };
    })();
    var Cc = (function () {
      var a = {
        instance: function (c) {
          var e = c.mi,
            d = c.li,
            n = c.Ge,
            l = c.background ? c.background : Z.Gh(),
            A = c.Va,
            p = { scale: 1, offsetX: 0, offsetY: 0 },
            u = null;
          c.Hf && ((p.scale = c.Hf.scale), (p.offsetY = c.Hf.offsetY));
          return {
            Ch: function () {
              return A;
            },
            vh: function () {
              return l;
            },
            set: function () {
              u = cb.Bl();
              cb.Zi(p);
              cb.ae();
              cb.be();
              sa.Si(n, l, !1, !1);
            },
            H: function () {
              cb.Zi(u);
            },
            Hc: function () {
              return {
                modelURL: e,
                materialsURLs: d,
                background: l.Hc(!1),
                Ge: n.Hc(!1),
                Va: A.Hc(!0),
              };
            },
            No: function (t) {
              l.g(t);
            },
          };
        },
        Nc: function (c, e, d) {
          function n() {
            if (3 === ++u && e) {
              var t = a.instance({
                mi: c.modelURL,
                li: c.materialsURLs,
                background: l,
                Ge: A,
                Va: p,
              });
              e(t);
            }
          }
          var l = null,
            A = null,
            p = null,
            u = 0;
          Z.Nc(c.background, function (t) {
            !t && d ? d() : ((l = t), n());
          });
          Z.Nc(c.dataState, function (t) {
            !t && d ? d() : ((A = t), n());
          });
          Z.Nc(c.light, function (t) {
            !t && d ? d() : ((p = t), n());
          });
        },
      };
      return a;
    })();
    return Ra || window.JEELIZVTO;
  })();
  (function (W, wa) {
    "function" === typeof define && define.amd
      ? define(wa)
      : "object" === typeof exports
      ? (module.exports = wa())
      : (W.ResizeSensor = wa());
  })("undefined" !== typeof window ? window : this, function () {
    function W(Fa, gb) {
      var Sa = Object.prototype.toString.call(Fa),
        Db = 0,
        Ca = Fa.length;
      if (
        "[object Array]" === Sa ||
        "[object NodeList]" === Sa ||
        "[object HTMLCollection]" === Sa ||
        "[object Object]" === Sa ||
        ("undefined" !== typeof jQuery && Fa instanceof jQuery) ||
        ("undefined" !== typeof Elements && Fa instanceof Elements)
      )
        for (; Db < Ca; Db++) gb(Fa[Db]);
      else gb(Fa);
    }
    if ("undefined" === typeof window) return null;
    var wa =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (Fa) {
          return window.setTimeout(Fa, 20);
        },
      La = function (Fa, gb) {
        function Sa() {
          var Ca = [];
          this.add = function (Eb) {
            Ca.push(Eb);
          };
          var $a, hb;
          this.call = function () {
            $a = 0;
            for (hb = Ca.length; $a < hb; $a++) Ca[$a].call();
          };
          this.remove = function (Eb) {
            var mb = [];
            $a = 0;
            for (hb = Ca.length; $a < hb; $a++)
              Ca[$a] !== Eb && mb.push(Ca[$a]);
            Ca = mb;
          };
          this.length = function () {
            return Ca.length;
          };
        }
        function Db(Ca, $a) {
          if (Ca)
            if (Ca.resizedAttached) Ca.resizedAttached.add($a);
            else {
              Ca.resizedAttached = new Sa();
              Ca.resizedAttached.add($a);
              Ca.resizeSensor = document.createElement("div");
              Ca.resizeSensor.className = "resize-sensor";
              Ca.resizeSensor.style.cssText =
                "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
              Ca.resizeSensor.innerHTML =
                '<div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s;"></div></div><div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div></div>';
              Ca.appendChild(Ca.resizeSensor);
              Ca.resizeSensor.offsetParent !== Ca &&
                (Ca.style.position = "relative");
              var hb = Ca.resizeSensor.childNodes[0],
                Eb = hb.childNodes[0],
                mb = Ca.resizeSensor.childNodes[1],
                Vb,
                Wb,
                Lb,
                Mb,
                Xb = Ca.offsetWidth,
                Yb = Ca.offsetHeight,
                jc = function () {
                  Eb.style.width = "100000px";
                  Eb.style.height = "100000px";
                  hb.scrollLeft = 1e5;
                  hb.scrollTop = 1e5;
                  mb.scrollLeft = 1e5;
                  mb.scrollTop = 1e5;
                };
              jc();
              var sc = function () {
                Wb = 0;
                Vb &&
                  ((Xb = Lb),
                  (Yb = Mb),
                  Ca.resizedAttached && Ca.resizedAttached.call());
              };
              $a = function () {
                Lb = Ca.offsetWidth;
                Mb = Ca.offsetHeight;
                (Vb = Lb != Xb || Mb != Yb) && !Wb && (Wb = wa(sc));
                jc();
              };
              var Hb = function (Zb, ac, $b) {
                Zb.attachEvent
                  ? Zb.attachEvent("on" + ac, $b)
                  : Zb.addEventListener(ac, $b);
              };
              Hb(hb, "scroll", $a);
              Hb(mb, "scroll", $a);
            }
        }
        W(Fa, function (Ca) {
          Db(Ca, gb);
        });
        this.detach = function (Ca) {
          La.detach(Fa, Ca);
        };
      };
    La.detach = function (Fa, gb) {
      W(Fa, function (Sa) {
        if (Sa) {
          if (
            Sa.resizedAttached &&
            "function" == typeof gb &&
            (Sa.resizedAttached.remove(gb), Sa.resizedAttached.length())
          )
            return;
          Sa.resizeSensor &&
            (Sa.contains(Sa.resizeSensor) && Sa.removeChild(Sa.resizeSensor),
            delete Sa.resizeSensor,
            delete Sa.resizedAttached);
        }
      });
    };
    return La;
  });
  var ic = {
      glassesDBURL: "https://glassesdbcached.jeeliz.com/sku/",
      appstaticURL: "https://appstatic.jeeliz.com/",
    },
    eb = { notLoaded: -1, init: 0, realtime: 2, loadingModel: 3, paused: 4 },
    Pa = { isRT: !0, sku: void 0, mode: eb.notLoaded },
    dc = -1,
    ec = -1,
    fc = -1,
    gc = -1,
    Pc = {
      cv: null,
      container: null,
      adjust: null,
      adjustNotice: null,
      adjustExit: null,
      loading: null,
      trackIframe: null,
    },
    qa = Object.assign({}, Pc),
    ld = {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: null,
      LOADING_END: null,
    },
    Bc = null,
    Kb = { enabled: !1, callback: null, interval: 1e3 },
    rc = { error: !1 },
    cc = null,
    Ub = null,
    pb = {
      start: function (W) {
        console.log("INFO in JeelizVTOWidget.js: start()");
        if (Pa.mode !== eb.notLoaded) pb.resume();
        else {
          pa();
          if (W.settings) for (var wa in W.settings) ic[wa] = W.settings[wa];
          W.NNCPath && Ra.set_NNCPath(W.NNCPath);
          W.faceDetectionCallback &&
            ((Kb.enabled = !0),
            (Kb.callback = W.faceDetectionCallback),
            (Kb.interval =
              "undefined" === typeof W.faceDetectionInterval
                ? 1e3
                : W.faceDetectionInterval));
          Bc = Object.assign({}, ld, W.callbacks || {});
          qa.container =
            W.placeHolder || document.getElementById("JeelizVTOWidget");
          if (!qa.container)
            throw Error(
              "Cannot find a <div> element with id=JeelizVTOWidget to append the VTO widget."
            );
          qa.cv = W.canvas || document.getElementById("JeelizVTOWidgetCanvas");
          qa.cv ||
            ((qa.cv = document.createElement("canvas")),
            qa.container.appendChild(qa.cv));
          qa.loading = document.getElementById("JeelizVTOWidgetLoading");
          W.onError && (rc.error = W.onError);
          Tb();
          if (!zb(qa.container)) return db("PLACEHOLDER_NULL_WIDTH"), !1;
          if (!ma(qa.container)) return db("PLACEHOLDER_NULL_HEIGHT"), !1;
          Gb();
          new ResizeSensor(qa.container, function (La) {
            Gb();
          });
          (W.searchImageMask ||
            W.searchImageColor ||
            W.searchImageRotationSpeed) &&
            Ra.set_loading(
              W.searchImageMask,
              W.searchImageColor,
              W.searchImageRotationSpeed
            );
          W.callbackReady && (Ub = W.callbackReady);
          Pa.mode = eb.init;
          wa =
            "undefined" === typeof W.assetsPath
              ? ic.appstaticURL + "jeefit/"
              : W.assetsPath;
          "undefined" !== typeof W.catalog && (cc = W.catalog);
          if (W.onWebcamGet) Ra.onWebcamGet(W.onWebcamGet);
          Ra.init(wa, na, Ka, qa.cv);
          Ra.onHalfLoad(pb.load.bind(pb, W.sku ? W.sku : null));
          return !0;
        }
      },
      destroy: function () {
        return Ra.destroy().then(function () {
          Pa.mode = eb.notLoaded;
          Pa.sku = void 0;
          Ub = cc = null;
          Object.assign(qa, Pc);
        });
      },
      pause: function (W) {
        if (!Pa.isRT) return Promise.reject();
        Pa.mode = eb.paused;
        var wa = Ra.switch_sleep(!0, W);
        return W ? wa : Promise.resolve(wa);
      },
      resume: function (W) {
        if (!Pa.isRT) return Promise.reject();
        Pa.mode = eb.realtime;
        var wa = Ra.switch_sleep(!1, W);
        return W ? wa : Promise.resolve(wa);
      },
      set_videoRotation: function (W) {
        Pa.isRT && Ra.set_videoRotation(W);
      },
      set_videoSizes: function (W, wa, La, Fa, gb, Sa) {
        Pa.isRT && Ra.set_videoSizes(W, wa, La, Fa, gb, Sa);
      },
      resize: function () {
        Gb();
      },
      set_scale: function (W) {
        Ra.set_scale(W);
      },
      capture_image: function (W, wa, La) {
        Ra && Ra.ready ? Ra.capture_image(W, wa, La, !1) : wa(!1);
      },
      toggle_loading: function (W) {
        W
          ? (ya(qa.loading), hc("LOADING_START"))
          : (Ja(qa.loading), hc("LOADING_END"));
      },
      load_modelStandalone: function (W, wa) {
        if (!Pa.isRT)
          throw Error("Loading standalone models is only available in RT mode");
        Pa.mode === eb.paused && pb.resume();
        Pa.mode = eb.loadingModel;
        var La = "undef";
        "string" === typeof W
          ? ((La = W),
            za(W)
              .then(function (Fa) {
                Ra.set_modelStandalone(Fa, wa, La);
              })
              .catch(Ua))
          : ((La = "RANDOM_SKU_" + Date.now().toString()),
            Ra.set_modelStandalone(W, wa, La));
        Pa.sku = La;
      },
      load: function (W, wa) {
        pb.toggle_loading(!0);
        Pa.isRT && pb.load_RT(W, wa);
      },
      load_RT: function (W, wa) {
        W === Pa.sku
          ? pb.toggle_loading(!1)
          : ((Pa.sku = W),
            (Pa.mode = eb.loadingModel),
            Pa.mode === eb.paused && pb.resume(),
            W
              ? cc && cc[W]
                ? Jb(W, cc[W], wa)
                : za(ic.glassesDBURL + W)
                    .then(function (La) {
                      if (La.error) return Ua();
                      Jb(W, La.intrinsic, wa);
                    })
                    .catch(Ua)
              : ((Pa.mode = eb.realtime),
                pb.toggle_loading(!1),
                Ra.start_rendering(),
                wa && wa()));
      },
      enter_adjustMode: lb,
      exit_adjustMode: ub,
    };
  return pb;
})();
window.JEELIZVTO = JEELIZVTO;
window.JEELIZVTOWIDGET = {
  VERSION: "2.2.8",
  start: JeelizVTOWidget.start,
  pause: JeelizVTOWidget.pause,
  resume: JeelizVTOWidget.resume,
  load: JeelizVTOWidget.load,
  load_modelStandalone: JeelizVTOWidget.load_modelStandalone,
  capture_image: JeelizVTOWidget.capture_image,
  set_videoRotation: JeelizVTOWidget.set_videoRotation,
  resize: JeelizVTOWidget.resize,
  set_scale: JeelizVTOWidget.set_scale,
  set_videoSizes: JeelizVTOWidget.set_videoSizes,
  destroy: JeelizVTOWidget.destroy,
  enter_adjustMode: JeelizVTOWidget.enter_adjustMode,
  exit_adjustMode: JeelizVTOWidget.exit_adjustMode,
};
