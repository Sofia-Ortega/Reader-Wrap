import { styled } from "@linaria/react";
import { modularScale } from "polished";
import { useContext } from "react";
import { PageContext } from "../App";

const Wrapper = styled.div`
  background-color: var(--dark-brown);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: ${modularScale(1)} 0;
`;

const Title = styled.h1`
  font-size: ${modularScale(5)};
  color: var(--yellow);
  padding: 0;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: ${modularScale(1)};
  color: var(--yellow);
  margin: 0;
`;

const Logo = styled.div`
  margin: 10px;
  color: var(--yellow);
  cursor: pointer;
`;

interface Props {
  showSubtitle?: boolean;
}

export default function Header({ showSubtitle }: Props) {
  const setShowContext = useContext(PageContext);

  return (
    <Wrapper>
      <Logo onClick={() => setShowContext("Home")}>logo</Logo>
      <div>
        <Title>Reader Wrap</Title>
        {showSubtitle && <SubTitle>see your your year in books</SubTitle>}
      </div>
      <div></div>
    </Wrapper>
  );
}
