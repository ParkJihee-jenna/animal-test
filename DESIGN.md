---
name: 숨결 (가칭) — 동물 테스트로 위장한 정신건강 선별 도구
version: alpha
description: 겉은 가벼운 "나와 닮은 동물 테스트", 속은 PHQ-9 등 공인 척도 기반 선별 + 상담기관 연결. 데이터는 서버에 저장하지 않는다.
colors:
  # 위장 레이어 (테스트 외관) — 흔한 심리테스트처럼 밝고 무해하게
  cover-bg: "#FFF8EE"
  cover-primary: "#FF8A3D"
  cover-accent: "#FFD66B"
  cover-ink: "#2B2118"
  # 진짜 레이어 (결과·연결) — 차분하고 따뜻하게, 경고색 최소화
  care-bg: "#F6F7F4"
  care-primary: "#3E7C6B"
  care-soft: "#DCEBE4"
  care-ink: "#1F2A27"
  care-muted: "#6B7773"
  crisis: "#C2543A"        # 위기 문항 응답 시에만 사용. 빨강 대신 차분한 테라코타
  surface: "#FFFFFF"
typography:
  display: { fontFamily: "Pretendard", fontSize: 28px, fontWeight: 800, lineHeight: 1.3, letterSpacing: -0.02em }
  headline: { fontFamily: "Pretendard", fontSize: 22px, fontWeight: 700, lineHeight: 1.35 }
  title: { fontFamily: "Pretendard", fontSize: 18px, fontWeight: 600, lineHeight: 1.4 }
  body: { fontFamily: "Pretendard", fontSize: 16px, fontWeight: 400, lineHeight: 1.6 }
  label: { fontFamily: "Pretendard", fontSize: 14px, fontWeight: 600, lineHeight: 1.4 }
  caption: { fontFamily: "Pretendard", fontSize: 13px, fontWeight: 400, lineHeight: 1.5 }
rounded:
  sm: 10px
  md: 16px
  lg: 24px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  choice-button: { backgroundColor: surface, textColor: cover-ink, typography: title, rounded: md, padding: "18px 20px", minHeight: 56px }
  primary-button: { backgroundColor: cover-primary, textColor: surface, typography: title, rounded: pill, padding: "16px 24px" }
  care-button: { backgroundColor: care-primary, textColor: surface, typography: title, rounded: pill, padding: "16px 24px" }
  resource-card: { backgroundColor: surface, textColor: care-ink, rounded: lg, padding: 20px }
  crisis-banner: { backgroundColor: crisis, textColor: surface, rounded: md, padding: 16px }
  progress-bar: { height: 6px, rounded: pill, backgroundColor: cover-accent }
---

## Overview
옆 사람이 화면을 봐도 "심심해서 하는 동물 테스트"로 보여야 한다. 하지만 문항은 PHQ-9(우울) 같은 공인 척도를 그대로 쓰고, 결과 화면에서 동물 캐릭터와 함께 조용히 점수 구간과 상담기관을 알려준다.
- **숨기는 대상**: 누구도 속이지 않는다. 낙인(“정신과 테스트 하네?”)에 대한 부담만 덜어준다.
- **감정 목표**: 위장 레이어는 가볍고 경쾌하게. 진짜 레이어는 "판단받지 않는다"는 느낌으로 차분하고 따뜻하게.

### 레퍼런스 비교 (디자인 언어만 가져오고 브랜드 자산은 쓰지 않는다)
| 레퍼런스 | 가져올 것 | 맞는 이유 |
|---|---|---|
| 토스 테스트/이벤트 화면 | 한 화면 한 질문, 큰 선택 버튼, 짧은 말투 | 한국 사용자에게 "평범한 테스트"로 가장 자연스럽게 읽힌다. 위장이 성립하려면 익숙해야 한다 |
| Headspace | 둥근 형태, 낮은 채도의 따뜻한 색, 다정한 말투 | 결과 화면에서 불안을 키우지 않는다. 우울 선별 결과를 받는 사람에게 맞는다 |
| 16Personalities | 결과 = 캐릭터 + 설명 구조 | 동물 결과 카드가 진짜 결과를 감싸는 틀이 된다 |

→ 추천 조합: **문항은 토스식 구조, 결과는 Headspace식 톤.**

## Colors
- `cover-*`: 따뜻한 오렌지/옐로. 흔한 심리테스트의 색이라 튀지 않는다.
- `care-*`: 세이지 그린. 진정·회복의 느낌이고, 병원 느낌의 파랑은 피한다.
- `crisis`: 9번 문항(자해 생각)에 1점 이상 답했을 때만 쓴다. 쨍한 빨강은 공포를 주므로 테라코타를 쓴다.

## Typography
Pretendard 하나만 쓴다. 문항은 `title`(18px)로 써서 한 번에 읽히게 한다. 결과 설명은 `body` 16px에 행간 1.6을 준다.

## Layout & Spacing
모바일 우선이고 최대 폭은 480px, 좌우 여백은 20px이다. 한 화면에 질문 하나만 둔다. 선택 버튼 사이는 `sm` 8px로 좁혀 목록처럼 보이게 하고, 섹션 사이는 `xl` 40px로 띄운다.

## Elevation & Depth
그림자는 거의 쓰지 않고 톤 차이로 위계를 준다. 카드에는 `0 1px 3px rgba(0,0,0,.06)` 한 단계만 쓴다.

## Shapes
전체적으로 둥글게 간다(md 16, lg 24). CTA는 pill 모양이다. 날카로운 모서리는 쓰지 않는다.

## Components
- **choice-button**: 선택하면 테두리가 `cover-primary` 2px으로 바뀌고 0.25초 뒤 다음 문항으로 넘어간다.
- **빠른 닫기(✕)**: 모든 화면 오른쪽 위에 둔다. 누르거나 Esc를 누르면 `location.replace()`로 위장 첫 화면(혹은 무해한 페이지)으로 간다.
- **resource-card**: 기관명, 한 줄 설명, [전화] [웹사이트] 버튼으로 구성한다.
- **crisis-banner**: 결과 화면 맨 위에 고정한다. 누르면 바로 전화가 걸린다.

## Do's and Don'ts
- Do: 문항은 공인 척도 원문을 그대로 쓴다(표현을 바꾸지 않는다). 출처도 표기한다.
- Do: "진단이 아닌 선별 도구"라는 문구를 결과 화면에 항상 보이게 둔다.
- Do: 응답은 메모리에서만 처리한다. 서버 전송, localStorage 저장, 분석 스크립트는 넣지 않는다.
- Don't: 결과에 "우울증입니다" 같은 단정형 표현을 쓰지 않는다.
- Don't: 위장 화면에 정신건강 관련 단어를 노출하지 않는다(탭 제목 포함).

## Voice
친구가 조용히 말해주는 톤으로 쓴다. 짧고 판단하지 않는다.
- 예: "요즘 마음이 좀 무거웠을 수 있어요. 이야기해볼 곳이 있어요."

## Forbidden
- "진단 결과", "환자", "정상/비정상"
- "당신은 우울증입니다"
- "Submit", "Error"
- 과장된 위로("다 잘 될 거예요!")
