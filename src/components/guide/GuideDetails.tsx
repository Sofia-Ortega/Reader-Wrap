import { styled } from "@linaria/react";
import Button from "../global/Button";
import { Center } from "../global/Center";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { PageContext } from "../../App";
import { IBook } from "../../utils/types";
import { parse } from "papaparse";
import {
  parseBooksFromCSV,
  saveBooksToLocalStorage,
} from "../../utils/bookStatsUtil";
import { CURRENT_YEAR } from "../../utils/constants";

const Link = styled.a`
  color: var(--blue);
  display: inline-block;
  text-decoration: underline;
  font-weight: bold;

  transition: transform 0.2s ease;
  &:hover {
    transform: translate(2px, -2px);
  }
`;

const Wrapper = styled(Center)`
  flex-direction: column;
  max-width: 400px;
  text-align: center;
  gap: 12px;
`;

const Details = styled.div`
  font-size: 20px;
`;

interface Props {
  slide: number;
  handleSetBooks: (myBooks: IBook[]) => void;
}

export default function GuideDetails({ slide, handleSetBooks }: Props) {
  const setShowPage = useContext(PageContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected");
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setLoading(true);
      const csvData = reader.result as string;
      parse(csvData, {
        header: true,
        delimiter: ",",
        skipEmptyLines: true,
        complete: (result) => {
          const myParsedBooks = parseBooksFromCSV(result.data);
          let currentYearParsedBooks = myParsedBooks.filter(
            (b) =>
              b.dateRead?.getFullYear() == CURRENT_YEAR ||
              b.dateAdded?.getFullYear() == CURRENT_YEAR
          );

          handleSetBooks(currentYearParsedBooks);
          saveBooksToLocalStorage(currentYearParsedBooks);
          setLoading(false);
          setShowPage("Wrap");
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (slide == 1) {
    return (
      <Wrapper>
        <Details>
          Go to Goodreads{" "}
          <Link href="https://www.goodreads.com/review/import" target="__blank">
            Export Link
          </Link>{" "}
          and Click <b>"Export Library"</b>
        </Details>
        <Center>
          <Button>
            <a href="https://www.goodreads.com/review/import" target="__blank">
              <div>GO TO EXPORT LINK</div>
            </a>
          </Button>
        </Center>
      </Wrapper>
    );
  } else if (slide == 2) {
    return (
      <Wrapper>
        <Details>
          Click on <b>Your export</b> to download <b>library_export.csv</b>
        </Details>
      </Wrapper>
    );
  } else if (slide == 3) {
    return (
      <Wrapper>
        <Details>
          Upload downloaded <b>library_export.cvv</b>
        </Details>
        <Center>
          <Button secondary onClick={handleUploadClick}>
            Upload
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </Center>
      </Wrapper>
    );
  }
}
