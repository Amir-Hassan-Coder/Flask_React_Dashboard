This is a full-stack web application designed to manage essay competitions and automatically evaluate essays using AI.
It provides separate portals for Admins and Competitors.

 Features


 For Competitors

Registration & Login: Users can create an account and log in.

Browse Competitions: View a list of active competitions.

Submit Article: Submit an essay through an AI-powered form and instantly receive a score and feedback.

My Results: View all previous submissions along with AI suggestions.

 For Admins Features

Admin Dashboard: View all competitor submissions in one place (Name, Topic, Score, Status).

Create Competition: Launch new competitions with topics and criteria.

Detailed Reports: Read each essay along with AI feedback.

User Results Check: View the scorecard of any specific user.

 Tech Stack
Frontend

React.js

React Router (for navigation)

Axios (for API requests)

CSS3 (custom styling)

Backend

Flask (Python)

PostgreSQL (Database)

SQLAlchemy (ORM)

OpenAI / Google Gemini API (Future mai hum add karengi)

⚙️ Installation & Setup
🔹 Backend Setup

Go to the backend folder.

Create a virtual environment:

python -m venv venv

Install dependencies:




Run the server:

python app.py
🔹 Frontend Setup

Go to the frontend folder.

Install packages:

npm install

Start the app:

npm run dev