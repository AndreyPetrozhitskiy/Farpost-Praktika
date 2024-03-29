const Router = require("express");
const taskContoller = require("../Controllers/task.controller.js");
const { check } = require("express-validator");
const router = new Router();
const authMiddleware = require("../Middlewares/auth.middleware.js");

// Новая задача
router.post(
  "/new-task",
  [
    check("title", "Название не может быть пустым").notEmpty(),
    check("priority", "Приоритет не может быть пустым").notEmpty(),
    check(
      "priority",
      "priority должен быть одним из следующих значений: Low, Normal, High"
    ).isIn(["Low", "Normal", "High"]),
    check("tags", "tags должны быть массивом").optional().isArray(),
  ],
  authMiddleware,
  taskContoller.crateNewTask
);

// Новая пометка
router.post(
  "/new-tag",
  [check("tag", "Тэг не может быть пустым").notEmpty()],
  authMiddleware,
  taskContoller.crateNewTag
);
router.delete("/delete-task/:taskid", authMiddleware, taskContoller.deleteTask);

// Редактирование задачи
router.put(
  "/edit-task/:taskid",
  [
    check(
      "priority",
      "priority должен быть одним из следующих значений: Low, Normal, High"
    )
      .optional()
      .isIn(["Low", "Normal", "High"]),
    check("tags", "tags должны быть массивом").optional().isArray(),
  ],
  authMiddleware,
  taskContoller.editTask
);

// Список задач
router.post("/get-tasks", authMiddleware, taskContoller.getTasks);
// Список тэгов
router.get("/get-tags", authMiddleware, taskContoller.getTags);

module.exports = router;
