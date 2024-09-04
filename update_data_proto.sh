#!/bin/bash

# Переходим в корневую папку проекта (предполагая, что скрипт находится в корневой папке)
cd .

# Переходим в папку _proto и выполняем git pull
cd _proto_data
git pull origin master

# Возвращаемся в корневую папку
cd ..

# Запускаем скрипт prepare.sh
bash ./prepare_data_proto.sh

# Добавляем изменения и делаем коммит
git add proto_data
git add _proto_data
git commit -m 'Update protofiles'
