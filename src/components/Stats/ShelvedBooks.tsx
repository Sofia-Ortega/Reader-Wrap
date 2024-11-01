import { styled } from "@linaria/react";
import { Center } from "../global/Center";
import { CenterFullHeight } from "../global/CenterFullHeight";

const Wrapper = styled.div`
  /* background-color: #8e8ece; */
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
  /* background-color: black; */
`;

const ChartWrapper = styled.div`
  /* background-color: #140844; */
  flex: 2;
`;

const Chart = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
`;

interface BarProps {
  height: number;
}

const Bar = styled.div<BarProps>`
  width: 40px;
  height: ${({ height }) => height}px;
  background-color: var(--yellow);
  border-radius: 4px;
`;

const BookshelfWrapper = styled.div`
  /* background-color: black; */
  color: var(--brown-shadow);
  font-size: 0.5em;
  font-weight: normal;
  flex: 1;
`;

export default function ShelvedBooks() {
  // Generate an array of random heights between 40 and 120 pixels
  const heights: number[] = Array.from(
    { length: 12 },
    () => Math.floor(Math.random() * 142) + 20
  );

  return (
    <Wrapper>
      <Title>Shelved Books</Title>
      <ChartWrapper>
        <CenterFullHeight>
          <Chart>
            {heights.map((height, index) => (
              <Bar key={index} height={height} />
            ))}
          </Chart>
        </CenterFullHeight>
      </ChartWrapper>
      <BookshelfWrapper>Bookshelf</BookshelfWrapper>
    </Wrapper>
  );
}
