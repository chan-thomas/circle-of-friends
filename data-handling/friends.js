import { writeFileSync, readFileSync, existsSync } from 'fs';
// get absolute path of the file
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'data', 'friends.json'); // File path

// Store the array into a file
export function storeFriends(friends) {
  writeFileSync(filePath, JSON.stringify(friends, null, 2), 'utf8');
  console.log('Friends stored successfully!');
}

// Retrieve the array from the file
export function retrieveFriends() {
  if (existsSync(filePath)) {
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } else {
    console.log('File does not exist.');
    return [];
  }
}

