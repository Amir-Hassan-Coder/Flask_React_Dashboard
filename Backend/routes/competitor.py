from flask import Blueprint, request, jsonify
from models import db, Submission, Competition
from utils.ai_evaluator import evaluate_article
import traceback 

competitor_bp = Blueprint('competitor', __name__)

# 1. Active Competitions ki list dekhne ke liye
@competitor_bp.route('/competitions', methods=['GET'])
def get_competitions():
    try:
        comps = Competition.query.all()
        result = [{"id": c.id, "title": c.title, "description": c.description} for c in comps]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. Article submit karne ke liye
@competitor_bp.route('/submit-article', methods=['POST'])
def submit_article():
    data = request.json
    content = data.get('content')
    # YAHAN DEKHEN: Agar database mein koi user nahi hai to ye error dega
    user_id = data.get('user_id', 1) 
    # comp_id = data.get('comp_id')
    comp_id = int(data.get('comp_id'))

    # Debugging: Terminal mein check karne ke liye
    print(f"--- SUBMISSION ATTEMPT ---")
    print(f"Content length: {len(content) if content else 0}")
    print(f"User ID: {user_id}, Competition ID: {comp_id}")

    if not content or len(content) < 10:
        return jsonify({"error": "Article is too short!"}), 400

    if not comp_id:
        return jsonify({"error": "Competition ID is missing!"}), 400

    # AI Evaluation
    score, feedback = evaluate_article(content)

    try:
        new_submission = Submission(
            content=content,
            score=score,
            feedback=feedback,
            status='Evaluated',
            user_id=user_id,
            comp_id=comp_id
        )
        db.session.add(new_submission)
        db.session.commit()
        print("--- SUCCESS: Database updated ---")

        return jsonify({
            "message": "Article submitted and evaluated!",
            "score": score,
            "feedback": feedback
        }), 201

    except Exception as e:
        db.session.rollback()
        print("--- DATABASE ERROR ---")
        print(traceback.format_exc()) # Ye terminal mein pura error dikhayega
        return jsonify({"error": "Database error. Check if User ID and Comp ID exist."}), 500
    
@competitor_bp.route('/my-results/<int:user_id>', methods=['GET'])
def get_my_results(user_id):
    try:
        # User ki sari submissions join Competition table ke sath
        results = db.session.query(
            Submission.score,
            Submission.feedback,
            Submission.status,
            Competition.title
        ).join(Competition, Submission.comp_id == Competition.id)\
         .filter(Submission.user_id == user_id).all()

        my_data = []
        for r in results:
            my_data.append({
                "score": r.score,
                "feedback": r.feedback,
                "status": r.status,
                "topic": r.title
            })
        return jsonify(my_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
