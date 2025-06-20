/**
 * Node.js script to convert the Java_Theory_Easy_100.txt file to a proper JSON format
 * With enhanced debugging and better regex pattern handling
 */

const fs = require('fs');
const path = require('path');

// Use absolute paths for better reliability
const projectRoot = path.resolve(__dirname, '..', '..');
const sourceFile = path.join(projectRoot, 'Java_Theory_Easy_100.txt');
const targetFile = path.join(__dirname, 'java-easy.json');

console.log('='.repeat(50));
console.log('Question Converter - Debug Information');
console.log('='.repeat(50));
console.log(`Project Root: ${projectRoot}`);
console.log(`Source file: ${sourceFile}`);
console.log(`Target file: ${targetFile}`);

// Check if source file exists
if (!fs.existsSync(sourceFile)) {
  console.error(`ERROR: Source file does not exist: ${sourceFile}`);
  console.log('Looking for files with similar names:');
  
  const dir = path.dirname(sourceFile);
  const files = fs.readdirSync(dir);
  files.filter(file => file.includes('Java') || file.includes('.txt'))
    .forEach(file => console.log(`  - ${file}`));
  
  process.exit(1);
}

try {
  // Read the source file
  const content = fs.readFileSync(sourceFile, 'utf8');
  console.log(`Successfully read source file (${content.length} bytes)`);
  console.log(`First 100 characters: ${content.substring(0, 100).replace(/\n/g, '\\n')}`);

  // Write the file content to a debug file for inspection
  fs.writeFileSync(path.join(__dirname, 'debug_content.txt'), content);
  console.log('Wrote content to debug_content.txt for inspection');
  
  // Manual extraction approach - simpler but more reliable
  const lines = content.split('\n');
  const questions = [];
  
  // Track what we're currently building
  let currentQuestionNum = null;
  let currentQuestion = null;
  let currentAnswer = null;
  let parsingAnswer = false;
  
  console.log('Starting to parse content line by line...');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines unless we're in the middle of parsing an answer
    if (!line && !parsingAnswer) continue;
    
    // Question line pattern: "1. **What is Java?**"
    const questionMatch = line.match(/^(\d+)\.\s+\*\*(.+)\*\*$/);
    if (questionMatch) {
      // If we have an existing question, save it before moving to the next one
      if (currentQuestionNum && currentQuestion && currentAnswer) {
        const idNum = currentQuestionNum.toString().padStart(3, '0');
        questions.push({
          id: `java-easy-${idNum}`,
          type: "theory",
          difficulty: "Easy",
          question: currentQuestion.trim(),
          answer: currentAnswer.trim()
        });
      }
      
      // Start new question
      currentQuestionNum = parseInt(questionMatch[1]);
      currentQuestion = questionMatch[2];
      currentAnswer = '';
      parsingAnswer = false;
      console.log(`Found question #${currentQuestionNum}: ${currentQuestion.substring(0, 30)}...`);
      continue;
    }
    
    // Answer start line: "*   **Answer:** This is the beginning of the answer..."
    const answerMatch = line.match(/^\*\s+\*\*Answer:\*\*\s+(.+)$/);
    if (answerMatch) {
      currentAnswer = answerMatch[1];
      parsingAnswer = true;
      continue;
    }
    
    // If we're in the middle of parsing an answer, add the line to the answer
    if (parsingAnswer) {
      // If we see a pattern like "30. **What is..." it's a new question
      if (line.match(/^\d+\.\s+\*\*/)) {
        parsingAnswer = false;
        i--; // Back up one line so we process this as a question on the next iteration
      } else {
        currentAnswer += ' ' + line;
      }
    }
  }
  
  // Don't forget to add the last question
  if (currentQuestionNum && currentQuestion && currentAnswer) {
    const idNum = currentQuestionNum.toString().padStart(3, '0');
    questions.push({
      id: `java-easy-${idNum}`,
      type: "theory", 
      difficulty: "Easy",
      question: currentQuestion.trim(),
      answer: currentAnswer.trim()
    });
  }
  
  console.log(`Found ${questions.length} questions`);
  
  // Print first and last questions for verification
  if (questions.length > 0) {
    console.log('First question:');
    console.log(JSON.stringify(questions[0], null, 2));
  }
  
  if (questions.length > 1) {
    console.log('Last question:');
    console.log(JSON.stringify(questions[questions.length - 1], null, 2));
  }
  
  // Create the full JSON structure
  const jsonData = {
    id: "java-easy",
    name: "Java - Easy",
    description: "Basic Java concepts and fundamentals", 
    difficulty: "Easy",
    questions: questions,
    pagination: {
      pageSize: 10,
      totalQuestions: questions.length
    },
    version: "1.0.0",
    lastUpdated: "2025-06-19"
  };
  
  // Write to the target file
  fs.writeFileSync(targetFile, JSON.stringify(jsonData, null, 2));
  console.log(`Successfully wrote ${questions.length} questions to ${targetFile}`);
  console.log('='.repeat(50));
} catch (error) {
  console.error('Error:', error);
  console.error('Stack trace:', error.stack);
}
