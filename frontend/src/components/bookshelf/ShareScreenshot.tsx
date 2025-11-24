import { styled } from "@linaria/react";
import { forwardRef, useContext } from "react";
import { BookStatsContext } from "../../App";
import { css } from "@linaria/core";
import { getChunkedBooks } from "../../utils/bookshelfUtil";
import { IDisplayBook } from "../../utils/types";
import { Link } from "react-router";

const Wrapper = styled.div`
  width: 360px;
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const Title = styled.h1`
  background-color: var(--dark-brown);
  color: var(--yellow);
  text-align: center;
  padding-bottom: 5px;
  margin: 0;
`;

const StatsSection = styled.div`
  background-color: var(--yellow);
  color: var(--black);
  font-size: 24px;
  line-height: 24px;
  padding: 14px 4px;
`;

const StatNumber = styled.b`
  color: var(--dark-rose);
`;

const PersonaSection = styled.div`
  background-color: var(--black);
  padding: 10px 0;
`;

const Header = styled.div`
  color: var(--sand);
  text-align: center;
  font-weight: bold;
  font-size: 28px;
`;

const Personas = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

const PersonaBox = styled.div`
  background-color: var(--sand);
  box-shadow: -6px 6px 0 #8e5e46;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconStyle = css`
  width: 60px;
  height: 60px;
  position: relative;
`;

const PersonaName = styled.div`
  color: var(--sand);
  margin-top: 12px;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin-right: 8px; // should be the same as the shadow
  width: 80px;
  line-height: 12px;
`;

const BookshelfSection = styled.div`
  background-color: var(--sand);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bookshelves = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
`;

const Bookshelf = styled.div`
  background-color: var(--dark-brown);
  box-shadow: -6px 6px 0 var(--brown-shadow);
  width: 300px;
  height: 70px;
`;

const BooksWrapper = styled.div`
  overflow: hidden;
  margin: 0 1px 0 1px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const LinkWrapper = styled.div`
  background-color: var(--dark-rose);
  color: var(--yellow);
  text-align: center;
  margin: 0;
  font-weight: bold;
  padding: 12px;
`;

interface BookProps {
  width: string;
  height: string;
  color: string;
  selected?: boolean;
  darkenColor?: boolean;
}

const BOOK_DIVISOR = 3;

const dividePx = (px: string) => {
  return `${parseInt(px.replace("px", "")) / BOOK_DIVISOR}px`;
};

const Book = styled.div<BookProps>`
  width: ${({ width }) => dividePx(width)};
  height: ${({ height }) => dividePx(height)};
  background-color: ${({ color }) => `var(--${color})`};
  transform: ${({ selected }) =>
    selected ? "translate(12px, -12px) scale(1.1)" : "none"};
  transition: transform 0.3s ease;
  z-index: ${({ selected }) => (selected ? 1 : 0)};
  filter: brightness(${({ darkenColor }) => (darkenColor ? 0.8 : 1)});
`;

interface Props {
  books: IDisplayBook[];
}

const ShareScreenshot = forwardRef<HTMLDivElement, Props>(({ books }, ref) => {
  const bookStats = useContext(BookStatsContext);

  const arr = [0, 1, 2];

  const chunkedBooks = getChunkedBooks(books, (300 - 20) * BOOK_DIVISOR);

  if (bookStats.personas.length == 0) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper ref={ref}>
      <Title>2024 Reader Wrap</Title>
      <div>
        <StatsSection>
          <div>
            Read <StatNumber>{bookStats.numberOfBooks}</StatNumber> books
          </div>
          <div>
            Average Rating{" "}
            <StatNumber>{bookStats.averageRating.toFixed(1)}</StatNumber> stars
          </div>
        </StatsSection>
        <PersonaSection>
          <Header>Personas</Header>
          <Personas>
            {arr.map((i) => (
              <div key={i}>
                <PersonaBox>
                  <div style={{ position: "relative" }}>
                    <img
                      src={bookStats.personas[i]?.icon}
                      className={iconStyle}
                    />
                  </div>
                </PersonaBox>
                <PersonaName>{bookStats.personas[i]?.title}</PersonaName>
              </div>
            ))}
          </Personas>
        </PersonaSection>
        <BookshelfSection>
          <Header style={{ color: "var(--black)" }}>Bookshelf</Header>
          <Bookshelves>
            {arr.map((i) => (
              <Bookshelf key={i}>
                <BooksWrapper>
                  {chunkedBooks[i]?.map((book) => (
                    <Book
                      key={book.bookId}
                      color={book.color}
                      width={book.width}
                      height={book.height}
                    />
                  ))}
                </BooksWrapper>
              </Bookshelf>
            ))}
          </Bookshelves>
        </BookshelfSection>
      </div>
      <LinkWrapper>ReaderWrap.com</LinkWrapper>
    </Wrapper>
  );
});

export default ShareScreenshot;
