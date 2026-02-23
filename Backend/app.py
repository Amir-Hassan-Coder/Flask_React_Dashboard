from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from models import db
from config import Config

# Blueprint Imports
from routes.admin import admin_bp
from routes.competitor import competitor_bp
from routes.auth import auth_bp


#   App create karo
app = Flask(__name__)
app.config.from_object(Config)


#  Extensions initialize karo
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)


# ✅ 3️⃣ Blueprints register karo
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(competitor_bp, url_prefix='/api/competitor')
app.register_blueprint(auth_bp, url_prefix='/api/auth')


#  Test route
@app.route('/')
def index():
    return {"status": "Backend is running and connected to PostgreSQL"}


#  Run app
if __name__ == '__main__':
    app.run(debug=True, port=5000)