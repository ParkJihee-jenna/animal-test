// 응답은 이 변수(메모리)에만 있다. 서버 전송·localStorage 저장 없음.
const $ = s => document.querySelector(s), app = $('#app');

// PHQ-9 한국어판 문항 (Kroenke, Spitzer & Williams, 2001; Pfizer 무료 사용 허가)
const Q = [
  '일 또는 여가 활동을 하는 데 흥미나 즐거움을 느끼지 못함',
  '기분이 가라앉거나, 우울하거나, 희망이 없다고 느낌',
  '잠이 들거나 계속 잠을 자는 것이 어려움, 또는 잠을 너무 많이 잠',
  '피곤하다고 느끼거나 기운이 거의 없음',
  '입맛이 없거나 과식을 함',
  '자신을 부정적으로 봄 — 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시켰다고 느낌',
  '신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움',
  '다른 사람들이 알아챌 정도로 너무 느리게 움직이거나 말을 함. 또는 반대로 평소보다 많이 움직여서 안절부절못하거나 들떠 있음',
  '자신이 죽는 것이 더 낫다고 생각하거나, 어떤 식으로든 자신을 해칠 것이라고 생각함'
];
const OPT = ['전혀 없었다', '며칠 동안 있었다', '일주일 이상 있었다', '거의 매일 있었다'];
const ICON = ['🦦','🐱','🐼','🦥','🐢','🦔','🐧','🐨','🦊'];

// 점수 구간 → 동물 결과 (구간 기준은 PHQ-9 표준 절단점)
const BANDS = [
  { max: 4,  e:'🦦', name:'햇살 쬐는 수달', band:'최소 수준', text:'요즘 마음 상태가 비교적 안정적인 편이에요. 지금처럼 나를 챙기는 시간을 이어가 보세요.' },
  { max: 9,  e:'🐱', name:'창가의 고양이', band:'가벼운 수준', text:'조금 지치는 날들이 있었을 수 있어요. 잠, 식사, 산책처럼 작은 것부터 돌봐주세요. 2주 뒤에 한 번 더 확인해보는 것도 좋아요.' },
  { max: 14, e:'🐼', name:'쉬고 싶은 판다', band:'중간 수준', text:'요즘 마음이 좀 무거웠을 수 있어요. 혼자 버티기보다 이야기 나눌 곳을 찾아보면 도움이 돼요.' },
  { max: 19, e:'🦥', name:'천천히 가는 나무늘보', band:'중간 이상 수준', text:'꽤 오래 힘든 시간을 보내고 있는 것 같아요. 전문가와 한 번 이야기해보길 권해요. 아래 기관은 무료로 상담받을 수 있어요.' },
  { max: 27, e:'🦔', name:'웅크린 고슴도치', band:'높은 수준', text:'지금 많이 버거운 상태일 수 있어요. 가능한 한 빨리 전문가와 이야기해보세요. 당신이 도움을 요청하는 건 당연한 일이에요.' }
];

// ⚠️ 배포 전 공식 사이트에서 번호·링크 재확인 필요
const RES = [
  { n:'정신건강위기상담 1577-0199', d:'24시간 정신건강 상담. 가까운 정신건강복지센터로 연결돼요.', tel:'15770199', url:'https://www.mentalhealth.go.kr' },
  { n:'자살예방 상담전화 109', d:'24시간, 누구나 무료로 이야기할 수 있어요.', tel:'109' },
  { n:'청소년 상담 1388', d:'청소년이라면 전화·문자·카카오톡으로 상담받을 수 있어요.', tel:'1388', url:'https://www.cyber1388.kr' },
  { n:'국가정신건강정보포털', d:'가까운 정신건강복지센터 찾기, 마음 건강 정보.', url:'https://www.mentalhealth.go.kr' }
];

let ans = [], i = 0;

// 빠른 탈출: 기록에 남지 않게 replace
const escape = () => { ans = []; location.replace('https://www.google.com/search?q=%EC%98%A4%EB%8A%98+%EB%82%A0%EC%94%A8'); };
$('#exit').onclick = escape;
addEventListener('keydown', e => e.key === 'Escape' && escape());

function intro() {
  document.body.className = ''; ans = []; i = 0;
  app.innerHTML = `
    <div class="hero">🦦🐱🐼</div>
    <h1>나와 닮은 동물은?</h1>
    <p class="sub">최근 2주를 떠올리며 9개 질문에 답해보세요.<br>1분이면 끝나요.</p>
    <button class="btn" id="go">테스트 시작하기</button>`;
  $('#go').onclick = question;
}

function question() {
  app.innerHTML = `
    <div class="progress"><i style="width:${i / Q.length * 100}%"></i></div>
    <div class="meta"><span>${ICON[i]} Q${i + 1}</span><span>${i + 1} / ${Q.length}</span></div>
    <p class="lead">지난 2주 동안 얼마나 자주 있었나요?</p>
    <p class="q">${Q[i]}</p>
    <div class="choices">${OPT.map((o, v) => `<button class="choice${ans[i] === v ? ' on' : ''}" data-v="${v}">${o}</button>`).join('')}</div>
    ${i ? '<button class="back" id="back">← 이전 질문</button>' : ''}`;
  app.querySelectorAll('.choice').forEach(b => b.onclick = () => {
    b.classList.add('on'); ans[i] = +b.dataset.v;
    setTimeout(() => (++i < Q.length ? question() : result()), 250);
  });
  if (i) $('#back').onclick = () => { i--; question(); };
}

function result() {
  document.body.className = 'care'; scrollTo(0, 0);
  const score = ans.reduce((a, b) => a + b, 0);
  const r = BANDS.find(b => score <= b.max);
  const crisis = ans[8] >= 1;
  const res = RES.map(x => `
    <div class="card res"><h3>${x.n}</h3><p>${x.d}</p><div class="row">
      ${x.tel ? `<a class="call" href="tel:${x.tel}">전화하기</a>` : ''}
      ${x.url ? `<a href="${x.url}" target="_blank" rel="noopener noreferrer">웹사이트</a>` : ''}
    </div></div>`).join('');
  app.innerHTML = `
    ${crisis ? `<a class="crisis" href="tel:109"><b>지금 바로 이야기할 사람이 있어요</b><br>자살예방 상담전화 109 · 24시간 무료 · 눌러서 전화하기</a>` : ''}
    <div class="card animal">
      <div class="e">${r.e}</div>
      <h2>${r.name}</h2>
      <span class="band">마음 건강 ${r.band} · ${score}/27</span>
      <p class="body">${r.text}</p>
    </div>
    <p class="muted" style="margin-top:12px">이 결과는 진단이 아니라 PHQ-9 선별 도구 결과예요. 정확한 판단은 전문가와 함께해요. 응답은 어디에도 저장되지 않아요.</p>
    ${score >= 5 || crisis ? `<section><h2>이야기해볼 곳이 있어요</h2>${res}</section>` : `<section><h2>필요할 때 기억해두세요</h2>${res}</section>`}
    <button class="btn" id="again">처음으로</button>`;
  $('#again').onclick = intro;
}

intro();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
