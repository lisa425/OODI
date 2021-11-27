import React,{useState,useEffect,useRef} from 'react';
// import Timetable from '../../Components/search/Timetable'
// import LargeButton from '../../Components/common/LargeButton'
import Navigator from '../../Components/common/Navigator'
import ExerciseItem from '../../Components/search/ExerciseItem'
import PricePopup from '../../Components/search/PricePopup'
import DistancePopup from '../../Components/search/DistancePopup'
import TimePopup from '../../Components/search/TimePopup'
import '../../css/Pages/SearchPage/ExerciseList.css'
import {Link,useParams} from 'react-router-dom';
import Back from '../../Components/common/Back';
// import MultiRange from '../../Components/search/MultiRangeSlider'
import {DownOutlined,CloseOutlined} from '@ant-design/icons';
import axios from 'axios';
import ball from '../../Assets/image/pictogram/ball.png'
import fight from '../../Assets/image/pictogram/fight.png'
import fitness from '../../Assets/image/pictogram/fitness.png'
import golf from '../../Assets/image/pictogram/golf.png'
import swim from '../../Assets/image/pictogram/swim.png'
import yoga from '../../Assets/image/pictogram/yoga.png'


const ExerciseList = (props) => {
    //axios header setting
    const token = window.localStorage.getItem('TOKEN_KEY')
    const config = {
        headers:{"Authorization": `Bearer ${token}`}
    };

    //========카테고리 필터링=========
    //초기 클래스 필터링 세팅
    const categoryId = useParams()["categoryId"];
    const [category,setCategory] = useState(categoryId)
    const [subCategory,setSubCategory] = useState('전체')

    //카테고리 리스트
    const sub_category_list = {
        '구기종목':['전체','축구','농구','배드민턴','야구','테니스'],
        '격투':['전체','복싱.킥복싱','펜싱','검도.합기도','태권도.택견','유도.가라테','무에타이.쿵푸','레슬링'],
        '골프':['전체','실내골프','야외골프'],
        '수영':['전체','실내수영','바다수영','서핑','수상스키'],
        '심신수련':['전체','명상','요가','필라테스','기공수련','단전호흡'],
        '헬스':['전체','PT','PT샵','헬스장']
    }

    //카테고리 메뉴창을 오픈
    const [isOpenMenu,setIsOpenMenu] = useState(false);
    const openMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    //카테고리 필터링 적용한 클래스 리스트 갱신
    const [renderCategory,setRenderCategory] = useState([])
    //1차 카테고리
    const showSubCategory = (e) => {
        let categoryName = e.target.id
        setRenderCategory(sub_category_list[categoryName])
        setCategory(categoryName)
    }
    //2차 카테고리
    const setSubCategoryData = (e) => {
        let subCategoryName = e.target.id
        setSubCategory(subCategoryName);
        setCategoryData({
            category:category,
            subCategory:subCategory
        })
    }

    //========클래스 타입 필터링 설정========
    const [classType,setClassType] = useState('전체');
    //선택 타입 스타일
    const [allType,setAllType] = useState(false);
    const [onedayType,setOnedayType] = useState(false);
    const [month1Type,setMonth1Type]= useState(false);
    const [month3Type,setMonth3Type] = useState(false);
    const [month6Type,setMonth6Type] = useState(false);

    const showClassTypeList = (e) => {
        setClassType(e.target.id)
    }

    useEffect(()=>{
        axios.post(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${classType}/${sort}`,{},config)
        .then(response => {
            console.log(`hi ${classType}`)
            if(response.data.message === 'SUCCESS'){
                console.log('success원데이:',response.data)
                setClassList(response.data.classes)
            }
        }).catch((error)=>{
            console.log(error)
        })

        switch(classType){
            case "전체":
                setAllType(!allType)
                setOnedayType(false)
                setMonth1Type(false)
                setMonth3Type(false)
                setMonth6Type(false)
                break;
            case "원데이클래스":
                setOnedayType(!onedayType)
                setAllType(false)
                setMonth1Type(false)
                setMonth3Type(false)
                setMonth6Type(false)
                break;
            case "1개월":
                setMonth1Type(!month1Type)
                setOnedayType(false)
                setAllType(false)
                setMonth3Type(false)
                setMonth6Type(false)
                break;
            case "3개월":
                setMonth3Type(!month3Type)
                setMonth1Type(false)
                setOnedayType(false)
                setAllType(false)
                setMonth6Type(false)
                break;
            case "6개월":
                setMonth6Type(!month6Type)
                setMonth3Type(false)
                setMonth1Type(false)
                setOnedayType(false)
                setAllType(false)
                break;
        }
    },[classType])

    


    //======정렬 필터링 세팅=======
    const [sort,setSort] = useState('time')
    const handleSort = (e) => {
        setSort(e.target.value);
        console.log(sort)
    }
    useEffect(()=>{
        axios.get(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${classType}/${sort}`,config)
        .then(response=>{
            if(response.data.message === 'SUCCESS'){
                console.log('success:',response.data)
                setImageInfo(response.data.imageInfo)
                setClassList(response.data.classes)
                setPriceRange([response.data.lowest,response.data.highest])
            }else{
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    },[sort])


    //========가격 범위 설정========
    const [isPrice,setIsPrice] = useState(false)
    const [priceRange,setPriceRange] = useState([])
    const [newPrice,setNewPrice] = useState([])
    //가격 범위 팝업 설정
    const showPricePopup = () => {
        setIsPrice(true)
    }
    useEffect(()=>{
        console.log(newPrice)
        if(newPrice.length > 0){
            let data = {
                price:newPrice
            }
            axios.post(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${sort}`,data,config)
            .then(response => {
                console.log('hi')
                if(response.data.message === 'SUCCESS'){
                    console.log('success:',response.data)
                    setClassList(response.data.classes)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    },[newPrice])

    //========거리 범위 설정========
    const [isDistance,setIsDistance] = useState(false)
    const [newDistance,setNewDistance] = useState(0)
    //거리 범위 팝업 설정
    const showDistancePopup = () => {
        setIsDistance(true)
    }
    useEffect(()=>{
        console.log(newDistance)
        if(newDistance > 0){
            let data = {
                distance:newDistance
            }
            axios.post(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${classType}/${sort}`,data,config)
            .then(response => {
                console.log('hi distance')
                if(response.data.message === 'SUCCESS'){
                    console.log('success dst:',response.data)
                    setClassList(response.data.classes)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    },[newDistance])

    //========시간 범위 설정========
    const [isTime,setIsTime] = useState(false)
    const [selectedTime,setSelectedTime] = useState([])
    //시간 범위 팝업 설정
    const showTimePopup = () => {
        setIsTime(true)
    }

    useEffect(()=>{
        let data = {
            time:selectedTime
        }
        axios.post(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${classType}/${sort}`,data,config)
        .then(response => {
            if(response.data.message === 'SUCCESS'){
                console.log('success time filter:',response.data)
                setClassList(response.data.classes)
            }else{
                console.log('request is success,but fail')
            }
        }).catch((error)=>{
            console.log(error)
        })
    },[selectedTime])


    const [categoryData,setCategoryData] = useState({})

    //클래스 리스트 세팅
    const [classList,setClassList] = useState([])
    const [ImageInfo,setImageInfo] = useState([]) 

    useEffect(() => {
        console.log(token)
        axios.get(`http://localhost:8080/class/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}/${classType}/${sort}`,config)
        .then(response=>{
            if(response.data.message === 'SUCCESS'){
                console.log('success:',response.data)
                setImageInfo(response.data.imageInfo)
                setClassList(response.data.classes)
                setAllType(true)
                setPriceRange([response.data.lowest,response.data.highest])
                
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
        let userGu = item.address.split('동')
        console.log(`아이템:${index}`,ImageInfo)
        return(
            <Link to={`/search/detail/${item.id}`} key={index}>
                <ExerciseItem 
                    id={item.id} 
                    title={item.title}
                    address={`${userGu[0]}동`}
                    distance={item.distance} 
                    subCategory={item.subCategory} 
                    type={item.type} 
                    discountRate={item.discountRate} 
                    originPrice={originPrice.toLocaleString()} 
                    price={price.toLocaleString()} 
                    imageInfo={ImageInfo}
                />
            </Link>
        )
    })


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
                                <li id="구기종목" onClick={showSubCategory}>
                                    <img src={ball} alt="구기종목"/>
                                    <p>구기종목</p>
                                </li>
                                <li id="격투" onClick={showSubCategory}>
                                    <img src={fight} alt="격투"/>
                                    <p>격투</p>
                                </li>
                                <li id="골프" onClick={showSubCategory}>
                                    <img src={golf} alt="골프"/>
                                    <p>골프</p>
                                </li>
                                <li id="수영" onClick={showSubCategory}>
                                    <img src={swim} alt="수상스포츠"/>
                                    <p>수상스포츠</p>
                                </li>
                                <li id="심신수련" onClick={showSubCategory}>
                                    <img src={yoga} alt="심신수련"/>
                                    <p>심신수련</p>
                                </li>
                                <li id="헬스" onClick={showSubCategory}>
                                    <img src={fitness} alt="헬스"/>
                                    <p>헬스</p>
                                </li>
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
                    <button className={isTime ? "blue-button":"white-button"} id="time" onClick={()=>showTimePopup()}>시간</button>
                    <button className={isPrice ? "blue-button":"white-button"} id="price" onClick={()=>showPricePopup()}>가격</button>
                    <button className={isDistance ? "blue-button":"white-button"}  id="location" onClick={()=>showDistancePopup()}>거리</button>
                </section>
                <section className="type">
                    <button id="전체" onClick={(e)=>showClassTypeList(e)} className={allType ? "selected-type":null}>전체</button>
                    <button id="원데이클래스" onClick={(e)=>showClassTypeList(e)} className={onedayType ? "selected-type":null}>원데이</button>
                    <button id="1개월" onClick={(e)=>showClassTypeList(e)} className={month1Type ? "selected-type":null}>1개월</button>
                    <button id="3개월" onClick={(e)=>showClassTypeList(e)} className={month3Type ? "selected-type":null}>3개월</button>
                    <button id="6개월" onClick={(e)=>showClassTypeList(e)} className={month6Type ? "selected-type":null}>6개월</button>
                </section>
                <section className="sort">
                    <select id="sort" name="sort" onChange={handleSort}>
                        <option value="time">신규순</option>
                        <option value="dst">거리순</option>
                        <option value="price/low">낮은가격순</option>
                        <option value="price/high">높은가격순</option>
                    </select>
                </section>
            </header>
            <article className="exercise-list">
                {renderClass}
            </article>
        </main>
        {isPrice && 
            <PricePopup 
                priceRange={priceRange} 
                setNewPrice={setNewPrice} 
                setIsPrice={setIsPrice}
            />}
        {isDistance && 
            <DistancePopup 
                setNewDistance={setNewDistance} 
                setIsDistance={setIsDistance}
            />}
        {isTime && 
            <TimePopup 
                setSelectedTime={setSelectedTime}
                setIsTime={setIsTime}
            />}
        <Navigator/>
        </>
    )
}

export default ExerciseList