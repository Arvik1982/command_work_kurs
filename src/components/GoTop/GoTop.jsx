import styles from './goTop.module.css'


export default function GoTop(){

    const ButtonUp = () => {
        window.scrollTo({top: 0,behavior: "smooth"});
      };

    return<button
     type='button' 
     className={styles.main__footer_button}
     onClick={ButtonUp}>Наверх ↑</button>
}