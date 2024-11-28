import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const Title = styled.div`
  color: var(--sand);
  font-size: 1em;
  text-align: center;
`;

const Subtitle = styled.div`
  color: var(--brown-shadow);
  font-size: 0.5em;
  font-weight: normal;
  text-align: center;
  max-width: 225px;
`;

const BoldSubtitle = styled.div`
  color: var(--sand);
  font-weight: bold;
  display: inline;
`;

const BackgroundBox = styled.div`
  background-color: #8e5e46;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 16px;
  left: -16px;
`;

const Box = styled(motion.div)`
  background-color: var(--sand);
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const arrowImg = css`
  width: 100px;
  height: 100px;
`;

interface Props {
  icon: any;
  title: string;
  subtitle: string;
  delayMultiple?: number;
}

/**
 *
 * @param icon - import of an svg - will go into <img src={icon} />
 * @param subtitle Will bold any words wrapped within {}, stripping the brackets ie) {x} --> ~BOLD~ x ~BOLD~
 *
 */
export default function Badge({ icon, title, subtitle, delayMultiple }: Props) {
  const parsedSubtitle = subtitle.split(" ").map((word, index) => {
    return word.charAt(0) == "{" && word.charAt(word.length - 1) == "}" ? (
      <BoldSubtitle key={index}>
        {word.substring(1, word.length - 1) + " "}
      </BoldSubtitle>
    ) : (
      <span key={index}>{word + " "}</span>
    );
  });

  return (
    <Wrapper>
      <div style={{ position: "relative" }}>
        <BackgroundBox />
        <Box
          initial={{ x: -12, y: 12 }} // Start at the position of BackgroundBox
          animate={{ x: 0, y: 0 }} // Move to its final position
          transition={{
            duration: 0.5,
            delay: 0.5 + 0.1 * (delayMultiple ? delayMultiple : 1),
          }} // Customize duration as needed
        >
          <img src={icon} className={arrowImg} />
        </Box>
      </div>
      <div>
        <Title>{title}</Title>
        <Subtitle>{parsedSubtitle}</Subtitle>
      </div>
    </Wrapper>
  );
}
