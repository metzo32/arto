
import { NextResponse } from "next/server";
import { artistData } from "../../../../public/assets/datas/artistData";

export const revalidate = 10;

export async function GET() {
  const sliced = artistData.slice(0, 15);
  return NextResponse.json(sliced);
}
