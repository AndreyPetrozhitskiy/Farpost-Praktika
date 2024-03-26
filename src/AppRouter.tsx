import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import View from "./components/View";
import Edit from "./components/Edit";
import New from "./components/New";
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
      <Route path="/view/:id" element={<View />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/new/" element={<New />} />
    </Routes>
  );
};

export default AppRouter;
