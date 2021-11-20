import React from 'react';
import '../../css/Components/Common/Navigator.css'
const Navigator = () => {
    return(
        <nav className="navigator">
            <ul className="navigator-wrapper">
                <li className="navigator-item">Home</li>
                <li className="navigator-item">Search</li>
                <li className="navigator-item">Message</li>
                <li className="navigator-item">Mypage</li>
            </ul>
        </nav>
    )
}

export default Navigator