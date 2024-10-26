import { css } from "@linaria/core";
import Button from "../components/global/Button";
import SlideShow from "../components/guide/SlideShow";
import { useState } from "react";
import Stepper from "../components/guide/Stepper";

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export default function Guide() {
  const [slide, setSlide] = useState(1);

  return (
    <div>
      <div className={wrapper}>
        <Stepper step={slide} />
        <SlideShow slide={slide} setSlide={setSlide} />
        <Button name="GO TO EXPORT LINK" />
      </div>
    </div>
  );
}
