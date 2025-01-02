import { styled } from "@linaria/react";
import { modularScale } from "polished";
import Button from "../components/global/Button";
import Bookshelf from "../components/bookshelf/Bookshelf";
import { useContext, useState } from "react";
import { BookStatsContext, PageContext } from "../App";
import { CURRENT_YEAR } from "../utils/constants";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  background-color: var(--dark-brown);
  display: flex;
  flex-direction: column;
  color: var(--yellow);
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${modularScale(1)} 0;
  position: sticky;
  top: 0px;
  z-index: 10;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: ${modularScale(5)};
  color: var(--yellow);
  padding: 0;
  margin: 0;
  cursor: pointer;

  @media (max-width: 500px) {
    font-size: ${modularScale(4)};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* height: 100%; */
  /* flex-grow: 1; */
  /* overflow: auto; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
`;

const BookInfoWrapper = styled.div`
  text-align: center;
  font-weight: bold;
  color: var(--yellow);
`;

export default function BookshelfPage() {
  const [title, setTitle] = useState<null | string>(null);
  const [author, setAuthor] = useState<null | string>(null);

  const setShowPage = useContext(PageContext);

  const bookStats = useContext(BookStatsContext);
  const books = bookStats.bookshelfBooks;

  return (
    <Wrapper>
      <HeaderWrapper onClick={() => setShowPage("Home")}>
        <Title>{CURRENT_YEAR} Bookshelf</Title>
        <BookInfoWrapper>
          <div>{title ? title : ""}</div>
          <div>{author ? `By: ${author}` : ""}</div>
        </BookInfoWrapper>
      </HeaderWrapper>
      <ContentWrapper>
        <Bookshelf setTitle={setTitle} setAuthor={setAuthor} books={books} />
        <ButtonWrapper>
          <Button secondary onClick={() => console.log(books)}>
            Share
          </Button>
          <Button tertiary>Buy me a coffee</Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
