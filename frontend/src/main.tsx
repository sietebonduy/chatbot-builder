import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx'

import './i18n'
import './styles/index.css'

import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<UserProvider>*/}
    <Router>
      <DndProvider backend={HTML5Backend}>
        <CookiesProvider>
          <App />
          <ToastContainer position="top-right" autoClose={4000} hideProgressBar newestOnTop={true} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable={true} pauseOnHover={true} theme="light" transition={Flip} className="custom-toast-container" />
        </CookiesProvider>
      </DndProvider>
    </Router>
    {/*</UserProvider>*/}
  </StrictMode>,
)