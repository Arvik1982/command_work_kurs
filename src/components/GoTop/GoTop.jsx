import styles from './goTop.module.css'

export default function GoTop() {
  const buttonUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // window.scrollBy(0,-50)
    // document.body.scrollIntoView()
  }
  return (
    <button
      type="button"
      className={styles.main__footer_button}
      onClick={buttonUp}
    >
      Наверх ↑
    </button>
  )
}
