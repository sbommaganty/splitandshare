// import logo from '../src/images/Logo@3x.png';
// import logo from '../src/images/Designer.png';
import './App.css';
import '../src/fonts.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../../splitwise/src/login/LoginSignUpScreen';
import GroupScreen from '../../splitwise/src/screens/GroupScreen';
import MainScreen from '../../splitwise/src/screens/MainScreen';

// import WithLoading from '../src/components/WithLoading';
import SplashScreenWithLoading from '../src/components/SplashScreenWithLoading';


function App() {
  return (
    <Router>
    <Routes>
      <Route
        path="/"
        element={<SplashScreenWithLoading />}
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/groups" element={<GroupScreen />} />
      <Route path="/expense" element={<MainScreen />} />

    </Routes>
  </Router>
    // <div className="App">
    //    <div className='Main_view'>
    //    <img src={logo} className="App-logo" alt="logo"/>
    //    <h1 className='title'>SPLITWISE</h1>
    //    <h1 className='caption'>Split bills the easy way</h1>
    //    </div>
    //    </div>
  );
}

export default App;
