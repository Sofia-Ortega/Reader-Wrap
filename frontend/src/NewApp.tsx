import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Wrap from "./pages/Wrap";
import { IBook } from "./utils/types";
import Layout from "./components/global/Layout";
import BookshelfPageWrapper from "./pages/BookshelfPageWrapper";

function NewApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout showSubtitle />}>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
        </Route>
        <Route path="/preview" element={<Wrap isPreview />} />
        <Route path="/wrap" element={<Wrap />} />
        <Route path="/bookshelf" element={<BookshelfPageWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NewApp;
