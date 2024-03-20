


import { useLocation } from 'react-router-dom';
import "../Styles/View.scss";

function View(props: { Name: string,Date: string,Priority:string,Marks:string,Description:string }) {
  const location = useLocation();
  const { Name, Date, Priority, Marks, Description } = location.state || {}; 

  return (
    <div className="View">
      <h1>Просмотр</h1>
      <div className="View__buttons">
        <button>Редактировать</button>
        <button>Удалить</button>
      </div>
      <div className="View__container">
        <div className="View__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <p>{Name || props.Name}</p>
        </div>
        <div className="View__container-text">
          <h1>ДАТА СОЗДАНИЯ:</h1>
          <p>{Date || props.Date}</p>
        </div>
        <div className="View__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <p>{Priority || props.Priority}</p>
        </div>
        <div className="View__container-text">
          <h1>ОТМЕТКИ:</h1>
          <p>{Marks || props.Marks}</p>
        </div>
        <div className="View__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <p>{Description || props.Description}</p>
        </div>
      </div>
    </div>
  );
}

export default View;