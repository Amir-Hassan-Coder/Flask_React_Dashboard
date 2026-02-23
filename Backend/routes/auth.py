from flask import Blueprint, request, jsonify
from models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password'], # Real project mein isay hash karna zaroori hai
        role=data.get('role', 'Competitor')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify({
            "user_id": user.id,
            "username": user.username,
            "role": user.role
        }), 200
    return jsonify({"message": "Invalid credentials"}), 401