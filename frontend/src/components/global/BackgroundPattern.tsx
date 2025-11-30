import { styled } from "@linaria/react";
import bookIcon from "../../assets/icons/Book.svg";

const PatternContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background-color: var(--sand);

  /* Noise Texture */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4; /* Adjust for visibility */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    z-index: 0;
    mix-blend-mode: overlay;
  }
  
  /* Pattern Layer */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bookIcon});
    background-repeat: repeat;
    background-size: 80px; /* Smaller size for better pattern */
    opacity: 0.03; 
    background-position: 0 0;
    z-index: 1;
    /* Create a diagonal offset for the pattern */
    transform: rotate(-5deg) scale(1.5);
  }
`;

export default function BackgroundPattern() {
  return <PatternContainer />;
}

