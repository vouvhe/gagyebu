# 가계부

개인 수입/지출을 관리하는 Next.js 웹 애플리케이션입니다.

## 라이브 데모

**https://gagyebu-vert.vercel.app**

## 주요 기능

- **수입/지출 내역 추가** — 날짜, 구분, 항목명, 카테고리, 금액 입력
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
└── deploy.ps1           # 배포 자동화 스크립트
```

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

## 카테고리

**지출:** 식비 / 카페·음료 / 교통 / 쇼핑 / 의료·건강 / 문화·여가 / 통신 / 주거·관리비 / 기타

**수입:** 월급 / 부수입 / 용돈 / 투자수익 / 기타
