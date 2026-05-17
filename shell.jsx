// shell.jsx — Cursor, Intro, Nav, Curtain, Footer, helpers
// React hooks: useState/useEffect/useRef. Component definitions exposed via window.

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─── Custom cursor that follows mouse, expands over [data-cursor] elements
function Cursor() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const [mode, setMode] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    let raf, x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        const m = t.getAttribute("data-cursor") || "link";
        const lb = t.getAttribute("data-cursor-label") || "";
        setMode(m); setLabel(lb);
      } else { setMode(""); setLabel(""); }
    };
    const tick = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div ref={ref} className={"cursor " + (mode ? "is-" + mode : "")}>
      <span className="cursor__label">{label}</span>
    </div>
  );
}

// ─── Cinematic intro — minimal: concentric circle marks expand, brand fades in
function Intro({ onDone }) {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("in"), 40);
    const t2 = setTimeout(() => setPhase("out"), 1200);
    const t3 = setTimeout(onDone, 2000);
    const skip = () => { setPhase("out"); setTimeout(onDone, 600); };
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener("click", skip); window.removeEventListener("keydown", skip);
    };
  }, [onDone]);

  return (
    <div className={"intro " + (phase === "out" ? "is-out" : "")}>
      <div className="intro__mark" aria-hidden>
        <span className={"ring r1 " + (phase === "in" ? "in" : "")} />
        <span className={"ring r2 " + (phase === "in" ? "in" : "")} />
        <span className={"ring r3 " + (phase === "in" ? "in" : "")} />
        <span className={"dot " + (phase === "in" ? "in" : "")} />
      </div>
      <div className={"intro__brand " + (phase === "in" ? "in" : "")}>
        <span>GHPlanet</span>
        <span className="intro__brand-sub">디지털 스튜디오 · 서울</span>
      </div>
    </div>
  );
}

// ─── Top navigation with morphing labels
function Nav({ route, onNav }) {
  return (
    <nav className="nav">
      <a className="nav__brand" href="/" onClick={(e)=>{e.preventDefault(); onNav("home");}} data-cursor="link" data-cursor-label="Index">
        <span className="dot" />
        <span>GHPlanet</span>
      </a>
      <div className="nav__links">
        {window.NAV_LINKS.map(l => (
          <a key={l.key} className={"nav__link " + (route === l.key ? "is-active" : "")}
             href={l.key === "home" ? "/" : "/" + l.key + "/"} onClick={(e)=>{e.preventDefault(); onNav(l.key);}}>
            <span className="nav__link__stack">
              <span>{l.label}</span>
            </span>
          </a>
        ))}
      </div>
      <a className="nav__cta" href="/quote/" onClick={(e)=>{e.preventDefault(); onNav("quote");}} data-cursor="link" data-cursor-label="견적">
        <span className="pulse" />
        프로젝트 의뢰
      </a>
    </nav>
  );
}

// ─── Curtain transition (used between page changes)
function useCurtain() {
  const [state, setState] = useState("");
  const wipe = useCallback((cb) => {
    setState("is-in");
    setTimeout(() => { cb(); setState("is-out"); }, 560);
    setTimeout(() => { setState(""); }, 1180);
  }, []);
  const node = state ? <div className={"curtain " + state} /> : null;
  return [node, wipe];
}

// ─── Footer
function Footer({ onNav }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__lead">
          새로운 프로덕트를 만들고 계신가요?<br/>
          GHPlanet과 함께 시작해 보세요.
        </div>
        <div className="footer__cta">
          <a className="footer__btn" href="/quote/" onClick={(e)=>{e.preventDefault(); onNav("quote");}} data-cursor="link" data-cursor-label="Start">
            견적 요청하기 <span className="arrow"/>
          </a>
        </div>
      </div>
      <div className="footer__cols">
        <div className="footer__col">
          <h4>스튜디오</h4>
          <a href="/about/" onClick={(e)=>{e.preventDefault(); onNav("about");}}>소개</a>
          <a href="/services/" onClick={(e)=>{e.preventDefault(); onNav("services");}}>서비스</a>
          <a href="/work/" onClick={(e)=>{e.preventDefault(); onNav("work");}}>포트폴리오</a>
          <a href="/contact/" onClick={(e)=>{e.preventDefault(); onNav("contact");}}>연락</a>
        </div>
        <div className="footer__col">
          <h4>연락</h4>
          <a href="mailto:me@ghyeok.io">me@ghyeok.io</a>
          <p>언제든 편하게 연락 주세요</p>
        </div>
        <div className="footer__col">
          <h4>코드</h4>
          <a href="https://github.com/GwonHyeok" target="_blank" rel="noopener" data-cursor="link" data-cursor-label="↗">GitHub · GwonHyeok</a>
        </div>
      </div>
      <div className="footer__base">
        <span>© 2021–2026 GHPlanet (지에이치플래닛) · 권혁</span>
        <span>사업자 등록 2021.11.24 · 등록번호 589-11-01997</span>
      </div>
    </footer>
  );
}

