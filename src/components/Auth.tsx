import "../Styles/Auth.scss";
function Auth() {
  return (
    
      <div className="Authotization">
        <h1>Авторизация</h1>
        <div className="Authotization__form">
          <input type="text" placeholder="Логин" />
          <input type="password" placeholder="Пароль" />
        </div>
        <div className="Authotization__buttons">
          <input type="button" value="Войти" />
          <p>Нет аккаунта?</p>
        </div>
      </div>
    
  );
}

export default Auth;
