import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { UserContext } from './context/user';
import { Auth } from './pages/auth';
import { EditInfo } from './routes/editInfo';
import { Home } from './pages/home';
import './styles/main.scss'
import { Panel } from './pages/panel';
import { PanelNavigation } from './components/panelNavigation';

function App() {

  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        {
          currentUser ?
            (
              <>
                <Route path='*' element={<Navigate to='/panel' replace />} />
                <Route path='panel/:id' element={<EditInfo />} />
              </>
            ) :
            (
              <>
                <Route path='auth' element={<Auth />} />
                {/* <Route path='panel' element={<Navigate to='/auth' replace />} />
                <Route path='panel/:id' element={<Navigate to='/auth' replace />} /> */}
              </>
            )
        }
      </Route>
      <Route path='/panel' element={<PanelNavigation />}>
        <Route index element={<Panel />} />
      </Route>

    </Routes>
  );
}

export default App;
