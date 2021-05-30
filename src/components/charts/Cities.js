/*
"gis": [
    {
        "id": 1,
        "city": "Hà Nội",
        "resource": [
            {
                "res_id": 1,
                "date": "2021-05-18",
                "data": [
                    {
                        "hour": 1,
                        "air_index": {
                            "NO": 1,
                            "NO2": 40.01,
                            "NOx": 36.37,
                            "CO": 1
                        }
                    }
                ]
            }
        ]
    }
]
*/
import React from 'react';
import './city.css';
import City_context from '../main/City_context'
export default function Cities(props) {
    const { cities, selectedCity, onChange } = React.useContext(City_context);
    // const cities = props.cities;
    // const selectedCity = props.selectedCity;
    console.log('city');
    const handleChange = (e) => {
        const city = e.target.value;
        // props.onChange(city);
        onChange(city);
    };

    return (
        <>
            <label for="city">Thành phố:</label>
            <select name="city" id="city" onChange={handleChange}>
                {/* <option value={selectedCity}>{selectedCity}</option> */}
                {
                    cities
                        // .filter(city => String(city) !== selectedCity)
                        .map(city => (
                            String(city) === selectedCity ? 
                            (<option value={city} selected>{city}</option>) :
                            (<option value={city}>{city}</option>)
                        ))}
            </select>
        </>
    )
}