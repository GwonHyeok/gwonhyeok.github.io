// pages.jsx — About, Services, Portfolio list, Detail, Quote, Contact, Journal
const { useState: useS, useEffect: useE, useMemo: useM } = React;

// ─────────────────────────── About
function About({ onNav }) {
  return (
    <main>
      <section className="wrap">
        <div className="page-head">
          <span className="page-head__num">— 02</span>
          <h1 className="display page-head__title">
            1인 디지털 스튜디오.
          </h1>
          <div className="page-head__meta">
            <div className="row"><span>사업자 등록</span><span>2021.11.24</span></div>
            <div className="row"><span>경력</span><span>12년차 풀스택 개발자</span></div>
            <div className="row"><span>위치</span><span>원격 협업</span></div>
            <div className="row"><span>분야</span><span>모바일 앱 · 백엔드 · 웹 · AI</span></div>
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec__head">
          <span className="cap sec__num">A.01 — 소개</span>
          <h2 className="h2 sec__title">
            기획, 디자인, 개발이 한 사람에게서 나옵니다.
          </h2>
        </div>
        <p className="statement">
          GHPlanet은 권혁이 운영하는 1인 스튜디오입니다.
          의사결정자가 한 명이라 전달 손실 없이 일관되고 빠릅니다.
          필요한 영역은 수년간 같이 일해 온 외부 전문가와 함께 송달합니다.
        </p>
      </section>

      <section className="sec wrap">
        <div className="sec__head">
          <span className="cap sec__num">A.02 — 원칙</span>
          <h2 className="h2 sec__title">일하는 네 가지 원칙.</h2>
        </div>
        <div className="process">
          {[
            { n: "01", t: "한 명의 완전한 소유권", d: "의사결정자가 한 명이라서, 전달 손실이 없고 항상 빠릅니다." },
            { n: "02", t: "작동하는 소프트웨어 우선", d: "데크보다 빠른 프로토타입. 결정은 동작하는 화면으로 합니다." },
            { n: "03", t: "AI를 도구로", d: "코딩·디자인·리서치에 AI를 적극 활용해 외부 협업자 없이도 1인이 풀스택을 완주합니다." },
            { n: "04", t: "출시 후 동행", d: "출시는 끝이 아닌 시작. 운영·그로스까지 같은 사람이 책임집니다." },
          ].map(s => (
            <div key={s.n} className="step">
              <div className="step__n">{s.n}</div>
              <div className="step__t">{s.t}</div>
              <div className="step__d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec__head">
          <span className="cap sec__num">A.03 — 운영자</span>
          <h2 className="h2 sec__title">한 사람이 전부 책임집니다.</h2>
          <p className="sec__aside body">기획·디자인·앱·백엔드·인프라·운영까지. AI를 도구로 외부 협업자 없이 1인 풀스택으로 완주합니다.</p>
        </div>
        <div className="about-people">
          <div className="founder">
            <div className="founder__pf"><div className="ph">프로필</div></div>
            <div className="founder__head">
              <div className="founder__name">권혁 · GHyeok</div>
              <div className="founder__role">12년차 풀스택 개발자 · Founder</div>
            </div>
            <p className="founder__bio">
              2014년부터 모바일 앱·백엔드·웹을 만들어 온 12년차 풀스택 개발자입니다.
              <br/><br/>
              <b>최근 작업.</b> 캐시백·리워드 플랫폼 <b>TUK</b>(Flutter 앱 + NestJS API + Next.js 어드민 + K8s/Terraform 인프라 1인 풀스택), 키즈 전문가 매칭 글로벌 서비스 <b>모든별키즈</b>(Next.js·i18n), 자체 운영 중인 북마크 앱 <b>Pinned!</b>(iOS·Android 네이티브).
              <br/><br/>
              <b>그동안의 결과물.</b> 데이코어 <b>짐데이</b>(누적 100만 다운로드, PHP→Node.js 마이그레이션 · Aurora Serverless · 1,000만 운동 데이터 기반 추천 AI), 라이프에이드 <b>피지컬갤러리 Pro</b>(300만 구독자 채널 기반, 동시접속 2,500+ 대응), 용감한컴퍼니 <b>이파마스터·아나토미마스터</b>(약학·해부학 학습앱), 놀잇 <b>실시간 영상 채팅</b>(Agora·Firebase), 소울톡 <b>온라인 타로 상담</b>(Firestore·Agora).
              <br/><br/>
              앱·서버·웹·인프라·운영을 한 사람이 책임집니다. 의사결정자가 한 명이라 빠르고 일관되며, AI를 도구로 외부 협업자 없이 1인이 풀스택을 완주합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="sec wrap" style={{paddingTop:"clamp(40px, 6vw, 80px)"}}>
        <div className="stats">
          <div><div className="stat__n">12년</div><div className="stat__lbl">개발 경력</div></div>
          <div><div className="stat__n">100만+</div><div className="stat__lbl">대표작 누적 다운로드</div></div>
          <div><div className="stat__n">1</div><div className="stat__lbl">풀스택 운영자</div></div>
          <div><div className="stat__n">AI</div><div className="stat__lbl">기반 1인 완주</div></div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────── Services
function Services({ onNav }) {
  return (
    <main>
      <section className="wrap">
        <div className="page-head">
          <span className="page-head__num">— 03</span>
          <h1 className="display page-head__title">
            작동하는 프로덕트를 만듭니다.
          </h1>
          <div className="page-head__meta">
            <div className="row"><span>업무 범위</span><span>모바일 · 백엔드 · 웹 · 인프라</span></div>
            <div className="row"><span>운영 방식</span><span>AI 도구 활용 1인 풀스택</span></div>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="svc-list">
          {window.SERVICES.map(s => (
            <div className="svc" key={s.n}>
              <span className="svc__idx">{s.n}</span>
              <h3 className="svc__title">{s.titleKo}</h3>
              <p className="svc__lead">{s.lead}</p>
              <ul className="svc__list">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec__head">
          <span className="cap sec__num">04 — 협업 방식</span>
          <h2 className="h2 sec__title">세 가지 협업 방식.</h2>
          <p className="sec__aside body">단발성 프로젝트부터 장기 파트너십까지. 규모와 단계에 따라 맞춰갑니다.</p>
        </div>
        <div className="process">
          {[
            { n: "단발 작업", t: "4–8주", d: "스코프가 정의된 단발 작업. 작은 앱·웹·디자인 시스템 등.", price: "800만원부터" },
            { n: "신규 구축", t: "8–20주", d: "0 → 1 신규 프로덕트 구축. 기획부터 출시까지 한 사람이.", price: "2500만원부터" },
            { n: "유지·운영", t: "월 단위", d: "출시 후 유지보수, 그로스, 디자인 변경. 부분 업무도 가능.", price: "월 200만원부터" },
          ].map((m, i) => (
            <div key={i} className="step" style={{ gridColumn: "span 4" }}>
              <div className="step__n">방식 · {String(i+1).padStart(2,"0")}</div>
              <div className="step__t">{m.n} <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--mute)", fontWeight: 400 }}>{m.t}</span></div>
              <div className="step__d">{m.d}</div>
              <div className="step__d" style={{ marginTop: 18, color: "var(--ink)" }}>{m.price}</div>
            </div>
          ))}
        </div>
      </section>


    </main>
  );
}

// ─────────────────────────── Portfolio (mixed magazine layout)
function Work({ onNav }) {
  const ps = window.PROJECTS;
  // Magazine layout pattern: cycles through size classes for any number of projects
  const pattern = [
    "mag__item--xl",
    "mag__item--lg",
    "mag__item--md mag__item--offset",
    "mag__item--sm",
    "mag__item--sm mag__item--offset",
    "mag__item--md",
    "mag__item--lg mag__item--offset",
  ];
  const layout = ps.map((p, i) => ({ p, cls: pattern[i % pattern.length] }));

  return (
    <main>
      <section className="wrap">
        <div className="page-head">
          <span className="page-head__num">— 04</span>
          <h1 className="display page-head__title">
            실제로 운영되는 프로덕트들.
          </h1>
          <div className="page-head__meta">
            <div className="row"><span>주요</span><span>{window.PROJECTS.length}개 선정</span></div>
            <div className="row"><span>분야</span><span>모바일 앱 · 백엔드 · 웹</span></div>
            <div className="row"><span>플랫폼</span><span>크몽 · 위시켓 · 직접 연락</span></div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBlock: "60px clamp(80px, 12vw, 200px)" }}>
        <div className="mag">
          {layout.map(({ p, cls }) => (
            <a key={p.id} className={"mag__item " + cls}
               href={"#work/" + p.id}
               onClick={(e)=>{e.preventDefault(); onNav("work/"+p.id);}}
               data-cursor="drag" data-cursor-label="Open">
              <div className="mag__media">
                {p.image && <img className={"mag__img" + (p.imageOrient === "landscape" ? " mag__img--wide" : "")} src={p.image} alt={p.titleEn} loading="lazy" />}
                <div className="ph">{p.titleEn.toUpperCase()} · {p.year}</div>
              </div>
              <div className="mag__head">
                <span className="cap">{p.industry} · {p.services.join(" / ")}</span>
                <span className="mag__year">{p.year}</span>
              </div>
              <h3 className="mag__title">{p.title}</h3>
              <p className="mag__desc">{p.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────── Portfolio detail
function WorkDetail({ id, onNav }) {
  const p = window.PROJECTS.find(x => x.id === id) || window.PROJECTS[0];
  const next = window.PROJECTS[(window.PROJECTS.indexOf(p) + 1) % window.PROJECTS.length];
  const [lightboxIdx, setLightboxIdx] = useS(-1);
  const gallery = p.images || (p.image ? [p.image] : []);

  useE(() => {
    if (lightboxIdx < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIdx(-1);
      else if (e.key === "ArrowRight") setLightboxIdx(i => (i + 1) % gallery.length);
      else if (e.key === "ArrowLeft") setLightboxIdx(i => (i - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, gallery.length]);
  return (
    <main>
      <section className="wrap">
        <div className="page-head">
          <span className="page-head__num">— 프로젝트</span>
          <h1 className="display page-head__title">
            {p.title}
          </h1>
          <div className="page-head__meta">
            <div className="row"><span>연도</span><span>{p.year}</span></div>
            <div className="row"><span>클라이언트</span><span>{p.client}</span></div>
            <div className="row"><span>산업</span><span>{p.industry}</span></div>
            <div className="row"><span>기간</span><span>{p.duration}</span></div>
          </div>
        </div>
      </section>

      <section className="case-hero">
        {p.image && (
          <img
            className={"case-hero__img" + (p.imageOrient === "landscape" ? " case-hero__img--wide" : "")}
            src={p.image}
            alt={p.titleEn}
            style={{ cursor: "zoom-in" }}
            onClick={() => setLightboxIdx(gallery.indexOf(p.image) >= 0 ? gallery.indexOf(p.image) : 0)}
          />
        )}
        <div className="ph">{p.titleEn} — 키 비주얼</div>
      </section>

      <section className="wrap case-meta">
        <div className="col"><div className="lbl">클라이언트</div><div className="val">{p.client}</div></div>
        <div className="col"><div className="lbl">역할</div><div className="val">{p.role}</div></div>
        <div className="col"><div className="lbl">스택</div><div className="val">{p.chips.join(" · ")}</div></div>
        <div className="col"><div className="lbl">수상</div><div className="val">{p.award}</div></div>
      </section>

      <section className="wrap case-content">
        <div className="label">개요</div>
        <p className="body">{p.desc}</p>
      </section>

      {p.images && p.images.length > 0 ? (
        <section className="wrap">
          <div className={"case-gallery" + (p.imageOrient === "landscape" ? " case-gallery--wide" : "")}>
            {p.images.map((src, i) => (
              <button
                type="button"
                className="case-gallery__item"
                key={i}
                onClick={() => setLightboxIdx(i)}
                aria-label={"이미지 " + (i+1) + " 크게 보기"}
              >
                <img src={src} alt={p.titleEn + " screenshot " + (i+1)} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="case-frame">
          <div className="ph">{p.titleEn} — DESIGN SHOT</div>
        </section>
      )}

      {lightboxIdx >= 0 && (
        <div className="lightbox" onClick={() => setLightboxIdx(-1)} role="dialog" aria-modal="true">
          <button
            type="button"
            className="lightbox__close"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(-1); }}
            aria-label="닫기"
          >✕</button>
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + gallery.length) % gallery.length); }}
                aria-label="이전"
              >‹</button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % gallery.length); }}
                aria-label="다음"
              >›</button>
            </>
          )}
          <img
            className="lightbox__img"
            src={gallery[lightboxIdx]}
            alt={p.titleEn + " " + (lightboxIdx+1)}
            onClick={(e) => e.stopPropagation()}
          />
          {gallery.length > 1 && (
            <div className="lightbox__counter">{lightboxIdx + 1} / {gallery.length}</div>
          )}
        </div>
      )}

      <section className="wrap case-content">
        <div className="label">스택</div>
        <p className="body">{p.chips.join(" · ")}</p>
      </section>

      <section className="wrap case-content">
        <div className="label">크레딧</div>
        <p className="body" style={{ fontSize: 16, lineHeight: 1.8 }}>
          전체 진행 — 권혁 (기획 · 디자인 · 개발 · 운영) · 클라이언트 — {p.client}
        </p>
      </section>

      {/* Next */}
      <a className="sec wrap" href={"#work/" + next.id}
         onClick={(e)=>{e.preventDefault(); onNav("work/"+next.id);}}
         style={{display:"block", borderTop:"1px solid var(--line)"}} data-cursor="drag" data-cursor-label="Next">
        <div className="sec__head">
          <span className="cap sec__num">— 다음 프로젝트</span>
        </div>
        <h2 className="display" style={{fontSize:"clamp(36px, 5.5vw, 84px)"}}>
          {next.title} →
        </h2>
      </a>
    </main>
  );
}

// ─────────────────────────── Quote form (multi-step)
const QUOTE_STEPS = [
  { key: "type", q: "어떤 종류의 프로덕트를 만드시나요?", desc: "여러 개를 선택하실 수 있습니다.", multi: true,
    options: ["모바일 앱 (iOS · Android)", "웹 서비스", "관리자 / 대시보드", "브랜드 · 아이덴티티", "디자인 시스템", "기타"] },
  { key: "stage", q: "현재 어떤 단계에 있나요?", multi: false,
    options: ["아이디어 단계 (0 → 1)", "기존 제품 리뉴얼", "출시 후 그로스 단계", "내부용 도구 개선"] },
  { key: "budget", q: "예상하시는 예산은?", multi: false,
    options: ["3천만원 이하", "3천–8천만원", "8천–2억", "2억 이상", "협의 가능"] },
  { key: "timeline", q: "출시까지 희망하는 일정은?", multi: false,
    options: ["6주 이내 (긴급)", "2–3개월", "3–6개월", "6개월 이상", "유동적"] },
  { key: "contact", q: "프로젝트와 연락처를 알려주세요.", form: true },
];

function Quote({ onNav }) {
  const [step, setStep] = useS(0);
  const [ans, setAns] = useS({});
  const [done, setDone] = useS(false);

  const cur = QUOTE_STEPS[step];

  const pick = (opt) => {
    setAns(a => {
      const next = { ...a };
      if (cur.multi) {
        const arr = new Set(a[cur.key] || []);
        if (arr.has(opt)) arr.delete(opt); else arr.add(opt);
        next[cur.key] = [...arr];
      } else {
        next[cur.key] = opt;
      }
      return next;
    });
  };

  const setField = (k, v) => setAns(a => ({ ...a, [k]: v }));

  const canNext = useM(() => {
    if (cur.form) return ans.name && ans.email && ans.company;
    return cur.multi ? (ans[cur.key]||[]).length : !!ans[cur.key];
  }, [cur, ans]);

  if (done) {
    return (
      <main className="wrap quote">
        <div className="quote__step">
          <span className="quote__num">— 완료</span>
          <div className="quote__q">
            <h2>요청이 도착했습니다.</h2>
            <p>1영업일 안에 직접 연락드립니다. 그동안 다른 작업도 한번 둘러보세요.</p>
            <div style={{display:"flex", gap:12, marginTop:36}}>
              <a className="opt" href="#work" style={{flex:1}} onClick={(e)=>{e.preventDefault(); onNav("work");}}>
                포트폴리오 보기 <span className="num">→</span>
              </a>
              <a className="opt" href="#home" style={{flex:1}} onClick={(e)=>{e.preventDefault(); onNav("home");}}>
                홈으로 <span className="num">↩</span>
              </a>
            </div>
          </div>
          <div className="quote__a">
            <div className="cap">접수 번호</div>
            <div className="display" style={{fontSize:"clamp(56px,11vw,180px)", letterSpacing:"-0.04em"}}>
              {"GHP-" + Math.floor(10000 + Math.random()*89999)}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap quote">
      <div className="page-head" style={{paddingTop:"6vh", paddingBottom: 32}}>
        <span className="page-head__num">— 05</span>
        <h1 className="display page-head__title">
          프로젝트를 들려주세요.
        </h1>
        <div className="page-head__meta">
          <div className="row"><span>단계</span><span>{step+1} / {QUOTE_STEPS.length}</span></div>
          <div className="row"><span>연락</span><span>언제든 편하게</span></div>
        </div>
      </div>

      <div className="quote__progress">
        {QUOTE_STEPS.map((_, i) => (
          <div key={i} className={"quote__pip " + (i <= step ? "is-on" : "")} />
        ))}
      </div>

      <div className="quote__step" key={step}>
        <span className="quote__num">— {String(step+1).padStart(2,"0")}</span>
        <div className="quote__q">
          <h2>{cur.q}</h2>
          {cur.desc && <p>{cur.desc}</p>}
        </div>
        <div className="quote__a">
          {cur.options && cur.options.map((o, i) => {
            const selected = cur.multi ? (ans[cur.key]||[]).includes(o) : ans[cur.key] === o;
            return (
              <button key={o} className={"opt " + (selected ? "is-on" : "")} onClick={()=>pick(o)} data-cursor="link" data-cursor-label={selected?"✓":"+"}>
                <span>{o}</span>
                <span className="num">{String(i+1).padStart(2,"0")}</span>
              </button>
            );
          })}
          {cur.form && (
            <>
              <input className="input" placeholder="이름" value={ans.name||""} onChange={e=>setField("name", e.target.value)} data-cursor="text" />
              <input className="input" placeholder="회사 또는 팀 이름" value={ans.company||""} onChange={e=>setField("company", e.target.value)} data-cursor="text" />
              <input className="input" type="email" placeholder="이메일" value={ans.email||""} onChange={e=>setField("email", e.target.value)} data-cursor="text" />
              <textarea className="input" placeholder="프로젝트에 대해 자유롭게 알려주세요. (선택)" value={ans.notes||""} onChange={e=>setField("notes", e.target.value)} data-cursor="text" />
            </>
          )}
        </div>
      </div>

      <div className="quote__nav">
        <button className="quote__btn" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} data-cursor={step===0?"":"link"} data-cursor-label="←">
          ← 이전
        </button>
        <button className="quote__btn quote__btn--primary" disabled={!canNext}
                onClick={()=>{ if (step === QUOTE_STEPS.length - 1) setDone(true); else setStep(s=>s+1); }}
                data-cursor={canNext ? "link" : ""} data-cursor-label={step===QUOTE_STEPS.length-1?"제출":"다음"}>
          {step === QUOTE_STEPS.length - 1 ? "제출하기" : "다음 단계"} →
        </button>
      </div>
    </main>
  );
}

// ─────────────────────────── Contact
function Contact({ onNav }) {
  return (
    <main>
      <section className="wrap">
        <div className="page-head">
          <span className="page-head__num">— 06</span>
          <h1 className="display page-head__title">
            인사 나눠요.
          </h1>
          <div className="page-head__meta">
            <div className="row"><span>연락</span><span>언제든 편하게</span></div>
            <div className="row"><span>회신</span><span>가능한 빠르게</span></div>
          </div>
        </div>

        <p className="contact-big">
          <a href="mailto:me@ghyeok.io" style={{color:"inherit", textDecoration:"none"}}>me@ghyeok.io</a>
        </p>

        <div className="contact-grid">
          <div className="col">
            <h3>프로젝트 의뢰</h3>
            <p className="email"><a href="mailto:me@ghyeok.io" style={{color:"inherit"}}>me@ghyeok.io</a></p>
            <p style={{ color: "var(--mute)", marginTop: 8 }}>새로운 프로젝트 / 견적</p>
          </div>
          <div className="col">
            <h3>위시켓</h3>
            <p className="email"><a href="https://www.wishket.com/partners/p/kh4975/" target="_blank" rel="noopener" style={{color:"inherit"}}>partners/p/kh4975</a></p>
            <p style={{ color: "var(--mute)", marginTop: 8 }}>위시켓 파트너 프로필</p>
          </div>
          <div className="col">
            <h3>크몽</h3>
            <p className="email"><a href="https://kmong.com/@%EA%B6%8C%ED%98%81" target="_blank" rel="noopener" style={{color:"inherit"}}>kmong.com/@권혁</a></p>
            <p style={{ color: "var(--mute)", marginTop: 8 }}>크몽 셀러 프로필</p>
          </div>
          <div className="col" style={{gridColumn:"span 12"}}><div style={{height:1, background:"var(--line)"}} /></div>
          <div className="col">
            <h3>GitHub</h3>
            <p><a href="https://github.com/GwonHyeok" target="_blank" rel="noopener" style={{color:"inherit"}}>github.com/GwonHyeok</a></p>
          </div>
          <div className="col">
            <h3>연락</h3>
            <p>요일·시간 상관없이<br/>언제든 편하게 연락 주세요</p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────── Journal
function Journal({ onNav }) {
  return (
    <main>
      <section className="wrap">
        <div className="page-head">
          <span className="page-head__num">— 007</span>
          <h1 className="display page-head__title">
            저널 — 작업 노트.
          </h1>
          <div className="page-head__meta">
            <div className="row"><span>글</span><span>{window.POSTS.length}</span></div>
            <div className="row"><span>RSS</span><span>/feed.xml</span></div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{paddingBlock:"40px clamp(80px,12vw,180px)"}}>
        <div className="posts">
          {window.POSTS.map(p => (
            <a key={p.n} className="post" href="#journal" onClick={(e)=>e.preventDefault()} data-cursor="link" data-cursor-label="Read">
              <span className="post__num">— {p.n}</span>
              <h3 className="post__title">{p.t}</h3>
              <span className="post__tag">{p.tag}</span>
              <span className="post__date">{p.date}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { About, Services, Work, WorkDetail, Quote, Contact, Journal });
