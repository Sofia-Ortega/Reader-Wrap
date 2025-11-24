import { styled } from "@linaria/react";
import BookmarkButton from "../components/global/BookmarkButton";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../_old_app";
import { IBook, IBookStats } from "../utils/types";
import { dummyBooks } from "../assets/data/dummydata";
import { Link } from "react-router";
import { useBookStats } from "../assets/hooks/useBookStats";

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

  const { bookStats } = useBookStats();

  const handlePreview = () => {
    handleSetBooks(dummyBooks);
    setShowPage("Wrap");
  };

  if (bookStats.numberOfBooks != -1) {
    return (
      <div>
        <ButtonWrapper>
          <BookmarkButton
            primaryText="Your Wrap"
            secondaryText="Review your book stats"
            onClick={() => setShowPage("Wrap")}
          />
          <BookmarkButton
            primaryText="Bookshelf"
            secondaryText="See your bookshelf"
            variation="secondary"
            onClick={() => setShowPage("Bookshelf")}
          />
          <BookmarkButton
            primaryText="Restart"
            secondaryText="Reupload your updated data"
            variation="secondary"
            onClick={() => setShowPage("Guide")}
          />
        </ButtonWrapper>
      </div>
    );
  }

  return (
    <div>
      <ButtonWrapper>
        <Link to="/guide">
          <BookmarkButton
            primaryText="Start"
            secondaryText="See your personalized results"
            onClick={() => setShowPage("Guide")}
          />
        </Link>
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
