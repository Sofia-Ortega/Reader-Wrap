import { css } from "@linaria/core";
import SlideShow from "../components/guide/SlideShow";
import { useState } from "react";
import Stepper from "../components/guide/Stepper";
import GuideDetails from "../components/guide/GuideDetails";
import { IBook } from "../utils/types";

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

interface Props {
  handleSetBooks: (myBooks: IBook[]) => void;
}

export default function Guide({ handleSetBooks }: Props) {
  const [slide, setSlide] = useState(1);

  return (
    <div>
      <div className={wrapper}>
        <Stepper step={slide} />
        <SlideShow slide={slide} setSlide={setSlide} />
        <GuideDetails slide={slide} handleSetBooks={handleSetBooks} />
      </div>
    </div>
  );
}
