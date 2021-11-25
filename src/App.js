import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/AccountPage/LoginPage'
import SignupPage from './Pages/AccountPage/SignupPage'
import TimeTablePage from './Pages/SettingPage/TimeTablePage';
import ExerciseList from './Pages/SearchPage/ExerciseList';
import ExerciseDetail from './Pages/SearchPage/ExerciseDetail';
import QuestionList from './Pages/QuestionPage/QuestionList';
import MyPage from './Pages/MyPage/MyPage';
import AddressSetting from './Components/common/AddressSetting';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginPage />}/>
        <Route exact path='/signup' element={<SignupPage />}/>
        <Route exact path='/home' element={<HomePage />}/>
        <Route exact path='/setting/timetable' element={<TimeTablePage />}/>
        <Route exact path='/setting/address' element={<AddressSetting />}/>
        <Route exact  path='/search' element={<ExerciseList />}/>
        <Route exact path='/search/detail' element={<ExerciseDetail />}/>
        <Route exact path='/question' element={<QuestionList />}/>
        <Route exact path='/mypage' element={<MyPage />}/>
     </Routes>
    </Router>
  );
}

export default App;
