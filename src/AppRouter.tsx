
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";

const AppRouter = (props: { handleBurgerClick: () => void, burgerIcon: string, userIcon: string, isRotated: boolean, }) => {
  return (
    <Routes>
      <Route path="/" element={<Main  handleBurgerClick={props.handleBurgerClick}
        isRotated={props.isRotated} />} />
    </Routes>
  );
};

export default AppRouter;
