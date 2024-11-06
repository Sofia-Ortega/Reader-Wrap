import { styled } from "@linaria/react";
import Triangle from "../../assets/icons/Triangle.svg";
import { css } from "@linaria/core";

interface Props {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const StyledSelect = styled.select`
  background-color: var(--brown-shadow);
  color: var(--yellow);
  font-weight: bold;
  height: 40px;
  min-width: 80px;
  max-width: 160px;
  padding: 0 28px 0 16px;
  border: none;
  border-radius: 4px;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(${Triangle});
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  cursor: pointer;
  outline: none;
`;

const optionStyles = css`
  font-weight: bold;
  color: var(--yellow);
  background-color: var(--brown-shadow);
  overflow: none;
`;

export default function DropDown({
  items,
  selectedIndex,
  setSelectedIndex,
}: Props) {
  return (
    <StyledSelect
      value={selectedIndex}
      onChange={(e) => setSelectedIndex(Number(e.target.value))}
    >
      {items.map((item, index) => (
        <option key={index} value={index} className={optionStyles}>
          {item}
        </option>
      ))}
    </StyledSelect>
  );
}
