import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

//pages
import Login from '../src/components/pages/Auth/Login'
import Register from '../src/components/pages/Auth/Register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
