import fs from 'fs';
import path from 'path'; 

// Directory you want to read files from
const directoryPath = './routes/';

// The file to which content will be appended
const outputFile = './combined_be.txt';

// Exclude specific files (e.g., the script itself and any others)
const excludeFiles = ['script.js', 'combined.txt', 'package.json','*.css'];

// Function to check if file exists and append content to it
const combineFiles = (dirPath, outputFilePath, excludedFiles) => {
  // Check if the output file already exists
  if (!fs.existsSync(outputFilePath)) {
    console.log(`Creating a new file: ${outputFilePath}`);
    fs.writeFileSync(outputFilePath, '', 'utf8'); // Create the file if it doesn't exist
  } else {
    console.log(`Appending to the existing file: ${outputFilePath}`);
  }

  // Read all files in the directory
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Unable to scan directory: ${err}`);
      return;
    }

    // Loop through each file in the directory
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      // Skip excluded files
      if (excludedFiles.includes(file)) {
        console.log(`Skipping excluded file: ${file}`);
        return;
      }

      // Ensure the file is a file (not a directory)
      if (fs.lstatSync(filePath).isFile()) {
        // Read the content of the file
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Append the filename and file path before the content
        const fileInfo = `\n=== File: ${file} ===\nPath: ${filePath}\n\n`;

        // Append filename, file path, and content to the output file
        fs.appendFileSync(outputFilePath, fileInfo + fileContent + '\n', 'utf8');
      }
    });

    console.log(`All files (excluding specified files) have been combined into ${outputFilePath}`);
  });
};

// Call the function with directory path, output file, and files to exclude
combineFiles(directoryPath, outputFile, excludeFiles);
