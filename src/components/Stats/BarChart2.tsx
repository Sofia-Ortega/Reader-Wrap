import { styled } from "@linaria/react";
import Bar from "./Bar";

interface BarChartProps {
  heights: number[];
}

interface GridProps {
  colNum: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  height: 300px;
  width: auto;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(${({ colNum }) => colNum}, 1fr);
`;

export default function BarChart2({ heights }: BarChartProps) {
  const maxHeight = Math.max(...heights);
  return (
    <div>
      <Grid colNum={maxHeight}>
        {heights.map((h, index) => (
          <Bar barHeight={h} maxHeight={maxHeight} key={index} />
        ))}
      </Grid>
    </div>
  );
}
