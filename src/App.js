import logo from './logo.svg';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/AccountPage/LoginPage'

function App() {
  return (
   <Router>
     <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />}/>
     </Routes>
   </Router>
  );
}

export default App;
