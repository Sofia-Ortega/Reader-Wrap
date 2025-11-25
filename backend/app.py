from flask import Flask, request, jsonify
from db import get_connection
from models import BookStatsToStore, ScoredPersona


app = Flask(__name__)

@app.route("/storeBookStats", methods=["POST"])
def store_book_stats():

  try:
    stats = BookStatsToStore.model_validate(request.get_json())
  except Exception as e:
    return jsonify({"error": "Invalid payload", "details": str(e)}), 400
  
  try:

    conn = get_connection()
    cur = conn.cursor()

    num_pages = stats.numberOfPages
    num_books = stats.numberOfBooks
    avg_rating = stats.averageRating

    cur.execute(
        """
        INSERT INTO book_stats (number_of_pages, number_of_books, average_rating)
        VALUES (%s, %s, %s)
        RETURNING id;
        """,
        (num_pages, num_books, avg_rating)
    )

    conn.commit()
    cur.close()
    conn.close()
  
  except Exception as e:
    return jsonify({"error": "Error communicating with database"}), 500

  return jsonify({"hurrah": 1}), 200
  