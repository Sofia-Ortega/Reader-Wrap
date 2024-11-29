import { styled } from "@linaria/react";
import { CSSProperties } from "react";
import { motion, Variants } from "framer-motion";

const MyBar = styled(motion.div)`
  background-color: var(--yellow);
  color: var(--dark-rose);
  width: 40px;
  border-radius: 4px;
  margin: 0px 4px;
  transform-origin: bottom;
`;

interface Props {
  barHeight: number;
  maxHeight: number;
  col: number;
}

const barVariants: Variants = {
  offscreen: { scaleY: 0 },
  onscreen: (custom) => ({
    scaleY: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.2 + custom, // Base duration plus a factor based on relative height
    },
  }),
};

export default function Bar({ barHeight, maxHeight, col }: Props) {
  const barStyle: CSSProperties = {
    gridRow: maxHeight + "",
    alignSelf: "end",
    height: "10px",
    gridColumn: col,
  };

  if (barHeight != 0) {
    barStyle.gridRow = `${maxHeight - barHeight + 1}/${maxHeight + 1}`;
    barStyle.height = "100%";
  }

  console.log(barHeight / maxHeight);
  return (
    <MyBar
      style={barStyle}
      variants={barVariants}
      custom={barHeight / maxHeight}
    />
  );
}
