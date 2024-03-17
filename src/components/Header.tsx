import  { useState } from 'react';
import '../Styles/header.scss'
function Header(props: { handleBurgerClick: () => void, burgerIcon: string, userIcon: string, isRotated: boolean }) {
  return (
    <div className="Header">
      <h1>Task planner</h1>
      <div className="Exit__block">
        <p className='Exit__block-Name'>NAME</p>
        <input type='button' value="Выйти" />
        <img
          src={props.burgerIcon}
          className={props.isRotated ? 'rotated' : ''}
          onClick={props.handleBurgerClick}
        />
        <img src={props.userIcon} />
      </div>
    </div>
  );
}

export default Header;