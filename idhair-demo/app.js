const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  mode: 'admin',
  page: 'dashboard',
  surveyStep: 0,
  selectedCustomer: null,
  survey: {
    name: '김하늘', gender: '여성', birth: '1992-05-18', phone: '010-2487-5931', address: '서울시 강남구', designer: '서윤 디자이너',
    visit: ['네이버 검색'], introducer: '', stylePhoto: '상담 디자이너가 추천', rank: '관계없음',
    menus: ['컷', '모발케어'], images: ['자연스러운', '나에게 맞춤 추천'], points: ['모발손상', '손질이 편한'],
    scalp: ['건조한'], hair: ['부스스하고 건조한 모발', '이전 시술 후 손상된 모발'], homecare: ['전문가의 추천제품'], requiredConsent: true, marketingConsent: false
  }
};

const customers = [
  { id: 1, name: '김하늘', phone: '010-****-5931', branch: '강남점', designer: '서윤', menu: '컷 · 모발케어', visit: '네이버 검색', date: '08.07 14:32', status: '상담 완료', consent: true },
  { id: 2, name: '박지우', phone: '010-****-1842', branch: '청담점', designer: '민준', menu: '컬러', visit: '인스타그램', date: '08.07 13:18', status: '신규', consent: true },
  { id: 3, name: '이서연', phone: '010-****-8274', branch: '홍대점', designer: '하린', menu: '펌 · 컷', visit: '지인 소개', date: '08.07 11:05', status: '상담 중', consent: true },
  { id: 4, name: '정민서', phone: '010-****-2197', branch: '강남점', designer: '도윤', menu: '두피관리', visit: '거주지 근처', date: '08.07 10:42', status: '상담 완료', consent: false },
  { id: 5, name: '최유진', phone: '010-****-0483', branch: '수원점', designer: '지안', menu: '모발케어', visit: '네이버 검색', date: '08.06 18:22', status: '상담 완료', consent: true },
  { id: 6, name: '한소희', phone: '010-****-6621', branch: '분당점', designer: '예은', menu: '컬러 · 펌', visit: '인스타그램', date: '08.06 16:55', status: '상담 완료', consent: true },
];

const icons = { dashboard:'◫', customers:'♙', analytics:'⌁', survey:'☷', branches:'⌂', staff:'♧', settings:'⚙' };
const nav = [
  { group:'Overview', items:[['dashboard','대시보드'],['customers','고객·설문'],['analytics','통계 분석']] },
  { group:'Management', items:[['survey','설문 관리'],['branches','지점 관리'],['staff','직원·권한']] },
  { group:'System', items:[['settings','운영 설정']] }
];

function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function shell(content, title) {
  return `<div class="admin-shell">
    <aside class="sidebar">
      <div class="wordmark">idHAIR<small>Customer Insight</small></div>
      ${nav.map(group => `<div class="nav-group"><div class="nav-label">${group.group}</div>${group.items.map(([id,label]) => `<button class="nav-item ${state.page===id?'active':''}" data-page="${id}"><span class="nav-icon">${icons[id]}</span>${label}</button>`).join('')}</div>`).join('')}
      <div class="sidebar-bottom"><div class="profile-card"><div class="avatar">HQ</div><div><b>본사 관리자</b><span>superadmin@idhair.com</span></div></div></div>
    </aside>
    <main class="admin-main">
      <header class="topbar"><div style="display:flex;align-items:center;gap:10px"><button class="icon-button mobile-nav-button" data-menu>☰</button><div class="breadcrumb">idHAIR / <b>${title}</b></div></div><div class="top-actions"><button class="icon-button" title="검색">⌕</button><button class="icon-button" title="알림">♢</button></div></header>
      <div class="content">${content}</div>
    </main>
  </div>`;
}

function pageHeader(eyebrow, title, desc, actions='') {
  return `<div class="page-header"><div><div class="eyebrow">${eyebrow}</div><h1 class="page-title">${title}</h1><p class="page-desc">${desc}</p></div>${actions ? `<div class="button-row">${actions}</div>` : ''}</div>`;
}

function metric(label, value, icon, foot) {
  return `<div class="metric-card"><div class="metric-head"><span>${label}</span><span class="metric-icon">${icon}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></div>`;
}

