import { styled } from "@linaria/react";
import Badge from "./Badge";
import { BookStatsContext } from "../../App";
import { useContext } from "react";

const Wrapper = styled.div`
  min-height: 100vh;
  /* max-height: 700px; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 80px 0;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: var(--sand);
  font-weight: bold;
  font-size: 2.5em;
  text-align: center;
  flex: 1;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 60vw;
  max-width: 800px;
  gap: 12px;

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
`;

export default function Personas() {
  const bookStats = useContext(BookStatsContext);

  if (bookStats.personas.length == 0) return <div>No books loaded</div>;

  return (
    <Wrapper>
      <Title>Personas</Title>
      <BadgeWrapper>
        <Badge {...bookStats.personas[0]} delayMultiple={1} />
        <Badge {...bookStats.personas[1]} delayMultiple={2} />
        <Badge {...bookStats.personas[2]} delayMultiple={3} />
      </BadgeWrapper>
    </Wrapper>
  );
}
