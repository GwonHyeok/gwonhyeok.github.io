// data.jsx — shared content for GHPlanet site
// Exposes constants on window so other scripts can read them.

const PROJECTS = [
  {
    id: "nara",
    title: "나라장터 컴패니언",
    titleEn: "Nara Companion",
    client: "공공조달 SaaS",
    year: "2024",
    services: ["모바일 앱", "백엔드"],
    chips: ["iOS", "Android", "Node"],
    summary: "공공입찰 알림을 24시간 안에 받아보는 B2G 모바일 앱.",
    role: "기획 · 디자인 · 개발",
    duration: "14주",
    award: "—",
    industry: "공공·조달",
    desc: "공공조달 정보를 큐레이션해 매일 아침 푸시로 전달. 8개월간 MAU 12만 달성."
  },
  {
    id: "ondol",
    title: "온돌 커머스 리브랜드",
    titleEn: "Ondol Re-brand",
    client: "온돌 리빙",
    year: "2024",
    services: ["브랜드", "웹"],
    chips: ["Next.js", "Sanity", "디자인"],
    summary: "한식 라이프스타일 D2C 브랜드의 디지털 전면 개편.",
    role: "브랜드 · 웹",
    duration: "9주",
    award: "—",
    industry: "커머스",
    desc: "유튜브 채널과 자사몰의 통합 경험을 설계. 전환율 +41%."
  },
  {
    id: "moa",
    title: "모아 학습 플랫폼",
    titleEn: "MOA Learning",
    client: "에듀테크 스타트업",
    year: "2023",
    services: ["프로덕트", "앱"],
    chips: ["React Native", "AI"],
    summary: "초·중등 학습자를 위한 AI 튜터링 앱. 누적 다운로드 80만.",
    role: "기획 · 디자인 · 개발",
    duration: "22주",
    award: "—",
    industry: "교육",
    desc: "음성 입력 기반 풀이 채점, 학습 흐름 시각화."
  },
  {
    id: "han",
    title: "한솔 모빌리티",
    titleEn: "Hansol Mobility",
    client: "물류 그룹사",
    year: "2023",
    services: ["웹 앱", "시스템"],
    chips: ["TypeScript", "Mapbox"],
    summary: "전국 거점 4,200개를 실시간 시각화하는 디스패처 콘솔.",
    role: "디자인 · 프론트엔드",
    duration: "16주",
    award: "—",
    industry: "물류",
    desc: "기존 엑셀 워크플로우를 대체. 라우팅 효율 +28%."
  },
  {
    id: "siot",
    title: "시옷 매거진",
    titleEn: "Siot Magazine",
    client: "독립 출판",
    year: "2023",
    services: ["에디토리얼", "웹"],
    chips: ["Astro", "MDX"],
    summary: "한글 타이포그래피 매거진의 디지털 아카이브.",
    role: "디자인 · 개발",
    duration: "6주",
    award: "—",
    industry: "출판·매거진",
    desc: "활자 단위로 검색 가능한 인덱스 + 발행 시스템."
  },
  {
    id: "byeol",
    title: "별빛 케어",
    titleEn: "Byeolbit Care",
    client: "헬스케어 NGO",
    year: "2022",
    services: ["앱", "서비스"],
    chips: ["Flutter", "Firebase"],
    summary: "환자 가족을 위한 호스피스 케어 노트 앱.",
    role: "리서치 · 디자인 · 개발",
    duration: "12주",
    award: "—",
    industry: "헬스케어",
    desc: "감정 기록과 의료 정보를 한 곳에. 7개 호스피스 도입."
  },
  {
    id: "muu",
    title: "무 스튜디오",
    titleEn: "MUU Studio",
    client: "건축 스튜디오",
    year: "2022",
    services: ["Brand", "Web"],
    chips: ["Webflow", "GSAP"],
    summary: "건축 포트폴리오 사이트, 도면을 인터렉티브 시퀀스로.",
    role: "디자인 · 개발",
    duration: "8주",
    award: "—",
    industry: "건축",
    desc: "스크롤 기반 도면 레이어 시퀀스. 평균 체류 4분 22초."
  },
  {
    id: "rim",
    title: "림 핀테크",
    titleEn: "Rim Fintech",
    client: "B2B 핀테크",
    year: "2024",
    services: ["프로덕트", "대시보드"],
    chips: ["Next.js", "D3"],
    summary: "정산 데이터를 분 단위로 분석하는 대시보드.",
    role: "디자인 · 프론트엔드",
    duration: "18주",
    award: "—",
    industry: "핀테크",
    desc: "복잡한 정산 로직을 한 화면으로 통합. 처리시간 4시간 → 12분."
  },
];

