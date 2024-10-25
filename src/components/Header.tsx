import { styled } from "@linaria/react";
import { modularScale } from "polished";

const Wrapper = styled.div`
  background-color: var(--dark-brown);
  display: flex;
  justify-content: center;
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

export default function Header() {
  return (
    <Wrapper>
      <div>
        <Title>Reader Wrap</Title>
        <SubTitle>see your your year in books</SubTitle>
      </div>
    </Wrapper>
  );
}
