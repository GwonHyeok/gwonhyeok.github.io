// app.jsx — main shell, router, tweaks integration

const { useState: useAS, useEffect: useAE, useCallback: useAC } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "skipIntro": false,
  "marquee": true
}/*EDITMODE-END*/;

function parseRoute() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const knownTop = ["about", "services", "work", "contact", "quote"];
  if (path) {
    if (knownTop.includes(path)) return path;
    if (path.startsWith("work/")) {
      const id = path.slice(5).replace(/\/$/, "");
      return id ? "work/" + id : "work";
    }
  }
  const h = window.location.hash.replace(/^#/, "");
  return h || "home";
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useAS(parseRoute());
  const [introDone, setIntroDone] = useAS(t.skipIntro);
  const [curtainNode, wipe] = useCurtain();

  // Apply palette class
  useAE(() => {
    const cls = document.body.classList;
    cls.remove("pal-warm","pal-bw","pal-dark");
    cls.add("pal-" + (t.palette || "warm"));
  }, [t.palette]);

  // Browser back/forward & hash listener
  useAE(() => {
    const on = () => {
      const next = parseRoute();
      wipe(() => {
        setRoute(next);
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    };
    window.addEventListener("popstate", on);
    window.addEventListener("hashchange", on);
    return () => {
      window.removeEventListener("popstate", on);
      window.removeEventListener("hashchange", on);
    };
  }, [wipe]);

  const nav = useAC((next) => {
    const cur = parseRoute();
    if (next === cur) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = next === "home" ? "/" : "/" + next + "/";
    wipe(() => {
      if (window.history && window.history.pushState) {
        try { window.history.pushState({}, "", target); } catch (e) { window.location.href = target; return; }
      } else {
        window.location.href = target;
        return;
      }
      setRoute(next);
      window.scrollTo({ top: 0, behavior: "instant" });
      // Update document title to match the page
      if (window.__updatePageTitle) window.__updatePageTitle(next);
    });
  }, [wipe]);

  // Render route
  let page;
  if (route.startsWith("work/")) {
    const id = route.slice(5);
    page = <WorkDetail id={id} onNav={nav} />;
  } else {
    switch (route) {
      case "about":    page = <About onNav={nav} />; break;
      case "services": page = <Services onNav={nav} />; break;
      case "work":     page = <Work onNav={nav} />; break;
      case "contact":  page = <Contact onNav={nav} />; break;
      case "quote":    page = <Quote onNav={nav} />; break;
      default:         page = <Home onNav={nav} tw={t} />;
    }
  }

  return (
    <div className="app">
      {!introDone && !t.skipIntro && <Intro onDone={() => setIntroDone(true)} />}
      {curtainNode}
      <Nav route={route.split("/")[0]} onNav={nav} />
      <div key={route}>{page}</div>
      {route !== "quote" && <Footer onNav={nav} />}
      <CommandPalette onNav={nav} route={route} />
      <StatusBar route={route} />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="배경 톤" value={t.palette}
          options={[
            { value: "warm", label: "Warm" },
            { value: "bw",   label: "B&W" },
            { value: "dark", label: "Dark" },
          ]}
          onChange={v => setTweak("palette", v)} />
        <TweakSection label="Intro" />
        <TweakToggle label="인트로 스킵" value={t.skipIntro}
          onChange={v => setTweak("skipIntro", v)} />
        <TweakSection label="Navigate" />
        <TweakSelect label="페이지 이동" value={route.split("/")[0]}
          options={[
            { value: "home", label: "홈" },
            { value: "about", label: "소개" },
            { value: "services", label: "서비스" },
            { value: "work", label: "포트폴리오" },
            { value: "nara", label: "프로젝트 상세 (nara)" },
            { value: "contact", label: "연락" },
            { value: "quote", label: "견적 요청" },
          ]}
          onChange={v => nav(v === "nara" ? "work/nara" : v)} />
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
