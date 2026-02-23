from flask import Blueprint, request, jsonify
from models import db, Competition, Submission, User

admin_bp = Blueprint('admin', __name__)

# New Competition Banane ke liye
@admin_bp.route('/create-competition', methods=['POST'])
def create_competition():
    data = request.json
    try:
        new_comp = Competition(
            title=data['title'],
            description=data['description'],
            criteria=data.get('criteria', '')
        )
        db.session.add(new_comp)
        db.session.commit()
        return jsonify({"message": "Competition created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Saari Submissions dekhne ke liye (Dashboard) - FIXED TOPIC ISSUE
@admin_bp.route('/submissions', methods=['GET'])
def get_all_submissions():
    try:
        # Humne yahan Competition table ko bhi join kiya hai taake 'title' mil sake
        submissions = db.session.query(
            Submission, 
            User.username, 
            Competition.title
        ).join(User, Submission.user_id == User.id)\
         .join(Competition, Submission.comp_id == Competition.id).all()
        
        result = []
        for sub, username, title in submissions:
            result.append({
                "id": sub.id,
                "competitor_name": username,
                "topic": title,  # Ab 'topic' frontend ko milega
                "status": sub.status,
                "score": sub.score
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Specific Submission Details
@admin_bp.route('/submission/<int:sub_id>', methods=['GET'])
def get_submission_details(sub_id):
    try:
        result = db.session.query(
            Submission.content,
            Submission.score,
            Submission.feedback,
            User.username,
            Competition.title
        ).join(User, Submission.user_id == User.id)\
         .join(Competition, Submission.comp_id == Competition.id)\
         .filter(Submission.id == sub_id).first()

        if not result:
            return jsonify({"error": "Submission not found"}), 404

        return jsonify({
            "content": result.content,
            "score": result.score,
            "feedback": result.feedback,
            "competitor_name": result.username,
            "topic": result.title
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500