import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './Input';

function App() {
  const [range,setRange] = useState('');
  const timeRange = Array.from({ length: 22 }, (_, i) => i + 5); 

  const initialExcludedTime = JSON.parse(localStorage.getItem("time-picker")) || ['13'];
  const [excludedTime, setExcludedTime] = useState([]);

  const [selectedTime, setSelectedTime] = useState(JSON.parse(localStorage.getItem("time-picker")));

  const handleTimeClick = (time) => {
    setSelectedTime((prevSelectedTime) =>
      prevSelectedTime.includes(time)
        ? prevSelectedTime.filter((t) => t !== time)
        : [...prevSelectedTime, time]
    );
    localStorage.setItem("time-picker", JSON.stringify(selectedTime));
  };
  const handleClick = () => {
    const updatedExcludedTime = excludedTime.filter(time => time !== range);
    localStorage.setItem("time-picker", JSON.stringify(updatedExcludedTime));
    setExcludedTime(updatedExcludedTime);
    setRange(''); 
  };

  useEffect(() => {
    localStorage.setItem("time-picker", JSON.stringify(selectedTime));
    
    setExcludedTime(JSON.parse(localStorage.getItem("time-picker")));
    
    console.log({
      selectedTimeRange: ['2', '5-22'],
      excludedTime: JSON.parse(localStorage.getItem("time-picker")),
      selectedTime,
    });
  }, [selectedTime]);


  return (
    <div className="time-picker-container">
    <h3 className="time-picker-header">Select Time Slots</h3>
    <div className="time-grid">
      {timeRange.map((time) => {
        const timeString = time.toString();
        const isSelected = selectedTime.includes(timeString);
        const isExcluded = excludedTime.includes(timeString);

        return (
          <div
            key={time}
            className={`time-slot ${isSelected ? 'selected' : ''} ${isExcluded ? 'excluded' : ''}`}
            onClick={() => !isExcluded && handleTimeClick(timeString)}
          >
            <span>{timeString}</span>
            
          </div>
          
        );
      })}
    </div>
    <Input
            range={range}
            setRange={setRange}/>
            <button onClick={handleClick}>clear</button>
            <ol>
              <li>This is time range selection app.</li>
              <li>The user can able to select any time between the range.</li>
              <li>The picked time is stored in local storage which cannot change when page reload occurs.</li>
              <li>The user also able to remove the selected time by entering the time and when button is clicked the stored element is removed from local storage.</li>
            </ol>
  </div>
  );
}

export default App;
