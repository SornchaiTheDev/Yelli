import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  onFinishDecorateInterface,
  PhotoInterface,
  StickerInteface,
  EditorContext,
  Tool,
  Lines,
} from '../utils/interface';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import i18n from 'renderer/utils/i18n';
import Store from 'renderer/utils/store';

const EditorCxt = createContext<EditorContext>({
  selectedPhoto: null,
  setSelectedPhoto: () => {},
  selectSticker: null,
  setSelectSticker: () => {},
  onFinishDecorate: () => {},
  selectedTool: {
    type: 'pen',
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
  stageRef: { current: null },
  _stickers: [],
  setStickers: () => {},
  handleOnStickerDrop: () => {},
  handleRemoveLine: () => {},
  isPrinting: false,
  handlePrint: () => {},
  thumbDir: null,
  setThumbDir: () => {},
});

const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [thumbDir, setThumbDir] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInterface | null>(
    null
  );
  const [isPrinting, setIsPrinting] = useState(false);

  /* Languages */
  const handleAppLang = async () => {
    const store = new Store();
    const lang = (await store.get('language')) as 'th' | 'en';
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    handleAppLang();
  }, []);

  /* Navigate hooks */
  const navigate = useNavigate();

  /* Stickers that on stage now */
  const [_stickers, setStickers] = useState<StickerInteface[]>([]);
  const stageRef = useRef<any>(null);

  /* handle on Drop Sticker */
  const [selectSticker, setSelectSticker] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>({
    type: 'pen',
    thickness: 1,
    color: '#ffffff',
  });

  /* handle on Drawing */
  const [lines, setLines] = useState<Lines[]>([]);
  const [history, setHistory] = useState<any[]>([[]]);
  const [index, setIndex] = useState<number>(0);

  const clearDrawing = () => {
    setLines([]);
    setHistory([[]]);
    setIndex(0);
    setIsPrinting(false);
  };

  const handleDrawing = (line: Lines) => {
    setLines((prev) => [...prev, line]);
    setIndex((prev) => prev + 1);
    setHistory((prev) => [...prev, [...lines, line]]);
    if (history.length - 1 > lines.length) {
      setHistory(() => [[], [...lines, line]]);
      setIndex(1);
    }
  };

  const handleRemoveLine = (otherLines: Lines[]) => {
    setHistory((prev) => [...prev, otherLines]);
    setIndex(index + 1);
  };

  const handleUndo = () => {
    if (index === 0) return;
    const undoLine = history[index - 1];
    setLines(undoLine);
    setIndex(index - 1);
  };

  const handleRedo = () => {
    if (index + 1 === history.length) return;
    const redoLine = history[index + 1];

    setLines(redoLine);
    setIndex(index + 1);
  };

  /* handle on Finish Decorate */
  const onFinishDecorate: onFinishDecorateInterface = ({ thumbnail }) => {
    setSelectedPhoto({ ...selectedPhoto!, thumbnail });
  };

  /* convert canvas to image (base64) */
  const toBase64 = () => {
    const image = stageRef.current.toDataURL();

    return image;
  };

  const handleOnStickerDrop = (e: any) => {
    if (selectSticker !== null) {
      stageRef.current.setPointersPositions(e);
      const properties = {
        ...stageRef.current.getPointerPosition(),
        scale: 0.5,
      };
      const currentSticker = {
        key: uuid(),
        src: selectSticker!,
        properties,
      };
      const allStickers = [..._stickers, currentSticker];
      setStickers(allStickers);

      setTimeout(() => {
        onFinishDecorate!({
          thumbnail: toBase64(),
        });
      }, 500);
      setSelectSticker(null);
    }
  };

  const handlePrint = () => {
    setSelectSticker(null);
    setIsPrinting(true);
    setTimeout(() => {
      onFinishDecorate!({
        thumbnail: toBase64(),
      });
      navigate('/print');
    }, 500);
  };

  return (
    <EditorCxt.Provider
      value={{
        stageRef,
        selectedPhoto,
        setSelectedPhoto,
        selectSticker,
        setSelectSticker,
        _stickers,
        setStickers,
        onFinishDecorate,
        selectedTool,
        setSelectedTool,
        lines,
        setLines,
        handleUndo,
        handleRedo,
        handleDrawing,
        clearDrawing,
        canUndo: index > 0,
        canRedo: index + 1 < history.length,
        handleOnStickerDrop,
        handleRemoveLine,
        isPrinting,
        handlePrint,
        thumbDir,
        setThumbDir,
      }}
    >
      {children}
    </EditorCxt.Provider>
  );
};

export default Provider;

export const useEditorContext = () => useContext(EditorCxt);
