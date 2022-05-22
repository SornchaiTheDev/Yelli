import { Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';

import Initialize from './pages/initialize';
import PhotoExplorer from './pages/explorer';
import Editor from './pages/editor';
import EditorContext from './context';
import Print from './pages/print';
import General from './pages/preference/General';
import ThemeContext from './context/ThemeContext';
import Sticker from './pages/preference/Stickers';
import Watermark from './pages/preference/Watermark';
import Theme from './pages/preference/Themes';
import Event from './pages/preference/Event';
import InAlbum from './pages/preference/Event/Components/InAlbum';

export default function App() {
  return (
    <HashRouter>
      <ThemeContext>
        <EditorContext>
          <Routes>
            <Route path="/preference">
              <Route index element={<General />} />
              <Route path="General" element={<General />} />
              <Route path="Stickers" element={<Sticker />} />
              <Route path="Watermark" element={<Watermark />} />
              <Route path="Theme" element={<Theme />} />
              <Route path="Event" element={<Event />} />
              <Route path="Event/:id" element={<InAlbum />} />
            </Route>

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
