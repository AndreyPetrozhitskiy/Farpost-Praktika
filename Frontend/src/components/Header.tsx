import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/index";
import { logout } from "../store/slices/authSlice";
import { cleanState } from "../store/slices//taskSlice";
import { Link } from "react-router-dom";
import "../Styles/header.scss";
import Exit from "../Image/Logout.svg";

function Header(props: {
  handleBurgerClick: () => void;
  burgerIcon: string;
  isRotated: boolean;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(cleanState());
    localStorage.removeItem("token");
    navigate("/");
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
        <img src={Exit} onClick={handleLogout} />
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
