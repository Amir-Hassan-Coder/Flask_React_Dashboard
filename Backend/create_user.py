# backend/create_user.py
from app import app
from models import db, User

def create_initial_user():
    with app.app_context():
        # Pehle check karein ke user hai ya nahi
        userExists = User.query.get(1)
        if not userExists:
            try:
                # User ID 1 banate hain
                new_user = User(id=1, username="testuser", email="test@test.com", password="123", role="Competitor")
                db.session.add(new_user)
                db.session.commit()
                print("--- User ID 1 created successfully! ---")
            except Exception as e:
                db.session.rollback()
                print(f"--- Error: {str(e)} ---")
        else:
            print("--- User already exists (ID 1). ---")

if __name__ == "__main__":
    create_initial_user()