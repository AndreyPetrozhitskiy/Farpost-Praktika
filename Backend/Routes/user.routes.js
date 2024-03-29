const Router = require("express");
const userContoller = require("../Controllers/user.controller.js");
const { check } = require("express-validator");
const router = new Router();
// Регистрация
router.post(
  "/registration",
  [check("login", "login пользователя не может быть пустым").notEmpty()],
  check(
    "password",
    " Пароль не должен быть пустым , не меньше 5 символов или больше 100 символов"
  ).isLength({ min: 5, max: 100 }),
  userContoller.registrationUser
);

// Авторизация
router.post(
  "/auth",
  [
    check("login", "Login  не может быть пустым").notEmpty(),
    check(
      "password",
      " Пароль не должен быть пустым , не меньше 5 символов или больше 100 символов"
    ).isLength({ min: 5, max: 100 }),
  ],
  userContoller.authorizationUser
);

// Проверка токена
router.get("/check", userContoller.tokenCheck);

// router.post("/newkey", userContoller.generationKey); Новый секретный ключ
module.exports = router;
