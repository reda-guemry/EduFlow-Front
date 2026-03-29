import { Routes , Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage' 
import RegisterPage from './pages/RegisterPage' 

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>

      </Routes>
    </>
  )
}

export default App
