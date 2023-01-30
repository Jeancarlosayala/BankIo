import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/auth';
import './styles/main.scss'
import { Panel } from './pages/panel';
import { PanelNavigation } from './components/panelNavigation';
import { PanelTransfer } from './routes/panelTransfer';

const islogged = localStorage.getItem('islogged')

const PrivateRoute = () => {
  if(!islogged) return <Navigate to='/auth' />

  return (
    <Routes>
      <Route path='/' element={<PanelNavigation />}>
        <Route index element={<Panel />} />
        <Route path='service/:id' element={<h1>Services</h1>} />
        <Route path='transaction' element={<PanelTransfer />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <>
      <PrivateRoute />
      <Routes>
        <Route path='auth' element={<Auth />} />
      </Routes>
    </>
  );
}
export default App;
