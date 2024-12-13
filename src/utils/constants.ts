import { IPersona } from "./types";

import SawIcon from "../assets/icons/Saw.svg";
import BookshelfIcon from "../assets/icons/Bookshelf.svg";
import MustacheEyeglassIcon from "../assets/icons/MustacheEyeglass.svg";
import MedalIcon from "../assets/icons/Medal.svg";
import FistIcon from "../assets/icons/Fist.svg";
import MusicNotesIcon from "../assets/icons/MusicNotes.svg";
import BookIcon from "../assets/icons/Book.svg";
import ArrowReloadIcon from "../assets/icons/ArrowReload.svg";

export const LOCAL_STORAGE_KEY = "books";

const CarpenterIcon = SawIcon;
const BingeReaderIcon = BookshelfIcon;
const OldTimeyIcon = MustacheEyeglassIcon;
const RereaderIcon = ArrowReloadIcon;
const MarathonReaderIcon = MedalIcon;
const NovellaEnthusiastIcon = BookIcon;
const NonconformistIcon = FistIcon;
const HarmonizerIcon = MusicNotesIcon;

export const personas: IPersona[] = [
  {
    title: "Carpenter",
    icon: CarpenterIcon,
    subtitleTemplate: "You've shelved {x} books across {y} bookshelves.",
    getScore: (books) => {
      let score = 1;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Binge Reader",
    icon: BingeReaderIcon,
    subtitleTemplate: "You read your {x} books in less than a week.",
    getScore: (books) => {
      let score = 10;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Old Timey",
    icon: OldTimeyIcon,
    subtitleTemplate: "Read {x} books from before the 20th century.",
    getScore: (books) => {
      let score = 7;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Rereader",
    icon: RereaderIcon,
    subtitleTemplate: "You’ve reread {x} books.",
    getScore: (books) => {
      let score = 2;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Marathon Reader",
    icon: MarathonReaderIcon,
    subtitleTemplate: "You’ve finished {x} books over 500 pages.",
    getScore: (books) => {
      let score = -1;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Novella Enthusiast",
    icon: NovellaEnthusiastIcon,
    subtitleTemplate: "You’ve read {x} books under 150 pages.",
    getScore: (books) => {
      let score = 12;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Nonconformist",
    icon: NonconformistIcon,
    subtitleTemplate: "How far your rating was from the rating by {x} amount.",
    getScore: (books) => {
      let score = 130;
      let subtitle = "";

      return { score, subtitle };
    },
  },
  {
    title: "Harmonizer",
    icon: HarmonizerIcon,
    subtitleTemplate: "Your rating was generally very close to the rating.",
    getScore: (books) => {
      let score = 14;
      let subtitle = "";

      return { score, subtitle };
    },
  },
];
