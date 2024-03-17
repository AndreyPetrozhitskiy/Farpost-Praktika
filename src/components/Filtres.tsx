import "../Styles/Filtres.scss";
function Filtres(props: { handleBurgerClick: () => void }) {
    const Data = ["Development","Task","Houme","Food","Development","Task","Houme","Food"]
  return (
    <div className="Filtres">
      <button onClick={props.handleBurgerClick}>ПРИМЕНИТЬ</button>
      <div className="Filtres__time">
        <p>СОРТИРОВКА</p>
        <div className="Filtres__time-checkbox">
          <input type="checkbox" />
          <p>-</p>
          <p>Новые</p>
        </div>
        <div className="Filtres__time-checkbox">
          <input type="checkbox" />
          <p>-</p>
          <p>Старые</p>
        </div>
      </div>
      <div className="Filtres__category">
        <div className="Filtres__category-priority">
          <p>ПРИОРИТЕТ</p>
          <div className="Filtres__time-checkbox">
            <input type="checkbox" />
            <p>-</p>
            <p>Low</p>
          </div>
          <div className="Filtres__time-checkbox">
            <input type="checkbox" />
            <p>-</p>
            <p>Normal</p>
          </div>
          <div className="Filtres__time-checkbox">
            <input type="checkbox" />
            <p>-</p>
            <p>High</p>
          </div>
        </div>
      </div>
      <div className="Filtres__category">
      <div className="Filtres__category-priority">
          <p>Отметки</p>
        {Data.map((Mark, itemIndex) => (
            <div className="Filtres__time-checkbox"  key={itemIndex}>
            <input type="checkbox" />
            <p>-</p>
            <p>{Mark}</p>
          </div>
        ))}

          
        </div>
      </div>
    </div>
  );
}

export default Filtres;
