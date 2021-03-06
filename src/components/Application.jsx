import React from "react";

import DayList from './DayList';
import Appointment from './Appointment';

import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay } from '../helpers/selectors';
import { getInterviewersForDay } from '../helpers/selectors';
import { getInterview } from '../helpers/selectors';

import "components/Application.scss";

//No props passed in (top level component)
export default function Application() {

  const {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const filteredInterviewers = getInterviewersForDay(state, state.day);
  
  const filteredAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = filteredAppointments.map(appointment => {

    return(
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={filteredInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />

      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
