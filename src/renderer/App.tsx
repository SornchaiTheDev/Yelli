import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PhotoExplorer from './pages/explorer';
import Editor from './pages/editor';
import EditorContext from './context';
import Print from './pages/print';

export default function App() {
  return (
    <Router>
      <EditorContext>
        <Routes>
          {/* <Route path="/" element={<Print />} /> */}
          <Route path="/" element={<PhotoExplorer />} />
          {/* <Route path="/options" element={<Options />} /> */}
          <Route path="/editor" element={<Editor />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </EditorContext>
    </Router>
  );
}
