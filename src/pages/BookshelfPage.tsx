import { styled } from "@linaria/react";
import { modularScale } from "polished";
import Button from "../components/global/Button";
import Bookshelf from "../components/bookshelf/Bookshelf";
import { useContext, useState } from "react";
import { PageContext } from "../App";

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
  flex-grow: 1;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const BookInfoWrapper = styled.div`
  height: 100px;
  font-size: 2em;
  text-align: center;
  font-weight: bold;
  color: var(--dark-brown);
`;

export default function BookshelfPage() {
  const [title, setTitle] = useState<null | string>(null);
  const [author, setAuthor] = useState<null | string>(null);

  const setShowPage = useContext(PageContext);

  return (
    <Wrapper>
      <HeaderWrapper onClick={() => setShowPage("Home")}>
        <Title>{new Date().getFullYear()} Bookshelf</Title>
      </HeaderWrapper>
      <ContentWrapper>
        <div>
          <BookInfoWrapper>
            {title && <div>{title}</div>}
            {author && <div>By: {author}</div>}
          </BookInfoWrapper>
          <Bookshelf setTitle={setTitle} setAuthor={setAuthor} />
        </div>
        <ButtonWrapper>
          <Button secondary>Share</Button>
          <Button tertiary>Buy me a coffee</Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
