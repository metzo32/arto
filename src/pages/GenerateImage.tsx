import React, { useState, useEffect } from "react";
import GenerateImageApi from "../components/api/GenerateImageApi";
import s from "../stores/styling";
import HoverButton from "../components/HoverButton";
import {
  CircleAnimation,
  PopUpBelow,
} from "../components/FramerMotions/scrollMotions";
import Water from "../components/loading_water/Water";
import StartFromTop from "../components/StartFromTop";
import LoadCounter from "../components/loading_water/LoadCounter";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [color, setColor] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [check, setCheck] = useState(false);
  const [waterAnimationDone, setWaterAnimationDone] = useState(false);
  const [fadeOutTriggered, setFadeOutTriggered] = useState(false);
  const [look, setLook] = useState(false);
  const [scaleFrame, setScaleFrame] = useState(1);
  const [showButtons, setShowButtons] = useState(false);

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault(); // 기본 동작 막기

    if (isSubmitted) return; // 이미 제출된 경우 리턴

    try {
      const url = await GenerateImageApi(
        `${prompt}?t=${new Date().getTime()}`,
        color
      ); // 캐시 무효화
      setImageUrl(url);
    } catch (error) {
      console.error("Image generation failed:", error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (prompt.trim().length === 0) {
      return; // 입력값이 없을 때 리턴
    }
    handleSubmit(e);
    setIsSubmitted(true);

    // Water 애니메이션이 끝난 후 확인하기 버튼 표시
    setTimeout(() => {
      setWaterAnimationDone(true);
    }, 12000);
  };

  const handleCheck = () => {
    setCheck(true);
    setFadeOutTriggered(true);

    setLook(!look);
    // 버튼을 눌렀을 때 프레임을 0.8만큼 줄였다가 1로 복원
    setScaleFrame(1.05);
    setTimeout(() => {
      setScaleFrame(1); // 0.3초 후 원래 크기로 복원
    }, 300);
  };

  useEffect(() => {
    if (check) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);

      // cleanup 함수
      return () => clearTimeout(timer);
    } else {
      setShowButtons(false);
    }
  }, [check]);

  const handleSaveImage = () => {
    window.open(imageUrl, "_blank");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <StartFromTop />
      <s.GenDiv className="gen-wrapper">
        <s.GenDiv className="gen-bg-wrapper">
          {/* <s.Image className="gen-bg" src={bgImage} alt="photo" /> */}

          {/* <s.DotMask className="base">
            <s.DotMask className="angled" />
          </s.DotMask> */}
        </s.GenDiv>

        <s.GenDiv className="gen-title-wrapper">
          <PopUpBelow>
            <s.StyledH2 className="gen-top-title">Exclusive Design</s.StyledH2>
          </PopUpBelow>
          <PopUpBelow delay={0.4}>
            <s.StyledH1 className="gen-title">
              Create <br />
              your own
            </s.StyledH1>
          </PopUpBelow>

          <s.GenDiv className="gen-semi-title-container">
            <s.GenDiv className="gen-column">
              <PopUpBelow>
                <s.StyledH3 className="gen-semi-title steady-dark-title">
                  Since 2024
                </s.StyledH3>
              </PopUpBelow>

              <PopUpBelow>
                <s.StyledH3 className="gen-semi-title steady-dark-title">
                  Whenever you need
                </s.StyledH3>
              </PopUpBelow>
            </s.GenDiv>

            <s.GenDiv className="gen-column">
              <PopUpBelow>
                <s.StyledH3 className="gen-semi-title steady-dark-title">
                  Specific ideas
                </s.StyledH3>
              </PopUpBelow>

              <PopUpBelow>
                <s.StyledH3 className="gen-semi-title steady-dark-title">
                  Just for you
                </s.StyledH3>
              </PopUpBelow>
            </s.GenDiv>
          </s.GenDiv>

          <PopUpBelow>
            <s.StyledP>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              sunt deleniti, non sit labore ullam, id quia voluptates qui
              nostrum alias incidunt odit praesentium accusantium reiciendis
              officiis aliquam? Aspernatur, maxime.
            </s.StyledP>
          </PopUpBelow>

          <s.GenDiv className={"fadeout-box"}>안녕</s.GenDiv>

          <PopUpBelow>
            <s.Form
              className={`img-gen-form ${isSubmitted ? "submit-hidden" : ""}`}
            >
              <s.GenDiv className="gen-input-container">
                <s.Input
                  className="prompt-input"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your idea"
                  required
                />

                <s.Label className="colorCheck">
                  <s.Input
                    type="checkbox"
                    checked={color}
                    onChange={(e) => setColor(e.target.checked)}
                    className="input-hide"
                  />
                  {color ? (
                    <s.CheckboxAfterIcon className="checkbox-icon-checked large" />
                  ) : (
                    <s.CheckboxBeforeIcon className="checkbox-icon large" />
                  )}
                  Color
                </s.Label>
              </s.GenDiv>

              <HoverButton
                type="submit"
                circle={true}
                text="디자인 생성하기"
                onClick={handleButtonClick}
              />
            </s.Form>
          </PopUpBelow>

          {isSubmitted && (
            <PopUpBelow>
              <>
                <CircleAnimation
                  look={look}
                  scaleFrame={scaleFrame}
                  onClick={handleCheck}
                >
                  <>
                    {isSubmitted && (
                      <s.GenDiv
                        className={`water-box ${check ? "fadeout-box" : ""}`}
                      >
                        <LoadCounter />
                        {waterAnimationDone && !check && (
                          <s.Button className="water-btn" onClick={handleCheck}>
                            확인하기
                          </s.Button>
                        )}
                        <Water />
                      </s.GenDiv>
                    )}

                    {imageUrl && <s.Image src={imageUrl} alt="Generated" />}
                  </>
                </CircleAnimation>
              </>
            </PopUpBelow>
          )}

          {check && showButtons && (
            <PopUpBelow>
              <s.GenDiv className="gen-button-container">
                <HoverButton
                  type="button"
                  circle={false}
                  text="저장하기"
                  onClick={handleSaveImage}
                />
                <HoverButton
                  type="button"
                  circle={false}
                  text="다시 하기"
                  onClick={handleRefresh}
                />
              </s.GenDiv>
            </PopUpBelow>
          )}
        </s.GenDiv>
      </s.GenDiv>
    </>
  );
};

export default GenerateImage;
