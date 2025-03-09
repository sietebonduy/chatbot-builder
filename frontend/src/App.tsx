import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hello from './pages/Hello';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Authentication, PageTypes } from './pages/Authentication';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Authentication pageType={PageTypes.LOGIN} />} />
      <Route path="/sign_up" element={<Authentication pageType={PageTypes.REGISTER} />} />
      <Route path="/hello" element={<Hello />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
