import  { useState } from 'react';
import '../Styles/header.scss'
import user from "../Image/user_icon.png"
import burger from "../Image/burger_menu_icon.png"
// import logo from "../Image/Logo.png"
function Header() {

  const [isRotated, setIsRotated] = useState<boolean>(false);

  const handleBurgerClick = (): void => {
    setIsRotated(!isRotated);
  };
  
  return (
    <div className="Header">
      
      <h1>Task planner</h1>
     
      
      <div className="Exit__block">
          <p className='Exit__block-Name'>NAME</p>
          <input type='button' value="Выйти" />
          <img
            src={burger}
            className={isRotated ? 'rotated' : ''}
            onClick={handleBurgerClick}
          />
          <img src={user} />
         
      </div>
    </div>
  );
}

export default Header;