// styles-app-ae.jsx — A vs E head-to-head, deeper sections

const NAV = ["Index", "About", "Services", "Work", "Contact"];

const PROJ = [
  { id:"nara", t:"나라장터 컴패니언", c:"공공조달 SaaS", y:"2024", chips:["iOS","Android","Node"], ind:"GovTech" },
  { id:"ondol", t:"온돌 커머스 리브랜드", c:"온돌 리빙", y:"2024", chips:["Next.js","Sanity"], ind:"Commerce" },
  { id:"moa", t:"모아 학습 플랫폼", c:"에듀테크 스타트업", y:"2023", chips:["RN","AI"], ind:"Education" },
  { id:"han", t:"한솔 모빌리티", c:"물류 그룹사", y:"2023", chips:["TypeScript","Mapbox"], ind:"Logistics" },
  { id:"siot", t:"시옷 매거진", c:"독립 출판", y:"2023", chips:["Astro","MDX"], ind:"Editorial" },
];

const SVC = [
  { n:"01", t:"전략", d:"비즈니스 KPI에서 출발해 사용자 모먼트로 끌어내립니다." },
  { n:"02", t:"디자인", d:"타이포와 인터랙션을 한 줄의 문장처럼 다룹니다." },
  { n:"03", t:"엔지니어링", d:"모바일·웹·백엔드를 한 사람이 처리해 인계가 매끄럽습니다." },
  { n:"04", t:"운영", d:"출시는 끝이 아닌 시작. 12주 그로스 사이클을 동행합니다." },
];

