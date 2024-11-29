import { styled } from "@linaria/react";

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
}

const Book = styled.div<BookProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => `var(--${color})`};
`;

interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthor: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Bookshelf({ setTitle, setAuthor }: Props) {
  type BookData = {
    title: string;
    author: string;
    pageNum: number;
  };
  const booksData: BookData[] = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", pageNum: 281 },
    { title: "1984", author: "George Orwell", pageNum: 328 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pageNum: 100 },
    { title: "Pride and Prejudice", author: "Jane Austen", pageNum: 279 },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", pageNum: 214 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", pageNum: 310 },
    { title: "Fahrenheit 451", author: "Ray Bradbury", pageNum: 194 },
    { title: "Moby-Dick", author: "Herman Melville", pageNum: 585 },
    { title: "War and Peace", author: "Leo Tolstoy", pageNum: 1225 },
    { title: "Jane Eyre", author: "Charlotte Brontë", pageNum: 507 },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pageNum: 1178 },
    { title: "The Alchemist", author: "Paulo Coelho", pageNum: 208 },
  ];

  const COLORS = ["yellow", "blue", "sand", "brown-shadow"];

  const getWidthAndHeight = (pageNum: number) => {
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

  const handleBookEnter = (book: BookData) => {
    setTitle(book.title);
    setAuthor(book.author);
  };

  const handleBookLeave = (book: BookData) => {
    setTitle(null);
    setAuthor(null);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <BackgroundBox />
        <Box>
          {booksData.map((book, index) => (
            <Book
              onMouseEnter={() => handleBookEnter(book)}
              onMouseLeave={() => handleBookLeave(book)}
              color={COLORS[index % COLORS.length]}
              {...getWidthAndHeight(book.pageNum)}
            />
          ))}
        </Box>
      </div>
    </div>
  );
}
