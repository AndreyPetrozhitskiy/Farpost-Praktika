import "../Styles/Task.scss";
import { Link } from "react-router-dom";

function Task(props: {
  Id: number;
  Name: string;
  Date: string;
  Priority: string;
  Mark: string[];
  Description: string;
}) {
  return (
    <Link
      className="Task"
      to={`/view/${props.Id}`}
      state={{
        Id: props.Id,
        Name: props.Name,
        Date: props.Date,
        Priority: props.Priority,
        Mark: props.Mark,
        Description: props.Description,
      }}
    >
      <div className="Task__Info">
        <h1>{props.Name}</h1>
        <p>Дата создания: {props.Date}</p>
        <p>Приоритет: {props.Priority}</p>
        <p>Отметки: </p>
        {props.Mark.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <div className="Task__Buttons">
        <button>
          <Link
            to={`/edit/${props.Id}`}
            state={{
              id: props.Id,
              Name: props.Name,
              Date: props.Date,
              Priority: props.Priority,
              Mark: props.Mark,
              Description: props.Description,
            }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Редактировать
          </Link>
        </button>
      </div>
    </Link>
  );
}

export default Task;
