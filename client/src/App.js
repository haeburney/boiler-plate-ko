//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,} from "react-router-dom";

  import LandingPage from './components/views/LandingPage/LandingPage'
  import LoginPage from './components/views/LoginPage/LoginPage'
  import RegisterPage from './components/views/RegisterPage/RegisterPage'
  import Auth from './hoc/auth'

  function App() {
    return (
      <BrowserRouter>
      <Routes>

      <Route exact path="/" element = { Auth(LandingPage, null) }/>
      <Route exact path="/login" element = { Auth(LoginPage, false) }/>
      <Route exact path="/register" element = { Auth(RegisterPage, false) }/>
    
      </Routes>
      </BrowserRouter>
    );
  }

export default App;