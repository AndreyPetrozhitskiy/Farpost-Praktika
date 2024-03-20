import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import View from "./components/View";

const AppRouter = (props: {
  handleBurgerClick: () => void;
  burgerIcon: string;
  isRotated: boolean;
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Main
            handleBurgerClick={props.handleBurgerClick}
            isRotated={props.isRotated}
          />
        }
      />
      <Route
        path="/view"
        element={
          <View
            Name="Тестовая задача 1"
            Date="12.03.2024"
            Priority="Normal"
            Marks="Normal, Normal, Normal, Normal, Normal"
            Description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
