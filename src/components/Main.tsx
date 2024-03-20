import "../Styles/Main.scss";
import Filtres from "./Filtres";
import Task from "./Task";

const Data:any = [
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
    Description: "Подробное описание задачи",
  },
];

function Main(props: { handleBurgerClick: () => void; isRotated: boolean }) {
  return (
    <div className="Main">
      <h1>Задачи</h1>
      <div className="Container">
        <Filtres handleBurgerClick={props.handleBurgerClick} />
        <div className="Container__tasks">
          <button>Добавить задачу</button>
          {Data.length === 0 ? (
            <p className="Container__tasks-none">Задач нет</p>
          ) : (
            Data.map((item:any, itemIndex:any) => (
              <Task
                key={itemIndex}
                Name={item.Name}
                Date={item.DataCration}
                Priority={item.Priority}
                Mark={item.Mark}
                Description={item.Description}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
//
export default Main;
