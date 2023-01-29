import { Route, Routes } from 'react-router-dom';
import { Auth } from './pages/auth';
import './styles/main.scss'
import { Panel } from './pages/panel';
import { PanelNavigation } from './components/panelNavigation';

function App() {

  return (
    <Routes>
      {/* <Route path='/' element={<Navigation />} >
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
                <Route path='panel' element={<Navigate to='/auth' replace />} />
                <Route path='panel/:id' element={<Navigate to='/auth' replace />} />
              </>
            )
        }
      </Route> */}
      <Route path='/' element={<PanelNavigation />}>
        <Route index element={<Panel />} />
        <Route path='auth' element={<Auth />} />
        <Route path='service/:id' element={<h1>Services</h1>} />
      </Route>

    </Routes>
  );
}

export default App;
