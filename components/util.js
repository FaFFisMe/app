import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

export const fetchApiData = async (url, timeInterval, setJsonData, handleLogout) => {
  try {
    const apiKey = await AsyncStorage.getItem('api_key');
    const userName = await AsyncStorage.getItem('username');
    if (!apiKey) {
      handleLogout();
      return;
    }

    const apiUrl = `${url}${userName}/${timeInterval}?secret=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data) {
        setJsonData(divideTTIBy6924(data));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const convertMillisToTime = (millis) => {
    if (millis === null || isNaN(millis)) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
        hoursConv: "00",
        minutesConv: "00",
        secondsConv: "00"
      };
    }
  
    let hour = 0;
    let minute = 0;
    let second = 0;
    let Convhour = 0;
    let Convminute = 0;
    let Convsecond = 0;

    hour = Math.floor(millis / 60000 / 60);
    minute = Math.floor((millis % (60000 * 60)) / 60000);
    second = Math.floor((millis % 60000) / 1000);

    const formattedHours = hour.toString().padStart(2, "0");
    const formattedMinutes = minute.toString().padStart(2, "0");
    const formattedSeconds = second.toString().padStart(2, "0");
  
    return {
      hours: formattedHours,
      minutes: formattedMinutes,
      seconds: formattedSeconds,
      hoursConv: hour,
      minutesConv: minute,
      secondsConv: second
    };
  };  

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState({
    countAll: 0,
    countOngoing: 0,
    countClosed: 0,
    TTDavg: 0,
    TTIavg: 0,
    TTRavg: 0,
  });

  return (
    <DataContext.Provider value={{ jsonData, setJsonData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};


const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [timeInterval, setTimeInterval] = useState("Daily");

  return (
    <TimeContext.Provider value={{ timeInterval, setTimeInterval }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  return useContext(TimeContext);
};

function divideTTIBy6924(inputJSON) {
  if (!inputJSON || typeof inputJSON !== 'object') {
    return null; 
  }

  const keysToDivide = ['TTIall', 'TTImax', 'TTImin', 'TTIavg',
    'TTDall', 'TTDmax', 'TTDmin', 'TTDavg',
    'TTRall', 'TTRmax', 'TTRmin', 'TTRavg', 
  ];

  keysToDivide.forEach((key) => {
    if (inputJSON[key] && Array.isArray(inputJSON[key])) {
      inputJSON[key] = inputJSON[key].map((value) => {
        if (!isNaN(value)) {
          const result = parseFloat(value) / 6924;
          return isNaN(result) ? null : result.toString();
        }
        return value;
      });
    } else if (!isNaN(inputJSON[key])) {
      const result = parseFloat(inputJSON[key]) / 6924;
      inputJSON[key] = isNaN(result) ? null : result.toString();
    }
  });

  return inputJSON;
}
