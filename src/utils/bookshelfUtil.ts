import { IDisplayBook } from "./types";

/**
 *
 * @param books books that want to display
 * @param maxWidth width of bookshelf
 * @returns chunked books that are within the width of the bookshelf
 */
export const getChunkedBooks = (
  books: IDisplayBook[],
  maxWidth: number
): IDisplayBook[][] => {
  let chunks: IDisplayBook[][] = [];

  let currentWidth = 0;
  let oneBookshelf: IDisplayBook[] = [];
  for (const book of books) {
    currentWidth += parseInt(book.width);
    if (currentWidth > maxWidth && oneBookshelf.length > 1) {
      chunks.push(oneBookshelf);
      oneBookshelf = [];
      currentWidth = parseInt(book.width);
    }

    oneBookshelf.push(book);
  }

  chunks.push(oneBookshelf);

  return chunks;
};
