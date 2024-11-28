import { styled } from "@linaria/react";
import Bar from "./Bar";

interface BarChartProps {
  heights: number[];
}

interface GridProps {
  rowNum: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  height: 100%;
  width: auto;
  grid-template-columns: auto 2px repeat(12, 1fr);
  grid-template-rows: repeat(${({ rowNum }) => rowNum}, 1fr) 2px 20px; /* Added extra row */
  justify-items: end;
`;

const YAxis = styled.div<GridProps>`
  background-color: var(--brown-shadow);
  grid-column: 2;
  grid-row: 1 / ${({ rowNum }) => rowNum + 1};
  width: 2px;
`;

const XAxis = styled.div<GridProps>`
  background-color: var(--brown-shadow);
  width: 100%;
  grid-column: 2 / -1;
  height: 2px;
  grid-row: ${({ rowNum }: GridProps) => rowNum + 1};
`;

const NumberY = styled.div`
  grid-column: 1;
  color: var(--brown-shadow);
  font-size: 12px;
  position: relative;
  top: -6px;
`;

const MonthRow = styled.div`
  grid-column: 3 / -1; /* Span all the columns after Y-axis */
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  font-size: 12px;
  color: var(--brown-shadow);
  text-align: center;
  width: 100%;
`;

export default function BarChart({ heights }: BarChartProps) {
  const maxHeight = Math.max(...heights, 1);
  return (
    <Grid rowNum={maxHeight}>
      {[...Array(maxHeight)].map((_, index) => (
        <NumberY key={index}>{maxHeight - index} - </NumberY>
      ))}
      <YAxis rowNum={maxHeight} />
      {heights.map((h, index) => (
        <Bar barHeight={h} maxHeight={maxHeight} key={index} col={index + 3} />
      ))}
      <XAxis rowNum={maxHeight} />
      <MonthRow>
        {[
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
        ].map((month, index) => (
          <div key={index}>{month}</div>
        ))}
      </MonthRow>
    </Grid>
  );
}
