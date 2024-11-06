import { styled } from "@linaria/react";

const MAX_HEIGHT_PX = 200;
const MIN_HEIGHTS_PX = 10;
const BAR_WIDTH = 40;
const BAR_GAP = 8;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
interface BarProps {
  height: number;
}

const Wrapper = styled.div`
  display: flex;
  background-color: #380707;
`;

const YaxisWrapper = styled.div`
  display: flex;
  height: ${MAX_HEIGHT_PX}px;
  /* height: 200px; */
  margin-top: -${12}px;
`;

const Yaxis = styled.div`
  width: 4px;
  background-color: var(--black);
  margin-right: ${BAR_GAP * 2}px;
`;

const NumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${MIN_HEIGHTS_PX + 12}px;
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${BAR_GAP}px;
  align-items: end;
  width: ${BAR_WIDTH * 12}px;
`;

const Bar = styled.div<BarProps>`
  width: ${BAR_WIDTH}px;
  height: ${({ height }) => height}px;
  background-color: var(--yellow);
  border-radius: 4px;
  font-size: 12px;
  color: var(--dark-rose);
`;

const Text = styled.div`
  color: var(--brown-shadow);
  font-weight: normal;
  font-size: 12px;
  width: ${BAR_WIDTH}px;
  text-align: center;
  background-color: #513cdd;
`;

const NumberText = styled(Text)`
  height: 100%;
  margin-top: 4px;
`;

interface BarChartProps {
  heights: number[];
}

export default function BarChart({ heights }: BarChartProps) {
  const maxHeight = Math.max(...heights);

  const heightsPx = heights.map(
    (h) => (h * (MAX_HEIGHT_PX - MIN_HEIGHTS_PX)) / maxHeight + MIN_HEIGHTS_PX
  );
  const numbers = Array.from(
    { length: maxHeight },
    (_, index) => maxHeight - index
  );

  return (
    <Wrapper>
      <YaxisWrapper>
        <NumberWrapper>
          {numbers.map((number) => (
            <NumberText key={number}>{number}</NumberText>
          ))}
        </NumberWrapper>
        <Yaxis />
      </YaxisWrapper>
      <div>
        <BarWrapper>
          {heightsPx.map((height, index) => (
            <Bar key={index} height={height}>
              {heights[index]}
            </Bar>
          ))}
        </BarWrapper>
        <BarWrapper>
          {MONTHS.map((month) => (
            <Text>{month}</Text>
          ))}
        </BarWrapper>
      </div>
    </Wrapper>
  );
}
