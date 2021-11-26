import React from 'react';
import LargeButton from '../../Components/common/LargeButton'
import {Link,useNavigate} from 'react-router-dom';
import Navigator from '../../Components/common/Navigator'

const MyPage = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.clear()
        navigate('/')
    }
    return(
        <>
        <main className="myPage">
            my page
            <button onClick={()=>logout()}>로그아웃</button>
        </main>
        <Navigator/>
        </>
    )
}

export default MyPage