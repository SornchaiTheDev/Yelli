import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Options from './pages/options';
import PhotoExplorer from './pages/explorer';
import Editor from './pages/editor';
import mock_photo from './dummy';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoExplorer />} />
        <Route path="/options" element={<Options />} />
        <Route path="/editor" element={<Editor photos={mock_photo} />} />
      </Routes>
    </Router>
  );
}
