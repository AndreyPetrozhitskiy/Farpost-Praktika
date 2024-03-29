import { useLocation } from "react-router-dom";
import "../Styles/View.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModalDelete from "../ui components/ModalDelete";
import { setModalDelete } from "../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { AppDispatch } from "../store/index";

function View() {
  const dispatch = useDispatch<AppDispatch>();
  const isVisibleModal = useSelector(
    (state: RootState) => state.task.ModalDelete.isVisible
  );

  const { state } = useLocation();
  const { Name, Date, Priority, Mark, Description, Id } = state || {};
  const DeleteTask = async () => {
    const conf = {
      isVisible: true,
      id: null,
    };
    dispatch(setModalDelete(conf));
  };
  return (
    <motion.div
      className="View"
      style={{ marginLeft: "-150px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      animate={{ x: 75 }}
    >
      {isVisibleModal && <ModalDelete id={Id} />}
      <h1>Просмотр</h1>
      <div className="View__buttons">
        <button>
          <Link
            to={`/edit/${Id}`}
            state={{
              id: Id,
              Name: Name,
              Date: Date,
              Priority: Priority,
              Mark: Mark,
              Description: Description,
            }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Редактировать
          </Link>
        </button>
        <button
          onClick={() => {
            DeleteTask();
          }}
        >
          Удалить
        </button>
      </div>
      <div className="View__container">
        <div className="View__container-text">
          <h1>НАЗВАНИЕ ЗАДАЧИ:</h1>
          <p>{Name}</p>
        </div>
        <div className="View__container-text">
          <h1>ДАТА СОЗДАНИЯ:</h1>
          <p>{Date}</p>
        </div>
        <div className="View__container-text">
          <h1>ПРИОРИТЕТ:</h1>
          <p>{Priority}</p>
        </div>
        <div className="View__container-text">
          <h1>ОТМЕТКИ:</h1>
          {Mark.map((item:string)=>(<p style={{marginBottom:"1%"}}>{item}</p>))}
        </div>
        <div className="View__container-text">
          <h1>ОПИСАНИЕ:</h1>
          <p>{Description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default View;
