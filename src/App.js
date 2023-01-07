import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import './styles/main.scss'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='auth' element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
