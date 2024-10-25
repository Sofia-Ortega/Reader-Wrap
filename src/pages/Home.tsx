import { styled } from "@linaria/react";
import BookmarkButton from "../components/BookmarkButton";
import Header from "../components/Header";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  gap: 40px;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <ButtonWrapper>
        <BookmarkButton
          primaryText="Start"
          secondaryText="See your personalized results"
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
