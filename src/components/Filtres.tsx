import "../Styles/Filtres.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/index";
import { logout } from "../store/slices/authSlice";
function Filtres(props: { handleBurgerClick: () => void }) {
  const Data = [
    "Development",
    "Task",
    "Home",
    "Food",
    "Development",
    "Task",
    "Home",
    "Food",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()); // Вызов действия logout
    localStorage.removeItem("token"); // Удаление токена из localStorage
    navigate("/"); // Перенаправление на главную страницу или страницу входа
  };

  const Name = useSelector((state: RootState) => state.auth.userName);

  return (
    <div className="Filtres">
      <div className="Filtres__profile">
        <p>{Name}</p>
        <input type="button" value="Выйти" onClick={handleLogout} />
      </div>
      <button onClick={props.handleBurgerClick}>ПРИМЕНИТЬ</button>
      <div className="Filtres__time">
        <p>СОРТИРОВКА</p>
        <div className="Filtres__time-checkbox">
          <input type="checkbox" />
          <p>-</p>
          <p>Новые</p>
        </div>
        <div className="Filtres__time-checkbox">
          <input type="checkbox" />
          <p>-</p>
          <p>Старые</p>
        </div>
      </div>
      <div className="Filtres__category">
        <div className="Filtres__category-priority">
          <p>ПРИОРИТЕТ</p>
          <div className="Filtres__time-checkbox">
            <input type="checkbox" />
            <p>-</p>
            <p>Low</p>
          </div>
          <div className="Filtres__time-checkbox">
            <input type="checkbox" />
            <p>-</p>
            <p>Normal</p>
          </div>
          <div className="Filtres__time-checkbox">
            <input type="checkbox" />
            <p>-</p>
            <p>High</p>
          </div>
        </div>
      </div>
      <div className="Filtres__category">
        <div className="Filtres__category-priority">
          <p>ОТМЕТКИ</p>
          {Data.map((Mark, itemIndex) => (
            <div className="Filtres__time-checkbox" key={itemIndex}>
              <input type="checkbox" />
              <p>-</p>
              <p>{Mark}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filtres;
