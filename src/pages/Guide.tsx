import { css } from "@linaria/core";
import Button from "../components/global/Button";
import SlideShow from "../components/guide/SlideShow";

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export default function Guide() {
  return (
    <div>
      <div>Guide</div>
      <div className={wrapper}>
        <SlideShow />
        <Button name="GO TO EXPORT LINK" />
      </div>
    </div>
  );
}
