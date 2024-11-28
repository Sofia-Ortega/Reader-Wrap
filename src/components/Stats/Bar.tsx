import { styled } from "@linaria/react";
import { CSSProperties } from "react";

const MyBar = styled.div`
  background-color: var(--yellow);
  color: var(--dark-rose);
  width: 40px;
  border-radius: 4px;
  margin: 0px 4px;
`;

interface Props {
  barHeight: number;
  maxHeight: number;
  col: number;
}

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

  return <MyBar style={barStyle}></MyBar>;
}
