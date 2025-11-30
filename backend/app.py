from flask import Flask, request, jsonify
from db import get_connection
from models import BookStatsToStore, PERSONA_KEYS


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

    print('wha')

    p = stats.personas

    if (len(p) != 3):
      return jsonify({"error": {"There should be 3 personas submitted"}}), 400

    for p_i in p: 
      if p_i.title not in PERSONA_KEYS:
        return jsonify({"error": "Persona does not match to available keys", "persona_keys": PERSONA_KEYS}), 400

    sorted_personas = sorted(p, key=lambda x: x.score, reverse=True)

    persona1_id = PERSONA_KEYS[sorted_personas[0].title] 
    persona2_id = PERSONA_KEYS[sorted_personas[1].title]
    persona3_id = PERSONA_KEYS[sorted_personas[2].title]

    persona1_score = sorted_personas[0].score
    persona2_score = sorted_personas[1].score
    persona3_score = sorted_personas[2].score

    print(persona1_id, persona2_id, persona3_id)

    read_per_month = stats.shelvedBooksPerMonth["read"]
    if(read_per_month is None or len(read_per_month) != 12): 
      read_per_month = None 
    
    r = stats.ratings
    sql_ratings = [r.k1, r.k2, r.k3, r.k4, r.k5]

    try:
      cur.execute(
        """
        INSERT INTO reader_stats
        (number_of_pages, number_of_books, average_rating,
          persona1_id, persona1_score, persona2_id, persona2_score, persona3_id, persona3_score,
          read_per_month, ratings)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
        """,
        (num_pages, num_books, avg_rating,
          persona1_id, persona1_score, persona2_id, persona2_score, persona3_id, persona3_score,
          read_per_month, sql_ratings)
      )



      if stats.bookshelfBooks:

        reader_stats_id = cur.fetchone()[0]

         # Prepare book tuples
        book_values = [(b.bookId, b.title, b.author) for b in stats.bookshelfBooks]

        # Flatten for execute
        flat_params = [v for book in book_values for v in book]

        # Insert books in batch, ignore duplicates
        placeholders = ",".join(["(%s,%s,%s)"] * len(book_values))
        cur.execute(
            f"""
            INSERT INTO book (bookId, title, author)
            VALUES {placeholders}
            ON CONFLICT (bookId) DO NOTHING
            RETURNING bookId, id;
            """,
            flat_params
        )

        # Map returned bookIds to IDs
        f = cur.fetchall()

        print(f)

        returned_books = dict(f)  # {bookId: id}

        # Fetch IDs for any books that already existed
        missing_bookIds = [b.bookId for b in stats.bookshelfBooks if b.bookId not in returned_books]
        print("missing")
        print(missing_bookIds)
        if missing_bookIds:
            placeholders = ",".join(["%s"] * len(missing_bookIds))
            cur.execute(f"SELECT id, bookId FROM book WHERE bookId IN ({placeholders})", missing_bookIds)
            returned_books.update({fetched_book_id: fetched_sql_id for fetched_sql_id, fetched_book_id in cur.fetchall()})

        print("new returned books")
        print(returned_books)

        for b in stats.bookshelfBooks:
          print(b.bookId, returned_books[b.bookId])


        # insert into join table in batch
        link_values = [(reader_stats_id, returned_books[b.bookId]) for b in stats.bookshelfBooks]
        flat_links = [v for row in link_values for v in row]
        placeholders = ",".join(["(%s,%s)"] * len(link_values))

        cur.execute(
            f"""
            INSERT INTO reader_stats_book (reader_stats_id, book_id)
            VALUES {placeholders}
            """,
            flat_links
        )

        conn.commit()

    except Exception as e:
      conn.rollback()
      return jsonify({"error": "Database insert failed", "details": str(e)}), 500


  
  except Exception as e:
    return jsonify({"error": "Error communicating with database", "details": str(e)}), 500
  finally:
    cur.close()
    conn.close()

  return jsonify({"hurrah": 1}), 200
  