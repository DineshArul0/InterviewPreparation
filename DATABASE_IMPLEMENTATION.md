# Database Implementation for Interview Prep App

## Overview

We've successfully implemented a SQLite database backend for the Interview Prep App, replacing the previous JSON file-based approach. This allows the app to efficiently handle all 100 Java Easy questions (and potentially many more) without performance issues.

## Implementation Details

### Database Schema

**Topics Table:**
- `id`: Text, primary key (e.g., 'java-easy')
- `name`: Text (e.g., 'Java - Easy')
- `description`: Text description of the topic
- `difficulty`: Text (Easy, Medium, Hard)
- `question_count`: Integer, total number of questions for this topic
- `page_size`: Integer, default page size for pagination

**Questions Table:**
- `id`: Text, primary key (e.g., 'java-easy-001')
- `topic_id`: Text, foreign key to topics table
- `type`: Text (e.g., 'theory' or 'coding')
- `difficulty`: Text (Easy, Medium, Hard)
- `question`: Text content of the question
- `answer`: Text content of the answer

### Server API Endpoints

1. **GET /api/topics**
   - Returns a list of all available topics
   - Example response: `{"topics": [{"id": "java-easy", "name": "Java - Easy", ...}]}`

2. **GET /api/questions/:topicId?page=N&pageSize=M**
   - Returns a specific page of questions for the given topic
   - Supports pagination parameters: page and pageSize
   - Example response: 
     ```
     {
       "id": "java-easy",
       "questions": [...],
       "pagination": {
         "pageSize": 10,
         "totalQuestions": 100,
         "currentPage": 1,
         "totalPages": 10
       }
     }
     ```

### Key Files

1. **scripts/setup_database.py**
   - Creates and populates the SQLite database
   - Parses 100 questions from Java_Theory_Easy_100.txt
   - Handles different directory paths and provides detailed logging

2. **server.py**
   - Enhanced HTTP server with database connection
   - Implements API endpoints for accessing topics and questions
   - Handles pagination and error responses

3. **js/script.js**
   - Updated to use the new API endpoints
   - Maintains all existing functionality including search and pagination

4. **start_with_db.bat**
   - All-in-one script that sets up the database and starts the server

## Benefits Over JSON Files

1. **Scalability**: Can handle hundreds or thousands of questions without performance issues
2. **Memory Efficiency**: Only loads the questions needed for the current page
3. **Performance**: Faster loading and filtering of large question sets
4. **Maintainability**: Easier to add, update, or remove questions
5. **Future-Proofing**: Database structure supports adding new features like user accounts, progress tracking, etc.

## How to Use

1. Run `start_with_db.bat` to set up the database and start the server
2. Or manually:
   - Run `python scripts/setup_database.py` to set up the database
   - Run `python server.py` to start the server
3. Open your browser to http://localhost:8000

## Importing Additional Questions

To add more questions to the database:

1. Format your questions in the same style as Java_Theory_Easy_100.txt
2. Update the setup_database.py script to parse and import your new questions
3. Run setup_database.py again to update the database with new questions

## Future Enhancements

1. Add more question sets from other topics (Selenium, REST Assured)
2. Implement user authentication and progress tracking
3. Add question filtering by category or difficulty
4. Add interactive coding exercises with validation
