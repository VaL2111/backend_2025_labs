# Лабораторна робота №2: Розробка базового REST API

## 🚀 Основні технології

* **Framework**: [NestJS](https://nestjs.com/)
* **Мова**: TypeScript
* **Пакетний менеджер**: NPM
* **Контейнеризація**: Docker, Docker Compose

---

## 📋 Вимоги до середовища

Перед початком роботи переконайтеся, що у вас встановлено:

* [Node.js](https://nodejs.org/) (версія 18 або вище)
* [Docker](https://www.docker.com/)

---

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

---

## 🐳 Запуск проєкту за допомогою Docker

1.  **Перейдіть у папку проєкту та виконайте команду:**
    ```bash
    docker compose up --build -d
    ```

2.  **Щоб зупинити проєкт, виконайте:**
    ```bash
    docker compose down
    ```
    Сервіс буде доступний за адресою `http://localhost:8080`.

---

## 📝 Ендпоінти API

### Користувачі (User)
* `POST /user` - Створює нового користувача.
* `GET /users` - Отримує список всіх користувачів.
* `GET /user/:id` - Отримує одного користувача за ID.
* `DELETE /user/:id` - Видаляє користувача за ID.

### Категорії (Category)
* `POST /category` - Створює нову категорію.
* `GET /category` - Отримує список всіх категорій.
* `DELETE /category/:id` - Видаляє категорію за ID.

### Записи (Record)
* `POST /record` - Створює новий запис про витрати.
* `GET /record` - Отримує записи, відфільтровані за `user_id` та/або `category_id`.
* `GET /record/:id` - Отримує один запис за ID.
* `DELETE /record/:id` - Видаляє запис за ID.