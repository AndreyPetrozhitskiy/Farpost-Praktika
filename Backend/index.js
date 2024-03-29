const express = require("express");
const sequelize = require("./Database/sequlize");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
const userRouter = require("./Routes/user.routes");
const taskRouter = require("./Routes/task.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/task/user", userRouter);
app.use("/task", taskRouter);

app.listen(PORT, async () => {
  console.log(`Сервер запущен на ${PORT} порту`);

  try {
    await sequelize.authenticate();
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.error("Не получилось подключиться к базе данных:", error);
  }
});
