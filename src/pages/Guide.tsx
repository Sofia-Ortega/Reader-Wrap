import { css } from "@linaria/core";
import Button from "../components/Button";

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Guide() {
  return (
    <div>
      <div>Guide</div>
      <div className={wrapper}>
        <Button name="GO TO EXPORT LINK" />
      </div>
    </div>
  );
}
