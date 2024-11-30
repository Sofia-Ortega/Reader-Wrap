import { styled } from "@linaria/react";
import Button from "../global/Button";
import { Center } from "../global/Center";
import { useContext } from "react";
import { PageContext } from "../../App";

interface Props {
  slide: number;
}

const Link = styled.a`
  color: var(--blue);
  display: inline-block;
  text-decoration: underline;
  font-weight: bold;

  transition: transform 0.2s ease;
  &:hover {
    transform: translate(2px, -2px);
  }
`;

const Wrapper = styled(Center)`
  flex-direction: column;
  max-width: 400px;
  text-align: center;
  gap: 12px;
`;

const Details = styled.div`
  font-size: 20px;
`;

export default function GuideDetails({ slide }: Props) {
  const setShowPage = useContext(PageContext);

  if (slide == 1) {
    return (
      <Wrapper>
        <Details>
          Go to Goodreads{" "}
          <Link href="https://www.goodreads.com/review/import" target="__blank">
            Export Link
          </Link>{" "}
          and Click <b>"Export Library"</b>
        </Details>
        <Center>
          <Button>
            <a href="https://www.goodreads.com/review/import" target="__blank">
              <div>GO TO EXPORT LINK</div>
            </a>
          </Button>
        </Center>
      </Wrapper>
    );
  } else if (slide == 2) {
    return (
      <Wrapper>
        <Details>
          Click on <b>Your export</b> to download <b>library_export.csv</b>
        </Details>
      </Wrapper>
    );
  } else if (slide == 3) {
    return (
      <Wrapper>
        <Details>
          Upload downloaded <b>library_export.cvv</b>
        </Details>
        <Center>
          <Button secondary onClick={() => setShowPage("Wrap")}>
            Upload
          </Button>
        </Center>
      </Wrapper>
    );
  }
}