const SERVICES = [
  {
    n: "01",
    title: "전략",
    titleKo: "전략",
    lead: "프로덕트가 풀고자 하는 문제를 다시 정의합니다. 비즈니스 KPI에서 출발해 사용자 모먼트로 설계를 끌어내립니다.",
    items: ["프로덕트 디스커버리", "브랜드 전략", "시장 리서치", "UX 진단", "워크숍 운영"],
  },
  {
    n: "02",
    title: "디자인",
    titleKo: "디자인",
    lead: "타이포그래피와 인터랙션을 한 줄의 문장처럼 다룹니다. 픽셀이 아니라 ‘읽기 좋은 경험’을 짓습니다.",
    items: ["프로덕트 디자인", "브랜드 아이덴티티", "디자인 시스템", "모션", "프로토타이핑"],
  },
  {
    n: "03",
    title: "엔지니어링",
    titleKo: "엔지니어링",
    lead: "디자인 의도를 잃지 않는 구현. 모바일·웹·백엔드를 한 사람이 만들어 인계가 매끄럽습니다.",
    items: ["iOS · Android · Flutter", "Next.js · React Native", "Node · Go · Python", "헤드리스 CMS", "DevOps"],
  },
  {
    n: "04",
    title: "그로스 & 운영",
    titleKo: "그로스 & 운영",
    lead: "출시는 끝이 아니라 시작입니다. 데이터 기반으로 다음 사이클을 같이 돌립니다.",
    items: ["애널리틱스 설계", "A/B 테스트", "그로스 루프", "유지보수 SLA", "팀 트레이닝"],
  },
];

const TEAM = [
  { name: "권혁", role: "기획 · 디자인 · 개발", k: "G" },
];

const COLLABORATORS = [
  { role: "브랜드 · 모션", note: "프로젝트 단위로 합류" },
  { role: "iOS 네이티브", note: "네이티브 iOS 작업 시" },
  { role: "백엔드 (Go·Node)", note: "대규모 서버 설계" },
  { role: "일러스트레이션", note: "브랜딩 프로젝트" },
];

const POSTS = [
  { n: "031", t: "에이전시가 디자인 시스템을 ‘파는’ 법", tag: "Design Ops", date: "2026.04.18" },
  { n: "030", t: "온돌 리브랜드 회고 — 9주의 흔적", tag: "Case Study", date: "2026.03.30" },
  { n: "029", t: "한글 타이포그래피, 다시 측정하기", tag: "Typography", date: "2026.03.02" },
  { n: "028", t: "프로토타입을 코드로 만든다는 것", tag: "Engineering", date: "2026.02.14" },
  { n: "027", t: "왜 우리는 매주 금요일에 출시하는가", tag: "Process", date: "2026.01.22" },
  { n: "026", t: "리서치 인터뷰의 7가지 함정", tag: "Research", date: "2025.12.09" },
  { n: "025", t: "스타트업이 외주를 잘 쓰는 법", tag: "Note", date: "2025.11.18" },
];

const CLIENTS = ["NAVER", "Kakao", "현대", "LG", "토스", "당근", "쿠팡", "배민", "야놀자", "리디", "29CM", "마켓컬리"];

const NAV_LINKS = [
  { key: "home", label: "홈" },
  { key: "about", label: "소개" },
  { key: "services", label: "서비스" },
  { key: "work", label: "포트폴리오" },
  { key: "contact", label: "연락" },
];

Object.assign(window, { PROJECTS, SERVICES, TEAM, COLLABORATORS, POSTS, CLIENTS, NAV_LINKS });
