import { styled } from "@linaria/react";
import DropDown from "../global/DropDown";
import { useContext, useState } from "react";
import BarChart from "./BarChart";
import { BookStatsContext } from "../../assets/hooks/BookStatsContext";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 80px 0;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  color: var(--sand);
  font-weight: normal;
  font-size: 2em;
  text-align: center;
  flex: 1;
`;

const BookshelfWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  color: var(--brown-shadow);
  font-size: 0.5em;
  font-weight: bold;
  flex: 1;
`;

export default function ShelvedBooks() {
  const bookStats = useContext(BookStatsContext);

  const bookshelveNames: string[] = Object.keys(bookStats.shelvedBooksPerMonth);

  const [selectedBookshelf, setSelectedBookshelf] = useState<string>(
    bookshelveNames[0]
  );

  return (
    <Wrapper>
      <Title>Shelved Books</Title>
      <BarChart heights={bookStats.shelvedBooksPerMonth[selectedBookshelf]} />
      <BookshelfWrapper>
        <div>Bookshelf</div>
        <DropDown
          items={bookshelveNames}
          selectedBookshelf={selectedBookshelf}
          setSelectedBookshelf={setSelectedBookshelf}
        />
      </BookshelfWrapper>
    </Wrapper>
  );
}
