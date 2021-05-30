import { useState, useEffect, useCallback } from 'react';
import './Main.css';
import DateTime from '../date/date';
import Chart from '../charts/Chart';
import Table from '../table/table';
import storage from '../utils/cityStorage';
import { useDataApi } from '../utils/useDataAPI';
import City_context from './City_context';

const Main = () => {
  const state = useDataApi('/api/gis', { gis: [] });
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState(storage.getCity());
  const [titles, setTitles] = useState([]);
  const currentDate = new Date();
  const [str_date, setStr_date] = useState("");


  const handleChangeCity = (newCity) => {
    setSelectedCity(newCity);
    storage.setCity(newCity);
  }
  const onChangeDate = (_date) => {
    setDate(_date);
  }
  const handleDate = useCallback((_date) => {
    let tmp_date = ("0" + _date.getDate()).slice(-2);
    let tmp_month = ("0" + (_date.getMonth() + 1)).slice(-2);
    let tmp_year = _date.getFullYear();
    let _time = `${tmp_year}-${tmp_month}-${tmp_date}`;
    return _time;
  }, []);

  const handleData = useCallback((_state) => {
    const gis = _state.data.gis;
    let _data = [];
    let _res = [];
    let tmp = [];
    // lọc tất cả các thành phố để gửi cho cities
    const c = gis.map(item => [item.city]);
    setCities(c);
    // lọc dữ liệu theo city và date để gửi cho charts 
    tmp = gis.filter(item => item.city === selectedCity);
    if (tmp.length > 0) {
      _res = tmp[0].res;
      if (_res) {
        _data = _res.filter(item => item.date === str_date);
        if (_data[0]) {
          let result = [..._data[0].data];
          return result;
        }
      }
    }
    return [];
  }, [str_date, selectedCity]);

  useEffect(() => {
    let res1 = handleDate(date);
    setStr_date(res1);
    //////////////////////////////////////
    let res2 = handleData(state);
    setData(res2);
  }, [date, handleDate, handleData, state]);

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src="https://img.icons8.com/doodle/48/000000/earth-care.png" alt="earth"/>  
          <div className="main__greeting">
            <h1>Air quality index</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>
        <div className="main__date">
          <DateTime
            date={date}
            onChange={onChangeDate}
            disable={
              currentDate.getDate() <= date.getDate() &&
              currentDate.getMonth() === date.getMonth()
            }
          />
        </div>
        {state.isError && <div>Something went wrong ...</div>}
        {state.isLoading ? (<div>Loading...</div>) : (
          <>
            <div className="charts_main">
            <City_context.Provider value={{cities: cities, selectedCity: selectedCity, onChange: handleChangeCity}}   >
                <Chart city={selectedCity} data={data} />
              </City_context.Provider>
            </div>
            <div className="table-index-detail">
              <Table city={selectedCity} data={data}/>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
