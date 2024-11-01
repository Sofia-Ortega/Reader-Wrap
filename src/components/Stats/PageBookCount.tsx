import { styled } from "@linaria/react";
import { CenterFullHeight } from "../global/CenterFullHeight";

const TextWrapper = styled.div`
  text-align: left;
`;

const MainText = styled.div`
  font-size: 1.75em;
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
  return (
    <CenterFullHeight>
      <TextWrapper>
        <MainText>
          This Year you've Read
          <br />
          <PageCount>4200</PageCount> pages
          <br />
          across <BookCount>12</BookCount> books
        </MainText>
        <Subtitle>
          (that's <b>12,354,256</b> words!!!!)
        </Subtitle>
      </TextWrapper>
    </CenterFullHeight>
  );
}
