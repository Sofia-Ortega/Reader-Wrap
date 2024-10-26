import { css } from "@linaria/core";
import { styled } from "@linaria/react";

const wrapper = css`
  position: relative;
  width: 220px;
  height: 44px;
`;

const buttonShadow = css`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: -1;
`;

interface ButtonBgProps {
  shadow?: boolean;
}

const ButtonBg = styled.button<ButtonBgProps>`
  background-color: ${({ shadow }) =>
    shadow ? `var(--brown-shadow)` : `var(--light-brown)`};
  color: var(--yellow);
  text-decoration: none;
  border: none;
  width: 220px;
  height: 44px;
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
  name: string;
  onClick?: () => {};
}
export default function Button({ name, onClick }: Props) {
  return (
    <div className={wrapper}>
      <div className={buttonShadow}>
        <ButtonBg shadow>yo</ButtonBg>
      </div>
      <div>
        <ButtonBg onClick={onClick}>{name}</ButtonBg>
      </div>
    </div>
  );
}
