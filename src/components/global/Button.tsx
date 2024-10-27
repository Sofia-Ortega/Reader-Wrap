import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { ReactNode } from "react";

const wrapper = css`
  position: relative;
  width: 220px;
  height: 44px;
`;

const buttonShadow = css`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const buttonMain = css`
  z-index: 1;
  position: absolute;
`;

interface ButtonBgProps {
  secondary?: boolean;
  shadow?: boolean;
}

const ButtonBg = styled.button<ButtonBgProps>`
  background-color: ${({ shadow, secondary }) => {
    if (shadow) return `var(--brown-shadow)`;
    else if (secondary) return `var(--yellow)`;
    return `var(--light-brown)`;
  }};
  color: ${({ secondary }) =>
    secondary ? `var(--dark-brown)` : `var(--yellow)`};
  text-decoration: none;
  border: none;
  width: 220px;
  height: 44px;
  font-weight: bold;
  font-size: 20px;
  font-family: BalooBhaijaan;
  cursor: ${({ shadow }) => (!shadow ? "pointer" : "default")};

  transition: transform 0.2s ease;

  &:hover {
    transform: ${({ shadow }) => (!shadow ? `translate(2px, -2px)` : "none")};
  }

  &:active {
    transform: ${({ shadow }) => (!shadow ? `translate(1px, -1px)` : "none")};
  }
`;

interface Props {
  children: ReactNode;
  secondary?: boolean;
  onClick?: () => void;
}

export default function Button({ children, secondary, onClick }: Props) {
  return (
    <div className={wrapper}>
      <div className={buttonShadow}>
        <ButtonBg shadow>yo</ButtonBg>
      </div>
      <div className={buttonMain}>
        <ButtonBg onClick={onClick} secondary={secondary}>
          {children}
        </ButtonBg>
      </div>
    </div>
  );
}
