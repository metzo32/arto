
export const imagesArr = Array.from({ length: 70 }, (_, i) => {
    const imageName = `data${String(i + 1).padStart(2, "0")}.jpg`;
    return require(`../images/artist_image/${imageName}`)
});

// export function getRandomImage(): string {
//   const randomIndex = Math.floor(Math.random() * imagesArr.length);
//   return imagesArr[randomIndex];
// }
