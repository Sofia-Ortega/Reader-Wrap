import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Wrap from "./pages/Wrap";
import Header from "./components/global/Header";
import { IBook } from "./utils/types";
import Layout from "./components/global/Layout";
import Stats from "./pages/Stats";

function NewApp() {
  const handleSetBooks = (myBooks: IBook[] | null) => {
    if (myBooks == null) {
      return;
    }

    console.log(myBooks);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout showSubtitle />}>
          <Route path="/" element={<Home handleSetBooks={handleSetBooks} />} />
          <Route
            path="/guide"
            element={<Guide handleSetBooks={handleSetBooks} />}
          />
        </Route>
        {/* <Route path="/preview" element={<Preview />} */}
        <Route path="wrap" element={<Wrap />} />
        <Route path="stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NewApp;
