import sqlite3
import os
import sys

# Get the current directory (where the script is run from)
current_dir = os.getcwd()
print(f"Current working directory: {current_dir}")

# Output file
log_file = "db_verification.log"

with open(log_file, "w") as f:
    f.write(f"Current working directory: {current_dir}\n\n")
    
    # Setup paths based on current directory
    if current_dir.endswith('InterviewPrep_App'):
        # If run from within InterviewPrep_App folder
        db_path = os.path.join('data', 'db', 'questions.db')
    else:
        # If run from parent directory
        db_path = os.path.join('InterviewPrep_App', 'data', 'db', 'questions.db')
    
    f.write(f"Checking for database at: {os.path.abspath(db_path)}\n")
    
    if not os.path.exists(db_path):
        f.write(f"ERROR: Database file not found at {db_path}\n")
        exit(1)
    else:
        f.write(f"Database file found: {os.path.getsize(db_path)} bytes\n\n")

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Get topics count
        cursor.execute("SELECT COUNT(*) FROM topics")
        topic_count = cursor.fetchone()[0]
        f.write(f"Number of topics in database: {topic_count}\n")

        # Get topics
        cursor.execute("SELECT id, name, question_count FROM topics ORDER BY id")
        topics = cursor.fetchall()
        f.write("\nTopics in database:\n")
        for topic in topics:
            f.write(f"  - {topic[0]}: {topic[1]} ({topic[2]} questions)\n")

        # Get Java Easy questions count
        cursor.execute("SELECT COUNT(*) FROM questions WHERE topic_id = 'java-easy'")
        java_easy_count = cursor.fetchone()[0]
        f.write(f"\nNumber of Java Easy questions: {java_easy_count}\n")

        # Show sample questions
        cursor.execute("SELECT id, question, answer FROM questions WHERE topic_id = 'java-easy' ORDER BY id LIMIT 5")
        sample_questions = cursor.fetchall()
        f.write("\nSample Java Easy questions:\n")
        for question in sample_questions:
            f.write(f"\nID: {question[0]}\n")
            f.write(f"Q: {question[1]}\n")
            f.write(f"A: {question[2][:100]}...\n" if len(question[2]) > 100 else f"A: {question[2]}\n")

        # Close connection
        conn.close()
        f.write("\nDatabase verification completed successfully.")
    except Exception as e:
        f.write(f"\nERROR during verification: {e}")
        
print(f"Database verification completed. Results written to {os.path.abspath(log_file)}")
