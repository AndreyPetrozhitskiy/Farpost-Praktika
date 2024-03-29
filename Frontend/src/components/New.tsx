import DropdownPriority from "../ui components/DropdownPriority";
import "../Styles/New.scss";
import { RootState } from "../store/index";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ModalTag from "../ui components/ModalTag";
import { useState } from "react";
import DropdownTags from "../ui components/DropdownTags";
import { AppDispatch } from "../store/index";
import { useDispatch } from "react-redux";
import { getToken } from "../store/utils/storage";
import { getTask, createTask } from "../store/slices/taskThunks";
import { setTasks } from "../store/slices/taskSlice";
import { useNavigate } from "react-router-dom";

function New() {
  const Priority = useSelector((state: RootState) => state.task.Priority);
  const Mark = useSelector((state: RootState) => state.task.Tags);
  const [visible, setVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleCreateTask = async () => {
    if (!taskName) return toast.error("Укажите название");
    if (!selectedPriority) return toast.error("Выберите приоритет");

    const taskData = {
      taskName,
      selectedPriority,
      selectedTags,
      description,
    };

    const token = getToken();
    if (token) {
      const requestData = {
        token: token,
        tagName: taskData,
      };
      const newTask = await dispatch(createTask(requestData)).unwrap();

      if (newTask.Success) {
        toast.success("Задача успешно добавлена");
        const requestGetData = {
          token: token,
          Data: {
            page: 1,
            priority: "",
            sort: "New",
            tags: [],
          },
        };
        dispatch(getTask(requestGetData)).then((actionResult) => {
          if (getTask.fulfilled.match(actionResult)) {
            dispatch(setTasks(actionResult.payload.Data));
            navigate("/");
          } else {
            toast.error("Ошибка. Не удалось загрузить задачи.");
          }
        });
      }
    }
  };
  return (
    <motion.div
      className="New"
      style={{ marginLeft: "-150px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      animate={{ x: 75 }}
    >
      <ModalTag Visible={visible} onClose={() => setVisible(false)} />
      <h1>Новая задача</h1>
      <div className="New__buttons">
        <button onClick={handleCreateTask}>Создать</button>
      </div>
      <div className="New__container">
        <div className="New__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <input
            className="New__container-text--input"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Название задачи"
          />
        </div>
        <div className="New__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <DropdownPriority
            stateChoice={null}
            Data={Priority}
            onChoice={handlePriorityChange}
          />
        </div>
        <div className="New__container-text">
          <div className="New__container-text__tag-container">
            <DropdownTags
              stateTags={null}
              Data={Mark}
              onSelectionChange={handleTagsChange}
            />
            <button
              onClick={() => {
                setVisible(true);
              }}
            >
              Добавить отметку
            </button>
          </div>
        </div>
        <div className="New__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <textarea
            className="New__container-text--input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default New;
