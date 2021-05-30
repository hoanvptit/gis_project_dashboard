import React from 'react';
import { FaAngleLeft, FaAngleRight  } from 'react-icons/fa';
import './date.css'
export const DateTime = (props) => {
  const _date = props.date;
  const isDisabled = props.disable;
  const increDate = () => {
    let time = new Date(_date.getTime() + 24 * 60 * 60 * 1000);
    props.onChange(time);
  };

  const decreDate = () => {
    let time = new Date(_date.getTime() - 24 * 60 * 60 * 1000);
    props.onChange(time);
  };
  return (
    <>
      <div className="prevDate date" >
        <FaAngleLeft className="narrow" onClick={decreDate} disabled={isDisabled}> </FaAngleLeft>
      </div>
      <div className="currentDate date">
        <p>Date:  {_date.getDate()}/{_date.getMonth() + 1}/{_date.getFullYear()}</p>
      </div>
      <div className="nextDate date" >
        <FaAngleRight className="narrow" onClick={increDate} disabled={isDisabled}> </FaAngleRight>
      </div>
    </>
  )
}

export default DateTime;