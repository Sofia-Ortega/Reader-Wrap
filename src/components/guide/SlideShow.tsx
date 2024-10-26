import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { useState } from "react";
import SquareButton from "../global/SquareButton";
import RightArrow from "../../assets/icons/RightArrow.svg";
import LeftArrow from "../../assets/icons/LeftArrow.svg";
const slidesWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Slide = styled.div`
  width: 400px;
  height: 256px;
  border: 4px solid var(--dark-brown);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SlideShow() {
  const [slide, setSlide] = useState<number>(1);

  const handleLeftArrow = () => {
    if (slide > 1) setSlide(slide - 1);
  };

  const handleRightArrow = () => {
    if (slide < 3) setSlide(slide + 1);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>Slide: {slide}</div>
      <div className={slidesWrapper}>
        <SquareButton onClick={handleLeftArrow}>
          <img src={LeftArrow} width={20} height={20} />
        </SquareButton>
        <Slide>Pic</Slide>
        <SquareButton onClick={handleRightArrow}>
          <img src={RightArrow} width={20} height={20} />
        </SquareButton>
      </div>
    </div>
  );
}
