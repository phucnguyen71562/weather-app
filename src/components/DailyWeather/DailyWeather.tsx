import React from 'react';
import { FaFan, FaLongArrowAltRight, FaTint } from 'react-icons/fa';
import dayjs from '../../config/dayjs.config';
import { DailyWeatherProps } from '../MainPanel/MainPanel';

function DailyWeather({ dailyWeather, lastRequestCall }: DailyWeatherProps) {
  return (
    <div className="flex flex-col mt-6">
      <div className="flex items-center justify-between w-full">
        <h4 className="flex items-center text-blue-900 font-medium">
          <FaLongArrowAltRight />
          <span className="ml-2 tracking-wide leading-7 sm:leading-9">
            Week
          </span>
        </h4>
        {lastRequestCall && (
          <span className="text-sm text-gray-400 font-roboto">
            Last update: {dayjs(lastRequestCall).format('HH:mm DD/MM/YYYY')}
          </span>
        )}
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-4">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <tbody>
                {dailyWeather.map(
                  ({ dt, humidity, weather, temp, feels_like, wind_speed }) => {
                    return (
                      <tr key={dt}>
                        <td className="px-6 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-blue-900 capitalize">
                            {dayjs(dt! * 1000).format('dddd')}
                          </div>
                        </td>
                        <td className="px-6 whitespace-no-wrap">
                          <div className="flex items-center">
                            <FaTint className="fill-current text-blue-500" />
                            <span className="ml-2 text-gray-500">
                              {humidity}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 whitespace-no-wrap">
                          <div className="px-2 flex-shrink-0 w-15 h-15">
                            {weather && (
                              <img
                                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                                alt={weather[0].description}
                                className="object-contain w-15 h-15"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-6 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                          {Math.round(temp?.day!)}&#8451;
                        </td>
                        <td className="px-6 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                          <div className="flex items-center">
                            <FaFan className="animate-spin fill-current text-green-500" />
                            <span className="ml-2">{wind_speed}mps</span>
                          </div>
                        </td>
                        <td className="px-6 whitespace-no-wrap text-sm leading-5 font-medium text-blue-900">
                          RealFeel&#174; {Math.round(feels_like?.day!)}&#8451;
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyWeather;
