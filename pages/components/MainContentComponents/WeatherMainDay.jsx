import { useContext } from 'react';
import styles from './../../../styles/main/main.module.css'
import MainContext from '../../context/Main.contex';

export default function Today(props) {
    const state = useContext(MainContext);

    return (
        <div
            className={styles.today_weather_container}
        >
            <p
                className={styles.today_weather_country}
            >{props.city}, {props.country}</p>
            <p
                className={styles.today_weather_temperature}
            >{Math.round(props.todayWeather.main.temp - 273)}<sup>o</sup></p>
            <i className={`${state.getWeatherIcon(props.todayWeather.weather[0].id)} ${styles.today_weather_icon}`}></i>
            <p
                className={styles.today_weather_description}
            >{props.todayWeather.weather[0].description}</p>
            <p
                className={styles.today_weather_date}
            >{state.weekDays[new Date(props.todayWeather.dt_txt).getDay()]} {props.todayWeather.dt_txt.slice(11)}</p>
            <div
                className={styles.today_weather_information}
            >
                <span
                    className={styles.today_weather_information_text}
                >Wind {props.todayWeather.wind.speed} m/s</span>
                <span
                    className={styles.today_weather_information_text}
                >Pressure {props.todayWeather.main.pressure} hPa</span>
                <span
                    className={styles.today_weather_information_text}
                >Humidity {props.todayWeather.main.humidity}%</span>

            </div>
        </div>
    )
}