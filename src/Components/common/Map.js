/* global kakao */

import React,{useState,useEffect} from 'react';
// import '../../css/Components/Common/AddressSetting.css';

const {kakao} = window

const Map = ({searchKeyword}) => {

    useEffect(()=>{
        const container = document.getElementById('map');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
        const marker = new kakao.maps.Marker({
            position:map.getCenter()
        })
        marker.setMap(map);

        let geocoder = new kakao.maps.services.Geocoder();
        const searchLocation = () => {
                
        }
        geocoder.addressSearch(searchKeyword, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                map.setCenter(coords);
            } 
        });    
            
    },[searchKeyword]);


    return(
        <div className="map" id="map"></div>
    )
}

export default Map;