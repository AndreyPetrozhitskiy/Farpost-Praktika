import "../Styles/Task.scss";
function Task(props: {
  Name: string;
  Date: string;
  Priority: string;
  Mark: string[];
}) {
  return (
    <div className="Task">
      <div className="Task__Info">
        <h1>{props.Name}</h1>
        <p>Дата создания: {props.Date}</p>
        <p>Приоритет: {props.Priority}</p>
        <p>Отметки: {props.Mark}</p>
      </div>
      <div className="Task__Buttons">
        <button>Редактировать</button>
        <button>Удалить</button>
      </div>
    </div>
  );
}

export default Task;
