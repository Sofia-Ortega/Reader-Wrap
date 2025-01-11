import { styled } from "@linaria/react";

interface Props {
  color?: string;
  isBtn?: boolean;
}

export const BookmarkBackground = styled.div<Props>`
  clip-path: polygon(0% 0%, 100% 0, 77% 50%, 100% 100%, 0% 100%);
  background-color: ${({ color }) => (color ? color : `var(--light-brown)`)};
  width: clamp(100px, 80vw, 500px);
  height: auto;
  aspect-ratio: 10 / 3;
  cursor: ${({ isBtn }) => (isBtn ? "pointer" : "default")};

  transition: transform 0.2s ease;

  &:hover {
    transform: ${({ isBtn }) => (isBtn ? `translateY(-4px)` : "none")};
  }
`;
