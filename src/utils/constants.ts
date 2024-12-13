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
    getScore: (books) => {
      const WEIGHT = 1;

      const uniqueBookshelves = books.reduce((acc, book) => {
        book.bookshelves.forEach((bookshelf) => acc.add(bookshelf));
        return acc;
      }, new Set());

      let numOfBooks = books.length;
      let numOfBookshelves = uniqueBookshelves.size;

      const subtitle = `You've shelved ${numOfBooks} books across ${numOfBookshelves} bookshelves.`;
      const score = numOfBookshelves * WEIGHT;

      return { score, subtitle };
    },
  },
  {
    title: "Binge Reader",
    icon: BingeReaderIcon,
    getScore: (books) => {
      const WEIGHT = 2;

      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      let numOfBooks = books.filter(
        (book) =>
          book.dateRead &&
          book.dateRead.getTime() - book.dateAdded.getTime() < oneWeekInMs
      ).length;
      const subtitle = `You read your ${numOfBooks} books in less than a week since adding them to goodreads`;

      const score = numOfBooks * WEIGHT;
      return { score, subtitle };
    },
  },
  {
    title: "Old Timey",
    icon: OldTimeyIcon,
    getScore: (books) => {
      const WEIGHT = 1;

      let numOfBooks = books.filter(
        (book) => book.dateRead && book.yearPublished <= 1900
      ).length;

      const subtitle = `Read ${numOfBooks} books from before the 20th century.`;

      const score = numOfBooks * WEIGHT;
      return { score, subtitle };
    },
  },
  {
    title: "Rereader",
    icon: RereaderIcon,
    getScore: (books) => {
      const WEIGHT = 1;

      let numOfBooks = books.filter(
        (book) => book.dateRead && book.readCount > 1
      ).length;

      const subtitle = `You’ve reread ${numOfBooks} books.`;

      const score = 2 * WEIGHT;
      return { score, subtitle };
    },
  },
  {
    title: "Marathon Reader",
    icon: MarathonReaderIcon,
    getScore: (books) => {
      const WEIGHT = 3;

      let numOfBooks = books.filter(
        (book) => book.dateRead && book.numberOfPages > 500
      ).length;

      const subtitle = `You’ve finished ${numOfBooks} books over 500 pages.`;

      let score = numOfBooks * WEIGHT;
      return { score, subtitle };
    },
  },
  {
    title: "Novella Enthusiast",
    icon: NovellaEnthusiastIcon,
    getScore: (books) => {
      const WEIGHT = 3;

      let numOfBooks = books.filter(
        (book) => book.dateRead && book.numberOfPages < 150
      ).length;

      const subtitle = `You’ve read ${numOfBooks} books under 150 pages.`;
      let score = numOfBooks * WEIGHT;
      return { score, subtitle };
    },
  },
  {
    title: "Nonconformist",
    icon: NonconformistIcon,
    getScore: (books) => {
      let WEIGHT = 2;

      let totalDifference = 0;
      let count = 0;

      books.forEach((book) => {
        if (book.dateRead && book.myRating && book.averageRating) {
          totalDifference += Math.abs(book.myRating - book.averageRating);
          count++;
        }
      });

      const averageDifference = count > 0 ? totalDifference / count : 0;

      const subtitle = `Your rating differed from the average rating by ${averageDifference.toFixed(
        2
      )} points.`;

      if (averageDifference > 3) WEIGHT = 100;

      const score = averageDifference * WEIGHT;

      return { score, subtitle };
    },
  },
  {
    title: "Harmonizer",
    icon: HarmonizerIcon,
    subtitleTemplate: "Your rating was generally very close to the rating.",
    getScore: (books) => {
      let WEIGHT = 2;

      let totalDifference = 0;
      let count = 0;

      books.forEach((book) => {
        if (book.dateRead && book.myRating && book.averageRating) {
          totalDifference += Math.abs(book.myRating - book.averageRating);
          count++;
        }
      });

      const averageDifference = count > 0 ? totalDifference / count : 0;

      if (averageDifference < 1) WEIGHT = 100;

      const score = (5 - averageDifference) * WEIGHT;
      const subtitle = `Your rating was generally very close to the average rating, with an average difference of ${averageDifference.toFixed(
        2
      )} points.`;

      return { score, subtitle };
    },
  },
];
