import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Editor from './pages/Editor.tsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Authentication, PageTypes } from './pages/Authentication';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication pageType={PageTypes.LOGIN} />} />
        <Route path="/sign_up" element={<Authentication pageType={PageTypes.REGISTER} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
