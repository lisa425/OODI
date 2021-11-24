import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Back} from '../../Assets/image/icons/back.svg'
const Navigator = (props) => {
    return(
        <Link to={props.link}>
            <Back />
        </Link>
    )
}

export default Navigator