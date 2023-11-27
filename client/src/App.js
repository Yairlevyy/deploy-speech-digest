import {Routes,Route} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import SignUp from './components/pages/SignUp'
import SignIn from './components/pages/SignIn'
import Dashboard from './components/pages/Dashboard'
import LinkToShare from './components/pages/LinkToShare'
import NotFound from './components/pages/NotFound'

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/dashboard/:user_id' element={<Dashboard />} />
          <Route path='/link/:id' element={<LinkToShare />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
