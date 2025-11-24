import { styled } from "@linaria/react";
import BookmarkButton from "../components/global/BookmarkButton";
import { useContext, useEffect, useState } from "react";
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

export default function Home() {
  const { bookStats } = useBookStats();

  if (bookStats.numberOfBooks != -1) {
    return (
      <div>
        <ButtonWrapper>
          <Link to="/wrap">
            <BookmarkButton
              primaryText="Your Wrap"
              secondaryText="Review your book stats"
            />
          </Link>
          <Link to="bookshelf">
            <BookmarkButton
              primaryText="Bookshelf"
              secondaryText="See your bookshelf"
              variation="secondary"
            />
          </Link>
          <Link to="/guide">
            <BookmarkButton
              primaryText="Restart"
              secondaryText="Reupload your updated data"
              variation="secondary"
            />
          </Link>
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
          />
        </Link>
        <BookmarkButton
          primaryText="Preview"
          secondaryText="Preview sample results"
          variation="secondary"
        />
      </ButtonWrapper>
    </div>
  );
}
