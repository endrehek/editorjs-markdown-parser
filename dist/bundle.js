function tr(e) {
  switch (e.level) {
    case 1:
      return `# ${e.text}
`;
    case 2:
      return `## ${e.text}
`;
    case 3:
      return `### ${e.text}
`;
    case 4:
      return `#### ${e.text}
`;
    case 5:
      return `##### ${e.text}
`;
    case 6:
    default:
      return `###### ${e.text}
`;
  }
}
function nr(e) {
  let n = {}, t = "";
  return e.children.forEach((r) => {
    r.type === "text" ? t += r.value : r.type === "emphasis" ? t += `<i>${r.children[0].value}<i>` : r.type === "strong" ? t += `<b>${r.children[0].value}<b>` : r.type === "strongEmphasis" ? t += `<b><i>${r.children[0].value}<i><b>` : r.type === "link" ? t += `<a href="${r.url}">${r.children[0].value}</a>` : r.type === "inlineCode" && (t += `<code class="inline-code">${r.value}</code>`);
  }), n = {
    data: {
      level: e.depth,
      text: t
    },
    type: "header"
  }, n;
}
function rr(e) {
  return `${e.text}
`;
}
function It(e) {
  const n = {
    data: {
      text: ""
    },
    type: "paragraph"
  };
  return e.type === "paragraph" && e.children.forEach((t) => {
    t.type === "text" ? n.data.text += t.value : t.type === "emphasis" ? n.data.text += `<i>${t.children[0].value}<i>` : t.type === "strong" ? n.data.text += `<b>${t.children[0].value}<b>` : t.type === "strongEmphasis" ? n.data.text += `<b><i>${t.children[0].value}<i><b>` : t.type === "link" ? n.data.text += `<a href="${t.url}">${t.children[0].value}</a>` : t.type === "inlineCode" && (n.data.text += `<code class="inline-code">${t.value}</code>`);
  }), n;
}
function ir(e) {
  let n = [];
  switch (e.style) {
    case "unordered":
    default:
      return n = e.items.map((t) => `- ${t}`), `
${n.join(`
`)}
`;
    case "ordered":
      return n = e.items.map((t, r) => `${r + 1}. ${t}`), `
${n.join(`
`)}
`;
  }
}
function ar(e) {
  const n = [];
  return e.children.forEach((r) => {
    r.children.forEach((i) => {
      let l = "";
      i.children.forEach((a) => {
        a.type === "text" ? l += a.value : a.type === "emphasis" ? l += `<i>${a.children[0].value}<i>` : a.type === "strong" ? l += `<b>${a.children[0].value}<b>` : a.type === "strongEmphasis" ? l += `<b><i>${a.children[0].value}<i><b>` : a.type === "link" ? l += `<a href="${a.url}">${a.children[0].value}</a>` : a.type === "inlineCode" && (l += `<code class="inline-code">${a.value}</code>`);
      }), n.push(l);
    });
  }), {
    data: {
      items: n,
      style: e.ordered ? "ordered" : "unordered"
    },
    type: "list"
  };
}
function lr() {
  return "---".concat(`
`);
}
function or() {
  let e = {};
  return e = {
    data: {
      items: []
    },
    type: "delimiter"
  }, e;
}
function ur(e) {
  return `![${e.caption}](${e.file.url})`.concat(`
`);
}
function Et(e) {
  let n = {};
  return n = e.items.map((t) => t.checked === !0 ? `- [x] ${t.text}` : `- [ ] ${t.text}`), n.join(`
`);
}
function sr(e) {
  return `> ${e.text}
`;
}
function cr(e) {
  let n = {};
  return e.children.forEach((t) => {
    t.children.forEach((r) => {
      r.type === "text" && (n = {
        data: {
          alignment: "left",
          caption: "",
          text: r.value
        },
        type: "quote"
      });
    });
  }), n;
}
function hr(e) {
  return `\`\`\`${e.language}
${e.code}
\`\`\`
`;
}
function fr(e) {
  return {
    data: {
      code: e.value,
      language: e.lang || ""
    },
    type: "code"
  };
}
function pr(e) {
  return `[${e.meta.title}](${e.link})
`;
}
function dr(e) {
  return {
    data: {
      text: `<a href="${e.url}">${e.children[0].value}</a>`
    },
    type: "paragraph"
  };
}
function mr(e) {
  const { content: n } = e;
  let t = "";
  const r = n[0], i = `| ${r.join(" | ")} |`, l = `| ${r.map(() => "---").join(" | ")} |`;
  return t += `${i}
${l}
`, n.shift(), n.forEach((a) => {
    const o = `| ${a.join(" | ")} |`;
    t += `${o}
`;
  }), t;
}
function gr(e) {
  const n = {
    data: {
      withHeadings: !0,
      stretched: !1,
      content: []
    },
    type: "table"
  };
  return e.children.forEach((t) => {
    if (t.type === "tableRow") {
      const r = [];
      t.children.forEach((i) => {
        if (i.type === "tableCell" && i.children) {
          const l = i.children.find(
            (a) => a.type === "text"
          ).value;
          r.push(l);
        }
      }), n.data.content.push(r);
    }
  }), n;
}
function kr(e, n) {
  const t = new File([e], { type: "text/markdown", endings: "transparent" }), r = URL.createObjectURL(t), i = document.createElement("a");
  document.body.appendChild(i), i.href = r, i.download = n, i.click(), window.URL.revokeObjectURL(r), document.body.removeChild(i);
}
async function en(e) {
  return e.map((t) => {
    switch (t.type) {
      case "header":
        return tr(t.data);
      case "paragraph":
      default:
        return rr(t.data);
      case "list":
        return ir(t.data);
      case "delimiter":
        return lr();
      case "image":
        return ur(t.data);
      case "quote":
        return sr(t.data);
      case "checkbox":
        return Et(t.data);
      case "code":
        return hr(t.data);
      case "checklist":
        return Et(t.data);
      case "linkTool":
        return pr(t.data);
      case "table":
        return mr(t.data);
    }
  }).join(`
`);
}
function xr() {
  const e = /* @__PURE__ */ new Date(), n = String(e.getDate()).padStart(2, "0"), t = String(e.getMonth() + 1).padStart(2, "0"), r = e.getFullYear(), i = e.getHours(), l = e.getMinutes(), a = e.getSeconds();
  return `_${n}-${t}-${r}_${i}-${l}-${a}`;
}
async function br(e) {
  return await en(e);
}
class yr {
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * creates the Parser plugin
   * {editorData, api functions} - necessary to interact with the editor
   */
  constructor({ data: n, api: t, config: r }) {
    this.data = n, this.api = t, this.config = r || {}, this.config.filename = this.config.filename || "download", this.config.extension = this.config.extension || "md";
  }
  /**
   * @return Plugin data such as title and icon
   */
  static get toolbox() {
    return {
      title: "Download Markdown",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(112, 118, 132)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'
    };
  }
  /**
   * @return empty div and run the export funtion
   */
  async render() {
    const n = document.createElement("div"), t = await this.api.saver.save(), r = await br(t.blocks);
    return this.download(r), n;
  }
  /**
   * Function which takes parsed data and creates a markdown file download
   */
  async download(n) {
    const t = this.config.timestamp ? xr() : "";
    kr(n, `${this.config.filename}${t}.${this.config.extension}`), this.config.callback && this.config.callback(n);
  }
  /*
   * Saves the plugin data into JSON format (used as placeholder for UI)
  */
  save() {
    return {
      message: "Downloading Markdown"
    };
  }
}
const wr = {};
function ht(e, n) {
  const t = wr, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return tn(e, r, i);
}
function tn(e, n, t) {
  if (Cr(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Tt(e.children, n, t);
  }
  return Array.isArray(e) ? Tt(e, n, t) : "";
}
function Tt(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = tn(e[i], n, t);
  return r.join("");
}
function Cr(e) {
  return !!(e && typeof e == "object");
}
const At = document.createElement("i");
function ft(e) {
  const n = "&" + e + ";";
  At.innerHTML = n;
  const t = At.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t
  );
}
function J(e, n, t, r) {
  const i = e.length;
  let l = 0, a;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    a = Array.from(r), a.unshift(n, t), e.splice(...a);
  else
    for (t && e.splice(n, t); l < r.length; )
      a = r.slice(l, l + 1e4), a.unshift(n, 0), e.splice(...a), l += 1e4, n += 1e4;
}
function K(e, n) {
  return e.length > 0 ? (J(e, e.length, 0, n), e) : n;
}
const zt = {}.hasOwnProperty;
function nn(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Sr(n, e[t]);
  return n;
}
function Sr(e, n) {
  let t;
  for (t in n) {
    const i = (zt.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let a;
    if (l)
      for (a in l) {
        zt.call(i, a) || (i[a] = []);
        const o = l[a];
        Ir(
          // @ts-expect-error Looks like a list.
          i[a],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Ir(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  J(e, 0, 0, r);
}
function rn(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function re(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const W = de(/[A-Za-z]/), G = de(/[\dA-Za-z]/), Er = de(/[#-'*+\--9=?A-Z^-~]/);
function ve(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const rt = de(/\d/), Tr = de(/[\dA-Fa-f]/), Ar = de(/[!-/:-@[-`{-~]/);
function z(e) {
  return e !== null && e < -2;
}
function j(e) {
  return e !== null && (e < 0 || e === 32);
}
function _(e) {
  return e === -2 || e === -1 || e === 32;
}
const $e = de(new RegExp("\\p{P}|\\p{S}", "u")), be = de(/\s/);
function de(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function M(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return a;
  function a(s) {
    return _(s) ? (e.enter(t), o(s)) : n(s);
  }
  function o(s) {
    return _(s) && l++ < i ? (e.consume(s), o) : (e.exit(t), n(s));
  }
}
const zr = {
  tokenize: Fr
};
function Fr(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), M(e, n, "linePrefix");
  }
  function i(o) {
    return e.enter("paragraph"), l(o);
  }
  function l(o) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, a(o);
  }
  function a(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return z(o) ? (e.consume(o), e.exit("chunkText"), l) : (e.consume(o), a);
  }
}
const Lr = {
  tokenize: Dr
}, Ft = {
  tokenize: _r
};
function Dr(e) {
  const n = this, t = [];
  let r = 0, i, l, a;
  return o;
  function o(C) {
    if (r < t.length) {
      const L = t[r];
      return n.containerState = L[1], e.attempt(L[0].continuation, s, u)(C);
    }
    return u(C);
  }
  function s(C) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && E();
      const L = n.events.length;
      let D = L, y;
      for (; D--; )
        if (n.events[D][0] === "exit" && n.events[D][1].type === "chunkFlow") {
          y = n.events[D][1].end;
          break;
        }
      x(r);
      let B = L;
      for (; B < n.events.length; )
        n.events[B][1].end = {
          ...y
        }, B++;
      return J(n.events, D + 1, 0, n.events.slice(L)), n.events.length = B, u(C);
    }
    return o(C);
  }
  function u(C) {
    if (r === t.length) {
      if (!i)
        return p(C);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return g(C);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(Ft, h, c)(C);
  }
  function h(C) {
    return i && E(), x(r), p(C);
  }
  function c(C) {
    return n.parser.lazy[n.now().line] = r !== t.length, a = n.now().offset, g(C);
  }
  function p(C) {
    return n.containerState = {}, e.attempt(Ft, f, g)(C);
  }
  function f(C) {
    return r++, t.push([n.currentConstruct, n.containerState]), p(C);
  }
  function g(C) {
    if (C === null) {
      i && E(), x(0), e.consume(C);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), w(C);
  }
  function w(C) {
    if (C === null) {
      I(e.exit("chunkFlow"), !0), x(0), e.consume(C);
      return;
    }
    return z(C) ? (e.consume(C), I(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, o) : (e.consume(C), w);
  }
  function I(C, L) {
    const D = n.sliceStream(C);
    if (L && D.push(null), C.previous = l, l && (l.next = C), l = C, i.defineSkip(C.start), i.write(D), n.parser.lazy[C.start.line]) {
      let y = i.events.length;
      for (; y--; )
        if (
          // The token starts before the line ending…
          i.events[y][1].start.offset < a && // …and either is not ended yet…
          (!i.events[y][1].end || // …or ends after it.
          i.events[y][1].end.offset > a)
        )
          return;
      const B = n.events.length;
      let N = B, v, k;
      for (; N--; )
        if (n.events[N][0] === "exit" && n.events[N][1].type === "chunkFlow") {
          if (v) {
            k = n.events[N][1].end;
            break;
          }
          v = !0;
        }
      for (x(r), y = B; y < n.events.length; )
        n.events[y][1].end = {
          ...k
        }, y++;
      J(n.events, N + 1, 0, n.events.slice(B)), n.events.length = y;
    }
  }
  function x(C) {
    let L = t.length;
    for (; L-- > C; ) {
      const D = t[L];
      n.containerState = D[1], D[0].exit.call(n, e);
    }
    t.length = C;
  }
  function E() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function _r(e, n, t) {
  return M(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Ie(e) {
  if (e === null || j(e) || be(e))
    return 1;
  if ($e(e))
    return 2;
}
function je(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const it = {
  name: "attention",
  resolveAll: Pr,
  tokenize: Mr
};
function Pr(e, n) {
  let t = -1, r, i, l, a, o, s, u, h;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, p = {
            ...e[t][1].start
          };
          Lt(c, -s), Lt(p, s), a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: p
          }, l = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, i = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...a.start
            },
            end: {
              ...o.end
            }
          }, e[r][1].end = {
            ...a.start
          }, e[t][1].start = {
            ...o.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = K(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = K(u, [["enter", i, n], ["enter", a, n], ["exit", a, n], ["enter", l, n]]), u = K(u, je(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = K(u, [["exit", l, n], ["enter", o, n], ["exit", o, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (h = 2, u = K(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : h = 0, J(e, r - 1, t - r + 3, u), t = r + u.length - h - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Mr(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ie(r);
  let l;
  return a;
  function a(s) {
    return l = s, e.enter("attentionSequence"), o(s);
  }
  function o(s) {
    if (s === l)
      return e.consume(s), o;
    const u = e.exit("attentionSequence"), h = Ie(s), c = !h || h === 2 && i || t.includes(s), p = !i || i === 2 && h || t.includes(r);
    return u._open = !!(l === 42 ? c : c && (i || !p)), u._close = !!(l === 42 ? p : p && (h || !c)), n(s);
  }
}
function Lt(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Br = {
  name: "autolink",
  tokenize: Rr
};
function Rr(e, n, t) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(f) {
    return W(f) ? (e.consume(f), a) : f === 64 ? t(f) : u(f);
  }
  function a(f) {
    return f === 43 || f === 45 || f === 46 || G(f) ? (r = 1, o(f)) : u(f);
  }
  function o(f) {
    return f === 58 ? (e.consume(f), r = 0, s) : (f === 43 || f === 45 || f === 46 || G(f)) && r++ < 32 ? (e.consume(f), o) : (r = 0, u(f));
  }
  function s(f) {
    return f === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : f === null || f === 32 || f === 60 || ve(f) ? t(f) : (e.consume(f), s);
  }
  function u(f) {
    return f === 64 ? (e.consume(f), h) : Er(f) ? (e.consume(f), u) : t(f);
  }
  function h(f) {
    return G(f) ? c(f) : t(f);
  }
  function c(f) {
    return f === 46 ? (e.consume(f), r = 0, h) : f === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(f), e.exit("autolinkMarker"), e.exit("autolink"), n) : p(f);
  }
  function p(f) {
    if ((f === 45 || G(f)) && r++ < 63) {
      const g = f === 45 ? p : c;
      return e.consume(f), g;
    }
    return t(f);
  }
}
const De = {
  partial: !0,
  tokenize: vr
};
function vr(e, n, t) {
  return r;
  function r(l) {
    return _(l) ? M(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || z(l) ? n(l) : t(l);
  }
}
const an = {
  continuation: {
    tokenize: $r
  },
  exit: jr,
  name: "blockQuote",
  tokenize: Or
};
function Or(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    if (a === 62) {
      const o = r.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(a), e.exit("blockQuoteMarker"), l;
    }
    return t(a);
  }
  function l(a) {
    return _(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(a));
  }
}
function $r(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return _(a) ? M(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a) : l(a);
  }
  function l(a) {
    return e.attempt(an, n, t)(a);
  }
}
function jr(e) {
  e.exit("blockQuote");
}
const ln = {
  name: "characterEscape",
  tokenize: Nr
};
function Nr(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return Ar(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const on = {
  name: "characterReference",
  tokenize: Ur
};
function Ur(e, n, t) {
  const r = this;
  let i = 0, l, a;
  return o;
  function o(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
  }
  function s(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, a = G, h(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, a = Tr, h) : (e.enter("characterReferenceValue"), l = 7, a = rt, h(c));
  }
  function h(c) {
    if (c === 59 && i) {
      const p = e.exit("characterReferenceValue");
      return a === G && !ft(r.sliceSerialize(p)) ? t(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return a(c) && i++ < l ? (e.consume(c), h) : t(c);
  }
}
const Dt = {
  partial: !0,
  tokenize: qr
}, _t = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Hr
};
function Hr(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: D
  };
  let l = 0, a = 0, o;
  return s;
  function s(y) {
    return u(y);
  }
  function u(y) {
    const B = r.events[r.events.length - 1];
    return l = B && B[1].type === "linePrefix" ? B[2].sliceSerialize(B[1], !0).length : 0, o = y, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), h(y);
  }
  function h(y) {
    return y === o ? (a++, e.consume(y), h) : a < 3 ? t(y) : (e.exit("codeFencedFenceSequence"), _(y) ? M(e, c, "whitespace")(y) : c(y));
  }
  function c(y) {
    return y === null || z(y) ? (e.exit("codeFencedFence"), r.interrupt ? n(y) : e.check(Dt, w, L)(y)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(y));
  }
  function p(y) {
    return y === null || z(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(y)) : _(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), M(e, f, "whitespace")(y)) : y === 96 && y === o ? t(y) : (e.consume(y), p);
  }
  function f(y) {
    return y === null || z(y) ? c(y) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(y));
  }
  function g(y) {
    return y === null || z(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(y)) : y === 96 && y === o ? t(y) : (e.consume(y), g);
  }
  function w(y) {
    return e.attempt(i, L, I)(y);
  }
  function I(y) {
    return e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), x;
  }
  function x(y) {
    return l > 0 && _(y) ? M(e, E, "linePrefix", l + 1)(y) : E(y);
  }
  function E(y) {
    return y === null || z(y) ? e.check(Dt, w, L)(y) : (e.enter("codeFlowValue"), C(y));
  }
  function C(y) {
    return y === null || z(y) ? (e.exit("codeFlowValue"), E(y)) : (e.consume(y), C);
  }
  function L(y) {
    return e.exit("codeFenced"), n(y);
  }
  function D(y, B, N) {
    let v = 0;
    return k;
    function k(R) {
      return y.enter("lineEnding"), y.consume(R), y.exit("lineEnding"), T;
    }
    function T(R) {
      return y.enter("codeFencedFence"), _(R) ? M(y, A, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(R) : A(R);
    }
    function A(R) {
      return R === o ? (y.enter("codeFencedFenceSequence"), O(R)) : N(R);
    }
    function O(R) {
      return R === o ? (v++, y.consume(R), O) : v >= a ? (y.exit("codeFencedFenceSequence"), _(R) ? M(y, U, "whitespace")(R) : U(R)) : N(R);
    }
    function U(R) {
      return R === null || z(R) ? (y.exit("codeFencedFence"), B(R)) : N(R);
    }
  }
}
function qr(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return a === null ? t(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), l);
  }
  function l(a) {
    return r.parser.lazy[r.now().line] ? t(a) : n(a);
  }
}
const He = {
  name: "codeIndented",
  tokenize: Wr
}, Vr = {
  partial: !0,
  tokenize: Qr
};
function Wr(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), M(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const h = r.events[r.events.length - 1];
    return h && h[1].type === "linePrefix" && h[2].sliceSerialize(h[1], !0).length >= 4 ? a(u) : t(u);
  }
  function a(u) {
    return u === null ? s(u) : z(u) ? e.attempt(Vr, a, s)(u) : (e.enter("codeFlowValue"), o(u));
  }
  function o(u) {
    return u === null || z(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), o);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function Qr(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return r.parser.lazy[r.now().line] ? t(a) : z(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i) : M(e, l, "linePrefix", 5)(a);
  }
  function l(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? n(a) : z(a) ? i(a) : t(a);
  }
}
const Gr = {
  name: "codeText",
  previous: Zr,
  resolve: Yr,
  tokenize: Jr
};
function Yr(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Zr(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Jr(e, n, t) {
  let r = 0, i, l;
  return a;
  function a(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(c);
  }
  function o(c) {
    return c === 96 ? (e.consume(c), r++, o) : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null ? t(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), s) : c === 96 ? (l = e.enter("codeTextSequence"), i = 0, h(c)) : z(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || z(c) ? (e.exit("codeTextData"), s(c)) : (e.consume(c), u);
  }
  function h(c) {
    return c === 96 ? (e.consume(c), i++, h) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(c)) : (l.type = "codeTextData", u(c));
  }
}
class Kr {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && ze(this.left, r), l.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), ze(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), ze(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        ze(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        ze(this.left, t.reverse());
      }
  }
}
function ze(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function un(e) {
  const n = {};
  let t = -1, r, i, l, a, o, s, u;
  const h = new Kr(e);
  for (; ++t < h.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = h.get(t), t && r[1].type === "chunkFlow" && h.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Xr(h, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l--; )
        if (a = h.get(l), a[1].type === "lineEnding" || a[1].type === "lineEndingBlank")
          a[0] === "enter" && (i && (h.get(i)[1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = l);
        else if (!(a[1].type === "linePrefix" || a[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...h.get(i)[1].start
      }, o = h.slice(i, t), o.unshift(r), h.splice(i, t - i + 1, o));
    }
  }
  return J(e, 0, Number.POSITIVE_INFINITY, h.slice(0)), !u;
}
function Xr(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let a = t._tokenizer;
  a || (a = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (a._contentTypeTextTrailing = !0));
  const o = a.events, s = [], u = {};
  let h, c, p = -1, f = t, g = 0, w = 0;
  const I = [w];
  for (; f; ) {
    for (; e.get(++i)[1] !== f; )
      ;
    l.push(i), f._tokenizer || (h = r.sliceStream(f), f.next || h.push(null), c && a.defineSkip(f.start), f._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(h), f._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), c = f, f = f.next;
  }
  for (f = t; ++p < o.length; )
    // Find a void token that includes a break.
    o[p][0] === "exit" && o[p - 1][0] === "enter" && o[p][1].type === o[p - 1][1].type && o[p][1].start.line !== o[p][1].end.line && (w = p + 1, I.push(w), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (a.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : I.pop(), p = I.length; p--; ) {
    const x = o.slice(I[p], I[p + 1]), E = l.pop();
    s.push([E, E + x.length - 1]), e.splice(E, 2, x);
  }
  for (s.reverse(), p = -1; ++p < s.length; )
    u[g + s[p][0]] = g + s[p][1], g += s[p][1] - s[p][0] - 1;
  return u;
}
const ei = {
  resolve: ni,
  tokenize: ri
}, ti = {
  partial: !0,
  tokenize: ii
};
function ni(e) {
  return un(e), e;
}
function ri(e, n) {
  let t;
  return r;
  function r(o) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? l(o) : z(o) ? e.check(ti, a, l)(o) : (e.consume(o), i);
  }
  function l(o) {
    return e.exit("chunkContent"), e.exit("content"), n(o);
  }
  function a(o) {
    return e.consume(o), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function ii(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), M(e, l, "linePrefix");
  }
  function l(a) {
    if (a === null || z(a))
      return t(a);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? n(a) : e.interrupt(r.parser.constructs.flow, t, n)(a);
  }
}
function sn(e, n, t, r, i, l, a, o, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let h = 0;
  return c;
  function c(x) {
    return x === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(x), e.exit(l), p) : x === null || x === 32 || x === 41 || ve(x) ? t(x) : (e.enter(r), e.enter(a), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), w(x));
  }
  function p(x) {
    return x === 62 ? (e.enter(l), e.consume(x), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), f(x));
  }
  function f(x) {
    return x === 62 ? (e.exit("chunkString"), e.exit(o), p(x)) : x === null || x === 60 || z(x) ? t(x) : (e.consume(x), x === 92 ? g : f);
  }
  function g(x) {
    return x === 60 || x === 62 || x === 92 ? (e.consume(x), f) : f(x);
  }
  function w(x) {
    return !h && (x === null || x === 41 || j(x)) ? (e.exit("chunkString"), e.exit(o), e.exit(a), e.exit(r), n(x)) : h < u && x === 40 ? (e.consume(x), h++, w) : x === 41 ? (e.consume(x), h--, w) : x === null || x === 32 || x === 40 || ve(x) ? t(x) : (e.consume(x), x === 92 ? I : w);
  }
  function I(x) {
    return x === 40 || x === 41 || x === 92 ? (e.consume(x), w) : w(x);
  }
}
function cn(e, n, t, r, i, l) {
  const a = this;
  let o = 0, s;
  return u;
  function u(f) {
    return e.enter(r), e.enter(i), e.consume(f), e.exit(i), e.enter(l), h;
  }
  function h(f) {
    return o > 999 || f === null || f === 91 || f === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    f === 94 && !o && "_hiddenFootnoteSupport" in a.parser.constructs ? t(f) : f === 93 ? (e.exit(l), e.enter(i), e.consume(f), e.exit(i), e.exit(r), n) : z(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), h) : (e.enter("chunkString", {
      contentType: "string"
    }), c(f));
  }
  function c(f) {
    return f === null || f === 91 || f === 93 || z(f) || o++ > 999 ? (e.exit("chunkString"), h(f)) : (e.consume(f), s || (s = !_(f)), f === 92 ? p : c);
  }
  function p(f) {
    return f === 91 || f === 92 || f === 93 ? (e.consume(f), o++, c) : c(f);
  }
}
function hn(e, n, t, r, i, l) {
  let a;
  return o;
  function o(p) {
    return p === 34 || p === 39 || p === 40 ? (e.enter(r), e.enter(i), e.consume(p), e.exit(i), a = p === 40 ? 41 : p, s) : t(p);
  }
  function s(p) {
    return p === a ? (e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : (e.enter(l), u(p));
  }
  function u(p) {
    return p === a ? (e.exit(l), s(a)) : p === null ? t(p) : z(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), M(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), h(p));
  }
  function h(p) {
    return p === a || p === null || z(p) ? (e.exit("chunkString"), u(p)) : (e.consume(p), p === 92 ? c : h);
  }
  function c(p) {
    return p === a || p === 92 ? (e.consume(p), h) : h(p);
  }
}
function Fe(e, n) {
  let t;
  return r;
  function r(i) {
    return z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : _(i) ? M(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const ai = {
  name: "definition",
  tokenize: oi
}, li = {
  partial: !0,
  tokenize: ui
};
function oi(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(f) {
    return e.enter("definition"), a(f);
  }
  function a(f) {
    return cn.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(f);
  }
  function o(f) {
    return i = re(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), f === 58 ? (e.enter("definitionMarker"), e.consume(f), e.exit("definitionMarker"), s) : t(f);
  }
  function s(f) {
    return j(f) ? Fe(e, u)(f) : u(f);
  }
  function u(f) {
    return sn(
      e,
      h,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(f);
  }
  function h(f) {
    return e.attempt(li, c, c)(f);
  }
  function c(f) {
    return _(f) ? M(e, p, "whitespace")(f) : p(f);
  }
  function p(f) {
    return f === null || z(f) ? (e.exit("definition"), r.parser.defined.push(i), n(f)) : t(f);
  }
}
function ui(e, n, t) {
  return r;
  function r(o) {
    return j(o) ? Fe(e, i)(o) : t(o);
  }
  function i(o) {
    return hn(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function l(o) {
    return _(o) ? M(e, a, "whitespace")(o) : a(o);
  }
  function a(o) {
    return o === null || z(o) ? n(o) : t(o);
  }
}
const si = {
  name: "hardBreakEscape",
  tokenize: ci
};
function ci(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return z(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const hi = {
  name: "headingAtx",
  resolve: fi,
  tokenize: pi
};
function fi(e, n) {
  let t = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, J(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
}
function pi(e, n, t) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("atxHeading"), l(h);
  }
  function l(h) {
    return e.enter("atxHeadingSequence"), a(h);
  }
  function a(h) {
    return h === 35 && r++ < 6 ? (e.consume(h), a) : h === null || j(h) ? (e.exit("atxHeadingSequence"), o(h)) : t(h);
  }
  function o(h) {
    return h === 35 ? (e.enter("atxHeadingSequence"), s(h)) : h === null || z(h) ? (e.exit("atxHeading"), n(h)) : _(h) ? M(e, o, "whitespace")(h) : (e.enter("atxHeadingText"), u(h));
  }
  function s(h) {
    return h === 35 ? (e.consume(h), s) : (e.exit("atxHeadingSequence"), o(h));
  }
  function u(h) {
    return h === null || h === 35 || j(h) ? (e.exit("atxHeadingText"), o(h)) : (e.consume(h), u);
  }
}
const di = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Pt = ["pre", "script", "style", "textarea"], mi = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: xi,
  tokenize: bi
}, gi = {
  partial: !0,
  tokenize: wi
}, ki = {
  partial: !0,
  tokenize: yi
};
function xi(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function bi(e, n, t) {
  const r = this;
  let i, l, a, o, s;
  return u;
  function u(m) {
    return h(m);
  }
  function h(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), c;
  }
  function c(m) {
    return m === 33 ? (e.consume(m), p) : m === 47 ? (e.consume(m), l = !0, w) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? n : d) : W(m) ? (e.consume(m), a = String.fromCharCode(m), I) : t(m);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), i = 2, f) : m === 91 ? (e.consume(m), i = 5, o = 0, g) : W(m) ? (e.consume(m), i = 4, r.interrupt ? n : d) : t(m);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? n : d) : t(m);
  }
  function g(m) {
    const te = "CDATA[";
    return m === te.charCodeAt(o++) ? (e.consume(m), o === te.length ? r.interrupt ? n : A : g) : t(m);
  }
  function w(m) {
    return W(m) ? (e.consume(m), a = String.fromCharCode(m), I) : t(m);
  }
  function I(m) {
    if (m === null || m === 47 || m === 62 || j(m)) {
      const te = m === 47, me = a.toLowerCase();
      return !te && !l && Pt.includes(me) ? (i = 1, r.interrupt ? n(m) : A(m)) : di.includes(a.toLowerCase()) ? (i = 6, te ? (e.consume(m), x) : r.interrupt ? n(m) : A(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(m) : l ? E(m) : C(m));
    }
    return m === 45 || G(m) ? (e.consume(m), a += String.fromCharCode(m), I) : t(m);
  }
  function x(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? n : A) : t(m);
  }
  function E(m) {
    return _(m) ? (e.consume(m), E) : k(m);
  }
  function C(m) {
    return m === 47 ? (e.consume(m), k) : m === 58 || m === 95 || W(m) ? (e.consume(m), L) : _(m) ? (e.consume(m), C) : k(m);
  }
  function L(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || G(m) ? (e.consume(m), L) : D(m);
  }
  function D(m) {
    return m === 61 ? (e.consume(m), y) : _(m) ? (e.consume(m), D) : C(m);
  }
  function y(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), s = m, B) : _(m) ? (e.consume(m), y) : N(m);
  }
  function B(m) {
    return m === s ? (e.consume(m), s = null, v) : m === null || z(m) ? t(m) : (e.consume(m), B);
  }
  function N(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || j(m) ? D(m) : (e.consume(m), N);
  }
  function v(m) {
    return m === 47 || m === 62 || _(m) ? C(m) : t(m);
  }
  function k(m) {
    return m === 62 ? (e.consume(m), T) : t(m);
  }
  function T(m) {
    return m === null || z(m) ? A(m) : _(m) ? (e.consume(m), T) : t(m);
  }
  function A(m) {
    return m === 45 && i === 2 ? (e.consume(m), V) : m === 60 && i === 1 ? (e.consume(m), H) : m === 62 && i === 4 ? (e.consume(m), ee) : m === 63 && i === 3 ? (e.consume(m), d) : m === 93 && i === 5 ? (e.consume(m), le) : z(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(gi, oe, O)(m)) : m === null || z(m) ? (e.exit("htmlFlowData"), O(m)) : (e.consume(m), A);
  }
  function O(m) {
    return e.check(ki, U, oe)(m);
  }
  function U(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), R;
  }
  function R(m) {
    return m === null || z(m) ? O(m) : (e.enter("htmlFlowData"), A(m));
  }
  function V(m) {
    return m === 45 ? (e.consume(m), d) : A(m);
  }
  function H(m) {
    return m === 47 ? (e.consume(m), a = "", X) : A(m);
  }
  function X(m) {
    if (m === 62) {
      const te = a.toLowerCase();
      return Pt.includes(te) ? (e.consume(m), ee) : A(m);
    }
    return W(m) && a.length < 8 ? (e.consume(m), a += String.fromCharCode(m), X) : A(m);
  }
  function le(m) {
    return m === 93 ? (e.consume(m), d) : A(m);
  }
  function d(m) {
    return m === 62 ? (e.consume(m), ee) : m === 45 && i === 2 ? (e.consume(m), d) : A(m);
  }
  function ee(m) {
    return m === null || z(m) ? (e.exit("htmlFlowData"), oe(m)) : (e.consume(m), ee);
  }
  function oe(m) {
    return e.exit("htmlFlow"), n(m);
  }
}
function yi(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return z(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), l) : t(a);
  }
  function l(a) {
    return r.parser.lazy[r.now().line] ? t(a) : n(a);
  }
}
function wi(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(De, n, t);
  }
}
const Ci = {
  name: "htmlText",
  tokenize: Si
};
function Si(e, n, t) {
  const r = this;
  let i, l, a;
  return o;
  function o(d) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(d), s;
  }
  function s(d) {
    return d === 33 ? (e.consume(d), u) : d === 47 ? (e.consume(d), D) : d === 63 ? (e.consume(d), C) : W(d) ? (e.consume(d), N) : t(d);
  }
  function u(d) {
    return d === 45 ? (e.consume(d), h) : d === 91 ? (e.consume(d), l = 0, g) : W(d) ? (e.consume(d), E) : t(d);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), f) : t(d);
  }
  function c(d) {
    return d === null ? t(d) : d === 45 ? (e.consume(d), p) : z(d) ? (a = c, H(d)) : (e.consume(d), c);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), f) : c(d);
  }
  function f(d) {
    return d === 62 ? V(d) : d === 45 ? p(d) : c(d);
  }
  function g(d) {
    const ee = "CDATA[";
    return d === ee.charCodeAt(l++) ? (e.consume(d), l === ee.length ? w : g) : t(d);
  }
  function w(d) {
    return d === null ? t(d) : d === 93 ? (e.consume(d), I) : z(d) ? (a = w, H(d)) : (e.consume(d), w);
  }
  function I(d) {
    return d === 93 ? (e.consume(d), x) : w(d);
  }
  function x(d) {
    return d === 62 ? V(d) : d === 93 ? (e.consume(d), x) : w(d);
  }
  function E(d) {
    return d === null || d === 62 ? V(d) : z(d) ? (a = E, H(d)) : (e.consume(d), E);
  }
  function C(d) {
    return d === null ? t(d) : d === 63 ? (e.consume(d), L) : z(d) ? (a = C, H(d)) : (e.consume(d), C);
  }
  function L(d) {
    return d === 62 ? V(d) : C(d);
  }
  function D(d) {
    return W(d) ? (e.consume(d), y) : t(d);
  }
  function y(d) {
    return d === 45 || G(d) ? (e.consume(d), y) : B(d);
  }
  function B(d) {
    return z(d) ? (a = B, H(d)) : _(d) ? (e.consume(d), B) : V(d);
  }
  function N(d) {
    return d === 45 || G(d) ? (e.consume(d), N) : d === 47 || d === 62 || j(d) ? v(d) : t(d);
  }
  function v(d) {
    return d === 47 ? (e.consume(d), V) : d === 58 || d === 95 || W(d) ? (e.consume(d), k) : z(d) ? (a = v, H(d)) : _(d) ? (e.consume(d), v) : V(d);
  }
  function k(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || G(d) ? (e.consume(d), k) : T(d);
  }
  function T(d) {
    return d === 61 ? (e.consume(d), A) : z(d) ? (a = T, H(d)) : _(d) ? (e.consume(d), T) : v(d);
  }
  function A(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), i = d, O) : z(d) ? (a = A, H(d)) : _(d) ? (e.consume(d), A) : (e.consume(d), U);
  }
  function O(d) {
    return d === i ? (e.consume(d), i = void 0, R) : d === null ? t(d) : z(d) ? (a = O, H(d)) : (e.consume(d), O);
  }
  function U(d) {
    return d === null || d === 34 || d === 39 || d === 60 || d === 61 || d === 96 ? t(d) : d === 47 || d === 62 || j(d) ? v(d) : (e.consume(d), U);
  }
  function R(d) {
    return d === 47 || d === 62 || j(d) ? v(d) : t(d);
  }
  function V(d) {
    return d === 62 ? (e.consume(d), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(d);
  }
  function H(d) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), X;
  }
  function X(d) {
    return _(d) ? M(e, le, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : le(d);
  }
  function le(d) {
    return e.enter("htmlTextData"), a(d);
  }
}
const pt = {
  name: "labelEnd",
  resolveAll: Ai,
  resolveTo: zi,
  tokenize: Fi
}, Ii = {
  tokenize: Li
}, Ei = {
  tokenize: Di
}, Ti = {
  tokenize: _i
};
function Ai(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && J(e, 0, e.length, t), e;
}
function zi(e, n) {
  let t = e.length, r = 0, i, l, a, o;
  for (; t--; )
    if (i = e[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (a) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (a = t);
  const s = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[a][1].end
    }
  }, h = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[a - 2][1].start
    }
  };
  return o = [["enter", s, n], ["enter", u, n]], o = K(o, e.slice(l + 1, l + r + 3)), o = K(o, [["enter", h, n]]), o = K(o, je(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, a - 3), n)), o = K(o, [["exit", h, n], e[a - 2], e[a - 1], ["exit", u, n]]), o = K(o, e.slice(a + 1)), o = K(o, [["exit", s, n]]), J(e, l, e.length, o), e;
}
function Fi(e, n, t) {
  const r = this;
  let i = r.events.length, l, a;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return o;
  function o(p) {
    return l ? l._inactive ? c(p) : (a = r.parser.defined.includes(re(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(p), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(p);
  }
  function s(p) {
    return p === 40 ? e.attempt(Ii, h, a ? h : c)(p) : p === 91 ? e.attempt(Ei, h, a ? u : c)(p) : a ? h(p) : c(p);
  }
  function u(p) {
    return e.attempt(Ti, h, c)(p);
  }
  function h(p) {
    return n(p);
  }
  function c(p) {
    return l._balanced = !0, t(p);
  }
}
function Li(e, n, t) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return j(c) ? Fe(e, l)(c) : l(c);
  }
  function l(c) {
    return c === 41 ? h(c) : sn(e, a, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function a(c) {
    return j(c) ? Fe(e, s)(c) : h(c);
  }
  function o(c) {
    return t(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40 ? hn(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : h(c);
  }
  function u(c) {
    return j(c) ? Fe(e, h)(c) : h(c);
  }
  function h(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), n) : t(c);
  }
}
function Di(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return cn.call(r, e, l, a, "reference", "referenceMarker", "referenceString")(o);
  }
  function l(o) {
    return r.parser.defined.includes(re(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(o) : t(o);
  }
  function a(o) {
    return t(o);
  }
}
function _i(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const Pi = {
  name: "labelStartImage",
  resolveAll: pt.resolveAll,
  tokenize: Mi
};
function Mi(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), l;
  }
  function l(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), a) : t(o);
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const Bi = {
  name: "labelStartLink",
  resolveAll: pt.resolveAll,
  tokenize: Ri
};
function Ri(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const qe = {
  name: "lineEnding",
  tokenize: vi
};
function vi(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), M(e, n, "linePrefix");
  }
}
const Re = {
  name: "thematicBreak",
  tokenize: Oi
};
function Oi(e, n, t) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), a(u);
  }
  function a(u) {
    return i = u, o(u);
  }
  function o(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || z(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), _(u) ? M(e, o, "whitespace")(u) : o(u));
  }
}
const Q = {
  continuation: {
    tokenize: Ui
  },
  exit: qi,
  name: "list",
  tokenize: Ni
}, $i = {
  partial: !0,
  tokenize: Vi
}, ji = {
  partial: !0,
  tokenize: Hi
};
function Ni(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
  return o;
  function o(f) {
    const g = r.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || f === r.containerState.marker : rt(f)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), f === 42 || f === 45 ? e.check(Re, t, u)(f) : u(f);
      if (!r.interrupt || f === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(f);
    }
    return t(f);
  }
  function s(f) {
    return rt(f) && ++a < 10 ? (e.consume(f), s) : (!r.interrupt || a < 2) && (r.containerState.marker ? f === r.containerState.marker : f === 41 || f === 46) ? (e.exit("listItemValue"), u(f)) : t(f);
  }
  function u(f) {
    return e.enter("listItemMarker"), e.consume(f), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || f, e.check(
      De,
      // Can’t be empty when interrupting.
      r.interrupt ? t : h,
      e.attempt($i, p, c)
    );
  }
  function h(f) {
    return r.containerState.initialBlankLine = !0, l++, p(f);
  }
  function c(f) {
    return _(f) ? (e.enter("listItemPrefixWhitespace"), e.consume(f), e.exit("listItemPrefixWhitespace"), p) : t(f);
  }
  function p(f) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(f);
  }
}
function Ui(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(De, i, l);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, M(e, n, "listItemIndent", r.containerState.size + 1)(o);
  }
  function l(o) {
    return r.containerState.furtherBlankLines || !_(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, a(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ji, n, a)(o));
  }
  function a(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, M(e, e.attempt(Q, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function Hi(e, n, t) {
  const r = this;
  return M(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function qi(e) {
  e.exit(this.containerState.type);
}
function Vi(e, n, t) {
  const r = this;
  return M(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const a = r.events[r.events.length - 1];
    return !_(l) && a && a[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const Mt = {
  name: "setextUnderline",
  resolveTo: Wi,
  tokenize: Qi
};
function Wi(e, n) {
  let t = e.length, r, i, l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !l && e[t][1].type === "definition" && (l = t);
  const a = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", a, n]), e.splice(l + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = a, e.push(["exit", a, n]), e;
}
function Qi(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let h = r.events.length, c;
    for (; h--; )
      if (r.events[h][1].type !== "lineEnding" && r.events[h][1].type !== "linePrefix" && r.events[h][1].type !== "content") {
        c = r.events[h][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = u, a(u)) : t(u);
  }
  function a(u) {
    return e.enter("setextHeadingLineSequence"), o(u);
  }
  function o(u) {
    return u === i ? (e.consume(u), o) : (e.exit("setextHeadingLineSequence"), _(u) ? M(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || z(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const Gi = {
  tokenize: Yi
};
function Yi(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    De,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, M(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ei, i)), "linePrefix"))
  );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Zi = {
  resolveAll: pn()
}, Ji = fn("string"), Ki = fn("text");
function fn(e) {
  return {
    resolveAll: pn(e === "text" ? Xi : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], l = t.attempt(i, a, o);
    return a;
    function a(h) {
      return u(h) ? l(h) : o(h);
    }
    function o(h) {
      if (h === null) {
        t.consume(h);
        return;
      }
      return t.enter("data"), t.consume(h), s;
    }
    function s(h) {
      return u(h) ? (t.exit("data"), l(h)) : (t.consume(h), s);
    }
    function u(h) {
      if (h === null)
        return !0;
      const c = i[h];
      let p = -1;
      if (c)
        for (; ++p < c.length; ) {
          const f = c[p];
          if (!f.previous || f.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function pn(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function Xi(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let l = i.length, a = -1, o = 0, s;
      for (; l--; ) {
        const u = i[l];
        if (typeof u == "string") {
          for (a = u.length; u.charCodeAt(a - 1) === 32; )
            o++, a--;
          if (a) break;
          a = -1;
        } else if (u === -2)
          s = !0, o++;
        else if (u !== -1) {
          l++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (o = 0), o) {
        const u = {
          type: t === e.length || s || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? a : r.start._bufferIndex + a,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(t, 0, ["enter", u, n], ["exit", u, n]), t += 2);
      }
      t++;
    }
  return e;
}
const ea = {
  42: Q,
  43: Q,
  45: Q,
  48: Q,
  49: Q,
  50: Q,
  51: Q,
  52: Q,
  53: Q,
  54: Q,
  55: Q,
  56: Q,
  57: Q,
  62: an
}, ta = {
  91: ai
}, na = {
  [-2]: He,
  [-1]: He,
  32: He
}, ra = {
  35: hi,
  42: Re,
  45: [Mt, Re],
  60: mi,
  61: Mt,
  95: Re,
  96: _t,
  126: _t
}, ia = {
  38: on,
  92: ln
}, aa = {
  [-5]: qe,
  [-4]: qe,
  [-3]: qe,
  33: Pi,
  38: on,
  42: it,
  60: [Br, Ci],
  91: Bi,
  92: [si, ln],
  93: pt,
  95: it,
  96: Gr
}, la = {
  null: [it, Zi]
}, oa = {
  null: [42, 95]
}, ua = {
  null: []
}, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: oa,
  contentInitial: ta,
  disable: ua,
  document: ea,
  flow: ra,
  flowInitial: na,
  insideSpan: la,
  string: ia,
  text: aa
}, Symbol.toStringTag, { value: "Module" }));
function ca(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, l = [];
  let a = [], o = [];
  const s = {
    attempt: B(D),
    check: B(y),
    consume: E,
    enter: C,
    exit: L,
    interrupt: B(y, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: w,
    events: [],
    now: g,
    parser: e,
    previous: null,
    sliceSerialize: p,
    sliceStream: f,
    write: c
  };
  let h = n.tokenize.call(u, s);
  return n.resolveAll && l.push(n), u;
  function c(T) {
    return a = K(a, T), I(), a[a.length - 1] !== null ? [] : (N(n, 0), u.events = je(l, u.events, u), u.events);
  }
  function p(T, A) {
    return fa(f(T), A);
  }
  function f(T) {
    return ha(a, T);
  }
  function g() {
    const {
      _bufferIndex: T,
      _index: A,
      line: O,
      column: U,
      offset: R
    } = r;
    return {
      _bufferIndex: T,
      _index: A,
      line: O,
      column: U,
      offset: R
    };
  }
  function w(T) {
    i[T.line] = T.column, k();
  }
  function I() {
    let T;
    for (; r._index < a.length; ) {
      const A = a[r._index];
      if (typeof A == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < A.length; )
          x(A.charCodeAt(r._bufferIndex));
      else
        x(A);
    }
  }
  function x(T) {
    h = h(T);
  }
  function E(T) {
    z(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, k()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    a[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = T;
  }
  function C(T, A) {
    const O = A || {};
    return O.type = T, O.start = g(), u.events.push(["enter", O, u]), o.push(O), O;
  }
  function L(T) {
    const A = o.pop();
    return A.end = g(), u.events.push(["exit", A, u]), A;
  }
  function D(T, A) {
    N(T, A.from);
  }
  function y(T, A) {
    A.restore();
  }
  function B(T, A) {
    return O;
    function O(U, R, V) {
      let H, X, le, d;
      return Array.isArray(U) ? (
        /* c8 ignore next 1 */
        oe(U)
      ) : "tokenize" in U ? (
        // Looks like a construct.
        oe([
          /** @type {Construct} */
          U
        ])
      ) : ee(U);
      function ee(q) {
        return Ee;
        function Ee(he) {
          const ye = he !== null && q[he], we = he !== null && q.null, Pe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ye) ? ye : ye ? [ye] : [],
            ...Array.isArray(we) ? we : we ? [we] : []
          ];
          return oe(Pe)(he);
        }
      }
      function oe(q) {
        return H = q, X = 0, q.length === 0 ? V : m(q[X]);
      }
      function m(q) {
        return Ee;
        function Ee(he) {
          return d = v(), le = q, q.partial || (u.currentConstruct = q), q.name && u.parser.constructs.disable.null.includes(q.name) ? me() : q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            A ? Object.assign(Object.create(u), A) : u,
            s,
            te,
            me
          )(he);
        }
      }
      function te(q) {
        return T(le, d), R;
      }
      function me(q) {
        return d.restore(), ++X < H.length ? m(H[X]) : V;
      }
    }
  }
  function N(T, A) {
    T.resolveAll && !l.includes(T) && l.push(T), T.resolve && J(u.events, A, u.events.length - A, T.resolve(u.events.slice(A), u)), T.resolveTo && (u.events = T.resolveTo(u.events, u));
  }
  function v() {
    const T = g(), A = u.previous, O = u.currentConstruct, U = u.events.length, R = Array.from(o);
    return {
      from: U,
      restore: V
    };
    function V() {
      r = T, u.previous = A, u.currentConstruct = O, u.events.length = U, o = R, k();
    }
  }
  function k() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function ha(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, l = n.end._bufferIndex;
  let a;
  if (t === i)
    a = [e[t].slice(r, l)];
  else {
    if (a = e.slice(t, i), r > -1) {
      const o = a[0];
      typeof o == "string" ? a[0] = o.slice(r) : a.shift();
    }
    l > 0 && a.push(e[i].slice(0, l));
  }
  return a;
}
function fa(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
    let a;
    if (typeof l == "string")
      a = l;
    else switch (l) {
      case -5: {
        a = "\r";
        break;
      }
      case -4: {
        a = `
`;
        break;
      }
      case -3: {
        a = `\r
`;
        break;
      }
      case -2: {
        a = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        a = " ";
        break;
      }
      default:
        a = String.fromCharCode(l);
    }
    i = l === -2, r.push(a);
  }
  return r.join("");
}
function pa(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      nn([sa, ...(e || {}).extensions || []])
    ),
    content: i(zr),
    defined: [],
    document: i(Lr),
    flow: i(Gi),
    lazy: {},
    string: i(Ji),
    text: i(Ki)
  };
  return r;
  function i(l) {
    return a;
    function a(o) {
      return ca(r, l, o);
    }
  }
}
function da(e) {
  for (; !un(e); )
    ;
  return e;
}
const Bt = /[\0\t\n\r]/g;
function ma() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, a, o) {
    const s = [];
    let u, h, c, p, f;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(a || void 0).decode(l)), c = 0, n = "", t && (l.charCodeAt(0) === 65279 && c++, t = void 0); c < l.length; ) {
      if (Bt.lastIndex = c, u = Bt.exec(l), p = u && u.index !== void 0 ? u.index : l.length, f = l.charCodeAt(p), !u) {
        n = l.slice(c);
        break;
      }
      if (f === 10 && c === p && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), c < p && (s.push(l.slice(c, p)), e += p - c), f) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (h = Math.ceil(e / 4) * 4, s.push(-2); e++ < h; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = p + 1;
    }
    return o && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const ga = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function dn(e) {
  return e.replace(ga, ka);
}
function ka(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return rn(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return ft(t) || e;
}
function Le(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Rt(e.position) : "start" in e || "end" in e ? Rt(e) : "line" in e || "column" in e ? at(e) : "";
}
function at(e) {
  return vt(e && e.line) + ":" + vt(e && e.column);
}
function Rt(e) {
  return at(e && e.start) + "-" + at(e && e.end);
}
function vt(e) {
  return e && typeof e == "number" ? e : 1;
}
const mn = {}.hasOwnProperty;
function xa(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), ba(t)(da(pa(t).document().write(ma()(e, n, !0))));
}
function ba(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Ct),
      autolinkProtocol: v,
      autolinkEmail: v,
      atxHeading: l(bt),
      blockQuote: l(we),
      characterEscape: v,
      characterReference: v,
      codeFenced: l(Pe),
      codeFencedFenceInfo: a,
      codeFencedFenceMeta: a,
      codeIndented: l(Pe, a),
      codeText: l(Wn, a),
      codeTextData: v,
      data: v,
      codeFlowValue: v,
      definition: l(Qn),
      definitionDestinationString: a,
      definitionLabelString: a,
      definitionTitleString: a,
      emphasis: l(Gn),
      hardBreakEscape: l(yt),
      hardBreakTrailing: l(yt),
      htmlFlow: l(wt, a),
      htmlFlowData: v,
      htmlText: l(wt, a),
      htmlTextData: v,
      image: l(Yn),
      label: a,
      link: l(Ct),
      listItem: l(Zn),
      listItemValue: p,
      listOrdered: l(St, c),
      listUnordered: l(St),
      paragraph: l(Jn),
      reference: m,
      referenceString: a,
      resourceDestinationString: a,
      resourceTitleString: a,
      setextHeading: l(bt),
      strong: l(Kn),
      thematicBreak: l(er)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: D,
      autolink: s(),
      autolinkEmail: ye,
      autolinkProtocol: he,
      blockQuote: s(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: me,
      characterReferenceMarkerNumeric: me,
      characterReferenceValue: q,
      characterReference: Ee,
      codeFenced: s(I),
      codeFencedFence: w,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: g,
      codeFlowValue: k,
      codeIndented: s(x),
      codeText: s(R),
      codeTextData: k,
      data: k,
      definition: s(),
      definitionDestinationString: L,
      definitionLabelString: E,
      definitionTitleString: C,
      emphasis: s(),
      hardBreakEscape: s(A),
      hardBreakTrailing: s(A),
      htmlFlow: s(O),
      htmlFlowData: k,
      htmlText: s(U),
      htmlTextData: k,
      image: s(H),
      label: le,
      labelText: X,
      lineEnding: T,
      link: s(V),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: te,
      resourceDestinationString: d,
      resourceTitleString: ee,
      resource: oe,
      setextHeading: s(N),
      setextHeadingLineSequence: B,
      setextHeadingText: y,
      strong: s(),
      thematicBreak: s()
    }
  };
  gn(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(b) {
    let S = {
      type: "root",
      children: []
    };
    const F = {
      stack: [S],
      tokenStack: [],
      config: n,
      enter: o,
      exit: u,
      buffer: a,
      resume: h,
      data: t
    }, P = [];
    let $ = -1;
    for (; ++$ < b.length; )
      if (b[$][1].type === "listOrdered" || b[$][1].type === "listUnordered")
        if (b[$][0] === "enter")
          P.push($);
        else {
          const ne = P.pop();
          $ = i(b, ne, $);
        }
    for ($ = -1; ++$ < b.length; ) {
      const ne = n[b[$][0]];
      mn.call(ne, b[$][1].type) && ne[b[$][1].type].call(Object.assign({
        sliceSerialize: b[$][2].sliceSerialize
      }, F), b[$][1]);
    }
    if (F.tokenStack.length > 0) {
      const ne = F.tokenStack[F.tokenStack.length - 1];
      (ne[1] || Ot).call(F, void 0, ne[0]);
    }
    for (S.position = {
      start: fe(b.length > 0 ? b[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: fe(b.length > 0 ? b[b.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, $ = -1; ++$ < n.transforms.length; )
      S = n.transforms[$](S) || S;
    return S;
  }
  function i(b, S, F) {
    let P = S - 1, $ = -1, ne = !1, ge, ue, Te, Ae;
    for (; ++P <= F; ) {
      const Z = b[P];
      switch (Z[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Z[0] === "enter" ? $++ : $--, Ae = void 0;
          break;
        }
        case "lineEndingBlank": {
          Z[0] === "enter" && (ge && !Ae && !$ && !Te && (Te = P), Ae = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ae = void 0;
      }
      if (!$ && Z[0] === "enter" && Z[1].type === "listItemPrefix" || $ === -1 && Z[0] === "exit" && (Z[1].type === "listUnordered" || Z[1].type === "listOrdered")) {
        if (ge) {
          let Ce = P;
          for (ue = void 0; Ce--; ) {
            const se = b[Ce];
            if (se[1].type === "lineEnding" || se[1].type === "lineEndingBlank") {
              if (se[0] === "exit") continue;
              ue && (b[ue][1].type = "lineEndingBlank", ne = !0), se[1].type = "lineEnding", ue = Ce;
            } else if (!(se[1].type === "linePrefix" || se[1].type === "blockQuotePrefix" || se[1].type === "blockQuotePrefixWhitespace" || se[1].type === "blockQuoteMarker" || se[1].type === "listItemIndent")) break;
          }
          Te && (!ue || Te < ue) && (ge._spread = !0), ge.end = Object.assign({}, ue ? b[ue][1].start : Z[1].end), b.splice(ue || P, 0, ["exit", ge, Z[2]]), P++, F++;
        }
        if (Z[1].type === "listItemPrefix") {
          const Ce = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Z[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          ge = Ce, b.splice(P, 0, ["enter", Ce, Z[2]]), P++, F++, Te = void 0, Ae = !0;
        }
      }
    }
    return b[S][1]._spread = ne, F;
  }
  function l(b, S) {
    return F;
    function F(P) {
      o.call(this, b(P), P), S && S.call(this, P);
    }
  }
  function a() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(b, S, F) {
    this.stack[this.stack.length - 1].children.push(b), this.stack.push(b), this.tokenStack.push([S, F || void 0]), b.position = {
      start: fe(S.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(b) {
    return S;
    function S(F) {
      b && b.call(this, F), u.call(this, F);
    }
  }
  function u(b, S) {
    const F = this.stack.pop(), P = this.tokenStack.pop();
    if (P)
      P[0].type !== b.type && (S ? S.call(this, b, P[0]) : (P[1] || Ot).call(this, b, P[0]));
    else throw new Error("Cannot close `" + b.type + "` (" + Le({
      start: b.start,
      end: b.end
    }) + "): it’s not open");
    F.position.end = fe(b.end);
  }
  function h() {
    return ht(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(b) {
    if (this.data.expectingFirstListItemValue) {
      const S = this.stack[this.stack.length - 2];
      S.start = Number.parseInt(this.sliceSerialize(b), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.lang = b;
  }
  function g() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.meta = b;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function x() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function E(b) {
    const S = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = S, F.identifier = re(this.sliceSerialize(b)).toLowerCase();
  }
  function C() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = b;
  }
  function L() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = b;
  }
  function D(b) {
    const S = this.stack[this.stack.length - 1];
    if (!S.depth) {
      const F = this.sliceSerialize(b).length;
      S.depth = F;
    }
  }
  function y() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function B(b) {
    const S = this.stack[this.stack.length - 1];
    S.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function N() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function v(b) {
    const F = this.stack[this.stack.length - 1].children;
    let P = F[F.length - 1];
    (!P || P.type !== "text") && (P = Xn(), P.position = {
      start: fe(b.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, F.push(P)), this.stack.push(P);
  }
  function k(b) {
    const S = this.stack.pop();
    S.value += this.sliceSerialize(b), S.position.end = fe(b.end);
  }
  function T(b) {
    const S = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const F = S.children[S.children.length - 1];
      F.position.end = fe(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(S.type) && (v.call(this, b), k.call(this, b));
  }
  function A() {
    this.data.atHardBreak = !0;
  }
  function O() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = b;
  }
  function U() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = b;
  }
  function R() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.value = b;
  }
  function V() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = S, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function H() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const S = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = S, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function X(b) {
    const S = this.sliceSerialize(b), F = this.stack[this.stack.length - 2];
    F.label = dn(S), F.identifier = re(S).toLowerCase();
  }
  function le() {
    const b = this.stack[this.stack.length - 1], S = this.resume(), F = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, F.type === "link") {
      const P = b.children;
      F.children = P;
    } else
      F.alt = S;
  }
  function d() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.url = b;
  }
  function ee() {
    const b = this.resume(), S = this.stack[this.stack.length - 1];
    S.title = b;
  }
  function oe() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function te(b) {
    const S = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = S, F.identifier = re(this.sliceSerialize(b)).toLowerCase(), this.data.referenceType = "full";
  }
  function me(b) {
    this.data.characterReferenceType = b.type;
  }
  function q(b) {
    const S = this.sliceSerialize(b), F = this.data.characterReferenceType;
    let P;
    F ? (P = rn(S, F === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : P = ft(S);
    const $ = this.stack[this.stack.length - 1];
    $.value += P;
  }
  function Ee(b) {
    const S = this.stack.pop();
    S.position.end = fe(b.end);
  }
  function he(b) {
    k.call(this, b);
    const S = this.stack[this.stack.length - 1];
    S.url = this.sliceSerialize(b);
  }
  function ye(b) {
    k.call(this, b);
    const S = this.stack[this.stack.length - 1];
    S.url = "mailto:" + this.sliceSerialize(b);
  }
  function we() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Pe() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Wn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Qn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Gn() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function bt() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function yt() {
    return {
      type: "break"
    };
  }
  function wt() {
    return {
      type: "html",
      value: ""
    };
  }
  function Yn() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Ct() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function St(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: []
    };
  }
  function Zn(b) {
    return {
      type: "listItem",
      spread: b._spread,
      checked: null,
      children: []
    };
  }
  function Jn() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Kn() {
    return {
      type: "strong",
      children: []
    };
  }
  function Xn() {
    return {
      type: "text",
      value: ""
    };
  }
  function er() {
    return {
      type: "thematicBreak"
    };
  }
}
function fe(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function gn(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? gn(e, r) : ya(e, r);
  }
}
function ya(e, n) {
  let t;
  for (t in n)
    if (mn.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function Ot(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Le({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Le({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Le({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function kn(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return xa(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
const $t = {}.hasOwnProperty;
function wa(e, n) {
  const t = n || {};
  function r(i, ...l) {
    let a = r.invalid;
    const o = r.handlers;
    if (i && $t.call(i, e)) {
      const s = String(i[e]);
      a = $t.call(o, s) ? o[s] : r.unknown;
    }
    if (a)
      return a.call(this, i, ...l);
  }
  return r.handlers = t.handlers || {}, r.invalid = t.invalid, r.unknown = t.unknown, r;
}
const Ca = {}.hasOwnProperty;
function xn(e, n) {
  let t = -1, r;
  if (n.extensions)
    for (; ++t < n.extensions.length; )
      xn(e, n.extensions[t]);
  for (r in n)
    if (Ca.call(n, r))
      switch (r) {
        case "extensions":
          break;
        /* c8 ignore next 4 */
        case "unsafe": {
          jt(e[r], n[r]);
          break;
        }
        case "join": {
          jt(e[r], n[r]);
          break;
        }
        case "handlers": {
          Sa(e[r], n[r]);
          break;
        }
        default:
          e.options[r] = n[r];
      }
  return e;
}
function jt(e, n) {
  n && e.push(...n);
}
function Sa(e, n) {
  n && Object.assign(e, n);
}
function Ia(e, n, t, r) {
  const i = t.enter("blockquote"), l = t.createTracker(r);
  l.move("> "), l.shift(2);
  const a = t.indentLines(
    t.containerFlow(e, l.current()),
    Ea
  );
  return i(), a;
}
function Ea(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function bn(e, n) {
  return Nt(e, n.inConstruct, !0) && !Nt(e, n.notInConstruct, !1);
}
function Nt(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function Ut(e, n, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (t.unsafe[i].character === `
` && bn(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Ta(e, n) {
  const t = String(e);
  let r = t.indexOf(n), i = r, l = 0, a = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++l > a && (a = l) : l = 1, i = r + n.length, r = t.indexOf(n, i);
  return a;
}
function lt(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Aa(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function za(e, n, t, r) {
  const i = Aa(t), l = e.value || "", a = i === "`" ? "GraveAccent" : "Tilde";
  if (lt(e, t)) {
    const c = t.enter("codeIndented"), p = t.indentLines(l, Fa);
    return c(), p;
  }
  const o = t.createTracker(r), s = i.repeat(Math.max(Ta(l, i) + 1, 3)), u = t.enter("codeFenced");
  let h = o.move(s);
  if (e.lang) {
    const c = t.enter(`codeFencedLang${a}`);
    h += o.move(
      t.safe(e.lang, {
        before: h,
        after: " ",
        encode: ["`"],
        ...o.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = t.enter(`codeFencedMeta${a}`);
    h += o.move(" "), h += o.move(
      t.safe(e.meta, {
        before: h,
        after: `
`,
        encode: ["`"],
        ...o.current()
      })
    ), c();
  }
  return h += o.move(`
`), l && (h += o.move(l + `
`)), h += o.move(s), u(), h;
}
function Fa(e, n, t) {
  return (t ? "" : "    ") + e;
}
function dt(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function La(e, n, t, r) {
  const i = dt(t), l = i === '"' ? "Quote" : "Apostrophe", a = t.enter("definition");
  let o = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("[");
  return u += s.move(
    t.safe(t.associationId(e), {
      before: u,
      after: "]",
      ...s.current()
    })
  ), u += s.move("]: "), o(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (o = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (o = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : `
`,
      ...s.current()
    })
  )), o(), e.title && (o = t.enter(`title${l}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), o()), a(), u;
}
function Da(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function pe(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function Oe(e, n, t) {
  const r = Ie(e), i = Ie(n);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
yn.peek = _a;
function yn(e, n, t, r) {
  const i = Da(t), l = t.enter("emphasis"), a = t.createTracker(r), o = a.move(i);
  let s = a.move(
    t.containerPhrasing(e, {
      after: i,
      before: o,
      ...a.current()
    })
  );
  const u = s.charCodeAt(0), h = Oe(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  h.inside && (s = pe(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = Oe(r.after.charCodeAt(0), c, i);
  p.inside && (s = s.slice(0, -1) + pe(c));
  const f = a.move(i);
  return l(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: h.outside
  }, o + s + f;
}
function _a(e, n, t) {
  return t.options.emphasis || "*";
}
const Ne = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return Ra;
    if (typeof e == "function")
      return Ue(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Pa(e) : Ma(e);
    if (typeof e == "string")
      return Ba(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Pa(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Ne(e[t]);
  return Ue(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; )
      if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function Ma(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ue(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== n[l]) return !1;
    return !0;
  }
}
function Ba(e) {
  return Ue(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Ue(e) {
  return n;
  function n(t, r, i) {
    return !!(va(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Ra() {
  return !0;
}
function va(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const wn = [], Oa = !0, ot = !1, $a = "skip";
function Cn(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = Ne(i), a = r ? -1 : 1;
  o(e, void 0, [])();
  function o(s, u, h) {
    const c = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof c.type == "string") {
      const f = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(p, "name", {
        value: "node (" + (s.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return p;
    function p() {
      let f = wn, g, w, I;
      if ((!n || l(s, u, h[h.length - 1] || void 0)) && (f = ja(t(s, h)), f[0] === ot))
        return f;
      if ("children" in s && s.children) {
        const x = (
          /** @type {UnistParent} */
          s
        );
        if (x.children && f[0] !== $a)
          for (w = (r ? x.children.length : -1) + a, I = h.concat(x); w > -1 && w < x.children.length; ) {
            const E = x.children[w];
            if (g = o(E, w, I)(), g[0] === ot)
              return g;
            w = typeof g[1] == "number" ? g[1] : w + a;
          }
      }
      return f;
    }
  }
}
function ja(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Oa, e] : e == null ? wn : [e];
}
function Na(e, n, t, r) {
  let i, l, a;
  typeof n == "function" ? (l = void 0, a = n, i = t) : (l = n, a = t, i = r), Cn(e, l, o, i);
  function o(s, u) {
    const h = u[u.length - 1], c = h ? h.children.indexOf(s) : void 0;
    return a(s, c, h);
  }
}
function Sn(e, n) {
  let t = !1;
  return Na(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, ot;
  }), !!((!e.depth || e.depth < 3) && ht(e) && (n.options.setext || t));
}
function Ua(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), l = t.createTracker(r);
  if (Sn(e, t)) {
    const h = t.enter("headingSetext"), c = t.enter("phrasing"), p = t.containerPhrasing(e, {
      ...l.current(),
      before: `
`,
      after: `
`
    });
    return c(), h(), p + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      p.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(p.lastIndexOf("\r"), p.lastIndexOf(`
`)) + 1)
    );
  }
  const a = "#".repeat(i), o = t.enter("headingAtx"), s = t.enter("phrasing");
  l.move(a + " ");
  let u = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...l.current()
  });
  return /^[\t ]/.test(u) && (u = pe(u.charCodeAt(0)) + u.slice(1)), u = u ? a + " " + u : a, t.options.closeAtx && (u += " " + a), s(), o(), u;
}
In.peek = Ha;
function In(e) {
  return e.value || "";
}
function Ha() {
  return "<";
}
En.peek = qa;
function En(e, n, t, r) {
  const i = dt(t), l = i === '"' ? "Quote" : "Apostrophe", a = t.enter("image");
  let o = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("![");
  return u += s.move(
    t.safe(e.alt, { before: u, after: "]", ...s.current() })
  ), u += s.move("]("), o(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (o = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (o = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...s.current()
    })
  )), o(), e.title && (o = t.enter(`title${l}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), o()), u += s.move(")"), a(), u;
}
function qa() {
  return "!";
}
Tn.peek = Va;
function Tn(e, n, t, r) {
  const i = e.referenceType, l = t.enter("imageReference");
  let a = t.enter("label");
  const o = t.createTracker(r);
  let s = o.move("![");
  const u = t.safe(e.alt, {
    before: s,
    after: "]",
    ...o.current()
  });
  s += o.move(u + "]["), a();
  const h = t.stack;
  t.stack = [], a = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...o.current()
  });
  return a(), t.stack = h, l(), i === "full" || !u || u !== c ? s += o.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += o.move("]"), s;
}
function Va() {
  return "!";
}
An.peek = Wa;
function An(e, n, t) {
  let r = e.value || "", i = "`", l = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++l < t.unsafe.length; ) {
    const a = t.unsafe[l], o = t.compilePattern(a);
    let s;
    if (a.atBreak)
      for (; s = o.exec(r); ) {
        let u = s.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(s.index + 1);
      }
  }
  return i + r + i;
}
function Wa() {
  return "`";
}
function zn(e, n) {
  const t = ht(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
Fn.peek = Qa;
function Fn(e, n, t, r) {
  const i = dt(t), l = i === '"' ? "Quote" : "Apostrophe", a = t.createTracker(r);
  let o, s;
  if (zn(e, t)) {
    const h = t.stack;
    t.stack = [], o = t.enter("autolink");
    let c = a.move("<");
    return c += a.move(
      t.containerPhrasing(e, {
        before: c,
        after: ">",
        ...a.current()
      })
    ), c += a.move(">"), o(), t.stack = h, c;
  }
  o = t.enter("link"), s = t.enter("label");
  let u = a.move("[");
  return u += a.move(
    t.containerPhrasing(e, {
      before: u,
      after: "](",
      ...a.current()
    })
  ), u += a.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), u += a.move("<"), u += a.move(
    t.safe(e.url, { before: u, after: ">", ...a.current() })
  ), u += a.move(">")) : (s = t.enter("destinationRaw"), u += a.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...a.current()
    })
  )), s(), e.title && (s = t.enter(`title${l}`), u += a.move(" " + i), u += a.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...a.current()
    })
  ), u += a.move(i), s()), u += a.move(")"), o(), u;
}
function Qa(e, n, t) {
  return zn(e, t) ? "<" : "[";
}
Ln.peek = Ga;
function Ln(e, n, t, r) {
  const i = e.referenceType, l = t.enter("linkReference");
  let a = t.enter("label");
  const o = t.createTracker(r);
  let s = o.move("[");
  const u = t.containerPhrasing(e, {
    before: s,
    after: "]",
    ...o.current()
  });
  s += o.move(u + "]["), a();
  const h = t.stack;
  t.stack = [], a = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...o.current()
  });
  return a(), t.stack = h, l(), i === "full" || !u || u !== c ? s += o.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += o.move("]"), s;
}
function Ga() {
  return "[";
}
function mt(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function Ya(e) {
  const n = mt(e), t = e.options.bulletOther;
  if (!t)
    return n === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (t === n)
    throw new Error(
      "Expected `bullet` (`" + n + "`) and `bulletOther` (`" + t + "`) to be different"
    );
  return t;
}
function Za(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function Dn(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function Ja(e, n, t, r) {
  const i = t.enter("list"), l = t.bulletCurrent;
  let a = e.ordered ? Za(t) : mt(t);
  const o = e.ordered ? a === "." ? ")" : "." : Ya(t);
  let s = n && t.bulletLastUsed ? a === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const h = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (a === "*" || a === "-") && // Empty first list item:
      h && (!h.children || !h.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (s = !0), Dn(t) === a && h
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const p = e.children[c];
        if (p && p.type === "listItem" && p.children && p.children[0] && p.children[0].type === "thematicBreak") {
          s = !0;
          break;
        }
      }
    }
  }
  s && (a = o), t.bulletCurrent = a;
  const u = t.containerFlow(e, r);
  return t.bulletLastUsed = a, t.bulletCurrent = l, i(), u;
}
function Ka(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function Xa(e, n, t, r) {
  const i = Ka(t);
  let l = t.bulletCurrent || mt(t);
  n && n.type === "list" && n.ordered && (l = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + l);
  let a = l.length + 1;
  (i === "tab" || i === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (a = Math.ceil(a / 4) * 4);
  const o = t.createTracker(r);
  o.move(l + " ".repeat(a - l.length)), o.shift(a);
  const s = t.enter("listItem"), u = t.indentLines(
    t.containerFlow(e, o.current()),
    h
  );
  return s(), u;
  function h(c, p, f) {
    return p ? (f ? "" : " ".repeat(a)) + c : (f ? l : l + " ".repeat(a - l.length)) + c;
  }
}
function el(e, n, t, r) {
  const i = t.enter("paragraph"), l = t.enter("phrasing"), a = t.containerPhrasing(e, r);
  return l(), i(), a;
}
const tl = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Ne([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function nl(e, n, t, r) {
  return (e.children.some(function(a) {
    return tl(a);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function rl(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
_n.peek = il;
function _n(e, n, t, r) {
  const i = rl(t), l = t.enter("strong"), a = t.createTracker(r), o = a.move(i + i);
  let s = a.move(
    t.containerPhrasing(e, {
      after: i,
      before: o,
      ...a.current()
    })
  );
  const u = s.charCodeAt(0), h = Oe(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  h.inside && (s = pe(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = Oe(r.after.charCodeAt(0), c, i);
  p.inside && (s = s.slice(0, -1) + pe(c));
  const f = a.move(i + i);
  return l(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: h.outside
  }, o + s + f;
}
function il(e, n, t) {
  return t.options.strong || "*";
}
function al(e, n, t, r) {
  return t.safe(e.value, r);
}
function ll(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function ol(e, n, t) {
  const r = (Dn(t) + (t.options.ruleSpaces ? " " : "")).repeat(ll(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const gt = {
  blockquote: Ia,
  break: Ut,
  code: za,
  definition: La,
  emphasis: yn,
  hardBreak: Ut,
  heading: Ua,
  html: In,
  image: En,
  imageReference: Tn,
  inlineCode: An,
  link: Fn,
  linkReference: Ln,
  list: Ja,
  listItem: Xa,
  paragraph: el,
  root: nl,
  strong: _n,
  text: al,
  thematicBreak: ol
}, ul = [sl];
function sl(e, n, t, r) {
  if (n.type === "code" && lt(n, r) && (e.type === "list" || e.type === n.type && lt(e, r)))
    return !1;
  if ("spread" in t && typeof t.spread == "boolean")
    return e.type === "paragraph" && // Two paragraphs.
    (e.type === n.type || n.type === "definition" || // Paragraph followed by a setext heading.
    n.type === "heading" && Sn(n, r)) ? void 0 : t.spread ? 1 : 0;
}
const ke = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
], cl = [
  { character: "	", after: "[\\r\\n]", inConstruct: "phrasing" },
  { character: "	", before: "[\\r\\n]", inConstruct: "phrasing" },
  {
    character: "	",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
  },
  {
    character: "\r",
    inConstruct: [
      "codeFencedLangGraveAccent",
      "codeFencedLangTilde",
      "codeFencedMetaGraveAccent",
      "codeFencedMetaTilde",
      "destinationLiteral",
      "headingAtx"
    ]
  },
  {
    character: `
`,
    inConstruct: [
      "codeFencedLangGraveAccent",
      "codeFencedLangTilde",
      "codeFencedMetaGraveAccent",
      "codeFencedMetaTilde",
      "destinationLiteral",
      "headingAtx"
    ]
  },
  { character: " ", after: "[\\r\\n]", inConstruct: "phrasing" },
  { character: " ", before: "[\\r\\n]", inConstruct: "phrasing" },
  {
    character: " ",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
  },
  // An exclamation mark can start an image, if it is followed by a link or
  // a link reference.
  {
    character: "!",
    after: "\\[",
    inConstruct: "phrasing",
    notInConstruct: ke
  },
  // A quote can break out of a title.
  { character: '"', inConstruct: "titleQuote" },
  // A number sign could start an ATX heading if it starts a line.
  { atBreak: !0, character: "#" },
  { character: "#", inConstruct: "headingAtx", after: `(?:[\r
]|$)` },
  // Dollar sign and percentage are not used in markdown.
  // An ampersand could start a character reference.
  { character: "&", after: "[#A-Za-z]", inConstruct: "phrasing" },
  // An apostrophe can break out of a title.
  { character: "'", inConstruct: "titleApostrophe" },
  // A left paren could break out of a destination raw.
  { character: "(", inConstruct: "destinationRaw" },
  // A left paren followed by `]` could make something into a link or image.
  {
    before: "\\]",
    character: "(",
    inConstruct: "phrasing",
    notInConstruct: ke
  },
  // A right paren could start a list item or break out of a destination
  // raw.
  { atBreak: !0, before: "\\d+", character: ")" },
  { character: ")", inConstruct: "destinationRaw" },
  // An asterisk can start thematic breaks, list items, emphasis, strong.
  { atBreak: !0, character: "*", after: `(?:[ 	\r
*])` },
  { character: "*", inConstruct: "phrasing", notInConstruct: ke },
  // A plus sign could start a list item.
  { atBreak: !0, character: "+", after: `(?:[ 	\r
])` },
  // A dash can start thematic breaks, list items, and setext heading
  // underlines.
  { atBreak: !0, character: "-", after: `(?:[ 	\r
-])` },
  // A dot could start a list item.
  { atBreak: !0, before: "\\d+", character: ".", after: `(?:[ 	\r
]|$)` },
  // Slash, colon, and semicolon are not used in markdown for constructs.
  // A less than can start html (flow or text) or an autolink.
  // HTML could start with an exclamation mark (declaration, cdata, comment),
  // slash (closing tag), question mark (instruction), or a letter (tag).
  // An autolink also starts with a letter.
  // Finally, it could break out of a destination literal.
  { atBreak: !0, character: "<", after: "[!/?A-Za-z]" },
  {
    character: "<",
    after: "[!/?A-Za-z]",
    inConstruct: "phrasing",
    notInConstruct: ke
  },
  { character: "<", inConstruct: "destinationLiteral" },
  // An equals to can start setext heading underlines.
  { atBreak: !0, character: "=" },
  // A greater than can start block quotes and it can break out of a
  // destination literal.
  { atBreak: !0, character: ">" },
  { character: ">", inConstruct: "destinationLiteral" },
  // Question mark and at sign are not used in markdown for constructs.
  // A left bracket can start definitions, references, labels,
  { atBreak: !0, character: "[" },
  { character: "[", inConstruct: "phrasing", notInConstruct: ke },
  { character: "[", inConstruct: ["label", "reference"] },
  // A backslash can start an escape (when followed by punctuation) or a
  // hard break (when followed by an eol).
  // Note: typical escapes are handled in `safe`!
  { character: "\\", after: "[\\r\\n]", inConstruct: "phrasing" },
  // A right bracket can exit labels.
  { character: "]", inConstruct: ["label", "reference"] },
  // Caret is not used in markdown for constructs.
  // An underscore can start emphasis, strong, or a thematic break.
  { atBreak: !0, character: "_" },
  { character: "_", inConstruct: "phrasing", notInConstruct: ke },
  // A grave accent can start code (fenced or text), or it can break out of
  // a grave accent code fence.
  { atBreak: !0, character: "`" },
  {
    character: "`",
    inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
  },
  { character: "`", inConstruct: "phrasing", notInConstruct: ke },
  // Left brace, vertical bar, right brace are not used in markdown for
  // constructs.
  // A tilde can start code (fenced).
  { atBreak: !0, character: "~" }
];
function hl(e) {
  return e.label || !e.identifier ? e.label || "" : dn(e.identifier);
}
function fl(e) {
  if (!e._compiled) {
    const n = (e.atBreak ? "[\\r\\n][\\t ]*" : "") + (e.before ? "(?:" + e.before + ")" : "");
    e._compiled = new RegExp(
      (n ? "(" + n + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(e.character) ? "\\" : "") + e.character + (e.after ? "(?:" + e.after + ")" : ""),
      "g"
    );
  }
  return e._compiled;
}
function pl(e, n, t) {
  const r = n.indexStack, i = e.children || [], l = [];
  let a = -1, o = t.before, s;
  r.push(-1);
  let u = n.createTracker(t);
  for (; ++a < i.length; ) {
    const h = i[a];
    let c;
    if (r[r.length - 1] = a, a + 1 < i.length) {
      let g = n.handle.handlers[i[a + 1].type];
      g && g.peek && (g = g.peek), c = g ? g(i[a + 1], e, n, {
        before: "",
        after: "",
        ...u.current()
      }).charAt(0) : "";
    } else
      c = t.after;
    l.length > 0 && (o === "\r" || o === `
`) && h.type === "html" && (l[l.length - 1] = l[l.length - 1].replace(
      /(\r?\n|\r)$/,
      " "
    ), o = " ", u = n.createTracker(t), u.move(l.join("")));
    let p = n.handle(h, e, n, {
      ...u.current(),
      after: c,
      before: o
    });
    s && s === p.slice(0, 1) && (p = pe(s.charCodeAt(0)) + p.slice(1));
    const f = n.attentionEncodeSurroundingInfo;
    n.attentionEncodeSurroundingInfo = void 0, s = void 0, f && (l.length > 0 && f.before && o === l[l.length - 1].slice(-1) && (l[l.length - 1] = l[l.length - 1].slice(0, -1) + pe(o.charCodeAt(0))), f.after && (s = c)), u.move(p), l.push(p), o = p.slice(-1);
  }
  return r.pop(), l.join("");
}
function dl(e, n, t) {
  const r = n.indexStack, i = e.children || [], l = n.createTracker(t), a = [];
  let o = -1;
  for (r.push(-1); ++o < i.length; ) {
    const s = i[o];
    r[r.length - 1] = o, a.push(
      l.move(
        n.handle(s, e, n, {
          before: `
`,
          after: `
`,
          ...l.current()
        })
      )
    ), s.type !== "list" && (n.bulletLastUsed = void 0), o < i.length - 1 && a.push(
      l.move(ml(s, i[o + 1], e, n))
    );
  }
  return r.pop(), a.join("");
}
function ml(e, n, t, r) {
  let i = r.join.length;
  for (; i--; ) {
    const l = r.join[i](e, n, t, r);
    if (l === !0 || l === 1)
      break;
    if (typeof l == "number")
      return `
`.repeat(1 + l);
    if (l === !1)
      return `

<!---->

`;
  }
  return `

`;
}
const gl = /\r?\n|\r/g;
function kl(e, n) {
  const t = [];
  let r = 0, i = 0, l;
  for (; l = gl.exec(e); )
    a(e.slice(r, l.index)), t.push(l[0]), r = l.index + l[0].length, i++;
  return a(e.slice(r)), t.join("");
  function a(o) {
    t.push(n(o, i, !o));
  }
}
function xl(e, n, t) {
  const r = (t.before || "") + (n || "") + (t.after || ""), i = [], l = [], a = {};
  let o = -1;
  for (; ++o < e.unsafe.length; ) {
    const h = e.unsafe[o];
    if (!bn(e.stack, h))
      continue;
    const c = e.compilePattern(h);
    let p;
    for (; p = c.exec(r); ) {
      const f = "before" in h || !!h.atBreak, g = "after" in h, w = p.index + (f ? p[1].length : 0);
      i.includes(w) ? (a[w].before && !f && (a[w].before = !1), a[w].after && !g && (a[w].after = !1)) : (i.push(w), a[w] = { before: f, after: g });
    }
  }
  i.sort(bl);
  let s = t.before ? t.before.length : 0;
  const u = r.length - (t.after ? t.after.length : 0);
  for (o = -1; ++o < i.length; ) {
    const h = i[o];
    h < s || h >= u || h + 1 < u && i[o + 1] === h + 1 && a[h].after && !a[h + 1].before && !a[h + 1].after || i[o - 1] === h - 1 && a[h].before && !a[h - 1].before && !a[h - 1].after || (s !== h && l.push(Ht(r.slice(s, h), "\\")), s = h, /[!-/:-@[-`{-~]/.test(r.charAt(h)) && (!t.encode || !t.encode.includes(r.charAt(h))) ? l.push("\\") : (l.push(pe(r.charCodeAt(h))), s++));
  }
  return l.push(Ht(r.slice(s, u), t.after)), l.join("");
}
function bl(e, n) {
  return e - n;
}
function Ht(e, n) {
  const t = /\\(?=[!-/:-@[-`{-~])/g, r = [], i = [], l = e + n;
  let a = -1, o = 0, s;
  for (; s = t.exec(l); )
    r.push(s.index);
  for (; ++a < r.length; )
    o !== r[a] && i.push(e.slice(o, r[a])), i.push("\\"), o = r[a];
  return i.push(e.slice(o)), i.join("");
}
function yl(e) {
  const n = e || {}, t = n.now || {};
  let r = n.lineShift || 0, i = t.line || 1, l = t.column || 1;
  return { move: s, current: a, shift: o };
  function a() {
    return { now: { line: i, column: l }, lineShift: r };
  }
  function o(u) {
    r += u;
  }
  function s(u) {
    const h = u || "", c = h.split(/\r?\n|\r/g), p = c[c.length - 1];
    return i += c.length - 1, l = c.length === 1 ? l + p.length : 1 + p.length + r, h;
  }
}
function wl(e, n) {
  const t = n || {}, r = {
    associationId: hl,
    containerPhrasing: El,
    containerFlow: Tl,
    createTracker: yl,
    compilePattern: fl,
    enter: l,
    // @ts-expect-error: GFM / frontmatter are typed in `mdast` but not defined
    // here.
    handlers: { ...gt },
    // @ts-expect-error: add `handle` in a second.
    handle: void 0,
    indentLines: kl,
    indexStack: [],
    join: [...ul],
    options: {},
    safe: Al,
    stack: [],
    unsafe: [...cl]
  };
  xn(r, t), r.options.tightDefinitions && r.join.push(Il), r.handle = wa("type", {
    invalid: Cl,
    unknown: Sl,
    handlers: r.handlers
  });
  let i = r.handle(e, void 0, r, {
    before: `
`,
    after: `
`,
    now: { line: 1, column: 1 },
    lineShift: 0
  });
  return i && i.charCodeAt(i.length - 1) !== 10 && i.charCodeAt(i.length - 1) !== 13 && (i += `
`), i;
  function l(a) {
    return r.stack.push(a), o;
    function o() {
      r.stack.pop();
    }
  }
}
function Cl(e) {
  throw new Error("Cannot handle value `" + e + "`, expected node");
}
function Sl(e) {
  const n = (
    /** @type {Nodes} */
    e
  );
  throw new Error("Cannot handle unknown node `" + n.type + "`");
}
function Il(e, n) {
  if (e.type === "definition" && e.type === n.type)
    return 0;
}
function El(e, n) {
  return pl(e, this, n);
}
function Tl(e, n) {
  return dl(e, this, n);
}
function Al(e, n) {
  return xl(this, e, n);
}
function zl(e) {
  const n = this;
  n.compiler = t;
  function t(r) {
    return wl(r, {
      ...n.data("settings"),
      ...e,
      // Note: this option is not in the readme.
      // The goal is for it to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("toMarkdownExtensions") || []
    });
  }
}
function qt(e) {
  if (e)
    throw e;
}
function Fl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ve, Vt;
function Ll() {
  if (Vt) return Ve;
  Vt = 1;
  var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(u) {
    return typeof Array.isArray == "function" ? Array.isArray(u) : n.call(u) === "[object Array]";
  }, l = function(u) {
    if (!u || n.call(u) !== "[object Object]")
      return !1;
    var h = e.call(u, "constructor"), c = u.constructor && u.constructor.prototype && e.call(u.constructor.prototype, "isPrototypeOf");
    if (u.constructor && !h && !c)
      return !1;
    var p;
    for (p in u)
      ;
    return typeof p > "u" || e.call(u, p);
  }, a = function(u, h) {
    t && h.name === "__proto__" ? t(u, h.name, {
      enumerable: !0,
      configurable: !0,
      value: h.newValue,
      writable: !0
    }) : u[h.name] = h.newValue;
  }, o = function(u, h) {
    if (h === "__proto__")
      if (e.call(u, h)) {
        if (r)
          return r(u, h).value;
      } else return;
    return u[h];
  };
  return Ve = function s() {
    var u, h, c, p, f, g, w = arguments[0], I = 1, x = arguments.length, E = !1;
    for (typeof w == "boolean" && (E = w, w = arguments[1] || {}, I = 2), (w == null || typeof w != "object" && typeof w != "function") && (w = {}); I < x; ++I)
      if (u = arguments[I], u != null)
        for (h in u)
          c = o(w, h), p = o(u, h), w !== p && (E && p && (l(p) || (f = i(p))) ? (f ? (f = !1, g = c && i(c) ? c : []) : g = c && l(c) ? c : {}, a(w, { name: h, newValue: s(E, g, p) })) : typeof p < "u" && a(w, { name: h, newValue: p }));
    return w;
  }, Ve;
}
var Dl = Ll();
const We = /* @__PURE__ */ Fl(Dl);
function ut(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function _l() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const a = i.pop();
    if (typeof a != "function")
      throw new TypeError("Expected function as last argument, not " + a);
    o(null, ...i);
    function o(s, ...u) {
      const h = e[++l];
      let c = -1;
      if (s) {
        a(s);
        return;
      }
      for (; ++c < i.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = i[c]);
      i = u, h ? Pl(h, o)(...u) : a(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function Pl(e, n) {
  let t;
  return r;
  function r(...a) {
    const o = e.length > a.length;
    let s;
    o && a.push(i);
    try {
      s = e.apply(this, a);
    } catch (u) {
      const h = (
        /** @type {Error} */
        u
      );
      if (o && t)
        throw h;
      return i(h);
    }
    o || (s && s.then && typeof s.then == "function" ? s.then(l, i) : s instanceof Error ? i(s) : l(s));
  }
  function i(a, ...o) {
    t || (t = !0, n(a, ...o));
  }
  function l(a) {
    i(null, a);
  }
}
class Y extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, a = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof n == "string" ? i = n : !l.cause && n && (a = !0, i = n.message, l.cause = n), !l.ruleId && !l.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? l.ruleId = r : (l.source = r.slice(0, s), l.ruleId = r.slice(s + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const o = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = o ? o.line : void 0, this.name = Le(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = a && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
Y.prototype.file = "";
Y.prototype.name = "";
Y.prototype.reason = "";
Y.prototype.message = "";
Y.prototype.stack = "";
Y.prototype.column = void 0;
Y.prototype.line = void 0;
Y.prototype.ancestors = void 0;
Y.prototype.cause = void 0;
Y.prototype.fatal = void 0;
Y.prototype.place = void 0;
Y.prototype.ruleId = void 0;
Y.prototype.source = void 0;
const ie = { basename: Ml, dirname: Bl, extname: Rl, join: vl, sep: "/" };
function Ml(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  _e(e);
  let t = 0, r = -1, i = e.length, l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let a = -1, o = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      a < 0 && (l = !0, a = i + 1), o > -1 && (e.codePointAt(i) === n.codePointAt(o--) ? o < 0 && (r = i) : (o = -1, r = a));
  return t === r ? r = a : r < 0 && (r = e.length), e.slice(t, r);
}
function Bl(e) {
  if (_e(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function Rl(e) {
  _e(e);
  let n = e.length, t = -1, r = 0, i = -1, l = 0, a;
  for (; n--; ) {
    const o = e.codePointAt(n);
    if (o === 47) {
      if (a) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (a = !0, t = n + 1), o === 46 ? i < 0 ? i = n : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function vl(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    _e(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Ol(t);
}
function Ol(e) {
  _e(e);
  const n = e.codePointAt(0) === 47;
  let t = $l(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function $l(e, n) {
  let t = "", r = 0, i = -1, l = 0, a = -1, o, s;
  for (; ++a <= e.length; ) {
    if (a < e.length)
      o = e.codePointAt(a);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === a - 1 || l === 1)) if (i !== a - 1 && l === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), i = a, l = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = a, l = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, a) : t = e.slice(i + 1, a), r = a - i - 1;
      i = a, l = 0;
    } else o === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function _e(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const jl = { cwd: Nl };
function Nl() {
  return "/";
}
function st(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Ul(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!st(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return Hl(e);
}
function Hl(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const Qe = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class ql {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? st(n) ? t = { path: n } : typeof n == "string" || Vl(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : jl.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Qe.length; ) {
      const l = Qe[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      Qe.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ie.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    Ye(n, "basename"), Ge(n, "basename"), this.path = ie.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ie.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    Wt(this.basename, "dirname"), this.path = ie.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ie.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (Ge(n, "extname"), Wt(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ie.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    st(n) && (n = Ul(n)), Ye(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ie.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    Ye(n, "stem"), Ge(n, "stem"), this.path = ie.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const i = new Y(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function Ge(e, n) {
  if (e && e.includes(ie.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + ie.sep + "`"
    );
}
function Ye(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Wt(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Vl(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Wl = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  }
), Ql = {}.hasOwnProperty;
class kt extends Wl {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = _l();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new kt()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(We(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (Ke("data", this.frozen), this.namespace[n] = t, this) : Ql.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Ke("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = Me(n), r = this.parser || this.Parser;
    return Ze("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), Ze("process", this.parser || this.Parser), Je("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, a) {
      const o = Me(n), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(s, o, function(h, c, p) {
        if (h || !c || !p)
          return u(h);
        const f = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), g = r.stringify(f, p);
        Zl(g) ? p.value = g : p.result = g, u(
          h,
          /** @type {VFileWithOutput<CompileResult>} */
          p
        );
      });
      function u(h, c) {
        h || !c ? a(h) : l ? l(c) : t(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), Ze("processSync", this.parser || this.Parser), Je("processSync", this.compiler || this.Compiler), this.process(n, i), Gt("processSync", "process", t), r;
    function i(l, a) {
      t = !0, qt(l), r = a;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    Qt(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(a, o) {
      const s = Me(t);
      i.run(n, s, u);
      function u(h, c, p) {
        const f = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || n
        );
        h ? o(h) : a ? a(f) : r(void 0, f, p);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, l), Gt("runSync", "run", r), i;
    function l(a, o) {
      qt(a), i = o, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = Me(t), i = this.compiler || this.Compiler;
    return Je("stringify", i), Qt(n), i(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (Ke("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? o(n) : a(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [h, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(h, c);
        } else
          a(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function a(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(u.plugins), u.settings && (i.settings = We(!0, i.settings, u.settings));
    }
    function o(u) {
      let h = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++h < u.length; ) {
          const c = u[h];
          l(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, h) {
      let c = -1, p = -1;
      for (; ++c < r.length; )
        if (r[c][0] === u) {
          p = c;
          break;
        }
      if (p === -1)
        r.push([u, ...h]);
      else if (h.length > 0) {
        let [f, ...g] = h;
        const w = r[p][1];
        ut(w) && ut(f) && (f = We(!0, w, f)), r[p] = [u, f, ...g];
      }
    }
  }
}
const Gl = new kt().freeze();
function Ze(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Je(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Ke(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Qt(e) {
  if (!ut(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Gt(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function Me(e) {
  return Yl(e) ? e : new ql(e);
}
function Yl(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Zl(e) {
  return typeof e == "string" || Jl(e);
}
function Jl(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Kl = Gl().use(kn).use(zl).freeze();
function Yt(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, i = t.indexOf(n);
  for (; i !== -1; )
    r++, i = t.indexOf(n, i + n.length);
  return r;
}
function Xl(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function eo(e, n, t) {
  const i = Ne((t || {}).ignore || []), l = to(n);
  let a = -1;
  for (; ++a < l.length; )
    Cn(e, "text", o);
  function o(u, h) {
    let c = -1, p;
    for (; ++c < h.length; ) {
      const f = h[c], g = p ? p.children : void 0;
      if (i(
        f,
        g ? g.indexOf(f) : void 0,
        p
      ))
        return;
      p = f;
    }
    if (p)
      return s(u, h);
  }
  function s(u, h) {
    const c = h[h.length - 1], p = l[a][0], f = l[a][1];
    let g = 0;
    const I = c.children.indexOf(u);
    let x = !1, E = [];
    p.lastIndex = 0;
    let C = p.exec(u.value);
    for (; C; ) {
      const L = C.index, D = {
        index: C.index,
        input: C.input,
        stack: [...h, u]
      };
      let y = f(...C, D);
      if (typeof y == "string" && (y = y.length > 0 ? { type: "text", value: y } : void 0), y === !1 ? p.lastIndex = L + 1 : (g !== L && E.push({
        type: "text",
        value: u.value.slice(g, L)
      }), Array.isArray(y) ? E.push(...y) : y && E.push(y), g = L + C[0].length, x = !0), !p.global)
        break;
      C = p.exec(u.value);
    }
    return x ? (g < u.value.length && E.push({ type: "text", value: u.value.slice(g) }), c.children.splice(I, 1, ...E)) : E = [u], I + E.length;
  }
}
function to(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const i = t[r];
    n.push([no(i[0]), ro(i[1])]);
  }
  return n;
}
function no(e) {
  return typeof e == "string" ? new RegExp(Xl(e), "g") : e;
}
function ro(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Xe = "phrasing", et = ["autolink", "link", "image", "label"];
function io() {
  return {
    transforms: [ho],
    enter: {
      literalAutolink: lo,
      literalAutolinkEmail: tt,
      literalAutolinkHttp: tt,
      literalAutolinkWww: tt
    },
    exit: {
      literalAutolink: co,
      literalAutolinkEmail: so,
      literalAutolinkHttp: oo,
      literalAutolinkWww: uo
    }
  };
}
function ao() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Xe,
        notInConstruct: et
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Xe,
        notInConstruct: et
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Xe,
        notInConstruct: et
      }
    ]
  };
}
function lo(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function tt(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function oo(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function uo(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function so(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function co(e) {
  this.exit(e);
}
function ho(e) {
  eo(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, fo],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), po]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function fo(e, n, t, r, i) {
  let l = "";
  if (!Pn(i) || (/^w/i.test(n) && (t = n + t, n = "", l = "http://"), !mo(t)))
    return !1;
  const a = go(t + r);
  if (!a[0]) return !1;
  const o = {
    type: "link",
    title: null,
    url: l + n + a[0],
    children: [{ type: "text", value: n + a[0] }]
  };
  return a[1] ? [o, { type: "text", value: a[1] }] : o;
}
function po(e, n, t, r) {
  return (
    // Not an expected previous character.
    !Pn(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function mo(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function go(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const i = Yt(e, "(");
  let l = Yt(e, ")");
  for (; r !== -1 && i > l; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), l++;
  return [e, t];
}
function Pn(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || be(t) || $e(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
Mn.peek = Eo;
function ko() {
  this.buffer();
}
function xo(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function bo() {
  this.buffer();
}
function yo(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function wo(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = re(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function Co(e) {
  this.exit(e);
}
function So(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = re(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function Io(e) {
  this.exit(e);
}
function Eo() {
  return "[";
}
function Mn(e, n, t, r) {
  const i = t.createTracker(r);
  let l = i.move("[^");
  const a = t.enter("footnoteReference"), o = t.enter("reference");
  return l += i.move(
    t.safe(t.associationId(e), { after: "]", before: l })
  ), o(), a(), l += i.move("]"), l;
}
function To() {
  return {
    enter: {
      gfmFootnoteCallString: ko,
      gfmFootnoteCall: xo,
      gfmFootnoteDefinitionLabelString: bo,
      gfmFootnoteDefinition: yo
    },
    exit: {
      gfmFootnoteCallString: wo,
      gfmFootnoteCall: Co,
      gfmFootnoteDefinitionLabelString: So,
      gfmFootnoteDefinition: Io
    }
  };
}
function Ao(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: Mn },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, i, l, a) {
    const o = l.createTracker(a);
    let s = o.move("[^");
    const u = l.enter("footnoteDefinition"), h = l.enter("label");
    return s += o.move(
      l.safe(l.associationId(r), { before: s, after: "]" })
    ), h(), s += o.move("]:"), r.children && r.children.length > 0 && (o.shift(4), s += o.move(
      (n ? `
` : " ") + l.indentLines(
        l.containerFlow(r, o.current()),
        n ? Bn : zo
      )
    )), u(), s;
  }
}
function zo(e, n, t) {
  return n === 0 ? e : Bn(e, n, t);
}
function Bn(e, n, t) {
  return (t ? "" : "    ") + e;
}
const Fo = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Rn.peek = Mo;
function Lo() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: _o },
    exit: { strikethrough: Po }
  };
}
function Do() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Fo
      }
    ],
    handlers: { delete: Rn }
  };
}
function _o(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Po(e) {
  this.exit(e);
}
function Rn(e, n, t, r) {
  const i = t.createTracker(r), l = t.enter("strikethrough");
  let a = i.move("~~");
  return a += t.containerPhrasing(e, {
    ...i.current(),
    before: a,
    after: "~"
  }), a += i.move("~~"), l(), a;
}
function Mo() {
  return "~";
}
function Bo(e) {
  return e.length;
}
function Ro(e, n) {
  const t = n || {}, r = (t.align || []).concat(), i = t.stringLength || Bo, l = [], a = [], o = [], s = [];
  let u = 0, h = -1;
  for (; ++h < e.length; ) {
    const w = [], I = [];
    let x = -1;
    for (e[h].length > u && (u = e[h].length); ++x < e[h].length; ) {
      const E = vo(e[h][x]);
      if (t.alignDelimiters !== !1) {
        const C = i(E);
        I[x] = C, (s[x] === void 0 || C > s[x]) && (s[x] = C);
      }
      w.push(E);
    }
    a[h] = w, o[h] = I;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < u; )
      l[c] = Zt(r[c]);
  else {
    const w = Zt(r);
    for (; ++c < u; )
      l[c] = w;
  }
  c = -1;
  const p = [], f = [];
  for (; ++c < u; ) {
    const w = l[c];
    let I = "", x = "";
    w === 99 ? (I = ":", x = ":") : w === 108 ? I = ":" : w === 114 && (x = ":");
    let E = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      s[c] - I.length - x.length
    );
    const C = I + "-".repeat(E) + x;
    t.alignDelimiters !== !1 && (E = I.length + E + x.length, E > s[c] && (s[c] = E), f[c] = E), p[c] = C;
  }
  a.splice(1, 0, p), o.splice(1, 0, f), h = -1;
  const g = [];
  for (; ++h < a.length; ) {
    const w = a[h], I = o[h];
    c = -1;
    const x = [];
    for (; ++c < u; ) {
      const E = w[c] || "";
      let C = "", L = "";
      if (t.alignDelimiters !== !1) {
        const D = s[c] - (I[c] || 0), y = l[c];
        y === 114 ? C = " ".repeat(D) : y === 99 ? D % 2 ? (C = " ".repeat(D / 2 + 0.5), L = " ".repeat(D / 2 - 0.5)) : (C = " ".repeat(D / 2), L = C) : L = " ".repeat(D);
      }
      t.delimiterStart !== !1 && !c && x.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && E === "") && (t.delimiterStart !== !1 || c) && x.push(" "), t.alignDelimiters !== !1 && x.push(C), x.push(E), t.alignDelimiters !== !1 && x.push(L), t.padding !== !1 && x.push(" "), (t.delimiterEnd !== !1 || c !== u - 1) && x.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? x.join("").replace(/ +$/, "") : x.join("")
    );
  }
  return g.join(`
`);
}
function vo(e) {
  return e == null ? "" : String(e);
}
function Zt(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function Oo() {
  return {
    enter: {
      table: $o,
      tableData: Jt,
      tableHeader: Jt,
      tableRow: No
    },
    exit: {
      codeText: Uo,
      table: jo,
      tableData: nt,
      tableHeader: nt,
      tableRow: nt
    }
  };
}
function $o(e) {
  const n = e._align;
  this.enter(
    {
      type: "table",
      align: n.map(function(t) {
        return t === "none" ? null : t;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function jo(e) {
  this.exit(e), this.data.inTable = void 0;
}
function No(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function nt(e) {
  this.exit(e);
}
function Jt(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function Uo(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, Ho));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function Ho(e, n) {
  return n === "|" ? n : e;
}
function qo(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, i = n.stringLength, l = t ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: p,
      table: a,
      tableCell: s,
      tableRow: o
    }
  };
  function a(f, g, w, I) {
    return u(h(f, w, I), f.align);
  }
  function o(f, g, w, I) {
    const x = c(f, w, I), E = u([x]);
    return E.slice(0, E.indexOf(`
`));
  }
  function s(f, g, w, I) {
    const x = w.enter("tableCell"), E = w.enter("phrasing"), C = w.containerPhrasing(f, {
      ...I,
      before: l,
      after: l
    });
    return E(), x(), C;
  }
  function u(f, g) {
    return Ro(f, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function h(f, g, w) {
    const I = f.children;
    let x = -1;
    const E = [], C = g.enter("table");
    for (; ++x < I.length; )
      E[x] = c(I[x], g, w);
    return C(), E;
  }
  function c(f, g, w) {
    const I = f.children;
    let x = -1;
    const E = [], C = g.enter("tableRow");
    for (; ++x < I.length; )
      E[x] = s(I[x], f, g, w);
    return C(), E;
  }
  function p(f, g, w) {
    let I = gt.inlineCode(f, g, w);
    return w.stack.includes("tableCell") && (I = I.replace(/\|/g, "\\$&")), I;
  }
}
function Vo() {
  return {
    exit: {
      taskListCheckValueChecked: Kt,
      taskListCheckValueUnchecked: Kt,
      paragraph: Qo
    }
  };
}
function Wo() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Go }
  };
}
function Kt(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function Qo(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const i = n.children;
      let l = -1, a;
      for (; ++l < i.length; ) {
        const o = i[l];
        if (o.type === "paragraph") {
          a = o;
          break;
        }
      }
      a === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function Go(e, n, t, r) {
  const i = e.children[0], l = typeof e.checked == "boolean" && i && i.type === "paragraph", a = "[" + (e.checked ? "x" : " ") + "] ", o = t.createTracker(r);
  l && o.move(a);
  let s = gt.listItem(e, n, t, {
    ...r,
    ...o.current()
  });
  return l && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s;
  function u(h) {
    return h + a;
  }
}
function Yo() {
  return [
    io(),
    To(),
    Lo(),
    Oo(),
    Vo()
  ];
}
function Zo(e) {
  return {
    extensions: [
      ao(),
      Ao(e),
      Do(),
      qo(e),
      Wo()
    ]
  };
}
const Jo = {
  tokenize: ru,
  partial: !0
}, vn = {
  tokenize: iu,
  partial: !0
}, On = {
  tokenize: au,
  partial: !0
}, $n = {
  tokenize: lu,
  partial: !0
}, Ko = {
  tokenize: ou,
  partial: !0
}, jn = {
  name: "wwwAutolink",
  tokenize: tu,
  previous: Un
}, Nn = {
  name: "protocolAutolink",
  tokenize: nu,
  previous: Hn
}, ce = {
  name: "emailAutolink",
  tokenize: eu,
  previous: qn
}, ae = {};
function Xo() {
  return {
    text: ae
  };
}
let xe = 48;
for (; xe < 123; )
  ae[xe] = ce, xe++, xe === 58 ? xe = 65 : xe === 91 && (xe = 97);
ae[43] = ce;
ae[45] = ce;
ae[46] = ce;
ae[95] = ce;
ae[72] = [ce, Nn];
ae[104] = [ce, Nn];
ae[87] = [ce, jn];
ae[119] = [ce, jn];
function eu(e, n, t) {
  const r = this;
  let i, l;
  return a;
  function a(c) {
    return !ct(c) || !qn.call(r, r.previous) || xt(r.events) ? t(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), o(c));
  }
  function o(c) {
    return ct(c) ? (e.consume(c), o) : c === 64 ? (e.consume(c), s) : t(c);
  }
  function s(c) {
    return c === 46 ? e.check(Ko, h, u)(c) : c === 45 || c === 95 || G(c) ? (l = !0, e.consume(c), s) : h(c);
  }
  function u(c) {
    return e.consume(c), i = !0, s;
  }
  function h(c) {
    return l && i && W(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(c)) : t(c);
  }
}
function tu(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return a !== 87 && a !== 119 || !Un.call(r, r.previous) || xt(r.events) ? t(a) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Jo, e.attempt(vn, e.attempt(On, l), t), t)(a));
  }
  function l(a) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(a);
  }
}
function nu(e, n, t) {
  const r = this;
  let i = "", l = !1;
  return a;
  function a(c) {
    return (c === 72 || c === 104) && Hn.call(r, r.previous) && !xt(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), o) : t(c);
  }
  function o(c) {
    if (W(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), o;
    if (c === 58) {
      const p = i.toLowerCase();
      if (p === "http" || p === "https")
        return e.consume(c), s;
    }
    return t(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), l ? u : (l = !0, s)) : t(c);
  }
  function u(c) {
    return c === null || ve(c) || j(c) || be(c) || $e(c) ? t(c) : e.attempt(vn, e.attempt(On, h), t)(c);
  }
  function h(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(c);
  }
}
function ru(e, n, t) {
  let r = 0;
  return i;
  function i(a) {
    return (a === 87 || a === 119) && r < 3 ? (r++, e.consume(a), i) : a === 46 && r === 3 ? (e.consume(a), l) : t(a);
  }
  function l(a) {
    return a === null ? t(a) : n(a);
  }
}
function iu(e, n, t) {
  let r, i, l;
  return a;
  function a(u) {
    return u === 46 || u === 95 ? e.check($n, s, o)(u) : u === null || j(u) || be(u) || u !== 45 && $e(u) ? s(u) : (l = !0, e.consume(u), a);
  }
  function o(u) {
    return u === 95 ? r = !0 : (i = r, r = void 0), e.consume(u), a;
  }
  function s(u) {
    return i || r || !l ? t(u) : n(u);
  }
}
function au(e, n) {
  let t = 0, r = 0;
  return i;
  function i(a) {
    return a === 40 ? (t++, e.consume(a), i) : a === 41 && r < t ? l(a) : a === 33 || a === 34 || a === 38 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 60 || a === 63 || a === 93 || a === 95 || a === 126 ? e.check($n, n, l)(a) : a === null || j(a) || be(a) ? n(a) : (e.consume(a), i);
  }
  function l(a) {
    return a === 41 && r++, e.consume(a), i;
  }
}
function lu(e, n, t) {
  return r;
  function r(o) {
    return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), l) : o === 93 ? (e.consume(o), i) : (
      // `<` is an end.
      o === 60 || // So is whitespace.
      o === null || j(o) || be(o) ? n(o) : t(o)
    );
  }
  function i(o) {
    return o === null || o === 40 || o === 91 || j(o) || be(o) ? n(o) : r(o);
  }
  function l(o) {
    return W(o) ? a(o) : t(o);
  }
  function a(o) {
    return o === 59 ? (e.consume(o), r) : W(o) ? (e.consume(o), a) : t(o);
  }
}
function ou(e, n, t) {
  return r;
  function r(l) {
    return e.consume(l), i;
  }
  function i(l) {
    return G(l) ? t(l) : n(l);
  }
}
function Un(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || j(e);
}
function Hn(e) {
  return !W(e);
}
function qn(e) {
  return !(e === 47 || ct(e));
}
function ct(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || G(e);
}
function xt(e) {
  let n = e.length, t = !1;
  for (; n--; ) {
    const r = e[n][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      t = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return e.length > 0 && !t && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
const uu = {
  tokenize: gu,
  partial: !0
};
function su() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: pu,
        continuation: {
          tokenize: du
        },
        exit: mu
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: fu
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: cu,
        resolveTo: hu
      }
    }
  };
}
function cu(e, n, t) {
  const r = this;
  let i = r.events.length;
  const l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a;
  for (; i--; ) {
    const s = r.events[i][1];
    if (s.type === "labelImage") {
      a = s;
      break;
    }
    if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link")
      break;
  }
  return o;
  function o(s) {
    if (!a || !a._balanced)
      return t(s);
    const u = re(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !l.includes(u.slice(1)) ? t(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), n(s));
  }
}
function hu(e, n) {
  let t = e.length;
  for (; t--; )
    if (e[t][1].type === "labelImage" && e[t][0] === "enter") {
      e[t][1];
      break;
    }
  e[t + 1][1].type = "data", e[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[t + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const l = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, a = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, l.start),
    end: Object.assign({}, l.end)
  }, o = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[t + 1],
    e[t + 2],
    ["enter", r, n],
    // The `[`
    e[t + 3],
    e[t + 4],
    // The `^`.
    ["enter", i, n],
    ["exit", i, n],
    // Everything in between.
    ["enter", l, n],
    ["enter", a, n],
    ["exit", a, n],
    ["exit", l, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...o), e;
}
function fu(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l = 0, a;
  return o;
  function o(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), s;
  }
  function s(c) {
    return c !== 94 ? t(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", u);
  }
  function u(c) {
    if (
      // Too long.
      l > 999 || // Closing brace with nothing.
      c === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || j(c)
    )
      return t(c);
    if (c === 93) {
      e.exit("chunkString");
      const p = e.exit("gfmFootnoteCallString");
      return i.includes(re(r.sliceSerialize(p))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(c);
    }
    return j(c) || (a = !0), l++, e.consume(c), c === 92 ? h : u;
  }
  function h(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), l++, u) : u(c);
  }
}
function pu(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l, a = 0, o;
  return s;
  function s(g) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
  }
  function u(g) {
    return g === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", h) : t(g);
  }
  function h(g) {
    if (
      // Too long.
      a > 999 || // Closing brace with nothing.
      g === 93 && !o || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      g === null || g === 91 || j(g)
    )
      return t(g);
    if (g === 93) {
      e.exit("chunkString");
      const w = e.exit("gfmFootnoteDefinitionLabelString");
      return l = re(r.sliceSerialize(w)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return j(g) || (o = !0), a++, e.consume(g), g === 92 ? c : h;
  }
  function c(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), a++, h) : h(g);
  }
  function p(g) {
    return g === 58 ? (e.enter("definitionMarker"), e.consume(g), e.exit("definitionMarker"), i.includes(l) || i.push(l), M(e, f, "gfmFootnoteDefinitionWhitespace")) : t(g);
  }
  function f(g) {
    return n(g);
  }
}
function du(e, n, t) {
  return e.check(De, n, e.attempt(uu, n, t));
}
function mu(e) {
  e.exit("gfmFootnoteDefinition");
}
function gu(e, n, t) {
  const r = this;
  return M(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "gfmFootnoteDefinitionIndent" && a[2].sliceSerialize(a[1], !0).length === 4 ? n(l) : t(l);
  }
}
function ku(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: l,
    resolveAll: i
  };
  return t == null && (t = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function i(a, o) {
    let s = -1;
    for (; ++s < a.length; )
      if (a[s][0] === "enter" && a[s][1].type === "strikethroughSequenceTemporary" && a[s][1]._close) {
        let u = s;
        for (; u--; )
          if (a[u][0] === "exit" && a[u][1].type === "strikethroughSequenceTemporary" && a[u][1]._open && // If the sizes are the same:
          a[s][1].end.offset - a[s][1].start.offset === a[u][1].end.offset - a[u][1].start.offset) {
            a[s][1].type = "strikethroughSequence", a[u][1].type = "strikethroughSequence";
            const h = {
              type: "strikethrough",
              start: Object.assign({}, a[u][1].start),
              end: Object.assign({}, a[s][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, a[u][1].end),
              end: Object.assign({}, a[s][1].start)
            }, p = [["enter", h, o], ["enter", a[u][1], o], ["exit", a[u][1], o], ["enter", c, o]], f = o.parser.constructs.insideSpan.null;
            f && J(p, p.length, 0, je(f, a.slice(u + 1, s), o)), J(p, p.length, 0, [["exit", c, o], ["enter", a[s][1], o], ["exit", a[s][1], o], ["exit", h, o]]), J(a, u - 1, s - u + 3, p), s = u + p.length - 2;
            break;
          }
      }
    for (s = -1; ++s < a.length; )
      a[s][1].type === "strikethroughSequenceTemporary" && (a[s][1].type = "data");
    return a;
  }
  function l(a, o, s) {
    const u = this.previous, h = this.events;
    let c = 0;
    return p;
    function p(g) {
      return u === 126 && h[h.length - 1][1].type !== "characterEscape" ? s(g) : (a.enter("strikethroughSequenceTemporary"), f(g));
    }
    function f(g) {
      const w = Ie(u);
      if (g === 126)
        return c > 1 ? s(g) : (a.consume(g), c++, f);
      if (c < 2 && !t) return s(g);
      const I = a.exit("strikethroughSequenceTemporary"), x = Ie(g);
      return I._open = !x || x === 2 && !!w, I._close = !w || w === 2 && !!x, o(g);
    }
  }
}
class xu {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(n, t, r) {
    bu(this, n, t, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(n) {
    if (this.map.sort(function(l, a) {
      return l[0] - a[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const l of i)
        n.push(l);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function bu(e, n, t, r) {
  let i = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === n) {
        e.map[i][1] += t, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([n, t, r]);
  }
}
function yu(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const i = e[n];
    if (t) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const l = r.length - 1;
          r[l] = r[l] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function wu() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Cu,
        resolveAll: Su
      }
    }
  };
}
function Cu(e, n, t) {
  const r = this;
  let i = 0, l = 0, a;
  return o;
  function o(k) {
    let T = r.events.length - 1;
    for (; T > -1; ) {
      const U = r.events[T][1].type;
      if (U === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      U === "linePrefix") T--;
      else break;
    }
    const A = T > -1 ? r.events[T][1].type : null, O = A === "tableHead" || A === "tableRow" ? y : s;
    return O === y && r.parser.lazy[r.now().line] ? t(k) : O(k);
  }
  function s(k) {
    return e.enter("tableHead"), e.enter("tableRow"), u(k);
  }
  function u(k) {
    return k === 124 || (a = !0, l += 1), h(k);
  }
  function h(k) {
    return k === null ? t(k) : z(k) ? l > 1 ? (l = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), f) : t(k) : _(k) ? M(e, h, "whitespace")(k) : (l += 1, a && (a = !1, i += 1), k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), a = !0, h) : (e.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || j(k) ? (e.exit("data"), h(k)) : (e.consume(k), k === 92 ? p : c);
  }
  function p(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k);
  }
  function f(k) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(k) : (e.enter("tableDelimiterRow"), a = !1, _(k) ? M(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : g(k));
  }
  function g(k) {
    return k === 45 || k === 58 ? I(k) : k === 124 ? (a = !0, e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), w) : D(k);
  }
  function w(k) {
    return _(k) ? M(e, I, "whitespace")(k) : I(k);
  }
  function I(k) {
    return k === 58 ? (l += 1, a = !0, e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), x) : k === 45 ? (l += 1, x(k)) : k === null || z(k) ? L(k) : D(k);
  }
  function x(k) {
    return k === 45 ? (e.enter("tableDelimiterFiller"), E(k)) : D(k);
  }
  function E(k) {
    return k === 45 ? (e.consume(k), E) : k === 58 ? (a = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), C) : (e.exit("tableDelimiterFiller"), C(k));
  }
  function C(k) {
    return _(k) ? M(e, L, "whitespace")(k) : L(k);
  }
  function L(k) {
    return k === 124 ? g(k) : k === null || z(k) ? !a || i !== l ? D(k) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(k)) : D(k);
  }
  function D(k) {
    return t(k);
  }
  function y(k) {
    return e.enter("tableRow"), B(k);
  }
  function B(k) {
    return k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), B) : k === null || z(k) ? (e.exit("tableRow"), n(k)) : _(k) ? M(e, B, "whitespace")(k) : (e.enter("data"), N(k));
  }
  function N(k) {
    return k === null || k === 124 || j(k) ? (e.exit("data"), B(k)) : (e.consume(k), k === 92 ? v : N);
  }
  function v(k) {
    return k === 92 || k === 124 ? (e.consume(k), N) : N(k);
  }
}
function Su(e, n) {
  let t = -1, r = !0, i = 0, l = [0, 0, 0, 0], a = [0, 0, 0, 0], o = !1, s = 0, u, h, c;
  const p = new xu();
  for (; ++t < e.length; ) {
    const f = e[t], g = f[1];
    f[0] === "enter" ? g.type === "tableHead" ? (o = !1, s !== 0 && (Xt(p, n, s, u, h), h = void 0, s = 0), u = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", u, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, c = void 0, l = [0, 0, 0, 0], a = [0, t + 1, 0, 0], o && (o = !1, h = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", h, n]])), i = g.type === "tableDelimiterRow" ? 2 : h ? 3 : 1) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, a[2] === 0 && (l[1] !== 0 && (a[0] = a[1], c = Be(p, n, l, i, void 0, c), l = [0, 0, 0, 0]), a[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (l[1] !== 0 && (a[0] = a[1], c = Be(p, n, l, i, void 0, c)), l = a, a = [l[1], t, 0, 0])) : g.type === "tableHead" ? (o = !0, s = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (s = t, l[1] !== 0 ? (a[0] = a[1], c = Be(p, n, l, i, t, c)) : a[1] !== 0 && (c = Be(p, n, a, i, t, c)), i = 0) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (a[3] = t);
  }
  for (s !== 0 && Xt(p, n, s, u, h), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const f = n.events[t];
    f[0] === "enter" && f[1].type === "table" && (f[1]._align = yu(n.events, t));
  }
  return e;
}
function Be(e, n, t, r, i, l) {
  const a = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", o = "tableContent";
  t[0] !== 0 && (l.end = Object.assign({}, Se(n.events, t[0])), e.add(t[0], 0, [["exit", l, n]]));
  const s = Se(n.events, t[1]);
  if (l = {
    type: a,
    start: Object.assign({}, s),
    // Note: correct end is set later.
    end: Object.assign({}, s)
  }, e.add(t[1], 0, [["enter", l, n]]), t[2] !== 0) {
    const u = Se(n.events, t[2]), h = Se(n.events, t[3]), c = {
      type: o,
      start: Object.assign({}, u),
      end: Object.assign({}, h)
    };
    if (e.add(t[2], 0, [["enter", c, n]]), r !== 2) {
      const p = n.events[t[2]], f = n.events[t[3]];
      if (p[1].end = Object.assign({}, f[1].end), p[1].type = "chunkText", p[1].contentType = "text", t[3] > t[2] + 1) {
        const g = t[2] + 1, w = t[3] - t[2] - 1;
        e.add(g, w, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", c, n]]);
  }
  return i !== void 0 && (l.end = Object.assign({}, Se(n.events, i)), e.add(i, 0, [["exit", l, n]]), l = void 0), l;
}
function Xt(e, n, t, r, i) {
  const l = [], a = Se(n.events, t);
  i && (i.end = Object.assign({}, a), l.push(["exit", i, n])), r.end = Object.assign({}, a), l.push(["exit", r, n]), e.add(t + 1, 0, l);
}
function Se(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Iu = {
  name: "tasklistCheck",
  tokenize: Tu
};
function Eu() {
  return {
    text: {
      91: Iu
    }
  };
}
function Tu(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), l)
    );
  }
  function l(s) {
    return j(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), a) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), a) : t(s);
  }
  function a(s) {
    return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), o) : t(s);
  }
  function o(s) {
    return z(s) ? n(s) : _(s) ? e.check({
      tokenize: Au
    }, n, t)(s) : t(s);
  }
}
function Au(e, n, t) {
  return M(e, r, "whitespace");
  function r(i) {
    return i === null ? t(i) : n(i);
  }
}
function zu(e) {
  return nn([
    Xo(),
    su(),
    ku(e),
    wu(),
    Eu()
  ]);
}
const Fu = {};
function Lu(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || Fu, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), l = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), a = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(zu(t)), l.push(Yo()), a.push(Zo(t));
}
async function Vn(e) {
  filteredContent = e.replaceAll("<br>*", "").replaceAll("(| *)[^a-zA-Z0-9s-]+|[^a-zA-Z0-9s-]+( *|)", "");
  const n = Kl().use(kn).use(Lu).parse(filteredContent);
  function t(r) {
    let i = [];
    return r.forEach((l) => {
      switch (l.type) {
        case "heading":
          i.push(nr(l));
          break;
        case "paragraph":
          i.push(It(l));
          break;
        case "list":
          i.push(ar(l));
          break;
        case "thematicBreak":
          i.push(or());
          break;
        case "code":
          i.push(fr(l));
          break;
        case "blockquote":
          i.push(cr(l));
          break;
        case "link":
          i.push(dr(l));
          break;
        case "table":
          i.push(gr(l));
          break;
        default:
          i.push(It(l));
          break;
      }
      if (l.children && l.type !== "list") {
        const a = t(l.children);
        i.push(...a);
      }
    }), i = i.filter((l) => Object.keys(l).length !== 0), i.filter((l) => !(l.type === "paragraph" && l.data.text === ""));
  }
  return t(n.children);
}
class Du {
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * creates the Importer plugin
   * {editorData, api functions} - necessary to interact with the editor
   */
  constructor({
    data: n,
    api: t,
    config: r,
    block: i
  }) {
    this.data = n, this.api = t, this.config = r || {}, this.config.extensions = this.config.extensions || ["md", "markdown", "txt"], this.block = i, this.wrapper = null, this.settingsWrapper = null, this.fileUploadInput = null, this.fileUploadButton = null, this.stringUploadInput = null, this.stringUploadButton = null, this.settings = [
      /*
      {
        name: 'replaceContent',
        label: 'Replace current content',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
      }
      */
    ];
  }
  /**
   * @return Plugin data such as title and icon
   */
  static get toolbox() {
    return {
      title: "Import Markdown",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(112, 118, 132)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-fileUploadInput"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>'
    };
  }
  /**
   * Paste handler for the plugin
   */
  static get pasteConfig() {
    return {
      files: {
        mimeTypes: ["text/*"],
        extensions: ["md", "markdown", "txt"]
      }
    };
  }
  onPaste(n) {
    switch (n.type) {
      case "file":
      default: {
        const { file: t } = n.detail, r = new FileReader();
        r.onload = (i) => {
          const l = i.target.result;
          return this.parse(l);
        }, r.readAsText(t, "UTF-8");
      }
    }
  }
  /**
  * Function inserts an array into another array at a given index
  * @param {Array} target - the array to insert into
  * @param {Array} body - the array to insert
  * @param {Number} startIndex - the index to insert at
  * @return {Array} - the new array with the body inserted at the index
  */
  // eslint-disable-next-line class-methods-use-this
  insertArray(n, t, r) {
    const i = n.splice(r);
    return [].concat(n, t, i);
  }
  /**
  * Function which parses markdown file to JSON which correspons the the editor structure
  */
  async parse(n) {
    const t = await this.api.saver.save();
    this.config.append || this.api.blocks.clear();
    const r = await Vn(n);
    let i = this.config.append ? this.insertArray(t.blocks, r, this.api.blocks.getCurrentBlockIndex()) : r;
    i = i.filter((l) => l.type !== "markdownImporter"), this.api.blocks.render({
      blocks: i
    }), this.config.callback && this.config.callback({
      blocks: i
    });
  }
  /**
   * Function which creates the plugin UI
   */
  async upload() {
    this.fileUploadInput.onchange = (n) => {
      const t = n.target.files[0], r = new FileReader();
      r.onload = (i) => {
        const l = i.target.result;
        return this.parse(l.replace(new RegExp("(?<!`)`(?!`)([^`]+)`(?!`)(?<!`)", "g"), "<code>$1</code>"));
      }, r.readAsText(t, "UTF-8");
    };
  }
  /**
   * Renders the plugin UI
   * @return {HTMLDivElement} wrapper - the plugin UI
   */
  render() {
    this.wrapper = document.createElement("div"), this.wrapper.classList.add("cdx-block"), this.stringUploadInput = document.createElement("textarea"), this.stringUploadInput.value = this.data && this.data.filename ? this.data.filename : "", this.stringUploadInput.classList.add("cdx-input"), this.stringUploadInput.style.height = "500px", this.wrapper.appendChild(this.stringUploadInput), this.stringUploadButton = document.createElement("button"), this.stringUploadButton.classList.add("cdx-button"), this.stringUploadButton.innerHTML = "Load Markdown", this.stringUploadButton.onclick = () => this.stringUploadInput.value !== "" ? this.parse(this.stringUploadInput.value) : (this.api.blocks.delete(this.api.blocks.getCurrentBlockIndex()), this.parse(" ")), this.wrapper.appendChild(this.stringUploadButton);
    const n = document.createElement("div");
    return n.innerHTML = "<small>OR</small>", n.classList.add("cdx-block__divider"), this.wrapper.appendChild(n), this.fileUploadInput = this.fileUploadInput ? this.fileUploadInput : document.createElement("input"), this.fileUploadInput.hidden = !0, this.fileUploadInput.type = "file", this.fileUploadInput.id = "file-upload", this.fileUploadInput.name = "files[]", this.fileUploadInput.classList.add("cdx-button"), this.wrapper.appendChild(this.fileUploadInput), this.fileUploadButton = document.createElement("button"), this.fileUploadButton.classList.add("cdx-button"), this.fileUploadButton.innerHTML = "Upload Markdown .md file", this.fileUploadButton.onclick = () => {
      this.fileUploadInput.click();
    }, this.wrapper.appendChild(this.fileUploadButton), this.upload(), this.wrapper;
  }
  /**
   * Renders the plugin settings
   * @return {HTMLDivElement} settingsWrapper - the plugin settings
   */
  renderSettings() {
    return this.settingsWrapper = document.createElement("div"), this.settings.forEach((n) => {
      const t = document.createElement("div");
      t.classList.add("ce-popover__item");
      const r = document.createElement("div");
      r.classList.add("ce-popover__item-icon"), r.innerHTML = n.icon, t.appendChild(r);
      const i = document.createElement("div");
      i.classList.add("ce-popover__item-label"), i.innerHTML = n.label, t.appendChild(i), this.settingsWrapper.appendChild(t);
    }), this.settingsWrapper;
  }
  /**
   * Saves the plugin data into JSON format (used as placeholder for UI)
   * @return {Object} data - the plugin data
   */
  // eslint-disable-next-line class-methods-use-this
  save() {
    return {
      message: "Uploading Markdown"
    };
  }
}
const _u = yr, Pu = Du, Mu = en, Bu = Vn;
export {
  Pu as MDImporter,
  _u as MDParser,
  Mu as MDfromBlocks,
  Bu as MDtoBlocks
};
