import httpService from '../services/httpService';

const weatherApi = {
  fetchCurrentWeather: (params: object) => {
    const url = '/weather';

    return httpService.get(url, { params });
  },

  fetchForecast: (params: object) => {
    const url = '/onecall';

    return httpService.get(url, { params });
  },
};

export default weatherApi;
