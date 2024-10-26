import { styled } from "@linaria/react";
import Step from "./Step";

const inactiveOpacity = 0.35;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 40px;
  height: 4px;
  background-color: #452e2b;
  opacity: var(--inactive-opacity);
`;

interface Props {
  step: number;
}

export default function Stepper({ step }: Props) {
  return (
    <Wrapper>
      <Step num={1} step={step} />
      <Divider />
      <Step num={2} step={step} />
      <Divider />
      <Step num={3} step={step} />
    </Wrapper>
  );
}
