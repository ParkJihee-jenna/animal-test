# 인수인계서 — animal-test (2026-10-01)

## 한 줄 요약
「위장 UI의 선한 활용 방안」 PDF의 사례 4를 MVP로 구현했다. "나와 닮은 동물 테스트"로 위장한 PHQ-9 우울 선별 PWA이고, GitHub Pages에 배포까지 끝났다.

## 링크
- 사이트: https://parkjihee-jenna.github.io/animal-test/
- 저장소: https://github.com/ParkJihee-jenna/animal-test (public, `main`)
- 로컬 폴더: `/Users/jenna/Desktop/ALL/선한 영향력`

## 지금까지 결정된 것
- 팀 채팅(하민 님)에서 "게임 말고 다른 쪽"이 좋겠다는 의견이 나왔다. 그래서 사례 6(엑셀 학습 게임)을 제외하고 지희 님이 사례 4를 골랐다.
- DESIGN.md를 먼저 쓰고 구현했다. 문항은 토스 테스트 구조, 결과는 Headspace 톤을 참고했다.
- 범위는 PHQ-9 하나다. 응답은 어디에도 저장하지 않는다.
- 문항 원문을 바꾸지 않았기 때문에, 질문 화면을 누가 직접 보면 위장이 드러난다. 이 한계는 감수하기로 했다.

## 파일 구조
| 경로 | 내용 |
|---|---|
| `docs/` | 배포되는 사이트 전체 (Pages 소스) |
| `docs/app.js` | 문항 `Q`, 결과 `BANDS`, 기관 `RES`, 화면 함수 |
| `DESIGN.md` | 디자인 토큰과 원칙, Voice/Forbidden |
| `spec/PRD.md`, `spec/PRD.docx` | 재현용 PRD |
| `.claude/launch.json` | 로컬 미리보기 설정 (gitignore 대상) |

## 작업 방법
- 로컬 실행: `python3 -m http.server 5173 -d docs`
- 배포: `git push`만 하면 1~2분 뒤 반영된다.
- **수정할 때마다 `docs/sw.js`의 `C='v1'` 값을 올려야 한다.** 올리지 않으면 기존 방문자에게 예전 화면이 계속 보인다.
- Actions 배포는 쓸 수 없다. `gh` 토큰에 workflow scope가 없기 때문이다(`gh auth refresh -s workflow`로 추가할 수 있다).

## 남은 일 (우선순위 순)
1. [ ] PHQ-9 **공식 한국어판** 문구와 대조해서 `Q` 배열 교체
2. [ ] 기관 번호와 URL 공식 사이트에서 검증(1577-0199, 109, 1388, mentalhealth.go.kr, cyber1388.kr)
3. [ ] `sw.js`에 이전 캐시를 삭제하는 activate 로직 추가
4. [ ] 실제 상담기관이나 전문가에게 보여주고 피드백 받기
5. [ ] 2차 범위 검토: 도박(1336)·음주 척도
6. [ ] 서비스명 확정("숨결"은 가칭)

## 주의
- 사용자 수, 효과 같은 수치는 아직 없다. 지어내지 말 것.
- 서버, 분석 스크립트, localStorage를 추가하지 말 것(핵심 원칙).
- 결과 문구에 "진단", "환자", "정상/비정상"을 쓰지 말 것(DESIGN.md Forbidden).
