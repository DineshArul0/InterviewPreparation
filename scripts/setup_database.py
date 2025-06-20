import sqlite3
import re
import os
import json
import sys

# Get the current directory (where the script is run from)
current_dir = os.getcwd()
print(f"Current working directory: {current_dir}")

# Setup paths
if current_dir.endswith('InterviewPrep_App'):
    # If run from within InterviewPrep_App folder
    db_dir = os.path.join('data', 'db')
    db_path = os.path.join('data', 'db', 'questions.db')
    questions_json_path = os.path.join('data', 'questions.json')
else:
    # If run from parent directory
    db_dir = os.path.join('InterviewPrep_App', 'data', 'db')
    db_path = os.path.join('InterviewPrep_App', 'data', 'db', 'questions.db')
    questions_json_path = os.path.join('InterviewPrep_App', 'data', 'questions.json')

print(f"Database will be created at: {os.path.abspath(db_path)}")

# Create database directory if it doesn't exist
os.makedirs(db_dir, exist_ok=True)
print(f"Database directory created/verified: {db_dir}")

# Connect to SQLite database (will be created if it doesn't exist)
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Create topics table
cursor.execute('''
CREATE TABLE IF NOT EXISTS topics (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question_count INTEGER DEFAULT 0,
    page_size INTEGER DEFAULT 10
)
''')

# Create questions table
cursor.execute('''
CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL,
    type TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topics (id)
)
''')

# Insert Java Easy topic
cursor.execute('''
INSERT OR REPLACE INTO topics (id, name, description, difficulty, question_count, page_size)
VALUES (?, ?, ?, ?, ?, ?)
''', (
    'java-easy',
    'Java - Easy',
    'Basic Java concepts and fundamentals',
    'Easy',
    100,
    10
))

# Function to parse the Java_Theory_Easy_100.txt file
def parse_java_easy_questions():
    questions = []
    
    # Find the correct path to the Java_Theory_Easy_100.txt file
    possible_paths = [
        'Java_Theory_Easy_100.txt',  # Current directory
        os.path.join('..', 'Java_Theory_Easy_100.txt'),  # Parent directory
        os.path.join(current_dir, 'Java_Theory_Easy_100.txt'),  # Absolute path in current directory
        os.path.join(os.path.dirname(current_dir), 'Java_Theory_Easy_100.txt')  # Absolute path in parent directory
    ]
    
    file_path = None
    for path in possible_paths:
        if os.path.exists(path):
            file_path = path
            break
    
    if not file_path:
        print("ERROR: Could not find Java_Theory_Easy_100.txt file!")
        sys.exit(1)
    
    print(f"Reading questions from: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Extract questions and answers using regex
    pattern = r'(\d+)\.\s+\*\*([^*]+)\*\*\s+\*\*Answer:\*\*\s+([^\n]+)'
    matches = re.findall(pattern, content)
    
    for match in matches:
        question_num = int(match[0])
        question_text = match[1].strip()
        answer_text = match[2].strip()
        
        # Create question ID
        question_id = f"java-easy-{question_num:03d}"
        
        questions.append({
            'id': question_id,
            'topic_id': 'java-easy',
            'type': 'theory',
            'difficulty': 'Easy',
            'question': question_text,
            'answer': answer_text
        })
    
    return questions

# Insert Java Easy questions
questions = parse_java_easy_questions()
for q in questions:
    cursor.execute('''
    INSERT OR REPLACE INTO questions (id, topic_id, type, difficulty, question, answer)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (q['id'], q['topic_id'], q['type'], q['difficulty'], q['question'], q['answer']))

# Read existing questions.json to get other topics
try:
    # Try to load the questions.json file
    if os.path.exists(questions_json_path):
        with open(questions_json_path, 'r', encoding='utf-8') as f:
            questions_data = json.load(f)
        print(f"Loaded existing topics from: {questions_json_path}")
    else:
        print(f"No existing questions.json found at: {questions_json_path}")
        questions_data = {"topics": []}
        
    # Insert other topics from questions.json
    for topic in questions_data.get('topics', []):
        if topic['id'] != 'java-easy':  # Skip java-easy as we've already added it
            cursor.execute('''
            INSERT OR REPLACE INTO topics (id, name, description, difficulty, question_count, page_size)
            VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                topic['id'],
                topic['name'],
                topic['description'],
                topic['difficulty'],
                topic.get('questionsCount', 0),
                10  # Default page size
            ))
except Exception as e:
    print(f"Error loading questions.json: {e}")

# Commit changes and close connection
conn.commit()
conn.close()

print("\nDatabase setup complete!")
print(f"Total Java Easy questions added: {len(questions)}")
print(f"Database created at: {os.path.abspath(db_path)}")
