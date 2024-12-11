import { styled } from "@linaria/react";
import Button from "../components/global/Button";
import { useEffect, useRef, useState } from "react";
import { parse } from "papaparse";
import { IBook, IBookLocalStorage, IBookStats } from "../utils/types";
import { LOCAL_STORAGE_KEY } from "../utils/constants";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 12px;
`;

export default function AnimationTest() {
  const [parsedData, setParsedData] = useState<IBook[]>([]);

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
        isbn: item["ISBN"].replace(/^="|"$|"/g, ""), // Clean up ="" wrapping if needed
        isbn13: item["ISBN13"].replace(/^="|"$|"/g, ""), // Clean up ="" wrapping if needed
        myRating: Number(item["My Rating"]),
        averageRating: Number(item["Average Rating"]),
        publisher: item["Publisher"],
        binding: item["Binding"],
        numberOfPages: Number(item["Number of Pages"]),
        yearPublished: Number(item["Year Published"]),
        originalPublicationYear: Number(item["Original Publication Year"]),
        dateRead: item["Date Read"] ? new Date(item["Date Read"]) : null,
        dateAdded: item["Date Added"] ? new Date(item["Date Added"]) : null,
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
      dateAdded: item.dateAdded ? new Date(item.dateAdded) : null,
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
    console.log("filing2");
    reader.onload = () => {
      const csvData = reader.result as string;
      parse(csvData, {
        header: true,
        delimiter: ",",
        skipEmptyLines: true,
        complete: (result) => {
          console.log("COMPLETE");

          const currentYear = new Date().getFullYear();
          const parsedBooks = parseBooksFromCSV(result.data);
          let currentYearParsedBooks = parsedBooks.filter(
            (b) =>
              b.dateRead?.getFullYear() == currentYear ||
              b.dateAdded?.getFullYear() == currentYear
          );

          setParsedData(parsedBooks); // FIXME: shold bw currentYearParsedBooks
          console.log(parsedBooks);
        },
        error: (err: Error) => {
          setError(err.message);
        },
      });
    };

    reader.onerror = () => {
      setError("Failed to read file");
    };

    console.log("about to read");
    reader.readAsText(file);
  };

  const currentYearBookStats = (): IBookStats => {
    let totalPagesRead = 0;

    const booksRead = parsedData.filter((book) => book.dateRead);
    parsedData.forEach((book) => {
      totalPagesRead += book.numberOfPages;
    });

    console.log(
      "books read:",
      booksRead.map((b) => {
        return {
          title: b.title,
          author: b.author,
          numOfPages: b.numberOfPages,
        };
      })
    );

    const shelvedBooks: Record<string, number[]> = {};
    const currentYear = new Date().getFullYear();
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
      // FIXME: fill in
    }

    let stats: IBookStats = {
      numOfPages: totalPagesRead,
      numberOfBooks: booksRead.length,
      numberOfWordsEstimate: booksRead.length * 275,
      shelvedBooksPerMonth: { hey: [2] },
      ratings: { 1: 3, 2: 5, 3: 10, 4: 7, 5: 2 },
    };

    return stats;
  };

  const saveBooksToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
    console.log("saved");
  };

  const readBooksFromLocalStorage = () => {
    let item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return;

    let data = JSON.parse(item);

    console.log("read from localstorage:", data);
    console.log("parsed:", parseBooksFromLocalStorage(data));
    setParsedData(parseBooksFromLocalStorage(data));
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
      {parsedData.length > 0 && (
        <div>
          <div>
            <h2>Stats</h2>
            <pre>{JSON.stringify(currentYearBookStats(), null, 2)}</pre>
          </div>
          <div>
            <h2>Parsed Data</h2>
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}
