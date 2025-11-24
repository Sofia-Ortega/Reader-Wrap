import { BookStatsContext } from "../assets/hooks/BookStatsContext";
import { useBookStats } from "../assets/hooks/useBookStats";
import BookshelfPage from "../components/Stats/BookshelfPage";

function BookshelfPageWrapper() {
  const { bookStats } = useBookStats();

  return (
    <BookStatsContext.Provider value={bookStats}>
      <BookshelfPage />
    </BookStatsContext.Provider>
  );
}

export default BookshelfPageWrapper;
