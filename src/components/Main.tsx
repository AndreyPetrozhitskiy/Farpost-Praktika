// import React from 'react';
import "../Styles/Main.scss"
import Filtres from "./Filtres";


function Main() {
  return (
    <div className = "Main">
       <h1>Задачи</h1>
      <div className="Container">
        <Filtres />
        <div className="Container__tasks">
          GGGGGGGGGGGGGGGGGGGGGGGGGGG
        </div>
      </div>
    </div>
  );
}

export default Main;