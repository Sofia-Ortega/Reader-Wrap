import { styled } from "@linaria/react";

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`;

interface StepContentProps {
  active?: boolean;
}

const StepContent = styled.div<StepContentProps>`
  background-color: var(--dark-brown);
  width: 60px;
  height: 60px;
  border-radius: 50%; /* Makes Step a smaller circle within StepContainer */
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--yellow);
  font-size: 24px;
  font-weight: bold;
  opacity: ${({ active }) => (active ? 1 : `var(--inactive-opacity)`)};
  transition: opacity 0.2s ease;
`;

interface Props {
  num: number;
  step: number;
}

export default function Step({ num, step }: Props) {
  return (
    <StepContainer>
      <StepContent active={num <= step}>{num}</StepContent>
    </StepContainer>
  );
}
