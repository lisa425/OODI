import React from 'react';
import '../../css/Components/Common/Navigator.css'
import {Link} from 'react-router-dom';

const Navigator = () => {
    return(
        <nav className="navigator">
            <ul className="navigator-wrapper">
                <li className="navigator-item"><Link to="/">Home</Link></li>
                <li className="navigator-item"><Link to="/search">Search</Link></li>
                <li className="navigator-item"><Link to="/">Message</Link></li>
                <li className="navigator-item"><Link to="/">Mypage</Link></li>
            </ul>
        </nav>
    )
}

export default Navigator