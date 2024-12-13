export type PageType =
  | "Home"
  | "Guide"
  | "Wrap"
  | "Stats"
  | "Test"
  | "Bookshelf";

interface IBookBase {
  bookId: string;
  title: string;
  author: string;
  authorLF: string;
  additionalAuthors: string;
  isbn: string;
  isbn13: string;
  publisher: string;
  binding: string;
  bookshelves: string[];
  bookshelvesWithPositions: string;
  exclusiveShelf: string;
  myReview: string;
  spoiler: string;
  privateNotes: string;
}
export interface IBook extends IBookBase {
  myRating: number;
  averageRating: number;
  numberOfPages: number;
  yearPublished: number;
  originalPublicationYear: number;
  dateRead: Date | null;
  dateAdded: Date;
  readCount: number;
  ownedCopies: number;
}

export interface IBookLocalStorage extends IBookBase {
  myRating: number;
  averageRating: string;
  numberOfPages: string;
  yearPublished: string;
  originalPublicationYear: string;
  dateRead: string | null;
  dateAdded: string;
  readCount: string;
  ownedCopies: string;
}

export interface IRatingFrequency {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface IBookStats {
  numOfPages: number;
  numberOfBooks: number;
  numberOfWordsEstimate: number;
  shelvedBooksPerMonth: Record<string, number[]>; // bookshelfName: [books per month, ...]
  ratings: IRatingFrequency;
}

export interface IScoreResult {
  score: number;
  subtitle: string;
}

export interface IPersona {
  title: string;
  icon: any;
  subtitleTemplate?: string;
  getScore: (books: IBook[]) => IScoreResult;
}

export interface IScoredPersona {
  title: string;
  icon: any;
  subtitle: string;
  score: number;
}
