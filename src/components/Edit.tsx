import {  useLocation } from "react-router-dom";
import "../Styles/Edit.scss";
import { motion } from "framer-motion";
import Dropdown1 from "../ui components/Dropdown";

function Edit() {
  const location = useLocation();
  const { state } = location;
  const { Name,
    //  Date,
     Priority, Mark, Description } = state || {};

  return (
    <motion.div
      className="Edit"
      style={{ marginLeft: "-150px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      animate={{ x: 75 }}
    >
      <h1>Редактирование</h1>
      <div className="Edit__buttons">
        <button>Сохранить</button>
        <button>Удалить</button>
      </div>
      <div className="Edit__container">
        <div className="Edit__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <input
            className="Edit__container-text--input"
            type="text"
            placeholder={Name}
          />
        </div>
        <div className="Edit__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <Dropdown1 Data={Priority} />
        </div>
        <div className="Edit__container-text">
          <h1>ОТМЕТКИ:</h1>
          <Dropdown1 Data={Mark} />
        </div>
        <div className="Edit__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <textarea
            className="Edit__container-text--input"
            placeholder={Description}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Edit;
