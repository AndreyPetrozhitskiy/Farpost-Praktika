const jwt = require("jsonwebtoken");
const db = require("../Database/DataBase.js");
const fs = require("fs");
const path = require("path");
const cipherData = fs.readFileSync(path.join(__dirname, "../key.json"));
const { key, algorithm } = JSON.parse(cipherData);
module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ message: "Пользователь не авторизован" });
    }

    const tokenArray = authHeader.split(" ");
    if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
      return res.status(400).json({ message: "Неверный формат токена" });
    }

    const token = tokenArray[1];

    const decodedData = jwt.verify(token, key);

    const id = decodedData.id;

    const check = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      return res
        .status(400)
        .json({ message: `Пользователь с id ${id} не найден` });
    }

    next();
  } catch (e) {
    console.log(`Ошибка: ${e.message}`);
    res.status(400).json({
      message: "Пользователь не авторизован ",
    });
  }
};
