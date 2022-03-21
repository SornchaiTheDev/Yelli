import balloon from '../../../../../../public/stickers/balloon.png';
import crocodile from '../../../../../../public/stickers/crocodile.png';
import hny from '../../../../../../public/stickers/happy-new-year.png';
import { useEditorContext } from '../../context';

const mock_sticker = [
  {
    name: 'Party',
    stickerSets: [balloon, balloon],
  },
  {
    name: 'Animals',
    stickerSets: [crocodile],
  },
  {
    name: 'Happy New Year',
    stickerSets: [hny],
  },
];
function StickerGallery() {
  const { setSelectSticker } = useEditorContext();

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Stickers</h1>
      <div className="gap-4 mt-8">
        {mock_sticker.map(({ name, stickerSets }) => (
          <div className="grid grid-cols-2 gap-4 mb-4" key={name}>
            <h2 className="col-span-2 text-xl font-bold">{name}</h2>
            {stickerSets.map((sticker) => (
              <div className="p-4 bg-gray-100 rounded-lg" key={sticker}>
                <img
                  src={sticker}
                  className=""
                  onDragStart={() => setSelectSticker(sticker)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerGallery;
