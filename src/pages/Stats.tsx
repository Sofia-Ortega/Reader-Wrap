import { styled } from "@linaria/react";
import PageBookCount from "../components/Stats/PageBookCount";
import ShelvedBooks from "../components/Stats/ShelvedBooks";
import AverageRating from "../components/Stats/AverageRating";
import Personas from "../components/Stats/Personas";
import BookshelfPage from "./BookshelfPage";
import { IBook } from "../utils/types";

const Section = styled.div`
  width: 100%;
  min-height: 120vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
`;

const Section1 = styled(Section)`
  background-color: var(--yellow);
  color: var(--dark-brown);
`;

const Section2 = styled(Section)`
  background-color: var(--dark-brown);
`;

const Section3 = styled(Section)`
  background-color: var(--dark-rose);
`;

const Section4 = styled(Section)`
  background-color: var(--black);
`;

const Scroll = styled.div`
  position: fixed;
  color: white;
  bottom: 50vh;
  right: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const sections = [
  { id: 1, Component: Section1, content: <PageBookCount /> },
  { id: 2, Component: Section2, content: <ShelvedBooks /> },
  { id: 3, Component: Section3, content: <AverageRating /> },
  { id: 4, Component: Section4, content: <Personas /> },
];

export default function Stats() {
  return (
    <div>
      {sections.map(({ id, Component, content }) => (
        <Component key={id}>{content}</Component>
      ))}
      <BookshelfPage />
    </div>
  );
}
