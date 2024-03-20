import "../Styles/Task.scss";
import { NavLink } from "react-router-dom";
function Task(props: {
  Name: string;
  Date: string;
  Priority: string;
  Mark: string[];
  Description: string;
}) {
  return (
    <NavLink
      className="Task"
      to={
        {
          pathname: "/view",
          state: {
            Name: props.Name,
            Date: props.Date,
            Priority: props.Priority,
            Mark: props.Mark,
            Description: props.Description,
          },
        } as any
      }
    >
      <div className="Task__Info">
        <h1>{props.Name}</h1>
        <p>Дата создания: {props.Date}</p>
        <p>Приоритет: {props.Priority}</p>
        <p>Отметки: {props.Mark}</p>
      </div>
      <div className="Task__Buttons">
        <button>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Редактировать
          </NavLink>
        </button>
        <button>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Удалить
          </NavLink>
        </button>
      </div>
    </NavLink>
  );
}

export default Task;
