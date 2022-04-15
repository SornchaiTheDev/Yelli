import { removeThumbnailListener } from '../thumbnails';
import { removeUploadListener } from './upload/uploadImageToFirebase';

const removeListener = () => {
  removeThumbnailListener();
  removeUploadListener();
};

export default removeListener;