// ─────────────────── A — Editorial Warm full
function VarA_Full() {
  return (
    <div className="v vfull var-A" style={{ background:"#ece9e1", color:"#0d0c0a" }}>
      <div className="grid-bg" />

      {/* Nav */}
      <div className="nav-bar">
        <div className="brand"><span className="b-dot" /><span>GHPlanet</span></div>
        <div className="links">{NAV.map(n => <span key={n}>{n}</span>)}</div>
        <span>프로젝트 의뢰</span>
      </div>

      {/* Featured card */}
      <div className="feat-card">
        <div className="row" style={{ alignItems:"baseline" }}>
          <span className="yr">— Featured · GovTech</span>
          <span className="yr">01 / 04</span>
        </div>
        <div>
          <div className="yr">2024</div>
          <div className="t">나라장터 컴패니언</div>
          <div className="c">공공조달 SaaS</div>
          <div className="s" style={{ marginTop:8 }}>공공입찰 알림을 24시간 안에 받아보는 B2G 모바일 앱.</div>
        </div>
        <div className="chips"><span>iOS</span><span>Android</span><span>Node</span></div>
      </div>

      {/* Hero */}
      <div className="hero-pad">
        <div className="row">
          <span className="cap">Independent Studio · Est. 2018</span>
          <div className="status"><span className="dot" /><span>Now booking · 2026 Q3 · 1 slot open</span></div>
        </div>
        <h1 className="title">모바일과 웹을 만드는<br/>1인 디지털 스튜디오.</h1>
        <div className="bottom">
          <p className="lead">GHPlanet은 권혁이 운영하는 1인 디지털 스튜디오입니다. 기획부터 디자인, 개발, 운영까지 한 사람의 일관된 결정으로 만듭니다.</p>
          <a className="cta">프로젝트 의뢰 →</a>
        </div>
      </div>

      {/* Selected Work */}
      <section className="sec">
        <div className="sec-head">
          <span className="cap mono">02 — Selected Work</span>
          <h2 className="h2">최근 작업.</h2>
          <p className="lead-sm">모바일 앱부터 웹 플랫폼까지. 기획·설계·구현을 직접 했습니다.</p>
        </div>
        <div className="work-list">
          {PROJ.map((p, i) => (
            <div className="work-row" key={p.id}>
              <span className="idx mono">— {String(i+1).padStart(2,"0")}</span>
              <span className="title-row">{p.t}</span>
              <span className="chips-row">
                {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
              </span>
              <span className="yr mono">{p.y}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="sec">
        <div className="sec-head">
          <span className="cap mono">03 — Capabilities</span>
          <h2 className="h2">한 사람이 책임지는 영역.</h2>
          <p className="lead-sm">기획-디자인-개발이 한 결정자에게서 나옵니다.</p>
        </div>
        <div className="svc-list">
          {SVC.map(s => (
            <div className="svc-row" key={s.n}>
              <span className="idx mono">{s.n}</span>
              <span className="svc-t">{s.t}</span>
              <span className="svc-d">{s.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-strip">
        <div>
          <span className="cap mono">04 — Get in touch</span>
          <h2 className="h-big">새 프로덕트를 만들고 계신가요? 같이 시작해 봅시다.</h2>
        </div>
        <a className="cta">견적 요청하기 →</a>
      </section>

      <span className="note">A · EDITORIAL WARM</span>
    </div>
  );
}

// ─────────────────── E — Brutalist Mono full
function VarE_Full() {
  return (
    <div className="v vfull var-E" style={{ background:"#fafaf6", color:"#0a0a0a" }}>
      <div className="nav-bar">
        <div className="brand"><span className="b-dot" /><span>GHP_STUDIO</span></div>
        <div className="links">{NAV.map(n => <span key={n}>[{n}]</span>)}</div>
        <span>[ 프로젝트 의뢰 ]</span>
      </div>

      <div className="feat-card">
        <div className="row" style={{ alignItems:"baseline" }}>
          <span className="yr">FEATURED // GOVTECH</span>
          <span className="yr">01/04</span>
        </div>
        <div>
          <div className="yr">2024</div>
          <div className="t">나라장터 컴패니언</div>
          <div className="c">공공조달 SaaS</div>
          <div className="s" style={{ marginTop:8 }}>공공입찰 알림을 24시간 안에 받아보는 B2G 모바일 앱.</div>
        </div>
        <div className="chips"><span>iOS</span><span>Android</span><span>Node</span></div>
      </div>

      <div className="hero-pad">
        <div className="row">
          <span className="cap">GHP / SOLO_STUDIO / EST.2018</span>
          <div className="status"><span className="dot" /><span>Now booking · 2026 Q3 · 1 slot</span></div>
        </div>
        <h1 className="title">
          <b>모바일</b>과 <b>웹</b>을<br/>만드는 1인 스튜디오.
        </h1>
        <p className="lead">
          기획부터 디자인, 개발, 운영까지 한 사람이 책임집니다.
          필요한 영역은 외부 전문가와 함께 합니다.
        </p>
        <div className="bottom">
          <span className="cap">▶ NEXT &nbsp; WORK / 24 PROJECTS</span>
          <a className="cta">[ 프로젝트 의뢰 ]</a>
        </div>
      </div>

      {/* Selected Work */}
      <section className="sec">
        <div className="sec-head">
          <span className="cap mono">02 / SELECTED_WORK</span>
          <h2 className="h2">최근 작업.</h2>
          <p className="lead-sm">모바일·웹 프로덕트를 직접 만들었습니다.</p>
        </div>
        <div className="work-list">
          {PROJ.map((p, i) => (
            <div className="work-row" key={p.id}>
              <span className="idx mono">[{String(i+1).padStart(2,"0")}]</span>
              <span className="title-row">{p.t}</span>
              <span className="chips-row">
                {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
              </span>
              <span className="yr mono">// {p.y}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="sec">
        <div className="sec-head">
          <span className="cap mono">03 / CAPABILITIES</span>
          <h2 className="h2">한 사람이 책임지는 영역.</h2>
          <p className="lead-sm">기획-디자인-개발이 한 결정자에게서 나옵니다.</p>
        </div>
        <div className="svc-list">
          {SVC.map(s => (
            <div className="svc-row" key={s.n}>
              <span className="idx mono">{s.n}</span>
              <span className="svc-t">{s.t}</span>
              <span className="svc-d">{s.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-strip">
        <div>
          <span className="cap mono">04 / GET_IN_TOUCH</span>
          <h2 className="h-big">새 프로덕트를 만드시나요? 같이 시작해 봅시다.</h2>
        </div>
        <a className="cta">[ 견적 요청하기 → ]</a>
      </section>

      <span className="note">E · BRUTALIST MONO</span>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas
      title="A  vs  E"
      subtitle="Editorial Warm vs Brutalist Mono · 같은 콘텐츠를 한 페이지로 펼쳐 비교"
    >
      <DCSection id="ae-compare" title="Full-page comparison" subtitle="A는 정제된 매거진 톤 · E는 노골적인 시스템/터미널 톤. 카드 우측 메뉴에서 Focus mode로 풀화면 비교 가능">
        <DCArtboard id="A" label="A · Editorial Warm" width={1280} height={2200}>
          <VarA_Full />
        </DCArtboard>
        <DCArtboard id="E" label="E · Brutalist Mono" width={1280} height={2200}>
          <VarE_Full />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
