import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/AccountPage/LoginPage'
import SignupPage from './Pages/AccountPage/SignupPage'
import TimeTablePage from './Pages/SettingPage/TimeTablePage';
import LocationPage from './Pages/SettingPage/LocationPage';
import ExerciseList from './Pages/SearchPage/ExerciseList';
import ExerciseDetail from './Pages/SearchPage/ExerciseDetail';
import QuestionList from './Pages/QuestionPage/QuestionList';
import MyPage from './Pages/MyPage/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/setting/timetable' element={<TimeTablePage />}/>
        <Route path='/setting/location' element={<LocationPage />}/>
        <Route path='/search' element={<ExerciseList />}/>
        <Route path='/search/detail' element={<ExerciseDetail />}/>
        <Route path='/question' element={<QuestionList />}/>
        <Route path='/mypage' element={<MyPage />}/>
     </Routes>
    </Router>
  );
}

export default App;
