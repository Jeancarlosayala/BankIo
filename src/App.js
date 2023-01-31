import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './pages/auth';
import './styles/main.scss'
import { Panel } from './pages/panel';
import { PanelNavigation } from './components/panelNavigation';
import { PanelTransfer } from './routes/panelTransfer';

const PrivateRoute = () => {
  const isLogged = localStorage.getItem('islogged');

  if (!isLogged) return <Navigate to='/auth' />

  return <Outlet />
}

function App() {

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<PanelNavigation />}>
            <Route index element={<Panel />} />
            <Route path='service/:id' element={<h1>Services</h1>} />
            <Route path='transaction' element={<PanelTransfer />} />
          </Route>
        </Route>
        <Route path='auth' element={<Auth />} />
      </Routes>
    </>
  );
}
export default App;
