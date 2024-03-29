import "../Styles/Main.scss";
import Filtres from "./Filtres";
import Task from "./Task";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/index";
import loadGif from "../Image/loading.gif";
import { getTask } from "../store/slices/taskThunks";
import {
  setTasks,
  updateTasks,
  setCountLoading,
  setLoading,
} from "../store/slices/taskSlice";
import { getToken } from "../store/utils/storage";

function Main(props: { handleBurgerClick: () => void; isRotated: boolean }) {
  const loading = useSelector((state: RootState) => state.task.loading);
  const [tempData, setTempData] = useState(null);
  const [initLoad, setInitLoad] = useState(true);
  const DataTask = useSelector((state: RootState) => state.task.DataTasks);
  const countLoading = useSelector(
    (state: RootState) => state.task.countLoading
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();
  const reqData = useSelector((state: RootState) => state.task.ReqData);
  // Форматирование даты
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
  }

  const loadingAnimation: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const loadMoreTasks = useCallback(async () => {
    if (loading) return;
    dispatch(setLoading(true));
    const nextPage = countLoading + 1;
    const newReqData = {
      page: nextPage,
      priority: reqData.priority,
      sort: reqData.sort,
      tags: reqData.tags,
    };

    try {
      const token = await getToken();
      if (token && isAuthenticated) {
        const requestData = { token, Data: newReqData };
        const actionResult = await dispatch(getTask(requestData));
        if (
          getTask.fulfilled.match(actionResult) &&
          actionResult.payload.Data
        ) {
          setTempData(actionResult.payload.Data);
        } else {
          console.error("Failed to load more tasks or no more data available");
          dispatch(setLoading(false));
        }
      }
    } catch (error) {
      console.error("Error loading more tasks:", error);
      dispatch(setLoading(false));
    } finally {
      // Задержка для обеспечения видимости анимации загрузки
      setTimeout(() => dispatch(setLoading(false)), 1000);
    }
  }, [dispatch, isAuthenticated, loading, countLoading, reqData, countLoading]);

  useEffect(() => {
    if (!loading && tempData) {
      dispatch(updateTasks(tempData));
      dispatch(setCountLoading());
      setTempData(null);
    }
  }, [loading, tempData, dispatch]);
  useEffect(() => {
    if (!initLoad) return;
    const initLoadTasks = async () => {
      const token = await getToken();
      if (token && isAuthenticated) {
        const requestData = {
          token,
          Data: reqData,
        };
        const actionResult = await dispatch(getTask(requestData));
        if (getTask.fulfilled.match(actionResult)) {
          dispatch(setTasks(actionResult.payload.Data));
        } else {
          console.error("Failed to load tasks");
        }
      }
    };
    initLoadTasks();
    setInitLoad(false);
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreTasks();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreTasks]);
  return (
    <div className="Main">
      <h1>Задачи</h1>
      <div className="Container">
        <Filtres handleBurgerClick={props.handleBurgerClick} />
        <div className="Container__tasks">
          <button>
            <Link
              to={`/new/`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Добавить задачу
            </Link>
          </button>
          {!DataTask || DataTask.length === 0 ? (
            <p className="Container__tasks-none">Задач нет</p>
          ) : (
            DataTask.map((item: any, itemIndex: any) => (
              <Task
                Id={item.id}
                key={itemIndex}
                Name={item.title}
                Date={formatDate(item.created_at)}
                Priority={item.priority}
                Mark={item.tags}
                Description={item.description}
              />
            ))
          )}

          <AnimatePresence>
            {loading && (
              <motion.div
                className="Container__tasks-loading"
                variants={loadingAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <img src={loadGif} alt="Loading" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
//
export default Main;
