import { useState, useEffect, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SearchForm from "./MainContentComponents/SearchForm";
import Today from "./MainContentComponents/WeatherMainDay";
import styles from './../../styles/main/main.module.css'
import Weather from './MainContentComponents/Weather';
import MainContext from '../context/Main.contex';

const state = {
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
    }

}

export default function MainContent() {
    const [weatherData, setWeatherData] = useState('');
    const [dailyWeather, setDailyWeather] = useState([]);
    const [cities, setCities] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState('shymkent');
    const [cityLocation, setCityLocation] = useState({});
    let timerId = 0;


    const getCityWeatherData = useCallback(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => setWeatherData(() => result));
                }
            })

        setIsLoading(() => false);
    }, [cityLocation])

    const getCityDailyWeather = useCallback(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLocation.lat}&lon=${cityLocation.lon}&exclude=minutely,hourly&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            setDailyWeather(() => result);
                        })
                }
            })
    }, [cityLocation])

    const getCityLocation = useCallback(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}`)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(result => {
                            setCities(() => result);
                        });
                } else {
                    setCities(() => []);
                }
            })
        setIsLoading(() => false);
    }, [city])

    const getCurrentTimeWeather = () => {
        let date = new Date(),
            hours = date.getHours(),
            currentResultIndex = -1;

        weatherData.list.map((e, i) => {
            let compareDate = e.dt_txt.slice(11, 13);
            if (hours - +compareDate <= 2 && currentResultIndex < 0) {
                currentResultIndex = i;
            }

            return e;
        })

        return weatherData.list[currentResultIndex];

    }

    const inputHandler = e => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            setCity(() => e.target.value);
        }, 500)
    }

    const renderDays = () => {

        if (dailyWeather) {
            return dailyWeather.daily?.slice(1, -1).map((e, i) => {
                return <Weather key={i} weatherData={e}></Weather>
            })
        }

        return '';
    }

    useEffect(() => {
        if (city) {
            setIsLoading(() => true);
            getCityLocation();
        }
    }, [city]);

    useEffect(() => {
        if (cityLocation) {
            setIsLoading(() => true);
            getCityWeatherData();
            getCityDailyWeather();
        }
    }, [cityLocation])

    return (
        <MainContext.Provider value={state}>
            <main className={styles.main_container}>
                <div className={styles.main_wrapper}>
                    <SearchForm
                        inputHandler={inputHandler}
                        cities={cities}
                        setCityLocation={setCityLocation}
                    ></SearchForm>
                    {
                        isLoading && !weatherData
                        &&
                        <CircularProgress />
                    }
                    {
                        !isLoading && weatherData
                        &&

                        <div>
                            <Today
                                city={weatherData.city.name}
                                country={weatherData.city.country}
                                todayWeather={getCurrentTimeWeather()}
                            ></Today>
                            <ul className={styles.days_list}>
                                {renderDays()}
                            </ul>
                        </div>
                    }
                </div>
            </main >
        </MainContext.Provider>
    )
}