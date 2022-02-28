import { useContext } from 'react'
import styles from './../../../styles/main/main.module.css'
import MainContext from '../../context/Main.contex'

export default function Weather(props) {
    const state = useContext(MainContext);
    const weatherData = state.dailyWeather.daily[props.weatherDayIndex];

    return (
        <li className={styles.current_day}>
            <h2 className={styles.current_day_title}>{state.weekDays[new Date(weatherData.dt * 1000).getDay()]}</h2>
            <i className={`${state.getWeatherIcon(weatherData.weather[0].id)} ${styles.current_day_icon}`}></i>
            <div className={styles.current_day_temperature_container}>
                <span className={styles.current_day_max_temperature}>Max: {parseInt(weatherData.temp.max - 273)}<sup>o</sup></span>
                <span className={styles.current_day_min_temperature}>Min: {parseInt(weatherData.temp.min - 273)}<sup>o</sup></span>
            </div>
            <p className={styles.current_day_weather_description}>{weatherData.weather[0].description}</p>
        </li>
    )
}