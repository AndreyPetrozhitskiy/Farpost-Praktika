import { useParams, useLocation } from "react-router-dom";
import "../Styles/View.scss";
import { Link } from "react-router-dom";
function View() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { state } = location;
  const { Name, Date, Priority, Mark, Description } = state || {};

  return (
    <div className="View">
      <h1>Просмотр</h1>
      <div className="View__buttons">
        <button><Link to={`/edit/${id}`}
            state={{
              Id: id,
              Name: Name,
              Date: Date,
              Priority: Priority,
              Mark: Mark,
              Description: Description,
            }} style={{ textDecoration: "none", color: "inherit" }}>Редактировать</Link></button>
        <button>Удалить</button>
      </div>
      <div className="View__container">
        <div className="View__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <p>{Name}</p>
        </div>
        <div className="View__container-text">
          <h1>ДАТА СОЗДАНИЯ:</h1>
          <p>{Date}</p>
        </div>
        <div className="View__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <p>{Priority}</p>
        </div>
        <div className="View__container-text">
          <h1>ОТМЕТКИ:</h1>
          <p>{Mark}</p>
        </div>
        <div className="View__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <p>{Description}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
