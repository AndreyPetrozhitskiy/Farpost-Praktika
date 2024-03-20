import { Link } from "react-router-dom";
import '../Styles/header.scss'
function Header(props: { handleBurgerClick: () => void, burgerIcon: string,  isRotated: boolean }) {
  return (
    <div className="Header">
      <h1> <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      Task planner
          </Link></h1>
      <div className="Exit__block">
        <p className='Exit__block-Name'>NAME</p>
        <input type='button' value="Выйти" />
        <img
          src={props.burgerIcon}
          className={props.isRotated ? 'rotated' : ''}
          onClick={props.handleBurgerClick}
        />
      </div>
    </div>
  );
}

export default Header;