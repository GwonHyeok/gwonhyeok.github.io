// home.jsx — Home (index) page · A direction, refactored
// Static content honest — no fake video chrome.

const { useEffect: useEffectH, useRef: useRefH, useState: useStateH } = React;

// ─── Live Seoul clock (real)
function SeoulClock() {
  const [time, setTime] = useStateH("");
  useEffectH(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        });
        setTime(fmt.format(new Date()));
      } catch { setTime(""); }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="clock">
      <span className="clock__lbl">SEL</span>
      <span className="clock__t">{time}</span>
    </span>
  );
}

// ─── Live availability status (real)
function LiveStatus() {
  return (
    <div className="status">
      <span className="status__dot" />
      <span className="status__txt">지금 예약 가능 · 2026 3분기 · 1자리</span>
    </div>
  );
}

// ─── 3D background — wireframe icosahedron ("planet"), cursor-tilt, slow spin
function HeroSphere() {
  const ref = useRefH(null);
  useEffectH(() => {
    const el = ref.current;
    if (!el || !window.THREE) return;
    const THREE = window.THREE;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const sizing = () => ({ w: el.clientWidth, h: el.clientHeight });
    let { w, h } = sizing();
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.z = 3.6;

    function inkColor() {
      const c = getComputedStyle(document.body).getPropertyValue("--ink").trim() || "#0d0c0a";
      return new THREE.Color(c);
    }

    // Wireframe icosahedron sphere (the "planet")
    const geo = new THREE.IcosahedronGeometry(1.55, 2);
    const edgeGeo = new THREE.EdgesGeometry(geo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: inkColor(), transparent: true, opacity: 0.42,
    });
    const sphere = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(sphere);

    // Inner faint solid sphere for depth
    const innerGeo = new THREE.IcosahedronGeometry(1.46, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: inkColor(), transparent: true, opacity: 0.04, depthWrite: false,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // Orbiting ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.005, 8, 200);
    const ringMat = new THREE.LineBasicMaterial({
      color: inkColor(), transparent: true, opacity: 0.18,
    });
    const ringEdge = new THREE.EdgesGeometry(ringGeo);
    const ring = new THREE.LineSegments(ringEdge, ringMat);
    ring.rotation.x = Math.PI * 0.32;
    scene.add(ring);

    // Drifting dot field
    const N = 80;
    const dotsGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 2.5 + Math.random() * 1.2;
      const t = Math.random() * Math.PI * 2;
      const p = (Math.random() - 0.5) * 1.4;
      positions[i*3] = Math.cos(t) * r;
      positions[i*3+1] = p;
      positions[i*3+2] = Math.sin(t) * r;
    }
    dotsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotsMat = new THREE.PointsMaterial({
      color: inkColor(), size: 0.026, transparent: true, opacity: 0.5,
    });
    const dots = new THREE.Points(dotsGeo, dotsMat);
    scene.add(dots);

    const target = { mx: 0, my: 0, rx: 0, ry: 0 };
    let raf;
    function tick() {
      sphere.rotation.y += 0.0022;
      inner.rotation.y -= 0.0014;
      ring.rotation.y += 0.0009;
      dots.rotation.y += 0.0008;

      target.rx += (target.my * 0.55 - target.rx) * 0.04;
      target.ry += (target.mx * 0.55 - target.ry) * 0.04;
      sphere.rotation.x = target.rx;
      inner.rotation.x = -target.rx * 0.5;
      sphere.rotation.z = target.ry * -0.18;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const s = sizing();
      w = s.w; h = s.h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Sync color with palette changes (body class swap)
    const observer = new MutationObserver(() => {
      const c = inkColor();
      edgeMat.color.copy(c);
      innerMat.color.copy(c);
      ringMat.color.copy(c);
      dotsMat.color.copy(c);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      renderer.dispose();
      edgeGeo.dispose(); geo.dispose(); innerGeo.dispose();
      ringGeo.dispose(); dotsGeo.dispose();
      edgeMat.dispose(); innerMat.dispose(); ringMat.dispose(); dotsMat.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="hero-3d" ref={ref} aria-hidden />;
}

// ─── Magnetic CTA — cursor follow
function MagneticCta({ children, onClick, strength = 0.3 }) {
  const ref = useRefH(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    ref.current.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ""; };
  return (
    <a ref={ref} className="mcta" href="#quote" onClick={onClick}
       onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </a>
  );
}

// ─── Featured Project — magazine spread, image + meta, auto-advances
function Featured({ projects, onNav }) {
  const [idx, setIdx] = useStateH(0);
  const [paused, setPaused] = useStateH(false);
  useEffectH(() => {
    if (paused) return;
    const id = setInterval(() => setIdx(i => (i + 1) % projects.length), 6800);
    return () => clearInterval(id);
  }, [projects.length, paused]);

  const p = projects[idx];
  const go = (e) => { e.preventDefault(); onNav("work/" + p.id); };

  return (
    <section className="ftd"
             onMouseEnter={()=>setPaused(true)}
             onMouseLeave={()=>setPaused(false)}>
      <div className="wrap ftd__grid">
        <div className="ftd__meta">
          <div className="ftd__top">
            <span className="cap">— 작업 · {String(idx+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</span>
            <span className="cap">{p.industry}</span>
          </div>
          <div className="ftd__main" key={p.id}>
            <div className="ftd__yr">{p.year}</div>
            <h2 className="ftd__title">{p.title}</h2>
            <div className="ftd__client">{p.client}</div>
            <p className="ftd__sum">{p.summary}</p>
            <div className="ftd__chips">
              {p.chips.map(c => <span key={c}>{c}</span>)}
            </div>
            <a className="ftd__cta" href={"#work/"+p.id} onClick={go}>
              프로젝트 자세히 보기 <span>→</span>
            </a>
          </div>
          <div className="ftd__dots">
            {projects.map((pp, i) => (
              <button key={pp.id}
                      className={"ftd__dot " + (i === idx ? "is-on" : "")}
                      onClick={()=>setIdx(i)}
                      aria-label={"Show " + pp.title}>
                <span className="ftd__dot-n">{String(i+1).padStart(2,"0")}</span>
                <span className="ftd__dot-t">{pp.titleEn}</span>
              </button>
            ))}
          </div>
        </div>
        <a className="ftd__media" href={"#work/"+p.id} onClick={go}>
          <div className={"ftd__art ftd__art--" + p.id} key={p.id}>
            {p.image && <img className={"ftd__img" + (p.imageOrient === "landscape" ? " ftd__img--wide" : "")} src={p.image} alt={p.titleEn} loading="lazy" />}
            <span className="ftd__ph">{p.titleEn.toUpperCase()} · KEY VISUAL</span>
          </div>
        </a>
      </div>
    </section>
  );
}

function Home({ onNav }) {
  window.useReveal && window.useReveal([]);
  const featured = window.PROJECTS.slice(0, 4);
  const goQuote = (e) => { e.preventDefault(); onNav("quote"); };

  return (
    <main>
      {/* HERO — calm and direct */}
      <section className="hero hero--clean"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
          e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
          e.currentTarget.classList.add("has-cursor");
        }}
        onMouseLeave={(e) => e.currentTarget.classList.remove("has-cursor")}
      >
        <div className="hero__spotlight" aria-hidden />
        <HeroSphere />
        <div className="wrap hero__inner">
          <div className="hero__top">
            <span className="cap">1인 디지털 스튜디오 · 12년차 풀스택 개발자</span>
          </div>

          <h1 className="display hero__title">
            모바일과 웹을 만드는<br/>
            1인 디지털 스튜디오.
          </h1>

          <div className="hero__bot">
            <p className="hero__lead body-lg">
              GHPlanet은 12년차 풀스택 개발자 권혁이 운영하는 1인 디지털 스튜디오입니다.
              기획부터 디자인, 앱·백엔드·인프라·운영까지 — AI를 도구로 한 사람이 끝까지 책임집니다.
            </p>
            <MagneticCta onClick={goQuote}>
              <span>프로젝트 의뢰</span>
              <span className="arr">→</span>
            </MagneticCta>
          </div>
        </div>
      </section>

      {/* Featured project — image-led magazine spread */}
      <Featured projects={featured} onNav={onNav} />

      {/* Selected Work */}
      <section className="sec wrap">
        <div className="sec__head">
          <span className="cap sec__num">02 — 최근 작업</span>
          <h2 className="h2 sec__title">최근 작업.</h2>
          <p className="sec__aside body">
            모바일 앱부터 웹 플랫폼까지.
            기획·설계·구현을 직접 했습니다.
          </p>
        </div>
        <div className="work-list">
          {window.PROJECTS.slice(0, 5).map((p, i) => (
            <a key={p.id} className="work-row reveal"
               href={"#work/" + p.id}
               onClick={(e)=>{e.preventDefault(); onNav("work/"+p.id);}}>
              <span className="work-row__idx">— {String(i+1).padStart(2,"0")}</span>
              <h3 className="work-row__title">{p.title}</h3>
              <div className="work-row__meta">
                <div className="work-row__chips">
                  {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
                </div>
              </div>
              <span className="work-row__year">{p.year}</span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
          <a className="nav__cta" style={{borderColor:"var(--ink)", color:"var(--ink)"}}
             href="#work" onClick={(e)=>{e.preventDefault(); onNav("work");}}>
            전체 포트폴리오 보기 →
          </a>
        </div>
      </section>

      {/* Capabilities */}
      <section className="sec wrap">
        <div className="sec__head">
          <span className="cap sec__num">03 — 작업 범위</span>
          <h2 className="h2 sec__title">아이디어부터 운영까지, 한 사람이 책임집니다.</h2>
          <p className="sec__aside body">
            기획·디자인·개발이 한 결정자에게서 나옵니다.
            전달 손실이 없고 결과물의 결이 일관됩니다.
          </p>
        </div>
        <div className="svc-list">
          {window.SERVICES.map(s => (
            <div className="svc reveal" key={s.n}>
              <span className="svc__idx">{s.n}</span>
              <h3 className="svc__title">{s.titleKo}</h3>
              <p className="svc__lead">{s.lead}</p>
              <ul className="svc__list">
                {s.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

window.Home = Home;
