import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import AppRouter from "./components/AppRouter.tsx";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </Router>
  );
};

export default App;
