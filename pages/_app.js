import { useState } from 'react';
import MainContext from './context/Main.contex';
import './../styles/global/global.css'




function MyApp({ Component, pageProps }) {
  const [weatherData, setWeatherData] = useState('');
    const [dailyWeather, setDailyWeather] = useState([]);
    const [cities, setCities] = useState(null);
    const [city, setCity] = useState('');
    const [cityLocation, setCityLocation] = useState({});

    const state = {
    // values
  
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weatherData,
    dailyWeather,
    cities,
    city,
    cityLocation,
    timerId: 0,
    
    // functions 
    setWeatherData,
    setDailyWeather,
    setCities,
    setCity,
    setCityLocation,
    getCurrentTimeWeather(){
        let date = new Date(),
            hours = date.getHours(),
            currentResultIndex = -1;

        this.weatherData.list.map((e, i) => {
            let compareDate = e.dt_txt.slice(11, 13);
            if (hours - +compareDate <= 2 && currentResultIndex < 0) {
                currentResultIndex = i;
            }

            return e;
        })

        return state.weatherData.list[currentResultIndex];

    },
    getWeatherIcon: (id) => {
        let hours = new Date().getHours();

        if (id >= 200 && id < 300) {
            return 'bi bi - cloud - lightning'
        }

        if (id >= 300 && id < 400) {
            return 'bi bi-cloud-drizzle'
        }

        if (id >= 500 && id < 511) {
            return 'bi bi-cloud-rain'
        }
        if (id === 511) {
            return 'bi bi-snow'
        }

        if (id >= 520 && id < 600) {
            return 'bi bi-cloud-rain-heavy'
        }

        if (id >= 600 && id < 700) {
            return 'bi bi-snow2'

        }

        if (id >= 700 && id < 800) {
            return 'bi bi-cloud-haze'
        }

        if (id === 800) {
            if (hours >= 18) {
                return 'bi bi-moon'
            }

            return 'bi bi-brightness-high'
        }

        if (id === 801) {
            if (hours >= 18) {
                return 'bi bi-cloud-moon'
            }
            return 'bi bi-cloud-sun'
        }

        if (id === 802) {
            return 'bi bi-cloud'
        }

        if (id === 803 || id === 804) {
            return 'bi bi-clouds'
        }
    },
}

  return <MainContext.Provider value = {state}>
    <Component {...pageProps} />
  </MainContext.Provider>
}

export default MyApp
