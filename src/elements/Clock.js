import React, { useState, useEffect } from 'react';
import '../styles/Clock.css';

//Funkcja zegara wyświetlająca aktulany czas i datę.
function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (time) => {
    const dayOfWeek = time.toLocaleDateString('pl-PL', { weekday: 'long' });
    const day = time.getDate();
    const month = time.toLocaleDateString('pl-PL', { month: '2-digit' });
    const year = time.getFullYear();
  
    const formattedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  
    return `${formattedDayOfWeek} ${day}.${formattedMonth}.${year}`;
  };
  
  return (
    <div className="clock">
      <p>{formatTime(currentTime)}</p>
      <p>{formatDate(currentTime)}</p>
    </div>
  );
}

export default Clock;
