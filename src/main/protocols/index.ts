import assetsProtocol from './assetsProtocol';
import photosProtocol from './photosProtocol';
import stickerProtocol from './stickerProtocol';
import watermarkProtocol from './watermarkProtocol';

const Initialize = () => {
  photosProtocol();
  stickerProtocol();
  watermarkProtocol();
  assetsProtocol();
};

export default Initialize;
