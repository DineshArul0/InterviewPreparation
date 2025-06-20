#!/usr/bin/env python3
"""
Enhanced HTTP Server for Interview Prep App with Database Support

This script starts an HTTP server to serve the Interview Prep App files
and provides API endpoints to access the SQLite database containing questions.

Usage:
  python server.py

Then open a browser and navigate to: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json
import sqlite3
import urllib.parse
from pathlib import Path

# Port to serve on
PORT = 8000
# Database path
DB_PATH = os.path.join("data", "db", "questions.db")

class DatabaseRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler that serves files and handles API requests."""
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
        
    def log_message(self, format, *args):
        # More friendly logging 
        if args[0].startswith('GET'):
            sys.stdout.write(f"\033[92m[✓] Serving: {args[1]}\033[0m\n")
    
    def do_GET(self):
        """Handle GET requests, including API endpoints."""
        # Parse the URL
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        
        # Handle API requests
        if path.startswith('/api/'):
            self.handle_api_request(path, parsed_url)
            return
            
        # Default behavior for non-API requests
        return super().do_GET()
    
    def handle_api_request(self, path, parsed_url):
        """Handle API requests by querying the database."""
        # Get query parameters
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        # API endpoints
        if path == '/api/topics':
            self.get_topics()
        elif path.startswith('/api/questions/'):
            # Extract the topic ID from the path
            parts = path.split('/')
            if len(parts) >= 3:
                topic_id = parts[3]
                
                # Get page and page size from query parameters
                page = int(query_params.get('page', ['1'])[0])
                page_size = int(query_params.get('pageSize', ['10'])[0])
                
                self.get_questions(topic_id, page, page_size)
            else:
                self.send_error(400, "Missing topic ID")
        else:
            self.send_error(404, "API endpoint not found")
    
    def get_topics(self):
        """Get all topics from the database."""
        try:
            # Connect to the database
            conn = self.get_db_connection()
            cursor = conn.cursor()
            
            # Get all topics
            cursor.execute('SELECT id, name, description, difficulty, question_count, page_size FROM topics')
            topics = []
            for row in cursor.fetchall():
                topics.append({
                    'id': row[0],
                    'name': row[1],
                    'description': row[2],
                    'difficulty': row[3],
                    'questionsCount': row[4],
                    'pageSize': row[5]
                })
            
            # Send the response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'topics': topics}).encode())
            
            # Close the connection
            conn.close()
        except Exception as e:
            print(f"Error getting topics: {e}")
            self.send_error(500, f"Error getting topics: {str(e)}")
    
    def get_questions(self, topic_id, page, page_size):
        """Get questions for a specific topic with pagination."""
        try:
            # Connect to the database
            conn = self.get_db_connection()
            cursor = conn.cursor()
            
            # Get the total number of questions for this topic
            cursor.execute('SELECT COUNT(*) FROM questions WHERE topic_id = ?', (topic_id,))
            total_questions = cursor.fetchone()[0]
            
            # Calculate offset for pagination
            offset = (page - 1) * page_size
            
            # Get questions for this page
            cursor.execute('''
                SELECT id, topic_id, type, difficulty, question, answer 
                FROM questions 
                WHERE topic_id = ? 
                ORDER BY id
                LIMIT ? OFFSET ?
            ''', (topic_id, page_size, offset))
            
            questions = []
            for row in cursor.fetchall():
                questions.append({
                    'id': row[0],
                    'type': row[2],
                    'difficulty': row[3],
                    'question': row[4],
                    'answer': row[5]
                })
            
            # Create pagination info
            pagination = {
                'pageSize': page_size,
                'totalQuestions': total_questions,
                'currentPage': page,
                'totalPages': (total_questions + page_size - 1) // page_size
            }
            
            # Create response
            response = {
                'id': topic_id,
                'questions': questions,
                'pagination': pagination
            }
            
            # Send the response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
            # Close the connection
            conn.close()
        except Exception as e:
            print(f"Error getting questions: {e}")
            self.send_error(500, f"Error getting questions: {str(e)}")
    
    def get_db_connection(self):
        """Get a connection to the SQLite database."""
        db_file = os.path.join(os.getcwd(), DB_PATH)
        
        # Check if the database file exists
        if not os.path.exists(db_file):
            raise Exception(f"Database file not found at: {db_file}")
            
        return sqlite3.connect(db_file)

def start_server():
    print("\033[1;34m" + "="*60 + "\033[0m")
    print("\033[1;34m Interview Prep App - Database-Powered Server \033[0m")
    print("\033[1;34m" + "="*60 + "\033[0m")
    
    # Find the directory containing this script
    script_dir = os.path.dirname(os.path.realpath(__file__))
    os.chdir(script_dir)  # Change to script directory
    
    # Create the server
    with socketserver.TCPServer(("", PORT), DatabaseRequestHandler) as httpd:
        url = f"http://localhost:{PORT}/"
        
        print(f"\033[1;32m[✓] Server started at {url}\033[0m")
        
        # Check if the database exists
        db_file = os.path.join(os.getcwd(), DB_PATH)
        if os.path.exists(db_file):
            print(f"\033[1;32m[✓] Database found at: {DB_PATH}\033[0m")
        else:
            print(f"\033[1;31m[!] Database not found at: {DB_PATH}\033[0m")
            print("\033[1;33m[i] Please run setup_database.py first\033[0m")
        
        print("\033[1;33m[i] Press Ctrl+C to stop the server\033[0m")
        
        # Open browser automatically
        try:
            print("\033[1;32m[✓] Opening browser...\033[0m")
            webbrowser.open(url)
        except Exception as e:
            print(f"\033[1;31m[!] Could not open browser: {e}\033[0m")
            print(f"\033[1;33m[i] Please manually navigate to: {url}\033[0m")
            
        # Start server
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\033[1;33m[i] Server stopped.\033[0m")

if __name__ == "__main__":
    start_server()
