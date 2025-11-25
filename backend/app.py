from flask import Flask, request, jsonify
from db import get_connection
from models import BookStats, ScoredPersona


app = Flask(__name__)

@app.route("/storeBookStats", methods=["POST"])
def store_book_stats():

  try:
    stats = BookStats.model_validate(request.get_json())
  except Exception as e:
    return jsonify({"error": "Invalid payload", "details": str(e)}), 400
  

  for k in stats:
    print(k)
  
  for k in stats.ratings:
    print(k)

  return jsonify({"hurrah": 1}), 200
  