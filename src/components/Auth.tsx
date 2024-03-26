import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, signUp } from "../store/slices/authThunks";
import "../Styles/Auth.scss";
import { AppDispatch } from "../store/index";
import { setCredentials } from "../store/slices/authSlice";
const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const user = await dispatch(
          login({ login: loginInfo.login, password: loginInfo.password })
        ).unwrap();
        dispatch(
          setCredentials({ userName: user.userName, token: user.token })
        );
        toast.success("Авторизация прошла успешно");
      } catch (error) {
        toast.error("Ошибка авторизации. Проверьте введённые данные.");
      }
    } else {
      if (loginInfo.password !== loginInfo.confirmPassword) {
        toast.error("Пароли не совпадают");
        return;
      }
      try {
        const user = await dispatch(
          signUp({ login: loginInfo.login, password: loginInfo.password })
        ).unwrap();
        dispatch(
          setCredentials({ userName: user.userName, token: user.token })
        );
        toast.success("Регистрация прошла успешно");
      } catch (error) {
        toast.error(
          "Ошибка регистрации. Возможно, пользователь с таким логином уже существует."
        );
      }
    }
  };
  return (
    <div className="Authotization">
      <h1>{isLoginMode ? "Авторизация" : "Регистрация"}</h1>
      <form className="Authotization__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Логин"
          value={loginInfo.login}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={loginInfo.password}
          onChange={handleInputChange}
        />
        {!isLoginMode && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={loginInfo.confirmPassword}
            onChange={handleInputChange}
          />
        )}
        <div className="Authotization__buttons">
          <input
            type="submit"
            value={isLoginMode ? "Войти" : "Зарегистрироваться"}
          />
          <p onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Auth;
