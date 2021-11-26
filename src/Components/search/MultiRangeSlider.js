import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import LargeButton from '../common/LargeButton'

//import PropTypes from "prop-types";
import "../../css/Components/search/MultiRangeSlider.css";

const MultiRangeSlider = (props) => {
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
    [props.min, props.max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    props.onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, props.onChange]);
  
  const settingPrice = () => {
    props.setLowPrice(minVal) 
    props.setHighPrice(maxVal)
    props.setIsSubmit(true)
  }
  return (
    <>
    <div className="multi-slider-container">
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={minVal}
        ref={minValRef}
        step={10}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > props.max - 100
        })}
      />
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={maxVal}
        ref={maxValRef}
        step={10}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">최저 {minVal.toLocaleString()}원</div>
        <div className="slider__right-value">최고 {maxVal.toLocaleString()}원</div>
      </div>
    </div>
    <div className="price-range">
      {minVal.toLocaleString()}원 ~ {maxVal.toLocaleString()}원
    </div>
    <LargeButton onClick={()=>settingPrice()}>설정하기</LargeButton>
    </>
  );
};

export default MultiRangeSlider;
