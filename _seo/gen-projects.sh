#!/usr/bin/env bash
# Per-project stub generator. Uses the same write_stub helper logic inline.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE="https://ghyeok.io"

write_stub() {
  local out="$1" path="$2" title="$3" desc="$4" keywords="$5" jsonld="$6" h1="$7" body_html="$8"
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
  <meta property="og:type" content="article" />
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
        <a href="/work/" style="color:inherit; margin-right:14px">전체 포트폴리오</a>
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

mk_jsonld() {
  local name="$1" desc="$2" cat="$3" date="$4" os="$5"
  cat <<JSON
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "${name}",
  "applicationCategory": "${cat}",
  "operatingSystem": "${os}",
  "creator": {
    "@type": "Person",
    "name": "권혁",
    "alternateName": "GHyeok",
    "url": "https://ghyeok.io/about/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GHPlanet",
    "url": "https://ghyeok.io/"
  },
  "datePublished": "${date}",
  "description": "${desc}",
  "image": "https://ghyeok.io/profile/me.png"
}
JSON
}

# ─── TUK ───────────────────────────────────────────────────────────
write_stub "$ROOT/work/tuk/index.html" "/work/tuk/" \
  "TUK · 캐시백·리워드 플랫폼 · Flutter + NestJS + Next.js 1인 풀스택 | GHPlanet 포트폴리오" \
  "쿠팡·테무·올리브영 등 주요 쇼핑몰 캐시백 자동 적립 플랫폼 TUK. Flutter 모바일 앱 + NestJS·Prisma API + Next.js 어드민 + K8s·Terraform 인프라까지 1인 풀스택 개발. 다중 인증(Phone·Kakao·Naver·Google·Apple), 어필리에이트 웹훅, 출금·정산 시스템 구축." \
  "TUK, 툭, 캐시백 앱, 리워드 앱, Flutter 외주, NestJS 외주, Next.js 어드민, Prisma, PostgreSQL, Kubernetes, Terraform, 어필리에이트 시스템, 풀스택 개발 사례" \
  "$(mk_jsonld 'TUK (툭)' '캐시백·리워드 플랫폼. 주요 쇼핑몰 캐시백을 자동 적립. Flutter + NestJS + Next.js + K8s 1인 풀스택.' 'FinanceApplication' '2024' 'iOS, Android')" \
  "TUK — 캐시백·리워드 플랫폼" \
  '<p style="color: #6b7178; line-height: 1.7;">쿠팡·테무·올리브영·컬리·지그재그 등 100+ 쇼핑몰 캐시백 자동 적립 플랫폼. Flutter 단일 코드베이스로 iOS·Android 동시 출시, NestJS·Prisma·PostgreSQL API, Next.js 관리자, Kubernetes·Terraform 기반 인프라까지 1인 풀스택으로 구축. 다중 인증(전화·카카오·네이버·구글·애플), 어필리에이트 웹훅 처리, 출금·정산 시스템 구현.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · NestJS · Prisma · Next.js · PostgreSQL · Kubernetes · Terraform · Docker · NCloud · JWT</p>'

# ─── Pinned ────────────────────────────────────────────────────────
write_stub "$ROOT/work/pinned/index.html" "/work/pinned/" \
  "Pinned! · SNS·콘텐츠 링크 북마크 앱 · iOS·Android Native | GHPlanet 자체 운영 앱" \
  "공유하기 버튼 1초로 끝나는 SNS·콘텐츠 링크 북마크 앱 Pinned!. 인스타·유튜브·틱톡·아티클·쇼핑 링크를 OS 공유 메뉴에서 한 번에 저장하고 카테고리·태그로 분류. iOS Share Extension·Android Share Intent 활용. GHPlanet이 직접 운영." \
  "Pinned, 핀드, 북마크 앱, 링크 저장 앱, Share Extension, Share Intent, iOS 네이티브, Android 네이티브, 자체 운영 앱, GHPlanet 앱, ghyeok 앱, 권혁 앱" \
  "$(mk_jsonld 'Pinned!' '공유하기 버튼 1초로 끝나는 SNS·콘텐츠 링크 북마크 앱. iOS·Android 네이티브.' 'ProductivityApplication' '2024' 'iOS, Android')" \
  "Pinned! — SNS·콘텐츠 링크 북마크 앱" \
  '<p style="color: #6b7178; line-height: 1.7;">인스타·유튜브·틱톡 등 SNS와 아티클·쇼핑 링크를 OS 공유 메뉴에서 한 번에 저장하는 자체 운영 앱. 카테고리·태그로 분류해 나만의 콘텐츠 라이브러리를 만듭니다. iOS Share Extension과 Android Share Intent를 활용해 어떤 앱에서든 1초 만에 저장.</p><p style="color: #6b7178;"><b>스택:</b> iOS Native · Android Native · Share Extension · Share Intent</p>'

