import { NextApiRequest, NextApiResponse } from "next";
import { artistData } from "../../../../public/assets/datas/artistData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nickname } = req.query;

  if (!nickname) {
    return res.status(200).json(artistData); 
  }

  const filteredArtists = artistData.filter((artist) =>
    artist.nickname.toLowerCase().includes((nickname as string).toLowerCase())
  );

  if (filteredArtists.length === 0) {
    return res.status(404).json({ message: "검색 결과가 없습니다." });
  }

  res.status(200).json(filteredArtists);
}
