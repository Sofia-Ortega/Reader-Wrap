import { styled } from "@linaria/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const BOX_WIDTH = "800px";
const BOX_HEIGHT = "200px";

const BackgroundBox = styled.div`
  background-color: var(--brown-shadow);
  width: ${BOX_WIDTH};
  height: ${BOX_HEIGHT};
  position: absolute;
  top: 16px;
  left: -16px;
`;

const Box = styled.div`
  background-color: var(--dark-brown);
  width: ${BOX_WIDTH};
  height: ${BOX_HEIGHT};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
  overflow: auto;
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

type BookData = {
  id: number;
  title: string;
  author: string;
  pageNum: number;
};
const booksData: BookData[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pageNum: 281,
  },
  { id: 2, title: "1984", author: "George Orwell", pageNum: 328 },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pageNum: 100,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pageNum: 279,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pageNum: 214,
  },
  { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", pageNum: 310 },
  { id: 7, title: "Fahrenheit 451", author: "Ray Bradbury", pageNum: 194 },
  { id: 8, title: "Moby-Dick", author: "Herman Melville", pageNum: 585 },
  { id: 9, title: "War and Peace", author: "Leo Tolstoy", pageNum: 1225 },
  { id: 10, title: "Jane Eyre", author: "Charlotte Brontë", pageNum: 507 },
  {
    id: 11,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pageNum: 1178,
  },
  { id: 12, title: "The Alchemist", author: "Paulo Coelho", pageNum: 208 },
];

const COLORS = ["yellow", "blue", "sand", "brown-shadow"];

interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthor: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Bookshelf({ setTitle, setAuthor }: Props) {
  const [selectedId, setSelectedId] = useState<null | number>(null);

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
      booksData.map((book, index) => ({
        ...book,
        color: COLORS[index % COLORS.length],
        ...generateDimensions(book.pageNum),
      })),
    []
  );

  const handleBookEnter = (book: BookData) => {
    setTitle(book.title);
    setAuthor(book.author);
    setSelectedId(book.id);
  };

  const handleBookLeave = (book: BookData) => {
    setTitle(null);
    setAuthor(null);
    setSelectedId(null);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <BackgroundBox />
        <Box>
          {generatedBooks.map((book) => (
            <BookWrapper
              key={book.id}
              onMouseEnter={() => handleBookEnter(book)}
              onMouseLeave={() => handleBookLeave(book)}
              selected={book.id == selectedId}
            >
              {selectedId == book.id && (
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
              )}
              <Book
                color={book.color}
                width={book.width}
                height={book.height}
                selected={selectedId === book.id}
              />
            </BookWrapper>
          ))}
        </Box>
      </div>
    </div>
  );
}
