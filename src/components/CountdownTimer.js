import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';
import CountdownForm from './CountdownForm';

const CountdownTimer = ({ targetDateTime, setTargetDateTime }) => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Check if countdown is over
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setCountdownOver(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleCancel = () => {
    setTargetDateTime(null);
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    setCountdownOver(false);
  };

 

  return (
    <div className={styles.countdownTimer}>
      { !countdownOver && (
        <>
          <div className={styles.timerContainer}>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.days).padStart(2, '0')} <span style={{color:"grey"}}>Days</span>
              </div>
            </div>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.hours).padStart(2, '0')} <span style={{color:"grey"}}>Hours</span>
              </div>
            </div>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.minutes).padStart(2, '0')} <span style={{color:"grey"}}>Minutes</span>
              </div>
            </div>
            <div className={styles.timerBox}>
              <div className={styles.timerValue}>
                {String(timeLeft.seconds).padStart(2, '0')} <span style={{color:"grey"}}>Seconds </span>
              </div>
            </div>
          </div>
          <button className={styles.cancelbtn} onClick={handleCancel}>Cancel Timer</button>
        </>
      )}
      { countdownOver && (
        <>
        <CountdownForm/> 
        <div className={styles.countdownOver}>
          <p>🎉 The Countdown is over! What's next on your adventure? 🎉</p>
        </div>
        </>
        
      )}
    </div>
  );
};

export default CountdownTimer;
