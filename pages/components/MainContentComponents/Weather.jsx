import { useContext } from 'react'
import styles from './../../../styles/main/main.module.css'
import MainContext from '../../context/Main.contex'

export default function Weather(props) {
    const state = useContext(MainContext);
    return (
        <li className={styles.current_day}>
            <h2 className={styles.current_day_title}>{state.weekDays[new Date(props.weatherData.dt * 1000).getDay()]}</h2>
            <i className={`${state.getWeatherIcon(props.weatherData.weather[0].id)} ${styles.current_day_icon}`}></i>
            <div className={styles.current_day_temperature_container}>
                <span className={styles.current_day_max_temperature}>Max: {parseInt(props.weatherData.temp.max - 273)}<sup>o</sup></span>
                <span className={styles.current_day_min_temperature}>Min: {parseInt(props.weatherData.temp.min - 273)}<sup>o</sup></span>
            </div>
            <p className={styles.current_day_weather_description}>{props.weatherData.weather[0].description}</p>
        </li>
    )
}