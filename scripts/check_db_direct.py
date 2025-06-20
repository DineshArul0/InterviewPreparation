import sqlite3
import os
import sys

# Get the current directory (where the script is run from)
current_dir = os.getcwd()
print(f"Current working directory: {current_dir}")

# Setup paths based on current directory
if current_dir.endswith('InterviewPrep_App'):
    # If run from within InterviewPrep_App folder
    db_path = os.path.join('data', 'db', 'questions.db')
else:
    # If run from parent directory
    db_path = os.path.join('InterviewPrep_App', 'data', 'db', 'questions.db')

print(f"Checking for database at: {os.path.abspath(db_path)}")

if not os.path.exists(db_path):
    print(f"ERROR: Database file not found at {db_path}")
    sys.exit(1)
else:
    print(f"Database file found: {os.path.getsize(db_path)} bytes")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get topics count
    cursor.execute("SELECT COUNT(*) FROM topics")
    topic_count = cursor.fetchone()[0]
    print(f"Number of topics in database: {topic_count}")

    # Get topics
    cursor.execute("SELECT id, name, question_count FROM topics ORDER BY id")
    topics = cursor.fetchall()
    print("\nTopics in database:")
    for topic in topics:
        print(f"  - {topic[0]}: {topic[1]} ({topic[2]} questions)")

    # Get Java Easy questions count
    cursor.execute("SELECT COUNT(*) FROM questions WHERE topic_id = 'java-easy'")
    java_easy_count = cursor.fetchone()[0]
    print(f"\nNumber of Java Easy questions: {java_easy_count}")

    # Show sample questions
    cursor.execute("SELECT id, question, answer FROM questions WHERE topic_id = 'java-easy' ORDER BY id LIMIT 5")
    sample_questions = cursor.fetchall()
    print("\nSample Java Easy questions:")
    for question in sample_questions:
        print(f"\nID: {question[0]}")
        print(f"Q: {question[1]}")
        answer_text = question[2][:100] + "..." if len(question[2]) > 100 else question[2]
        print(f"A: {answer_text}")

    # Close connection
    conn.close()
    print("\nDatabase verification completed successfully.")
except Exception as e:
    print(f"\nERROR during verification: {e}")
