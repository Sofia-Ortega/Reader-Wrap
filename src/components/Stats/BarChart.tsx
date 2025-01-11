import { styled } from "@linaria/react";
import { motion, Variants } from "framer-motion";
import Bar from "./Bar";
import { css } from "@linaria/core";

interface BarChartProps {
  heights: number[];
}

interface GridProps {
  rowNum: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  transition: grid-template-rows 300ms ease, height 300ms ease;
  grid-template-columns: 24px 2px repeat(12, 1fr);
  grid-template-rows: repeat(${({ rowNum }) => rowNum}, 1fr) 2px 20px; /* Added extra row */
  justify-items: end;
  min-height: 300px;
  overflow-x: auto;

  /* Customize scrollbar */
  ::-webkit-scrollbar {
    height: 8px; /* Height for horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background: var(
      --scroll-thumb-color,
      #b97a5a
    ); /* Default scroll thumb color */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scroll-thumb-hover-color, #555); /* Hover effect */
  }

  ::-webkit-scrollbar-track {
    background: var(--scroll-track-color, #241d1c); /* Scroll track color */
  }

  /* Firefox scrollbar customization */
  scrollbar-width: thin; /* Use "auto" or "thin" */
  scrollbar-color: var(--scroll-thumb-color, #b97a5a)
    var(--scroll-track-color, #241d1c);
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
    <motion.div style={{ height: "100%" }} layout>
      <Grid rowNum={maxHeight}>
        {[...Array(maxHeight)].map((_, index) => (
          <NumberY key={index}>{maxHeight - index} - </NumberY>
        ))}
        <YAxis rowNum={maxHeight} />
        {heights.map((h, index) => (
          <Bar
            barHeight={h}
            maxHeight={maxHeight}
            key={index}
            col={index + 3}
          />
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
    </motion.div>
  );
}
