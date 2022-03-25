import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
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
import { v4 as uuid } from 'uuid';

const EditorCxt = createContext<EditorContext>({
  allPhotos: [],
  setAllPhotos: () => {},
  selectedPhoto: null,
  selectSticker: null,
  setSelectSticker: () => {},
  onFinishDecorate: () => {},
  handleSelectPhoto: () => {},
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
});

const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[]>(mock_photo);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhotoInterface>({
    ...allPhotos[0],
    photoIndex: 0,
  });
  /* Stickers that on stage now */
  const [_stickers, setStickers] = useState<StickerInteface[]>([]);
  const stageRef = useRef<any>(null);

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
      const photoIndex = allPhotos.findIndex(
        (photo) => photo.src === selectedPhoto!.src
      );
      setTimeout(() => {
        onFinishDecorate!({
          photoIndex,
          stickers: allStickers,
          thumbnail: toBase64(),
        });
      }, 500);
      setSelectSticker(null);
    }
  };

  return (
    <EditorCxt.Provider
      value={{
        stageRef,
        allPhotos,
        setAllPhotos,
        selectedPhoto,
        selectSticker,
        setSelectSticker,
        _stickers,
        setStickers,
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
        canUndo: index > 0,
        canRedo: index + 1 < history.length,
        handleOnStickerDrop,
        handleRemoveLine,
      }}
    >
      {children}
    </EditorCxt.Provider>
  );
};

export default Provider;

export const useEditorContext = () => useContext(EditorCxt);
