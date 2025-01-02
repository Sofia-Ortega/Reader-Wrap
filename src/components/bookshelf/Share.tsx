import { styled } from "@linaria/react";

const Wrapper = styled.div`
  width: 360px;
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const Title = styled.h1`
  background-color: var(--dark-brown);
  color: var(--yellow);
  text-align: center;
  padding-bottom: 5px;
  margin: 0;
`;

const StatsSection = styled.div`
  background-color: var(--yellow);
  color: var(--black);
  font-size: 24px;
  line-height: 24px;
  padding: 14px 4px;
`;

const StatNumber = styled.b`
  color: var(--dark-rose);
`;

const PersonaSection = styled.div`
  background-color: var(--black);
  padding: 10px 0;
`;

const Header = styled.div`
  color: var(--sand);
  text-align: center;
  font-weight: bold;
  font-size: 28px;
`;

const Personas = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

const PersonaBox = styled.div`
  background-color: var(--sand);
  box-shadow: -6px 6px 0 #8e5e46;
  width: 80px;
  height: 80px;
`;

const PersonaName = styled.div`
  color: var(--sand);
  margin-top: 12px;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin-right: 8px; // should be the same as the shadow
`;

const BookshelfSection = styled.div`
  background-color: var(--sand);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bookshelves = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
`;

const Bookshelf = styled.div`
  background-color: var(--dark-brown);
  box-shadow: -6px 6px 0 var(--brown-shadow);
  width: 300px;
  height: 70px;
`;

const LinkWrapper = styled.div`
  background-color: var(--dark-rose);
  color: var(--yellow);
  text-align: center;
  margin: 0;
  font-weight: bold;
  padding: 12px;
`;
export default function Share() {
  return (
    <Wrapper>
      <Title>2024 Reader Wrap</Title>
      <div>
        <StatsSection>
          <div>
            Read <StatNumber>24</StatNumber> books
          </div>
          <div>
            Average Rating <StatNumber>3.1</StatNumber> stars
          </div>
        </StatsSection>
        <PersonaSection>
          <Header>Personas</Header>
          <Personas>
            <div>
              <PersonaBox />
              <PersonaName>Carpenter</PersonaName>
            </div>
            <div>
              <PersonaBox />
              <PersonaName>Sophisticated</PersonaName>
            </div>
            <div>
              <PersonaBox />
              <PersonaName>Old Timer</PersonaName>
            </div>
          </Personas>
        </PersonaSection>
        <BookshelfSection>
          <Header style={{ color: "var(--black)" }}>Bookshelf</Header>
          <Bookshelves>
            <Bookshelf />
            <Bookshelf />
            <Bookshelf />
          </Bookshelves>
        </BookshelfSection>
      </div>
      <LinkWrapper>ReaderWrap.com</LinkWrapper>
    </Wrapper>
  );
}
