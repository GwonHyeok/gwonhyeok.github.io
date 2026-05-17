// styles-app.jsx — render all variants in a DesignCanvas

const NAV = ["Index", "About", "Services", "Work", "Contact"];

function Brand() {
  return (
    <div className="brand">
      <span className="b-dot" />
      <span>GHPlanet</span>
    </div>
  );
}

function NavBar() {
  return (
    <div className="nav-bar">
      <Brand />
      <div className="links">
        {NAV.map(n => <span key={n}>{n}</span>)}
      </div>
      <span>프로젝트 의뢰</span>
    </div>
  );
}

function FeatCard() {
  return (
    <div className="feat-card">
      <div className="row" style={{ alignItems: "baseline" }}>
        <span className="yr">— Featured · GovTech</span>
        <span className="yr">01 / 04</span>
      </div>
      <div>
        <div className="yr">2024</div>
        <div className="t">나라장터 컴패니언</div>
        <div className="c">공공조달 SaaS</div>
        <div className="s" style={{ marginTop: 8 }}>
          공공입찰 알림을 24시간 안에 받아보는 B2G 모바일 앱.
        </div>
      </div>
      <div className="chips">
        <span>iOS</span><span>Android</span><span>Node</span>
      </div>
    </div>
  );
}

function Status() {
  return (
    <div className="status">
      <span className="dot" /> <span>Now booking · 2026 Q3 · 1 slot open</span>
    </div>
  );
}

// ───────────── Variant A — Editorial Warm (current direction)
function VarA() {
  return (
    <div className="v var-A">
      <div className="grid-bg" />
      <NavBar />
      <FeatCard />
      <div className="hero-pad">
        <div className="row">
          <span className="cap">Independent Studio · Est. 2018</span>
          <Status />
        </div>
        <h1 className="title">
          모바일과 웹을 만드는<br/>1인 디지털 스튜디오.
        </h1>
        <div className="bottom">
          <p className="lead">
            GHPlanet은 권혁이 운영하는 1인 디지털 스튜디오입니다.
            기획부터 디자인, 개발, 운영까지 한 사람의 일관된 결정으로 만듭니다.
          </p>
          <a className="cta">프로젝트 의뢰 <span>→</span></a>
        </div>
      </div>
      <span className="note">A · EDITORIAL WARM</span>
    </div>
  );
}

// ───────────── Variant B — Dark Cinematic
function VarB() {
  return (
    <div className="v var-B">
      <div className="hero-img" />
      <NavBar />
      <div className="hero-pad">
        <div className="row">
          <span className="cap">GHPLANET — 2026 REEL · 02:14</span>
          <Status />
        </div>
        <h1 className="title" style={{ marginTop: "auto" }}>
          모바일·웹 프로덕트를<br/>혼자 처음부터 끝까지.
        </h1>
        <div className="bottom">
          <p className="lead">
            기획·디자인·개발·운영 — 한 사람의 손에서 일관되게 만들어지는 디지털 프로덕트.
          </p>
          <a className="cta">시작하기 <span>→</span></a>
        </div>
      </div>
      <div className="reel-label">
        <span className="play">▶</span>
        <span>Watch reel</span>
      </div>
      <span className="note">B · DARK CINEMATIC</span>
    </div>
  );
}

// ───────────── Variant C — Personal Portfolio
function VarC() {
  return (
    <div className="v var-C">
      <NavBar />
      <div className="hero-pad">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="me-card">
            <div className="avatar" />
            <div className="meta">
              <span className="nm">권혁 — GH</span>
              <span className="rl">Solo · 2018–26 · Seoul</span>
            </div>
          </div>
          <Status />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 24 }}>
          <h1 className="title">
            안녕하세요, 모바일과 웹을<br/>
            만드는 <em>권혁</em>입니다.<br/>
            지금 새 프로젝트를 받습니다.
          </h1>
          <p className="lead" style={{ maxWidth: "44ch" }}>
            대기업·스타트업·공공기관에서 의뢰한 24개의 디지털 프로덕트를
            기획부터 출시까지 직접 만들어 왔습니다.
          </p>
        </div>
        <div className="stripe">
          <span className="pill">iOS</span><span className="pill">Android</span>
          <span className="pill">React Native</span><span className="pill">Next.js</span>
          <span className="pill">Node</span><span className="pill">Go</span>
          <span className="pill">Design System</span><span className="pill">Brand</span>
        </div>
        <div className="bottom" style={{ marginTop: 0 }}>
          <p className="lead" style={{ fontSize: 13, color: "#756e60", maxWidth: "44ch" }}>
            대면 미팅은 성수동에서, 협업은 원격으로. 1영업일 안에 답장드립니다.
          </p>
          <a className="cta">대화 시작하기 →</a>
        </div>
      </div>
      <span className="note">C · PERSONAL PORTFOLIO</span>
    </div>
  );
}

