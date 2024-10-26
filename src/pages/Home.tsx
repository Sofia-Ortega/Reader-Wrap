import { styled } from "@linaria/react";
import BookmarkButton from "../components/global/BookmarkButton";
import Header from "../components/global/Header";
import { PageType } from "../utils/types";
import { useContext } from "react";
import { PageContext } from "../App";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  gap: 40px;
`;

export default function Home() {
  const setShowPage = useContext(PageContext);

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
        />
      </ButtonWrapper>
    </div>
  );
}