# ─── Everystars (모든별키즈) ────────────────────────────────────────
write_stub "$ROOT/work/everystars/index.html" "/work/everystars/" \
  "모든별키즈 (Everystars) · 키즈 전문가 매칭 글로벌 서비스 · Next.js 풀스택 | GHPlanet 포트폴리오" \
  "아이의 학습·취미·홈티칭 전문가를 3단계로 찾아 연결하는 글로벌 매칭 플랫폼 모든별키즈. Next.js + i18n(next-intl) 다국어 지원, 전문가 탐색·1:1 채팅·예약·결제까지 통합. 신뢰 매칭을 위한 검증 플로우 설계." \
  "모든별키즈, Everystars, 키즈 전문가 매칭, 홈티칭 플랫폼, Next.js 외주, next-intl, 글로벌 서비스, 매칭 플랫폼 개발, TypeScript 풀스택" \
  "$(mk_jsonld '모든별키즈 (Everystars)' '키즈 전문가 매칭 글로벌 서비스. Next.js · i18n · 1:1 채팅 · 예약 · 결제.' 'LifestyleApplication' '2024' 'Web')" \
  "모든별키즈 — 키즈 전문가 매칭 글로벌 서비스" \
  '<p style="color: #6b7178; line-height: 1.7;">학부모와 검증된 키즈 전문가를 3단계 — 전문가 탐색, 1:1 채팅 인터뷰, 홈티칭 시작 — 로 연결하는 글로벌 매칭 플랫폼. Next.js 기반에 next-intl 다국어, 전문가 프로필·예약·1:1 채팅·결제까지 통합. 신뢰 가능한 매칭을 위한 검증 플로우 설계.</p><p style="color: #6b7178;"><b>스택:</b> Next.js · TypeScript · next-intl · React</p>'

# ─── GymDay (짐데이) ────────────────────────────────────────────────
write_stub "$ROOT/work/gymday/index.html" "/work/gymday/" \
  "짐데이 (GymDay) · 누적 100만+ 다운로드 PT 앱 · 데이코어 | GHPlanet 포트폴리오" \
  "누적 다운로드 100만 이상 퍼스널 트레이너 앱 짐데이. PHP 레거시를 100% Node.js로 마이그레이션, AWS Aurora Serverless로 스케일 아웃 시스템 구축. Python·Tensorflow로 1,000만 운동 데이터 기반 루틴 추천 AI 모델까지 1인이 개발." \
  "짐데이, GymDay, 데이코어, 퍼스널 트레이너 앱, 100만 다운로드 앱, PHP Node.js 마이그레이션, Aurora Serverless, AWS ECS, Flutter, Koa, TypeScript, 운동 추천 AI, Python Tensorflow, 헬스 앱 개발" \
  "$(mk_jsonld '짐데이 (GymDay)' '누적 100만 다운로드 퍼스널 트레이너 앱. PHP→Node.js 마이그레이션, Aurora Serverless, AI 운동 추천.' 'HealthApplication' '2018' 'iOS, Android')" \
  "짐데이 — 누적 100만+ 다운로드 PT 앱" \
  '<p style="color: #6b7178; line-height: 1.7;">데이코어가 운영하는 누적 100만 다운로드 이상의 퍼스널 트레이너 앱. PHP 레거시 백엔드를 100% Node.js·Koa로 풀 마이그레이션, AWS Aurora Serverless와 ECS Fargate로 스케일 아웃 시스템 구축, 네이티브 앱을 Flutter로 재개발. Python·Numpy·Tensorflow로 1,000만 건 운동 데이터와 3만 건 루틴 데이터를 학습한 운동 추천 AI 모델 개발.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · Node.js · Koa · TypeScript · AWS Aurora Serverless · ECS · Python · Tensorflow · Vue.js</p>'

