import { styled } from "@linaria/react";
import { useMemo, useState } from "react";
import { IBook } from "../../utils/types";

const Box = styled.div`
  max-width: 800px;
  height: 200px;
  width: 80vw;
  background-color: var(--dark-brown);
  box-shadow: -16px 16px 0 var(--brown-shadow);
`;

const BooksWrapper = styled.div`
  overflow-x: auto;
  margin: 0 1px 0 1px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
`;

interface BookProps {
  width: string;
  height: string;
  color: string;
  selected?: boolean;
  darkenColor?: boolean;
}

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

const COLORS = ["yellow", "blue", "sand", "brown-shadow"];

interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthor: React.Dispatch<React.SetStateAction<string | null>>;
  books: IBook[];
}

export default function Bookshelf({ setTitle, setAuthor, books }: Props) {
  const [selectedIsbn, setSelectedIsbn] = useState<null | string>(null);

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

  const generatedBooks = useMemo(
    () =>
      books.map((book, index) => ({
        ...book,
        color: COLORS[index % COLORS.length],
        ...generateDimensions(book.numberOfPages),
      })),
    []
  );

  const handleBookEnter = (book: IBook) => {
    setTitle(book.title);
    setAuthor(book.author);
    setSelectedIsbn(book.isbn);
  };

  const handleBookLeave = () => {
    setTitle(null);
    setAuthor(null);
    setSelectedIsbn(null);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Box>
          <BooksWrapper>
            {generatedBooks.map((book) => (
              <BookWrapper
                key={book.isbn}
                onMouseEnter={() => handleBookEnter(book)}
                onMouseLeave={() => handleBookLeave()}
                selected={book.isbn == selectedIsbn}
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
                  selected={selectedIsbn === book.isbn}
                />
              </BookWrapper>
            ))}
          </BooksWrapper>
        </Box>
      </div>
    </div>
  );
}
