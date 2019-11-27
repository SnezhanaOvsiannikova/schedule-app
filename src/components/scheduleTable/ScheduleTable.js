import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayOfWeek from "../day/DayOfWeek";
import { GET_SCHEDULE_DATA_REQUEST } from "../../actions/actionsType";
import "./style.css";

const week = ["mo", "tu", "we", "th", "fr", "sa", "su"];
const timeLapse = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00"
];

const fillDayEvents = () =>
  [...Array(24).keys()].map((el, i) => {
    const bt = i * 60;
    const et = (i + 1) * 60 - 1;

    return {
      bt,
      et
    };
  });

const clickHandler = ({
  day,
  week,
  activeDays,
  setActiveDays,
  setIsAllSet,
  scheduleData,
  setScheduleData
}) => {
  const indexDay = activeDays.indexOf(day);

  if (indexDay !== -1) {
    setScheduleData({
      ...scheduleData,
      [day]: []
    });
    setActiveDays([
      ...activeDays.slice(0, indexDay),
      ...activeDays.slice(indexDay + 1)
    ]);
    return;
  }

  setScheduleData({
    ...scheduleData,
    [day]: fillDayEvents()
  });

  week.forEach(el => {
    if (el === day && indexDay === -1) {
      setActiveDays([...activeDays, day]);
    }
  });
};

const clearDaysEvents = ({ scheduleData, setScheduleData }) =>
  setScheduleData(
    Object.keys(scheduleData).reduce(
      (acc, item) => ({
        ...acc,
        [item]: []
      }),
      {}
    )
  );

const setAllActiveDays = ({
  week,
  setActiveDays,
  isAllSet,
  setIsAllSet,
  scheduleData,
  setScheduleData
}) => {
  if (isAllSet) {
    clearDaysEvents({ scheduleData, setScheduleData });
    setActiveDays([]);
    setIsAllSet(false);
  } else {
    setScheduleData(
      Object.keys(scheduleData).reduce(
        (acc, item) => ({
          ...acc,
          [item]: fillDayEvents()
        }),
        {}
      )
    );
    setActiveDays(week);
    setIsAllSet(true);
  }
};

const renderDays = ({
  week,
  activeDays,
  setActiveDays,
  setIsAllSet,
  clickHandler,
  scheduleData,
  setScheduleData,
  onCellClick
}) => {
  return (
    Object.keys(scheduleData).length &&
    week.map(el => (
      <DayOfWeek
        key={el}
        day={el}
        dayData={scheduleData[el]}
        activeDays={activeDays}
        clickHandler={day =>
          clickHandler({
            day,
            week,
            activeDays,
            setActiveDays,
            setIsAllSet,
            scheduleData,
            setScheduleData
          })
        }
        onCellClick={({ day, bt, et }) =>
          onCellClick({
            day,
            bt,
            et,
            scheduleData,
            setScheduleData,
            activeDays,
            setActiveDays
          })
        }
      />
    ))
  );
};

const renderTimeCells = () => {
  let timeCount = 0;
  return [...Array(24).keys()].map((el, i) => {
    if (i % 3 === 0) {
      const value = timeLapse[timeCount];
      timeCount++;
      return (
        <div key={el} className="cell">
          <span>{value}</span>
        </div>
      );
    } else {
      return <div key={el} className="cell"></div>;
    }
  });
};

const onCellClick = ({
  day,
  bt,
  et,
  scheduleData,
  setScheduleData,
  activeDays,
  setActiveDays
}) => {
  const indexEl = scheduleData[day].findIndex(
    el => el.bt === bt && el.et === et
  );
  const activeDayIdx = activeDays.indexOf(day);

  if (activeDayIdx !== -1 && scheduleData[day].length === 24) {
    setActiveDays([
      ...activeDays.slice(0, activeDayIdx),
      ...activeDays.slice(activeDayIdx + 1)
    ]);
  }

  if (indexEl !== -1) {
    const copyDataDay = [...scheduleData[day]];

    setScheduleData({
      ...scheduleData,
      [day]: [
        ...copyDataDay.slice(0, indexEl),
        ...copyDataDay.slice(indexEl + 1)
      ]
    });
  } else {
    if (scheduleData[day].length === 23) setActiveDays([...activeDays, day]);

    setScheduleData({
      ...scheduleData,
      [day]: [
        ...scheduleData[day],
        {
          bt,
          et
        }
      ]
    });
  }
};

const saveChanges = ({ scheduleData }) =>
  console.log("Save Results: ", scheduleData);

const checkDayIsFilled = (data, setActiveDays) =>
  setActiveDays(Object.keys(data).filter(day => data[day].length === 24));

const ScheduleTable = () => {
  const [activeDays, setActiveDays] = useState([]);
  const [isAllSet, setIsAllSet] = useState(false);
  const scheduleDataFromStore = useSelector(state => state.scheduler.data);
  const [scheduleData, setScheduleData] = useState(scheduleDataFromStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_SCHEDULE_DATA_REQUEST });
    checkDayIsFilled(scheduleDataFromStore, setActiveDays);
    setScheduleData(scheduleDataFromStore);
  }, [dispatch, scheduleDataFromStore]);

  if (Object.keys(scheduleData).length === 0) return <h1>Loading...</h1>;

  return (
    <>
      <div className="heading-table row-wrap">
        <div className="left-block"></div>
        <div
          className="select-all-days"
          onClick={() =>
            setAllActiveDays({
              week,
              setActiveDays,
              isAllSet,
              setIsAllSet,
              scheduleData,
              setScheduleData
            })
          }
        >
          All day
        </div>
        {renderTimeCells()}
      </div>
      {renderDays({
        week,
        activeDays,
        setActiveDays,
        setIsAllSet,
        clickHandler,
        scheduleData,
        setScheduleData,
        onCellClick
      })}
      <div className="buttons-wrap">
        <button
          className="btn"
          onClick={() => {
            clearDaysEvents({ scheduleData, setScheduleData });
            setActiveDays([]);
            setIsAllSet(false);
          }}
        >
          Clear
        </button>
        <button className="btn" onClick={() => saveChanges({ scheduleData })}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default ScheduleTable;
