import { createContext, useContext, ReactNode, useState, useRef } from 'react';
import {
  onFinishDecorateInterface,
  SelectedPhotoInterface,
  PhotoInterface,
  StickerInteface,
} from '../interface';
import mock_photo from 'renderer/dummy';

interface EditorContext {
  allPhotos: PhotoInterface[];
  selectedPhoto: SelectedPhotoInterface | null;
  onFinishDecorate: onFinishDecorateInterface;
  stageRef: React.MutableRefObject<any>;
  selectSticker: string | null;
  setSelectSticker: React.Dispatch<React.SetStateAction<string | null>>;
  handleSelectPhoto: ({
    src,
    index,
    stickers,
  }: {
    src: string;
    index: number;
    stickers: StickerInteface[];
  }) => void;
}

const EditorCxt = createContext<EditorContext>({
  allPhotos: [],
  selectedPhoto: null,
  selectSticker: null,
  setSelectSticker: () => {},
  onFinishDecorate: () => {},
  handleSelectPhoto: () => {},
  stageRef: { current: null },
});

const Provider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[]>(mock_photo);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhotoInterface>({
    ...allPhotos[0],
    photoIndex: 0,
  });

  const stageRef = useRef<any>(null);
  const [selectSticker, setSelectSticker] = useState<string | null>(null);

  const onFinishDecorate: onFinishDecorateInterface = ({
    photoIndex,
    stickers,
  }) => {
    const saveToAllPhotos = allPhotos.map((photo, index) => {
      if (index === photoIndex) {
        return {
          ...photo,
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
        selectedPhoto,
        selectSticker,
        setSelectSticker,
        onFinishDecorate,
        handleSelectPhoto,
        stageRef,
      }}
    >
      {children}
    </EditorCxt.Provider>
  );
};

export default Provider;

export const useEditorContext = () => useContext(EditorCxt);