function dashboardPage() {
  const rows = customers.slice(0,5).map(c => customerRow(c)).join('');
  return shell(`${pageHeader('Head Office Overview','좋은 오후예요, 본사 관리자님','전 지점의 신규 고객과 상담 데이터를 한눈에 확인하세요.','<button class="btn">↓ 리포트</button><button class="btn primary" data-new-survey>＋ 새 설문</button>')}
    <div class="filter-bar"><select class="filter"><option>2026년 8월</option><option>최근 30일</option></select><select class="filter"><option>전체 지점</option><option>강남점</option><option>청담점</option></select><span style="color:var(--muted);font-size:11px">마지막 갱신 오늘 14:40</span></div>
    <div class="metric-grid">
      ${metric('이번 달 신규 설문','2,840','↗','<span class="delta">+12.4%</span> 전월 대비')}
      ${metric('오늘 방문 고객','186','♙','97개 지점에서 제출')}
      ${metric('활성 지점','97 / 102','⌂','95.1% 설문 운영 중')}
      ${metric('마케팅 동의율','68.2%','✓','<span class="delta">+2.1%p</span> 전월 대비')}
    </div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-head"><div><h2 class="panel-title">신규 설문 추이</h2><div class="panel-sub">최근 7개월 전체 지점 제출 현황</div></div><span class="tag">월별</span></div><div class="chart-wrap"><canvas id="trendChart"></canvas></div></section>
      <section class="panel"><div class="panel-head"><div><h2 class="panel-title">방문 동기</h2><div class="panel-sub">이번 달 신규 고객 기준</div></div></div><div class="chart-wrap short"><canvas id="visitChart"></canvas></div></section>
      <section class="panel span-2 table-panel"><div class="panel-head"><div><h2 class="panel-title">최근 제출 설문</h2><div class="panel-sub">모든 지점에서 실시간으로 수집된 상담 정보</div></div><button class="btn small" data-page="customers">전체 보기 →</button></div><div class="table-scroll"><table class="data-table"><thead><tr><th>고객</th><th>지점 / 디자이너</th><th>관심 메뉴</th><th>방문 경로</th><th>제출 시각</th><th>상태</th></tr></thead><tbody>${rows}</tbody></table></div></section>
    </div>`, '대시보드');
}

function customerRow(c) {
  const tagClass = c.status === '상담 완료' ? 'success' : c.status === '상담 중' ? 'warning' : '';
  return `<tr data-customer="${c.id}"><td><div class="customer-cell"><div class="mini-avatar">${c.name.slice(-1)}</div><div><b>${c.name}</b><div style="color:var(--muted);font-size:10px">${c.phone}</div></div></div></td><td>${c.branch} <span style="color:var(--soft)">·</span> ${c.designer}</td><td>${c.menu}</td><td>${c.visit}</td><td>${c.date}</td><td><span class="tag ${tagClass}">${c.status}</span></td></tr>`;
}

function customersPage() {
  return shell(`${pageHeader('Customer Database','고객·설문 관리','신규 고객 정보를 검색하고 제출된 상담 설문을 확인합니다.','<button class="btn">↓ 엑셀 다운로드</button><button class="btn primary" data-new-survey>＋ 새 설문 시작</button>')}
    <div class="filter-bar"><input class="search" placeholder="고객명 또는 연락처 검색"><select class="filter"><option>전체 기간</option><option>오늘</option><option>이번 달</option></select><select class="filter"><option>전체 지점</option><option>강남점</option><option>청담점</option></select><select class="filter"><option>전체 상태</option><option>상담 완료</option><option>상담 중</option></select></div>
    <section class="panel table-panel"><div class="panel-head"><div><h2 class="panel-title">전체 고객</h2><div class="panel-sub">총 28,412명 · 이번 달 신규 2,840명</div></div><button class="btn small">필터 초기화</button></div><div class="table-scroll"><table class="data-table"><thead><tr><th>고객</th><th>지점 / 디자이너</th><th>관심 메뉴</th><th>방문 경로</th><th>제출 시각</th><th>상태</th></tr></thead><tbody>${customers.map(customerRow).join('')}</tbody></table></div><div class="pagination"><span>1–6 / 28,412</span><div class="button-row"><button class="btn small" disabled>이전</button><button class="btn small">다음</button></div></div></section>`, '고객·설문');
}

