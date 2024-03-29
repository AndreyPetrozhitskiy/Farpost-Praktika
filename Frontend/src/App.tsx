import { useSelector } from "react-redux";
import AppRouter from "./AppRouter";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { RootState } from "./store";
import burger from "./Image/burger_menu_icon.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/index";
import { verifyToken } from "./store/slices/authThunks";
import { verifySuccess } from "./store/slices/authSlice";
import { useState, useEffect } from "react";
import { getToken } from "./store/utils/storage";

function App() {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [leftValue, setLeftValue] = useState<string>("-900px");

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        dispatch(verifyToken(token)).then((actionResult) => {
          if (verifyToken.fulfilled.match(actionResult)) {
            // Проверяем, существует ли payload и содержит ли ожидаемые данные
            if (actionResult.payload && actionResult.payload.Name) {
              dispatch(verifySuccess({ userName: actionResult.payload.Name }));
            } else {
              console.error("Некорректные данные в actionResult");
            }
          } else {
            console.error("Верификация токена не выполнена");
          }
        });
      } catch (error) {
        console.error("Ошибка при вызове verifyToken:", error);
      }
    }
  }, [dispatch]);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Auth />
      ) : (
        <>
          <Header
            handleBurgerClick={handleBurgerClick}
            burgerIcon={burger}
            isRotated={isRotated}
          />
          <AppRouter
            handleBurgerClick={handleBurgerClick}
            burgerIcon={burger}
            isRotated={isRotated}
          />
        </>
      )}
    </div>
  );
}

export default App;
