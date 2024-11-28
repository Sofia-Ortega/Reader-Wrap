import { styled } from "@linaria/react";
import Button from "../components/global/Button";
import Header from "../components/global/Header";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export default function BookshelfPage() {
  return (
    <div>
      <div>The bookshelf</div>
      <ButtonWrapper>
        <Button secondary>Share</Button>
        <Button tertiary>Buy me a coffee</Button>
      </ButtonWrapper>
    </div>
  );
}
