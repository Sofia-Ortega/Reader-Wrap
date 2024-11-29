import { styled } from "@linaria/react";
import { modularScale } from "polished";
import Button from "../components/global/Button";
import Bookshelf from "../components/bookshelf/Bookshelf";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  background-color: var(--dark-brown);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${modularScale(1)} 0;
`;

const Title = styled.h1`
  font-size: ${modularScale(5)};
  color: var(--yellow);
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  flex-grow: 1; /* Makes this element take up the remaining space */
  overflow: auto; /* Adds scrolling if necessary */
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export default function BookshelfPage() {
  const [title, setTitle] = useState<null | string>(null);
  const [author, setAuthor] = useState<null | string>(null);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>{new Date().getFullYear()} Bookshelf</Title>
      </HeaderWrapper>
      <ContentWrapper>
        <div
          style={{
            height: "100px",
            fontSize: "2em",
            textAlign: "center",
            backgroundColor: "orange",
          }}
        >
          {title && <div>{title}</div>}
          {author && <div>{author}</div>}
        </div>
        <Bookshelf setTitle={setTitle} setAuthor={setAuthor} />
        <ButtonWrapper>
          <Button secondary>Share</Button>
          <Button tertiary>Buy me a coffee</Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
