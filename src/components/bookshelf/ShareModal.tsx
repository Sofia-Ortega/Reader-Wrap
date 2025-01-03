import { styled } from "@linaria/react";
import ShareScreenshot from "./ShareScreenshot";
import { IDisplayBook } from "../../utils/types";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import DownloadIcon from "../../assets/icons/Download.svg";
import { css } from "@linaria/core";
import Button from "../global/Button";
import { motion } from "framer-motion";

const Modal = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 32px;
`;

const downloadIcon = css`
  width: 30px;
  height: 30px;
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ExitButton = styled.div`
  position: absolute;
  height: 100x;
  width: 100px;
  color: var(--sand);
  font-size: 48px;
  top: 0px;
  right: -40px;
  cursor: pointer;
`;

const modalContentAnimation = {
  initial: { y: "-10vh", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100vh", opacity: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

interface Props {
  books: IDisplayBook[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ShareModal({ books, open, setOpen }: Props) {
  const screenshotRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (screenshotRef.current) {
      const dataUrl = await toPng(screenshotRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "readerwrap.png";
      link.click();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return <></>;

  return (
    <Modal onClick={handleClose}>
      <ExitButton onClick={handleClose}>X</ExitButton>
      <motion.div
        initial={modalContentAnimation.initial}
        animate={modalContentAnimation.animate}
        exit={modalContentAnimation.exit}
        transition={modalContentAnimation.transition}
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        <ModalContent>
          <ShareScreenshot books={books} ref={screenshotRef} />
          <Button secondary onClick={handleDownload}>
            <ButtonContent>
              <div>Download</div>
              <img src={DownloadIcon} className={downloadIcon} />
            </ButtonContent>
          </Button>
        </ModalContent>
      </motion.div>
    </Modal>
  );
}
