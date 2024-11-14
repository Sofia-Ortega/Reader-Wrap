import { styled } from "@linaria/react";

const MyBar = styled.div`
  background-color: var(--yellow);
  color: var(--dark-rose);
  height: 100%;
  width: 40px;
  border: 1px solid black;
  border-radius: 4px;
`;

interface Props {
  barHeight: number;
  maxHeight: number;
}

export default function Bar({ barHeight, maxHeight }: Props) {
  const barStyle = {
    gridRow: maxHeight + "",
    height: "10px",
    alignSelf: "end",
  };

  if (barHeight != 0) {
    barStyle.gridRow = `${maxHeight - barHeight + 1}/${maxHeight + 1}`;
    barStyle.height = "100%";
  }

  return <MyBar style={barStyle}>{barHeight}</MyBar>;
}
