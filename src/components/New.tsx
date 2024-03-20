import Dropdown from "../ui components/Dropdown";
import "../Styles/New.scss";
function New() {
  const Priority = ["Low", "Medium", "High"];
  const Mark = [" Study", " Study", " Study", " Study", " Study"];

  return (
    <div className="New">
      <h1>Новая задача</h1>
      <div className="New__buttons">
        <button>Создать</button>
      </div>
      <div className="New__container">
        <div className="New__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <input className="New__container-text--input" type="text" />
        </div>
        <div className="New__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <Dropdown Data={Priority} />
        </div>
        <div className="New__container-text">
          <h1>ОТМЕТКИ:</h1>
          <Dropdown Data={Mark} />
        </div>
        <div className="New__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <textarea
            className="New__container-text--input"
            placeholder="Описание"
          />
        </div>
      </div>
    </div>
  );
}

export default New;
