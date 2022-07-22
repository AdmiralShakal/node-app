import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import DatesList from './components/DatesList';
import Header from './components/Header';

function App() {
  const [column, setColumn] = useState('name');
  const [type, setType] = useState('EQ');
  const [num, setNum] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/date?page=${page}`).then((res) => setData(res));
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    axios.get(`http://localhost:8080/date?page=${page}`).then((res) => setData(res));
  };

  const handleSort = () => {
    axios
      .get(`http://localhost:8080/date/sort?page=${page}&column=${column}&type=${type}&num=${num}`)
      .then((res) => setData(res));
  };

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="sort">
          <form className="sort__form" onSubmit={handleSort()}>
            <select
              className="sort__column"
              value={column}
              onChange={(e) => setColumn(e.target.value)}>
              <option value="name">Название</option>
              <option value="count">Количество</option>
              <option value="distance">Растояние</option>
            </select>

            <select className="sort__type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="EQ">Равно</option>
              <option value="CONCT">Содержит</option>
              <option value="MORE">Больше</option>
              <option value="LOWER">Меньше</option>
            </select>

            <textarea
              className="sort__value"
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
            <input type="submit" value="Сортировать" />
          </form>
        </div>

        <DatesList data={data.results} />

        <div className="pagination">
          {data.previous && (
            <div
              className="pagination__previous"
              onClick={() => handleChangePage(data.previous.page)}>
              {data.previous.page}
            </div>
          )}
          <div className="curent__page">{page}</div>
          {data.next && (
            <div className="pagination__next" onClick={() => handleChangePage(data.previous.page)}>
              {data.next.page}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
