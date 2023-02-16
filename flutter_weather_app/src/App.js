import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Weather from './Components/Weather';
import Favourite from './Components/Favourite';

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/weather' element={<Weather/>} />
          <Route path='/favourite' element={<Favourite/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
