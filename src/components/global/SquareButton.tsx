import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { ReactNode } from "react";

const wrapper = css`
  position: relative;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const buttonShadow = css`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: -1;
`;

interface ButtonBgProps {
  shadow?: boolean;
}

const ButtonBg = styled.button<ButtonBgProps>`
  background-color: ${({ shadow }) =>
    shadow ? `var(--dark-brown)` : `var(--brown-shadow)`};
  color: var(--dark-brown);
  text-decoration: none;
  border: none;
  width: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 16px;
  font-family: BalooBhaijaan;
  cursor: ${({ shadow }) => (!shadow ? "pointer" : "default")};

  transition: transform 0.2s ease;

  &:hover {
    transform: ${({ shadow }) =>
      !shadow ? `translateY(-2px) translateX(2px)` : "none"};
  }
`;

interface Props {
  children: ReactNode;
  onClick?: () => void;
}
export default function SquareButton({ children, onClick }: Props) {
  return (
    <div className={wrapper}>
      <div className={buttonShadow}>
        <ButtonBg shadow>yo</ButtonBg>
      </div>
      <div>
        <ButtonBg onClick={onClick}>
          <Center>{children}</Center>
        </ButtonBg>
      </div>
    </div>
  );
}
