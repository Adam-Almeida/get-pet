import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../src/components/pages/Auth/Login'
import Register from '../src/components/pages/Auth/Register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
