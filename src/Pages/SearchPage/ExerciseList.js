import React,{useState} from 'react';
import Timetable from '../../Components/home/Timetable'
import LargeButton from '../../Components/common/LargeButton'
import Navigator from '../../Components/common/Navigator'
import ExerciseItem from '../../Components/search/ExerciseItem'
import '../../css/Pages/SearchPage/ExerciseList.css'
import {Link} from 'react-router-dom';

const ExerciseList = (props) => {

    const [isOpenMenu,setIsOpenMenu] = useState(false);
    const openMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    return(
        <>
        <main className="ExerciseListPage">
            <header>
                <section className="category">
                    <h3 onClick={() => openMenu()}>격투</h3>
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
                    <div id="time">시간</div>
                    <div id="price">가격</div>
                    <div id="location">거리</div>
                </section>
                <section className="type">
                    <div id="all">전체</div>
                    <div id="oneday">원데이</div>
                    <div id="month1">1개월</div>
                    <div id="month3">3개월</div>
                    <div id="month6">6개월</div>
                </section>
                <section className="sort">
                    <select name="sort">
                        <option value="new">신규순</option>
                        <option value="new">인기순</option>
                        <option value="new">낮은가격순</option>
                        <option value="new">높은가격순</option>
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