import sqlite3
import os

# Connect to the database
db_path = os.path.join('data', 'db', 'questions.db')
if not os.path.exists(db_path):
    print(f"ERROR: Database file not found at {db_path}")
    exit(1)

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
    print(f"A: {question[2][:100]}..." if len(question[2]) > 100 else f"A: {question[2]}")

# Close connection
conn.close()