function customerDetailPage(id) {
  const c = customers.find(x=>x.id===id) || customers[0];
  return shell(`${pageHeader('Customer Profile',`${c.name} 고객님`,`2026년 8월 7일 · ${c.branch} · ${c.designer} 디자이너`,'<button class="btn" data-back-customers>← 목록</button><button class="btn">수정 이력</button><button class="btn primary">상담 완료</button>')}
    <div class="detail-grid">
      <section class="panel detail-section">
        <div class="section-block"><h2 class="section-title">고객 정보</h2><div class="info-grid"><div class="info-item"><label>성함</label><strong>${c.name}</strong></div><div class="info-item"><label>성별</label><strong>여성</strong></div><div class="info-item"><label>생년월일</label><strong>1992. 05. 18</strong></div><div class="info-item"><label>연락처</label><strong>${c.phone}</strong></div><div class="info-item"><label>주소</label><strong>서울시 강남구</strong></div><div class="info-item"><label>담당 디자이너</label><strong>${c.designer} 디자이너</strong></div></div></div>
        <div class="section-block"><h2 class="section-title">상담 설문</h2>
          ${answer('방문 동기',[c.visit])}${answer('원하는 스타일 사진',['상담 디자이너가 추천'])}${answer('시술 담당 희망 직급',['관계없음'])}${answer('관심 있는 메뉴',c.menu.split(' · '))}${answer('원하는 이미지',['자연스러운','나에게 맞춤 추천'])}${answer('가장 신경 써야 할 포인트',['모발손상','손질이 편한'])}${answer('두피 고민',['건조한'])}${answer('모발 고민',['부스스하고 건조한 모발','이전 시술 후 손상된 모발'])}
        </div>
      </section>
      <div style="display:grid;gap:16px;align-content:start">
        <section class="panel"><div class="panel-head"><div><h2 class="panel-title">개인정보 동의</h2><div class="panel-sub">동의 문구 v1.2</div></div><span class="tag success">필수 동의</span></div><div class="info-grid"><div class="info-item"><label>필수 수집·이용</label><strong>동의</strong></div><div class="info-item"><label>마케팅 활용</label><strong>${c.consent?'동의':'미동의'}</strong></div><div class="info-item"><label>동의 시각</label><strong>2026.08.07 14:32</strong></div><div class="info-item"><label>수집 채널</label><strong>매장 태블릿</strong></div></div></section>
        <section class="panel"><div class="panel-head"><div><h2 class="panel-title">상담 이력</h2><div class="panel-sub">고객 접점 및 변경 기록</div></div><button class="btn small">＋ 메모</button></div><div class="timeline"><div class="timeline-item"><time>오늘 14:48</time><p><b>${c.designer} 디자이너</b>가 상담 완료로 변경했습니다.</p></div><div class="timeline-item"><time>오늘 14:36</time><p>신규 상담 설문이 담당자에게 배정되었습니다.</p></div><div class="timeline-item"><time>오늘 14:32</time><p>고객이 태블릿에서 설문을 제출했습니다.</p></div></div></section>
        <section class="panel"><div class="panel-head"><div><h2 class="panel-title">내부 상담 메모</h2><div class="panel-sub">고객에게 표시되지 않습니다.</div></div></div><textarea style="width:100%;min-height:100px;border:1px solid var(--line);border-radius:10px;padding:12px" placeholder="상담 내용을 기록해 주세요.">손상모 케어 우선 안내. 레이어드 컷 상담 예정.</textarea><div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn small" data-toast="메모가 저장되었습니다.">저장</button></div></section>
      </div>
    </div>`, '고객 상세');
}

function answer(label, values) { return `<div class="answer-group"><label>${label}</label><div class="answer-chips">${values.map(v=>`<span class="answer-chip">${v}</span>`).join('')}</div></div>`; }

function analyticsPage() {
  return shell(`${pageHeader('Insight & Analytics','고객 데이터 분석','기간·지점·디자이너·설문 항목별 경향을 비교합니다.','<button class="btn">↓ 분석 리포트</button>')}
    <div class="filter-bar"><select class="filter"><option>2026.08.01 – 08.07</option></select><select class="filter"><option>전체 지점</option></select><select class="filter"><option>전체 디자이너</option></select><button class="btn primary">적용</button></div>
    <div class="metric-grid">${metric('분석 대상 고객','1,247','♙','선택 기간 순 고객')}${metric('재방문 비율','31.8%','↻','<span class="delta">+3.4%p</span>')}${metric('가장 관심 높은 메뉴','컷','✂','응답 고객의 47.3%')}${metric('주요 유입 경로','네이버','⌕','응답 고객의 34.2%')}</div>
    <div class="dashboard-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">지점별 신규 고객</h2><div class="panel-sub">상위 8개 지점 비교</div></div></div><div class="chart-wrap"><canvas id="branchChart"></canvas></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">관심 메뉴</h2><div class="panel-sub">복수선택 응답 비율</div></div></div><div class="insight-list">${bars([['컷',47],['컬러',38],['펌',34],['모발케어',29],['두피관리',18],['스타일링',12]])}</div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">두피·모발 고민</h2><div class="panel-sub">고객 상담 우선순위</div></div></div><div class="chart-wrap short"><canvas id="concernChart"></canvas></div></section><section class="panel"><div class="panel-head"><div><h2 class="panel-title">원하는 이미지</h2><div class="panel-sub">이번 주 선호 키워드</div></div></div><div class="insight-list">${bars([['자연스러운',52],['맞춤 추천',44],['세련된',37],['어려 보이는',28],['고급스러운',22],['유행하는',16]])}</div></section></div>`, '통계 분석');
}

