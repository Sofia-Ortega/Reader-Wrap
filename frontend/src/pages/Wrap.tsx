import { styled } from "@linaria/react";
import WrapButton from "../components/wrap/WrapButton";
import { createContext, useState } from "react";
import { CenterFullHeight } from "../components/global/CenterFullHeight";
import PageBookCount from "../components/Stats/PageBookCount";
import ShelvedBooks from "../components/Stats/ShelvedBooks";
import AverageRating from "../components/Stats/AverageRating";
import Personas from "../components/Stats/Personas";
import { defaultIBookStats } from "../assets/data/defaultIBookStats";
import { useBookStats } from "../assets/hooks/useBookStats";
import BookshelfPage from "../components/Stats/BookshelfPage";
import { dummyBooks } from "../assets/data/dummydata";
import { getBookStats } from "../utils/bookStatsUtil";
import { BookStatsContext } from "../assets/hooks/BookStatsContext";

const Wrapper = styled.div`
  background-color: var(--black);
  height: 100vh;
  color: var(--yellow);
`;

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

interface Props {
  isPreview?: boolean;
}

export default function Wrap({ isPreview }: Props) {
  const [showWrapButton, setShowWrapButton] = useState(true);
  const { bookStats } = useBookStats();

  const sections = [
    { id: 1, Component: Section1, content: <PageBookCount /> },
    { id: 2, Component: Section2, content: <ShelvedBooks /> },
    { id: 3, Component: Section3, content: <AverageRating /> },
    { id: 4, Component: Section4, content: <Personas /> },
  ];

  if (showWrapButton) {
    return (
      <Wrapper>
        <CenterFullHeight>
          <WrapButton
            onClick={() => {
              setShowWrapButton(false);
            }}
          />
        </CenterFullHeight>
      </Wrapper>
    );
  } else {
    return (
      <div>
        <BookStatsContext.Provider
          value={isPreview ? getBookStats(dummyBooks) : bookStats}
        >
          {sections.map(({ id, Component, content }) => (
            <Component key={id}>{content}</Component>
          ))}
          <BookshelfPage />
        </BookStatsContext.Provider>
      </div>
    );
  }
}
