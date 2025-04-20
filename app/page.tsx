export default function Home() {
  return (
    <div className="cus-container py-5 mx-auto">
      <h1 className="text-xl font-bold mb-4">weebur</h1>
      <div className="pb-4">
        이 프로젝트는 DummyJSON API를 기반으로 한 상품 목록 페이지입니다.
        <br></br>
        사용자는 무한 스크롤로 상품을 로드하고, 검색 및 뷰 모드(리스트/그리드)를
        전환할 수 있습니다.<br></br> Next.js 기반으로 구축되어있으며, React
        Query를 사용하여 효율적인 데이터 패치를 구현했습니다.
      </div>
      <hr></hr>
      <h2 className="mt-4 font-bold mb-4">📌 주요 기능</h2>
      <ul className="pb-4">
        <li>
          <strong>검색 기능</strong>: 상품명, 브랜드명 등을 입력하여 실시간 검색
          가능
        </li>
        <li>
          <strong>뷰 타입 전환</strong>: 리스트 / 그리드 보기 모드 전환 (24시간
          캐시 저장)
        </li>
        <li>
          <strong>무한 스크롤</strong>: 상품 목록 페이지에서 스크롤 시 자동 로딩
        </li>
        <li>
          <strong>리뷰 및 평점</strong>: 상품의 리뷰 개수와 별점 시각화
        </li>
        <li>
          <strong>반응형 UI</strong>: 데스크탑 및 모바일 모두 지원
        </li>
        <li>
          <strong>상세 페이지 이동</strong>: 클릭 시 상품 상세 페이지로 이동
        </li>
      </ul>
      <hr></hr>
      <h2 className="mt-4 font-bold mb-4">⚙️ 기술 스택</h2>
      <ul className="pb-4">
        <li>
          <strong>Next.js (App Router)</strong>
        </li>
        <li>
          <strong>React Query (TanStack Query)</strong>
        </li>
        <li>
          <strong>TypeScript</strong>
        </li>
        <li>
          <strong>Tailwind CSS</strong>
        </li>
        <li>
          <strong>
            <a href="https://dummyjson.com">DummyJSON API</a>
          </strong>
        </li>
      </ul>
    </div>
  );
}
