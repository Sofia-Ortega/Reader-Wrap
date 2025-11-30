import { BookStatsContext } from "../assets/hooks/BookStatsContext";
import { useBookStats } from "../assets/hooks/useBookStats";
import BookshelfPage from "../components/Stats/BookshelfPage";
import BackgroundPattern from "../components/global/BackgroundPattern";

function BookshelfPageWrapper() {
  const { bookStats } = useBookStats();

  return (
    <BookStatsContext.Provider value={bookStats}>
      <BackgroundPattern />
      <BookshelfPage />
    </BookStatsContext.Provider>
  );
}

export default BookshelfPageWrapper;
