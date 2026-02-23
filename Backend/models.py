from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='Competitor') # Admin / Competitor

class Competition(db.Model):
    __tablename__ = 'competitions'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    criteria = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Submission(db.Model):
    __tablename__ = 'submissions'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    score = db.Column(db.Integer, nullable=True)
    feedback = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='Pending')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comp_id = db.Column(db.Integer, db.ForeignKey('competitions.id'))