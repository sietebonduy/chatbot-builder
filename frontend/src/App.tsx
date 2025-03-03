import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Authentication, PageTypes } from './components/Authentication';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Authentication pageType={ PageTypes.LOGIN } />} />
      <Route path="/sign_up" element={<Authentication pageType={ PageTypes.REGISTER } />} />
    </Routes>
  </Router>
)

export default App;