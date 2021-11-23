import React from 'react';
import '../../css/Components/Common/Navigator.css'
import {Link} from 'react-router-dom';
import {HomeOutlined,SearchOutlined,MessageOutlined,SettingOutlined} from '@ant-design/icons'

const Navigator = () => {
    return(
        <nav className="navigator">
            <ul className="navigator-wrapper">
                <li className="navigator-item"><Link to="/"><HomeOutlined /></Link></li>
                <li className="navigator-item"><Link to="/search"><SearchOutlined /></Link></li>
                <li className="navigator-item"><Link to="/question"><MessageOutlined /></Link></li>
                <li className="navigator-item"><Link to="/mypage"><SettingOutlined /></Link></li>
            </ul>
        </nav>
    )
}

export default Navigator