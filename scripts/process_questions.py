#!/usr/bin/env python3
"""
Script to process question files and generate JSON files for the Interview Prep App.
This script will read from the text files and create properly formatted JSON files.
"""

import json
import os
import re
import sys
from pathlib import Path

def parse_java_theory_questions(file_path):
    """Parse Java Theory Questions text file into structured data."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex pattern to extract question number, question text, and answer
    pattern = r'(\d+)\.\s+\*\*(.+?)\*\*\s+\*\s+\*\*Answer:\*\*\s+(.+?)(?=\n\d+\.\s+\*\*|\Z)'
    matches = re.findall(pattern, content, re.DOTALL)
    
    questions = []
    for match in matches:
        question_num = int(match[0])
        question_text = match[1].strip()
        answer_text = match[2].strip()
        
        # Format ID with leading zeros
        id_num = f"{question_num:03d}"
        
        # Determine difficulty from file name
        difficulty = "Easy"
        if "medium" in file_path.lower():
            difficulty = "Medium"
        elif "hard" in file_path.lower():
            difficulty = "Hard"
        
        questions.append({
            "id": f"java-{difficulty.lower()}-{id_num}",
            "type": "theory",
            "difficulty": difficulty,
            "question": question_text,
            "answer": answer_text
        })
    
    return questions

def parse_selenium_theory_questions(file_path):
    """Parse Selenium Theory Questions text file into structured data."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex pattern to extract question number, question text, and answer
    pattern = r'(\d+)\.\s+\*\*(.+?)\*\*\s+\*\s+\*\*Answer:\*\*\s+(.+?)(?=\n\d+\.\s+\*\*|\Z)'
    matches = re.findall(pattern, content, re.DOTALL)
    
    questions = []
    for match in matches:
        question_num = int(match[0])
        question_text = match[1].strip()
        answer_text = match[2].strip()
        
        # Format ID with leading zeros
        id_num = f"{question_num:03d}"
        
        # Determine difficulty from file name
        difficulty = "Easy"
        if "medium" in file_path.lower():
            difficulty = "Medium"
        elif "hard" in file_path.lower():
            difficulty = "Hard"
        
        questions.append({
            "id": f"selenium-{difficulty.lower()}-{id_num}",
            "type": "theory",
            "difficulty": difficulty,
            "question": question_text,
            "answer": answer_text
        })
    
    return questions

def create_json_file(topic_id, topic_name, difficulty, description, questions, output_path):
    """Create a JSON file for a specific topic."""
    data = {
        "id": topic_id,
        "name": topic_name,
        "description": description,
        "difficulty": difficulty,
        "questions": questions,
        "pagination": {
            "pageSize": 10,
            "totalQuestions": len(questions)
        },
        "version": "1.0.0",
        "lastUpdated": "2025-06-19"
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Created {output_path} with {len(questions)} questions")

def process_java_easy():
    """Process Java Theory Easy questions."""
    # Use absolute paths from the project root
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    
    input_path = project_root / "Java_Theory_Easy_100.txt"
    output_path = project_root / "InterviewPrep_App" / "data" / "java-easy.json"
    
    questions = parse_java_theory_questions(str(input_path))
    create_json_file(
        "java-easy",
        "Java - Easy",
        "Easy",
        "Basic Java concepts and fundamentals",
        questions,
        str(output_path)
    )

def process_java_medium():
    """Process Java Theory Medium questions."""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    
    input_path = project_root / "Java_Theory_Medium_100.txt"
    output_path = project_root / "InterviewPrep_App" / "data" / "java-medium.json"
    
    questions = parse_java_theory_questions(str(input_path))
    create_json_file(
        "java-medium",
        "Java - Medium",
        "Medium",
        "Intermediate Java concepts and design patterns",
        questions,
        str(output_path)
    )

def process_java_hard():
    """Process Java Theory Hard questions."""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    
    input_path = project_root / "Java_Theory_Hard_100.txt"
    output_path = project_root / "InterviewPrep_App" / "data" / "java-hard.json"
    
    questions = parse_java_theory_questions(str(input_path))
    create_json_file(
        "java-hard",
        "Java - Hard",
        "Hard",
        "Advanced Java concepts, memory management, and concurrency",
        questions,
        str(output_path)
    )

def process_selenium_easy():
    """Process Selenium Theory Easy questions."""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    
    input_path = project_root / "Selenium_Theory_Easy_100.txt"
    output_path = project_root / "InterviewPrep_App" / "data" / "selenium-easy.json"
    
    questions = parse_selenium_theory_questions(str(input_path))
    create_json_file(
        "selenium-easy",
        "Selenium - Easy",
        "Easy",
        "Basic Selenium WebDriver and automation concepts",
        questions,
        str(output_path)
    )

def process_selenium_medium():
    """Process Selenium Theory Medium questions."""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    
    input_path = project_root / "Selenium_Theory_Medium_100.txt"
    output_path = project_root / "InterviewPrep_App" / "data" / "selenium-medium.json"
    
    questions = parse_selenium_theory_questions(str(input_path))
    create_json_file(
        "selenium-medium",
        "Selenium - Medium",
        "Medium",
        "Intermediate Selenium concepts, wait strategies, and locators",
        questions,
        str(output_path)
    )

def process_selenium_hard():
    """Process Selenium Theory Hard questions."""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent
    
    input_path = project_root / "Selenium_Theory_Hard_100.txt"
    output_path = project_root / "InterviewPrep_App" / "data" / "selenium-hard.json"
    
    questions = parse_selenium_theory_questions(str(input_path))
    create_json_file(
        "selenium-hard",
        "Selenium - Hard",
        "Hard",
        "Advanced Selenium framework design and architecture",
        questions,
        str(output_path)
    )

def main():
    """Main entry point for the script."""
    # Create the scripts directory if it doesn't exist
    scripts_dir = Path(__file__).parent
    scripts_dir.mkdir(exist_ok=True)
    
    print("Script directory:", scripts_dir)
    project_root = scripts_dir.parent.parent
    print("Project root:", project_root)
    
    # Print available files in the project root
    print("\nFiles in project root:")
    for file in project_root.glob("*.txt"):
        print(f"  - {file}")
    
    # Print available files in the data directory
    data_dir = project_root / "InterviewPrep_App" / "data"
    print("\nFiles in data directory:")
    for file in data_dir.glob("*.json"):
        print(f"  - {file}")
    
    print("\nAttempting to process Java Easy questions...")
    
    # For now, just process Java Easy questions as a test
    try:
        process_java_easy()
        print("Successfully processed Java Easy questions!")
    except Exception as e:
        print(f"Error processing Java Easy questions: {e}")
        import traceback
        traceback.print_exc()
    
    print("\nScript execution completed.")

if __name__ == "__main__":
    main()
