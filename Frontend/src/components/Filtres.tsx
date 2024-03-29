import "../Styles/Filtres.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/index";
import { logout } from "../store/slices/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { AppDispatch } from "../store/index";
import { getTags, getTask } from "../store/slices/taskThunks";
import {
  setTags,
  setReqData,
  setTasks,
  cleanReqData,
  cleanCountLoading,
} from "../store/slices/taskSlice";
import { getToken } from "../store/utils/storage";
import { cleanState } from "../store/slices/taskSlice";
import Exit from "../Image/Logout.svg";

function Filtres(props: { handleBurgerClick: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Логин пользователя
  const Name = useSelector((state: RootState) => state.auth.userName);
  // Массив с тегами
  const Data = useSelector((state: RootState) => state.task.Tags);
  // Состояние авторизации
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // Приоритет
  const PriorityState = useSelector((state: RootState) => state.task.Priority);
  // Данные форм
  // Сортировка
  const [selectedSort, setSelectedSort] = useState<string | null>("");
  // Приоритет
  const [selectedPriority, setSelectedPriority] = useState<string | null>("");
  // Тэги
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Обработчик для сортировки и приоритета
  const handleSingleChoiceChange = (
    type: "sort" | "priority",
    value: string
  ) => {
    if (type === "sort") {
      setSelectedSort((prev) => (prev === value ? "" : value));
    } else if (type === "priority") {
      setSelectedPriority((prev) => (prev === value ? "" : value));
    }
  };

  // Обработчик для тегов
  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Очистка
  const resetAllSelections = async () => {
    setSelectedSort(""); // Сброс выбранной сортировки
    setSelectedPriority(""); // Сброс выбранного приоритета
    setSelectedTags([]); // Сброс выбранных тегов
    dispatch(cleanReqData());
    dispatch(cleanCountLoading());
    const token = await getToken();
    if (token && isAuthenticated) {
      const requestData = {
        token,
        Data: {
          page: 1,
          priority: "",
          sort: "New",
          tags: [],
        },
      };
      const actionResult = await dispatch(getTask(requestData));

      if (getTask.fulfilled.match(actionResult)) {
        dispatch(setTasks(actionResult.payload.Data));
      } else {
        console.error("Failed to load tasks");
      }
    }
    props.handleBurgerClick();
  };

  // Применить фильтры
  const filtertask = async () => {
    props.handleBurgerClick();
    const conf = {
      page: 1,
      priority: selectedPriority,
      sort: selectedSort,
      tags: selectedTags,
    };
    dispatch(setReqData(conf));
    const token = getToken();
    if (token && isAuthenticated) {
      const requestData = {
        token,
        Data: conf,
      };

      const actionResult = await dispatch(getTask(requestData));
      if (getTask.fulfilled.match(actionResult)) {
        dispatch(setTasks(actionResult.payload.Data));
      } else {
        console.error("Failed to load tasks");
      }
    }
  };

  // Выход из аккаунта
  const handleLogout = () => {
    dispatch(logout()); // Вызов действия logout
    dispatch(cleanState());
    localStorage.removeItem("token"); // Удаление токена из localStorage
    navigate("/"); // Перенаправление на главную страницу или страницу входа
  };

  // Получение списка тегов
  useEffect(() => {
    if (isAuthenticated) {
      const token = getToken();
      if (token) {
        const requestData = {
          token: token,
        };

        dispatch(getTags(requestData)).then((actionResult) => {
          if (
            getTags.fulfilled.match(actionResult) &&
            actionResult.payload.Data.length > 0
          ) {
            dispatch(setTags(actionResult.payload.Data));
          } else {
            console.error("Failed to load tasks");
          }
        });
      }
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="Filtres">
      <div className="Filtres__profile">
        <p>{Name}</p>
        <img onClick={handleLogout} src={Exit} />
      </div>
      <div className="Filtres__button_block">
        <button onClick={filtertask}>ПРИМЕНИТЬ</button>
        <button onClick={resetAllSelections}>Очистить</button>
      </div>

      <div className="Filtres__time">
        <p>СОРТИРОВКА</p>
        <div className="Filtres__time-checkbox">
          <input
            type="checkbox"
            checked={selectedSort === "New"}
            onChange={() => handleSingleChoiceChange("sort", "New")}
          />
          <p>-</p>
          <p>New</p>
        </div>
        <div className="Filtres__time-checkbox">
          <input
            type="checkbox"
            checked={selectedSort === "Old"}
            onChange={() => handleSingleChoiceChange("sort", "Old")}
          />
          <p>-</p>
          <p>Old</p>
        </div>
      </div>
      <div className="Filtres__category">
        <div className="Filtres__category-priority">
          <p>ПРИОРИТЕТ</p>
          {PriorityState.map((item) => (
            <div className="Filtres__time-checkbox" key={item}>
              <input
                type="checkbox"
                checked={selectedPriority === item}
                onChange={() => handleSingleChoiceChange("priority", item)}
              />
              <p>-</p>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="Filtres__category">
        <div className="Filtres__category-priority">
          <p>ОТМЕТКИ</p>
          {!Data || Data.length === 0 ? (
            <p>Отметок нет</p>
          ) : (
            Data.map((Mark) => (
              <div className="Filtres__time-checkbox" key={Mark}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(Mark)}
                  onChange={() => handleTagChange(Mark)}
                />
                <p>-</p>
                <p>{Mark}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Filtres;
