# 가계부

개인 수입/지출을 관리하는 Next.js 웹 애플리케이션입니다.

## 라이브 데모

**https://gagyebu-vert.vercel.app**

## 주요 기능

- **수입/지출 내역 추가** — 날짜, 구분, 항목명, 카테고리, 금액 입력 (Enter 키 지원)
- **요약 카드** — 총 수입 / 총 지출 / 잔액 실시간 표시
- **카테고리별 지출 차트** — 도넛 차트로 지출 비율 시각화
- **월별 수입/지출 차트** — 최근 6개월 막대 차트 비교
- **거래 내역 테이블** — 수입/지출 필터링 및 삭제
- **데이터 저장** — localStorage 사용으로 브라우저를 닫아도 유지

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 차트 | Chart.js + react-chartjs-2 |
| 배포 | Vercel |
| 소스 관리 | GitHub |

## 프로젝트 구조

```
gagyebu/
├── app/
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지 (상태 관리)
│   └── globals.css      # 전역 스타일
├── components/
│   ├── SummaryCards.tsx # 수입/지출/잔액 요약 카드
│   ├── EntryForm.tsx    # 내역 입력 폼
│   ├── EntryTable.tsx   # 거래 내역 테이블
│   ├── DonutChart.tsx   # 카테고리별 지출 도넛 차트
│   └── BarChart.tsx     # 월별 수입/지출 막대 차트
├── types/
│   └── index.ts         # 타입 정의 및 공통 상수
├── deploy.ps1           # 배포 자동화 스크립트
└── README.md            # 프로젝트 문서 (현재 파일)
```

## 카테고리

**지출:** 식비 / 카페·음료 / 교통 / 쇼핑 / 의료·건강 / 문화·여가 / 통신 / 주거·관리비 / 기타

**수입:** 월급 / 부수입 / 용돈 / 투자수익 / 기타

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 배포

```powershell
# 커밋 메시지 없이 (자동 날짜)
.\deploy.ps1

# 커밋 메시지 직접 입력
.\deploy.ps1 "feat: 새로운 기능 추가"
```

Git 커밋 → GitHub Push → Vercel 배포까지 자동으로 처리됩니다.

---

## 작업 이력

### 2026-04-13

#### 1. 가계부 HTML 페이지 제작
- **문의:** 가계부 웹페이지 간단하게 만들어줘
- **작업 내용:**
  - 단일 HTML 파일(`가계부.html`)로 가계부 구현
  - 수입/지출 내역 추가, 요약 카드, 거래 내역 테이블 기능 포함
  - localStorage로 데이터 저장

#### 2. 차트 기능 추가
- **문의:** 내가 사용한 금액에 대해서 대충 작성해주고 그거에 대한 차트도 표현해줘
- **작업 내용:**
  - 카테고리 선택 필드 추가 (지출/수입 구분별 카테고리 자동 변경)
  - Chart.js 기반 도넛 차트 추가 (카테고리별 지출 비율)
  - Chart.js 기반 막대 차트 추가 (월별 수입/지출 비교, 최근 6개월)

#### 3. Next.js로 전환
- **문의:** NEXTJS를 통해서 개발해줘
- **작업 내용:**
  - Next.js 16 + TypeScript + Tailwind CSS + App Router 구조로 재개발
  - 컴포넌트 분리: SummaryCards / EntryForm / EntryTable / DonutChart / BarChart
  - 공통 타입/상수를 `types/index.ts`로 분리
  - Node.js가 설치되어 있지 않아 모든 파일을 직접 생성 후 설치 안내

#### 4. 서버 실행 환경 세팅
- **문의:** node.js 설치했는데? / 웹서버 켜줘 / 서버 꺼줘
- **작업 내용:**
  - Node.js PATH 문제 해결 (`C:\Program Files\nodejs` 직접 지정)
  - Next.js 버전을 16.2.3(최신)으로 업그레이드 및 보안 취약점 해결
  - 개발 서버 실행/종료 명령어 정리

#### 5. GitHub + Vercel 배포
- **문의:** 깃허브랑 버셀로 배포하고 싶어 / 너가 직접 설치해서 진행해줘
- **작업 내용:**
  - `winget`으로 GitHub CLI 설치
  - `gh auth login` 브라우저 인증으로 GitHub 로그인
  - `gh repo create` 로 퍼블릭 레포 생성 및 Push → https://github.com/vouvhe/gagyebu
  - npm으로 Vercel CLI 설치
  - `vercel login` 브라우저 인증으로 Vercel 로그인
  - `vercel --prod --yes` 로 프로덕션 배포 → https://gagyebu-vert.vercel.app

#### 6. 배포 자동화 스크립트
- **문의:** 재배포도 너가 알아서 해주면 좋겠어
- **작업 내용:**
  - `deploy.ps1` 스크립트 생성
  - Git 커밋 + GitHub Push + Vercel 배포를 한 번에 처리
  - `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 환경변수 설정으로 안정적 배포

#### 7. README 작성 및 작업 이력 관리
- **문의:** .md도 생성해줘 / 앞으로 항상 저기에 모든 내용 추가해주고 내가 문의한 내용, 작업한 내용들도 같이 정리해서 작성해줘
- **작업 내용:**
  - README.md 최초 생성 (프로젝트 소개, 기술 스택, 구조, 실행/배포 방법)
  - 작업 이력 섹션 추가 — 이후 모든 작업은 이 섹션에 날짜/문의/작업 내용으로 누적 기록

#### 8. 다크 테마 리디자인
- **문의:** 지금 만든 디자인을 조금 더 남자들이 좋아할 심플하고 깔끔하게 만들어줘
- **작업 내용:**
  - 전체 컬러 시스템을 다크 테마로 변경 (배경 `#0d1117`, 카드 `#161b27`)
  - 흰색 계열 → 딥 네이비/차콜 계열로 교체, 불필요한 그림자/곡선 제거
  - 수입: 에메랄드 그린 `#10b981` / 지출: 로즈 레드 `#f43f5e` / 액센트: 블루 `#3b82f6`
  - 구분 뱃지를 `IN` / `OUT` 텍스트로 간소화
  - 차트 툴팁·범례·축 색상 모두 다크 테마에 맞게 조정
  - 헤더를 얇은 borderline 스타일로 변경 (로고 + 날짜만 표시)
  - 커밋 → GitHub Push → Vercel 배포 완료
