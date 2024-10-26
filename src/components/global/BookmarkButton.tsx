import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { BookmarkBackground } from "./BookmarkBackground";

const Wrapper = styled.div`
  position: relative;
`;

const bookmarkShadow = css`
  position: absolute;
  top: 12px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 24px;
  line-height: 32px;
`;

const PrimaryText = styled.div`
  font-weight: 700;
  font-size: 32px;
  text-transform: uppercase;
`;

const SecondaryText = styled.div`
  font-size: 24px;
`;

const colorMap = {
  primary: { backgroundColor: "yellow", textColor: "dark-brown" },
  secondary: { backgroundColor: "light-brown", textColor: "yellow" },
};

interface Props {
  primaryText: string;
  secondaryText: string;
  variation?: "primary" | "secondary";
  onClick?: () => void;
}

export default function BookmarkButton({
  primaryText,
  secondaryText,
  variation = "primary",
  onClick,
}: Props) {
  const { backgroundColor, textColor } = colorMap[variation];

  return (
    <Wrapper>
      <div className={bookmarkShadow}>
        <BookmarkBackground color="var(--brown-shadow)"></BookmarkBackground>
      </div>
      <BookmarkBackground
        color={`var(--${backgroundColor})`}
        isBtn
        onClick={onClick}
      >
        <Content style={{ color: `var(--${textColor})` }}>
          <div>
            <PrimaryText>{primaryText}</PrimaryText>
            <SecondaryText>{secondaryText}</SecondaryText>
          </div>
        </Content>
      </BookmarkBackground>
    </Wrapper>
  );
}
