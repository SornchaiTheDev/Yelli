import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Setup from './pages/setup';
import Initialize from './pages/initialize';
import PhotoExplorer from './pages/explorer';
import Editor from './pages/editor';
import EditorContext from './context';
import Print from './pages/print';

export default function App() {
  return (
    <Router>
      <EditorContext>
        <Routes>
          <Route path="/" element={<Setup />} />
          {/* <Route path="/" element={<Initialize />} /> */}
          <Route path="/explorer" element={<PhotoExplorer />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </EditorContext>
    </Router>
  );
}
