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

import React, { useState } from "react";
import storage from '../utils/storage';
import Cities from './Cities';
import { Element } from 'react-scroll';
import './charts.css'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default function Chart(props) {
    const [selectedTitles, setSelectedTitles] = useState(storage.getTitles());
    const test = props.data;
    const titles = ["CO", "NO", "NO2", "NOx"];
    const color = ['red', 'green', '#8884d8', 'blue', '#333'];

    /** handleClick: tích chọn check box để hiển thị biểu đồ*/
    const handleClick = (e) => {
        let checked = e.target.checked;
        let title = e.target.value;
        setSelectedTitles((prev) => {
            let isExisted = prev.some((t) => t === title);

            if (checked && !isExisted) {
                let newTitlesSelected = [...prev, title];
                storage.setTitles(newTitlesSelected);
                return newTitlesSelected;
            } else if (!checked && isExisted) {
                let newTitlesSelected = prev.filter((t) => t !== title);
                storage.setTitles(newTitlesSelected);
                return newTitlesSelected;
            }
        });
    }
    //check if title is selected then add checked attr to checkbox
    const isSelected = (title, index) => {
        if (selectedTitles.includes(title)) {
            return (
                <Element
                    style={{
                        marginBottom: "10px"
                    }}
                >

                    <div className={`card${index + 1} card`}>
                        <input type="checkbox" id={title} value={title} name="group1" onClick={handleClick} checked></input>
                        <label for={title}>{title}</label>
                    </div>
                </Element>
            );
        } else
            return (
                <Element
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    <div className={`card${index + 1} card`}>
                        <input type="checkbox" id={title} value={title} name="group1" onClick={handleClick}></input>
                        <label for={title}>{title}</label>
                    </div>
                </Element>
            );
    };


    return (
        <>
            {/* Start of chart left  */}
            <div className="charts__left">

                <div className="charts__left__title">
                    {/* <div> */}
                    <h1>Daily Reports</h1>
                    {/* <p>Welcome to gis dashboard</p> */}
                    {/* </div> */}
                    {/* <i className="fa fa-usd" aria-hidden="true"></i> */}
                </div>

                <ResponsiveContainer className="charts" height={400} width={1000}  >
                    <LineChart
                        width={600}
                        height={400}
                        data={test}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="hour" label={{ value: "hours", position: "insideBottomRight", dy: 20 }} />
                        <YAxis label={{ value: "index", position: "insideLeft", angle: 0, dy: -100, dx: -20 }} />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend />

                        {selectedTitles.map((title, index) => (
                            <Line type="monotone" dataKey={title} stroke={color[index]} key={index} strokeWidth={1.5} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* End of chart left  */}
            {/* Start of chart right  */}
            <div className="charts__right">

                <div className="charts__right__title">
                    <div>
                        <h1>Air Indexs</h1>
                        {/* <p>Cupertino, California, USA</p> */}
                    </div>
                    {/* <i className="fa fa-usd" aria-hidden="true"></i> */}
                </div>

                <div className="charts__right__cards">
                    <Element
                        style={{
                            position: "relative",
                            height: "auto",
                            width:"120px",
                            overflowY: "scroll",
                            maxHeight: '240px',
                            // marginBottom: "5px"
                        }}
                    >
                        {titles.map((title, index) => isSelected(title, index))}
                    </Element>
                    <div className="cities">
                        <Cities />
                    </div>
                </div>
            </div>

            {/* End of chart right */}
        </>
    );
}