import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { PageType } from "./utils/types";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Header from "./components/global/Header";
import Wrap from "./pages/Wrap";
import Stats from "./pages/Stats";

export const PageContext = createContext<Dispatch<SetStateAction<PageType>>>(
  () => {}
);

function App() {
  const [showPage, setShowPage] = useState<PageType>("Stats");

  const pageComponents: Record<PageType, ReactNode> = {
    Home: <Home />,
    Guide: <Guide />,
    Wrap: <Wrap />,
    Stats: <Stats />,
  };

  return (
    <PageContext.Provider value={setShowPage}>
      {showPage != "Wrap" && showPage != "Stats" && (
        <Header showSubtitle={showPage === "Home"} />
      )}
      {pageComponents[showPage] || <Home />}
    </PageContext.Provider>
  );
}

export default App;
