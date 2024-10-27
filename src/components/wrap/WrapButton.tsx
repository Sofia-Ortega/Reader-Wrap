import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { modularScale } from "polished";

const BOX_HEIGHT = 44;

const Box = styled.div`
  background-color: var(--black);
  color: var(--blue);
  width: 90px;
  height: ${BOX_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: width 0.3s ease 0.4s, background-color 0.5s ease,
    transform 0.3s ease;
  cursor: pointer;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--black);
    opacity: 0;
    transition: transform 0.5s ease, background-color 0.5s ease;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &:hover {
    width: 220px;
    background-color: var(--blue);

    &::after {
      opacity: 1;
      transform: translate(8px, -8px);
      background-color: var(--yellow);
      transition: transform 0.2s ease;
    }
  }

  &:active {
    &::after {
      transform: translate(4px, -4px); /* Translate the box when pressed */
    }
  }
`;
const Text = styled.h3`
  width: 100%;
  height: 100%;
  font-size: ${modularScale(1)};
  padding: 0;
  margin: 0;
  line-height: ${BOX_HEIGHT}px;
  color: var(--yellow);
  text-align: center;
  z-index: 1;

  transition: transform 0.5s ease;

  &:hover {
    color: var(--black);
    transform: translate(8px, -8px);
    transition: transform 0.2s ease;
  }

  &:active {
    transform: translate(4px, -4px); /* Translate the text when pressed */
  }
`;

interface Props {
  onClick?: () => void;
}

export default function WrapButton({ onClick }: Props) {
  return (
    <div>
      <Box>
        <Text>Wrap</Text>
      </Box>
    </div>
  );
}
