import {useState} from "react";

export default function ContentBox({yourDevice, children}) {
    const [devices] = useState({
        computer: `1200px`,
        tablet: `700px`,
        phone: `400px`
    })
    return (
        <div style={{width: devices[yourDevice]}}>
            {children}
        </div>
    );
}

