#!/usr/bin/env bash
# Static SEO stub generator — produces a stub HTML for each SPA route.
# Each stub: rich <head> meta + JSON-LD specific to the page + loads the same React SPA
# (which reads window.location.pathname and routes to the correct page on mount).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE="https://ghyeok.io"

write_stub() {
  local out="$1"
  local path="$2"
  local title="$3"
  local desc="$4"
  local keywords="$5"
  local jsonld="$6"
  local h1="$7"
  local body_html="$8"

  cat > "$out" <<HTML
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="${keywords}" />
  <meta name="author" content="권혁 (GHyeok)" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <meta name="theme-color" content="#fafaf8" />
  <link rel="canonical" href="${BASE}${path}" />
  <link rel="alternate" hreflang="ko" href="${BASE}${path}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="GHPlanet" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:url" content="${BASE}${path}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${BASE}/profile/me.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${BASE}/profile/me.png" />

  <link rel="icon" href="/profile/me.png" type="image/png" />
  <link rel="apple-touch-icon" href="/profile/me.png" />

  <link rel="stylesheet" href="/styles.css" />

  <script type="application/ld+json">
${jsonld}
  </script>

  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/three@0.160.0/build/three.min.js" crossorigin="anonymous"></script>
</head>
<body style="font-family: &quot;Pretendard Variable&quot;">
  <div id="root">
    <header style="padding: 24px; max-width: 720px; margin: 0 auto;">
      <h1 style="font-size: 32px; margin: 0 0 12px;">${h1}</h1>
      ${body_html}
      <nav style="margin-top: 24px; color: #6b7178; font-size: 13px;">
        <a href="/" style="color:inherit; margin-right:14px">홈</a>
        <a href="/about/" style="color:inherit; margin-right:14px">소개</a>
        <a href="/services/" style="color:inherit; margin-right:14px">서비스</a>
        <a href="/work/" style="color:inherit; margin-right:14px">포트폴리오</a>
        <a href="/contact/" style="color:inherit">연락</a>
      </nav>
    </header>
  </div>

  <script type="text/babel" src="/tweaks-panel.jsx"></script>
  <script type="text/babel" src="/data.jsx"></script>
  <script type="text/babel" src="/shell.jsx"></script>
  <script type="text/babel" src="/home.jsx"></script>
  <script type="text/babel" src="/pages.jsx"></script>
  <script type="text/babel" src="/app.jsx"></script>
</body>
</html>
HTML
}

# ─── About ─────────────────────────────────────────────────────────
write_stub "$ROOT/about/index.html" "/about/" \
  "권혁(GHyeok) · 12년차 풀스택 개발자 · 1인 디지털 스튜디오 GHPlanet 소개" \
  "2014년부터 12년간 모바일 앱·백엔드·웹·인프라를 만들어 온 풀스택 개발자 권혁. 데이코어 짐데이(누적 100만 다운로드), 라이프에이드 피지컬갤러리 Pro, 용감한컴퍼니 이파마스터, 놀잇 등에서 유일 풀스택 개발자로 참여. AI를 도구로 외부 협업자 없이 1인이 풀스택을 완주합니다." \
  "권혁 개발자, GHyeok, 풀스택 개발자, 시니어 개발자, 프리랜서 개발자, 1인 스튜디오, 외주 개발, 12년차, 디지털 스튜디오, GHPlanet, 지에이치플래닛, Flutter 개발자, NestJS 개발자, AWS 개발자, 권혁 포트폴리오, 권혁 외주" \
  '{
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "권혁",
      "alternateName": ["GHyeok", "GwonHyeok"],
      "jobTitle": "12년차 풀스택 개발자",
      "url": "https://ghyeok.io/about/",
      "image": "https://ghyeok.io/profile/me.png",
      "email": "me@ghyeok.io",
      "sameAs": ["https://github.com/GwonHyeok"],
      "worksFor": {
        "@type": "Organization",
        "name": "GHPlanet",
        "url": "https://ghyeok.io/",
        "taxID": "589-11-01997",
        "foundingDate": "2021-11-24"
      },
      "description": "2014년부터 12년간 모바일 앱·백엔드·웹을 만들어 온 풀스택 개발자. 짐데이(100만 다운로드), 피지컬갤러리 Pro(300만 구독자 채널 기반), 이파마스터(4만 트레이너 사용) 등에서 유일 풀스택으로 활동."
    }
  }' \
  "권혁 (GHyeok) — 12년차 풀스택 개발자" \
  '<p style="color: #6b7178; line-height: 1.7;">2014년부터 모바일 앱·백엔드·웹을 만들어 온 12년차 풀스택 개발자입니다. 데이코어 <b>짐데이</b>(누적 100만 다운로드 PT 앱), 라이프에이드 <b>피지컬갤러리 Pro</b>(300만 구독자 유튜브 기반 멤버십), 용감한컴퍼니 <b>이파마스터·아나토미마스터</b>(4만 운동지도자 학습/커뮤니티), <b>놀잇</b>(실시간 영상 채팅), <b>소울톡</b>(타로 상담) 등에서 유일 풀스택 개발자로 참여했습니다. 자체 운영 캐시백 앱 <b>TUK</b>, 키즈 매칭 글로벌 서비스 <b>모든별키즈</b>, 자체 북마크 앱 <b>Pinned!</b>까지 — 기획·디자인·앱·서버·인프라·운영을 한 사람이 책임집니다.</p>'

