import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IBook, IBookStats, PageType } from "./utils/types";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Header from "./components/global/Header";
import Wrap from "./pages/Wrap";
import Stats from "./pages/Stats";
import AnimationTest from "./pages/AnimationTest";
import BookshelfPage from "./pages/BookshelfPage";
import { getBookStats } from "./utils/bookStatsUtil";

const defaultIBookStats: IBookStats = {
  numOfPages: 0,
  numberOfBooks: 0,
  numberOfWordsEstimate: 0,
  shelvedBooksPerMonth: { read: new Array(12).fill(0) },
  ratings: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  personas: [],
  bookshelfBooks: [],
};

export const PageContext = createContext<Dispatch<SetStateAction<PageType>>>(
  () => {}
);

export const BookStatsContext = createContext<IBookStats>(defaultIBookStats);

function App() {
  const [showPage, setShowPage] = useState<PageType>("Home");
  const [bookStats, setBookStats] = useState<IBookStats>(defaultIBookStats);

  const handleSetBooks = (myBooks: IBook[]) => {
    setBookStats({ ...getBookStats(myBooks) });
  };

  const pageComponents: Record<PageType, ReactNode> = {
    Test: <AnimationTest />,
    Home: <Home handleSetBooks={handleSetBooks} />,
    Guide: <Guide handleSetBooks={handleSetBooks} />,
    Wrap: <Wrap />,
    Stats: (
      <BookStatsContext.Provider value={bookStats}>
        <Stats />
      </BookStatsContext.Provider>
    ),
    Bookshelf: <BookshelfPage />,
  };

  return (
    <PageContext.Provider value={setShowPage}>
      {showPage != "Wrap" &&
        showPage != "Stats" &&
        showPage != "Test" &&
        showPage != "Bookshelf" && (
          <Header showSubtitle={showPage === "Home"} />
        )}
      {pageComponents[showPage] || <Home handleSetBooks={handleSetBooks} />}
    </PageContext.Provider>
  );
}

export default App;
