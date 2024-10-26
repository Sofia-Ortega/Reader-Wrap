import { styled } from "@linaria/react";
import Button from "../global/Button";
import { Center } from "../global/Center";

interface Props {
  slide: number;
}

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
  if (slide == 1) {
    return (
      <Wrapper>
        <Details>
          Go to Goodreads <a>Export Link</a> and Click <b>"Export Library"</b>
        </Details>
        <Center>
          <Button name="GO TO EXPORT LINK" />
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
          <Button name="Upload" />
        </Center>
      </Wrapper>
    );
  }
}
