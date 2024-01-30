import React from "react";
import data from "../../data/tasks-example.json";
import Task from "./Task";
import SubCategory from "./SubCategory";

export default function ListTasks(props) {
  const { dayWeek, dayMonth, calendarVue } = props;

  const getActivityTypes = (activityTypes) => {
    let results = [];
    for (let i = 0; i < activityTypes.length; i++) {
      const getActivityInfo = activityTypes[i];

      results.push(
        <>
          <SubCategory activityName={getActivityInfo.activityName} key={i} />
          <>
            {getActivityInfo.Tasks.map((task, i) => {
              return (
                <Task
                  key={i}
                  taskName={task.taskName}
                  taskDays={task.days}
                  dayWeek={dayWeek}
                  dayMonth={dayMonth}
                  calendarVue={calendarVue}
                />
              );
            })}
          </>
        </>
      );
    }
    return results;
  };

  return (
    <section className="w-full">
      {data.map((category, i) => (
        <div className="w-full">
          <h5 key={i} className="text-darkGreen">
            {category.categoryName}
          </h5>
          <>{getActivityTypes(category.activityTypes)}</>
        </div>
      ))}
    </section>
  );
}