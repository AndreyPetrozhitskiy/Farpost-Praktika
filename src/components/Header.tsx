import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/index";
import { logout } from "../store/slices/authSlice"; // Импортируйте действие logout из вашего authSlice
import { Link } from "react-router-dom";
import "../Styles/header.scss";

function Header(props: {
  handleBurgerClick: () => void;
  burgerIcon: string;
  isRotated: boolean;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout()); // Вызов действия logout
    localStorage.removeItem("token"); // Удаление токена из localStorage
    navigate("/"); // Перенаправление на главную страницу или страницу входа
  };

  const Name = useSelector((state: RootState) => state.auth.userName);

  return (
    <div className="Header">
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Task planner
        </Link>
      </h1>
      <div className="Exit__block">
        <p className="Exit__block-Name">{Name}</p>
        <input type="button" value="Выйти" onClick={handleLogout} />
        <img
          src={props.burgerIcon}
          className={props.isRotated ? "rotated" : ""}
          onClick={props.handleBurgerClick}
        />
      </div>
    </div>
  );
}

export default Header;
