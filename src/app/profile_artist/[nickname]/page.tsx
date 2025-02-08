// "use client";

// import { useParams } from "next/navigation"; 
// import artistdata from "../../../../public/assets/datas/artitstData";
// import Image from "next/image";

// export default function ArtistProfile(props: any) {
//   console.log("페이지:", props)
//   const params = useParams();  
//   const nickname = params.nickname as string;

//   const artist = artistdata.find((item) => item.nickname === nickname);

//   if (!artist) {
//     return <div>존재하지 않는 아티스트입니다.</div>;
//   }

//   return (
//     <div>
//       <h1>{artist.nickname}의 프로필</h1>
//       <Image src={artist.mainImage} alt={artist.nickname} width={100} height={100}/>
//       {/* <p>스킬: {artist.skills.map((skill) => skill.name).join(", ")}</p> */}
//     </div>
//   );
// }


import React from 'react'
import ArtistProfileComp from '../../../components/ArtistProfile.page.components/ArtistProfileComp'

export default function page() {
  return (
    <ArtistProfileComp/>
  )
}

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { RiLayoutMasonryLine } from "react-icons/ri";
// import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
// import { IoApertureOutline } from "react-icons/io5";
// import { RiPaintFill } from "react-icons/ri";
// import { FaCircleNotch } from "react-icons/fa";
// import { FaGripfire } from "react-icons/fa";
// import { LuTreePine } from "react-icons/lu";
// import { FaEnvira } from "react-icons/fa";
// import { MdPieChart } from "react-icons/md";
// import { IoShareSocialOutline } from "react-icons/io5";

// interface ArtistDataProps {
//   id: number;
//   nickname: string;
//   mainImage: string;
//   introduction: string;
//   skills: { id: number; iconName: string; skill: string }[];
// }

// // 아이콘 매핑 객체
// const iconMap: { [key: string]: React.ComponentType } = {
//   RiLayoutMasonryLine,
//   IoApertureOutline,
//   RiCheckboxMultipleBlankFill,
//   FaCircleNotch,
//   FaGripfire,
//   LuTreePine,
//   RiPaintFill,
//   FaEnvira,
//   MdPieChart,
//   IoShareSocialOutline,
// };

// export default function ArtistsProfile() {
//   const [artistsArr, setArtistsArr] = useState<ArtistDataProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const params = useParams();
//   const nickname = params.nickname as string;

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const response = await fetch("/api/artists"); // 클라이언트에서 API 호출
//         const data = await response.json();
//         setArtistsArr(data);
//       } catch (error) {
//         console.error("Error fetching artist data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchArtists();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   const artistPageArr = artistsArr.find((artist) => artist.nickname === nickname);


//   return (
//     <div>
//       <h1>Artists (CSR)</h1>
//       {artistPageArr.map((artist) => (
//         <div key={artist.id}>
//           <img src={artist.mainImage} alt={artist.nickname} />
//           <h2>{artist.nickname}</h2>
//           <p>{artist.introduction}</p>
//           <ul>
//             {artist.skills.map((skill) => {
//               const IconComponent = iconMap[skill.iconName]; // 아이콘 매핑
//               return (
//                 <li key={skill.id}>
//                   {IconComponent && <IconComponent />}
//                    {skill.skill}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }
