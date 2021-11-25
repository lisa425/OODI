import React,{useState} from 'react';
import Timetable from '../../Components/home/Timetable'
import LargeButton from '../../Components/common/LargeButton'
import Navigator from '../../Components/common/Navigator'
import ExerciseItem from '../../Components/search/ExerciseItem'
import '../../css/Pages/SearchPage/ExerciseList.css'
import {Link} from 'react-router-dom';
import Back from '../../Components/common/Back';
import MultiRange from '../../Components/search/MultiRange'
import {DownOutlined,CloseOutlined} from '@ant-design/icons';

const ExerciseList = (props) => {

    const [isOpenMenu,setIsOpenMenu] = useState(false);
    const openMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    const [time,setTime] = useState(0)
    const timePopup = () => {
        return(
            <div className="time-popup">

            </div>
        )
    }

    const [price,setPrice] = useState(0)
    const pricePopup = () => {
        return(
            <div className="popup">
                <header className="popup-title">
                    <h3>가격</h3>
                    <CloseOutlined />
                </header>
                <input type="range" min="100" max="234,000" value={price} onChange={()=>setPrice(price)}/>
                <div></div>
            </div>
        )
    }
    const [distance,setDistance] = useState(0)
    const distancePopup = () => {
        return(
            <div className="popup">
                <h3>거리</h3>
            </div>
        )
    }
    
    return(
        <>
        <main className="ExerciseListPage">
            <header>
                <section className="category">
                    <Back link="/home"/>
                    <div className="category-name">
                        <h3 onClick={() => openMenu()}>격투</h3>
                        <DownOutlined style={{fontSize:'12px',position:'relative',top:'2px'}}/>
                    </div>
                    <div className={isOpenMenu ? "open-menu" : "hide-menu"}>
                        <ul className="first-category">
                            <li>구기종목</li>
                            <li>격투</li>
                            <li>수영</li>
                            <li>골프</li>
                        </ul>
                    </div>
                </section>
                <section className="filtering">
                    <button id="time">시간</button>
                    <button id="price">가격</button>
                    <button id="location">거리</button>
                </section>
                <section className="type">
                    <button id="all">전체</button>
                    <button id="oneday">원데이</button>
                    <button id="month1">1개월</button>
                    <button id="month3">3개월</button>
                    <button id="month6">6개월</button>
                </section>
                <section className="sort">
                    <select name="sort">
                        <option value="new">신규순</option>
                        <option value="new">거리순</option>
                        <option value="new">가격순</option>
                    </select>
                </section>
            </header>
            <article className="exercise-list">
                <Link to="/search/detail"><ExerciseItem id="01"/></Link>
                <Link to="/search/detail"><ExerciseItem id="01"/></Link>
                <Link to="/search/detail"><ExerciseItem id="01"/></Link>
                <Link to="/search/detail"><ExerciseItem id="01"/></Link>
                <Link to="/search/detail"><ExerciseItem id="01"/></Link>
                <Link to="/search/detail"><ExerciseItem id="01"/></Link>
            </article>
        </main>
        <Navigator/>
        </>
    )
}

export default ExerciseList