// ───────────── Variant D — Tech-refined (Linear-like)
function VarD() {
  return (
    <div className="v var-D">
      <div className="grid-bg" />
      <NavBar />
      <FeatCard />
      <div className="hero-pad">
        <div className="row">
          <span className="cap">v.2026.Q3 · solo studio · seoul</span>
          <Status />
        </div>
        <h1 className="title">
          Ship production-grade<br/>
          mobile & web, solo.
        </h1>
        <p className="lead">
          GHPlanet은 권혁이 운영하는 1인 스튜디오. 기획·디자인·풀스택 개발을 한 사람이 처리해
          전달 손실 없이 빠르게 출시합니다.
        </p>
        <div className="bottom">
          <div className="kbd"><span>⌘</span><span>K</span> <span style={{ border: 'none', paddingInline: 6 }}>find work</span></div>
          <a className="cta">Start a project →</a>
        </div>
      </div>
      <span className="note">D · TECH REFINED</span>
    </div>
  );
}

// ───────────── Variant E — Brutalist Mono
function VarE() {
  return (
    <div className="v var-E">
      <NavBar />
      <FeatCard />
      <div className="hero-pad">
        <div className="row">
          <span className="cap">GHP / SOLO_STUDIO / EST.2018</span>
          <Status />
        </div>
        <h1 className="title">
          <b>모바일</b>과 <b>웹</b>을<br/>
          만드는 1인 스튜디오.
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
      <span className="note">E · BRUTALIST MONO</span>
    </div>
  );
}

// ───────────── Variant F — Editorial with imagery (split)
function VarF() {
  return (
    <div className="v var-F">
      <NavBar />
      <div className="hero-pad">
        <div className="left">
          <div className="row">
            <span className="cap">— 001</span>
            <Status />
          </div>
          <h1 className="title">
            모바일과 웹을 만드는<br/>1인 디지털 스튜디오.
          </h1>
          <p className="lead">
            GHPlanet은 권혁이 운영하는 1인 디지털 스튜디오. 기획부터 디자인, 개발, 운영까지
            한 사람의 일관된 결정으로 프로덕트를 만듭니다.
          </p>
          <div className="row-meta">
            <div className="ln"><span>est.</span><span>2018</span></div>
            <div className="ln"><span>base</span><span>서울 · 원격</span></div>
            <div className="ln"><span>focus</span><span>App · Web</span></div>
            <div className="ln"><span>recent</span><span>나라장터 컴패니언 · 2024</span></div>
          </div>
          <a className="cta">프로젝트 의뢰 →</a>
        </div>
        <div className="right">
          <span className="ph">KEY VISUAL · 나라장터 컴패니언</span>
        </div>
      </div>
      <span className="note">F · EDITORIAL + IMAGERY</span>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas
      title="GHPlanet — Hero 스타일 비교"
      subtitle="6 directions · 같은 콘텐츠 / 다른 톤"
    >
      <DCSection id="hero-variants" title="Hero — 6 directions" subtitle="A부터 F까지 마우스로 호버, 카드 우측 메뉴에서 Focus mode로 풀화면 비교">
        <DCArtboard id="A" label="A · Editorial Warm  (현재)" width={1280} height={800}>
          <VarA />
        </DCArtboard>
        <DCArtboard id="B" label="B · Dark Cinematic" width={1280} height={800}>
          <VarB />
        </DCArtboard>
        <DCArtboard id="C" label="C · Personal Portfolio" width={1280} height={800}>
          <VarC />
        </DCArtboard>
        <DCArtboard id="D" label="D · Tech Refined  (Linear-like)" width={1280} height={800}>
          <VarD />
        </DCArtboard>
        <DCArtboard id="E" label="E · Brutalist Mono" width={1280} height={800}>
          <VarE />
        </DCArtboard>
        <DCArtboard id="F" label="F · Editorial + Imagery" width={1280} height={800}>
          <VarF />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
