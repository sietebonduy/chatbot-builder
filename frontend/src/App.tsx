import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login.tsx'
import Navbar from './components/Navbar'

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
)

export default App