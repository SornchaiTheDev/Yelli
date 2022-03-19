import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PhotoExplorer from './pages/explorer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoExplorer />} />
      </Routes>
    </Router>
  );
}