# ─── Services ──────────────────────────────────────────────────────
write_stub "$ROOT/services/index.html" "/services/" \
  "서비스 · 모바일·웹·백엔드·인프라·AI 외주 개발 1인 풀스택 | GHPlanet" \
  "모바일 앱(Flutter·iOS·Android), 웹(Next.js·React·Vue·Svelte), 백엔드(NestJS·Node.js·Go·Python·AWS·Kubernetes·Terraform), AI 적용(Claude·OpenAI·MCP·RAG) 외주 개발을 12년차 풀스택 1인이 한 번에. 단발 작업 800만원부터, 신규 구축 2,500만원부터, 유지·운영 월 200만원부터." \
  "외주 개발 견적, 외주 개발 비용, 앱 개발 외주, 앱 개발 비용, 웹 개발 외주, 웹 개발 비용, 백엔드 외주, 백엔드 비용, AI 개발 외주, AI 개발 비용, 모바일 앱 개발, Flutter 외주, NestJS 외주, Next.js 외주, AWS 외주, Kubernetes 외주, MCP 개발, LLM 외주, 1인 풀스택 외주, 프리랜서 견적, GHPlanet 견적" \
  '{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GHPlanet 외주 개발 서비스",
    "provider": {
      "@type": "Organization",
      "name": "GHPlanet",
      "url": "https://ghyeok.io/"
    },
    "areaServed": "KR",
    "serviceType": ["모바일 앱 외주 개발", "웹 외주 개발", "백엔드 외주 개발", "인프라 외주 구축", "AI 통합 개발"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "협업 방식",
      "itemListElement": [
        {"@type": "Offer", "name": "단발 작업 (4-8주)", "priceCurrency": "KRW", "price": "8000000"},
        {"@type": "Offer", "name": "신규 구축 (8-20주)", "priceCurrency": "KRW", "price": "25000000"},
        {"@type": "Offer", "name": "유지·운영 (월 단위)", "priceCurrency": "KRW", "price": "2000000"}
      ]
    }
  }' \
  "서비스 — 모바일·웹·백엔드·인프라·AI 풀스택 외주 개발" \
  '<p style="color: #6b7178; line-height: 1.7;">프로덕트 설계, 모바일 앱(Flutter·iOS·Android), 백엔드·인프라(NestJS·Node·Go·Python·AWS·K8s), 웹·관리자(Next.js·React·Vue·Svelte), AI 적용(Claude·OpenAI·MCP·RAG)까지 한 사람이 끝까지 책임집니다. 단발 작업 4-8주 800만원부터, 신규 구축 8-20주 2,500만원부터, 유지·운영 월 200만원부터.</p>'

