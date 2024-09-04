const fs = require('fs');
const path = require('path');

// Получаем имя файла без расширения и директорию из аргументов командной строки
const fileName = process.argv[2];
const outputDir = process.argv[3];

if (!fileName) {
  console.error('Пожалуйста, укажите имя файла.');
  process.exit(1);
}

if (!outputDir) {
  console.error('Пожалуйста, укажите директорию для записи файлов.');
  process.exit(1);
}

// Определяем полный путь к исходному файлу JSON
const filePath = path.join(__dirname, `${fileName}.json`);

// Читаем исходный JSON файл
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    process.exit(1);
  }

  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error(`Ошибка при разборе JSON: ${parseErr.message}`);
    process.exit(1);
  }

  // Создаём директорию, если она не существует
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Разбиваем JSON на файлы по первой вложенности
  Object.keys(jsonData).forEach(key => {
    const nestedJson = jsonData[key];
    const nestedFilePath = path.join(outputDir, `${key}.json`);

    fs.writeFile(nestedFilePath, JSON.stringify(nestedJson, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error(`Ошибка при записи файла ${key}.json: ${writeErr.message}`);
      } else {
        console.log(`Файл ${key}.json успешно создан.`);
      }
    });
  });
});
