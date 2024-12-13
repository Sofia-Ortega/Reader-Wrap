import { styled } from "@linaria/react";
import Button from "../components/global/Button";
import { useEffect, useRef, useState } from "react";
import { parse } from "papaparse";
import {
  IBook,
  IBookLocalStorage,
  IBookStats,
  IRatingFrequency,
} from "../utils/types";
import { LOCAL_STORAGE_KEY } from "../utils/constants";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 12px;
`;

export default function AnimationTest() {
  const [books, setBooks] = useState<IBook[]>([]);

  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const parseBooksFromCSV = (data: any[]): IBook[] => {
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

  const parseBooksFromLocalStorage = (data: IBookLocalStorage[]): IBook[] => {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("filing");
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected");
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result as string;
      parse(csvData, {
        header: true,
        delimiter: ",",
        skipEmptyLines: true,
        complete: (result) => {
          const currentYear = new Date().getFullYear();
          const myParsedBooks = parseBooksFromCSV(result.data);
          let currentYearParsedBooks = myParsedBooks.filter(
            (b) =>
              b.dateRead?.getFullYear() == currentYear ||
              b.dateAdded?.getFullYear() == currentYear
          );

          setBooks(currentYearParsedBooks);
        },
        error: (err: Error) => {
          setError(err.message);
        },
      });
    };

    reader.onerror = () => {
      setError("Failed to read file");
    };

    reader.readAsText(file);
  };

  const getBookStats = (myBooks: IBook[]): IBookStats => {
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

  const saveBooksToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  };

  const readBooksFromLocalStorage = () => {
    let item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return;

    let data = JSON.parse(item);

    setBooks(parseBooksFromLocalStorage(data));
  };

  return (
    <>
      <ButtonWrapper>
        <Button secondary onClick={handleClick}>
          Upload
        </Button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <Button
          onClick={() => {
            saveBooksToLocalStorage();
          }}
        >
          Save to Local Storage
        </Button>
        <Button
          onClick={() => {
            readBooksFromLocalStorage();
          }}
        >
          Read from Local Storage
        </Button>
      </ButtonWrapper>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {books.length > 0 && (
        <div>
          <div>
            <h2>Stats</h2>
            <pre>{JSON.stringify(getBookStats(books), null, 2)}</pre>
          </div>
          <div>
            <h2>Parsed Data</h2>
            <pre>{JSON.stringify(books, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}
