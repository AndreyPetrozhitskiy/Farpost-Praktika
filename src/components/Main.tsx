
import "../Styles/Main.scss";
import Filtres from "./Filtres";
import Task from "./Task";

const Data = [
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
  {
    Name: "Сделать уроки",
    DataCration: "17.03.2024",
    Priority: "Low",
    Mark: ["Study"],
  },
];
function Main(props: { handleBurgerClick: () => void, burgerIcon: string, userIcon: string, isRotated: boolean, }) {
  
  return (
    <div className="Main">
      <h1>Задачи</h1>
      <div className="Container">
      <Filtres handleBurgerClick={props.handleBurgerClick} />
        <div className="Container__tasks">
        <button>Добавить задачу</button>
          {Data.map((item, itemIndex) => (
            <Task key={itemIndex} Name={item.Name} Date={item.DataCration} Priority={item.Priority} Mark={item.Mark} />
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default Main;
