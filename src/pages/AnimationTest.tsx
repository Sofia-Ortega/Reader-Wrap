import { styled } from "@linaria/react";
import { AnimatePresence, motion } from "framer-motion";
import { Center } from "../components/global/Center";
import { CenterFullHeight } from "../components/global/CenterFullHeight";
import { useEffect, useState } from "react";

const Box = styled.div`
  width: 100px;
  height: 100px;
  /* border-radius: 50%; */
  background-color: var(--blue);
  box-sizing: border-box;
`;

const Section = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 32px;
  position: absolute;
`;

const Section1 = styled(Section)`
  background-color: var(--yellow);
  color: var(--dark-rose);
`;

const Section2 = styled(Section)`
  background-color: var(--dark-brown);
  color: var(--sand);
  /* top: 100vh; */
`;

const Section3 = styled(Section)`
  background-color: var(--dark-rose);
  color: var(--yellow);
  top: 100vh;
`;

export default function AnimationTest() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
        className="App"
        style={{ fontSize: 100 }}
        key={seconds}
      >
        {seconds}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div>
      <motion.div
        initial={{ y: "0" }}
        whileInView={{ y: -100 }}
        viewport={{ once: true }}
      >
        <Section1>Section 1</Section1>
      </motion.div>
      <motion.div
        initial={{ y: "100vw" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
      >
        <Section2>Section 2</Section2>
      </motion.div>
      {/* <Section3>Section 3</Section3> */}
    </div>
  );
}
