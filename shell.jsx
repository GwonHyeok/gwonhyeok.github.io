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
      <a className="nav__brand" href="#home" onClick={(e)=>{e.preventDefault(); onNav("home");}} data-cursor="link" data-cursor-label="Index">
        <span className="dot" />
        <span>GHPlanet</span>
      </a>
      <div className="nav__links">
        {window.NAV_LINKS.map(l => (
          <a key={l.key} className={"nav__link " + (route === l.key ? "is-active" : "")}
             href={"#" + l.key} onClick={(e)=>{e.preventDefault(); onNav(l.key);}}>
            <span className="nav__link__stack">
              <span>{l.label}</span>
            </span>
          </a>
        ))}
      </div>
      <a className="nav__cta" href="#quote" onClick={(e)=>{e.preventDefault(); onNav("quote");}} data-cursor="link" data-cursor-label="견적">
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
          <a className="footer__btn" href="#quote" onClick={(e)=>{e.preventDefault(); onNav("quote");}} data-cursor="link" data-cursor-label="Start">
            견적 요청하기 <span className="arrow"/>
          </a>
        </div>
      </div>
      <div className="footer__cols">
        <div className="footer__col">
          <h4>스튜디오</h4>
          <a href="#about" onClick={(e)=>{e.preventDefault(); onNav("about");}}>소개</a>
          <a href="#services" onClick={(e)=>{e.preventDefault(); onNav("services");}}>서비스</a>
          <a href="#work" onClick={(e)=>{e.preventDefault(); onNav("work");}}>포트폴리오</a>
          <a href="#contact" onClick={(e)=>{e.preventDefault(); onNav("contact");}}>연락</a>
        </div>
        <div className="footer__col">
          <h4>연락</h4>
          <a href="mailto:me@ghyeok.io">me@ghyeok.io</a>
          <p>언제든 편하게 연락 주세요</p>
        </div>
        <div className="footer__col">
          <h4>플랫폼</h4>
          <a href="https://www.wishket.com/partners/p/kh4975/" target="_blank" rel="noopener" data-cursor="link" data-cursor-label="↗">Wishket · kh4975</a>
          <a href="https://kmong.com/@%EA%B6%8C%ED%98%81" target="_blank" rel="noopener" data-cursor="link" data-cursor-label="↗">Kmong · 권혁</a>
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

Object.assign(window, { Cursor, Intro, Nav, useCurtain, Footer, useReveal, Marquee, Magnetic, HoverPreview });
