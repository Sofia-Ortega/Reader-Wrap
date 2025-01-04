import { styled } from "@linaria/react";
import BookmarkButton from "../components/global/BookmarkButton";
import { useContext } from "react";
import { PageContext } from "../App";
import { IBook } from "../utils/types";
import { dummyBooks } from "../assets/data/dummydata";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  gap: 40px;
`;

interface Props {
  handleSetBooks: (myBooks: IBook[]) => void;
}

export default function Home({ handleSetBooks }: Props) {
  const setShowPage = useContext(PageContext);

  const handlePreview = () => {
    handleSetBooks(dummyBooks);
    setShowPage("Wrap");
  };

  return (
    <div>
      <ButtonWrapper>
        <BookmarkButton
          primaryText="Start"
          secondaryText="See your personalized results"
          onClick={() => setShowPage("Guide")}
        />
        <BookmarkButton
          primaryText="Preview"
          secondaryText="Preview sample results"
          variation="secondary"
          onClick={handlePreview}
        />
      </ButtonWrapper>
    </div>
  );
}
