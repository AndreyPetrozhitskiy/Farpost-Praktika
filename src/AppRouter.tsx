
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default AppRouter;
