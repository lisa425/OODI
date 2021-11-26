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
    const sub_category_list = {
        '구기종목':[],
        '격투':['복싱.킥복싱','펜싱','검도.합기도','태권도.택견','유도.가라테','무에타이.쿵푸','레슬링'],
        '골프':[],
        '수영':[],
        '심신수련':['명상','요가','필라테스','기공수련','단전호흡'],
        '헬스':[]
    }
    const showSubCategory = (e) => {
        console.log(e.current.id);
        sub_category_list[category].map((subcategory,index)=>{
            console.log(subcategory)
        })
    }
    const setCategoryData = (e) => {
        // let subCategory = e.target.id
    }
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
            if(response.data.message === 'SUCCESS'){
                console.log('success')
                setClassList(response.data.classes)
            }else{
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const renderClass = classList.map((item,index) => {
        let originPrice = item.lessonTimes[0].originPrice
        let price = item.lessonTimes[0].price
        let type;
        switch(item.type){
            case "oneday":
                type = "원데이";
                break;
            case "month1":
                type = "1개월";
                break;
            case "month3":
                type = "3개월";
                break;
            case "month6":
                type = "6개월";
                break;
            default:
                type="상담 후 지정"
                break;
        }

        return(
            <Link to={`/search/${item.id}`} key={index}>
                <ExerciseItem 
                    id={item.id} 
                    title={item.title}
                    address={item.address}
                    distance={item.distance} 
                    subCategory={item.subCategory} 
                    type={type} 
                    discountRate={item.discountRate} 
                    originPrice={originPrice.toLocaleString()} 
                    price={price.toLocaleString()} 
                />
            </Link>
        )
    })

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
                                <li id="ball" onClick={showSubCategory}>구기종목</li>
                                <li id="" onClick={showSubCategory}>격투</li>
                                <li id="골프" onClick={showSubCategory}>골프</li>
                                <li id="수영" onClick={showSubCategory}>수영</li>
                                <li id="심신수련">심신수련</li>
                                <li id="헬스">헬스</li>
                            </ul>
                            <ul className="sub-category">
                                
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
                {renderClass}
            </article>
        </main>
        <Navigator/>
        </>
    )
}

export default ExerciseList