import { styled } from "@linaria/react";
import { Center } from "../components/global/Center";
import WrapButton from "../components/wrap/WrapButton";
import { useContext } from "react";
import { PageContext } from "../App";
import { CenterFullHeight } from "../components/global/CenterFullHeight";

const Wrapper = styled.div`
  background-color: var(--black);
  height: 100vh;
  color: var(--yellow);
`;

export default function Wrap() {
  const setShowPage = useContext(PageContext);

  return (
    <Wrapper>
      <CenterFullHeight>
        <WrapButton
          onClick={() => {
            setShowPage("Stats");
          }}
        />
      </CenterFullHeight>
    </Wrapper>
  );
}
