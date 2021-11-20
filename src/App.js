import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/AccountPage/LoginPage'
import TimeTablePage from './Pages/SettingPage/TimeTablePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/timetable' element={<TimeTablePage />}/>
     </Routes>
    </Router>
  );
}

export default App;
