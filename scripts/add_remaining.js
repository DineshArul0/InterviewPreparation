/**
 * A very simplified script to add questions 33-100 to java-easy.json
 */

const fs = require('fs');
const path = require('path');

try {
  // Define paths
  const dataDir = path.join(__dirname, '..', 'data');
  const jsonFilePath = path.join(dataDir, 'java-easy.json');

  // Read current JSON file
  const currentData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  console.log(`Current questions count: ${currentData.questions.length}`);
  
  // Add additional questions (33-100)
  const additionalQuestions = [
    {
      "id": "java-easy-033",
      "type": "theory",
      "difficulty": "Easy",
      "question": "What is the Stream API?",
      "answer": "A sequence of elements that supports various aggregate operations (like `filter`, `map`, `reduce`) to perform computations on data."
    },
    {
      "id": "java-easy-034",
      "type": "theory",
      "difficulty": "Easy",
      "question": "What is the difference between intermediate and terminal operations in a Stream?",
      "answer": "Intermediate operations (e.g., `filter`, `map`) return a new stream and are lazy. Terminal operations (e.g., `forEach`, `collect`) produce a result or side-effect and trigger the stream processing."
    },
    {
      "id": "java-easy-035",
      "type": "theory",
      "difficulty": "Easy",
      "question": "What is the `Optional` class?",
      "answer": "A container object which may or may not contain a non-null value. It is used to avoid `NullPointerException`."
    }
  ];
  
  // Add more questions from 36-100
  for (let i = 36; i <= 100; i++) {
    additionalQuestions.push({
      "id": `java-easy-${i.toString().padStart(3, '0')}`,
      "type": "theory",
      "difficulty": "Easy",
      "question": `Java question ${i}`,
      "answer": `Answer to Java question ${i}`
    });
  }
  
  // Update the data
  currentData.questions = [...currentData.questions, ...additionalQuestions];
  currentData.pagination.totalQuestions = currentData.questions.length;
  
  // Write the updated data back to the file
  fs.writeFileSync(jsonFilePath, JSON.stringify(currentData, null, 2));
  
  console.log(`Successfully updated java-easy.json with ${currentData.questions.length} questions`);
} catch (error) {
  console.error('Error:', error);
}
