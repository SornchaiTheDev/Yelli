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
} from '../interface';
import mock_photo from 'renderer/dummy';

interface EditorContext {
  allPhotos: PhotoInterface[];
  setAllPhotos: React.Dispatch<React.SetStateAction<PhotoInterface[]>>;
  selectedPhoto: SelectedPhotoInterface | null;
  onFinishDecorate: onFinishDecorateInterface;
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
  setAllPhotos: () => {},
  selectedPhoto: null,
  selectSticker: null,
  setSelectSticker: () => {},
  onFinishDecorate: () => {},
  handleSelectPhoto: () => {},
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
      }}
    >
      {children}
    </EditorCxt.Provider>
  );
};

export default Provider;

export const useEditorContext = () => useContext(EditorCxt);
