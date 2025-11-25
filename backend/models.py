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


class BookStats(BaseModel):
    numOfPages: int
    numberOfBooks: int
    numberOfWordsEstimate: int
    shelvedBooksPerMonth: Dict[str, List[int]]
    ratings: RatingFrequency
    averageRating: float
    personas: List[ScoredPersona]
    bookshelfBooks: List[BookshelfBook]
