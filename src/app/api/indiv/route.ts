import { NextResponse } from "next/server";
import { artistData } from "../../../../public/assets/datas/artistData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get("nickname");

  if (nickname) {
    const foundArtist = artistData.find((artist) => artist.nickname === nickname);

    if (!foundArtist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }
    return NextResponse.json(foundArtist);
  }

  return NextResponse.json(artistData);
}
