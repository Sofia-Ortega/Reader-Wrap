import { styled } from "@linaria/react";
import Button from "../components/global/Button";
import { useRef, useState } from "react";
import { parse } from "papaparse";
import { IBook } from "../utils/types";

export default function AnimationTest() {
  const [parsedData, setParsedData] = useState<IBook[]>([]);

  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  function parseBooks(data: any[]): IBook[] {
    return data.map((item) => ({
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
      bookshelves: item["Bookshelves"],
      bookshelvesWithPositions: item["Bookshelves with positions"],
      exclusiveShelf: item["Exclusive Shelf"],
      myReview: item["My Review"],
      spoiler: item["Spoiler"],
      privateNotes: item["Private Notes"],
      readCount: Number(item["Read Count"]),
      ownedCopies: Number(item["Owned Copies"]),
    }));
  }

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

          let myParsedBooks = parseBooks(result.data);
          setParsedData(myParsedBooks);
          console.log(myParsedBooks);
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

  const currentYearBookStats = () => {
    let totalPagesRead = 0;

    const currentYear = new Date().getFullYear() - 1;
    const currentYearBooks = parsedData.filter(
      (book) => book.dateRead && book.dateRead.getFullYear() == currentYear
    );
    currentYearBooks.forEach((book) => {
      totalPagesRead += book.numberOfPages;
    });

    return {
      totalPagesRead,
      numOfBooks: currentYearBooks.length,
      numOfWords: currentYearBooks.length * 275,
    };
  };
  return (
    <>
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
