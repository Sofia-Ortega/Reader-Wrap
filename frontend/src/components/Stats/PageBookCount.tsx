import { styled } from "@linaria/react";
import { CenterFullHeight } from "../global/CenterFullHeight";
import { useContext } from "react";
import { BookStatsContext } from "../../pages/Stats";

const TextWrapper = styled.div`
  text-align: left;
  padding: 0 20px;
`;

const MainText = styled.div`
  font-size: clamp(1.75rem, 8vw, 4rem);
  line-height: 1.2;
  font-weight: normal;
  color: var(--dark-brown);
`;

const PageCount = styled.b`
  font-size: 3em;
  color: var(--dark-rose);
  line-height: 0.8;
`;

const BookCount = styled.b`
  font-size: 1.9em;
  color: var(--brown-shadow);
`;

const Subtitle = styled.p`
  font-weight: normal;
  font-size: 1em;
  color: var(--dark-brown);
`;

export default function PageBookCount() {
  const bookStats = useContext(BookStatsContext);

  return (
    <CenterFullHeight>
      <TextWrapper>
        <MainText>
          This Year you've Read
          <br />
          <PageCount>{bookStats.numOfPages.toLocaleString()}</PageCount> pages
          <br />
          across <BookCount>{bookStats.numberOfBooks}</BookCount> books
        </MainText>
        <Subtitle>
          (that's about{" "}
          <b>{bookStats.numberOfWordsEstimate.toLocaleString()}</b> words!!!!)
        </Subtitle>
      </TextWrapper>
    </CenterFullHeight>
  );
}
