import AppRouter from "./AppRouter";
import Header from "./components/Header";
import { useState } from "react";
import burger from "./Image/burger_menu_icon.png";

function App() {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [leftValue, setLeftValue] = useState<string>("-900px");

  const handleBurgerClick = (): void => {
    setIsRotated(!isRotated);
    const newLeftValue = leftValue === "0" ? "-900px" : "0";
    setLeftValue(newLeftValue);
    const filtersElement = document.querySelector(".Filtres") as HTMLElement;
    if (filtersElement) {
      filtersElement.style.transition = "left 0.3s ease";
      filtersElement.style.left = newLeftValue;
    } 

  };
  return (
    <div className="App">
      <Header
        handleBurgerClick={handleBurgerClick}
        burgerIcon={burger}
        isRotated={isRotated}
      />
      {/* <Auth /> */}
     
      <AppRouter  handleBurgerClick={handleBurgerClick}
        burgerIcon={burger}
        isRotated={isRotated} />
    </div>
  );
}

export default App;
