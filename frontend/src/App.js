import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'

//pages
import Login from '../src/components/pages/Auth/Login'
import Register from '../src/components/pages/Auth/Register'
import Home from './components/pages/Home'
import MainContainer from './components/layout/container/MainContainer'
import { UserProvider } from './context/UserContext'


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
          <Routes>
            <Route path="" element={<p>Path not resolved</p>} />
          </Routes>
        </MainContainer>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
