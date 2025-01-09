import React, { useRef, useEffect } from 'react';

const MagneticBox = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = boxRef.current;

    if (!box) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { offsetX: x, offsetY: y } = e;
      const BoxWidth = box.clientWidth;
      const BoxHeight = box.clientHeight;
      const moveX = (x - BoxWidth / 2);
      const moveY = (y - BoxHeight / 2);
      box.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    };

    box.addEventListener('mousemove', handleMouseMove);

    return () => {
      box.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={boxRef} className="box">Magnetic</div>;
};

export default MagneticBox;
