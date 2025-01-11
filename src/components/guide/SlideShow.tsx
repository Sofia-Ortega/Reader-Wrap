import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { Dispatch, SetStateAction, useState } from "react";
import SquareButton from "../global/SquareButton";
import RightArrow from "../../assets/icons/RightArrow.svg";
import LeftArrow from "../../assets/icons/LeftArrow.svg";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";

const slideImgagesSrc = [slide1, slide2, slide3];

const slidesWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Slide = styled.div`
  border: clamp(1px, 1vw, 4px) solid var(--dark-brown);
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const slideImage = css`
  width: clamp(100px, 50vw, 400px);
  height: auto;
`;

const arrowImg = css`
  width: 100%;
  height: auto;
`;

interface Props {
  slide: number;
  setSlide: Dispatch<SetStateAction<number>>;
}

export default function SlideShow({ slide, setSlide }: Props) {
  const handleLeftArrow = () => {
    if (slide > 1) setSlide(slide - 1);
  };

  const handleRightArrow = () => {
    if (slide < 3) setSlide(slide + 1);
  };

  return (
    <div>
      <div className={slidesWrapper}>
        <ArrowContainer>
          {slide > 1 && (
            <SquareButton onClick={handleLeftArrow}>
              <img src={LeftArrow} className={arrowImg} />
            </SquareButton>
          )}
        </ArrowContainer>
        <Slide>
          <img src={slideImgagesSrc[slide - 1]} className={slideImage} />
        </Slide>
        <ArrowContainer>
          {slide < 3 && (
            <SquareButton onClick={handleRightArrow}>
              <img src={RightArrow} className={arrowImg} />
            </SquareButton>
          )}
        </ArrowContainer>
      </div>
    </div>
  );
}
