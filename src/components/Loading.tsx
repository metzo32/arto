import React from "react";
import s from "../stores/styling";
import { CloseDown } from "./FramerMotions/scrollMotions";
import { useState, useEffect } from "react";
import loading01 from "../assets/images/loading01.jpg";
import loading02 from "../assets/images/loading02.jpg";
import loading03 from "../assets/images/loading03.jpg";
import loading04 from "../assets/images/loading04.jpg";
import loading05 from "../assets/images/loading05.jpg";
import loading06 from "../assets/images/loading06.jpg";
import loading07 from "../assets/images/loading07.jpg";
import loading08 from "../assets/images/loading08.jpg";

export default function Loading() {
  const [selectedImage, setSelectedImage] = useState("");

  const images = [
    loading01,
    loading02,
    loading03,
    loading04,
    loading05,
    loading06,
    loading07,
    loading08,
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    const randomImage = getRandomImage();
    setSelectedImage(randomImage);
  }, []);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1
  const day = date.getDate()
  let hours = date.getHours();
  const minutes = date.getMinutes();


  const zeroMonth = month < 10 ? "0" + month : month
  const zeroDay = day < 10 ? "0" + day : day
  const zeroHours = hours < 10 ? "0" + hours : hours
  const zeroMinutes = minutes < 10 ? "0" + minutes : minutes

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return (
    <s.Loading className="loading-wrapper">
      {/* <s.MaskText className="text-contatiner">
        <s.MaskText className="fake-box">null</s.MaskText>

          <s.MaskText className="loading-title">Tapttoo</s.MaskText>

        <s.MaskText className="small-text-container">
          <s.MaskText className="small-text-box">
            <s.StyledP className="loading-text bold">Title -</s.StyledP>
            <s.StyledP className="loading-text">taptoo</s.StyledP>
          </s.MaskText>
          <s.MaskText className="small-text-box">
            <s.StyledP className="loading-text bold">Date -</s.StyledP>
            <s.StyledP className="loading-text">
              {zeroDay}.{zeroMonth}.{year}
            </s.StyledP>
          </s.MaskText>
          <s.MaskText className="small-text-box">
            <s.StyledP className="loading-text bold">Time -</s.StyledP>
            <s.StyledP className="loading-text">{zeroHours}:{zeroMinutes}{ampm}</s.StyledP>
          </s.MaskText>
          <s.MaskText className="small-text-box">
            <s.StyledP className="loading-text bold">Poster</s.StyledP>
            <s.StyledP className="loading-text">Everyday</s.StyledP>
          </s.MaskText>
          <s.MaskText className="small-text-box">
            <s.StyledP className="loading-text bold">Designer</s.StyledP>
            <s.StyledP className="loading-text">Untitled</s.StyledP>
          </s.MaskText>
        </s.MaskText>

        <s.MaskText className="white-box" />
      </s.MaskText> */}
      <s.Image className="loading-image" src={selectedImage} alt="image" />
    </s.Loading>
  );
}
