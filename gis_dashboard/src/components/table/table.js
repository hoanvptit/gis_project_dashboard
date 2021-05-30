import './table.css';

export default function Table(props) {
    const titles = ["NO", "NO2", "NOx", "CO"];
    const data = props.data;

    console.log(data);
    return (
        <>
        <h1>Thống kê chi tiết</h1>
        <div className="table-stats">
            <div className="index-info">
                <table className="table-index">
                    <tr>
                        <th>STT</th>
                        <th>Hour</th>
                        {titles.map(title => (
                            <th>{title}</th>
                        ))}
                    </tr>
                    {data.map((dt, index) => {
                        let values = Object.values(dt);
                        let tmp = 0;
                       values.forEach(element => {
                           tmp+=element; 
                       });
                       tmp/=values.length;
                       let color = 'green';
                       if(tmp > 10 ) color='rgb(224, 70, 24)';
                       else if(tmp > 8) color = 'rgb(212, 178, 27)';
                       else if(tmp > 5) color = 'rgb(103, 163, 12)';
                       else color='rgb(17, 153, 17)';
                       console.log("tmp: ", tmp);
                       console.log("color: ", color);
                        return (
                            <tr style={{backgroundColor:color}} >
                                <td>{index + 1}</td>
                                {values.map(v => (

                                    <td>{v}</td>
                                ))}
                            </tr>
                        )
                    })}
                </table>
            </div>

            <div className="index-color">
                <h1>Chất lượng không khí</h1>
                <div className="table-color">
                    {/* <div className="good-index"> */}
                        <div className="good-color"></div>
                        <div className="good-title color-title">Tốt</div>
                    {/* </div> */}
                    {/* <div className="normal-index"> */}
                        <div className="normal-color"></div>
                        <div className="normal-title color-title">Bình Thường</div>
                    {/* </div> */}
                    {/* <div className="bad-index"> */}
                        <div className="bad-color"></div>
                        <div className="bad-title color-title">Không Tốt</div>
                    {/* </div> */}
                    {/* <div className="very-bad-index"> */}
                        <div className="very-bad-color"></div>
                        <div className="very-bad-title color-title">Độc Hại</div>
                    {/* </div> */}
                </div>

            </div>
        </div>
        </>
    )
}