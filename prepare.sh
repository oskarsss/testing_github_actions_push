#!/bin/bash

# Проверяем наличие папки api/ts и выходим без ошибки, если её нет
SOURCE_DIR="_proto"
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Папка $SOURCE_DIR не существует. Завершение скрипта."
    exit 0
fi

# Определяем операционную систему
if [[ "$OSTYPE" == "linux-gnu" ]]; then
    # Linux
    CP_COMMAND="cp -rf"
    CHMOD_COMMAND="chmod -R +x"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    CP_COMMAND="cp -Rf"
    CHMOD_COMMAND="chmod -R +x"
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows (Cygwin, MSYS, или Win32)
    CP_COMMAND="cp -r"
    CHMOD_COMMAND=""
else
    echo "Неподдерживаемая операционная система: $OSTYPE"
    exit 1
fi

# Целевая папка, в которую нужно скопировать содержимое
DEST_DIR="proto/ts"

# Проверяем существование целевой папки и создаем её, если она не существует
if [ ! -d "$DEST_DIR" ]; then
    mkdir -p "$DEST_DIR"
fi

# Копируем файлы с перезаписью с использованием определенной команды CP_COMMAND
# $CP_COMMAND "$SOURCE_DIR"/* "$DEST_DIR"

npm install -g @protobuf-ts/plugin

npx protoc \
  --ts_out $DEST_DIR \
  --ts_opt long_type_number \
  --ts_opt generate_dependencies \
  --ts_opt ts_nocheck \
  --ts_opt output_typescript \
  --proto_path $SOURCE_DIR \
    $SOURCE_DIR/**/*.proto

# Проверяем успешность операции копирования
if [ $? -eq 0 ]; then
    echo "Содержимое папки $SOURCE_DIR успешно скопировано в $DEST_DIR"

    # Устанавливаем права на выполнение на скопированные файлы, если поддерживается
    if [ -n "$CHMOD_COMMAND" ]; then
        $CHMOD_COMMAND "$DEST_DIR"/*
    fi
else
    echo "Ошибка при копировании содержимого папки $SOURCE_DIR в $DEST_DIR"
    echo "Error: $?"
fi
