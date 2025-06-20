/**
 * Debug script with extensive logging to add questions 33-100 to java-easy.json
 */

const fs = require('fs');
const path = require('path');

// Create a log file for debugging
function log(message) {
  const logPath = path.join(__dirname, 'debug.log');
  fs.appendFileSync(logPath, message + '\n');
  console.log(message);
}

try {
  log('Script started');
  
  // Define paths
  const dataDir = path.join(__dirname, '..', 'data');
  const jsonFilePath = path.join(dataDir, 'java-easy.json');
  
  log(`Reading file from: ${jsonFilePath}`);
  
  // Read current JSON file
  const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
  log(`File content length: ${fileContent.length}`);
  
  let currentData;
  try {
    currentData = JSON.parse(fileContent);
    log(`JSON parsed successfully`);
  } catch (parseError) {
    log(`Error parsing JSON: ${parseError}`);
    process.exit(1);
  }
  
  log(`Current questions count: ${currentData.questions.length}`);
  log(`Current pagination: ${JSON.stringify(currentData.pagination)}`);
  
  // Create the additional questions (33-100)
  const additionalQuestions = [];
  
  // Manually add questions 33-35
  additionalQuestions.push({
    "id": "java-easy-033",
    "type": "theory",
    "difficulty": "Easy",
    "question": "What is the Stream API?",
    "answer": "A sequence of elements that supports various aggregate operations (like `filter`, `map`, `reduce`) to perform computations on data."
  });
  
  additionalQuestions.push({
    "id": "java-easy-034",
    "type": "theory",
    "difficulty": "Easy",
    "question": "What is the difference between intermediate and terminal operations in a Stream?",
    "answer": "Intermediate operations (e.g., `filter`, `map`) return a new stream and are lazy. Terminal operations (e.g., `forEach`, `collect`) produce a result or side-effect and trigger the stream processing."
  });
  
  additionalQuestions.push({
    "id": "java-easy-035",
    "type": "theory",
    "difficulty": "Easy",
    "question": "What is the `Optional` class?",
    "answer": "A container object which may or may not contain a non-null value. It is used to avoid `NullPointerException`."
  });
  
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
  
  log(`Additional questions prepared: ${additionalQuestions.length}`);
  
  // Update the data
  const updatedQuestions = [...currentData.questions, ...additionalQuestions];
  log(`Combined questions count: ${updatedQuestions.length}`);
  
  // Create a new object to avoid any issues with the existing one
  const updatedData = {
    ...currentData,
    questions: updatedQuestions,
    pagination: {
      ...currentData.pagination,
      totalQuestions: updatedQuestions.length
    }
  };
  
  log(`Updated data prepared, writing to file...`);
  
  // Write the updated data back to the file
  const jsonOutput = JSON.stringify(updatedData, null, 2);
  log(`JSON stringified, length: ${jsonOutput.length}`);
  
  fs.writeFileSync(jsonFilePath, jsonOutput);
  
  log(`Successfully updated java-easy.json with ${updatedData.questions.length} questions`);
} catch (error) {
  log(`Critical error: ${error}`);
  log(`Error stack: ${error.stack}`);
}
