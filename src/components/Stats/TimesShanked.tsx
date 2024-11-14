import { styled } from "@linaria/react";

const Wrapper = styled.div`
    height: 100vh;
    max-height: 700px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--dark-rose);
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
    height: 170px;
    position: relative;
`;

const Bar = styled.div<{ height: number }>`
    width: 44px;
    background-color: var(--sand);
    height: ${(props) => props.height}px;
    border-radius: 3px;
`;

export default function AverageRating() {
    const ratings = { 1: 3, 2: 5, 3: 10, 4: 7, 5: 2 };
    const frequencies = [1, 2, 3, 4, 5].map(
        (rating) => ratings[rating as keyof typeof ratings] || 0
    ); // dumb fix for index error

    let totalRatings = 0;
    let totalVotes = 0;

    Object.keys(ratings).forEach((key) => {
        const rating = parseInt(key, 10); // we make the string index into an int!!! whoooo
        const frequency = ratings[rating as keyof typeof ratings];
        totalRatings += rating * frequency;
        totalVotes += frequency;
    });

    const averageRating = totalVotes > 0 ? totalRatings / totalVotes : 0;

    const maxBarHeight = 130;
    const maxFrequency = Math.max(...frequencies);

    const currentYear = new Date().getFullYear();

    return (
        <Wrapper>
            <Title>Average {currentYear} Rating</Title>
            <RatingValue>{averageRating.toFixed(1)}</RatingValue>
            <BarChartWrapper>
                {frequencies.map((freq, index) => (
                    <div
                        key={index}
                        style={{ textAlign: "center", width: "44px" }}
                    >
                        <Bar height={(freq / maxFrequency) * maxBarHeight} />
                        <span style={{ color: "var(--sand)" }}>
                            {index + 1}
                        </span>
                    </div>
                ))}
                <button
                    onClick={() => window.open("https://i.pinimg.com/736x/59/9e/53/599e53032084b72fa762270a8f2649c7.jpg", "_blank")}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                >
                    <img
                        src="https://i.pinimg.com/736x/59/9e/53/599e53032084b72fa762270a8f2649c7.jpg"
                        style={{ width: "5px", height: "auto", opacity: "50%", mixBlendMode: "multiply" }}
                        alt="Clickable image"
                    />
                </button>

            </BarChartWrapper>
            

        </Wrapper>
    );
}
