import React, { useState } from 'react';
import styles from './CountdownForm.module.css';

const CountdownForm = ({ targetDateTime, setTargetDateTime }) => {
    const [dateTime, setDateTime] = useState('');
    const maxDays = 99;
    
    const calculateTimeLeft = () => {
        const difference = targetDateTime ? targetDateTime - new Date() : 0;
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        } else {
          timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
      const [countdownOver, setCountdownOver] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const selectedDate = new Date(dateTime);
      const currentDate = new Date();
  
      // Calculate the cut-off date
      const cutOffDate = new Date();
      cutOffDate.setDate(currentDate.getDate() + maxDays);
  
      if (selectedDate > cutOffDate) {
        alert(`Please select a date within ${maxDays} days from the current date.`);
        return;
      }
  
      setTargetDateTime(selectedDate);
    };
  
    return (
      <form onSubmit={handleSubmit} className={styles.countdownForm}>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          max={getMaxDateTime()}
        />
        <button type="submit">Start Timer</button>

        <div className={styles.timerContainer}>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.days).padStart(2, '0')} <span style={{color:"grey"}}>Days</span>
              </div>
            </div>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.hours).padStart(2, '0')}<span style={{color:"grey"}}>Hours</span>
              </div>
            </div>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.minutes).padStart(2, '0')} <span style={{color:"grey"}}>Minutes</span>
              </div>
            </div>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.seconds).padStart(2, '0')} <span style={{color:"grey"}}>Seconds</span>
              </div>
            </div>
          </div>
      </form>
    );
  };
  
  // Function to get the maximum date and time for the date picker
  const getMaxDateTime = () => {
    const maxDays = 99;
    const currentDate = new Date();
    const cutOffDate = new Date();
    cutOffDate.setDate(currentDate.getDate() + maxDays);
  
    const year = cutOffDate.getFullYear();
    const month = String(cutOffDate.getMonth() + 1).padStart(2, '0');
    const day = String(cutOffDate.getDate()).padStart(2, '0');
    const hours = '23';
    const minutes = '59';
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  export default CountdownForm;