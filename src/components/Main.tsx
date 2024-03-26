import "../Styles/Main.scss";
import Filtres from "./Filtres";
import Task from "./Task";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";
import { getTask } from "../store/slices/taskThunks";
import { updateTasks } from "../store/slices/taskSlice";
import { getToken } from "../store/utils/storage";
function Main(props: { handleBurgerClick: () => void; isRotated: boolean }) {
  const DataTask = useSelector((state: RootState) => state.task.DataTasks);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const reqData = useSelector((state: RootState) => state.task.ReqData);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isAuthenticated) {
      const token = getToken();
      if (token) {
        const requestData = {
          token: token,
          Data: reqData,
        };

        dispatch(getTask(requestData)).then((actionResult) => {
          if (getTask.fulfilled.match(actionResult)) {
            console.log("Data received:", actionResult.payload);
            dispatch(updateTasks(actionResult.payload.Data));
          } else {
            console.error("Failed to load tasks");
          }
        });
      }
    }
  }, [dispatch, isAuthenticated, reqData]);

  return (
    <div className="Main">
      <h1>Задачи</h1>
      <div className="Container">
        <Filtres handleBurgerClick={props.handleBurgerClick} />
        <div className="Container__tasks">
          <button>
            {" "}
            <Link
              to={`/new/`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Добавить задачу{" "}
            </Link>
          </button>
          {DataTask.length === 0 ? (
            <p className="Container__tasks-none">Задач нет</p>
          ) : (
            DataTask.map((item: any, itemIndex: any) => (
              <Task
                Id={item.id}
                key={itemIndex}
                Name={item.title}
                // сделать функцию по преобразованию даты
                Date={item.created_at}
                Priority={item.priority}
                Mark={item.tags}
                Description={item.title}
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
