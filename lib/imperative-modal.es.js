import './index.css';
import { unref as $, getCurrentScope as V, onScopeDispose as D, ref as I, watch as U, inject as A, computed as y, defineComponent as w, createVNode as m, resolveComponent as Z, openBlock as _, createElementBlock as C, normalizeStyle as S, createElementVNode as g, toDisplayString as L, renderSlot as Q, Fragment as b, createBlock as F, resolveDynamicComponent as X, withCtx as E, createTextVNode as P, createCommentVNode as G, toRaw as K, provide as q, renderList as J, mergeProps as k, createSlots as ee, nextTick as te } from "vue";
var N;
const Y = typeof window < "u", ne = (e) => typeof e == "string", oe = () => {
};
Y && ((N = window?.navigator) != null && N.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function j(e) {
  return typeof e == "function" ? e() : $(e);
}
function re(e) {
  return e;
}
function se(e) {
  return V() ? (D(e), !0) : !1;
}
function le(e) {
  var n;
  const t = j(e);
  return (n = t?.$el) != null ? n : t;
}
const H = Y ? window : void 0;
function x(...e) {
  let n, t, o, d;
  if (ne(e[0]) || Array.isArray(e[0]) ? ([t, o, d] = e, n = H) : [n, t, o, d] = e, !n)
    return oe;
  Array.isArray(t) || (t = [t]), Array.isArray(o) || (o = [o]);
  const p = [], c = () => {
    p.forEach((a) => a()), p.length = 0;
  }, i = (a, f, h, u) => (a.addEventListener(f, h, u), () => a.removeEventListener(f, h, u)), s = U(() => [le(n), j(d)], ([a, f]) => {
    c(), a && p.push(...t.flatMap((h) => o.map((u) => i(a, h, u, f))));
  }, { immediate: !0, flush: "post" }), v = () => {
    s(), c();
  };
  return se(v), v;
}
const T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, z = "__vueuse_ssr_handlers__";
T[z] = T[z] || {};
function ae(e = {}) {
  const {
    type: n = "page",
    touch: t = !0,
    resetOnTouchEnds: o = !1,
    initialValue: d = { x: 0, y: 0 },
    window: p = H,
    eventFilter: c
  } = e, i = I(d.x), s = I(d.y), v = I(null), a = (l) => {
    n === "page" ? (i.value = l.pageX, s.value = l.pageY) : n === "client" ? (i.value = l.clientX, s.value = l.clientY) : n === "movement" && (i.value = l.movementX, s.value = l.movementY), v.value = "mouse";
  }, f = () => {
    i.value = d.x, s.value = d.y;
  }, h = (l) => {
    if (l.touches.length > 0) {
      const O = l.touches[0];
      n === "page" ? (i.value = O.pageX, s.value = O.pageY) : n === "client" && (i.value = O.clientX, s.value = O.clientY), v.value = "touch";
    }
  }, u = (l) => c === void 0 ? a(l) : c(() => a(l), {}), r = (l) => c === void 0 ? h(l) : c(() => h(l), {});
  return p && (x(p, "mousemove", u, { passive: !0 }), x(p, "dragover", u, { passive: !0 }), t && n !== "movement" && (x(p, "touchstart", r, { passive: !0 }), x(p, "touchmove", r, { passive: !0 }), o && x(p, "touchend", f, { passive: !0 }))), {
    x: i,
    y: s,
    sourceType: v
  };
}
var B;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(B || (B = {}));
var ie = Object.defineProperty, W = Object.getOwnPropertySymbols, ue = Object.prototype.hasOwnProperty, ce = Object.prototype.propertyIsEnumerable, R = (e, n, t) => n in e ? ie(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, de = (e, n) => {
  for (var t in n || (n = {}))
    ue.call(n, t) && R(e, t, n[t]);
  if (W)
    for (var t of W(n))
      ce.call(n, t) && R(e, t, n[t]);
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
  linear: re
}, pe);
const M = Symbol("ModalContext");
function Le() {
  const { x: e, y: n } = ae(), t = A(M);
  if (!t)
    throw new Error("ProvideContext 未提供，请确保在应用中已提供相应的 ProvideContext！");
  const { modalReactiveList: o, createModal: d, destroyModal: p } = t, c = y(() => {
    const r = o.value.length - 1;
    return o.value[r];
  });
  function i(r, l) {
    return d({ ...l, type: r, pointerX: e.value, pointerY: n.value }), c.value?.promise;
  }
  const s = (r) => i("default", r), v = (r) => i("success", r), a = (r) => i("warning", r), f = (r) => i("error", r), h = (r) => i("info", r);
  function u(r) {
    r ? c?.value?.resolve(r) : c?.value?.reject("取消"), p();
  }
  return { create: s, info: h, success: v, warning: a, error: f, destroy: u };
}
function ve(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
const fe = /* @__PURE__ */ w({
  name: "Info",
  render() {
    return m("svg", {
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "14496",
      width: "26",
      height: "26"
    }, [m("path", {
      d: "M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z",
      fill: "#2196F3",
      "p-id": "14497"
    }, null), m("path", {
      d: "M469.333333 469.333333h85.333334v234.666667h-85.333334z",
      fill: "#FFFFFF",
      "p-id": "14498"
    }, null), m("path", {
      d: "M512 352m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z",
      fill: "#FFFFFF",
      "p-id": "14499"
    }, null)]);
  }
}), me = /* @__PURE__ */ w({
  name: "Success",
  render() {
    return m("svg", {
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "4256",
      width: "26",
      height: "26"
    }, [m("path", {
      d: "M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z",
      fill: "#07C160",
      "p-id": "4257"
    }, null), m("path", {
      d: "M466.7 679.8c-8.5 0-16.6-3.4-22.6-9.4l-181-181.1c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l158.4 158.5 249-249c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L489.3 670.4c-6 6-14.1 9.4-22.6 9.4z",
      fill: "#FFFFFF",
      "p-id": "4258"
    }, null)]);
  }
}), he = /* @__PURE__ */ w({
  name: "Warning",
  render() {
    return m("svg", {
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "17307",
      width: "26",
      height: "26"
    }, [m("path", {
      d: "M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m64 608H448v128h128V672z m32-448H416l64 400h64l64-400z",
      fill: "#E6960C",
      "p-id": "17308"
    }, null)]);
  }
}), ge = /* @__PURE__ */ w({
  name: "Error",
  render() {
    return m("svg", {
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "15486",
      width: "26",
      height: "26"
    }, [m("path", {
      d: "M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m218.624 672.256c15.872 15.872 15.872 41.984 0 57.856-8.192 8.192-18.432 11.776-29.184 11.776s-20.992-4.096-29.184-11.776L512 569.856l-160.256 160.256c-8.192 8.192-18.432 11.776-29.184 11.776s-20.992-4.096-29.184-11.776c-15.872-15.872-15.872-41.984 0-57.856L454.144 512 293.376 351.744c-15.872-15.872-15.872-41.984 0-57.856 15.872-15.872 41.984-15.872 57.856 0L512 454.144l160.256-160.256c15.872-15.872 41.984-15.872 57.856 0 15.872 15.872 15.872 41.984 0 57.856L569.856 512l160.768 160.256z",
      fill: "#CF3736",
      "p-id": "15487"
    }, null)]);
  }
}), ye = /* @__PURE__ */ w({
  name: "Close",
  render() {
    return m("svg", {
      class: "icon",
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "3779",
      width: "26",
      height: "26"
    }, [m("path", {
      d: "M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z",
      "p-id": "3780"
    }, null)]);
  }
}), _e = { class: "modal-header" }, we = { class: "title" }, xe = { class: "modal_body" }, Oe = { class: "confirm_text" }, Ie = { class: "close-icon" }, Ce = { class: "text" }, be = { class: "modal_footer" }, Fe = /* @__PURE__ */ w({
  __name: "modalWrap",
  props: {
    // 弹窗ID
    id: {
      type: String,
      required: !0
    },
    type: {
      type: String,
      default: "default"
    },
    title: {
      type: String,
      default: "标题"
    },
    content: {
      type: String,
      default: "默认内容"
    },
    mask: {
      type: Boolean,
      default: !0
    },
    width: {
      type: Number,
      default: 420
    },
    pointerX: {
      type: Number
    },
    pointerY: {
      type: Number
    }
  },
  setup(e) {
    const { modalReactiveList: n, destroyModal: t } = A(M), o = e, d = {
      info: fe,
      success: me,
      warning: he,
      error: ge
    }, p = y(() => (console.log(d[o.type]), d[o.type])), c = y(() => n.value.find((u) => u.id == o.id)), i = y(() => c.value?.visible), s = y(() => ({
      opacity: i.value ? "1" : "0",
      zIndex: c.value?.zIndex
    })), v = y(() => {
      const u = (document.documentElement.clientWidth - o.width) / 2, r = o.pointerX ? o.pointerX - u + "px" : "0px", l = o.pointerY ? o.pointerY - 100 + "px" : "0px";
      return {
        width: `${o.width}px`,
        marginLeft: `-${o.width / 2}px`,
        transform: `scale(${i.value ? "1" : "0"})`,
        transformOrigin: `${r} ${l} 0px`
      };
    });
    function a(u) {
      u.target.className === "modal_wrap" && h();
    }
    function f() {
      c.value.resolve("确认"), t();
    }
    function h() {
      c.value.reject("取消"), t();
    }
    return (u, r) => {
      const l = Z("el-button");
      return _(), C("div", {
        class: "modal_wrap",
        style: S(s.value),
        onClick: a
      }, [
        g("div", {
          role: "modal",
          tabindex: "-1",
          class: "modal_content",
          style: S(v.value)
        }, [
          g("div", _e, [
            g("p", we, L(e.title), 1),
            g("i", {
              class: "close-icon",
              onClick: h
            }, [
              m($(ye))
            ])
          ]),
          g("div", xe, [
            Q(u.$slots, "default", {}, void 0, !0)
          ]),
          e.type != "default" ? (_(), C(b, { key: 0 }, [
            g("div", Oe, [
              g("i", Ie, [
                (_(), F(X(p.value)))
              ]),
              g("span", Ce, L(e.content), 1)
            ]),
            g("div", be, [
              m(l, {
                type: "default",
                onClick: h
              }, {
                default: E(() => r[0] || (r[0] = [
                  P("取消")
                ])),
                _: 1
              }),
              m(l, {
                type: "primary",
                onClick: f
              }, {
                default: E(() => r[1] || (r[1] = [
                  P("确认")
                ])),
                _: 1
              })
            ])
          ], 64)) : G("", !0)
        ], 4)
      ], 4);
    };
  }
});
const Ee = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, d] of n)
    t[o] = d;
  return t;
}, Me = /* @__PURE__ */ Ee(Fe, [["__scopeId", "data-v-83d69dc2"]]), Pe = /* @__PURE__ */ w({
  __name: "modalProvider",
  setup(e) {
    let n = 999, t = null;
    const o = I([]), d = y(() => o.value.map((s) => {
      const { component: v, props: a, ...f } = s;
      return {
        id: f.id,
        options: f,
        props: a,
        component: K(v)
      };
    }));
    function p(s) {
      console.log(s), t && clearTimeout(t);
      const v = ve();
      let a, f;
      const h = new Promise((r, l) => {
        a = r, f = l;
      }), u = {
        ...s,
        id: v,
        visible: !1,
        zIndex: n++,
        promise: h,
        resolve: a,
        reject: f
      };
      o.value.push(u), console.log(o), te(() => {
        const r = o.value.findIndex((l) => l.id == v);
        o.value[r].visible = !0;
      });
    }
    function c() {
      const s = o.value.length - 1;
      s > -1 && (o.value[s].visible = !1, t = setTimeout(() => {
        i(s);
      }, 300));
    }
    function i(s) {
      o.value.splice(s, 1);
    }
    return q(M, { modalReactiveList: o, createModal: p, destroyModal: c }), (s, v) => (_(), C(b, null, [
      Q(s.$slots, "default"),
      (_(!0), C(b, null, J(d.value, (a) => (_(), F(Me, k({
        key: a.id,
        ref_for: !0
      }, a.options), ee({ _: 2 }, [
        a.options.type === "default" ? {
          name: "default",
          fn: E(() => [
            (_(), F(X(a.component), k({ ref_for: !0 }, a.props), null, 16))
          ]),
          key: "0"
        } : void 0
      ]), 1040))), 128))
    ], 64));
  }
});
export {
  Pe as ModalProvider,
  Le as useModal
};
