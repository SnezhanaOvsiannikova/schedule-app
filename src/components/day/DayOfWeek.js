import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const selectedAllRow = ({ activeDays, day }) =>
  activeDays.some(el => el === day);

const renderCells = ({ dayData, day, onCellClick }) => {
  return [...Array(24).keys()].map((el, i) => {
    const bt = i * 60;
    const et = (i + 1) * 60 - 1;
    const isActive = dayData.some(event => bt >= event.bt && et <= event.et);

    return (
      <div
        key={el}
        className={`cell ${isActive ? "active-cell" : ""}`}
        onClick={() => {
          onCellClick({ day, bt, et });
        }}
      ></div>
    );
  });
};

const getIsActive = ({ activeDays, day }) =>
  activeDays.indexOf(day) !== -1 ? "active" : "";

const DayOfWeek = ({ day, activeDays, clickHandler, dayData, onCellClick }) => {
  return (
    <div className="row-wrap">
      <div
        className={`day ${
          dayData.length || selectedAllRow({ activeDays, day })
            ? "selected-day"
            : ""
        }`}
      >
        {day}
      </div>
      <div
        className={`checkbox ${getIsActive({ activeDays, day })}`}
        onClick={() => clickHandler(day)}
      ></div>
      {renderCells({ dayData, day, activeDays, onCellClick })}
    </div>
  );
};

DayOfWeek.propTypes = {
  day: PropTypes.string.isRequired,
  activeDays: PropTypes.arrayOf(PropTypes.string),
  clickHandler: PropTypes.func,
  dayData: PropTypes.array,
  onCellClick: PropTypes.func
};

export default DayOfWeek;
