import { styled } from "@linaria/react";
import { modularScale } from "polished";
import { useContext, useState } from "react";
import { PageContext } from "../../App";

const Wrapper = styled.div`
  background-color: var(--dark-brown);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: clamp(48px, 8vw, 64px);
  color: var(--yellow);
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const ContentContainer = styled.div<{ isSubtitleVisible: boolean }>`
  transition: max-height 0.6s ease, opacity 0.2s ease;
  max-height: ${({ isSubtitleVisible }) => (isSubtitleVisible ? "100px" : "0")};
  opacity: ${({ isSubtitleVisible }) => (isSubtitleVisible ? "1" : "0")};
  overflow: hidden;
`;

const SubTitle = styled.p`
  font-size: ${modularScale(1)};
  color: var(--yellow);
  margin: 0;
`;

interface Props {
  showSubtitle: boolean;
}

export default function Header({ showSubtitle }: Props) {
  const setShowPage = useContext(PageContext);

  return (
    <Wrapper>
      <div></div>
      <div>
        <Title onClick={() => setShowPage("Home")}>Reader Wrap</Title>
        <ContentContainer isSubtitleVisible={showSubtitle}>
          <SubTitle>see your year in books</SubTitle>
        </ContentContainer>
      </div>
      <div></div>
    </Wrapper>
  );
}