function bars(items) { return items.map(([name,val])=>`<div class="insight-row"><span class="insight-label">${name}</span><div class="bar"><span style="width:${val}%"></span></div><span class="insight-value">${val}%</span></div>`).join(''); }

function surveyBuilderPage() {
  const qs = [['담당 디자이너','드롭다운'],['고객 기본정보','입력 필드'],['방문 동기','복수 선택'],['개인정보 수집 동의','동의'],['원하는 스타일 사진','단일 선택'],['희망 직급','단일 선택'],['관심 있는 메뉴','복수 선택'],['원하는 이미지','복수 선택'],['시술 포인트','복수 선택'],['두피 고민','복수 선택'],['모발 고민','복수 선택'],['홈케어 구매 이력','복수 선택']];
  return shell(`${pageHeader('Survey Builder','신규 고객 상담 설문','현재 발행 버전 v1.2 · 2026년 8월 1일부터 사용 중','<button class="btn">미리보기</button><button class="btn">임시 저장</button><button class="btn primary" data-toast="새 버전 v1.3 발행 준비가 완료되었습니다.">새 버전 발행</button>')}
    <section class="panel builder-layout"><aside class="builder-left"><h2 class="builder-title">문항 구성 · ${qs.length}개</h2>${qs.map((q,i)=>`<div class="question-item ${i===6?'active':''}"><span class="drag">⠿</span><span class="question-num">${i+1}</span><span class="question-text"><b>${q[0]}</b><span>${q[1]}</span></span></div>`).join('')}<button class="btn" style="width:100%;margin-top:12px" data-toast="새 문항이 추가되었습니다.">＋ 문항 추가</button></aside><main class="builder-center"><div class="preview-frame"><div class="mini-wordmark">idHAIR</div><div class="preview-question"><div class="eyebrow">STEP 3 · STYLE</div><h3>관심 있는 메뉴를 알려주세요.</h3><p>여러 개 선택할 수 있습니다.</p><div class="preview-options"><div class="preview-option">스타일링</div><div class="preview-option selected">✓ 컷</div><div class="preview-option">펌</div><div class="preview-option">컬러</div><div class="preview-option">두피관리</div><div class="preview-option selected">✓ 모발케어</div><div class="preview-option">상담 후 선택</div></div></div></div></main><aside class="builder-right"><h2 class="builder-title">문항 설정</h2><div class="property"><label>문항 제목</label><input value="관심 있는 메뉴를 알려주세요."></div><div class="property"><label>응답 방식</label><select><option>복수 선택</option><option>단일 선택</option></select></div><div class="toggle-row"><span>필수 문항</span><span class="switch on"></span></div><div class="toggle-row"><span>선택 개수 제한</span><span class="switch"></span></div><div class="property"><label>관리자용 데이터 키</label><input value="interested_menu"></div><button class="btn danger" style="width:100%;margin-top:18px">문항 삭제</button></aside></section>`, '설문 관리');
}

