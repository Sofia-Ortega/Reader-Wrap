import { styled } from "@linaria/react";
import { modularScale } from "polished";
import { CenterFullHeight } from "../global/CenterFullHeight";

const Wrapper = styled.div`
  background-color: var(--yellow);
  height: 100vh;
`;

const TextWrapper = styled.div`
  /* margin: 0 80px; */

  /* background-color: hotpink; */
  text-align: left;
`;

const MainText = styled.div`
  font-size: ${modularScale(4)};
  line-height: 1.2;
`;

const PageCount = styled.b`
  font-size: ${modularScale(4)};
  color: var(--dark-rose);
  line-height: 0.8;
`;

const BookCount = styled.b`
  font-size: ${modularScale(2)};
  color: var(--brown-shadow);
`;

const Subtitle = styled.p`
  font-size: ${modularScale(0.2)};
`;

export default function PageBookCount() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
