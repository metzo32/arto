//page route 방식
// import { NextApiRequest, NextApiResponse } from "next";
// import { artistData } from "../../../../public/assets/datas/artistData";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   return res.status(200).json(artistData);
// }

//app route 방식
import { NextResponse } from "next/server";
import { artistData } from "../../../../public/assets/datas/artistData";

// GET 요청 처리
export async function GET() {
  return NextResponse.json(artistData);
}
