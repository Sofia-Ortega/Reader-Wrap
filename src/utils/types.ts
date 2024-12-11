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
  bookshelves: string;
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
  dateAdded: Date | null;
  readCount: number;
  ownedCopies: number;
}

export interface IBookLocalStorage extends IBookBase {
  myRating: string;
  averageRating: string;
  numberOfPages: string;
  yearPublished: string;
  originalPublicationYear: string;
  dateRead: string | null;
  dateAdded: string | null;
  readCount: string;
  ownedCopies: string;
} 