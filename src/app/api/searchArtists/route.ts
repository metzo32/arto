import { NextResponse } from "next/server";
import { artistData } from "../../../../public/assets/datas/artistData";

export async function GET(req: Request) {
  const url = new URL(req.url); // 요청한 url을 다루기 쉬운 URL 객체로 변환
  const nickname = url.searchParams.get("nickname"); // 그 중 "nickname" 쿼리파라미터 추출

  console.log("🔍 받은 요청:", nickname);

  if (!nickname) {
    console.log("🌍 전체 아티스트 데이터 반환");
    return NextResponse.json(artistData, { status: 200 }); 
  }

  const filteredArtists = artistData.filter((artist) =>
    artist.nickname.toLowerCase().includes(nickname.toLowerCase())
  );

  console.log("🎨 필터링 결과:", filteredArtists);

  if (filteredArtists.length === 0) {
    return NextResponse.json({ message: "검색 결과가 없습니다." }, { status: 404 });
  }

  return NextResponse.json(filteredArtists);
}
