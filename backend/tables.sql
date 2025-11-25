
CREATE TABLE book_stats (
    id SERIAL PRIMARY KEY,
    number_of_pages INT NOT NULL,
    number_of_books INT NOT NULL,
    average_rating FLOAT NOT NULL
);

-- Create a table:
--   numberOfPages: int 
--   numberOfBooks: int
--   averageRating: float



-- class ScoredPersonasToStore(BaseModel):
--     title: str
--     score: float

-- class BookshelfBookToStore(BaseModel):
--     bookId: str

-- class BookStatsToStore(BaseModel):
--   shelvedBooksPerMonth: Dict[str, List[int]] # Just the "read" shelf
--   ratings: RatingFrequency
--   personas: List[ScoredPersonasToStore]
--   bookshelfBooks: List[BookshelfBookToStore] # List of bookIds