import React from 'react';

function DatesList(props) {
  return (
    <div className="dates__list">
      {props.data.map((el, i) => {
        const { data, name, count, distance } = el;

        return (
          <div className="dates__item">
            <span className="dates__data">{data}</span>
            <span className="dates__name">{name}</span>
            <span className="dates__count">{count}</span>
            <span className="dates__distance">{distance}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DatesList;
