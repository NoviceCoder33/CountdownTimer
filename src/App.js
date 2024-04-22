import React, { useState } from 'react';
import './App.css';
import CountdownForm from './components/CountdownForm';
import CountdownTimer from './components/CountdownTimer';

function App() {
  const [targetDateTime, setTargetDateTime] = useState(null);

  return (
    <div className="App">
      <h1 style={{color:"#fff"}}> Countdown <span style={{color:"purple"}}>Timer</span></h1>
      {!targetDateTime ? (
        <CountdownForm setTargetDateTime={setTargetDateTime}  />
      ) : (
        <CountdownTimer targetDateTime={targetDateTime} setTargetDateTime={setTargetDateTime} />
      )}
    </div>
  );
}

export default App;