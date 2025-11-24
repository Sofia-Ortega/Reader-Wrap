import { IBookStats } from "../../utils/types";

export const defaultIBookStats: IBookStats = {
  numOfPages: 0,
  numberOfBooks: -1,
  numberOfWordsEstimate: 0,
  shelvedBooksPerMonth: { read: new Array(12).fill(0) },
  ratings: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  averageRating: 0,
  personas: [],
  bookshelfBooks: [],
};
