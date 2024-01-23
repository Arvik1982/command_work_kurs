// import './app.module.css';
import AppRoutes from './routes';
import ContentBox from "./components/ContentBox/ContentBox";
import styles from './app.module.css'


function App() {
  return (
    <div className={styles.app}>
      <ContentBox>
        <AppRoutes />
      </ContentBox>
    </div>
  )
}

export default App
