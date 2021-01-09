import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import weatherApi from './apis/weatherApi';
import './App.css';
import { StyledContainer } from './App.style';
import { Drawer } from './components/Drawer';
import { MainPanel } from './components/MainPanel';
import { Weather } from './components/Weather';
import { GlobalProvider } from './contexts/GlobalProvider';
import useLocalStorage from './hooks/useLocalStorage';
import useMediaQuery from './hooks/useMediaQuery';
import { diffMinsFromNow, isDifferentDay } from './utils/day';

function App() {
  const isDesktop = useMediaQuery('(min-width: 991px)');
  const [visible, setVisible] = useState(false);

  const [cities, setCities] = useLocalStorage('cities', {
    data: [],
    current: null,
  });
  const [currentWeather, setCurrentWeather] = useLocalStorage('current', {});
  const [forecastWeather, setForecastWeather] = useLocalStorage('forecast', {
    daily: [],
    hourly: [],
  });

  const currentCity = cities.data.find(
    (city: any) => city.id === cities.current
  );

  useEffect(() => {
    if (currentCity) {
      const getCurrentWeather = async () => {
        const data = await weatherApi.fetchCurrentWeather({
          q: currentCity.name,
          units: 'metric',
          appid: process.env.REACT_APP_API_KEY,
        });

        setCurrentWeather({ ...data, lastRequestCall: Date.now() });
      };

      if (
        !currentWeather.lastRequestCall ||
        diffMinsFromNow(currentWeather.lastRequestCall) >= 10
      )
        getCurrentWeather();
    }
  }, [currentCity, currentWeather.lastRequestCall, setCurrentWeather]);

  useEffect(() => {
    if (currentCity) {
      const getForecast = async () => {
        const data: any = await weatherApi.fetchForecast({
          lon: currentCity.coord.lon,
          lat: currentCity.coord.lat,
          exclude: 'current,minutely,alerts',
          units: 'metric',
          appid: process.env.REACT_APP_API_KEY,
        });

        setForecastWeather({
          daily: data.daily.slice(1),
          hourly: data.hourly.slice(0, 24),
          lastRequestCall: Date.now(),
        });
      };

      if (
        !forecastWeather.lastRequestCall ||
        isDifferentDay(forecastWeather.lastRequestCall)
      )
        getForecast();
    }
  }, [currentCity, forecastWeather.lastRequestCall, setForecastWeather]);

  const renderMainPanel = () => {
    return (
      <MainPanel
        cities={cities}
        setCities={setCities}
        dailyWeather={forecastWeather.daily}
        lastRequestCall={forecastWeather.lastRequestCall}
        setCurrentWeather={setCurrentWeather}
        setForecastWeather={setForecastWeather}
      />
    );
  };

  return (
    <GlobalProvider value={{ isDesktop }}>
      <StyledContainer className="w-screen h-screen bg-white flex overflow-hidden relative">
        <ToastContainer />

        {isDesktop ? (
          renderMainPanel()
        ) : (
          <Drawer visible={visible} setVisible={setVisible}>
            {renderMainPanel()}
          </Drawer>
        )}

        <Weather
          currentWeather={currentWeather}
          hourlyWeather={forecastWeather.hourly}
          setVisible={setVisible}
        />
      </StyledContainer>
    </GlobalProvider>
  );
}

export default App;
