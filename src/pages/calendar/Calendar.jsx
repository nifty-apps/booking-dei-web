import React from 'react';
import Kalend, { CalendarView } from 'kalend';
import 'kalend/dist/styles/index.css';

const Calendar = () => {

  const onEventClick = (event) => {
    // Handle event click logic here
    console.log('Event clicked:', event);
  };

  const onNewEventClick = (event) => {
    // Handle new event click logic here
    console.log('New event clicked:', event);
  };

  const onSelectView = (event) => {
    // Handle view selection logic here
    console.log('View selected:', event);
  };

  const onPageChange = (date) => {
    // Handle page change logic here
    console.log('Page changed:', date);
  };

  const selectedView = CalendarView.WEEK;

  return (
    <div className='content-wrapper d-flex flex-column'>
      <div className="content-header">
        <Kalend
          onEventClick={onEventClick}
          onNewEventClick={onNewEventClick}
          events={[]}
          initialDate={new Date().toISOString()}
          hourHeight={60}
          initialView={CalendarView.WEEK}
          disabledViews={[CalendarView.DAY]}
          onSelectView={onSelectView}
          selectedView={selectedView}
          onPageChange={onPageChange}
          timeFormat={'24'}
          weekDayStart={'Monday'}
          calendarIDsHidden={['work']}
          language={'en'}
        />
      </div>
    </div>
  );
};

export default Calendar;
