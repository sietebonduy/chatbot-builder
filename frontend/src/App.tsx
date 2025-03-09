import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authentication, PageTypes } from './components/Authentication';

import Navbar from './components/Navbar';
import Hello from './components/Hello';

const App = () => (
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Authentication pageType={PageTypes.LOGIN}/>}/>
      <Route path="/sign_up" element={<Authentication pageType={PageTypes.REGISTER}/>}/>
      <Route path="/hello" element={<Hello/>}/>
    </Routes>
  </Router>
)

export default App;