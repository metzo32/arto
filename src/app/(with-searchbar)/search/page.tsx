
export default function SearchPage({ searchParams }: any) {
  const query = searchParams?.nickname || "검색어가 없습니다.";

  return (
    <div className="search-results-container">
      <h1>검색 결과</h1>
      <p>입력한 검색어: {query}</p>
    </div>
  );
}
