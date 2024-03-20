import { useParams, useLocation } from "react-router-dom";
import "../Styles/Edit.scss";

import Dropdown from "../ui components/Dropdown";

function Edit() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { state } = location;
  const { Name, Date, Priority, Mark, Description } = state || {};

  return (
    <div className="Edit">
      <h1>Просмотр</h1>
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
          <Dropdown Data={Priority} />
        </div>
        <div className="Edit__container-text">
          <h1>ОТМЕТКИ:</h1>
          <Dropdown Data={Mark} />
        </div>
        <div className="Edit__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <textarea
            className="Edit__container-text--input"
            placeholder={Description}
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;