function branchesPage() {
  const branches = [['강남점','서울 강남구 강남대로 432',18,412],['청담점','서울 강남구 도산대로 511',14,368],['홍대점','서울 마포구 양화로 160',12,331],['분당점','경기 성남시 분당구 황새울로 325',11,284],['수원점','경기 수원시 팔달구 덕영대로 924',9,246],['잠실점','서울 송파구 올림픽로 240',13,301]];
  return shell(`${pageHeader('Branch Management','지점 관리','전국 102개 지점의 설문 운영 상태와 직원을 관리합니다.','<button class="btn">지점 일괄 등록</button><button class="btn primary" data-toast="새 지점 등록 창을 준비했습니다.">＋ 지점 등록</button>')}<div class="filter-bar"><input class="search" placeholder="지점명 또는 주소 검색"><select class="filter"><option>전체 운영 상태</option><option>운영 중</option><option>비활성</option></select></div><div class="branch-grid">${branches.map((b,i)=>`<article class="branch-card"><div class="branch-head"><div><h2 class="branch-name">idHAIR ${b[0]}</h2><p class="branch-address">${b[1]}</p></div><span class="tag ${i===5?'warning':'success'}">${i===5?'점검 중':'운영 중'}</span></div><div class="branch-stats"><div><label>소속 직원</label><strong>${b[2]}명</strong></div><div><label>이번 달 설문</label><strong>${b[3]}건</strong></div></div><div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn small">상세 관리 →</button></div></article>`).join('')}</div>`, '지점 관리');
}

function staffPage() {
  const staff = [['서윤','강남점','디자이너','활성'],['도윤','강남점','디자이너','활성'],['김지현','강남점','원장','활성'],['민준','청담점','디자이너','활성'],['하린','홍대점','디자이너','활성'],['이지원','본사','슈퍼관리자','활성']];
  return shell(`${pageHeader('People & Access','직원·권한 관리','소속 지점과 역할에 따라 데이터 접근 범위를 제어합니다.','<button class="btn">직원 일괄 등록</button><button class="btn primary" data-toast="직원 초대 링크가 생성되었습니다.">＋ 직원 초대</button>')}<div class="filter-bar"><input class="search" placeholder="이름, 이메일 또는 지점 검색"><select class="filter"><option>전체 역할</option><option>슈퍼관리자</option><option>원장</option><option>디자이너</option></select></div><section class="panel table-panel"><div class="table-scroll"><table class="data-table"><thead><tr><th>직원</th><th>소속 지점</th><th>권한</th><th>최근 접속</th><th>상태</th><th></th></tr></thead><tbody>${staff.map((s,i)=>`<tr><td><div class="customer-cell"><div class="mini-avatar">${s[0].slice(-1)}</div><div><b>${s[0]}</b><div style="color:var(--muted);font-size:10px">user${i+1}@idhair.com</div></div></div></td><td>${s[1]}</td><td><span class="tag ${s[2]==='슈퍼관리자'?'dark':''}">${s[2]}</span></td><td>${i%2?'오늘 12:18':'오늘 14:32'}</td><td><span class="tag success">${s[3]}</span></td><td><button class="btn small">관리</button></td></tr>`).join('')}</tbody></table></div></section>`, '직원·권한');
}

function settingsPage() {
  const settings = [['개인정보 동의 문구','현재 v1.2 · 필수 수집과 마케팅 활용 동의를 분리합니다.','동의 관리'],['개인정보 보유·파기','최종 방문일로부터 3년 보관 후 파기 대상으로 전환합니다.','정책 설정'],['자동 백업','매일 03:00 암호화 백업 · 최근 성공 오늘 03:02','백업 내역'],['엑셀 내보내기','본사와 원장에게만 개인정보 포함 파일 생성을 허용합니다.','권한 설정'],['감사 로그','개인정보 조회·다운로드·수정·삭제 기록을 확인합니다.','로그 보기'],['보안 및 로그인','본사 관리자 2단계 인증과 세션 만료 시간을 설정합니다.','보안 설정']];
  return shell(`${pageHeader('System & Privacy','운영 설정','개인정보, 백업, 내보내기와 보안 정책을 관리합니다.')}<section class="panel settings-list">${settings.map(s=>`<div class="setting-row"><div class="setting-copy"><b>${s[0]}</b><span>${s[1]}</span></div><button class="btn small" data-toast="${s[0]} 화면을 준비했습니다.">${s[2]} →</button></div>`).join('')}</section><section class="panel" style="margin-top:16px"><div class="panel-head"><div><h2 class="panel-title">시스템 상태</h2><div class="panel-sub">운영 환경의 주요 서비스 상태</div></div><span class="tag success">모든 시스템 정상</span></div><div class="info-grid"><div class="info-item"><label>데이터베이스</label><strong>정상 · 32ms</strong></div><div class="info-item"><label>최근 백업</label><strong>오늘 03:02 성공</strong></div><div class="info-item"><label>저장공간</label><strong>18.4 GB / 100 GB</strong></div><div class="info-item"><label>설문 API</label><strong>99.99% 정상</strong></div></div></section>`, '운영 설정');
}

const surveySteps = [
  ['기본 정보','고객님의 기본 정보를 입력해 주세요.','안전한 상담과 고객 식별에 필요한 정보입니다.'],
  ['방문 경로','아이디헤어를 어떻게 알게 되셨나요?','해당되는 항목을 모두 선택해 주세요.'],
  ['스타일 상담','원하는 스타일과 관심 메뉴를 알려주세요.','답변을 바탕으로 디자이너가 더 정확하게 상담해 드립니다.'],
  ['두피·모발','현재 가장 고민되는 부분은 무엇인가요?','해당되는 항목을 모두 선택해 주세요.'],
  ['동의 및 확인','입력하신 내용과 개인정보 동의를 확인해 주세요.','필수 동의 후 설문을 제출할 수 있습니다.']
];

function surveyPage() {
  const step = state.surveyStep;
  const s = state.survey;
  const aside = surveySteps.map((x,i)=>`<div class="step-line ${i===step?'active':i<step?'done':''}"><span class="step-dot">${i<step?'✓':i+1}</span><span>${x[0]}</span></div>`).join('');
  return `<div class="survey-shell"><div class="survey-stage"><aside class="survey-aside"><div class="wordmark">idHAIR<small>New Customer Survey</small></div><div class="survey-intro"><span>Welcome to idHAIR</span><h1>당신에게 꼭 맞는<br>스타일을 찾아드릴게요.</h1><p>약 3분 정도 소요됩니다.<br>답변은 상담 목적으로만 사용됩니다.</p></div><div class="step-list">${aside}</div><div class="privacy-note">🔒 입력하신 정보는 안전하게 보호되며<br>허용된 담당자만 확인할 수 있습니다.</div></aside><main class="survey-main"><header class="survey-top"><span>강남점 · 신규 고객 상담</span><div style="display:flex;align-items:center;gap:12px"><div class="progress"><span style="width:${(step+1)*20}%"></span></div><span>${step+1} / 5</span></div></header><section class="survey-body"><div class="eyebrow">STEP ${step+1} · ${surveySteps[step][0]}</div><h2>${surveySteps[step][1]}</h2><p>${surveySteps[step][2]}</p>${surveyStepContent(step,s)}</section><footer class="survey-actions"><button class="btn" data-survey-prev ${step===0?'disabled':''}>이전</button><small>필수 항목을 확인해 주세요.</small><button class="btn primary" data-survey-next>${step===4?'설문 제출':'다음'}</button></footer></main></div></div>`;
}

function surveyStepContent(step,s) {
  if(step===0) return `<div class="form-grid"><div class="field full"><label>담당 디자이너 <em>*</em></label><select data-input="designer"><option>서윤 디자이너</option><option>도윤 디자이너</option><option>상담 후 배정</option></select></div><div class="field"><label>성함 <em>*</em></label><input data-input="name" value="${s.name}" placeholder="성함을 입력해 주세요"></div><div class="field"><label>성별</label><select data-input="gender"><option>여성</option><option>남성</option><option>응답하지 않음</option></select></div><div class="field"><label>생년월일</label><input type="date" data-input="birth" value="${s.birth}"></div><div class="field"><label>연락처 <em>*</em></label><input data-input="phone" value="${s.phone}" inputmode="tel"></div><div class="field full"><label>주소</label><input data-input="address" value="${s.address}" placeholder="주소를 입력해 주세요"><div class="field-hint">주소는 선택 항목이며 상담 및 고객 식별 목적으로만 사용됩니다.</div></div></div>`;
  if(step===1) return `<div class="choice-grid">${choices('visit',['거주지 근처','블로그/인스타그램','네이버 검색','구글 검색','지인 소개','기타'],s.visit)}</div>${s.visit.includes('지인 소개')?'<div class="field" style="margin-top:20px"><label>소개자 이름</label><input data-input="introducer" value="'+s.introducer+'" placeholder="소개해 주신 분의 성함"></div>':''}`;
  if(step===2) return `<div class="question-block"><h3>원하는 스타일 사진</h3><p>한 가지를 선택해 주세요.</p><div class="choice-grid">${choices('stylePhoto',['있음','없음','상담 디자이너가 추천'],[s.stylePhoto],true)}</div></div><div class="question-block"><h3>시술 담당 희망 직급</h3><p>직급별 시술 금액이 다를 수 있습니다.</p><div class="choice-grid">${choices('rank',['실장','선임수석실장','부원장','원장','관계없음'],[s.rank],true)}</div></div><div class="question-block"><h3>관심 있는 메뉴</h3><p>여러 개 선택할 수 있습니다.</p><div class="choice-grid">${choices('menus',['스타일링','컷','펌','컬러','두피관리','모발케어','상담 후 선택'],s.menus)}</div></div><div class="question-block"><h3>원하는 이미지</h3><p>최대 2개까지 선택해 주세요.</p><div class="choice-grid">${choices('images',['고급스러운','자연스러운','유니크한','어려 보이는','세련된','유행하는','나에게 맞춤 추천'],s.images)}</div></div>`;
  if(step===3) return `<div class="question-block"><h3>가장 신경 써야 할 포인트</h3><div class="choice-grid">${choices('points',['디자인컷','모발손상','볼륨&앞머리','손질이 편한','신속진행','컬의 탄력','예민한 두피','꼼꼼한 시술'],s.points)}</div></div><div class="question-block"><h3>두피 고민</h3><div class="choice-grid">${choices('scalp',['가려움','기름진','건조한','따가운','뾰루지','탈모','잘 모르겠음'],s.scalp)}</div></div><div class="question-block"><h3>모발 고민</h3><div class="choice-grid">${choices('hair',['얇아진 모발','에이징 모발','부스스하고 건조한 모발','볼륨이 없는','부분적 곱슬모발','이전 시술 후 손상된 모발'],s.hair)}</div></div><div class="question-block"><h3>홈케어 구매 이력</h3><div class="choice-grid">${choices('homecare',['전문가의 추천제품','SNS 후기 인기제품','홈쇼핑 대량구매','오프라인 구매','관심없음 (잘모름)'],s.homecare)}</div></div>`;
  return `<div class="review-card"><label>고객 정보</label><strong>${s.name} · ${s.gender} · ${s.phone}</strong></div><div class="review-card"><label>담당 / 방문 경로</label><strong>${s.designer} · ${s.visit.join(', ')}</strong></div><div class="review-card"><label>관심 메뉴</label><strong>${s.menus.join(', ')}</strong></div><div class="review-card"><label>두피·모발 고민</label><strong>${[...s.scalp,...s.hair].join(', ')}</strong></div><div style="height:12px"></div><div class="consent-card"><label class="consent-head"><input type="checkbox" data-consent="required" ${s.requiredConsent?'checked':''}><span><b>[필수] 개인정보 수집·이용에 동의합니다.</b><span>고객 식별 및 상담 서비스 제공을 위해 필요합니다.</span></span></label><div class="consent-copy">수집 항목: 성명, 생년월일, 연락처, 주소 · 수집 목적: 개인 식별 및 상담 서비스 제공 · 보유기간: 정책에 따른 보유기간 만료 또는 삭제 요청 시까지</div></div><div class="consent-card"><label class="consent-head"><input type="checkbox" data-consent="marketing" ${s.marketingConsent?'checked':''}><span><b>[선택] 이벤트·할인 안내 활용에 동의합니다.</b><span>동의하지 않아도 상담 서비스를 이용할 수 있습니다.</span></span></label></div>`;
}

function choices(key, values, selected, single=false) { return values.map(v=>`<div class="choice-card ${selected.includes(v)?'selected':''}" data-choice="${key}" data-value="${v}" data-single="${single}"><span class="choice-check">${selected.includes(v)?'✓':''}</span><span>${v}</span></div>`).join(''); }

function completedSurvey() {
  return `<div class="survey-shell"><div class="survey-stage" style="grid-template-columns:1fr"><main class="survey-main"><header class="survey-top"><div class="wordmark" style="padding:0;font-size:22px">idHAIR</div><span>강남점 · 제출 완료</span></header><section class="survey-body complete-state"><div class="complete-icon">✓</div><h2>설문이 제출되었습니다.</h2><p>작성해 주셔서 감사합니다. 담당 디자이너가 답변을 확인하고 고객님께 꼭 맞는 스타일을 상담해 드릴게요.</p><button class="btn primary" data-survey-restart>새 설문 시작</button></section></main></div></div>`;
}

function meetingBar() {
  return `<header class="meeting-bar"><div class="meeting-brand"><span class="live-dot"></span><b>idHAIR SYSTEM PROTOTYPE</b><span>· 미팅용 인터랙티브 데모</span></div><div class="view-switch"><button class="${state.mode==='survey'?'active':''}" data-mode="survey">고객 설문</button><button class="${state.mode==='admin'?'active':''}" data-mode="admin">관리자</button></div><button class="reset-button" data-reset>데모 초기화</button></header>`;
}

function render() {
  let page;
  if(state.mode==='survey') page = state.surveyStep===5 ? completedSurvey() : surveyPage();
  else if(state.selectedCustomer) page = customerDetailPage(state.selectedCustomer);
  else page = ({dashboard:dashboardPage,customers:customersPage,analytics:analyticsPage,survey:surveyBuilderPage,branches:branchesPage,staff:staffPage,settings:settingsPage}[state.page] || dashboardPage)();
  $('#app').innerHTML = meetingBar() + page;
  bindEvents();
  requestAnimationFrame(initCharts);
}

function bindEvents() {
  $$('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode; state.selectedCustomer=null; render();});
  $$('[data-page]').forEach(b=>b.onclick=()=>{state.page=b.dataset.page; state.selectedCustomer=null; render();});
  $('[data-menu]')?.addEventListener('click',()=>$('.admin-shell').classList.toggle('menu-open'));
  $$('[data-customer]').forEach(r=>r.onclick=()=>{state.selectedCustomer=Number(r.dataset.customer); render();});
  $('[data-back-customers]')?.addEventListener('click',()=>{state.selectedCustomer=null;state.page='customers';render();});
  $$('[data-new-survey]').forEach(b=>b.onclick=()=>{state.mode='survey';state.surveyStep=0;render();});
  $$('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
  $('[data-reset]')?.addEventListener('click',()=>{state.mode='admin';state.page='dashboard';state.surveyStep=0;state.selectedCustomer=null;render();toast('데모가 초기화되었습니다.');});
  $('[data-survey-prev]')?.addEventListener('click',()=>{if(state.surveyStep>0){state.surveyStep--;render();window.scrollTo(0,0);}});
  $('[data-survey-next]')?.addEventListener('click',()=>{
    if(state.surveyStep===0 && (!state.survey.name.trim() || !state.survey.phone.trim())) return toast('성함과 연락처를 입력해 주세요.');
    if(state.surveyStep===4 && !state.survey.requiredConsent) return toast('필수 개인정보 수집·이용 동의가 필요합니다.');
    state.surveyStep++;render();window.scrollTo(0,0);
  });
  $('[data-survey-restart]')?.addEventListener('click',()=>{state.surveyStep=0;render();});
  $$('[data-input]').forEach(input=>input.oninput=()=>state.survey[input.dataset.input]=input.value);
  $$('[data-choice]').forEach(card=>card.onclick=()=>{
    const key=card.dataset.choice, value=card.dataset.value, single=card.dataset.single==='true';
    if(single) state.survey[key]=value;
    else {
      const arr=state.survey[key]; const i=arr.indexOf(value);
      if(i>=0) arr.splice(i,1); else {
        if(key==='images' && arr.length>=2) return toast('원하는 이미지는 최대 2개까지 선택할 수 있습니다.');
        if((key==='scalp' || key==='homecare') && (value.includes('모르') || value.includes('관심없음'))) arr.splice(0,arr.length);
        else { const exclusive=arr.findIndex(v=>v.includes('모르') || v.includes('관심없음')); if(exclusive>=0) arr.splice(exclusive,1); }
        arr.push(value);
      }
    }
    render();
  });
  $$('[data-consent]').forEach(c=>c.onchange=()=>state.survey[c.dataset.consent==='required'?'requiredConsent':'marketingConsent']=c.checked);
  $$('.filter').forEach(select=>select.onchange=()=>toast('선택한 조건으로 화면을 업데이트했습니다.'));
  $$('.search').forEach(input=>input.oninput=()=>{
    const query=input.value.trim().toLowerCase();
    $$('.data-table tbody tr, .branch-card').forEach(item=>{
      item.style.display=!query || item.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });
  $$('.btn').forEach(button=>{
    const hasDedicatedAction=button.dataset.page || button.dataset.newSurvey !== undefined || button.dataset.surveyNext !== undefined || button.dataset.surveyPrev !== undefined || button.dataset.surveyRestart !== undefined || button.dataset.backCustomers !== undefined || button.dataset.toast;
    if(!hasDedicatedAction && !button.disabled) button.onclick=()=>toast('미팅용 데모 기능입니다. 실제 구축 시 데이터와 연동됩니다.');
  });
  $$('.icon-button:not([data-menu])').forEach(button=>button.onclick=()=>toast('빠른 메뉴를 확인했습니다.'));
}

function initCharts() {
  if(typeof Chart==='undefined') return;
  Chart.defaults.font.family='Inter, Noto Sans KR, sans-serif'; Chart.defaults.color='#777';
  const grid={color:'#eceae6',drawBorder:false};
  if($('#trendChart')) new Chart($('#trendChart'),{type:'line',data:{labels:['2월','3월','4월','5월','6월','7월','8월'],datasets:[{data:[1920,2140,2080,2370,2510,2526,2840],borderColor:'#c9151e',backgroundColor:'rgba(201,21,30,.07)',fill:true,tension:.38,pointRadius:3,pointBackgroundColor:'#c9151e'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid,border:{display:false}}}}});
  if($('#visitChart')) new Chart($('#visitChart'),{type:'doughnut',data:{labels:['네이버','인스타그램','거주지 근처','지인 소개','기타'],datasets:[{data:[34,26,19,14,7],backgroundColor:['#c9151e','#151515','#666','#aaa','#e2e0db'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'66%',plugins:{legend:{position:'bottom',labels:{boxWidth:8,usePointStyle:true,padding:14,font:{size:10}}}}}});
  if($('#branchChart')) new Chart($('#branchChart'),{type:'bar',data:{labels:['강남','청담','홍대','잠실','분당','수원','목동','일산'],datasets:[{data:[412,368,331,301,284,246,221,198],backgroundColor:'#c9151e',borderRadius:5,barThickness:22}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid,border:{display:false}}}}});
  if($('#concernChart')) new Chart($('#concernChart'),{type:'bar',data:{labels:['손상모','건조함','볼륨 없음','곱슬','얇아짐','두피 가려움'],datasets:[{data:[54,46,38,31,26,21],backgroundColor:['#c9151e','#d33b43','#df656b','#e99195','#efb6b9','#f4d6d8'],borderRadius:5}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid,border:{display:false}},y:{grid:{display:false},border:{display:false}}}}});
}

render();
