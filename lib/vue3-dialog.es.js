import { unref as O, getCurrentScope as H, onScopeDispose as R, ref as I, watch as W, inject as $, computed as y, defineComponent as x, openBlock as w, createElementBlock as b, normalizeStyle as E, createElementVNode as g, toDisplayString as F, renderSlot as Q, pushScopeId as U, popScopeId as V, reactive as z, provide as G, toRaw as K, createVNode as C, Fragment as P, renderList as q, createBlock as J, resolveDynamicComponent as Z } from "vue";
var S;
const X = typeof window < "u", ee = (e) => typeof e == "string", te = () => {
};
X && ((S = window?.navigator) != null && S.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Y(e) {
  return typeof e == "function" ? e() : O(e);
}
function oe(e) {
  return e;
}
function ne(e) {
  return H() ? (R(e), !0) : !1;
}
function se(e) {
  var o;
  const t = Y(e);
  return (o = t?.$el) != null ? o : t;
}
const A = X ? window : void 0;
function _(...e) {
  let o, t, u, r;
  if (ee(e[0]) || Array.isArray(e[0]) ? ([t, u, r] = e, o = A) : [o, t, u, r] = e, !o)
    return te;
  Array.isArray(t) || (t = [t]), Array.isArray(u) || (u = [u]);
  const a = [], c = () => {
    a.forEach((i) => i()), a.length = 0;
  }, p = (i, d, f, v) => (i.addEventListener(d, f, v), () => i.removeEventListener(d, f, v)), s = W(() => [se(o), Y(r)], ([i, d]) => {
    c(), i && a.push(...t.flatMap((f) => u.map((v) => p(i, f, v, d))));
  }, { immediate: !0, flush: "post" }), n = () => {
    s(), c();
  };
  return ne(n), n;
}
const N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, k = "__vueuse_ssr_handlers__";
N[k] = N[k] || {};
function ie(e = {}) {
  const {
    type: o = "page",
    touch: t = !0,
    resetOnTouchEnds: u = !1,
    initialValue: r = { x: 0, y: 0 },
    window: a = A,
    eventFilter: c
  } = e, p = I(r.x), s = I(r.y), n = I(null), i = (l) => {
    o === "page" ? (p.value = l.pageX, s.value = l.pageY) : o === "client" ? (p.value = l.clientX, s.value = l.clientY) : o === "movement" && (p.value = l.movementX, s.value = l.movementY), n.value = "mouse";
  }, d = () => {
    p.value = r.x, s.value = r.y;
  }, f = (l) => {
    if (l.touches.length > 0) {
      const m = l.touches[0];
      o === "page" ? (p.value = m.pageX, s.value = m.pageY) : o === "client" && (p.value = m.clientX, s.value = m.clientY), n.value = "touch";
    }
  }, v = (l) => c === void 0 ? i(l) : c(() => i(l), {}), h = (l) => c === void 0 ? f(l) : c(() => f(l), {});
  return a && (_(a, "mousemove", v, { passive: !0 }), _(a, "dragover", v, { passive: !0 }), t && o !== "movement" && (_(a, "touchstart", h, { passive: !0 }), _(a, "touchmove", h, { passive: !0 }), u && _(a, "touchend", d, { passive: !0 }))), {
    x: p,
    y: s,
    sourceType: n
  };
}
var L;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(L || (L = {}));
var re = Object.defineProperty, T = Object.getOwnPropertySymbols, ae = Object.prototype.hasOwnProperty, le = Object.prototype.propertyIsEnumerable, j = (e, o, t) => o in e ? re(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t, ue = (e, o) => {
  for (var t in o || (o = {}))
    ae.call(o, t) && j(e, t, o[t]);
  if (T)
    for (var t of T(o))
      le.call(o, t) && j(e, t, o[t]);
  return e;
};
const ce = {
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
ue({
  linear: oe
}, ce);
const D = Symbol("DialogToken");
function be() {
  const {
    x: e,
    y: o
  } = ie(), {
    dialogs: t,
    createDialog: u,
    disposeDialog: r,
    getDialogId: a
  } = $(D), c = y(() => t && a ? t[a()] : null);
  function p(n, i) {
    return u(n, {
      ...i,
      pointerX: e.value,
      pointerY: o.value
    }), c?.value?.promise;
  }
  function s(n) {
    n ? c?.value?.resolve(n) : c?.value?.reject("取消"), r();
  }
  return {
    open: p,
    close: s
  };
}
const de = (e) => (U("data-v-98b78947"), e = e(), V(), e), pe = ["id"], fe = { class: "dialog-header" }, ve = { class: "title" }, ge = /* @__PURE__ */ de(() => /* @__PURE__ */ g("svg", {
  t: "1679295681396",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3779",
  width: "26",
  height: "26"
}, [
  /* @__PURE__ */ g("path", {
    d: "M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z",
    "p-id": "3780"
  })
], -1)), me = [
  ge
], _e = { class: "dialog-body" }, ye = /* @__PURE__ */ x({
  __name: "DialogContainer",
  props: {
    modalId: {
      type: String
    },
    title: {
      type: String,
      default: "dialog"
    },
    width: {
      type: Number,
      default: 600
    },
    pointerX: {
      type: Number
    },
    pointerY: {
      type: Number
    }
  },
  setup(e) {
    const o = e, { dialogs: t, createDialog: u, disposeDialog: r, getDialogId: a } = $(D), c = y(() => {
      const d = (document.documentElement.clientWidth - o.width) / 2, f = o.pointerX ? o.pointerX - d + "px" : "0px", v = o.pointerY ? o.pointerY - 100 + "px" : "0px";
      return {
        width: `${o.width}px`,
        marginLeft: `-${o.width / 2}px`,
        transform: `scale(${s.value ? "1" : "0"})`,
        transformOrigin: `${f} ${v} 0px`
      };
    }), p = y(() => t[a()]), s = y(() => t[a()]?.visible);
    function n(d) {
      d.target.className === "dialog-overlay" && i();
    }
    function i() {
      p.value.reject("取消"), r();
    }
    return (d, f) => (w(), b("div", {
      class: "dialog-overlay",
      id: e.modalId,
      style: E({ opacity: O(s) ? "1" : "0" }),
      onClick: n
    }, [
      g("div", {
        role: "dialog",
        tabindex: "-1",
        class: "dialog",
        style: E(O(c))
      }, [
        g("div", fe, [
          g("p", ve, F(e.title), 1),
          g("i", {
            class: "close-icon",
            onClick: i
          }, me)
        ]),
        g("div", _e, [
          Q(d.$slots, "default", {}, void 0, !0)
        ])
      ], 4)
    ], 12, pe));
  }
});
const he = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [u, r] of o)
    t[u] = r;
  return t;
}, we = /* @__PURE__ */ he(ye, [["__scopeId", "data-v-98b78947"]]);
function Oe() {
  let e = 0;
  const o = () => `__modal__${e++}`, t = z({});
  function u(s, n) {
    let i, d;
    const f = o(), v = new Promise((M, B) => {
      i = M, d = B;
    }), {
      props: h,
      ...l
    } = n, m = c(s, l, h);
    t[f] = {
      component: m,
      config: n,
      visible: !1,
      promise: v,
      reject: d,
      resolve: i
    }, setTimeout(() => {
      t[f].visible = !0;
    }, 100);
  }
  function r() {
    const s = a(), n = t[s];
    n && (n.visible = !1, setTimeout(() => {
      delete t[s];
    }, 300));
  }
  function a() {
    const s = Object.keys(t).filter((n) => !!t[n]);
    return s.length > 0 ? s[0] : "";
  }
  function c(s, n, i) {
    return /* @__PURE__ */ x({
      render() {
        return C(we, n, {
          default: () => [C(s, i, null)]
        });
      }
    });
  }
  return G(D, {
    dialogs: t,
    createDialog: u,
    disposeDialog: r,
    getDialogId: a
  }), {
    dialogList: y(() => Object.keys(t).filter((n) => !!t[n]).map((n) => ({
      id: n,
      ...t[n],
      component: K(t[n].component)
    })))
  };
}
const xe = /* @__PURE__ */ x({
  __name: "DialogProvider",
  setup(e) {
    const { dialogList: o } = Oe();
    return (t, u) => (w(), b(P, null, [
      Q(t.$slots, "default"),
      (w(!0), b(P, null, q(O(o), (r) => (w(), J(Z(r.component), {
        key: r.id
      }))), 128))
    ], 64));
  }
});
export {
  xe as DialogProvider,
  be as useDialog
};
