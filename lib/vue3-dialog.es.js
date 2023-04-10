import './index.css';
import { unref as O, getCurrentScope as W, onScopeDispose as F, ref as I, watch as U, inject as $, computed as y, defineComponent as D, openBlock as w, createElementBlock as b, normalizeStyle as E, createElementVNode as v, toDisplayString as V, renderSlot as Q, pushScopeId as M, popScopeId as z, reactive as G, provide as K, toRaw as q, nextTick as J, createVNode as C, Fragment as P, renderList as Z, createBlock as ee, resolveDynamicComponent as te } from "vue";
var k;
const X = typeof window < "u", oe = (e) => typeof e == "string", ne = () => {
};
X && ((k = window?.navigator) != null && k.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Y(e) {
  return typeof e == "function" ? e() : O(e);
}
function ie(e) {
  return e;
}
function se(e) {
  return W() ? (F(e), !0) : !1;
}
function re(e) {
  var t;
  const o = Y(e);
  return (t = o?.$el) != null ? t : o;
}
const A = X ? window : void 0;
function m(...e) {
  let t, o, i, r;
  if (oe(e[0]) || Array.isArray(e[0]) ? ([o, i, r] = e, t = A) : [t, o, i, r] = e, !t)
    return ne;
  Array.isArray(o) || (o = [o]), Array.isArray(i) || (i = [i]);
  const a = [], c = () => {
    a.forEach((n) => n()), a.length = 0;
  }, d = (n, l, f, g) => (n.addEventListener(l, f, g), () => n.removeEventListener(l, f, g)), p = U(() => [re(t), Y(r)], ([n, l]) => {
    c(), n && a.push(...o.flatMap((f) => i.map((g) => d(n, f, g, l))));
  }, { immediate: !0, flush: "post" }), s = () => {
    p(), c();
  };
  return se(s), s;
}
const S = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = "__vueuse_ssr_handlers__";
S[N] = S[N] || {};
function ae(e = {}) {
  const {
    type: t = "page",
    touch: o = !0,
    resetOnTouchEnds: i = !1,
    initialValue: r = { x: 0, y: 0 },
    window: a = A,
    eventFilter: c
  } = e, d = I(r.x), p = I(r.y), s = I(null), n = (u) => {
    t === "page" ? (d.value = u.pageX, p.value = u.pageY) : t === "client" ? (d.value = u.clientX, p.value = u.clientY) : t === "movement" && (d.value = u.movementX, p.value = u.movementY), s.value = "mouse";
  }, l = () => {
    d.value = r.x, p.value = r.y;
  }, f = (u) => {
    if (u.touches.length > 0) {
      const _ = u.touches[0];
      t === "page" ? (d.value = _.pageX, p.value = _.pageY) : t === "client" && (d.value = _.clientX, p.value = _.clientY), s.value = "touch";
    }
  }, g = (u) => c === void 0 ? n(u) : c(() => n(u), {}), h = (u) => c === void 0 ? f(u) : c(() => f(u), {});
  return a && (m(a, "mousemove", g, { passive: !0 }), m(a, "dragover", g, { passive: !0 }), o && t !== "movement" && (m(a, "touchstart", h, { passive: !0 }), m(a, "touchmove", h, { passive: !0 }), i && m(a, "touchend", l, { passive: !0 }))), {
    x: d,
    y: p,
    sourceType: s
  };
}
var T;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(T || (T = {}));
var le = Object.defineProperty, L = Object.getOwnPropertySymbols, ue = Object.prototype.hasOwnProperty, ce = Object.prototype.propertyIsEnumerable, j = (e, t, o) => t in e ? le(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, de = (e, t) => {
  for (var o in t || (t = {}))
    ue.call(t, o) && j(e, o, t[o]);
  if (L)
    for (var o of L(t))
      ce.call(t, o) && j(e, o, t[o]);
  return e;
};
const pe = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
de({
  linear: ie
}, pe);
const x = Symbol("DialogToken");
function De() {
  const {
    x: e,
    y: t
  } = ae(), {
    dialogs: o,
    createDialog: i,
    disposeDialog: r,
    getDialogId: a
  } = $(x), c = y(() => o && a ? o[a()] : null);
  function d(s, n) {
    return i(s, {
      ...n,
      pointerX: e.value,
      pointerY: t.value
    }), c?.value?.promise;
  }
  function p(s) {
    s ? c?.value?.resolve(s) : c?.value?.reject("取消"), r();
  }
  return {
    open: d,
    close: p
  };
}
const fe = (e) => (M("data-v-26c39cca"), e = e(), z(), e), ge = { class: "dialog-header" }, ve = { class: "title" }, _e = /* @__PURE__ */ fe(() => /* @__PURE__ */ v("svg", {
  t: "1679295681396",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3779",
  width: "26",
  height: "26"
}, [
  /* @__PURE__ */ v("path", {
    d: "M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z",
    "p-id": "3780"
  })
], -1)), me = [
  _e
], ye = { class: "dialog-body" }, he = /* @__PURE__ */ D({
  __name: "DialogContainer",
  props: {
    title: {
      type: String,
      default: "dialog"
    },
    mask: {
      type: Boolean,
      default: !0
    },
    width: {
      type: Number,
      default: 640
    },
    pointerX: {
      type: Number
    },
    pointerY: {
      type: Number
    }
  },
  setup(e) {
    const t = e, { dialogs: o, createDialog: i, disposeDialog: r, getDialogId: a } = $(x), c = y(() => {
      const l = (document.documentElement.clientWidth - t.width) / 2, f = t.pointerX ? t.pointerX - l + "px" : "0px", g = t.pointerY ? t.pointerY - 100 + "px" : "0px";
      return {
        width: `${t.width}px`,
        marginLeft: `-${t.width / 2}px`,
        transform: `scale(${p.value ? "1" : "0"})`,
        transformOrigin: `${f} ${g} 0px`
      };
    }), d = y(() => o[a()]), p = y(() => o[a()]?.visible);
    function s(l) {
      l.target.className === "dialog-overlay" && n();
    }
    function n() {
      d.value.reject("取消"), r();
    }
    return (l, f) => (w(), b("div", {
      class: "dialog-overlay",
      style: E({ opacity: O(p) ? "1" : "0" }),
      onClick: s
    }, [
      v("div", {
        role: "dialog",
        tabindex: "-1",
        class: "dialog",
        style: E(O(c))
      }, [
        v("div", ge, [
          v("p", ve, V(e.title), 1),
          v("i", {
            class: "close-icon",
            onClick: n
          }, me)
        ]),
        v("div", ye, [
          Q(l.$slots, "default", {}, void 0, !0)
        ])
      ], 4)
    ], 4));
  }
});
const we = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, r] of t)
    o[i] = r;
  return o;
}, Oe = /* @__PURE__ */ we(he, [["__scopeId", "data-v-26c39cca"]]);
function Ie() {
  let e = 0, t = null;
  const o = () => `__dialog__${e++}`, i = G({});
  function r(s, n) {
    t && clearTimeout(t);
    let l, f;
    const g = o(), h = new Promise((H, R) => {
      l = H, f = R;
    }), {
      props: u,
      ..._
    } = n, B = d(s, _, u);
    i[g] = {
      component: B,
      config: n,
      visible: !1,
      promise: h,
      resolve: l,
      reject: f
    }, J(() => {
      i[g].visible = !0;
    });
  }
  function a() {
    const s = c(), n = i[s];
    n && (n.visible = !1, t = setTimeout(() => {
      delete i[s];
    }, 300));
  }
  function c() {
    const s = Object.keys(i).filter((n) => !!i[n]);
    return s.length > 0 ? s[0] : "";
  }
  function d(s, n, l) {
    return console.log(n), /* @__PURE__ */ D({
      render() {
        return C(Oe, n, {
          default: () => [C(s, l, null)]
        });
      }
    });
  }
  return K(x, {
    dialogs: i,
    createDialog: r,
    disposeDialog: a,
    getDialogId: c
  }), {
    dialogList: y(() => Object.keys(i).filter((n) => !!i[n]).map((n) => ({
      id: n,
      ...i[n],
      component: q(i[n].component)
    })))
  };
}
const xe = /* @__PURE__ */ D({
  __name: "DialogProvider",
  setup(e) {
    const { dialogList: t } = Ie();
    return (o, i) => (w(), b(P, null, [
      Q(o.$slots, "default"),
      (w(!0), b(P, null, Z(O(t), (r) => (w(), ee(te(r.component), {
        key: r.id,
        id: r.id
      }, null, 8, ["id"]))), 128))
    ], 64));
  }
});
export {
  xe as DialogProvider,
  De as useDialog
};
