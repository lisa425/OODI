import React,{useState,useEffect} from 'react';
import MultiRangeSlider from './MultiRangeSlider'
import {CloseOutlined} from '@ant-design/icons';
import "../../css/Components/search/PricePopup.css";

const PricePopup = (props) => {
    const [lowPrice,setLowPrice] = useState(props.priceRange[0])
    const [highPrice,setHighPrice] = useState(props.priceRange[1])
    const [isSubmit,setIsSubmit] = useState(false)
    console.log(lowPrice)

    useEffect(() => {
        if(isSubmit){
            console.log('low:',lowPrice,'high:',highPrice)
            console.log('submit')
            props.setNewPrice([lowPrice,highPrice])
            props.setIsPrice(false)
        }
    }, [isSubmit])

    return(
        <div className="popup">
            <header className="popup-title">
                <h3>가격</h3>
                <CloseOutlined className="close" onClick={()=>props.setIsPrice(false)}/>
            </header>
            <MultiRangeSlider
                min={lowPrice}
                max={highPrice}
                onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                setLowPrice={setLowPrice}
                setHighPrice={setHighPrice}
                setIsSubmit={setIsSubmit}
            />
        </div>
    )
}

export default PricePopup