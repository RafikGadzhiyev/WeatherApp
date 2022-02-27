import styles from './../../styles/main/main.module.css'

export default function HeaderContent() {
    return (
        <header
            className={styles.header_container}
        >
            <span
                className={styles.header_title}
            >Weather app</span>
        </header>
    )
}