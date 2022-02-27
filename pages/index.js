import Head from 'next/head';
import HeaderContent from './components/Header';
import MainContent from './components/Main';
import styles from './../styles/main/main.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather app</title>
      </Head>
      <div className={styles.content_container}>
        <HeaderContent></HeaderContent>
        <MainContent></MainContent>
      </div>
    </div>
  )
}
