import styles from './css/videoPage.module.css'
import BlackLogo from "../components/Logo/BlackLogo";
import Progress from "../components/Progress/Progress";

function VideoPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <BlackLogo route='/profile'/>
                <div className={styles.header_profile}>
                    <div className={styles.header_photo}/>
                    <div>Профиль</div>
                </div>
            </div>
            <h2 className={styles.video__title}>Йога</h2>
            <p className={styles.video__lesson}>
                Красота и здоровье / Йога на каждый день / 2 день
            </p>
            <div className={styles.video__play}>
                <p className={styles.play__text}>Пока тут нечего смотреть</p>
            </div>
            <div className={styles.video__box}>
                <div className={styles.video__left}>
                    <h3 className={styles.left__title}>Упражнения</h3>
                    <ul className={styles.left__lessons}>
                        <li>Наклон вперед (10 повторений)</li>
                        <li>Наклон назад (10 повторений)</li>
                        <li>Поднятие ног, согнутых в коленях (5 повторений)</li>
                    </ul>
                    <button className={styles.left__btn}>Заполнить свой прогресс</button>
                </div>
                <Progress/>
            </div>
        </div>
    );
}

export default VideoPage;