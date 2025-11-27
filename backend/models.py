from pydantic import BaseModel, Field
from typing import Dict, List, Any


class RatingFrequency(BaseModel):
    k1: int = Field(..., alias="1")
    k2: int = Field(..., alias="2")
    k3: int = Field(..., alias="3")
    k4: int = Field(..., alias="4")
    k5: int = Field(..., alias="5")

    model_config = {
        "populate_by_name": True
    }


class ScoredPersona(BaseModel):
    title: str
    icon: Any   # You can refine this later
    subtitle: str
    score: float


class BookshelfBook(BaseModel):
    title: str
    author: str
    bookId: str
    numberOfPages: int


class FullBookStats(BaseModel):
    numberOfPages: int
    numberOfBooks: int
    numberOfWordsEstimate: int # simple calculation = numberOfPages * 275
    shelvedBooksPerMonth: Dict[str, List[int]]  #
    ratings: RatingFrequency
    averageRating: float
    personas: List[ScoredPersona]
    bookshelfBooks: List[BookshelfBook]




class ScoredPersonasToStore(BaseModel):
    title: str
    score: float

class BookshelfBookToStore(BaseModel):
    bookId: str
    title: str
    author: str

class BookStatsToStore(BaseModel):
  numberOfPages: int 
  numberOfBooks: int
  shelvedBooksPerMonth: Dict[str, List[int]] # Just the "read" shelf
  ratings: RatingFrequency
  averageRating: float
  personas: List[ScoredPersonasToStore]
  bookshelfBooks: List[BookshelfBookToStore] # List of bookIds

PERSONA_KEYS = {
    "Carpenter": 1,
    "Binge Reader": 2,
    "Old Timey": 3,
    "Rereader": 4,
    "Marathon Reader": 5,
    "Novella Enthusiast": 6,
    "Nonconformist": 7,
    "Harmonizer": 8
}