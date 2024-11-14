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
  grid-template-rows: repeat(${({ rowNum }) => rowNum}, 1fr);
  justify-items: end;
`;

const YAxis = styled.div<GridProps>`
  background-color: var(--brown-shadow);
  grid-column: 2;
  grid-row: 1 / ${({ rowNum }) => rowNum + 1};
  width: 2px;
`;

const Number = styled.div`
  grid-column: 1;
  color: var(--brown-shadow);
  font-size: 12px;
  position: relative;
  top: -6px;
`;

export default function BarChart({ heights }: BarChartProps) {
  const maxHeight = Math.max(...heights);
  return (
    <Grid rowNum={maxHeight}>
      {[...Array(maxHeight)].map((_, index) => (
        <Number key={index}>{maxHeight - index} - </Number>
      ))}
      <YAxis rowNum={maxHeight} />
      {heights.map((h, index) => (
        <Bar barHeight={h} maxHeight={maxHeight} key={index} col={index + 3} />
      ))}
    </Grid>
  );
}
