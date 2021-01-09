import React from 'react';
import dayjs from '../../config/dayjs.config';
import useHorizontalScroll from '../../hooks/useHorizontalScroll';
import { HourlyWeatherProps } from '../Weather/Weather';
import { StyledContainer, StyledItem } from './HourlyWeather.style';

function HourlyWeather({ hourlyWeather }: HourlyWeatherProps) {
  const scrollRef = useHorizontalScroll();

  return (
    <StyledContainer
      className="flex my-12 overflow-x-scroll overflow-y-hidden"
      ref={scrollRef}
    >
      {hourlyWeather.map(({ dt, weather, temp }) => {
        return (
          <StyledItem className="flex flex-col items-center mr-2" key={dt}>
            <p className="text-gray-400 text-sm">
              {dayjs(dt! * 1000).format('hh:mm')}
            </p>
            <div className="flex-shrink-0 w-10 h-10">
              {weather && (
                <img
                  src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                  alt={weather[0].description}
                  className="object-contain w-10 h-10"
                />
              )}
            </div>
            <p className="text-gray-400 text-sm">{Math.round(temp!)}&#8451;</p>
          </StyledItem>
        );
      })}
    </StyledContainer>
  );
}

export default HourlyWeather;
