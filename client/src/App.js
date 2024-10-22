//Main code

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
//import JobNotification from './pages/JobNotification';
import OffCampus from './pages/OffCampus';
import Internships from './pages/Internships';
import Freshers from './pages/Freshers';
import Experience from './pages/Experience';
import JobByCity from './pages/JobByCity';  //fire and safty
import Support from './pages/Support';
import JobDetails from './pages/JobDetails';
import './App.css'; 

//<Route path="/job/:id" element={<JobNotification />} />
const App = () => {
  return (
    <div className='bgcol'>
    <Router >
      <Navbar />
    <div className="whatteli">
                <a href="https://whatsapp.com/channel/0029VajnMvaKWEKzCKLMt40P" target="_blank" rel="noopener noreferrer" className='what'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Facebook" className='whatimg' />
                </a>
                
                <a href="https://t.me/Jobs_hustle" target="_blank" rel="noopener noreferrer" className='teli'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Instagram" className='teliimg' />
                </a>
      </div>
      <h1 style={{"color":"red"}} id='mainhomeheading'>Let's Begin Your Carear From Here!...</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/off-campus" element={<OffCampus />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/freshers" element={<Freshers />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/job-by-city/:city" element={<JobByCity />} />
        <Route path="/support" element={<Support />} />
        <Route path="/job/:id/details" element={<JobDetails />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
};



export default App;










/*

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css'; // Create this for global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes like Off-Campus, Internships, etc. *}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
*/
