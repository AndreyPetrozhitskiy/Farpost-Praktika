import "../Styles/Dropdown.scss";
import Arrow from "../Image/Arrow.svg";
import { useState } from "react";

function Dropdown(props: { Data: string[] }) {
  const [choice, setChoice] = useState("");
  const [check, setCheck] = useState(false);
  
  const choiceDrop = (item: string): void => {
    setChoice(item);
    setCheck(!check);
  };
  // Упрощённая функция переключения
  const toggleDropdown = (): void => {
    setCheck(!check);
  };

  return (
    <div className="Dropdown" onClick={toggleDropdown} aria-expanded={check}>
      {!check && (
        <div className="Dropdown__start">
          <p>{choice}</p>

          <img
            src={Arrow}
            alt="Toggle Dropdown"
            onClick={toggleDropdown}
            aria-expanded={check}
          />
        </div>
      )}

      {check && ( // Условное отображение списка
        <div className="Dropdown__list">
          {props.Data.map((item, itemIndex) => (
            <p key={itemIndex} onClick={() => choiceDrop(item)}>
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
