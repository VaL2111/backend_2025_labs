# Лабораторна робота №1: Налаштування шаблону проєкту

## Вимоги до середовища

Перед початком роботи переконайтеся, що у вас встановлено:
* [Node.js](https://nodejs.org/) (версія 18 або вище)
* [Docker](https://www.docker.com/) та Docker Compose

## 💻 Запуск проєкту локально (без Docker)

1.  **Клонуйте репозиторій:**
    ```bash
    git clone https://github.com/VaL2111/backend_2025_labs
    cd backend_2025_labs
    ```

2.  **Встановіть залежності:**
    ```bash
    npm install
    ```

3.  **Запустіть у режимі розробки:**
    ```bash
    npm run start:dev
    ```
    Сервіс буде доступний за адресою `http://localhost:3000`.

## 🐳 Запуск проєкту за допомогою Docker Compose

1.  **Клонуйте репозиторій** (якщо ще не зробили).

2.  **Перейдіть у папку проєкту та виконайте команду:**
    ```bash
    docker compose up --build -d
    ```

3.  **Щоб зупинити проєкт, виконайте:**
    ```bash
    docker compose down
    ```

## Перевірка працездатності

Після запуску будь-яким зі способів, ви можете перевірити роботу сервісу, звернувшись до ендпоінту `/healthcheck`.

* **При запуску через Docker:** [http://localhost:8080/healthcheck](http://localhost:8080/healthcheck)
* **При локальному запуску:** [http://localhost:3000/healthcheck](http://localhost:3000/healthcheck)

У відповідь ви повинні отримати JSON-об'єкт із статусом та поточним часом.

```json
{
  "status": "OK",
  "timestamp": "2025-10-09T17:56:09.123Z"
}
