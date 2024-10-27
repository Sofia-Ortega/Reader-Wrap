import { useState } from "react";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { motion, AnimatePresence } from "framer-motion";
import PageBookCount from "../components/Stats/PageBookCount";

const AppWrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  position: relative;
`;

const Section = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
`;

const Section1 = styled(Section)`
  background-color: var(--yellow);
  color: var(--dark-rose);
`;

const Section2 = styled(Section)`
  background-color: var(--dark-rose);
`;

const Section3 = styled(Section)`
  background-color: #1e90ff;
`;

const sections = [
  { id: 1, Component: Section1, content: "Section 1" },
  { id: 2, Component: Section2, content: "Section 2" },
  { id: 3, Component: Section3, content: "Section 3" },
];

export default function Stats() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleScroll = (direction: number) => {
    setCurrentSection((prev) => {
      const nextIndex = prev + direction;
      if (nextIndex < 0 || nextIndex >= sections.length) return prev;
      return nextIndex;
    });
  };

  return (
    <AppWrapper onWheel={(e) => handleScroll(e.deltaY > 0 ? 1 : -1)}>
      <AnimatePresence initial={false}>
        {sections.map(({ id, Component, content }, index) =>
          index === currentSection ? (
            <Component
              key={id}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {content}
            </Component>
          ) : null
        )}
      </AnimatePresence>
    </AppWrapper>
  );
}
