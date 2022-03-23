import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {
  onFinishDecorateInterface,
  SelectedPhotoInterface,
  PhotoInterface,
  StickerInteface,
  EditorContext,
  Tool,
  Lines,
} from '../interface';
import mock_photo from 'renderer/dummy';

const EditorCxt = createContext<EditorContext>({
  allPhotos: [],
  setAllPhotos: () => {},
  selectedPhoto: null,
  selectSticker: null,
  setSelectSticker: () => {},
  onFinishDecorate: () => {},
  handleSelectPhoto: () => {},
  selectedTool: {
    thickness: 1,
    color: 'black',
  },
  setSelectedTool: () => {},
  lines: [],
  setLines: () => {},
  handleDrawing: () => {},
  handleUndo: () => {},
  handleRedo: () => {},
  clearDrawing: () => {},
  canUndo: false,
  canRedo: false,
});

const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[]>(mock_photo);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhotoInterface>({
    ...allPhotos[0],
    photoIndex: 0,
  });

  /* reset Selected Photo */
  useEffect(() => {
    setSelectedPhoto({
      ...allPhotos[0],
      photoIndex: 0,
    });
  }, [allPhotos]);

  /* handle on Drop Sticker */
  const [selectSticker, setSelectSticker] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>({
    thickness: 1,
    color: '#ffffff',
  });

  /* handle on Drawing */
  const [lines, setLines] = useState<Lines[]>([]);
  const [history, setHistory] = useState<Lines[]>([]);
  const [index, setIndex] = useState<number>(0);

  const clearDrawing = () => {
    setLines([]);
    setHistory([]);
    setIndex(0);
  };

  const handleDrawing = (line: Lines) => {
    setLines((prev) => [...prev, line]);
    setHistory((prev) => [...prev, line]);
    setIndex((prev) => prev + 1);
    if (history.length > lines.length) {
      setHistory([...lines, line]);
    }
  };

  const handleUndo = () => {
    if (index <= 0) return;
    const undoLine = lines.slice(0, -1);
    setLines(undoLine);
    setIndex(index - 1);
  };

  const handleRedo = () => {
    if (index >= history.length) return;

    const redoLine = history[index];
    setLines((prev) => [...prev, redoLine]);
    setIndex(index + 1);
  };

  /* handle on Finish Decorate */
  const onFinishDecorate: onFinishDecorateInterface = ({
    photoIndex,
    stickers,
    thumbnail,
  }) => {
    const saveToAllPhotos = allPhotos.map((photo, index) => {
      if (index === photoIndex) {
        return {
          ...photo,
          thumbnail: thumbnail,
          stickers,
        };
      }
      return photo;
    });

    setAllPhotos(saveToAllPhotos);
  };

  const handleSelectPhoto = ({
    src,
    index,
    stickers,
  }: {
    src: string;
    index: number;
    stickers: StickerInteface[];
  }) => {
    setSelectedPhoto({ src, photoIndex: index, stickers });
  };

  return (
    <EditorCxt.Provider
      value={{
        allPhotos,
        setAllPhotos,
        selectedPhoto,
        selectSticker,
        setSelectSticker,
        onFinishDecorate,
        handleSelectPhoto,
        selectedTool,
        setSelectedTool,
        lines,
        setLines,
        handleUndo,
        handleRedo,
        handleDrawing,
        clearDrawing,
        canUndo: lines.length > 0,
        canRedo: index < history.length,
      }}
    >
      {children}
    </EditorCxt.Provider>
  );
};

export default Provider;

export const useEditorContext = () => useContext(EditorCxt);
