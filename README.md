# weebur

이 프로젝트는 DummyJSON API를 기반으로 한 상품 목록 페이지입니다.  
사용자는 무한 스크롤로 상품을 로드하고, 검색 및 뷰 모드(리스트/그리드)를 전환할 수 있습니다. 
Next.js 기반으로 구축되어있으며, `React Query`를 사용하여 효율적인 데이터 패치를 구현했습니다.

---

## 📌 주요 기능

- **검색 기능**: 상품명, 브랜드명 등을 입력하여 실시간 검색 가능
- **뷰 타입 전환**: 리스트 / 그리드 보기 모드 전환 (24시간 캐시 저장)
- **무한 스크롤**: 상품 목록 페이지에서 스크롤 시 자동 로딩
- **리뷰 및 평점**: 상품의 리뷰 개수와 별점 시각화
- **반응형 UI**: 데스크탑 및 모바일 모두 지원
- **상세 페이지 이동**: 클릭 시 상품 상세 페이지로 이동

---

## ⚙️ 기술 스택

- **Next.js (App Router)**
- **React Query (TanStack Query)**
- **TypeScript**
- **Tailwind CSS**
- **DummyJSON API** (https://dummyjson.com)

---

## 폴더 구조

```
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # 메인 페이지
│   └── products/           
│       ├── page.tsx          # 상품 목록 페이지
│       ├── components/       # 상품 목록 컴포넌트
│       │   ├── ProductList.tsx
│       │   ├── ListItem.tsx
│       │   ├── GridItem.tsx
│       │   └── ...
│       └── [id]/
│           ├── page.tsx      # 상품 상세 페이지
│           └── components/   # 상품 상세 컴포넌트  
│               ├── ProductDetail.tsx
│               └── ProductReviews.tsx
├── components/
│   ├── Header.tsx
│   ├── Provider.tsx
│   ├── SearchBar.tsx
│   └── TopBtn.tsx   
├── service/
│   └── ProductService.ts     # API 호출 함수
├── public/
│   └── icons/
├── lib/
│   ├── http.ts               # Axios 인스턴스 및 API 기본 설정
│   ├── type.ts               # 타입 정의 (Product 등)
│   └── utils.ts
├── README.md
└── ...
```

---

## 🚀 실행 방법

1. **레포 클론**
```bash
git clone https://github.com/kangseong-sim/weebur.git
cd your-repo
```

2. **패키지 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **접속**
```
http://localhost:3000
```

---

## 🥪 개발 핀

- 검색창에 입력 후 **엔터** 또는 **검색 버튼** 클릭 시 `/products?q=keyword` 로 이동
- 뷰 타입(리스트/그리드)은 로컬 스토리지에 저장되어 24시간 동안 유지됩니다.
- `DummyJSON API`는 실제 데이터를 제공함으로 네트워크 환경에 따라 로딩이 발생할 수 있습니다.

---

## 📝 TODO

- [ ] 필터 기능 고도화 (가격 범위, 성벽 등)
- [ ] 최근 보는 상품 / 추천 상품 구현
- [ ] 다크 모드 지원

---

## 🙌 Author

- [kangseongsim](https://github.com/kangseong-sim)
- Contact: stylesha34@gmail.com


