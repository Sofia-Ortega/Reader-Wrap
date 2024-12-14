import { styled } from "@linaria/react";
import { motion, Variants } from "framer-motion";
import { useContext } from "react";
import { BookStatsContext } from "../../App";

const Wrapper = styled.div`
  height: 100vh;
  max-height: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  color: var(--sand);
  font-weight: normal;
  font-size: 2em;
  text-align: center;
`;

const RatingValue = styled.div`
  color: var(--sand);
  font-weight: bold;
  font-size: 5em;
  text-align: center;
`;

const BarChartWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  position: relative;
`;

const Bar = styled(motion.div)`
  width: 80px;
  background-color: var(--sand);
  border-radius: 3px;
  transform-origin: bottom;
`;

export default function AverageRating() {
  const bookStats = useContext(BookStatsContext);
  const ratings = bookStats.ratings;
  const frequencies = [1, 2, 3, 4, 5].map(
    (rating) => ratings[rating as keyof typeof ratings] || 0
  );

  let totalRatings = 0;
  let totalVotes = 0;

  Object.keys(ratings).forEach((key) => {
    const rating = parseInt(key, 10); // we make the string index into an int!!! whoooo
    const frequency = ratings[rating as keyof typeof ratings];
    totalRatings += rating * frequency;
    totalVotes += frequency;
  });

  const averageRating = totalVotes > 0 ? totalRatings / totalVotes : 0;

  const maxBarHeight = 200;
  const maxFrequency = Math.max(...frequencies);

  const currentYear = new Date().getFullYear();

  const barVariants: Variants = {
    offscreen: { scaleY: 0 },
    onscreen: (custom) => ({
      scaleY: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8 + custom * 0.5, // Base duration plus a factor based on relative height
      },
    }),
  };

  return (
    <Wrapper>
      <Title>Average {currentYear} Rating</Title>
      <RatingValue>{averageRating.toFixed(1)}</RatingValue>
      <BarChartWrapper>
        {frequencies.map((freq, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <Bar
                variants={barVariants}
                custom={freq / maxFrequency}
                style={{ height: `${(freq / maxFrequency) * maxBarHeight}px` }}
              />
            </motion.div>
            <span style={{ color: "var(--sand)" }}>{index + 1}</span>
          </div>
        ))}
      </BarChartWrapper>
    </Wrapper>
  );
}
