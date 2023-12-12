import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Siswa from './pages/siswa';
import Login from './pages/login';
import Jadwal from './pages/jadwal';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/siswa"
          element={<Siswa />}
        />
        <Route
          path="/jadwal"
          element={<Jadwal />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
