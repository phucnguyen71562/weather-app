import React from 'react';
import { FaBars, FaCloudSun, FaMapMarkerAlt, FaMinus } from 'react-icons/fa';
import dayjs from '../../config/dayjs.config';
import { useGlobal } from '../../contexts/GlobalProvider';
import { HourlyWeather } from '../HourlyWeather';
import { StyledContainer, StyledTemperature } from './Weather.style';

export interface HourlyWeatherProps {
  hourlyWeather: {
    dt?: number;
    weather?: {
      description?: string;
      icon?: string;
    }[];
    temp?: number;
  }[];
}

interface Props extends HourlyWeatherProps {
  currentWeather: {
    weather?: {
      description?: string;
      icon?: string;
    }[];
    main?: {
      feels_like?: number;
      humidity?: number;
      pressure?: number;
      temp?: number;
      temp_max?: number;
      temp_min?: number;
    };
    clouds?: {
      all?: number;
    };
    sys?: {
      sunset?: number;
    };
    name?: string;
    lastRequestCall?: number;
  };
  setVisible: (visible: boolean) => void;
}

function Weather({ currentWeather, hourlyWeather, setVisible }: Props) {
  const { isDesktop } = useGlobal();
  const { weather, main, clouds, sys, name } = currentWeather;

  const handleClick = () => {
    if (isDesktop) return;
    setVisible(true);
  };

  return (
    <StyledContainer className="text-white overflow-hidden lg:pt-20">
      {!isDesktop && (
        <button
          className="absolute top-0 right-0 pt-4 pr-4"
          onClick={() => setVisible(true)}
        >
          <FaBars />
        </button>
      )}

      <div className="flex items-center justify-center mt-4">
        <div
          className={`flex-shrink-0 w-20 h-20 ${
            !weather && 'flex items-center justify-center'
          }`}
        >
          {weather ? (
            <img
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
              className="object-contain w-20 h-20"
            />
          ) : (
            <FaMinus />
          )}
        </div>
        <div className="font-roboto">
          <p className="text-xl font-roboto text-gray-200 leading-5 tracking-wide font-medium">
            Today
          </p>
          <p className="text-sm text-gray-400 leading-5 whitespace-no-wrap mt-2">
            {dayjs().format('ddd, D MMM')}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col">
        {main?.temp ? (
          <StyledTemperature className="font-light font-roboto relative -mt-4 -mb-4">
            {Math.round(main.temp)}
            <span
              className="text-xl font-light absolute top-7"
              style={{ right: -25 }}
            >
              &#8451;
            </span>
          </StyledTemperature>
        ) : (
          <div className="flex items-center text-6xl" onClick={handleClick}>
            <FaCloudSun /> <span className="text-4xl">+</span>
          </div>
        )}

        {weather && (
          <p className="text-sm text-gray-300 capitalize">
            {weather[0].description}
          </p>
        )}

        {name && (
          <p className="flex items-center text-gray-300 capitalize mt-4">
            <FaMapMarkerAlt />
            <span className="ml-1">{name}</span>
          </p>
        )}
      </div>

      {(main?.feels_like || sys?.sunset) && (
        <div className="flex items-center justify-center mt-6 font-medium text-gray-400">
          <p className="mx-4">Feels like {main?.feels_like}</p>
          &bull;
          <p className="mx-4">
            Sunset {sys?.sunset && dayjs(sys.sunset * 1000).format('hh:mm A')}
          </p>
        </div>
      )}

      <HourlyWeather hourlyWeather={hourlyWeather} />

      <div className="flex justify-evenly w-full my-8">
        <div className="flex flex-col justify-between items-center">
          <p className="text-gray-500">Humidity</p>
          <p className="text-xl mt-2">
            {main?.humidity ? `${main.humidity}%` : <FaMinus />}
          </p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <p className="text-gray-500">Pressure</p>
          <p className="text-xl mt-2">
            {main?.pressure ? `${main.pressure}hPa` : <FaMinus />}
          </p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <p className="text-gray-500">Clouds</p>
          <p className="text-xl mt-2">
            {clouds?.all ? `${clouds.all}%` : <FaMinus />}
          </p>
        </div>
      </div>
    </StyledContainer>
  );
}

export default Weather;
