import {
  MemoryRouter as Router,
  Route,
  Routes,
  HashRouter,
} from 'react-router-dom';
import './App.css';

import Initialize from './pages/initialize';
import PhotoExplorer from './pages/explorer';
import Editor from './pages/editor';
import EditorContext from './context';
import Print from './pages/print';
import Preference from './pages/preference';
import ThemeContext from './context/ThemeContext';

export default function App() {
  return (
    <HashRouter>
      <ThemeContext>
        <EditorContext>
          <title>Yelli</title>
          <Routes>
            <Route path="/preference" element={<Preference />} />

            <Route path="/">
              <Route path="" element={<Initialize />} />
              <Route path="explorer" element={<PhotoExplorer />} />
              <Route path="editor" element={<Editor />} />
              <Route path="print" element={<Print />} />
            </Route>
          </Routes>
        </EditorContext>
      </ThemeContext>
    </HashRouter>
  );
}
