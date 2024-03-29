const jwt = require("jsonwebtoken");
const db = require("../Database/DataBase.js");
const { validationResult } = require("express-validator");
const cryptoScripts = require("../cryptoScripts.js");
const fs = require("fs");
const path = require("path");
const cipherData = fs.readFileSync(path.join(__dirname, "../key.json"));
const { key } = JSON.parse(cipherData);
const encrypt = cryptoScripts.encrypt;
const decrypt = cryptoScripts.decrypt;

class TaskContoroller {
  // Создание новое задачи
  async crateNewTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }

      const { title, description, priority, tags } = req.body;

      const authHeader = req.headers.authorization;
      const tokenArray = authHeader.split(" ");
      const token = tokenArray[1];
      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован " });
      }
      const decodedData = jwt.verify(token, key);

      const id = decodedData.id;

      if (tags) {
        const searchTags = await db.query(
          `SELECT * FROM tags WHERE "user_id" = $1`,
          [id]
        );

        const encryptedTags = searchTags.rows.map((item) => item.name);

        const missingTags = tags.filter((tag) => !encryptedTags.includes(tag));

        if (missingTags.length > 0) {
          return res.json({
            Success: false,
            message: `Теги '${missingTags.join(", ")}' не существуют`,
          });
        }
      }

      if (description) {
        const newTask = await db.query(
          "INSERT INTO tasks (user_id,title,description,priority) VALUES ($1, $2,$3,$4) RETURNING *",
          [id, encrypt(String(title)), encrypt(String(description)), priority]
        );
        const task_id = newTask.rows[0].id;
        if (tags) {
          const searchTags = await db.query(
            `SELECT * FROM tags WHERE "user_id" = $1`,
            [id]
          );
          const encryptedtagIdsPromises = searchTags.rows.map((item) => ({
            id: item.id,
            user_id: item.user_id,
            name: item.name,
          }));
          const ResultTags = tags.map((item) => {
            return encryptedtagIdsPromises.find((tag) => tag.name === item);
          });
          const newTaskTagsPromises = ResultTags.map(async (tagId) => {
            const task_tags = await db.query(
              "INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2) RETURNING *",
              [task_id, tagId.id]
            );
            return task_tags.rows;
          });
          const newTaskTags = await Promise.all(newTaskTagsPromises);
          return res.json({
            Success: true,
            Task: {
              task_id: task_id,
              user_id: id,
              title: title,
              description: description,
              priority: priority,
              tags: tags,
            },
          });
        }
        return res.json({
          Success: true,
          Task: {
            task_id: task_id,
            user_id: id,
            title: title,
            priority: priority,
          },
        });
      }
      if (!description) {
        const newTask = await db.query(
          "INSERT INTO tasks (user_id,title,priority) VALUES ($1, $2,$3) RETURNING *",
          [id, encrypt(String(title)), priority]
        );

        const task_id = newTask.rows[0].id;
        if (tags) {
          const searchTags = await db.query(
            `SELECT * FROM tags WHERE "user_id" = $1`,
            [id]
          );
          const encryptedtagIdsPromises = searchTags.rows.map((item) => ({
            id: item.id,
            user_id: item.user_id,
            name: item.name,
          }));
          const ResultTags = tags.map((item) => {
            return encryptedtagIdsPromises.find((tag) => tag.name === item);
          });
          const newTaskTagsPromises = ResultTags.map(async (tagId) => {
            const task_tags = await db.query(
              "INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2) RETURNING *",
              [task_id, tagId.id]
            );
            return task_tags.rows;
          });
          const newTaskTags = await Promise.all(newTaskTagsPromises);
          return res.json({
            Success: true,
            Task: {
              task_id: task_id,
              user_id: id,
              title: title,
              priority: priority,
              tags: tags,
            },
          });
        }

        return res.json({
          Success: true,
          Task: {
            task_id: task_id,
            user_id: id,
            title: title,
            priority: priority,
          },
        });
      }
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }
// Создание нового тэга
  async crateNewTag(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }

      const { tag } = req.body;

      const authHeader = req.headers.authorization;
      const tokenArray = authHeader.split(" ");
      const token = tokenArray[1];
      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован " });
      }
      const decodedData = jwt.verify(token, key);

      const id = decodedData.id;

      const searchTags = await db.query(
        `SELECT * FROM tags WHERE "user_id" = $1`,
        [id]
      );

      const checkTags = searchTags.rows.map((item) => item.name);

      if (checkTags.length > 0) {
        const missingTags = checkTags.find((item) => item === tag);
        if (missingTags) {
          return res.json({
            Success: false,
            message: `Тег '${missingTags}' уже существует`,
          });
        }
      }

      const newTag = await db.query(
        "INSERT INTO tags (user_id,name) VALUES ($1, $2) RETURNING *",
        [id, tag]
      );
      if (newTag) {
        return res.json({ Success: true, Name: tag, UserID: id });
      }
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }
// Удаление задачи
  async deleteTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }

      const taskId = req.params.taskid;

      const authHeader = req.headers.authorization;
      const tokenArray = authHeader.split(" ");
      const token = tokenArray[1];
      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован " });
      }
      const decodedData = jwt.verify(token, key);

      const id = decodedData.id;

      const checkTasks = await db.query(
        `SELECT * FROM tasks WHERE "user_id" = $1`,
        [id]
      );
      const check = checkTasks.rows.find((item) => item.id === Number(taskId));
      if (check === undefined) {
        return res.json({
          Success: false,
          message: `У вас нет права на удаление или  такой записи не существует`,
        });
      }
      const decryptCheck = {
        id: check.id,
        user_id: check.user_id,
        title: decrypt(String(check.title)),
      };
      const deleteTask = await db.query("DELETE FROM tasks WHERE id = $1", [
        taskId,
      ]);

      return res.json({
        Success: true,
        message: `Задача ${decryptCheck.title} удалена`,
      });
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }
// Редактирование задачи
  async editTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }

      const taskId = req.params.taskid;
      const { title, description, priority, tags } = req.body;

      const authHeader = req.headers.authorization;
      const tokenArray = authHeader.split(" ");
      const token = tokenArray[1];
      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован " });
      }
      const decodedData = jwt.verify(token, key);

      const id = decodedData.id;
      const checkTasks = await db.query(
        `SELECT * FROM tasks WHERE "user_id" = $1`,
        [id]
      );
      const check = checkTasks.rows.find((item) => item.id === Number(taskId));
      if (check === undefined) {
        return res.json({
          Success: false,
          message: `У вас нет права на изменение или такой записи не существует`,
        });
      }
      const resultArray = [];
      if (tags) {
        const searchTags_tags = await db.query(
          `SELECT * FROM task_tags WHERE "task_id" = $1`,
          [taskId]
        );

        if (searchTags_tags.rows.length > 0) {
          const deleteTags_tags = db.query(
            "DELETE FROM task_tags WHERE task_id = $1",
            [taskId]
          );
        }
        const searchTags = await db.query(
          `SELECT * FROM tags WHERE "user_id" = $1`,
          [id]
        );
        const encryptedTag = searchTags.rows.map((item) => ({
          id: item.id,
          user_id: item.user_id,
          name: item.name,
        }));
        const ResultTags = tags.map((item) => {
          return encryptedTag.find((tag) => tag.name === item);
        });

        const newTaskTagsPromises = ResultTags.map(async (tagId) => {
          const task_tags = await db.query(
            "INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2) RETURNING *",
            [taskId, tagId.id]
          );
          return task_tags.rows;
        });
        const newTaskTags = await Promise.all(newTaskTagsPromises);

        resultArray.push("Тэги");
      }
      if (title) {
        const encryptTitle = encrypt(String(title));
        const editTitle = await db.query(
          `UPDATE tasks
            SET "title" = $1
            WHERE id = $2;
            `,
          [encryptTitle, taskId]
        );
        resultArray.push("Название");
      }
      if (priority) {
        const editTitle = await db.query(
          `UPDATE tasks
            SET "priority" = $1
            WHERE id = $2;
            `,
          [priority, taskId]
        );
        resultArray.push("Приоритет");
      }
      if (description) {
        const encryptDescription = encrypt(String(description));
        const editTitle = await db.query(
          `UPDATE tasks
            SET "description" = $1
            WHERE id = $2;
            `,
          [encryptDescription, taskId]
        );
        resultArray.push("Описание");
      }

      return res.json({
        Success: true,
        message: `Изменения применены.Были изменены ${resultArray}`,
      });
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }

  // Получение всех задач с возможночтью сортировки
  async getTasks(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка: ${e.msg}`));
      }
      const { Data } = req.body;
      const page = Data.page;
      const priority = Data.priority;
      const sort = Data.sort;
      const tags = Data.tags;

      const authHeader = req.headers.authorization;
      const tokenArray = authHeader.split(" ");
      const token = tokenArray[1];
      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован" });
      }
      const decodedData = jwt.verify(token, key);
      const id = decodedData.id;

      const searchCount = page || 1;
      const offset = (searchCount - 1) * 15;

      let query = `
            SELECT 
                t.id,
                t.title,
                t.description,
                t.priority,
                t.created_at,
                ARRAY_AGG(tg.name) FILTER (WHERE tg.name IS NOT NULL) AS tags
            FROM tasks t
            LEFT JOIN task_tags tt ON tt.task_id = t.id
            LEFT JOIN tags tg ON tt.tag_id = tg.id
            WHERE t.user_id = $1
        `;

      let params = [id];

      if (priority) {
        query += ` AND t.priority = $${params.length + 1}`;
        params.push(priority);
      }

      if (tags && tags.length > 0) {
        query += ` AND tg.name = ANY($${params.length + 1})`;
        params.push(tags);
      }

      query += `
            GROUP BY t.id
            ORDER BY t.created_at ${sort === "Old" ? "ASC" : "DESC"}
            LIMIT 15 OFFSET $${params.length + 1}
        `;
      params.push(offset);

      const { rows, rowCount } = await db.query(query, params);

      if (rowCount === 0) {
        return res.json({
          Success: true,
          message: "Записей нет. Создайте запись.",
        });
      }

      const decryptedTasks = rows.map((task) => ({
        ...task,
        title: decrypt(task.title),
        description: task.description ? decrypt(task.description) : "",
        tags: task.tags ? task.tags.map((tag) => tag) : [],
      }));

      return res.json({
        Success: true,
        Data: decryptedTasks,
      });
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res
        .status(400)
        .json({ Success: false, message: `Ошибка: ${e.message}` });
    }
  }

  // Получение списка тэгов
  async getTags(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка: ${e.msg}`));
      }
      const authHeader = req.headers.authorization;
      const tokenArray = authHeader.split(" ");
      const token = tokenArray[1];
      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован" });
      }
      const decodedData = jwt.verify(token, key);
      const id = decodedData.id;

      const searchTags = await db.query(
        `SELECT * FROM tags WHERE "user_id" = $1`,
        [id]
      );
      const encryptedTags = searchTags.rows.map((item) => item.name);

      if (searchTags.rows.length === 0) {
        return res.json({
          Success: true,
          Data: false,
        });
      }
      return res.json({
        Success: true,
        Data: encryptedTags,
      });

      // Расшифровка данных
      // const decryptedTasks = rows.map((task) => ({
      //   ...task,
      //   title: decrypt(task.title),
      //   description: task.description ? decrypt(task.description) : "",
      //   tags: task.tags ? task.tags.map((tag) => decrypt(tag)) : [],
      // }));

      // return res.json({
      //   Success: true,
      //   Data: decryptedTasks,
      // });
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res
        .status(400)
        .json({ Success: false, message: `Ошибка: ${e.message}` });
    }
  }
}
module.exports = new TaskContoroller();
