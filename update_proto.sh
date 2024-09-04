#!/bin/bash

# Переходим в корневую папку проекта (предполагая, что скрипт находится в корневой папке)
cd .

# Переходим в папку _proto и выполняем git pull
cd _proto
git pull origin master

# Возвращаемся в корневую папку
cd ..

# Запускаем скрипт prepare.sh
bash ./prepare.sh

# Добавляем изменения и делаем коммит
git add proto
git add _proto
git commit -m 'Update protofiles'