# ─── Work (list) ───────────────────────────────────────────────────
write_stub "$ROOT/work/index.html" "/work/" \
  "포트폴리오 · TUK · 짐데이 · 피지컬갤러리 · 모든별키즈 · 이파마스터 등 9개 실제 운영 프로덕트 | GHPlanet" \
  "12년간 만든 실제 운영 중인 프로덕트들. TUK 캐시백 플랫폼, Pinned! 북마크 앱, 모든별키즈 키즈 전문가 매칭 글로벌 서비스, 짐데이 100만 다운로드 PT 앱, 피지컬갤러리 Pro 300만 구독자 멤버십, 이파마스터·아나토미마스터 4만 운동지도자 학습/커뮤니티, 놀잇 실시간 영상 채팅, 소울톡 타로 상담." \
  "포트폴리오, 개발 사례, 앱 개발 사례, 웹 개발 사례, 풀스택 프로젝트, 캐시백 앱, 매칭 플랫폼, 헬스 앱, 교육 앱, 영상 채팅 앱, TUK, Pinned, 모든별키즈, 짐데이, 피지컬갤러리, 이파마스터, 아나토미마스터, 놀잇, 소울톡, GHPlanet 작업, 권혁 포트폴리오" \
  '{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "GHPlanet 포트폴리오",
    "url": "https://ghyeok.io/work/",
    "description": "12년간 만든 9개 실제 운영 프로덕트"
  }' \
  "포트폴리오 — 9개 실제 운영 프로덕트" \
  '<p style="color: #6b7178; line-height: 1.7;">TUK (캐시백·리워드 플랫폼), Pinned! (자체 북마크 앱), 모든별키즈 (키즈 전문가 매칭 글로벌 서비스), 짐데이 (100만+ 다운로드 PT 앱), 피지컬갤러리 Pro (300만 구독자 채널 기반), 아나토미마스터 (운동지도자 해부학 학습), 이파마스터 (4만+ 운동지도자 학습/커뮤니티), 놀잇 (실시간 영상 채팅 키즈 플랫폼), 소울톡 (온라인 타로 상담 앱).</p>'

# ─── Contact ───────────────────────────────────────────────────────
write_stub "$ROOT/contact/index.html" "/contact/" \
  "연락 · me@ghyeok.io · 외주 개발 의뢰 · 견적 문의 | GHPlanet" \
  "프로젝트 의뢰, 외주 개발 견적, AI 통합 컨설팅, 운영 서비스 고도화 문의. me@ghyeok.io로 요일·시간 상관없이 언제든 편하게 연락 주세요. 가능한 빠르게 답장드립니다." \
  "외주 개발 의뢰, 외주 개발 견적, 앱 개발 의뢰, 웹 개발 의뢰, AI 개발 의뢰, GHPlanet 연락, 권혁 연락, me@ghyeok.io, 풀스택 개발자 연락, 1인 스튜디오 견적" \
  '{
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "GHPlanet 연락",
    "url": "https://ghyeok.io/contact/",
    "mainEntity": {
      "@type": "Organization",
      "name": "GHPlanet",
      "email": "me@ghyeok.io"
    }
  }' \
  "연락 — me@ghyeok.io" \
  '<p style="color: #6b7178; line-height: 1.7;">새로운 프로덕트 의뢰, 운영 중인 서비스 고도화, AI 통합 적용, 짧은 자문도 환영합니다. 요일·시간 상관없이 <a href="mailto:me@ghyeok.io" style="color:inherit">me@ghyeok.io</a>로 연락 주세요. <a href="https://github.com/GwonHyeok" style="color:inherit">GitHub</a>도 있습니다.</p>'

# ─── Quote ─────────────────────────────────────────────────────────
write_stub "$ROOT/quote/index.html" "/quote/" \
  "프로젝트 의뢰 · 외주 개발 견적 요청 | GHPlanet" \
  "5단계 폼으로 1분 안에 외주 개발 견적 요청. 모바일 앱·웹·백엔드·인프라·AI 통합. 단발 작업 800만원부터, 신규 구축 2,500만원부터, 유지·운영 월 200만원부터." \
  "외주 개발 견적 요청, 프로젝트 의뢰, 앱 개발 견적, 웹 개발 견적, AI 개발 견적, GHPlanet 의뢰, 풀스택 견적, 외주 견적 폼" \
  '{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "프로젝트 의뢰",
    "url": "https://ghyeok.io/quote/"
  }' \
  "프로젝트를 들려주세요." \
  '<p style="color: #6b7178; line-height: 1.7;">5단계로 진행하는 외주 개발 견적 요청 폼. 종류·단계·예산·일정·연락처를 알려주시면 me@ghyeok.io로 도착합니다.</p>'

echo "Base stubs written. Project stubs: $ROOT/_seo/gen-projects.sh"
