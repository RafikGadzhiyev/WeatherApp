import { useEffect, useState, useContext } from 'react'
import MainContext from '../../context/Main.contex';
import styles from './../../../styles/main/main.module.css'

export default function SearchForm(props) {
    const [cities, setCities] = useState([]);
    const state = useContext(MainContext);

    useEffect(() => {
        setCities(() => getCitiesAfterFiltering());
    }, [state.cities])

    function getCitiesAfterFiltering() {
        if (state.cities) {
            let result = [],
                locations = [];

            state.cities.map((e, i) => {
                if (!locations.includes('' + e.lat + e.lon)) {
                    result.push({
                        name: e.name,
                        country: e.country,
                        location: {
                            lat: e.lat,
                            lon: e.lon
                        }
                    })
                }
                locations.push('' + e.lat + e.lon);
                return e;
            })
            return result;
        }

        return [];
    }

    return (
        <form
            className={styles.main_form}
        >
            <input
                type="text"
                placeholder="type searching country"
                onChange={e => props.inputHandler(e)}
                className={styles.main_form_input}
            />

            {
                !!cities.length &&
                <ul
                    className={styles.main_form_cities_list}
                >
                    {cities.map((e, i) => <li
                        key={i}
                        className={styles.main_form_city}
                    ><button
                        type='button'
                        className={styles.main_form_city_button}
                        onClick={() => {
                            state.setCityLocation(() => e.location);
                            setCities(() => []);
                        }}
                    >
                            {e.name}, {e.country}
                        </button>
                    </li>)}
                </ul>
            }
        </form>
    )
}