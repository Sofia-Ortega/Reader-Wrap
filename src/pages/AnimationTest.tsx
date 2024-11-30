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
          setParsedData(result.data as IBook[]);
          console.log("Parsed Data:", result.data);
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
          <h2>Parsed Data</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
