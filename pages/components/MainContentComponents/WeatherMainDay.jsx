import { useState, useEffect, useContext } from 'react';
import styles from './../../../styles/main/main.module.css'
import MainContext from '../../context/Main.contex';

export default function Today() {
    const state = useContext(MainContext);
    const todayWeather = state.getCurrentTimeWeather();

    return (
        <div
            className={styles.today_weather_container}
        >
            {state && todayWeather &&
                <>
                    <p
                        className={styles.today_weather_country}
                    >{state.weatherData.city.name}, {state.weatherData.city.country}</p>
                    <p
                        className={styles.today_weather_temperature}
                    >{Math.round(todayWeather.main.temp - 273)}<sup>o</sup></p>
                    <i className={`${state.getWeatherIcon(todayWeather.weather[0].id)} ${styles.today_weather_icon}`}></i>
                    <p
                        className={styles.today_weather_description}
                    >{todayWeather.weather[0].description}</p>
                    <p
                        className={styles.today_weather_date}
                    >{state.weekDays[new Date(todayWeather.dt_txt).getDay()]} {todayWeather.dt_txt.slice(11)}</p>
                    <div
                        className={styles.today_weather_information}
                    >
                        <span
                            className={styles.today_weather_information_text}
                        >Wind {todayWeather.wind.speed} m/s</span>
                        <span
                            className={styles.today_weather_information_text}
                        >Pressure {todayWeather.main.pressure} hPa</span>
                        <span
                            className={styles.today_weather_information_text}
                        >Humidity {todayWeather.main.humidity}%</span>

                    </div>
                </>
            }
        </div>
    )
}