# ─── Physical Gallery Pro (피지컬갤러리 Pro) ────────────────────────
write_stub "$ROOT/work/physicalgallery/index.html" "/work/physicalgallery/" \
  "피지컬갤러리 Pro · 300만 구독자 유튜브 기반 멤버십 앱 · 라이프에이드 | GHPlanet 포트폴리오" \
  "300만 구독자 피지컬갤러리 유튜브 기반의 Pro 멤버십 앱 (라이프에이드). 동시접속 2,500+ 트래픽 폭발 시 발생한 DB Lock 문제를 Query Optimizing과 AWS Aurora Serverless로 해결, ECS Auto-scale로 안정적 운영. Flutter + TypeScript Koa API + Vue.js 어드민 1인 풀스택." \
  "피지컬갤러리 Pro, 라이프에이드, 300만 구독자, 유튜브 멤버십 앱, Flutter, TypeScript, Koa, Aurora Serverless, AWS ECS, 동시접속 트래픽, DB Lock 해결, 헬스 미디어 앱" \
  "$(mk_jsonld '피지컬갤러리 Pro (라이프에이드)' '300만 구독자 유튜브 기반 Pro 멤버십 앱. Aurora Serverless·ECS Auto-scale.' 'HealthApplication' '2019' 'iOS, Android')" \
  "피지컬갤러리 Pro — 300만 구독자 멤버십 앱" \
  '<p style="color: #6b7178; line-height: 1.7;">300만 구독자 피지컬갤러리 유튜브 기반의 Pro 멤버십 앱 서비스. 해당 서비스의 유일 개발자로 Flutter 앱, TypeScript·Koa·TypeORM REST API, Vue.js 관리자까지 풀스택 구축. 트래픽 급증으로 동시접속 2,500명 이상 유입 시 발생하던 DB Lock 문제를 Query Optimizing과 AWS Aurora Serverless로 해결, ECS Auto-scale로 안정적인 서비스 운영.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · TypeScript · Koa · TypeORM · Vue.js · AWS Aurora Serverless · ECS</p>'

# ─── Anatomaster (아나토미마스터) ───────────────────────────────────
write_stub "$ROOT/work/anatomaster/index.html" "/work/anatomaster/" \
  "아나토미마스터 · 운동지도자 해부학 암기 앱 · 용감한컴퍼니 | GHPlanet 포트폴리오" \
  "운동지도자(트레이너)를 위한 해부학 암기 앱 신규 서비스. 근육·뼈·관절 명칭을 퀴즈로 학습. Flutter 단일 코드베이스로 iOS·Android 동시 출시, 기존 이파마스터 인프라와 호환되도록 PHP API 작성. 해당 서비스 유일 앱 개발자." \
  "아나토미마스터, Anatomaster, 용감한컴퍼니, 해부학 앱, 운동지도자 학습, 트레이너 자격증, Flutter 앱 개발, PHP API, 신규 서비스 개발" \
  "$(mk_jsonld '아나토미마스터' '운동지도자를 위한 해부학 암기 앱. Flutter + PHP API.' 'EducationApplication' '2023' 'iOS, Android')" \
  "아나토미마스터 — 운동지도자 해부학 학습" \
  '<p style="color: #6b7178; line-height: 1.7;">용감한컴퍼니의 운동지도자용 해부학 암기 앱 신규 서비스. 해당 서비스의 유일한 앱 개발자로 Flutter 단일 코드베이스로 iOS·Android 동시 출시, 기존 이파마스터 서비스와의 호환 및 협업을 위해 PHP로 API 작업. 근육·뼈·관절 명칭을 퀴즈 형태로 학습.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · PHP · iOS · Android</p>'

