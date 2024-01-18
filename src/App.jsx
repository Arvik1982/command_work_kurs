import './app.module.css';
import AppRoutes from './routes';
import ContentBox from "./components/CenterLayout/ContentBox";
import styles from './app.module.css'
import {useEffect, useState} from "react";

function App() {
    const [device, setDevice] = useState(null);
    useEffect(() => {
        const windowWidth = window.innerWidth
        console.log('window = ', windowWidth)
        if (windowWidth >= 1300)
            setDevice('computer')
        if (windowWidth <= 1300 && windowWidth > 800)
            setDevice('tablet')
        if (windowWidth <= 800)
            setDevice('phone')
    }, [window.innerWidth]);
    return (
        <div className={styles.app}>
            <ContentBox yourDevice={device}>
                <AppRoutes/>
            </ContentBox>
        </div>
    );
}

export default App;
