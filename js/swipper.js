(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === "childList")
        for (const l of r.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && i(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = t(n);
    fetch(n.href, r);
  }
})();
function fe(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function de(e = {}, s = {}) {
  const t = ["__proto__", "constructor", "prototype"];
  Object.keys(s)
    .filter((i) => t.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > "u"
        ? (e[i] = s[i])
        : fe(s[i]) &&
          fe(e[i]) &&
          Object.keys(s[i]).length > 0 &&
          de(e[i], s[i]);
    });
}
const Se = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function j() {
  const e = typeof document < "u" ? document : {};
  return de(e, Se), e;
}
const Ce = {
  document: Se,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  },
};
function F() {
  const e = typeof window < "u" ? window : {};
  return de(e, Ce), e;
}
function Ie(e = "") {
  return e
    .trim()
    .split(" ")
    .filter((s) => !!s.trim());
}
function Le(e) {
  const s = e;
  Object.keys(s).forEach((t) => {
    try {
      s[t] = null;
    } catch {}
    try {
      delete s[t];
    } catch {}
  });
}
function Te(e, s = 0) {
  return setTimeout(e, s);
}
function Q() {
  return Date.now();
}
function Oe(e) {
  const s = F();
  let t;
  return (
    s.getComputedStyle && (t = s.getComputedStyle(e, null)),
    !t && e.currentStyle && (t = e.currentStyle),
    t || (t = e.style),
    t
  );
}
function ze(e, s = "x") {
  const t = F();
  let i, n, r;
  const l = Oe(e);
  return (
    t.WebKitCSSMatrix
      ? ((n = l.transform || l.webkitTransform),
        n.split(",").length > 6 &&
          (n = n
            .split(", ")
            .map((o) => o.replace(",", "."))
            .join(", ")),
        (r = new t.WebKitCSSMatrix(n === "none" ? "" : n)))
      : ((r =
          l.MozTransform ||
          l.OTransform ||
          l.MsTransform ||
          l.msTransform ||
          l.transform ||
          l
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = r.toString().split(","))),
    s === "x" &&
      (t.WebKitCSSMatrix
        ? (n = r.m41)
        : i.length === 16
        ? (n = parseFloat(i[12]))
        : (n = parseFloat(i[4]))),
    s === "y" &&
      (t.WebKitCSSMatrix
        ? (n = r.m42)
        : i.length === 16
        ? (n = parseFloat(i[13]))
        : (n = parseFloat(i[5]))),
    n || 0
  );
}
function X(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function Ae(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function N(...e) {
  const s = Object(e[0]),
    t = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < e.length; i += 1) {
    const n = e[i];
    if (n != null && !Ae(n)) {
      const r = Object.keys(Object(n)).filter((l) => t.indexOf(l) < 0);
      for (let l = 0, o = r.length; l < o; l += 1) {
        const a = r[l],
          d = Object.getOwnPropertyDescriptor(n, a);
        d !== void 0 &&
          d.enumerable &&
          (X(s[a]) && X(n[a])
            ? n[a].__swiper__
              ? (s[a] = n[a])
              : N(s[a], n[a])
            : !X(s[a]) && X(n[a])
            ? ((s[a] = {}), n[a].__swiper__ ? (s[a] = n[a]) : N(s[a], n[a]))
            : (s[a] = n[a]));
      }
    }
  }
  return s;
}
function U(e, s, t) {
  e.style.setProperty(s, t);
}
function be({ swiper: e, targetPosition: s, side: t }) {
  const i = F(),
    n = -e.translate;
  let r = null,
    l;
  const o = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(e.cssModeFrameID);
  const a = s > n ? "next" : "prev",
    d = (f, p) => (a === "next" && f >= p) || (a === "prev" && f <= p),
    u = () => {
      (l = new Date().getTime()), r === null && (r = l);
      const f = Math.max(Math.min((l - r) / o, 1), 0),
        p = 0.5 - Math.cos(f * Math.PI) / 2;
      let c = n + p * (s - n);
      if ((d(c, s) && (c = s), e.wrapperEl.scrollTo({ [t]: c }), d(c, s))) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [t]: c });
          }),
          i.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = i.requestAnimationFrame(u);
    };
  u();
}
function H(e, s = "") {
  const t = F(),
    i = [...e.children];
  return (
    t.HTMLSlotElement &&
      e instanceof HTMLSlotElement &&
      i.push(...e.assignedElements()),
    s ? i.filter((n) => n.matches(s)) : i
  );
}
function ke(e, s) {
  const t = [s];
  for (; t.length > 0; ) {
    const i = t.shift();
    if (e === i) return !0;
    t.push(
      ...i.children,
      ...(i.shadowRoot ? i.shadowRoot.children : []),
      ...(i.assignedElements ? i.assignedElements() : [])
    );
  }
}
function Ge(e, s) {
  const t = F();
  let i = s.contains(e);
  return (
    !i &&
      t.HTMLSlotElement &&
      s instanceof HTMLSlotElement &&
      ((i = [...s.assignedElements()].includes(e)), i || (i = ke(e, s))),
    i
  );
}
function J(e) {
  try {
    console.warn(e);
    return;
  } catch {}
}
function le(e, s = []) {
  const t = document.createElement(e);
  return t.classList.add(...(Array.isArray(s) ? s : Ie(s))), t;
}
function Ve(e, s) {
  const t = [];
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling;
    s ? i.matches(s) && t.push(i) : t.push(i), (e = i);
  }
  return t;
}
function De(e, s) {
  const t = [];
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling;
    s ? i.matches(s) && t.push(i) : t.push(i), (e = i);
  }
  return t;
}
function W(e, s) {
  return F().getComputedStyle(e, null).getPropertyValue(s);
}
function ue(e) {
  let s = e,
    t;
  if (s) {
    for (t = 0; (s = s.previousSibling) !== null; )
      s.nodeType === 1 && (t += 1);
    return t;
  }
}
function _e(e, s) {
  const t = [];
  let i = e.parentElement;
  for (; i; ) s ? i.matches(s) && t.push(i) : t.push(i), (i = i.parentElement);
  return t;
}
function pe(e, s, t) {
  const i = F();
  return t
    ? e[s === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(s === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(s === "width" ? "margin-left" : "margin-bottom")
        )
    : e.offsetWidth;
}
let ee;
function Be() {
  const e = F(),
    s = j();
  return {
    smoothScroll:
      s.documentElement &&
      s.documentElement.style &&
      "scrollBehavior" in s.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && s instanceof e.DocumentTouch)
    ),
  };
}
function ye() {
  return ee || (ee = Be()), ee;
}
let te;
function Fe({ userAgent: e } = {}) {
  const s = ye(),
    t = F(),
    i = t.navigator.platform,
    n = e || t.navigator.userAgent,
    r = { ios: !1, android: !1 },
    l = t.screen.width,
    o = t.screen.height,
    a = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = n.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    f = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    p = i === "Win32";
  let c = i === "MacIntel";
  const m = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !d &&
      c &&
      s.touch &&
      m.indexOf(`${l}x${o}`) >= 0 &&
      ((d = n.match(/(Version)\/([\d.]+)/)),
      d || (d = [0, 1, "13_0_0"]),
      (c = !1)),
    a && !p && ((r.os = "android"), (r.android = !0)),
    (d || f || u) && ((r.os = "ios"), (r.ios = !0)),
    r
  );
}
function xe(e = {}) {
  return te || (te = Fe(e)), te;
}
let se;
function Ne() {
  const e = F(),
    s = xe();
  let t = !1;
  function i() {
    const o = e.navigator.userAgent.toLowerCase();
    return (
      o.indexOf("safari") >= 0 &&
      o.indexOf("chrome") < 0 &&
      o.indexOf("android") < 0
    );
  }
  if (i()) {
    const o = String(e.navigator.userAgent);
    if (o.includes("Version/")) {
      const [a, d] = o
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((u) => Number(u));
      t = a < 16 || (a === 16 && d < 2);
    }
  }
  const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
    r = i(),
    l = r || (n && s.ios);
  return {
    isSafari: t || r,
    needPerspectiveFix: t,
    need3dFix: l,
    isWebView: n,
  };
}
function Ee() {
  return se || (se = Ne()), se;
}
function $e({ swiper: e, on: s, emit: t }) {
  const i = F();
  let n = null,
    r = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (t("beforeResize"), t("resize"));
    },
    o = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((n = new ResizeObserver((u) => {
          r = i.requestAnimationFrame(() => {
            const { width: f, height: p } = e;
            let c = f,
              m = p;
            u.forEach(({ contentBoxSize: h, contentRect: C, target: g }) => {
              (g && g !== e.el) ||
                ((c = C ? C.width : (h[0] || h).inlineSize),
                (m = C ? C.height : (h[0] || h).blockSize));
            }),
              (c !== f || m !== p) && l();
          });
        })),
        n.observe(e.el));
    },
    a = () => {
      r && i.cancelAnimationFrame(r),
        n && n.unobserve && e.el && (n.unobserve(e.el), (n = null));
    },
    d = () => {
      !e || e.destroyed || !e.initialized || t("orientationchange");
    };
  s("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
      o();
      return;
    }
    i.addEventListener("resize", l), i.addEventListener("orientationchange", d);
  }),
    s("destroy", () => {
      a(),
        i.removeEventListener("resize", l),
        i.removeEventListener("orientationchange", d);
    });
}
function Re({ swiper: e, extendParams: s, on: t, emit: i }) {
  const n = [],
    r = F(),
    l = (d, u = {}) => {
      const f = r.MutationObserver || r.WebkitMutationObserver,
        p = new f((c) => {
          if (e.__preventObserver__) return;
          if (c.length === 1) {
            i("observerUpdate", c[0]);
            return;
          }
          const m = function () {
            i("observerUpdate", c[0]);
          };
          r.requestAnimationFrame
            ? r.requestAnimationFrame(m)
            : r.setTimeout(m, 0);
        });
      p.observe(d, {
        attributes: typeof u.attributes > "u" ? !0 : u.attributes,
        childList: e.isElement || (typeof u.childList > "u" ? !0 : u).childList,
        characterData: typeof u.characterData > "u" ? !0 : u.characterData,
      }),
        n.push(p);
    },
    o = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const d = _e(e.hostEl);
          for (let u = 0; u < d.length; u += 1) l(d[u]);
        }
        l(e.hostEl, { childList: e.params.observeSlideChildren }),
          l(e.wrapperEl, { attributes: !1 });
      }
    },
    a = () => {
      n.forEach((d) => {
        d.disconnect();
      }),
        n.splice(0, n.length);
    };
  s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    t("init", o),
    t("destroy", a);
}
var He = {
  on(e, s, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof s != "function") return i;
    const n = t ? "unshift" : "push";
    return (
      e.split(" ").forEach((r) => {
        i.eventsListeners[r] || (i.eventsListeners[r] = []),
          i.eventsListeners[r][n](s);
      }),
      i
    );
  },
  once(e, s, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof s != "function") return i;
    function n(...r) {
      i.off(e, n), n.__emitterProxy && delete n.__emitterProxy, s.apply(i, r);
    }
    return (n.__emitterProxy = s), i.on(e, n, t);
  },
  onAny(e, s) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof e != "function") return t;
    const i = s ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(e) < 0 && t.eventsAnyListeners[i](e), t;
  },
  offAny(e) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsAnyListeners) return s;
    const t = s.eventsAnyListeners.indexOf(e);
    return t >= 0 && s.eventsAnyListeners.splice(t, 1), s;
  },
  off(e, s) {
    const t = this;
    return (
      !t.eventsListeners ||
        t.destroyed ||
        !t.eventsListeners ||
        e.split(" ").forEach((i) => {
          typeof s > "u"
            ? (t.eventsListeners[i] = [])
            : t.eventsListeners[i] &&
              t.eventsListeners[i].forEach((n, r) => {
                (n === s || (n.__emitterProxy && n.__emitterProxy === s)) &&
                  t.eventsListeners[i].splice(r, 1);
              });
        }),
      t
    );
  },
  emit(...e) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsListeners) return s;
    let t, i, n;
    return (
      typeof e[0] == "string" || Array.isArray(e[0])
        ? ((t = e[0]), (i = e.slice(1, e.length)), (n = s))
        : ((t = e[0].events), (i = e[0].data), (n = e[0].context || s)),
      i.unshift(n),
      (Array.isArray(t) ? t : t.split(" ")).forEach((l) => {
        s.eventsAnyListeners &&
          s.eventsAnyListeners.length &&
          s.eventsAnyListeners.forEach((o) => {
            o.apply(n, [l, ...i]);
          }),
          s.eventsListeners &&
            s.eventsListeners[l] &&
            s.eventsListeners[l].forEach((o) => {
              o.apply(n, i);
            });
      }),
      s
    );
  },
};
function We() {
  const e = this;
  let s, t;
  const i = e.el;
  typeof e.params.width < "u" && e.params.width !== null
    ? (s = e.params.width)
    : (s = i.clientWidth),
    typeof e.params.height < "u" && e.params.height !== null
      ? (t = e.params.height)
      : (t = i.clientHeight),
    !((s === 0 && e.isHorizontal()) || (t === 0 && e.isVertical())) &&
      ((s =
        s -
        parseInt(W(i, "padding-left") || 0, 10) -
        parseInt(W(i, "padding-right") || 0, 10)),
      (t =
        t -
        parseInt(W(i, "padding-top") || 0, 10) -
        parseInt(W(i, "padding-bottom") || 0, 10)),
      Number.isNaN(s) && (s = 0),
      Number.isNaN(t) && (t = 0),
      Object.assign(e, {
        width: s,
        height: t,
        size: e.isHorizontal() ? s : t,
      }));
}
function je() {
  const e = this;
  function s(y, b) {
    return parseFloat(y.getPropertyValue(e.getDirectionLabel(b)) || 0);
  }
  const t = e.params,
    { wrapperEl: i, slidesEl: n, rtlTranslate: r, wrongRTL: l } = e,
    o = e.virtual && t.virtual.enabled,
    a = o ? e.virtual.slides.length : e.slides.length,
    d = H(n, `.${e.params.slideClass}, swiper-slide`),
    u = o ? e.virtual.slides.length : d.length;
  let f = [];
  const p = [],
    c = [];
  let m = t.slidesOffsetBefore;
  typeof m == "function" && (m = t.slidesOffsetBefore.call(e));
  let h = t.slidesOffsetAfter;
  typeof h == "function" && (h = t.slidesOffsetAfter.call(e));
  const C = e.snapGrid.length,
    g = e.slidesGrid.length,
    w = e.size - m - h;
  let v = t.spaceBetween,
    x = -m,
    S = 0,
    E = 0;
  if (typeof w > "u") return;
  typeof v == "string" && v.indexOf("%") >= 0
    ? (v = (parseFloat(v.replace("%", "")) / 100) * w)
    : typeof v == "string" && (v = parseFloat(v)),
    (e.virtualSize = -v - m - h),
    d.forEach((y) => {
      r ? (y.style.marginLeft = "") : (y.style.marginRight = ""),
        (y.style.marginBottom = ""),
        (y.style.marginTop = "");
    }),
    t.centeredSlides &&
      t.cssMode &&
      (U(i, "--swiper-centered-offset-before", ""),
      U(i, "--swiper-centered-offset-after", ""));
  const I = t.grid && t.grid.rows > 1 && e.grid;
  I ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
  let T;
  const k =
    t.slidesPerView === "auto" &&
    t.breakpoints &&
    Object.keys(t.breakpoints).filter(
      (y) => typeof t.breakpoints[y].slidesPerView < "u"
    ).length > 0;
  for (let y = 0; y < u; y += 1) {
    T = 0;
    const b = d[y];
    if (
      !(b && (I && e.grid.updateSlide(y, b, d), W(b, "display") === "none"))
    ) {
      if (o && t.slidesPerView === "auto")
        t.virtual.slidesPerViewAutoSlideSize &&
          (T = t.virtual.slidesPerViewAutoSlideSize),
          T &&
            b &&
            (t.roundLengths && (T = Math.floor(T)),
            (b.style[e.getDirectionLabel("width")] = `${T}px`));
      else if (t.slidesPerView === "auto") {
        k && (b.style[e.getDirectionLabel("width")] = "");
        const L = getComputedStyle(b),
          P = b.style.transform,
          B = b.style.webkitTransform;
        if (
          (P && (b.style.transform = "none"),
          B && (b.style.webkitTransform = "none"),
          t.roundLengths)
        )
          T = e.isHorizontal() ? pe(b, "width", !0) : pe(b, "height", !0);
        else {
          const _ = s(L, "width"),
            O = s(L, "padding-left"),
            V = s(L, "padding-right"),
            M = s(L, "margin-left"),
            A = s(L, "margin-right"),
            z = L.getPropertyValue("box-sizing");
          if (z && z === "border-box") T = _ + M + A;
          else {
            const { clientWidth: R, offsetWidth: D } = b;
            T = _ + O + V + M + A + (D - R);
          }
        }
        P && (b.style.transform = P),
          B && (b.style.webkitTransform = B),
          t.roundLengths && (T = Math.floor(T));
      } else
        (T = (w - (t.slidesPerView - 1) * v) / t.slidesPerView),
          t.roundLengths && (T = Math.floor(T)),
          b && (b.style[e.getDirectionLabel("width")] = `${T}px`);
      b && (b.swiperSlideSize = T),
        c.push(T),
        t.centeredSlides
          ? ((x = x + T / 2 + S / 2 + v),
            S === 0 && y !== 0 && (x = x - w / 2 - v),
            y === 0 && (x = x - w / 2 - v),
            Math.abs(x) < 1 / 1e3 && (x = 0),
            t.roundLengths && (x = Math.floor(x)),
            E % t.slidesPerGroup === 0 && f.push(x),
            p.push(x))
          : (t.roundLengths && (x = Math.floor(x)),
            (E - Math.min(e.params.slidesPerGroupSkip, E)) %
              e.params.slidesPerGroup ===
              0 && f.push(x),
            p.push(x),
            (x = x + T + v)),
        (e.virtualSize += T + v),
        (S = T),
        (E += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, w) + h),
    r &&
      l &&
      (t.effect === "slide" || t.effect === "coverflow") &&
      (i.style.width = `${e.virtualSize + v}px`),
    t.setWrapperSize &&
      (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + v}px`),
    I && e.grid.updateWrapperSize(T, f),
    !t.centeredSlides)
  ) {
    const y = [];
    for (let b = 0; b < f.length; b += 1) {
      let L = f[b];
      t.roundLengths && (L = Math.floor(L)),
        f[b] <= e.virtualSize - w && y.push(L);
    }
    (f = y),
      Math.floor(e.virtualSize - w) - Math.floor(f[f.length - 1]) > 1 &&
        f.push(e.virtualSize - w);
  }
  if (o && t.loop) {
    const y = c[0] + v;
    if (t.slidesPerGroup > 1) {
      const b = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup
        ),
        L = y * t.slidesPerGroup;
      for (let P = 0; P < b; P += 1) f.push(f[f.length - 1] + L);
    }
    for (let b = 0; b < e.virtual.slidesBefore + e.virtual.slidesAfter; b += 1)
      t.slidesPerGroup === 1 && f.push(f[f.length - 1] + y),
        p.push(p[p.length - 1] + y),
        (e.virtualSize += y);
  }
  if ((f.length === 0 && (f = [0]), v !== 0)) {
    const y =
      e.isHorizontal() && r ? "marginLeft" : e.getDirectionLabel("marginRight");
    d.filter((b, L) =>
      !t.cssMode || t.loop ? !0 : L !== d.length - 1
    ).forEach((b) => {
      b.style[y] = `${v}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let y = 0;
    c.forEach((L) => {
      y += L + (v || 0);
    }),
      (y -= v);
    const b = y > w ? y - w : 0;
    f = f.map((L) => (L <= 0 ? -m : L > b ? b + h : L));
  }
  if (t.centerInsufficientSlides) {
    let y = 0;
    c.forEach((L) => {
      y += L + (v || 0);
    }),
      (y -= v);
    const b = (m || 0) + (h || 0);
    if (y + b < w) {
      const L = (w - y - b) / 2;
      f.forEach((P, B) => {
        f[B] = P - L;
      }),
        p.forEach((P, B) => {
          p[B] = P + L;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: d,
      snapGrid: f,
      slidesGrid: p,
      slidesSizesGrid: c,
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds)
  ) {
    U(i, "--swiper-centered-offset-before", `${-f[0]}px`),
      U(
        i,
        "--swiper-centered-offset-after",
        `${e.size / 2 - c[c.length - 1] / 2}px`
      );
    const y = -e.snapGrid[0],
      b = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((L) => L + y)),
      (e.slidesGrid = e.slidesGrid.map((L) => L + b));
  }
  if (
    (u !== a && e.emit("slidesLengthChange"),
    f.length !== C &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    p.length !== g && e.emit("slidesGridLengthChange"),
    t.watchSlidesProgress && e.updateSlidesOffset(),
    e.emit("slidesUpdated"),
    !o && !t.cssMode && (t.effect === "slide" || t.effect === "fade"))
  ) {
    const y = `${t.containerModifierClass}backface-hidden`,
      b = e.el.classList.contains(y);
    u <= t.maxBackfaceHiddenSlides
      ? b || e.el.classList.add(y)
      : b && e.el.classList.remove(y);
  }
}
function qe(e) {
  const s = this,
    t = [],
    i = s.virtual && s.params.virtual.enabled;
  let n = 0,
    r;
  typeof e == "number"
    ? s.setTransition(e)
    : e === !0 && s.setTransition(s.params.speed);
  const l = (o) => (i ? s.slides[s.getSlideIndexByData(o)] : s.slides[o]);
  if (s.params.slidesPerView !== "auto" && s.params.slidesPerView > 1)
    if (s.params.centeredSlides)
      (s.visibleSlides || []).forEach((o) => {
        t.push(o);
      });
    else
      for (r = 0; r < Math.ceil(s.params.slidesPerView); r += 1) {
        const o = s.activeIndex + r;
        if (o > s.slides.length && !i) break;
        t.push(l(o));
      }
  else t.push(l(s.activeIndex));
  for (r = 0; r < t.length; r += 1)
    if (typeof t[r] < "u") {
      const o = t[r].offsetHeight;
      n = o > n ? o : n;
    }
  (n || n === 0) && (s.wrapperEl.style.height = `${n}px`);
}
function Ye() {
  const e = this,
    s = e.slides,
    t = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < s.length; i += 1)
    s[i].swiperSlideOffset =
      (e.isHorizontal() ? s[i].offsetLeft : s[i].offsetTop) -
      t -
      e.cssOverflowAdjustment();
}
const me = (e, s, t) => {
  s && !e.classList.contains(t)
    ? e.classList.add(t)
    : !s && e.classList.contains(t) && e.classList.remove(t);
};
function Xe(e = (this && this.translate) || 0) {
  const s = this,
    t = s.params,
    { slides: i, rtlTranslate: n, snapGrid: r } = s;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && s.updateSlidesOffset();
  let l = -e;
  n && (l = e), (s.visibleSlidesIndexes = []), (s.visibleSlides = []);
  let o = t.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0
    ? (o = (parseFloat(o.replace("%", "")) / 100) * s.size)
    : typeof o == "string" && (o = parseFloat(o));
  for (let a = 0; a < i.length; a += 1) {
    const d = i[a];
    let u = d.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (u -= i[0].swiperSlideOffset);
    const f =
        (l + (t.centeredSlides ? s.minTranslate() : 0) - u) /
        (d.swiperSlideSize + o),
      p =
        (l - r[0] + (t.centeredSlides ? s.minTranslate() : 0) - u) /
        (d.swiperSlideSize + o),
      c = -(l - u),
      m = c + s.slidesSizesGrid[a],
      h = c >= 0 && c <= s.size - s.slidesSizesGrid[a],
      C =
        (c >= 0 && c < s.size - 1) ||
        (m > 1 && m <= s.size) ||
        (c <= 0 && m >= s.size);
    C && (s.visibleSlides.push(d), s.visibleSlidesIndexes.push(a)),
      me(d, C, t.slideVisibleClass),
      me(d, h, t.slideFullyVisibleClass),
      (d.progress = n ? -f : f),
      (d.originalProgress = n ? -p : p);
  }
}
function Ue(e) {
  const s = this;
  if (typeof e > "u") {
    const u = s.rtlTranslate ? -1 : 1;
    e = (s && s.translate && s.translate * u) || 0;
  }
  const t = s.params,
    i = s.maxTranslate() - s.minTranslate();
  let { progress: n, isBeginning: r, isEnd: l, progressLoop: o } = s;
  const a = r,
    d = l;
  if (i === 0) (n = 0), (r = !0), (l = !0);
  else {
    n = (e - s.minTranslate()) / i;
    const u = Math.abs(e - s.minTranslate()) < 1,
      f = Math.abs(e - s.maxTranslate()) < 1;
    (r = u || n <= 0), (l = f || n >= 1), u && (n = 0), f && (n = 1);
  }
  if (t.loop) {
    const u = s.getSlideIndexByData(0),
      f = s.getSlideIndexByData(s.slides.length - 1),
      p = s.slidesGrid[u],
      c = s.slidesGrid[f],
      m = s.slidesGrid[s.slidesGrid.length - 1],
      h = Math.abs(e);
    h >= p ? (o = (h - p) / m) : (o = (h + m - c) / m), o > 1 && (o -= 1);
  }
  Object.assign(s, { progress: n, progressLoop: o, isBeginning: r, isEnd: l }),
    (t.watchSlidesProgress || (t.centeredSlides && t.autoHeight)) &&
      s.updateSlidesProgress(e),
    r && !a && s.emit("reachBeginning toEdge"),
    l && !d && s.emit("reachEnd toEdge"),
    ((a && !r) || (d && !l)) && s.emit("fromEdge"),
    s.emit("progress", n);
}
const ie = (e, s, t) => {
  s && !e.classList.contains(t)
    ? e.classList.add(t)
    : !s && e.classList.contains(t) && e.classList.remove(t);
};
function Ke() {
  const e = this,
    { slides: s, params: t, slidesEl: i, activeIndex: n } = e,
    r = e.virtual && t.virtual.enabled,
    l = e.grid && t.grid && t.grid.rows > 1,
    o = (f) => H(i, `.${t.slideClass}${f}, swiper-slide${f}`)[0];
  let a, d, u;
  if (r)
    if (t.loop) {
      let f = n - e.virtual.slidesBefore;
      f < 0 && (f = e.virtual.slides.length + f),
        f >= e.virtual.slides.length && (f -= e.virtual.slides.length),
        (a = o(`[data-swiper-slide-index="${f}"]`));
    } else a = o(`[data-swiper-slide-index="${n}"]`);
  else
    l
      ? ((a = s.find((f) => f.column === n)),
        (u = s.find((f) => f.column === n + 1)),
        (d = s.find((f) => f.column === n - 1)))
      : (a = s[n]);
  a &&
    (l ||
      ((u = De(a, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !u && (u = s[0]),
      (d = Ve(a, `.${t.slideClass}, swiper-slide`)[0]),
      t.loop && !d === 0 && (d = s[s.length - 1]))),
    s.forEach((f) => {
      ie(f, f === a, t.slideActiveClass),
        ie(f, f === u, t.slideNextClass),
        ie(f, f === d, t.slidePrevClass);
    }),
    e.emitSlidesClasses();
}
const K = (e, s) => {
    if (!e || e.destroyed || !e.params) return;
    const t = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
      i = s.closest(t());
    if (i) {
      let n = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      !n &&
        e.isElement &&
        (i.shadowRoot
          ? (n = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              i.shadowRoot &&
                ((n = i.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`
                )),
                n && n.remove());
            })),
        n && n.remove();
    }
  },
  re = (e, s) => {
    if (!e.slides[s]) return;
    const t = e.slides[s].querySelector('[loading="lazy"]');
    t && t.removeAttribute("loading");
  },
  oe = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let s = e.params.lazyPreloadPrevNext;
    const t = e.slides.length;
    if (!t || !s || s < 0) return;
    s = Math.min(s, t);
    const i =
        e.params.slidesPerView === "auto"
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      n = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
      const l = n,
        o = [l - s];
      o.push(...Array.from({ length: s }).map((a, d) => l + i + d)),
        e.slides.forEach((a, d) => {
          o.includes(a.column) && re(e, d);
        });
      return;
    }
    const r = n + i - 1;
    if (e.params.rewind || e.params.loop)
      for (let l = n - s; l <= r + s; l += 1) {
        const o = ((l % t) + t) % t;
        (o < n || o > r) && re(e, o);
      }
    else
      for (let l = Math.max(n - s, 0); l <= Math.min(r + s, t - 1); l += 1)
        l !== n && (l > r || l < n) && re(e, l);
  };
function Qe(e) {
  const { slidesGrid: s, params: t } = e,
    i = e.rtlTranslate ? e.translate : -e.translate;
  let n;
  for (let r = 0; r < s.length; r += 1)
    typeof s[r + 1] < "u"
      ? i >= s[r] && i < s[r + 1] - (s[r + 1] - s[r]) / 2
        ? (n = r)
        : i >= s[r] && i < s[r + 1] && (n = r + 1)
      : i >= s[r] && (n = r);
  return t.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function Je(e) {
  const s = this,
    t = s.rtlTranslate ? s.translate : -s.translate,
    { snapGrid: i, params: n, activeIndex: r, realIndex: l, snapIndex: o } = s;
  let a = e,
    d;
  const u = (c) => {
    let m = c - s.virtual.slidesBefore;
    return (
      m < 0 && (m = s.virtual.slides.length + m),
      m >= s.virtual.slides.length && (m -= s.virtual.slides.length),
      m
    );
  };
  if ((typeof a > "u" && (a = Qe(s)), i.indexOf(t) >= 0)) d = i.indexOf(t);
  else {
    const c = Math.min(n.slidesPerGroupSkip, a);
    d = c + Math.floor((a - c) / n.slidesPerGroup);
  }
  if ((d >= i.length && (d = i.length - 1), a === r && !s.params.loop)) {
    d !== o && ((s.snapIndex = d), s.emit("snapIndexChange"));
    return;
  }
  if (a === r && s.params.loop && s.virtual && s.params.virtual.enabled) {
    s.realIndex = u(a);
    return;
  }
  const f = s.grid && n.grid && n.grid.rows > 1;
  let p;
  if (s.virtual && n.virtual.enabled && n.loop) p = u(a);
  else if (f) {
    const c = s.slides.find((h) => h.column === a);
    let m = parseInt(c.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(m) && (m = Math.max(s.slides.indexOf(c), 0)),
      (p = Math.floor(m / n.grid.rows));
  } else if (s.slides[a]) {
    const c = s.slides[a].getAttribute("data-swiper-slide-index");
    c ? (p = parseInt(c, 10)) : (p = a);
  } else p = a;
  Object.assign(s, {
    previousSnapIndex: o,
    snapIndex: d,
    previousRealIndex: l,
    realIndex: p,
    previousIndex: r,
    activeIndex: a,
  }),
    s.initialized && oe(s),
    s.emit("activeIndexChange"),
    s.emit("snapIndexChange"),
    (s.initialized || s.params.runCallbacksOnInit) &&
      (l !== p && s.emit("realIndexChange"), s.emit("slideChange"));
}
function Ze(e, s) {
  const t = this,
    i = t.params;
  let n = e.closest(`.${i.slideClass}, swiper-slide`);
  !n &&
    t.isElement &&
    s &&
    s.length > 1 &&
    s.includes(e) &&
    [...s.slice(s.indexOf(e) + 1, s.length)].forEach((o) => {
      !n && o.matches && o.matches(`.${i.slideClass}, swiper-slide`) && (n = o);
    });
  let r = !1,
    l;
  if (n) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === n) {
        (r = !0), (l = o);
        break;
      }
  }
  if (n && r)
    (t.clickedSlide = n),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            n.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (t.clickedIndex = l);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  i.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
var et = {
  updateSize: We,
  updateSlides: je,
  updateAutoHeight: qe,
  updateSlidesOffset: Ye,
  updateSlidesProgress: Xe,
  updateProgress: Ue,
  updateSlidesClasses: Ke,
  updateActiveIndex: Je,
  updateClickedSlide: Ze,
};
function tt(e = this.isHorizontal() ? "x" : "y") {
  const s = this,
    { params: t, rtlTranslate: i, translate: n, wrapperEl: r } = s;
  if (t.virtualTranslate) return i ? -n : n;
  if (t.cssMode) return n;
  let l = ze(r, e);
  return (l += s.cssOverflowAdjustment()), i && (l = -l), l || 0;
}
function st(e, s) {
  const t = this,
    { rtlTranslate: i, params: n, wrapperEl: r, progress: l } = t;
  let o = 0,
    a = 0;
  const d = 0;
  t.isHorizontal() ? (o = i ? -e : e) : (a = e),
    n.roundLengths && ((o = Math.floor(o)), (a = Math.floor(a))),
    (t.previousTranslate = t.translate),
    (t.translate = t.isHorizontal() ? o : a),
    n.cssMode
      ? (r[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal()
          ? -o
          : -a)
      : n.virtualTranslate ||
        (t.isHorizontal()
          ? (o -= t.cssOverflowAdjustment())
          : (a -= t.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${o}px, ${a}px, ${d}px)`));
  let u;
  const f = t.maxTranslate() - t.minTranslate();
  f === 0 ? (u = 0) : (u = (e - t.minTranslate()) / f),
    u !== l && t.updateProgress(e),
    t.emit("setTranslate", t.translate, s);
}
function it() {
  return -this.snapGrid[0];
}
function rt() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function nt(e = 0, s = this.params.speed, t = !0, i = !0, n) {
  const r = this,
    { params: l, wrapperEl: o } = r;
  if (r.animating && l.preventInteractionOnTransition) return !1;
  const a = r.minTranslate(),
    d = r.maxTranslate();
  let u;
  if (
    (i && e > a ? (u = a) : i && e < d ? (u = d) : (u = e),
    r.updateProgress(u),
    l.cssMode)
  ) {
    const f = r.isHorizontal();
    if (s === 0) o[f ? "scrollLeft" : "scrollTop"] = -u;
    else {
      if (!r.support.smoothScroll)
        return (
          be({ swiper: r, targetPosition: -u, side: f ? "left" : "top" }), !0
        );
      o.scrollTo({ [f ? "left" : "top"]: -u, behavior: "smooth" });
    }
    return !0;
  }
  return (
    s === 0
      ? (r.setTransition(0),
        r.setTranslate(u),
        t && (r.emit("beforeTransitionStart", s, n), r.emit("transitionEnd")))
      : (r.setTransition(s),
        r.setTranslate(u),
        t && (r.emit("beforeTransitionStart", s, n), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (p) {
              !r ||
                r.destroyed ||
                (p.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  (r.animating = !1),
                  t && r.emit("transitionEnd")));
            }),
          r.wrapperEl.addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
var at = {
  getTranslate: tt,
  setTranslate: st,
  minTranslate: it,
  maxTranslate: rt,
  translateTo: nt,
};
function lt(e, s) {
  const t = this;
  t.params.cssMode ||
    ((t.wrapperEl.style.transitionDuration = `${e}ms`),
    (t.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : "")),
    t.emit("setTransition", e, s);
}
function Me({ swiper: e, runCallbacks: s, direction: t, step: i }) {
  const { activeIndex: n, previousIndex: r } = e;
  let l = t;
  l || (n > r ? (l = "next") : n < r ? (l = "prev") : (l = "reset")),
    e.emit(`transition${i}`),
    s && l === "reset"
      ? e.emit(`slideResetTransition${i}`)
      : s &&
        n !== r &&
        (e.emit(`slideChangeTransition${i}`),
        l === "next"
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`));
}
function ot(e = !0, s) {
  const t = this,
    { params: i } = t;
  i.cssMode ||
    (i.autoHeight && t.updateAutoHeight(),
    Me({ swiper: t, runCallbacks: e, direction: s, step: "Start" }));
}
function dt(e = !0, s) {
  const t = this,
    { params: i } = t;
  (t.animating = !1),
    !i.cssMode &&
      (t.setTransition(0),
      Me({ swiper: t, runCallbacks: e, direction: s, step: "End" }));
}
var ct = { setTransition: lt, transitionStart: ot, transitionEnd: dt };
function ft(e = 0, s, t = !0, i, n) {
  typeof e == "string" && (e = parseInt(e, 10));
  const r = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: o,
    snapGrid: a,
    slidesGrid: d,
    previousIndex: u,
    activeIndex: f,
    rtlTranslate: p,
    wrapperEl: c,
    enabled: m,
  } = r;
  if (
    (!m && !i && !n) ||
    r.destroyed ||
    (r.animating && o.preventInteractionOnTransition)
  )
    return !1;
  typeof s > "u" && (s = r.params.speed);
  const h = Math.min(r.params.slidesPerGroupSkip, l);
  let C = h + Math.floor((l - h) / r.params.slidesPerGroup);
  C >= a.length && (C = a.length - 1);
  const g = -a[C];
  if (o.normalizeSlideIndex)
    for (let I = 0; I < d.length; I += 1) {
      const T = -Math.floor(g * 100),
        k = Math.floor(d[I] * 100),
        y = Math.floor(d[I + 1] * 100);
      typeof d[I + 1] < "u"
        ? T >= k && T < y - (y - k) / 2
          ? (l = I)
          : T >= k && T < y && (l = I + 1)
        : T >= k && (l = I);
    }
  if (
    r.initialized &&
    l !== f &&
    ((!r.allowSlideNext &&
      (p
        ? g > r.translate && g > r.minTranslate()
        : g < r.translate && g < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        g > r.translate &&
        g > r.maxTranslate() &&
        (f || 0) !== l))
  )
    return !1;
  l !== (u || 0) && t && r.emit("beforeSlideChangeStart"), r.updateProgress(g);
  let w;
  l > f ? (w = "next") : l < f ? (w = "prev") : (w = "reset");
  const v = r.virtual && r.params.virtual.enabled;
  if (!(v && n) && ((p && -g === r.translate) || (!p && g === r.translate)))
    return (
      r.updateActiveIndex(l),
      o.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      o.effect !== "slide" && r.setTranslate(g),
      w !== "reset" && (r.transitionStart(t, w), r.transitionEnd(t, w)),
      !1
    );
  if (o.cssMode) {
    const I = r.isHorizontal(),
      T = p ? g : -g;
    if (s === 0)
      v &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        v && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              c[I ? "scrollLeft" : "scrollTop"] = T;
            }))
          : (c[I ? "scrollLeft" : "scrollTop"] = T),
        v &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1);
          });
    else {
      if (!r.support.smoothScroll)
        return (
          be({ swiper: r, targetPosition: T, side: I ? "left" : "top" }), !0
        );
      c.scrollTo({ [I ? "left" : "top"]: T, behavior: "smooth" });
    }
    return !0;
  }
  const E = Ee().isSafari;
  return (
    v && !n && E && r.isElement && r.virtual.update(!1, !1, l),
    r.setTransition(s),
    r.setTranslate(g),
    r.updateActiveIndex(l),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", s, i),
    r.transitionStart(t, w),
    s === 0
      ? r.transitionEnd(t, w)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (T) {
            !r ||
              r.destroyed ||
              (T.target === this &&
                (r.wrapperEl.removeEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(t, w)));
          }),
        r.wrapperEl.addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function ut(e = 0, s, t = !0, i) {
  typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  if (n.destroyed) return;
  typeof s > "u" && (s = n.params.speed);
  const r = n.grid && n.params.grid && n.params.grid.rows > 1;
  let l = e;
  if (n.params.loop)
    if (n.virtual && n.params.virtual.enabled) l = l + n.virtual.slidesBefore;
    else {
      let o;
      if (r) {
        const h = l * n.params.grid.rows;
        o = n.slides.find(
          (C) => C.getAttribute("data-swiper-slide-index") * 1 === h
        ).column;
      } else o = n.getSlideIndexByData(l);
      const a = r
          ? Math.ceil(n.slides.length / n.params.grid.rows)
          : n.slides.length,
        {
          centeredSlides: d,
          slidesOffsetBefore: u,
          slidesOffsetAfter: f,
        } = n.params,
        p = d || !!u || !!f;
      let c = n.params.slidesPerView;
      c === "auto"
        ? (c = n.slidesPerViewDynamic())
        : ((c = Math.ceil(parseFloat(n.params.slidesPerView, 10))),
          p && c % 2 === 0 && (c = c + 1));
      let m = a - o < c;
      if (
        (p && (m = m || o < Math.ceil(c / 2)),
        i && p && n.params.slidesPerView !== "auto" && !r && (m = !1),
        m)
      ) {
        const h = p
          ? o < n.activeIndex
            ? "prev"
            : "next"
          : o - n.activeIndex - 1 < n.params.slidesPerView
          ? "next"
          : "prev";
        n.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? o + 1 : o - a + 1,
          slideRealIndex: h === "next" ? n.realIndex : void 0,
        });
      }
      if (r) {
        const h = l * n.params.grid.rows;
        l = n.slides.find(
          (C) => C.getAttribute("data-swiper-slide-index") * 1 === h
        ).column;
      } else l = n.getSlideIndexByData(l);
    }
  return (
    requestAnimationFrame(() => {
      n.slideTo(l, s, t, i);
    }),
    n
  );
}
function pt(e, s = !0, t) {
  const i = this,
    { enabled: n, params: r, animating: l } = i;
  if (!n || i.destroyed) return i;
  typeof e > "u" && (e = i.params.speed);
  let o = r.slidesPerGroup;
  r.slidesPerView === "auto" &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const a = i.activeIndex < r.slidesPerGroupSkip ? 1 : o,
    d = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (l && !d && r.loopPreventsSliding) return !1;
    if (
      (i.loopFix({ direction: "next" }),
      (i._clientLeft = i.wrapperEl.clientLeft),
      i.activeIndex === i.slides.length - 1 && r.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + a, e, s, t);
        }),
        !0
      );
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, e, s, t)
    : i.slideTo(i.activeIndex + a, e, s, t);
}
function mt(e, s = !0, t) {
  const i = this,
    {
      params: n,
      snapGrid: r,
      slidesGrid: l,
      rtlTranslate: o,
      enabled: a,
      animating: d,
    } = i;
  if (!a || i.destroyed) return i;
  typeof e > "u" && (e = i.params.speed);
  const u = i.virtual && n.virtual.enabled;
  if (n.loop) {
    if (d && !u && n.loopPreventsSliding) return !1;
    i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const f = o ? i.translate : -i.translate;
  function p(w) {
    return w < 0 ? -Math.floor(Math.abs(w)) : Math.floor(w);
  }
  const c = p(f),
    m = r.map((w) => p(w)),
    h = n.freeMode && n.freeMode.enabled;
  let C = r[m.indexOf(c) - 1];
  if (typeof C > "u" && (n.cssMode || h)) {
    let w;
    r.forEach((v, x) => {
      c >= v && (w = x);
    }),
      typeof w < "u" && (C = h ? r[w] : r[w > 0 ? w - 1 : w]);
  }
  let g = 0;
  if (
    (typeof C < "u" &&
      ((g = l.indexOf(C)),
      g < 0 && (g = i.activeIndex - 1),
      n.slidesPerView === "auto" &&
        n.slidesPerGroup === 1 &&
        n.slidesPerGroupAuto &&
        ((g = g - i.slidesPerViewDynamic("previous", !0) + 1),
        (g = Math.max(g, 0)))),
    n.rewind && i.isBeginning)
  ) {
    const w =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(w, e, s, t);
  } else if (n.loop && i.activeIndex === 0 && n.cssMode)
    return (
      requestAnimationFrame(() => {
        i.slideTo(g, e, s, t);
      }),
      !0
    );
  return i.slideTo(g, e, s, t);
}
function ht(e, s = !0, t) {
  const i = this;
  if (!i.destroyed)
    return (
      typeof e > "u" && (e = i.params.speed), i.slideTo(i.activeIndex, e, s, t)
    );
}
function gt(e, s = !0, t, i = 0.5) {
  const n = this;
  if (n.destroyed) return;
  typeof e > "u" && (e = n.params.speed);
  let r = n.activeIndex;
  const l = Math.min(n.params.slidesPerGroupSkip, r),
    o = l + Math.floor((r - l) / n.params.slidesPerGroup),
    a = n.rtlTranslate ? n.translate : -n.translate;
  if (a >= n.snapGrid[o]) {
    const d = n.snapGrid[o],
      u = n.snapGrid[o + 1];
    a - d > (u - d) * i && (r += n.params.slidesPerGroup);
  } else {
    const d = n.snapGrid[o - 1],
      u = n.snapGrid[o];
    a - d <= (u - d) * i && (r -= n.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, n.slidesGrid.length - 1)),
    n.slideTo(r, e, s, t)
  );
}
function vt() {
  const e = this;
  if (e.destroyed) return;
  const { params: s, slidesEl: t } = e,
    i = s.slidesPerView === "auto" ? e.slidesPerViewDynamic() : s.slidesPerView;
  let n = e.getSlideIndexWhenGrid(e.clickedIndex),
    r;
  const l = e.isElement ? "swiper-slide" : `.${s.slideClass}`,
    o = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (s.loop) {
    if (e.animating) return;
    (r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      s.centeredSlides
        ? e.slideToLoop(r)
        : n >
          (o
            ? (e.slides.length - i) / 2 - (e.params.grid.rows - 1)
            : e.slides.length - i)
        ? (e.loopFix(),
          (n = e.getSlideIndex(
            H(t, `${l}[data-swiper-slide-index="${r}"]`)[0]
          )),
          Te(() => {
            e.slideTo(n);
          }))
        : e.slideTo(n);
  } else e.slideTo(n);
}
var wt = {
  slideTo: ft,
  slideToLoop: ut,
  slideNext: pt,
  slidePrev: mt,
  slideReset: ht,
  slideToClosest: gt,
  slideToClickedSlide: vt,
};
function St(e, s) {
  const t = this,
    { params: i, slidesEl: n } = t;
  if (!i.loop || (t.virtual && t.params.virtual.enabled)) return;
  const r = () => {
      H(n, `.${i.slideClass}, swiper-slide`).forEach((m, h) => {
        m.setAttribute("data-swiper-slide-index", h);
      });
    },
    l = () => {
      const c = H(n, `.${i.slideBlankClass}`);
      c.forEach((m) => {
        m.remove();
      }),
        c.length > 0 && (t.recalcSlides(), t.updateSlides());
    },
    o = t.grid && i.grid && i.grid.rows > 1;
  i.loopAddBlankSlides && (i.slidesPerGroup > 1 || o) && l();
  const a = i.slidesPerGroup * (o ? i.grid.rows : 1),
    d = t.slides.length % a !== 0,
    u = o && t.slides.length % i.grid.rows !== 0,
    f = (c) => {
      for (let m = 0; m < c; m += 1) {
        const h = t.isElement
          ? le("swiper-slide", [i.slideBlankClass])
          : le("div", [i.slideClass, i.slideBlankClass]);
        t.slidesEl.append(h);
      }
    };
  if (d) {
    if (i.loopAddBlankSlides) {
      const c = a - (t.slides.length % a);
      f(c), t.recalcSlides(), t.updateSlides();
    } else
      J(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      );
    r();
  } else if (u) {
    if (i.loopAddBlankSlides) {
      const c = i.grid.rows - (t.slides.length % i.grid.rows);
      f(c), t.recalcSlides(), t.updateSlides();
    } else
      J(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      );
    r();
  } else r();
  const p = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
  t.loopFix({ slideRealIndex: e, direction: p ? void 0 : "next", initial: s });
}
function Tt({
  slideRealIndex: e,
  slideTo: s = !0,
  direction: t,
  setTranslate: i,
  activeSlideIndex: n,
  initial: r,
  byController: l,
  byMousewheel: o,
} = {}) {
  const a = this;
  if (!a.params.loop) return;
  a.emit("beforeLoopFix");
  const {
      slides: d,
      allowSlidePrev: u,
      allowSlideNext: f,
      slidesEl: p,
      params: c,
    } = a,
    {
      centeredSlides: m,
      slidesOffsetBefore: h,
      slidesOffsetAfter: C,
      initialSlide: g,
    } = c,
    w = m || !!h || !!C;
  if (
    ((a.allowSlidePrev = !0),
    (a.allowSlideNext = !0),
    a.virtual && c.virtual.enabled)
  ) {
    s &&
      (!w && a.snapIndex === 0
        ? a.slideTo(a.virtual.slides.length, 0, !1, !0)
        : w && a.snapIndex < c.slidesPerView
        ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
        : a.snapIndex === a.snapGrid.length - 1 &&
          a.slideTo(a.virtual.slidesBefore, 0, !1, !0)),
      (a.allowSlidePrev = u),
      (a.allowSlideNext = f),
      a.emit("loopFix");
    return;
  }
  let v = c.slidesPerView;
  v === "auto"
    ? (v = a.slidesPerViewDynamic())
    : ((v = Math.ceil(parseFloat(c.slidesPerView, 10))),
      w && v % 2 === 0 && (v = v + 1));
  const x = c.slidesPerGroupAuto ? v : c.slidesPerGroup;
  let S = w ? Math.max(x, Math.ceil(v / 2)) : x;
  S % x !== 0 && (S += x - (S % x)),
    (S += c.loopAdditionalSlides),
    (a.loopedSlides = S);
  const E = a.grid && c.grid && c.grid.rows > 1;
  d.length < v + S || (a.params.effect === "cards" && d.length < v + S * 2)
    ? J(
        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
      )
    : E &&
      c.grid.fill === "row" &&
      J(
        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
      );
  const I = [],
    T = [],
    k = E ? Math.ceil(d.length / c.grid.rows) : d.length,
    y = r && k - g < v && !w;
  let b = y ? g : a.activeIndex;
  typeof n > "u"
    ? (n = a.getSlideIndex(
        d.find((M) => M.classList.contains(c.slideActiveClass))
      ))
    : (b = n);
  const L = t === "next" || !t,
    P = t === "prev" || !t;
  let B = 0,
    _ = 0;
  const V = (E ? d[n].column : n) + (w && typeof i > "u" ? -v / 2 + 0.5 : 0);
  if (V < S) {
    B = Math.max(S - V, x);
    for (let M = 0; M < S - V; M += 1) {
      const A = M - Math.floor(M / k) * k;
      if (E) {
        const z = k - A - 1;
        for (let R = d.length - 1; R >= 0; R -= 1)
          d[R].column === z && I.push(R);
      } else I.push(k - A - 1);
    }
  } else if (V + v > k - S) {
    (_ = Math.max(V - (k - S * 2), x)), y && (_ = Math.max(_, v - k + g + 1));
    for (let M = 0; M < _; M += 1) {
      const A = M - Math.floor(M / k) * k;
      E
        ? d.forEach((z, R) => {
            z.column === A && T.push(R);
          })
        : T.push(A);
    }
  }
  if (
    ((a.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      a.__preventObserver__ = !1;
    }),
    a.params.effect === "cards" &&
      d.length < v + S * 2 &&
      (T.includes(n) && T.splice(T.indexOf(n), 1),
      I.includes(n) && I.splice(I.indexOf(n), 1)),
    P &&
      I.forEach((M) => {
        (d[M].swiperLoopMoveDOM = !0),
          p.prepend(d[M]),
          (d[M].swiperLoopMoveDOM = !1);
      }),
    L &&
      T.forEach((M) => {
        (d[M].swiperLoopMoveDOM = !0),
          p.append(d[M]),
          (d[M].swiperLoopMoveDOM = !1);
      }),
    a.recalcSlides(),
    c.slidesPerView === "auto"
      ? a.updateSlides()
      : E &&
        ((I.length > 0 && P) || (T.length > 0 && L)) &&
        a.slides.forEach((M, A) => {
          a.grid.updateSlide(A, M, a.slides);
        }),
    c.watchSlidesProgress && a.updateSlidesOffset(),
    s)
  ) {
    if (I.length > 0 && P) {
      if (typeof e > "u") {
        const M = a.slidesGrid[b],
          z = a.slidesGrid[b + B] - M;
        o
          ? a.setTranslate(a.translate - z)
          : (a.slideTo(b + Math.ceil(B), 0, !1, !0),
            i &&
              ((a.touchEventsData.startTranslate =
                a.touchEventsData.startTranslate - z),
              (a.touchEventsData.currentTranslate =
                a.touchEventsData.currentTranslate - z)));
      } else if (i) {
        const M = E ? I.length / c.grid.rows : I.length;
        a.slideTo(a.activeIndex + M, 0, !1, !0),
          (a.touchEventsData.currentTranslate = a.translate);
      }
    } else if (T.length > 0 && L)
      if (typeof e > "u") {
        const M = a.slidesGrid[b],
          z = a.slidesGrid[b - _] - M;
        o
          ? a.setTranslate(a.translate - z)
          : (a.slideTo(b - _, 0, !1, !0),
            i &&
              ((a.touchEventsData.startTranslate =
                a.touchEventsData.startTranslate - z),
              (a.touchEventsData.currentTranslate =
                a.touchEventsData.currentTranslate - z)));
      } else {
        const M = E ? T.length / c.grid.rows : T.length;
        a.slideTo(a.activeIndex - M, 0, !1, !0);
      }
  }
  if (
    ((a.allowSlidePrev = u),
    (a.allowSlideNext = f),
    a.controller && a.controller.control && !l)
  ) {
    const M = {
      slideRealIndex: e,
      direction: t,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0,
    };
    Array.isArray(a.controller.control)
      ? a.controller.control.forEach((A) => {
          !A.destroyed &&
            A.params.loop &&
            A.loopFix({
              ...M,
              slideTo: A.params.slidesPerView === c.slidesPerView ? s : !1,
            });
        })
      : a.controller.control instanceof a.constructor &&
        a.controller.control.params.loop &&
        a.controller.control.loopFix({
          ...M,
          slideTo:
            a.controller.control.params.slidesPerView === c.slidesPerView
              ? s
              : !1,
        });
  }
  a.emit("loopFix");
}
function bt() {
  const e = this,
    { params: s, slidesEl: t } = e;
  if (!s.loop || !t || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const i = [];
  e.slides.forEach((n) => {
    const r =
      typeof n.swiperSlideIndex > "u"
        ? n.getAttribute("data-swiper-slide-index") * 1
        : n.swiperSlideIndex;
    i[r] = n;
  }),
    e.slides.forEach((n) => {
      n.removeAttribute("data-swiper-slide-index");
    }),
    i.forEach((n) => {
      t.append(n);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0);
}
var yt = { loopCreate: St, loopFix: Tt, loopDestroy: bt };
function xt(e) {
  const s = this;
  if (
    !s.params.simulateTouch ||
    (s.params.watchOverflow && s.isLocked) ||
    s.params.cssMode
  )
    return;
  const t = s.params.touchEventsTarget === "container" ? s.el : s.wrapperEl;
  s.isElement && (s.__preventObserver__ = !0),
    (t.style.cursor = "move"),
    (t.style.cursor = e ? "grabbing" : "grab"),
    s.isElement &&
      requestAnimationFrame(() => {
        s.__preventObserver__ = !1;
      });
}
function Et() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
var Mt = { setGrabCursor: xt, unsetGrabCursor: Et };
function Pt(e, s = this) {
  function t(i) {
    if (!i || i === j() || i === F()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const n = i.closest(e);
    return !n && !i.getRootNode ? null : n || t(i.getRootNode().host);
  }
  return t(s);
}
function he(e, s, t) {
  const i = F(),
    { params: n } = e,
    r = n.edgeSwipeDetection,
    l = n.edgeSwipeThreshold;
  return r && (t <= l || t >= i.innerWidth - l)
    ? r === "prevent"
      ? (s.preventDefault(), !0)
      : !1
    : !0;
}
function Ct(e) {
  const s = this,
    t = j();
  let i = e;
  i.originalEvent && (i = i.originalEvent);
  const n = s.touchEventsData;
  if (i.type === "pointerdown") {
    if (n.pointerId !== null && n.pointerId !== i.pointerId) return;
    n.pointerId = i.pointerId;
  } else
    i.type === "touchstart" &&
      i.targetTouches.length === 1 &&
      (n.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    he(s, i, i.targetTouches[0].pageX);
    return;
  }
  const { params: r, touches: l, enabled: o } = s;
  if (
    !o ||
    (!r.simulateTouch && i.pointerType === "mouse") ||
    (s.animating && r.preventInteractionOnTransition)
  )
    return;
  !s.animating && r.cssMode && r.loop && s.loopFix();
  let a = i.target;
  if (
    (r.touchEventsTarget === "wrapper" && !Ge(a, s.wrapperEl)) ||
    ("which" in i && i.which === 3) ||
    ("button" in i && i.button > 0) ||
    (n.isTouched && n.isMoved)
  )
    return;
  const d = !!r.noSwipingClass && r.noSwipingClass !== "",
    u = i.composedPath ? i.composedPath() : i.path;
  d && i.target && i.target.shadowRoot && u && (a = u[0]);
  const f = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    p = !!(i.target && i.target.shadowRoot);
  if (r.noSwiping && (p ? Pt(f, a) : a.closest(f))) {
    s.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !a.closest(r.swipeHandler)) return;
  (l.currentX = i.pageX), (l.currentY = i.pageY);
  const c = l.currentX,
    m = l.currentY;
  if (!he(s, i, c)) return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (l.startX = c),
    (l.startY = m),
    (n.touchStartTime = Q()),
    (s.allowClick = !0),
    s.updateSize(),
    (s.swipeDirection = void 0),
    r.threshold > 0 && (n.allowThresholdMove = !1);
  let h = !0;
  a.matches(n.focusableElements) &&
    ((h = !1), a.nodeName === "SELECT" && (n.isTouched = !1)),
    t.activeElement &&
      t.activeElement.matches(n.focusableElements) &&
      t.activeElement !== a &&
      (i.pointerType === "mouse" ||
        (i.pointerType !== "mouse" && !a.matches(n.focusableElements))) &&
      t.activeElement.blur();
  const C = h && s.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || C) &&
    !a.isContentEditable &&
    i.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      s.freeMode &&
      s.animating &&
      !r.cssMode &&
      s.freeMode.onTouchStart(),
    s.emit("touchStart", i);
}
function It(e) {
  const s = j(),
    t = this,
    i = t.touchEventsData,
    { params: n, touches: r, rtlTranslate: l, enabled: o } = t;
  if (!o || (!n.simulateTouch && e.pointerType === "mouse")) return;
  let a = e;
  if (
    (a.originalEvent && (a = a.originalEvent),
    a.type === "pointermove" &&
      (i.touchId !== null || a.pointerId !== i.pointerId))
  )
    return;
  let d;
  if (a.type === "touchmove") {
    if (
      ((d = [...a.changedTouches].find((E) => E.identifier === i.touchId)),
      !d || d.identifier !== i.touchId)
    )
      return;
  } else d = a;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", a);
    return;
  }
  const u = d.pageX,
    f = d.pageY;
  if (a.preventedByNestedSwiper) {
    (r.startX = u), (r.startY = f);
    return;
  }
  if (!t.allowTouchMove) {
    a.target.matches(i.focusableElements) || (t.allowClick = !1),
      i.isTouched &&
        (Object.assign(r, { startX: u, startY: f, currentX: u, currentY: f }),
        (i.touchStartTime = Q()));
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop)
    if (t.isVertical()) {
      if (
        (f < r.startY && t.translate <= t.maxTranslate()) ||
        (f > r.startY && t.translate >= t.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else {
      if (
        l &&
        ((u > r.startX && -t.translate <= t.maxTranslate()) ||
          (u < r.startX && -t.translate >= t.minTranslate()))
      )
        return;
      if (
        !l &&
        ((u < r.startX && t.translate <= t.maxTranslate()) ||
          (u > r.startX && t.translate >= t.minTranslate()))
      )
        return;
    }
  if (
    (s.activeElement &&
      s.activeElement.matches(i.focusableElements) &&
      s.activeElement !== a.target &&
      a.pointerType !== "mouse" &&
      s.activeElement.blur(),
    s.activeElement &&
      a.target === s.activeElement &&
      a.target.matches(i.focusableElements))
  ) {
    (i.isMoved = !0), (t.allowClick = !1);
    return;
  }
  i.allowTouchCallbacks && t.emit("touchMove", a),
    (r.previousX = r.currentX),
    (r.previousY = r.currentY),
    (r.currentX = u),
    (r.currentY = f);
  const p = r.currentX - r.startX,
    c = r.currentY - r.startY;
  if (t.params.threshold && Math.sqrt(p ** 2 + c ** 2) < t.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let E;
    (t.isHorizontal() && r.currentY === r.startY) ||
    (t.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : p * p + c * c >= 25 &&
        ((E = (Math.atan2(Math.abs(c), Math.abs(p)) * 180) / Math.PI),
        (i.isScrolling = t.isHorizontal()
          ? E > n.touchAngle
          : 90 - E > n.touchAngle));
  }
  if (
    (i.isScrolling && t.emit("touchMoveOpposite", a),
    typeof i.startMoving > "u" &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (a.type === "touchmove" && i.preventTouchMoveFromPointerMove))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (t.allowClick = !1),
    !n.cssMode && a.cancelable && a.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
  let m = t.isHorizontal() ? p : c,
    h = t.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  n.oneWayMovement &&
    ((m = Math.abs(m) * (l ? 1 : -1)), (h = Math.abs(h) * (l ? 1 : -1))),
    (r.diff = m),
    (m *= n.touchRatio),
    l && ((m = -m), (h = -h));
  const C = t.touchesDirection;
  (t.swipeDirection = m > 0 ? "prev" : "next"),
    (t.touchesDirection = h > 0 ? "prev" : "next");
  const g = t.params.loop && !n.cssMode,
    w =
      (t.touchesDirection === "next" && t.allowSlideNext) ||
      (t.touchesDirection === "prev" && t.allowSlidePrev);
  if (!i.isMoved) {
    if (
      (g && w && t.loopFix({ direction: t.swipeDirection }),
      (i.startTranslate = t.getTranslate()),
      t.setTransition(0),
      t.animating)
    ) {
      const E = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      t.wrapperEl.dispatchEvent(E);
    }
    (i.allowMomentumBounce = !1),
      n.grabCursor &&
        (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
        t.setGrabCursor(!0),
      t.emit("sliderFirstMove", a);
  }
  let v;
  if (
    (new Date().getTime(),
    n._loopSwapReset !== !1 &&
      i.isMoved &&
      i.allowThresholdMove &&
      C !== t.touchesDirection &&
      g &&
      w &&
      Math.abs(m) >= 1)
  ) {
    Object.assign(r, {
      startX: u,
      startY: f,
      currentX: u,
      currentY: f,
      startTranslate: i.currentTranslate,
    }),
      (i.loopSwapReset = !0),
      (i.startTranslate = i.currentTranslate);
    return;
  }
  t.emit("sliderMove", a),
    (i.isMoved = !0),
    (i.currentTranslate = m + i.startTranslate);
  let x = !0,
    S = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (S = 0),
    m > 0
      ? (g &&
          w &&
          !v &&
          i.allowThresholdMove &&
          i.currentTranslate >
            (n.centeredSlides
              ? t.minTranslate() -
                t.slidesSizesGrid[t.activeIndex + 1] -
                (n.slidesPerView !== "auto" &&
                t.slides.length - n.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween
                  : 0) -
                t.params.spaceBetween
              : t.minTranslate()) &&
          t.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > t.minTranslate() &&
          ((x = !1),
          n.resistance &&
            (i.currentTranslate =
              t.minTranslate() -
              1 +
              (-t.minTranslate() + i.startTranslate + m) ** S)))
      : m < 0 &&
        (g &&
          w &&
          !v &&
          i.allowThresholdMove &&
          i.currentTranslate <
            (n.centeredSlides
              ? t.maxTranslate() +
                t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                t.params.spaceBetween +
                (n.slidesPerView !== "auto" &&
                t.slides.length - n.slidesPerView >= 2
                  ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                    t.params.spaceBetween
                  : 0)
              : t.maxTranslate()) &&
          t.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              t.slides.length -
              (n.slidesPerView === "auto"
                ? t.slidesPerViewDynamic()
                : Math.ceil(parseFloat(n.slidesPerView, 10))),
          }),
        i.currentTranslate < t.maxTranslate() &&
          ((x = !1),
          n.resistance &&
            (i.currentTranslate =
              t.maxTranslate() +
              1 -
              (t.maxTranslate() - i.startTranslate - m) ** S))),
    x && (a.preventedByNestedSwiper = !0),
    !t.allowSlideNext &&
      t.swipeDirection === "next" &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev &&
      t.swipeDirection === "prev" &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev &&
      !t.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    n.threshold > 0)
  )
    if (Math.abs(m) > n.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          (r.diff = t.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !n.followFinger ||
    n.cssMode ||
    (((n.freeMode && n.freeMode.enabled && t.freeMode) ||
      n.watchSlidesProgress) &&
      (t.updateActiveIndex(), t.updateSlidesClasses()),
    n.freeMode && n.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(i.currentTranslate),
    t.setTranslate(i.currentTranslate));
}
function Lt(e) {
  const s = this,
    t = s.touchEventsData;
  let i = e;
  i.originalEvent && (i = i.originalEvent);
  let n;
  if (i.type === "touchend" || i.type === "touchcancel") {
    if (
      ((n = [...i.changedTouches].find((S) => S.identifier === t.touchId)),
      !n || n.identifier !== t.touchId)
    )
      return;
  } else {
    if (t.touchId !== null || i.pointerId !== t.pointerId) return;
    n = i;
  }
  if (
    ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
      i.type
    ) &&
    !(
      ["pointercancel", "contextmenu"].includes(i.type) &&
      (s.browser.isSafari || s.browser.isWebView)
    )
  )
    return;
  (t.pointerId = null), (t.touchId = null);
  const {
    params: l,
    touches: o,
    rtlTranslate: a,
    slidesGrid: d,
    enabled: u,
  } = s;
  if (!u || (!l.simulateTouch && i.pointerType === "mouse")) return;
  if (
    (t.allowTouchCallbacks && s.emit("touchEnd", i),
    (t.allowTouchCallbacks = !1),
    !t.isTouched)
  ) {
    t.isMoved && l.grabCursor && s.setGrabCursor(!1),
      (t.isMoved = !1),
      (t.startMoving = !1);
    return;
  }
  l.grabCursor &&
    t.isMoved &&
    t.isTouched &&
    (s.allowSlideNext === !0 || s.allowSlidePrev === !0) &&
    s.setGrabCursor(!1);
  const f = Q(),
    p = f - t.touchStartTime;
  if (s.allowClick) {
    const S = i.path || (i.composedPath && i.composedPath());
    s.updateClickedSlide((S && S[0]) || i.target, S),
      s.emit("tap click", i),
      p < 300 &&
        f - t.lastClickTime < 300 &&
        s.emit("doubleTap doubleClick", i);
  }
  if (
    ((t.lastClickTime = Q()),
    Te(() => {
      s.destroyed || (s.allowClick = !0);
    }),
    !t.isTouched ||
      !t.isMoved ||
      !s.swipeDirection ||
      (o.diff === 0 && !t.loopSwapReset) ||
      (t.currentTranslate === t.startTranslate && !t.loopSwapReset))
  ) {
    (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
    return;
  }
  (t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
  let c;
  if (
    (l.followFinger
      ? (c = a ? s.translate : -s.translate)
      : (c = -t.currentTranslate),
    l.cssMode)
  )
    return;
  if (l.freeMode && l.freeMode.enabled) {
    s.freeMode.onTouchEnd({ currentPos: c });
    return;
  }
  const m = c >= -s.maxTranslate() && !s.params.loop;
  let h = 0,
    C = s.slidesSizesGrid[0];
  for (
    let S = 0;
    S < d.length;
    S += S < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup
  ) {
    const E = S < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    typeof d[S + E] < "u"
      ? (m || (c >= d[S] && c < d[S + E])) && ((h = S), (C = d[S + E] - d[S]))
      : (m || c >= d[S]) && ((h = S), (C = d[d.length - 1] - d[d.length - 2]));
  }
  let g = null,
    w = null;
  l.rewind &&
    (s.isBeginning
      ? (w =
          l.virtual && l.virtual.enabled && s.virtual
            ? s.virtual.slides.length - 1
            : s.slides.length - 1)
      : s.isEnd && (g = 0));
  const v = (c - d[h]) / C,
    x = h < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
  if (p > l.longSwipesMs) {
    if (!l.longSwipes) {
      s.slideTo(s.activeIndex);
      return;
    }
    s.swipeDirection === "next" &&
      (v >= l.longSwipesRatio
        ? s.slideTo(l.rewind && s.isEnd ? g : h + x)
        : s.slideTo(h)),
      s.swipeDirection === "prev" &&
        (v > 1 - l.longSwipesRatio
          ? s.slideTo(h + x)
          : w !== null && v < 0 && Math.abs(v) > l.longSwipesRatio
          ? s.slideTo(w)
          : s.slideTo(h));
  } else {
    if (!l.shortSwipes) {
      s.slideTo(s.activeIndex);
      return;
    }
    s.navigation &&
    (i.target === s.navigation.nextEl || i.target === s.navigation.prevEl)
      ? i.target === s.navigation.nextEl
        ? s.slideTo(h + x)
        : s.slideTo(h)
      : (s.swipeDirection === "next" && s.slideTo(g !== null ? g : h + x),
        s.swipeDirection === "prev" && s.slideTo(w !== null ? w : h));
  }
}
function ge() {
  const e = this,
    { params: s, el: t } = e;
  if (t && t.offsetWidth === 0) return;
  s.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e,
    l = e.virtual && e.params.virtual.enabled;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
  const o = l && s.loop;
  (s.slidesPerView === "auto" || s.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !o
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !l
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = n),
    (e.allowSlideNext = i),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function Ot(e) {
  const s = this;
  s.enabled &&
    (s.allowClick ||
      (s.params.preventClicks && e.preventDefault(),
      s.params.preventClicksPropagation &&
        s.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function zt() {
  const e = this,
    { wrapperEl: s, rtlTranslate: t, enabled: i } = e;
  if (!i) return;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -s.scrollLeft)
      : (e.translate = -s.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  let n;
  const r = e.maxTranslate() - e.minTranslate();
  r === 0 ? (n = 0) : (n = (e.translate - e.minTranslate()) / r),
    n !== e.progress && e.updateProgress(t ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
function At(e) {
  const s = this;
  K(s, e.target),
    !(
      s.params.cssMode ||
      (s.params.slidesPerView !== "auto" && !s.params.autoHeight)
    ) && s.update();
}
function kt() {
  const e = this;
  e.documentTouchHandlerProceeded ||
    ((e.documentTouchHandlerProceeded = !0),
    e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const Pe = (e, s) => {
  const t = j(),
    { params: i, el: n, wrapperEl: r, device: l } = e,
    o = !!i.nested,
    a = s === "on" ? "addEventListener" : "removeEventListener",
    d = s;
  !n ||
    typeof n == "string" ||
    (t[a]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
    n[a]("touchstart", e.onTouchStart, { passive: !1 }),
    n[a]("pointerdown", e.onTouchStart, { passive: !1 }),
    t[a]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
    t[a]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
    t[a]("touchend", e.onTouchEnd, { passive: !0 }),
    t[a]("pointerup", e.onTouchEnd, { passive: !0 }),
    t[a]("pointercancel", e.onTouchEnd, { passive: !0 }),
    t[a]("touchcancel", e.onTouchEnd, { passive: !0 }),
    t[a]("pointerout", e.onTouchEnd, { passive: !0 }),
    t[a]("pointerleave", e.onTouchEnd, { passive: !0 }),
    t[a]("contextmenu", e.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      n[a]("click", e.onClick, !0),
    i.cssMode && r[a]("scroll", e.onScroll),
    i.updateOnWindowResize
      ? e[d](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          ge,
          !0
        )
      : e[d]("observerUpdate", ge, !0),
    n[a]("load", e.onLoad, { capture: !0 }));
};
function Gt() {
  const e = this,
    { params: s } = e;
  (e.onTouchStart = Ct.bind(e)),
    (e.onTouchMove = It.bind(e)),
    (e.onTouchEnd = Lt.bind(e)),
    (e.onDocumentTouchStart = kt.bind(e)),
    s.cssMode && (e.onScroll = zt.bind(e)),
    (e.onClick = Ot.bind(e)),
    (e.onLoad = At.bind(e)),
    Pe(e, "on");
}
function Vt() {
  Pe(this, "off");
}
var Dt = { attachEvents: Gt, detachEvents: Vt };
const ve = (e, s) => e.grid && s.grid && s.grid.rows > 1;
function _t() {
  const e = this,
    { realIndex: s, initialized: t, params: i, el: n } = e,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const l = j(),
    o =
      i.breakpointsBase === "window" || !i.breakpointsBase
        ? i.breakpointsBase
        : "container",
    a =
      ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase
        ? e.el
        : l.querySelector(i.breakpointsBase),
    d = e.getBreakpoint(r, o, a);
  if (!d || e.currentBreakpoint === d) return;
  const f = (d in r ? r[d] : void 0) || e.originalParams,
    p = ve(e, i),
    c = ve(e, f),
    m = e.params.grabCursor,
    h = f.grabCursor,
    C = i.enabled;
  p && !c
    ? (n.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !p &&
      c &&
      (n.classList.add(`${i.containerModifierClass}grid`),
      ((f.grid.fill && f.grid.fill === "column") ||
        (!f.grid.fill && i.grid.fill === "column")) &&
        n.classList.add(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    m && !h ? e.unsetGrabCursor() : !m && h && e.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach((E) => {
      if (typeof f[E] > "u") return;
      const I = i[E] && i[E].enabled,
        T = f[E] && f[E].enabled;
      I && !T && e[E].disable(), !I && T && e[E].enable();
    });
  const g = f.direction && f.direction !== i.direction,
    w = i.loop && (f.slidesPerView !== i.slidesPerView || g),
    v = i.loop;
  g && t && e.changeDirection(), N(e.params, f);
  const x = e.params.enabled,
    S = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    C && !x ? e.disable() : !C && x && e.enable(),
    (e.currentBreakpoint = d),
    e.emit("_beforeBreakpoint", f),
    t &&
      (w
        ? (e.loopDestroy(), e.loopCreate(s), e.updateSlides())
        : !v && S
        ? (e.loopCreate(s), e.updateSlides())
        : v && !S && e.loopDestroy()),
    e.emit("breakpoint", f);
}
function Bt(e, s = "window", t) {
  if (!e || (s === "container" && !t)) return;
  let i = !1;
  const n = F(),
    r = s === "window" ? n.innerHeight : t.clientHeight,
    l = Object.keys(e).map((o) => {
      if (typeof o == "string" && o.indexOf("@") === 0) {
        const a = parseFloat(o.substr(1));
        return { value: r * a, point: o };
      }
      return { value: o, point: o };
    });
  l.sort((o, a) => parseInt(o.value, 10) - parseInt(a.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const { point: a, value: d } = l[o];
    s === "window"
      ? n.matchMedia(`(min-width: ${d}px)`).matches && (i = a)
      : d <= t.clientWidth && (i = a);
  }
  return i || "max";
}
var Ft = { setBreakpoint: _t, getBreakpoint: Bt };
function Nt(e, s) {
  const t = [];
  return (
    e.forEach((i) => {
      typeof i == "object"
        ? Object.keys(i).forEach((n) => {
            i[n] && t.push(s + n);
          })
        : typeof i == "string" && t.push(s + i);
    }),
    t
  );
}
function $t() {
  const e = this,
    { classNames: s, params: t, rtl: i, el: n, device: r } = e,
    l = Nt(
      [
        "initialized",
        t.direction,
        { "free-mode": e.params.freeMode && t.freeMode.enabled },
        { autoheight: t.autoHeight },
        { rtl: i },
        { grid: t.grid && t.grid.rows > 1 },
        {
          "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column",
        },
        { android: r.android },
        { ios: r.ios },
        { "css-mode": t.cssMode },
        { centered: t.cssMode && t.centeredSlides },
        { "watch-progress": t.watchSlidesProgress },
      ],
      t.containerModifierClass
    );
  s.push(...l), n.classList.add(...s), e.emitContainerClasses();
}
function Rt() {
  const e = this,
    { el: s, classNames: t } = e;
  !s ||
    typeof s == "string" ||
    (s.classList.remove(...t), e.emitContainerClasses());
}
var Ht = { addClasses: $t, removeClasses: Rt };
function Wt() {
  const e = this,
    { isLocked: s, params: t } = e,
    { slidesOffsetBefore: i } = t;
  if (i) {
    const n = e.slides.length - 1,
      r = e.slidesGrid[n] + e.slidesSizesGrid[n] + i * 2;
    e.isLocked = e.size > r;
  } else e.isLocked = e.snapGrid.length === 1;
  t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    s && s !== e.isLocked && (e.isEnd = !1),
    s !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var jt = { checkOverflow: Wt },
  we = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function qt(e, s) {
  return function (i = {}) {
    const n = Object.keys(i)[0],
      r = i[n];
    if (typeof r != "object" || r === null) {
      N(s, i);
      return;
    }
    if (
      (e[n] === !0 && (e[n] = { enabled: !0 }),
      n === "navigation" &&
        e[n] &&
        e[n].enabled &&
        !e[n].prevEl &&
        !e[n].nextEl &&
        (e[n].auto = !0),
      ["pagination", "scrollbar"].indexOf(n) >= 0 &&
        e[n] &&
        e[n].enabled &&
        !e[n].el &&
        (e[n].auto = !0),
      !(n in e && "enabled" in r))
    ) {
      N(s, i);
      return;
    }
    typeof e[n] == "object" && !("enabled" in e[n]) && (e[n].enabled = !0),
      e[n] || (e[n] = { enabled: !1 }),
      N(s, i);
  };
}
const ne = {
    eventsEmitter: He,
    update: et,
    translate: at,
    transition: ct,
    slide: wt,
    loop: yt,
    grabCursor: Mt,
    events: Dt,
    breakpoints: Ft,
    checkOverflow: jt,
    classes: Ht,
  },
  ae = {};
class $ {
  constructor(...s) {
    let t, i;
    s.length === 1 &&
    s[0].constructor &&
    Object.prototype.toString.call(s[0]).slice(8, -1) === "Object"
      ? (i = s[0])
      : ([t, i] = s),
      i || (i = {}),
      (i = N({}, i)),
      t && !i.el && (i.el = t);
    const n = j();
    if (
      i.el &&
      typeof i.el == "string" &&
      n.querySelectorAll(i.el).length > 1
    ) {
      const a = [];
      return (
        n.querySelectorAll(i.el).forEach((d) => {
          const u = N({}, i, { el: d });
          a.push(new $(u));
        }),
        a
      );
    }
    const r = this;
    (r.__swiper__ = !0),
      (r.support = ye()),
      (r.device = xe({ userAgent: i.userAgent })),
      (r.browser = Ee()),
      (r.eventsListeners = {}),
      (r.eventsAnyListeners = []),
      (r.modules = [...r.__modules__]),
      i.modules && Array.isArray(i.modules) && r.modules.push(...i.modules);
    const l = {};
    r.modules.forEach((a) => {
      a({
        params: i,
        swiper: r,
        extendParams: qt(i, l),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r),
      });
    });
    const o = N({}, we, l);
    return (
      (r.params = N({}, o, ae, i)),
      (r.originalParams = N({}, r.params)),
      (r.passedParams = N({}, i)),
      r.params &&
        r.params.on &&
        Object.keys(r.params.on).forEach((a) => {
          r.on(a, r.params.on[a]);
        }),
      r.params && r.params.onAny && r.onAny(r.params.onAny),
      Object.assign(r, {
        enabled: r.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return r.params.direction === "horizontal";
        },
        isVertical() {
          return r.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: r.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: r.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      r.emit("_swiper"),
      r.params.init && r.init(),
      r
    );
  }
  getDirectionLabel(s) {
    return this.isHorizontal()
      ? s
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[s];
  }
  getSlideIndex(s) {
    const { slidesEl: t, params: i } = this,
      n = H(t, `.${i.slideClass}, swiper-slide`),
      r = ue(n[0]);
    return ue(s) - r;
  }
  getSlideIndexByData(s) {
    return this.getSlideIndex(
      this.slides.find(
        (t) => t.getAttribute("data-swiper-slide-index") * 1 === s
      )
    );
  }
  getSlideIndexWhenGrid(s) {
    return (
      this.grid &&
        this.params.grid &&
        this.params.grid.rows > 1 &&
        (this.params.grid.fill === "column"
          ? (s = Math.floor(s / this.params.grid.rows))
          : this.params.grid.fill === "row" &&
            (s = s % Math.ceil(this.slides.length / this.params.grid.rows))),
      s
    );
  }
  recalcSlides() {
    const s = this,
      { slidesEl: t, params: i } = s;
    s.slides = H(t, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const s = this;
    s.enabled ||
      ((s.enabled = !0),
      s.params.grabCursor && s.setGrabCursor(),
      s.emit("enable"));
  }
  disable() {
    const s = this;
    s.enabled &&
      ((s.enabled = !1),
      s.params.grabCursor && s.unsetGrabCursor(),
      s.emit("disable"));
  }
  setProgress(s, t) {
    const i = this;
    s = Math.min(Math.max(s, 0), 1);
    const n = i.minTranslate(),
      l = (i.maxTranslate() - n) * s + n;
    i.translateTo(l, typeof t > "u" ? 0 : t),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const s = this;
    if (!s.params._emitClasses || !s.el) return;
    const t = s.el.className
      .split(" ")
      .filter(
        (i) =>
          i.indexOf("swiper") === 0 ||
          i.indexOf(s.params.containerModifierClass) === 0
      );
    s.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(s) {
    const t = this;
    return t.destroyed
      ? ""
      : s.className
          .split(" ")
          .filter(
            (i) =>
              i.indexOf("swiper-slide") === 0 ||
              i.indexOf(t.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const s = this;
    if (!s.params._emitClasses || !s.el) return;
    const t = [];
    s.slides.forEach((i) => {
      const n = s.getSlideClasses(i);
      t.push({ slideEl: i, classNames: n }), s.emit("_slideClass", i, n);
    }),
      s.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(s = "current", t = !1) {
    const i = this,
      {
        params: n,
        slides: r,
        slidesGrid: l,
        slidesSizesGrid: o,
        size: a,
        activeIndex: d,
      } = i;
    let u = 1;
    if (typeof n.slidesPerView == "number") return n.slidesPerView;
    if (n.centeredSlides) {
      let f = r[d] ? Math.ceil(r[d].swiperSlideSize) : 0,
        p;
      for (let c = d + 1; c < r.length; c += 1)
        r[c] &&
          !p &&
          ((f += Math.ceil(r[c].swiperSlideSize)), (u += 1), f > a && (p = !0));
      for (let c = d - 1; c >= 0; c -= 1)
        r[c] &&
          !p &&
          ((f += r[c].swiperSlideSize), (u += 1), f > a && (p = !0));
    } else if (s === "current")
      for (let f = d + 1; f < r.length; f += 1)
        (t ? l[f] + o[f] - l[d] < a : l[f] - l[d] < a) && (u += 1);
    else for (let f = d - 1; f >= 0; f -= 1) l[d] - l[f] < a && (u += 1);
    return u;
  }
  update() {
    const s = this;
    if (!s || s.destroyed) return;
    const { snapGrid: t, params: i } = s;
    i.breakpoints && s.setBreakpoint(),
      [...s.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
        l.complete && K(s, l);
      }),
      s.updateSize(),
      s.updateSlides(),
      s.updateProgress(),
      s.updateSlidesClasses();
    function n() {
      const l = s.rtlTranslate ? s.translate * -1 : s.translate,
        o = Math.min(Math.max(l, s.maxTranslate()), s.minTranslate());
      s.setTranslate(o), s.updateActiveIndex(), s.updateSlidesClasses();
    }
    let r;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      n(), i.autoHeight && s.updateAutoHeight();
    else {
      if (
        (i.slidesPerView === "auto" || i.slidesPerView > 1) &&
        s.isEnd &&
        !i.centeredSlides
      ) {
        const l = s.virtual && i.virtual.enabled ? s.virtual.slides : s.slides;
        r = s.slideTo(l.length - 1, 0, !1, !0);
      } else r = s.slideTo(s.activeIndex, 0, !1, !0);
      r || n();
    }
    i.watchOverflow && t !== s.snapGrid && s.checkOverflow(), s.emit("update");
  }
  changeDirection(s, t = !0) {
    const i = this,
      n = i.params.direction;
    return (
      s || (s = n === "horizontal" ? "vertical" : "horizontal"),
      s === n ||
        (s !== "horizontal" && s !== "vertical") ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${n}`),
        i.el.classList.add(`${i.params.containerModifierClass}${s}`),
        i.emitContainerClasses(),
        (i.params.direction = s),
        i.slides.forEach((r) => {
          s === "vertical" ? (r.style.width = "") : (r.style.height = "");
        }),
        i.emit("changeDirection"),
        t && i.update()),
      i
    );
  }
  changeLanguageDirection(s) {
    const t = this;
    (t.rtl && s === "rtl") ||
      (!t.rtl && s === "ltr") ||
      ((t.rtl = s === "rtl"),
      (t.rtlTranslate = t.params.direction === "horizontal" && t.rtl),
      t.rtl
        ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "rtl"))
        : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "ltr")),
      t.update());
  }
  mount(s) {
    const t = this;
    if (t.mounted) return !0;
    let i = s || t.params.el;
    if ((typeof i == "string" && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = t),
      i.parentNode &&
        i.parentNode.host &&
        i.parentNode.host.nodeName ===
          t.params.swiperElementNodeName.toUpperCase() &&
        (t.isElement = !0);
    const n = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l =
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(n())
        : H(i, n())[0];
    return (
      !l &&
        t.params.createElements &&
        ((l = le("div", t.params.wrapperClass)),
        i.append(l),
        H(i, `.${t.params.slideClass}`).forEach((o) => {
          l.append(o);
        })),
      Object.assign(t, {
        el: i,
        wrapperEl: l,
        slidesEl:
          t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : l,
        hostEl: t.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === "rtl" || W(i, "direction") === "rtl",
        rtlTranslate:
          t.params.direction === "horizontal" &&
          (i.dir.toLowerCase() === "rtl" || W(i, "direction") === "rtl"),
        wrongRTL: W(l, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(s) {
    const t = this;
    if (t.initialized || t.mount(s) === !1) return t;
    t.emit("beforeInit"),
      t.params.breakpoints && t.setBreakpoint(),
      t.addClasses(),
      t.updateSize(),
      t.updateSlides(),
      t.params.watchOverflow && t.checkOverflow(),
      t.params.grabCursor && t.enabled && t.setGrabCursor(),
      t.params.loop && t.virtual && t.params.virtual.enabled
        ? t.slideTo(
            t.params.initialSlide + t.virtual.slidesBefore,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          )
        : t.slideTo(
            t.params.initialSlide,
            0,
            t.params.runCallbacksOnInit,
            !1,
            !0
          ),
      t.params.loop && t.loopCreate(void 0, !0),
      t.attachEvents();
    const n = [...t.el.querySelectorAll('[loading="lazy"]')];
    return (
      t.isElement && n.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
      n.forEach((r) => {
        r.complete
          ? K(t, r)
          : r.addEventListener("load", (l) => {
              K(t, l.target);
            });
      }),
      oe(t),
      (t.initialized = !0),
      oe(t),
      t.emit("init"),
      t.emit("afterInit"),
      t
    );
  }
  destroy(s = !0, t = !0) {
    const i = this,
      { params: n, el: r, wrapperEl: l, slides: o } = i;
    return (
      typeof i.params > "u" ||
        i.destroyed ||
        (i.emit("beforeDestroy"),
        (i.initialized = !1),
        i.detachEvents(),
        n.loop && i.loopDestroy(),
        t &&
          (i.removeClasses(),
          r && typeof r != "string" && r.removeAttribute("style"),
          l && l.removeAttribute("style"),
          o &&
            o.length &&
            o.forEach((a) => {
              a.classList.remove(
                n.slideVisibleClass,
                n.slideFullyVisibleClass,
                n.slideActiveClass,
                n.slideNextClass,
                n.slidePrevClass
              ),
                a.removeAttribute("style"),
                a.removeAttribute("data-swiper-slide-index");
            })),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach((a) => {
          i.off(a);
        }),
        s !== !1 &&
          (i.el && typeof i.el != "string" && (i.el.swiper = null), Le(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(s) {
    N(ae, s);
  }
  static get extendedDefaults() {
    return ae;
  }
  static get defaults() {
    return we;
  }
  static installModule(s) {
    $.prototype.__modules__ || ($.prototype.__modules__ = []);
    const t = $.prototype.__modules__;
    typeof s == "function" && t.indexOf(s) < 0 && t.push(s);
  }
  static use(s) {
    return Array.isArray(s)
      ? (s.forEach((t) => $.installModule(t)), $)
      : ($.installModule(s), $);
  }
}
Object.keys(ne).forEach((e) => {
  Object.keys(ne[e]).forEach((s) => {
    $.prototype[s] = ne[e][s];
  });
});
$.use([$e, Re]);
typeof window < "u" &&
  window.SwiperElementRegisterParams &&
  window.SwiperElementRegisterParams(["materialEffect"]);
function Yt(e, s) {
  function t(i) {
    i.target === e && (s.call(e, i), e.removeEventListener("transitionend", t));
  }
  s && e.addEventListener("transitionend", t);
}
function Xt({ swiper: e, duration: s, transformElements: t, allSlides: i }) {
  const { activeIndex: n } = e,
    r = (l) =>
      l.parentElement
        ? l.parentElement
        : e.slides.filter(
            (a) => a.shadowRoot && a.shadowRoot === l.parentNode
          )[0];
  if (e.params.virtualTranslate && s !== 0) {
    let l = !1,
      o;
    i
      ? (o = t)
      : (o = t.filter((a) => {
          const d = a.classList.contains("swiper-slide-transform") ? r(a) : a;
          return e.getSlideIndex(d) === n;
        })),
      o.forEach((a) => {
        Yt(a, () => {
          if (l || !e || e.destroyed) return;
          (l = !0), (e.animating = !1);
          const d = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(d);
        });
      });
  }
}
function Ut({ swiper: e, on: s, extendParams: t }) {
  t({ materialEffect: { slideSplitRatio: 0.65 } });
  const i = () => {
      const {
          slides: r,
          slidesSizesGrid: l,
          params: o,
          size: a,
          rtlTranslate: d,
        } = e,
        { spaceBetween: u, cssMode: f, centeredSlides: p } = o;
      let { slidesPerView: c } = o;
      const { slideSplitRatio: m } = o.materialEffect,
        h = p && Math.ceil(c) % 2 === 1 && Math.ceil(c) - Math.floor(c) === 1;
      h && (c = Math.floor(c));
      const C = p && parseInt(c, 10) !== c,
        g = p ? Math.ceil(c) : c,
        w = p && g % 2 === 1,
        v = p && g % 2 === 0,
        x = d ? -1 : 1;
      let S = p
          ? C
            ? (c - Math.floor(c)) / 2
            : 0.5
          : Math.min(Math.max(m, 0), 1),
        E = p
          ? C
            ? (c - Math.floor(c)) / 2
            : 0.5
          : 1 - Math.min(Math.max(m, 0), 1),
        I = C ? 0.5 + (0.5 - E) : E;
      if (h) {
        const T = Math.floor(o.slidesPerView) - 1;
        (S = (o.slidesPerView - T) / 2), (E = S), (I = 0.5 + (0.5 - E));
      }
      for (let T = 0; T < r.length; T += 1) {
        const k = r[T],
          y = k.querySelector(".swiper-material-wrapper"),
          b = k.querySelectorAll(".swiper-material-animate-opacity"),
          L = k.querySelectorAll("[data-swiper-material-scale]"),
          P = -k.progress + (d && !p ? c - 1 : 0),
          B =
            k.swiperSlideOffset -
            (d ? (e.slidesSizesGrid[0] + u) * (c - 1) : 0),
          _ = e.translate;
        let O,
          V = 0,
          M = 0;
        const A = l[T],
          z = E === 0 && !p ? 0 : u / A,
          R = f ? _ : 0;
        if (P <= 0)
          if (p && c > 1) {
            if (
              (P <= 0 && P >= -(g - 2) && ((V = _), (O = 1), (M = 1)),
              w && P < -(g - Math.ceil(g / 2)))
            ) {
              const D = Math.ceil(g / 2) - Math.abs(P);
              (O = D), (M = O ** 4), (V = _ + A * (1 - D) * (1 + z * 2) * x);
            }
            if (v && P < -(g / 2 - 1) && P >= -(g / 2)) {
              const D = g / 2 - Math.abs(P);
              (O = S - z + (I + z * 2) * (g / 2 - Math.abs(P))),
                (M = ((O - S) / (1 - S)) ** 4),
                (V = _ + A * (I + z) * (1 - D) * x);
            }
            if (v && P < -g / 2) {
              let D = g / 2 + 1 - Math.abs(P);
              (O = 0),
                D >= 0 &&
                  ((D = -z * 2 + D * (1 + z * 2)),
                  (D = Math.max(Math.min(D, 1), 0)),
                  (O = (E - z) * D)),
                (V = _ + A * x * (I + z) * (2 - D) + A * x * (E - z) * (1 - D));
            }
          } else (O = 1 + P), (V = -B), (M = O ** 4);
        if (c === 1)
          P > 0 &&
            ((O = 1 - P), (V = -B + a * Math.min(P, 1) * x), (M = O ** 4));
        else {
          if (
            (P > 0 && P <= c - 2 && ((V = _), (O = 1), (M = 1)),
            v ? P > g / 2 - 1 && P <= g / 2 : P > g - 2 && P <= g - 1)
          ) {
            const G = v ? Math.floor(g / 2) : 1;
            (O = S - z + (I + z * 2) * (g - G - Math.abs(P))),
              (V = _),
              S === 1 ? (M = O ** 4) : (M = ((O - S) / (1 - S)) ** 4);
          }
          if (w && P > c - Math.ceil(c / 2)) {
            const G = Math.ceil(c / 2) - (c - Math.abs(P));
            (V = _ - A * (z * 2) * G), (O = 1 - G), (M = O ** 4);
          }
          if (P > c - 1 && P <= c && !p) {
            const G = c - Math.abs(P),
              Y = S - z,
              ce = E - z;
            (O = ce + (Y - ce) * G),
              (V = _ - A * (E + z) * (1 - G) * x),
              E === 0 && (M = O ** 4);
          }
          if (P > (p ? g / 2 : g) && !w) {
            let G = (p ? g / 2 + 1 : g + 1) - Math.abs(P),
              Y = 0;
            (O = 0),
              G >= 0 &&
                ((G = -z * 2 + G * (1 + z * 2)),
                (G = Math.max(Math.min(G, 1), 0)),
                (O = (E - z) * G),
                (Y = -G * (E + z) * A + G * u * (C ? 2 : 1))),
              (V = -B + (a * Math.min(P, 1) + Y) * x),
              (M = 0);
          }
        }
        O < 0 && (O = 0),
          O > 1 && (O = 1),
          O === 0 && (O = 1e-5),
          k.style.setProperty("--swiper-material-scale", O),
          k.style.setProperty("--swiper-material-opacity", M),
          b.forEach((D) => {
            D.style.opacity = M;
          }),
          L.forEach((D) => {
            let G = parseFloat(D.getAttribute("data-swiper-material-scale"));
            (Number.isNaN(G) || (!G && G !== 0)) && (G = 1),
              (D.style.transform = `scale(${1 + (G - 1) * (1 - O)})`);
          }),
          e.isHorizontal()
            ? ((y.style.width = `${100 * O}%`),
              (y.style.transform = `translate3d(${
                V - R + (d ? (1 - O) * A : 0)
              }px, 0, 0)`))
            : ((y.style.height = `${100 * O}%`),
              (y.style.transform = `translate3d(0, ${V - R}px, 0)`));
      }
    },
    n = (r) => {
      const { slides: l } = e,
        o = [];
      for (let a = 0; a < l.length; a += 1) {
        const d = l[a],
          u = d.querySelector(".swiper-material-wrapper"),
          f = d.querySelectorAll(".swiper-material-animate-opacity"),
          p = d.querySelectorAll("[data-swiper-material-scale]");
        [u, ...p, ...f].forEach((c) => {
          c.style.transitionDuration = `${r}ms`;
        }),
          o.push(u);
      }
      Xt({ swiper: e, duration: r, transformElements: o, allSlides: !0 });
    };
  s("beforeInit", () => {
    if (e.params.effect !== "material") return;
    e.classNames.push(`${e.params.containerModifierClass}material`),
      e.isElement &&
        e.hostEl &&
        e.hostEl.classList.add(`swiper-${e.params.direction}`);
    const r = {
      loopAdditionalSlides: 1,
      watchSlidesProgress: !0,
      virtualTranslate: !e.params.cssMode,
    };
    Object.assign(e.params, r), Object.assign(e.originalParams, r);
  }),
    s("setTranslate", () => {
      e.params.effect === "material" && i();
    }),
    s("setTransition", (r, l) => {
      e.params.effect === "material" && n(l);
    }),
    s("slidesUpdated", () => {
      if (
        !e.params.centeredSlides &&
        e.params.slidesPerView > 1 &&
        !e.params.loop &&
        e.params.materialEffect.slideSplitRatio < 1
      ) {
        const r = e.snapGrid[e.snapGrid.length - 1];
        e.snapGrid.push(r + e.slidesSizesGrid[0] + e.params.spaceBetween);
      }
      (e.__preventObserver__ = !0),
        e.el.style.setProperty(
          "--swiper-material-slide-size",
          `${e.slidesSizesGrid[0]}px`
        ),
        requestAnimationFrame(() => {
          e.__preventObserver__ = !1;
        });
    });
}
const Z = new $(".swiper", {
    modules: [Ut],
    effect: "material",
    materialEffect: { slideSplitRatio: 0.65 },
    grabCursor: !0,
    slidesPerView: 2,
    spaceBetween: 16,
    speed: 600,
  }),
  q = document.querySelector(".dropdown"),
  Kt = document.querySelector("input");