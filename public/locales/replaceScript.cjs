const fs = require('fs');
const path = require('path');

// Получаем имя файла из аргументов командной строки
const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a file name as the first argument.');
  process.exit(1);
}

const inputFilePath = `${fileName}.json`;
const outputFilePath = `${fileName}_modified.json`;

// Функция для рекурсивного обхода и модификации объекта
const modifyObject = (obj) => {
  if (typeof obj === 'string') {
    return obj.replace(/{([^{}]*)}/g, '{{$1}}');
  } else if (Array.isArray(obj)) {
    return obj.map(modifyObject);
  } else if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = modifyObject(obj[key]);
      }
    }
  }
  return obj;
};

// Чтение и модификация JSON файла
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  const modifiedData = modifyObject(jsonData);

  fs.writeFile(outputFilePath, JSON.stringify(modifiedData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing file:', writeErr);
    } else {
      console.log(`File has been modified and saved as ${outputFilePath}`);
    }
  });
});
