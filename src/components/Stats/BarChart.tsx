import { styled } from "@linaria/react";

interface BarProps {
  height: number;
}

const Chart = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
`;

const Bar = styled.div<BarProps>`
  width: 40px;
  height: ${({ height }) => height}px;
  background-color: var(--yellow);
  border-radius: 4px;
`;

interface BarChartProps {
  heights: number[];
}

export default function BarChart({ heights }: BarChartProps) {
  return (
    <Chart>
      {heights.map((height, index) => (
        <Bar key={index} height={height} />
      ))}
    </Chart>
  );
}
