import { useLocation } from "react-router-dom";
import "../Styles/Edit.scss";
import { motion } from "framer-motion";
import DropdownPriority from "../ui components/DropdownPriority";
import { RootState } from "../store/index";
import { AppDispatch } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import ModalTag from "../ui components/ModalTag";
import { useState } from "react";
import { toast } from "react-toastify";
import DropdownTags from "../ui components/DropdownTags";
import { setModalDelete } from "../store/slices/taskSlice";
import ModalDelete from "../ui components/ModalDelete";
import { getToken } from "../store/utils/storage";
import { setTasks } from "../store/slices/taskSlice";
import { getTask, editTask } from "../store/slices/taskThunks";
import { useNavigate } from "react-router-dom";
function Edit() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, Name, Description, Priority, Mark } = location.state;

  // название
  const [title, setTitle] = useState<string>(Name);
  // описание
  const [description, setDescription] = useState<string>(Description || "");
  // массив с тэгами
  const [selectedTags, setSelectedTags] = useState<string[]>(Mark);
  // приоритет
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  const Data = useSelector((state: RootState) => state.task.Tags);
  const PriorityState = useSelector((state: RootState) => state.task.Priority);
  const isVisibleModal = useSelector(
    (state: RootState) => state.task.ModalDelete.isVisible
  );

  const [visible, setVisible] = useState(false);

  // Редактирование тегов
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags); // Обновление состояния с выбранными тегами
  };
  // Редактирование приоритета
  const handlePriorityChange = async (priority: string) => {
    setSelectedPriority(priority); // Обновление состояния с выбранными тегами
  };
  // Редактирование названия
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  // Редактирование описания
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  // Изнение
  const EditTask = async () => {
    if (!title) return toast.error("Укажите название");
    if (!selectedPriority) return toast.error("Выберите приоритет");
    const token = getToken();
    if (token) {
      const conf = {
        token: token,
        id: id,
        Data: {
          title: title,
          description: description,
          priority: selectedPriority,
          tags: selectedTags,
        },
      };

      const edit = await dispatch(editTask(conf)).unwrap();
      if (edit.Success) {
        toast.success("Задача успешно обновлена");
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

  const DeleteTask = async () => {
    const conf = {
      isVisible: true,
      id: null,
    };
    dispatch(setModalDelete(conf));
  };

  return (
    <motion.div
      className="Edit"
      style={{ marginLeft: "-150px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      animate={{ x: 75 }}
    >
      {isVisibleModal && <ModalDelete id={id} />}

      <ModalTag Visible={visible} onClose={() => setVisible(false)} />
      <h1>Редактирование</h1>
      <div className="Edit__buttons">
        <button onClick={EditTask}>Сохранить</button>
        <button
          onClick={() => {
            DeleteTask();
          }}
        >
          Удалить
        </button>
      </div>
      <div className="Edit__container">
        <div className="Edit__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <input
            className="Edit__container-text--input"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="Edit__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <DropdownPriority
            stateChoice={Priority}
            Data={PriorityState}
            onChoice={handlePriorityChange}
          />
        </div>
        <div className="Edit__container-text">
          <h1>ОТМЕТКИ:</h1>
          <div className="Edit__container-text__tag-container">
            <DropdownTags
              stateTags={Mark}
              Data={Data}
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
        <div className="Edit__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <textarea
            className="Edit__container-text--input"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Edit;