// ─── Reveal on scroll
function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "-10% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

// ─── Marquee
function Marquee({ items }) {
  const node = items.map((it, i) => <span key={i}>{it}</span>);
  return (
    <div className="marquee" data-cursor="text">
      <div className="marquee__track">{node}{node}{node}{node}</div>
    </div>
  );
}

// ─── Magnetic CTA — button gently translates toward cursor when hovered
function Magnetic({ children, className = "", strength = 0.35, as: Tag = "a", ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    ref.current.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
    const inner = ref.current.querySelector(".mag__inner");
    if (inner) inner.style.transform = `translate(${x*strength*0.4}px, ${y*strength*0.4}px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "";
    const inner = ref.current.querySelector(".mag__inner");
    if (inner) inner.style.transform = "";
  };
  return (
    <Tag ref={ref} className={"mag " + className} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      <span className="mag__inner">{children}</span>
    </Tag>
  );
}

// ─── HoverPreview — a single floating image card that follows the cursor
// when hovering elements with [data-preview]. Smooth-tweened with rAF.
function HoverPreview() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const tagRef = useRef(null);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false, label: "", tag: "" });

  useEffect(() => {
    let raf;
    const tick = () => {
      const s = stateRef.current;
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onMove = (e) => {
      stateRef.current.tx = e.clientX;
      stateRef.current.ty = e.clientY;
    };
    const onOver = (e) => {
      const t = e.target.closest("[data-preview]");
      if (t) {
        const lb = t.getAttribute("data-preview") || "";
        const tg = t.getAttribute("data-preview-tag") || "";
        stateRef.current.label = lb;
        stateRef.current.tag = tg;
        if (labelRef.current) labelRef.current.textContent = lb;
        if (tagRef.current) tagRef.current.textContent = tg;
        ref.current.classList.add("is-on");
        stateRef.current.x = e.clientX;
        stateRef.current.y = e.clientY;
      } else {
        ref.current.classList.remove("is-on");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div ref={ref} className="hover-prev" aria-hidden="true">
      <div className="hover-prev__media">
        <span className="hover-prev__ph"></span>
        <span className="hover-prev__title" ref={labelRef}></span>
      </div>
      <div className="hover-prev__tag" ref={tagRef}></div>
    </div>
  );
}

// ─── Command Palette (⌘K / Ctrl+K)
function CommandPalette({ onNav, route }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(() => {
    const projects = (window.PROJECTS || []).map(p => ({
      type: "project",
      group: "작업",
      label: p.title,
      hint: p.industry + " · " + p.year,
      run: () => onNav("work/" + p.id),
    }));
    const pages = [
      { type: "page", group: "페이지", label: "홈",        hint: "/",          run: () => onNav("home") },
      { type: "page", group: "페이지", label: "소개",      hint: "/about",     run: () => onNav("about") },
      { type: "page", group: "페이지", label: "서비스",    hint: "/services",  run: () => onNav("services") },
      { type: "page", group: "페이지", label: "포트폴리오", hint: "/work",      run: () => onNav("work") },
      { type: "page", group: "페이지", label: "연락",      hint: "/contact",   run: () => onNav("contact") },
      { type: "page", group: "페이지", label: "프로젝트 의뢰", hint: "/quote",  run: () => onNav("quote") },
    ];
    const links = [
      { type: "link", group: "외부", label: "이메일 보내기",   hint: "me@ghyeok.io", run: () => { window.location.href = "mailto:me@ghyeok.io"; } },
      { type: "link", group: "외부", label: "GitHub",         hint: "github.com/GwonHyeok", run: () => window.open("https://github.com/GwonHyeok", "_blank") },
    ];
    return [...pages, ...projects, ...links];
  }, [onNav, route]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter(a =>
      a.label.toLowerCase().includes(s) ||
      a.hint.toLowerCase().includes(s) ||
      a.group.toLowerCase().includes(s)
    );
  }, [q, actions]);

  useEffect(() => { setIdx(0); }, [q]);

  useEffect(() => {
    const onKey = (e) => {
      const cmd = e.metaKey || e.ctrlKey;
      if (cmd && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      } else if (open && e.key === "ArrowDown") {
        e.preventDefault();
        setIdx(i => Math.min(filtered.length - 1, i + 1));
      } else if (open && e.key === "ArrowUp") {
        e.preventDefault();
        setIdx(i => Math.max(0, i - 1));
      } else if (open && e.key === "Enter") {
        e.preventDefault();
        const sel = filtered[idx];
        if (sel) { sel.run(); setOpen(false); setQ(""); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered, idx]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = "";
      setQ("");
    }
  }, [open]);

  if (!open) return null;

  let lastGroup = null;
  return (
    <div className="cmdk" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
      <div className="cmdk__panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk__inputbar">
          <span className="cmdk__prompt">⌘K ›</span>
          <input
            ref={inputRef}
            className="cmdk__input"
            placeholder="페이지 · 프로젝트 · 연락 검색…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            data-cursor="text"
          />
          <span className="cmdk__esc">ESC</span>
        </div>
        <div className="cmdk__list">
          {filtered.length === 0 && (
            <div className="cmdk__empty">결과 없음 — "{q}"</div>
          )}
          {filtered.map((a, i) => {
            const showGroup = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <React.Fragment key={a.label + i}>
                {showGroup && <div className="cmdk__group">{a.group}</div>}
                <button
                  type="button"
                  className={"cmdk__item " + (i === idx ? "is-on" : "")}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => { a.run(); setOpen(false); setQ(""); }}
                  data-cursor="link"
                >
                  <span className="cmdk__item-label">{a.label}</span>
                  <span className="cmdk__item-hint">{a.hint}</span>
                  <span className="cmdk__item-arrow">↵</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
        <div className="cmdk__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> 이동</span>
          <span><kbd>↵</kbd> 선택</span>
          <span><kbd>esc</kbd> 닫기</span>
          <span className="cmdk__foot-right">{filtered.length}개 항목</span>
        </div>
      </div>
    </div>
  );
}

// ─── tmux-style Status Bar (bottom, hides over dark footer)
function StatusBar({ route }) {
  const [scroll, setScroll] = useState(0);
  const [hide, setHide] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const top = h.scrollTop || window.scrollY;
      setScroll(max > 0 ? Math.round(top / max * 100) : 0);
      // Hide when overlapping the dark footer zone (last ~360px of page)
      const distFromBottom = max - top;
      setHide(distFromBottom < 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [route]);

  useEffect(() => {
    const upd = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", hour12: false,
        });
        setTime(fmt.format(new Date()));
      } catch { setTime(""); }
    };
    upd();
    const id = setInterval(upd, 30000);
    return () => clearInterval(id);
  }, []);

  const pathFor = (r) => {
    if (r.startsWith("work/")) return "~/ghyeok/work/" + r.slice(5) + ".md";
    if (r === "home" || !r) return "~/ghyeok";
    return "~/ghyeok/" + r + ".md";
  };

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const cmdKey = isMac ? "⌘" : "Ctrl";

  return (
    <div className={"statusbar" + (hide ? " is-hidden" : "")} aria-hidden="true">
      <span className="sb__seg sb__seg--brand">[main]</span>
      <span className="sb__seg sb__seg--path">{pathFor(route)}</span>
      <span className="sb__seg sb__bar">▍</span>
      <span className="sb__seg sb__seg--scroll">↓ {String(scroll).padStart(2, "0")}%</span>
      <span className="sb__seg sb__bar">▍</span>
      <span className="sb__seg sb__seg--time">{time} KST</span>
      <span className="sb__seg sb__spacer" />
      <span className="sb__seg sb__seg--hint">{cmdKey}K · 어디로든</span>
      <span className="sb__seg sb__bar">▍</span>
      <span className="sb__seg sb__seg--dot"><span className="sb__dot" /> LIVE</span>
    </div>
  );
}

Object.assign(window, { Cursor, Intro, Nav, useCurtain, Footer, useReveal, Marquee, Magnetic, HoverPreview, CommandPalette, StatusBar });