# ─── iiPA (이파마스터) ──────────────────────────────────────────────
write_stub "$ROOT/work/iipa/index.html" "/work/iipa/" \
  "이파마스터 (iiPA) · 4만+ 운동지도자 학습·커뮤니티 앱 · 용감한컴퍼니 메인 프로덕트 | GHPlanet 포트폴리오" \
  "운동지도자(트레이너) 학습·커뮤니티 앱. 4만 트레이너가 사용하는 콘텐츠·칼럼·커뮤니티 통합 플랫폼. 용감한컴퍼니 메인 프로덕트. Flutter 단일 코드베이스로 iOS·Android 동시 출시, PHP API와 호환되도록 학습 흐름·결제·콘텐츠·커뮤니티까지 1인 개발." \
  "이파마스터, iipa, 용감한컴퍼니, 운동지도자 앱, 트레이너 학습 앱, 트레이너 커뮤니티, Flutter 앱, 헬스 교육 앱, 운동지도자 자격증, 디지털 헬스 교육" \
  "$(mk_jsonld '이파마스터 (iiPA)' '4만+ 운동지도자 학습/커뮤니티 앱. Flutter + PHP API.' 'EducationApplication' '2021' 'iOS, Android')" \
  "이파마스터 — 4만+ 운동지도자 학습/커뮤니티 앱" \
  '<p style="color: #6b7178; line-height: 1.7;">용감한컴퍼니의 메인 프로덕트. 4만 명 이상 운동지도자(트레이너)가 사용하는 학습·콘텐츠·칼럼·커뮤니티 통합 플랫폼. Flutter 단일 코드베이스로 iOS·Android 동시 출시, PHP API 호환성을 유지하며 콘텐츠·칼럼·커뮤니티·결제까지 1인 개발.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · PHP · iOS · Android</p>'

# ─── Noleet (놀잇) ──────────────────────────────────────────────────
write_stub "$ROOT/work/noleet/index.html" "/work/noleet/" \
  "놀잇 (Noleet) · 실시간 영상 채팅 키즈 놀이 플랫폼 · Agora + Firebase | GHPlanet 포트폴리오" \
  "세상의 모든 아이를 잇는 실시간 영상 채팅 놀이 플랫폼 놀잇. Agora Engine 기반 실시간 영상통화, Firebase Serverless 아키텍처, Svelte 관리자 CMS를 1인 풀스택으로 구축." \
  "놀잇, Noleet, norit, 실시간 영상 채팅, 영상통화 앱, 키즈 영상 채팅, Agora Engine, Firebase Serverless, Svelte CMS, Flutter, 키즈 플랫폼" \
  "$(mk_jsonld '놀잇 (Noleet)' '실시간 영상 채팅 키즈 놀이 플랫폼. Agora + Firebase + Flutter + Svelte.' 'SocialNetworkingApplication' '2022' 'iOS, Android')" \
  "놀잇 — 실시간 영상 채팅 키즈 놀이" \
  '<p style="color: #6b7178; line-height: 1.7;">세상의 모든 아이를 잇는 실시간 영상 채팅 놀이 플랫폼. Flutter 기반 모바일 앱, Agora Engine 실시간 영상통화, Firebase Serverless 아키텍처(Firestore·Storage·Cloud Functions), Svelte 관리자 CMS까지 1인 풀스택으로 구축.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · Firebase · Agora · Svelte · Serverless</p>'

# ─── Soultalk (소울톡) ──────────────────────────────────────────────
write_stub "$ROOT/work/soultalk/index.html" "/work/soultalk/" \
  "소울톡 (Soul Talk) · 온라인 타로 상담 앱 · Firebase + Agora | GHPlanet 포트폴리오" \
  "온라인 타로 상담 앱 소울톡. 실시간 카드 뽑기·채팅·통화 상담을 한 앱으로. Firestore 기반 상담사·유저 채팅, Agora Engine 통화 상담, Vue3 관리자 CMS까지 단일 개발자로 완성." \
  "소울톡, Soultalk, 타로 상담 앱, 온라인 상담 앱, Flutter, Firebase, Firestore, Agora, Vue3 CMS, 라이프스타일 앱" \
  "$(mk_jsonld '소울톡 (Soul Talk)' '온라인 타로 상담 앱. Flutter + Firestore + Agora + Vue3 CMS.' 'LifestyleApplication' '2022' 'iOS, Android')" \
  "소울톡 — 온라인 타로 상담 앱" \
  '<p style="color: #6b7178; line-height: 1.7;">실시간 카드 뽑기와 상담사와의 채팅·통화 상담을 한 앱에서 제공하는 온라인 타로 상담 서비스. Flutter 앱, Firestore 기반 상담사-유저 채팅, Agora Engine 통화 상담, Vue3 관리자 CMS까지 단일 개발자로 완성.</p><p style="color: #6b7178;"><b>스택:</b> Flutter · Firebase · Firestore · Agora · Vue3 · Serverless</p>'

echo "Project stubs written: $(ls "$ROOT/work" | wc -l) entries"
