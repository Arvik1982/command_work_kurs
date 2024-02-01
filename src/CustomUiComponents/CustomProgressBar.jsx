import React from 'react';

function CustomProgressBar({color, progress}) {
    const styles = {
        frame: {
            width: '278px',
            height: '35px',
            borderRadius: '22px',
            border: `2px solid ${color}`,
            overflow: 'hidden',
        },
        filling: {
            width: `${progress}%`,
            background: `${color}`,
            color: '#FFF',
            fontFamily: 'StratosSkyeng',
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: '32px',
            textAlign: 'end',
            paddingRight: '20px'
        }
    }
    return (
        <div>
            <div style={styles.frame}>
                <div style={styles.filling}>
                    {progress}%
                </div>
            </div>
        </div>
    );
}

export default CustomProgressBar;