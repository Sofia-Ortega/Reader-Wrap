import { styled } from "@linaria/react";

interface Props {
  color?: string;
  isBtn?: boolean;
}

export const BookmarkBackground = styled.div<Props>`
  clip-path: polygon(0% 0%, 100% 0, 77% 50%, 100% 100%, 0% 100%);
  background-color: ${({ color }) => (color ? color : `var(--light-brown)`)};
  height: 150px;
  width: 500px;
  cursor: ${({ isBtn }) => (isBtn ? "pointer" : "default")};

  transition: transform 0.2s ease;

  &:hover {
    transform: ${({ isBtn }) => (isBtn ? `translateY(-4px)` : "none")};
  }
`;
