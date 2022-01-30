# OODI:우디
<img src="https://user-images.githubusercontent.com/65384154/144346708-9eb19b12-8e9d-4e22-948b-553c73044654.jpg" style="width:800px"/>
- 원티드 주관 해커톤 <해,커리어>출품작<br>
- 약 380개 팀 중 상위 50팀 안에 들어 예선 참여
 
## 🏃🏻‍♂️ 소개
<b>우디는 비수기 시간대인 '해피타임'을 활용하여 자신의 공강 시간에 딱 맞는 운동 클래스 예약 서비스를 제공하는 어플리케이션입니다.</b><br><br>
코로나 시대 도래 후, 비대면 강의 도입 이후의 대학생들은 통학 시간의 감소로 기존 대비 더 많은 공강시간을 얻게 되며 <br>
시간 활용의 자유도가 높아졌고, 운동과 같은 자기 계발에 투자하고자 하는 니즈도 커졌습니다.<br>
그러나 비용의 문제 혹은 무엇을 해야할 지 모른다는 문제로 인해 자기계발 욕구와 활용 가능한 시간 대비 실제 자기계발에 <br>
공강시간을 활용하는 비율은 높지 않았습니다. 이에 더해 코로나로 인해 실내 체육 활동을 꺼리게 되면서 피트니스계 시장은 <br>
주춤한 상황입니다. 우디는 이러한 대학생들의 니즈와 피트니스계 시장의 페인 포인트를 해결하기 위해 일반적으로 비수기 시간대라고<br>
꼽히는 오전 11시~오후 4시 사이에 개설되는 운동 클래스들을 보다 저렴한 가격으로 학생들에게 연결해줌으로써<br>
새로운 Value Chain을 구성하고자 합니다.<br>
<br>

## 01. 사용 기술
<div><img src="https://img.shields.io/badge/REACT-61DAFB?style=flat-square&logo=REACT&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white">&nbsp;</div>
<b>FrontEnd</b> : React.js, React Native | 담당:임채원 <br>
<b>BackEnd</b> : Node.js, MariaDB | 담당:이지수 <br>
<br>

>React.js로 구현한 뒤 React Native Webview를 활용해 웹뷰로 감싸 앱으로 만드는 형식으로 구현했습니다.<br>
>프론트엔드 담당이 웹 개발을 주력으로 하고 있었고, 네이티브 기능을 활용하는 기능이 없는 관계로 효율을 위해 이와 같이 구현하는 방향으로 설정하였습니다.
<br>

## 02.구현 내용

![깃헙용](https://user-images.githubusercontent.com/67117391/145705435-97e407b9-f1a8-4e4b-821b-1796dec30e4a.gif)



APK
--------------
React, React native을 사용하여 웹뷰 어플리케이션으로 개발되었습니다.

Server
---------------
1. NodeJS로 개발된 API 서버입니다.
2. 데이터베이스는 MariaDB 및 Sequelize를 사용합니다.
3. URL 주소는 ./router에 정리되어 있습니다.
4. ./controller에서 비즈니스 로직을 처리합니다.
5. ./data에서 데이터베이스 CRUD를 처리합니다.
6. ./db/scema 안에 모든 스키마가 정의되어 있습니다.

사용 라이브러리 목록
> - express : node JS 개발 프레임워크
> - express-validator : body validation
> - JsonWebToken : 토큰 생성
> - cors
> - helmet
> - mariadb
> - sequelize : MySQL ORM
> - geolib : 위,경도 기반 거리 계산
> - node-geocoder : 주소를 위, 경도로 변환
> - socket.io : 알림 

Client
---------------
1. React로 개발된 웹앱입니다.
2. 컴포넌트는 Components에 정리되어 있습니다.
3. ant-design 오픈소스의 아이콘을 사용합니다.
4. 이미지 리소스는 Assets/image에 정리되어 있습니다.
5. 화면 페이지는 Pages에 정리되어 있습니다.
6. App.js에서 Route를 선언합니다.

사용 라이브러리 목록
> - axios : 서버와의 통신
> - react-router-dom : 라우팅 처리
> - ant-design : 오픈 소스 아이콘 사용
> - react-schedule-selector : 시간표 타임테이블 생성
