# QIWI API Tests

Набор тестов (Postman + Playwright) для проверки работы API QIWI по документации.

## 📌 Postman
Коллекция: `postman_collection.json`

Запуск через Newman:
```bash
newman run postman_collection.json
```

## 📌 Playwright
Тесты в папке `/playwright/tests`

Установка:
```bash
cd playwright
npm install
```

Запуск:
```bash
npx playwright test
```
