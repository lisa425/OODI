import React,{useState,useEffect,useRef} from 'react';
import Timetable from '../../Components/home/Timetable'
import LargeButton from '../../Components/common/LargeButton'
import Navigator from '../../Components/common/Navigator'
import ExerciseItem from '../../Components/search/ExerciseItem'
import '../../css/Pages/SearchPage/ExerciseList.css'
import {Link,useParams} from 'react-router-dom';
import Back from '../../Components/common/Back';
import MultiRange from '../../Components/search/MultiRange'
import {DownOutlined,CloseOutlined} from '@ant-design/icons';
import axios from 'axios';

const ExerciseList = (props) => {
    const categoryId = useParams()["categoryId"];

    //카테고리 메뉴창을 오픈
    const [isOpenMenu,setIsOpenMenu] = useState(false);
    const openMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    //초기 클래스 필터링 세팅
    const [category,setCategory] = useState(categoryId)
    const [subCategory,setSubCategory] = useState('전체')
    const sub_category_list = {
        '구기종목':['전체','축구','농구','베드민턴','야구','테니스'],
        '격투':['전체','복싱.킥복싱','펜싱','검도.합기도','태권도.택견','유도.가라테','무에타이.쿵푸','레슬링'],
        '골프':['전체','실내골프','야외골프'],
        '수영':['전체','실내수영','바다수영','서핑','수상스키'],
        '심신수련':['전체','명상','요가','필라테스','기공수련','단전호흡'],
        '헬스':['전체','PT','PT샵','헬스장']
    }

    
    const [renderCategory,setRenderCategory] = useState([])
    const showSubCategory = (e) => {
        let categoryName = e.target.id
        setRenderCategory(sub_category_list[categoryName])
        setCategory(categoryName)
    }
    const setSubCategoryData = (e) => {
        let subCategoryName = e.target.id
        setSubCategory(subCategoryName);
        setCategoryData({
            category:category,
            subCategory:subCategory
        })
    }
    const [sort,setSort] = useState('dst')
    const [categoryData,setCategoryData] = useState({})
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
                console.log('success:',response.data)
                setClassList(response.data.classes)
            }else{
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [categoryData])

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

    //카테고리 필터링 리스트 가져오기


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
                        <h3 onClick={() => openMenu()}>{category}</h3>
                        <DownOutlined style={{fontSize:'12px',position:'relative',top:'2px'}}/>
                    </div>
                    <div className={isOpenMenu ? "open-menu" : "hide-menu"}>
                        <div className="dropdown-menu">
                            <div className="first-category">
                                <li id="구기종목" onClick={showSubCategory}>구기종목</li>
                                <li id="격투" onClick={showSubCategory}>격투</li>
                                <li id="골프" onClick={showSubCategory}>골프</li>
                                <li id="수영" onClick={showSubCategory}>수영</li>
                                <li id="심신수련" onClick={showSubCategory}>심신수련</li>
                                <li id="헬스" onClick={showSubCategory}>헬스</li>
                            </div>
                            <div className="sub-category">
                                {renderCategory.map((item,index) => (
                                    <li id={item} key={index} onClick={setSubCategoryData}>{item}</li>
                                ))}
                            </div>
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