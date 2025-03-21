
import { NextResponse } from "next/server";
import { artistData } from "../../../../public/assets/datas/artistData";

export const revalidate = 10;

export async function GET() {
  return NextResponse.json(artistData);
}
