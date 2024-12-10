

export default function test() {

    const images: string[] = [];

for (let i = 1; i <= 70; i++) {
    const imageName = `tattoo_${String(i).padStart(2, '0')}.jpg`;
    images.push(require(`../images/${imageName}`));
}
console.log(images)
  return (
    <div>
      
    </div>
  )
}
