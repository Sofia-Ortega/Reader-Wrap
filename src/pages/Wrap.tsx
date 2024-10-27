import { styled } from "@linaria/react";
import { Center } from "../components/global/Center";
import WrapButton from "../components/wrap/WrapButton";

const Wrapper = styled.div`
  background-color: var(--black);
  height: 100vh;
  color: var(--yellow);
`;

const CustomCenter = styled(Center)`
  height: 100%;
  flex-wrap: wrap;
`;

export default function Wrap() {
  return (
    <Wrapper>
      <CustomCenter>
        <WrapButton />
      </CustomCenter>
    </Wrapper>
  );
}
