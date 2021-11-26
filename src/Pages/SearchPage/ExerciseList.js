import React,{useState,useEffect} from 'react';
import Timetable from '../../Components/home/Timetable'
import LargeButton from '../../Components/common/LargeButton'
import Navigator from '../../Components/common/Navigator'
import ExerciseItem from '../../Components/search/ExerciseItem'
import '../../css/Pages/SearchPage/ExerciseList.css'
import {Link} from 'react-router-dom';
import Back from '../../Components/common/Back';
import MultiRange from '../../Components/search/MultiRange'
import {DownOutlined,CloseOutlined} from '@ant-design/icons';
import axios from 'axios';

const ExerciseList = (props) => {
    //카테고리 메뉴창을 오픈
    const [isOpenMenu,setIsOpenMenu] = useState(false);
    const openMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    //초기 클래스 필터링 세팅
    const [category,setCategory] = useState('격투')
    const [subCategory,setSubCategory] = useState('전체')
    const [sort,setSort] = useState('dst')
    
    //클래스 리스트 세팅
    const [classList,setClassList] = useState([])
    useEffect(() => {
        const token = window.localStorage.getItem('TOKEN_KEY')
        const config = {
            headers:{"Authorization": `Bearer ${token}`}
        };

        axios.get(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${sort}`,config)
        .then(response=>{
            console.log(response.status)
            if(response.data.message === 'SUCCESS'){
                console.log('success:',response.data.classes)
                setClassList(response.data.classes)
            }else{
                console.log(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    //시간대 필터링 설정 팝업창
    const [time,setTime] = useState(0)
    const timePopup = () => {
        return(
            <div className="time-popup">

            </div>
        )
    }

    //가격대 필터링 팝업창
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

    //거리 필터링 팝업창
    const [distance,setDistance] = useState(0)
    const distancePopup = () => {
        return(
            <div className="popup">
                <h3>거리</h3>
            </div>
        )
    }
    
    //
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
                        <div className="dropdown-menu">
                            <ul className="first-category">
                                <li>구기종목</li>
                                <li>구기종목</li>
                                <li>구기종목</li>
                                <li>구기종목</li>
                            </ul>
                        </div>
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