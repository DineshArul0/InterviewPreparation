/**
 * Simple script to copy java-easy.json to java-easy-100.json
 * and update the totalQuestions to 100
 */

const fs = require('fs');
const path = require('path');

try {
  // Define paths
  const dataDir = path.join(__dirname, '..', 'data');
  const sourceFilePath = path.join(dataDir, 'java-easy.json');
  const targetFilePath = path.join(dataDir, 'java-easy-100.json');
  
  // Read source file
  const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));
  console.log(`Source file has ${sourceData.questions.length} questions`);
  
  // Update the pagination info
  sourceData.pagination.totalQuestions = 100;
  console.log(`Updated totalQuestions to ${sourceData.pagination.totalQuestions}`);
  
  // Write to target file
  fs.writeFileSync(targetFilePath, JSON.stringify(sourceData, null, 2));
  console.log(`Successfully wrote to ${targetFilePath}`);
} catch (error) {
  console.error('Error:', error);
}
