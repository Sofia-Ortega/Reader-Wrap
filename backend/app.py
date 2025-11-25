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

    for k, val in stats:
      print(k , val)
    print("over here!")
    p = stats.personas
    print(p)


    if (len(p) != 3):
      return jsonify({"error", {"There should be 3 personas submitted"}}), 400

    print('bruh')

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
    if(not read_per_month or len(read_per_month) != 12): 
      read_per_month = None 
    
    r = stats.ratings
    sql_ratings = [r.k1, r.k2, r.k3, r.k4, r.k5]


    print("yahoooo")
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
    print("done")

    conn.commit()
    cur.close()
    conn.close()
  
  except Exception as e:
    return jsonify({"error": "Error communicating with database", "details": str(e)}), 500

  return jsonify({"hurrah": 1}), 200
  