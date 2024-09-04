/* eslint-disable no-underscore-dangle */
import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Путь к папке с иконками передается как аргумент командной строки
const iconsFolderPath = process.argv[2];

const resultFileName = process.argv[3];

if (!iconsFolderPath || !resultFileName) {
    console.error(
        'Пожалуйста, укажите путь к папке с иконками(1) и имя файла для записи импортов(2)'
    );
    process.exit(1);
}

// Открываем файл для записи импортов
const outputFile = path.join(__dirname, resultFileName);
const writeStream = fs.createWriteStream(outputFile);

// Функция для преобразования названия файла в импорт
function fileNameToImport(fileName) {
    const capitalized = fileName
        .split('-')
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('')
        .split('_')
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join('');
    return capitalized;
}

// Читаем все файлы в папке с иконками
fs.readdir(iconsFolderPath, (err, files) => {
    if (err) {
        console.error('Ошибка чтения папки с иконками:', err);
        process.exit(1);
    }

    // Записываем импорты в файл
    files.forEach((file) => {
        if (file.endsWith('.json')) {
            const iconName = file.split('.')[0]; // fileNameToImport(path.basename(file, '.ts'));
            const importStatement = `import ${iconName} from 'public/locales/${path
                .join(iconsFolderPath, file)
                .replace(/\\/g, '/')}';\n`;
            writeStream.write(importStatement);
        }
    });

    console.log(`Импорты успешно записаны в файл: ${outputFile}`);

    // Закрываем файл после окончания записи
    writeStream.end();
});
