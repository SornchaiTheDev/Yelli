import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PhotoExplorer from './pages/explorer';
import Editor from './pages/editor';
import EditorContext from './context';

export default function App() {
  return (
    <EditorContext>
      <Router>
        <Routes>
          <Route path="/" element={<PhotoExplorer />} />
          {/* <Route path="/options" element={<Options />} /> */}
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    </EditorContext>
  );
}
