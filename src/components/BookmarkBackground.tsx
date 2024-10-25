import { styled } from "@linaria/react";

export const BookmarkBackground = styled.div`
  clip-path: polygon(0% 0%, 100% 0, 77% 50%, 100% 100%, 0% 100%);
  background-color: ${(props) =>
    props.color ? props.color : `var(--light-brown)`};
  height: 150px;
  width: 500px;
`;
