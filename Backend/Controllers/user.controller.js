const jwt = require("jsonwebtoken");
const db = require("../DataBase/DataBase.js");
const { validationResult } = require("express-validator");
const cryptoScripts = require("../cryptoScripts.js");

const fs = require("fs");
const path = require("path");

const crypto = require("crypto");
const cipherData = fs.readFileSync(path.join(__dirname, "../key.json"));
const { key, algorithm } = JSON.parse(cipherData);
const createKey = require("../createKey.js");
const keySecret = crypto.randomBytes(16).toString("hex");

const encrypt = cryptoScripts.encrypt;
const decrypt = cryptoScripts.decrypt;

function findUserByLoginAndPassword(users, login, password) {
  return users.find(
    (user) => user.login === login && user.password === password
  );
}

const generateAccessToken = (id, login) => {
  const payload = {
    id,
    login,
  };
  return jwt.sign(payload, key, { expiresIn: "72h" });
};
class UserContoroller {
  // Регистрация
  async registrationUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }

      const { login, password } = req.body;
      const result = await db.query("SELECT * FROM users ");
      // Дешифрование полученных пользователей
      const encryptedResult = result.rows.map((item) => ({
        id: item.id,
        login: decrypt(String(item.login)),
        password: decrypt(String(item.password)),
      }));

      const userExists = encryptedResult.some((user) => user.login === login);

      if (userExists) {
        return res.status(400).json({
          error: "Пользователь уже зарегистрирован",
        });
      }

      const newUser = await db.query(
        "INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *",
        [encrypt(String(login)), encrypt(String(password))]
      );

      if (newUser) {
        const token = generateAccessToken(newUser.rows[0].id, login);
        return res.json({ Success: true, Name: login, Token: token });
      }
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }
  // Авторизация
  async authorizationUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }
      const { login, password } = req.body;

      const nameSearch = await db.query("SELECT * FROM users");

      const encryptedUsers = nameSearch.rows.map((item) => ({
        id: item.id,
        login: decrypt(String(item.login)),
        password: decrypt(String(item.password)),
      }));

      const foundUser = findUserByLoginAndPassword(
        encryptedUsers,
        login,
        password
      );

      if (!foundUser) {
        return res.status(400).json({
          Success: false,
          error: `Пользователь с указанным логином и паролем не найден`,
        });
      }

      const token = generateAccessToken(foundUser.id, foundUser.login);

      return res.json({ Success: true, Name: login, Token: token });
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }
  // Проверка токена
  async tokenCheck(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован" });
      }
      const tokenArray = authHeader.split(" ");

      if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
        return res
          .status(400)
          .json({ Success: false, message: "Неверный формат токена" });
      }

      const token = tokenArray[1];

      if (!token) {
        return res
          .status(400)
          .json({ Success: false, message: "Пользователь не авторизован " });
      }

      const decodedData = jwt.verify(token, key);

      const id = decodedData.id;
      const check = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      if (check.rows.length === 0) {
        return res.status(400).json({
          Success: false,
          message: `Пользователь с id ${id} не найден`,
        });
      }
      res.json({ Success: true, Name: decodedData.login });
    } catch (e) {
      res.status(401).json({ Success: false, error: "Невалидный токен" });
    }
  }
  // Новый секретный ключ
  async generationKey(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.errors.map((e, index) => `${index}. Ошибка:${e.msg}`));
      }
      createKey.generateKey(keySecret, algorithm);
      return res.json({ Result: "Ключ создан" });
    } catch (e) {
      console.log(`Ошибка: ${e.message}`);
      return res.status(400).json(`Ошибка: ${e.message}`);
    }
  }
}
module.exports = new UserContoroller();
