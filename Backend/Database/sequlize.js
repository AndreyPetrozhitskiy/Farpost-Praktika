const { Sequelize } = require("sequelize");
const db = require("./DataBase.js");
const Data = db.options;

const sequelize = new Sequelize(Data.database, Data.user, Data.password, {
  host: Data.host,
  dialect: "postgres",
  logging: false,
});

// Функция для выполнения SQL-запроса
async function executeSQLQuery(sqlQuery) {
  try {
    await sequelize.query(sqlQuery);
    console.log(`Успешно выполнен SQL-запрос: ${sqlQuery}`);
  } catch (error) {
    console.error(`Ошибка при выполнении SQL запроса: ${sqlQuery}`, error);
  }
}

// Проверка наличия таблиц
async function checkTablesExistence() {
  try {
    const tables = await sequelize.query(
      `
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return tables.map((table) => table.table_name);
  } catch (error) {
    console.error("Ошибка при проверке существования таблиц:", error);
    return [];
  }
}

// Проверка существования триггеров
async function checkTriggersExistence() {
  try {
    const triggers = await sequelize.query(
      `
            SELECT trigger_name
            FROM information_schema.triggers
            WHERE trigger_schema = 'public';
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return triggers.map((trigger) => trigger.trigger_name);
  } catch (error) {
    console.error("Ошибка при проверке существования триггеров:", error);
    return [];
  }
}

// Проверка существования внешних ключей
async function checkForeignKeysExistence() {
  try {
    const foreignKeys = await sequelize.query(
      `
            SELECT constraint_name
            FROM information_schema.table_constraints
            WHERE constraint_type = 'FOREIGN KEY';
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return foreignKeys.map((foreignKey) => foreignKey.constraint_name);
  } catch (error) {
    console.error("Ошибка при проверке существования внешних ключей:", error);
    return [];
  }
}

// Создание таблиц, если они не существуют
async function createTablesIfNotExist() {
  const tablesExist = await checkTablesExistence();

  // создание таблицы
  if (!tablesExist.includes("users")) {
    await executeSQLQuery(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        login VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    `);
  }
  // создание таблицы
  if (!tablesExist.includes("tasks")) {
    await executeSQLQuery(`
    CREATE TYPE task_priority AS ENUM ('Low', 'Normal', 'High');

    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority task_priority NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    `);
  }
  if (!tablesExist.includes("tags")) {
    await executeSQLQuery(`
    CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    `);
  }
  if (!tablesExist.includes("task_tags")) {
    await executeSQLQuery(`
    CREATE TABLE task_tags (
        task_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (task_id, tag_id),
        FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
    );
    `);
  }
}

createTablesIfNotExist();

module.exports = sequelize;
