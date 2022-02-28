import { useEffect, useCallback, useContext } from 'react';
import SearchForm from "./MainContentComponents/SearchForm";
import Today from "./MainContentComponents/WeatherMainDay";
import styles from './../../styles/main/main.module.css'
import Weather from './MainContentComponents/Weather';
import MainContext from '../context/Main.contex';


export default function MainContent() {
    const state = useContext(MainContext);

    const getCityWeatherData = useCallback(() => {
        if (state.cityLocation.lat && state.cityLocation.lon) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${state.cityLocation.lat}&lon=${state.cityLocation.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}`)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(result => state.setWeatherData(() => result));
                    }
                })
        }

    }, [state.cityLocation])

    const getCityDailyWeather = useCallback(() => {
        if (state.cityLocation.lat && state.cityLocation.lon) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${state.cityLocation.lat}&lon=${state.cityLocation.lon}&exclude=minutely,hourly&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}`)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(result => {
                                state.setDailyWeather(() => result);
                            })
                    }
                })
        }
    }, [state.cityLocation])

    const getCityLocation = useCallback(() => {
        if (state.city) {
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${state.city}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_SECRET}`)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(result => {
                                state.setCities(() => result);
                            });
                    } else {
                        state.setCities(() => []);
                    }
                })
        }
    }, [state.city])

    const inputHandler = e => {
        clearTimeout(state.timerId);
        state.timerId = setTimeout(() => {
            state.setCity(() => e.target.value);
        }, 500)
    }

    const renderDays = () => {

        if (state.dailyWeather) {
            return state.dailyWeather.daily?.slice(1, -1).map((e, i) => {
                return <Weather key={i} weatherDayIndex={i} weatherData={e}></Weather>
            })
        }

        return '';
    }

    useEffect(() => {
        if (state.city) {
            getCityLocation();
        }
    }, [state.city]);

    useEffect(() => {
        if (state.cityLocation) {
            getCityWeatherData();
            getCityDailyWeather();
        }
    }, [state.cityLocation])

    return (
        <main className={styles.main_container}>
            <div className={styles.main_wrapper}>
                <SearchForm
                    inputHandler={inputHandler}
                    cities={state.cities}
                    setCityLocation={state.setCityLocation}
                ></SearchForm>

                {
                    state.weatherData
                    &&

                    <div>
                        <Today></Today>
                        <ul className={styles.days_list}>
                            {renderDays()}
                        </ul>
                    </div>
                }
            </div>
        </main >
    )
}