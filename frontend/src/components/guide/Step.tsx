import { styled } from "@linaria/react";

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: clamp(10px, 2vw, 30px);
  user-select: none;
`;

interface StepContentProps {
  active?: boolean;
}

const StepContent = styled.div<StepContentProps>`
  background-color: var(--dark-brown);
  width: clamp(50px, 10vw, 60px);
  aspect-ratio: 1 / 1;
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
