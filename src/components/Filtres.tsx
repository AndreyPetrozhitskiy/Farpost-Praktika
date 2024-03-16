import "../Styles/Checkbox.scss"
import '../Styles/Filtres.scss'
function Filtres() {
  return (
    <div className="Filtres">
        <button>ПРИМЕНИТЬ</button>
        <div className='Filtres__time'>
            <p>СОРТИРОВКА</p>
            <div className='Filtres__time-checkbox'>
                <input type='checkbox' />
                <p>-</p>
                <p>Новые</p>
            </div>
            <div className='Filtres__time-checkbox'>
                <input type='checkbox' />
                <p>-</p>
                <p>Старые</p>
            </div>
        </div>
    </div>
  );
}

export default Filtres;