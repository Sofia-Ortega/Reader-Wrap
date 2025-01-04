import { styled } from "@linaria/react";
import { modularScale } from "polished";
import Button from "../components/global/Button";
import Bookshelf from "../components/bookshelf/Bookshelf";
import { useContext, useEffect, useMemo, useState } from "react";
import { BookStatsContext, PageContext } from "../App";
import { CURRENT_YEAR } from "../utils/constants";
import { IDisplayBook } from "../utils/types";
import ShareModal from "../components/bookshelf/ShareModal";

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
  position: block;
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
  const [open, setOpen] = useState(false);

  const setShowPage = useContext(PageContext);

  const bookStats = useContext(BookStatsContext);
  const books = bookStats.bookshelfBooks;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
    }

    // Clean up when the modal is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const generateDimensions = (pageNum: number) => {
    const MULTIPLE = 15;

    const minPreferredWidth = 20;
    const maxPreferredWidth = 80;

    const minHeight = 120;
    const maxHeight = 180;

    let height =
      Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    let width = (pageNum * MULTIPLE) / height;

    if (width > maxPreferredWidth) {
      height = maxHeight;
      width = (pageNum * MULTIPLE) / height;
    } else if (width < minPreferredWidth) {
      height = minHeight;
      width = (pageNum * MULTIPLE) / height;
    }

    return { width: `${width}px`, height: `${height}px` };
  };

  const COLORS = ["yellow", "blue", "sand", "brown-shadow"];

  const generatedBooks: IDisplayBook[] = useMemo(
    () =>
      books.map((book, index) => ({
        ...book,
        color: COLORS[index % COLORS.length],
        ...generateDimensions(book.numberOfPages),
      })),
    [books]
  );

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
        <Bookshelf
          setTitle={setTitle}
          setAuthor={setAuthor}
          books={generatedBooks}
        />
        <ButtonWrapper>
          <Button secondary onClick={() => setOpen(true)}>
            Share
          </Button>
          <a
            href="https://buymeacoffee.com/alchemistix"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button tertiary>Buy me a coffee</Button>
          </a>
        </ButtonWrapper>
      </ContentWrapper>
      <ShareModal books={generatedBooks} open={open} setOpen={setOpen} />
    </Wrapper>
  );
}
