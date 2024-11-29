import { styled } from "@linaria/react";
import Badge from "./Badge";
import SawIcon from "../../assets/icons/Saw.svg";
import BookshelfIcon from "../../assets/icons/Bookshelf.svg";
import MustacheEyeglassIcon from "../../assets/icons/MustacheEyeglass.svg";
import MedalIcon from "../../assets/icons/Medal.svg";
import FistIcon from "../../assets/icons/Fist.svg";
import MusicNotesIcon from "../../assets/icons/MusicNotes.svg";
import BookIcon from "../../assets/icons/Book.svg";
import ArrowReloadIcon from "../../assets/icons/ArrowReload.svg";

const Wrapper = styled.div`
  height: 100vh;
  max-height: 700px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 80px 0;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: var(--sand);
  font-weight: bold;
  font-size: 2.5em;
  text-align: center;
  flex: 1;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: flex-start; */
  width: 60vw;
  max-width: 800px;
  gap: 12px;
`;

const CarpenterIcon = SawIcon;
const BingeReaderIcon = BookshelfIcon;
const OldTimeyIcon = MustacheEyeglassIcon;
const RereaderIcon = ArrowReloadIcon;
const MarathonReaderIcon = MedalIcon;
const NovellaEnthusiastIcon = BookIcon;
const NonconformistIcon = FistIcon;
const HarmonizerIcon = MusicNotesIcon;

const personas = [
  {
    title: "Carpenter",
    icon: CarpenterIcon,
    subtitle: "You've shelved {x} books across {y} bookshelves.",
  },
  {
    title: "Binge Reader",
    icon: BingeReaderIcon,
    subtitle: "You read your {x} books in less than a week.",
  },
  {
    title: "Old Timey",
    icon: OldTimeyIcon,
    subtitle: "Read {x} books from before the 20th century.",
  },
  {
    title: "Rereader",
    icon: RereaderIcon,
    subtitle: "You’ve reread {x} books.",
  },
  {
    title: "Marathon Reader",
    icon: MarathonReaderIcon,
    subtitle: "You’ve finished {x} books over 500 pages.",
  },
  {
    title: "Novella Enthusiast",
    icon: NovellaEnthusiastIcon,
    subtitle: "You’ve read {x} books under 150 pages.",
  },
  {
    title: "Nonconformist",
    icon: NonconformistIcon,
    subtitle: "How far your rating was from the rating by {x} amount.",
  },
  {
    title: "Harmonizer",
    icon: HarmonizerIcon,
    subtitle: "Your rating was generally very close to the rating.",
  },
];

export default function Personas() {
  return (
    <Wrapper>
      <Title>Personas</Title>
      <BadgeWrapper>
        <Badge {...personas[3]} delayMultiple={2} />
        <Badge {...personas[0]} delayMultiple={2} />
        <Badge {...personas[1]} delayMultiple={3} />
      </BadgeWrapper>
    </Wrapper>
  );
}
