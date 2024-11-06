import { styled } from "@linaria/react";
import DropDown from "../global/DropDown";
import { useState } from "react";
import BarChart from "./BarChart";

const Wrapper = styled.div`
  height: 100vh;
  max-height: 600px;
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bookshelves, setBookshelves] = useState([
    "read",
    "want to readzzzzzzzzzzzzzz",
    "classic",
  ]);

  // Generate an array of random heights between 40 and 120 pixels
  /*
  const heights: number[] = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 6)
  );
  */

  // const heights = [1, 2, 3, 2, 1, 0, 1, 4, 1, 3, 4, 4, 4];
  const heights = [1, 2, 3, 4, 1, 0, 1, 3, 1, 3, 3, 3, 3];

  return (
    <Wrapper>
      <Title>Shelved Books</Title>
      <BarChart heights={heights} />
      <BookshelfWrapper>
        <div>Bookshelf</div>
        <DropDown
          items={[...bookshelves]}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </BookshelfWrapper>
    </Wrapper>
  );
}
