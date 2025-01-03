import { styled } from "@linaria/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IBook, IBookshelfBook, IDisplayBook } from "../../utils/types";
import { getChunkedBooks } from "../../utils/bookshelfUtil";
import Share from "./Share";

interface BookProps {
  width: string;
  height: string;
  color: string;
  selected?: boolean;
  darkenColor?: boolean;
}

const Box = styled.div`
  max-width: 800px;
  height: 200px;
  width: 80vw;
  background-color: var(--dark-brown);
  box-shadow: -16px 16px 0 var(--brown-shadow);
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

const BookshelvesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 80px;
`;

const BookWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  z-index: ${({ selected }) => (selected ? 1 : 0)};
`;

const Book = styled.div<BookProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => `var(--${color})`};
  transform: ${({ selected }) =>
    selected ? "translate(12px, -12px) scale(1.1)" : "none"};
  transition: transform 0.3s ease;
  z-index: ${({ selected }) => (selected ? 1 : 0)};
  filter: brightness(${({ darkenColor }) => (darkenColor ? 0.8 : 1)});
`;

const BookTitle = styled.div<{ width: string }>`
  transform-origin: left top;
  font-size: 12px;
  color: var(--dark-brown);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(270deg) translate(-50%, -50%);
  white-space: nowrap;
  overflow: hidden;
  width: ${({ width }) => {
    const numericWidth = parseInt(width.replace("px", ""), 10);
    return `${numericWidth - 10}px`;
  }};
  text-align: center;
  text-overflow: ellipsis;
`;

const COLORS = ["yellow", "blue", "sand", "brown-shadow"];

interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthor: React.Dispatch<React.SetStateAction<string | null>>;
  books: IBookshelfBook[];
}

export default function Bookshelf({ setTitle, setAuthor, books }: Props) {
  const [selectedBookId, setSelectedBookId] = useState<null | string>(null);

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

  const generatedBooks: IDisplayBook[] = useMemo(
    () =>
      books.map((book, index) => ({
        ...book,
        color: COLORS[index % COLORS.length],
        ...generateDimensions(book.numberOfPages),
      })),
    [books]
  );

  const handleBookEnter = (book: IBookshelfBook) => {
    setTitle(book.title);
    setAuthor(book.author);
    setSelectedBookId(book.bookId);
  };

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [boxWidth, setBoxWidth] = useState<number | null>(null);

  useEffect(() => {
    if (boxRef.current) setBoxWidth(boxRef.current.offsetWidth);

    const handleResize = () => {
      if (boxRef.current) setBoxWidth(boxRef.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const chunkedBooks = getChunkedBooks(
    generatedBooks,
    boxWidth ? boxWidth - 20 : 360
  );

  if (chunkedBooks == null) {
    return (
      <div>
        <div style={{ position: "relative" }}>
          <Box ref={boxRef}></Box>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BookshelvesWrapper>
        {chunkedBooks.map((chunk, index) => (
          <Box
            key={index}
            ref={index === chunkedBooks.length - 1 ? boxRef : null}
          >
            <BooksWrapper>
              {chunk.map((book) => (
                <BookWrapper
                  key={book.bookId}
                  onMouseEnter={() => handleBookEnter(book)}
                  selected={book.bookId == selectedBookId}
                >
                  <Book
                    color={book.color}
                    width={book.width}
                    height={book.height}
                    darkenColor
                    style={{
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                  <Book
                    color={book.color}
                    width={book.width}
                    height={book.height}
                    selected={selectedBookId === book.bookId}
                  >
                    <BookTitle width={book.height}>{book.title}</BookTitle>
                  </Book>
                </BookWrapper>
              ))}
            </BooksWrapper>
          </Box>
        ))}
      </BookshelvesWrapper>
      <Share books={generatedBooks} />
    </div>
  );
}
