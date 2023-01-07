import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { UserContext } from './context/user';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import './styles/main.scss'

function App() {

  const { currentUser } = useContext(UserContext)

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        {
          currentUser ?
            <Route path='auth' element={<Navigate to='/' replace />} /> :
            <Route path='auth' element={<Auth />} />
        }
      </Route>
    </Routes>
  );
}

export default App;
