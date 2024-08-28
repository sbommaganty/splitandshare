// import logo from '../src/images/Designer.png';
import logo from '../../src/images/Designer.png';
// import './App.css';
import '../../src/App.css';
import '../../src/fonts.css'

function SplashScreen() {
    return (
      <div className="App">
         <div className='Main_view'>
         <img src={logo} className="App-logo" alt="logo"/>
         <h1 className='title'>SPLITWISE</h1>
         <h1 className='caption'>Split bills the easy way</h1>
         </div>
         </div>
    );
  }
  
  export default SplashScreen;