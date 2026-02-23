import random

def evaluate_article(content):
    # README Requirement: Analyze clarity, grammar, and originality
    # Abhi hum logic-based scoring kar rahe hain, baad mein yahan OpenAI/Gemini lag sakta hai
    
    word_count = len(content.split())
    
    # Simple Logic: Agar words 100 se kam hain to score kam hoga
    if word_count < 50:
        base_score = random.randint(30, 50)
        feedback = "Your article is too short. Please provide more detail for a better score."
    elif word_count < 200:
        base_score = random.randint(60, 75)
        feedback = "Good effort! The content is clear but could be more in-depth."
    else:
        base_score = random.randint(80, 95)
        feedback = "Excellent! Very detailed and well-structured article."

    return base_score, feedback