# Файл для обновления музыкальной базы плеера

## Создаем словарь названий треков
mv files.js old_files.js
echo "var files = { \"Base\": " > files.js
python scripts/make_files.py >> files.js
echo "}" >> files.js

## Обновляем базу обложек треков в img
python scripts/make_images.py
