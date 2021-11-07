import React from 'react';
import { toast } from 'react-toastify';
import Unsplash, { toJson } from 'unsplash-js';
import { Cities } from '../Cities';
import { DailyWeather } from '../DailyWeather';
import { StyledContainer, StyledWrapper } from './MainPanel.style';

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || '',
});

export interface DailyWeatherProps {
  dailyWeather: {
    dt?: number;
    humidity?: number;
    weather?: {
      description?: string;
      icon?: string;
    }[];
    temp?: {
      day?: number;
    };
    feels_like?: {
      day?: number;
    };
    wind_speed?: number;
  }[];
  lastRequestCall?: number;
}
interface Props extends DailyWeatherProps {
  cities: {
    data: {
      id: number;
      name: string;
      image: string;
    }[];
    current: number;
  };
  setCities: (data: object) => void;
  setCurrentWeather: (data: object) => void;
  setForecastWeather: (data: object) => void;
}

function MainPanel({
  cities,
  setCities,
  dailyWeather,
  lastRequestCall,
  setCurrentWeather,
  setForecastWeather,
}: Props) {
  const getWeather = (params: any): void => {
    setCities(params);
    setCurrentWeather({ lastRequestCall: null });
    setForecastWeather({ daily: [], hourly: [], lastRequestCall: null });
  };

  const handleAddCity = (params: any): void => {
    const city = cities.data.find((city) => city.id === params.id);

    if (city) return;

    unsplash.search
      .photos(params?.name.toLowerCase(), 1, 1)
      .then(toJson)
      .then((json: any) => {
        getWeather({
          data: [
            ...cities.data,
            { ...params, image: json?.results[0]?.urls?.regular },
          ],
          current: params.id,
        });
      })
      .catch((e) => toast.error(e.message));
  };

  const handleSetCurrentCity = (params: any): void => {
    getWeather({
      ...cities,
      current: params.id,
    });
  };

  const handleRemoveCity = (params: any): void => {
    const index = cities.data.findIndex((item: any) => item.id === params.id);
    if (index > -1) {
      let city;
      const array = [...cities.data];

      array.splice(index, 1);

      if (cities.current !== params.id) {
        setCities({
          ...cities,
          data: array,
        });
        return;
      }

      if (cities.data.length > 1) {
        if (index === 0) {
          city = cities.data[index + 1];
        } else {
          city = cities.data[index - 1];
        }
      } else {
        city = {};
      }

      getWeather({
        data: array,
        current: city?.id ?? null,
      });
    }
  };

  return (
    <StyledContainer className="h-full p-6 lg:px-12 flex flex-col overflow-y-auto align-items-end">
      <StyledWrapper>
        <h1 className="text-3xl font-light sm:leading-9 leading-7 tracking-tight text-blue-900">
          Weather <span className="font-bold">Forecast</span>
        </h1>

        <Cities
          cities={cities}
          onSetCurrentCity={handleSetCurrentCity}
          onAddCity={handleAddCity}
          onRemoveCity={handleRemoveCity}
        />

        <DailyWeather
          dailyWeather={dailyWeather}
          lastRequestCall={lastRequestCall}
        />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default MainPanel;
