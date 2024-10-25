import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PageType } from "./utils/types";
import Home from "./pages/Home";
import Guide from "./pages/Guide";

export const PageContext = createContext<Dispatch<SetStateAction<PageType>>>(
  () => {}
);

function App() {
  const [showPage, setShowPage] = useState<PageType>("Home");

  function getPageComponent() {
    if (!showPage || showPage == "Home") {
      return <Home />;
    } else if (showPage == "Guide") {
      return <Guide />;
    }
  }

  return (
    <PageContext.Provider value={setShowPage}>
      {getPageComponent()}
    </PageContext.Provider>
  );
}

export default App;
