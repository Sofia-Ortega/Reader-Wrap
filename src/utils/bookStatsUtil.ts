import { LOCAL_STORAGE_KEY, personas } from "./constants";
import {
  IBook,
  IBookLocalStorage,
  IBookStats,
  IRatingFrequency,
  IScoredPersona,
} from "./types";

class BookStatsUtil {
  parseBooksFromCSV = (data: any[]): IBook[] => {
    return data.map((item) => {
      return {
        bookId: item["Book Id"],
        title: item["Title"],
        author: item["Author"],
        authorLF: item["Author l-f"],
        additionalAuthors: item["Additional Authors"],
        isbn: item["ISBN"].replace(/^="|"$|"/g, ""),
        isbn13: item["ISBN13"].replace(/^="|"$|"/g, ""),
        myRating: Number(item["My Rating"]),
        averageRating: Number(item["Average Rating"]),
        publisher: item["Publisher"],
        binding: item["Binding"],
        numberOfPages: Number(item["Number of Pages"]),
        yearPublished: Number(item["Year Published"]),
        originalPublicationYear: Number(item["Original Publication Year"]),
        dateRead: item["Date Read"] ? new Date(item["Date Read"]) : null,
        dateAdded: new Date(item["Date Added"]),
        bookshelves:
          item["Bookshelves"].length === 0
            ? []
            : new String(item["Bookshelves"]).split(", "),
        bookshelvesWithPositions: item["Bookshelves with positions"],
        exclusiveShelf: item["Exclusive Shelf"],
        myReview: item["My Review"],
        spoiler: item["Spoiler"],
        privateNotes: item["Private Notes"],
        readCount: Number(item["Read Count"]),
        ownedCopies: Number(item["Owned Copies"]),
      };
    });
  };

  parseBooksFromLocalStorage = (data: IBookLocalStorage[]): IBook[] => {
    return data.map((item) => ({
      ...item,
      myRating: Number(item.myRating),
      averageRating: Number(item.averageRating),
      numberOfPages: Number(item.numberOfPages),
      yearPublished: Number(item.yearPublished),
      originalPublicationYear: Number(item.originalPublicationYear),
      dateRead: item.dateRead ? new Date(item.dateRead) : null,
      dateAdded: new Date(item.dateAdded),
      readCount: Number(item.readCount),
      ownedCopies: Number(item.ownedCopies),
    }));
  };

  getBookStats = (myBooks: IBook[]): IBookStats => {
    let totalPagesRead = 0;

    const booksRead = myBooks.filter((book) => book.dateRead);
    myBooks.forEach((book) => {
      totalPagesRead += book.numberOfPages;
    });

    const shelvedBooks: Record<string, number[]> = {};
    const currentYear = new Date().getFullYear();

    let ratings: IRatingFrequency = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const book of booksRead) {
      // if read this year
      if (book.dateRead?.getFullYear() == currentYear) {
        let monthNum = book.dateRead.getMonth();

        if (!shelvedBooks["read"]) {
          shelvedBooks["read"] = new Array(12).fill(0);
        }

        shelvedBooks["read"][monthNum]++;
      }

      // shelved
      let monthNum = book.dateAdded.getMonth();

      book.bookshelves.forEach((bookshelf) => {
        if (!shelvedBooks[bookshelf]) {
          shelvedBooks[bookshelf] = new Array(12).fill(0);
        }
        shelvedBooks[bookshelf][monthNum]++;
      });

      // rating
      if (book.myRating > 0 && book.myRating <= 5) {
        ratings[book.myRating as keyof IRatingFrequency]++;
      }
    }

    let stats: IBookStats = {
      numOfPages: totalPagesRead,
      numberOfBooks: booksRead.length,
      numberOfWordsEstimate: booksRead.length * 275,
      shelvedBooksPerMonth: shelvedBooks,
      ratings,
    };

    return stats;
  };

  calculatePersonasScore = (myBooks: IBook[]): IScoredPersona[] => {
    let scoredPersonas: IScoredPersona[] = personas.map((persona) => {
      return {
        title: persona.title,
        icon: persona.icon,
        ...persona.getScore(myBooks),
      };
    });

    scoredPersonas.sort((a, b) => b.score - a.score);

    return scoredPersonas;
  };

  getTop3Personas = (myBooks: IBook[]) => {
    let scoredPersonas = this.calculatePersonasScore(myBooks);
    let top3Personas: IScoredPersona[] = [];

    let ratingBadgePresent = false;
    for (const p of scoredPersonas) {
      if (top3Personas.length == 3) break;

      // can only be either "NonConformist" or "Harmonizer"
      if (p.title == "Nonconformist" || p.title == "Harmonizer") {
        if (ratingBadgePresent) continue;
        ratingBadgePresent = true;
      }

      top3Personas.push(p);
    }

    return top3Personas;
  };

  saveBooksToLocalStorage = (books: IBook[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  };

  readBooksFromLocalStorage = (): IBook[] | null => {
    let item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return null;

    let data = JSON.parse(item);

    return this.parseBooksFromLocalStorage(data);
  };
}
