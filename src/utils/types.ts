export type PageType =
  | "Home"
  | "Guide"
  | "Wrap"
  | "Stats"
  | "Test"
  | "Bookshelf";

export interface IBook {
  bookId: string;
  title: string;
  author: string;
  authorLF: string;
  additionalAuthors: string;
  isbn: string;
  isbn13: string;
  myRating: number;
  averageRating: number;
  publisher: string;
  binding: string;
  numberOfPages: number;
  yearPublished: number;
  originalPublicationYear: number;
  dateRead: string; // Use Date if you'll parse this into a date object
  dateAdded: string; // Same as above
  bookshelves: string;
  bookshelvesWithPositions: string;
  exclusiveShelf: string;
  myReview: string;
  spoiler: string;
  privateNotes: string;
  readCount: number;
  ownedCopies: number;
}
