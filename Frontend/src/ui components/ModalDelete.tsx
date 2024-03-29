import "../Styles/ModalDelete.scss";
import { AppDispatch } from "../store/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTasks } from "../store/slices/taskSlice";
import { cleanModalDelete } from "../store/slices/taskSlice";
import { getTask, deleteTask } from "../store/slices/taskThunks";
import { getToken } from "../store/utils/storage";
function ModalDelete(props: { id: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const Exit = async () => {
    dispatch(cleanModalDelete());
  };

  const DeleteTask = async (id: number) => {
    const token = getToken();
    if (token) {
      const confDelete = {
        token: token,
        id: id,
      };
      const delTask = await dispatch(deleteTask(confDelete)).unwrap();
      if (delTask.Success) {
        toast.success(delTask.message);
        const requestData = {
          token: token,
          Data: {
            page: 1,
            priority: "",
            sort: "New",
            tags: [],
          },
        };
        dispatch(getTask(requestData)).then((actionResult) => {
          if (getTask.fulfilled.match(actionResult)) {
            dispatch(updateTasks(actionResult.payload.Data));
            dispatch(cleanModalDelete());
            return navigate("/");
          } else {
            console.error("Failed to load tasks");
          }
        });
      }
      if (delTask.Success === false) {
        toast.error(delTask.message);
        return toast.error("Произошла ошибка.Задача не удалена");
      }
    }
  };
  return (
    <div className="ModalDelete">
      <div className="ModalDelete__container">
        <h1>Вы действительно хотите удалить запись?</h1>
        <button
          onClick={() => {
            DeleteTask(props.id);
          }}
        >
          Да
        </button>
        <button onClick={Exit}>Нет</button>
      </div>
    </div>
  );
}

export default ModalDelete;
