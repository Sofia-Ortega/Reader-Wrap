import { styled } from "@linaria/react";

interface Props {
  color?: string;
  isBtn?: boolean;
}

export const BookmarkBackground = styled.div<Props>`
  clip-path: polygon(0% 0%, 100% 0, 77% 50%, 100% 100%, 0% 100%);
  background-color: ${(props) =>
    props.color ? props.color : `var(--light-brown)`};
  height: 150px;
  width: 500px;
  cursor: ${(props) => (props.isBtn ? "pointer" : "default")};

  transition: transform 0.2s ease;

  &:hover {
    transform: ${(props) => (props.isBtn ? `translateY(-4px)` : "none")};
  }
`;
