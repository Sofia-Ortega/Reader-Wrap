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
  font-size: 12px;
`;

interface BarChartProps {
  heights: number[];
}

export default function BarChart({ heights }: BarChartProps) {
  const MAX_HEIGHT_PX = 200;
  const MIN_HEIGHTS_PX = 10;
  const maxHeight = Math.max(...heights);

  const heightsPx = heights.map(
    (h) => (h * (MAX_HEIGHT_PX - MIN_HEIGHTS_PX)) / maxHeight + MIN_HEIGHTS_PX
  );

  return (
    <Chart>
      {heightsPx.map((height, index) => (
        <Bar key={index} height={height} />
      ))}
    </Chart>
  );
}
