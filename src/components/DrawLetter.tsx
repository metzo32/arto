import s from "../stores/styling";
export default function DrawLetter() {
  return (
    <s.DrawIcon className="draw-wrapper">
      {/* <s.LetterIcon /> */}
      <s.DrawIcon className="icon">
        <svg
          viewBox="0 0 326 363"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.50535 98.2075C8.42592 100.379 9.23284 102.488 10.7407 104.052C12.2485 105.616 14.3275 106.5 16.5 106.5H22C24.9559 106.5 27.6709 104.87 29.0606 102.261L57.5606 48.7613C57.593 48.7005 57.6246 48.6393 57.6554 48.5777C60.7274 42.4338 67.9854 35.839 76.3632 35H118V314.792C116.774 321.185 113.384 325.403 110.315 327.136C99.8225 330.739 93.9009 332.366 83.2919 334.684C79.6185 335.487 77 338.74 77 342.5V347C77 351.418 80.5817 355 85 355H242.5C246.918 355 250.5 351.418 250.5 347V342.5C250.5 338.73 247.867 335.471 244.181 334.679C233.198 332.318 227.26 330.739 217.02 327.249C214.006 325.256 212.524 323.76 211.617 322.345C210.66 320.852 209.884 318.729 209.456 314.663C209.457 314.667 209.456 314.662 209.455 314.644C209.45 314.566 209.431 314.249 209.407 313.565C209.382 312.817 209.357 311.81 209.334 310.546C209.287 308.022 209.247 304.571 209.213 300.312C209.144 291.799 209.102 280.142 209.078 266.4C209.031 238.922 209.062 203.168 209.125 167.702C209.187 132.237 209.281 97.0688 209.359 70.7659C209.398 57.6147 209.434 46.6801 209.459 39.0334C209.464 37.5652 209.468 36.2182 209.472 35H250.25C254.935 35.9214 258.092 37.2654 260.88 39.4055C263.924 41.7424 267.074 45.4467 271.05 51.9682L297.945 102.272C299.337 104.875 302.048 106.5 305 106.5H310C312.156 106.5 314.22 105.63 315.725 104.087C317.231 102.545 318.05 100.46 317.998 98.3049L315.998 16.3049C315.892 11.9639 312.342 8.5 308 8.5H19.5C15.1955 8.5 11.6627 11.9059 11.5053 16.2075L8.50535 98.2075Z"
            stroke="black"
            stroke-linejoin="round"
          />
        </svg>
      </s.DrawIcon>
    </s.DrawIcon>
  );
}


//path 길이 구하기
// import React, { useEffect, useRef } from "react";

// export default function DrawLetter() {
//   const pathRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     const pathElement = pathRef.current;
//     if (pathElement) {
//       const length = pathElement.getTotalLength();
//       console.log("Path length:", length);
//     } else {
//       console.log("Path element not found");
//     }
//   }, []);

//   return (
//     <svg
//       viewBox="0 0 326 363"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         ref={pathRef}
//         d="M8.50535 98.2075C8.42592 100.379 9.23284 102.488 10.7407 104.052C12.2485 105.616 14.3275 106.5 16.5 106.5H22C24.9559 106.5 27.6709 104.87 29.0606 102.261L57.5606 48.7613C57.593 48.7005 57.6246 48.6393 57.6554 48.5777C60.7274 42.4338 67.9854 35.839 76.3632 35H118V314.792C116.774 321.185 113.384 325.403 110.315 327.136C99.8225 330.739 93.9009 332.366 83.2919 334.684C79.6185 335.487 77 338.74 77 342.5V347C77 351.418 80.5817 355 85 355H242.5C246.918 355 250.5 351.418 250.5 347V342.5C250.5 338.73 247.867 335.471 244.181 334.679C233.198 332.318 227.26 330.739 217.02 327.249C214.006 325.256 212.524 323.76 211.617 322.345C210.66 320.852 209.884 318.729 209.456 314.663C209.457 314.667 209.456 314.662 209.455 314.644C209.45 314.566 209.431 314.249 209.