import { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useState, useEffect } from 'react';
import { Transformer, Image as KonvaImage, Group, Circle } from 'react-konva';
import { StickerInteface, StickerProperties } from '../interface';
import useImage from 'use-image';

function Sticker({
  stickerIndex,
  isSelected,
  properties = { x: 0, y: 0, scale: 1, rotation: 0 },
  src,
  onSelect,
  onTransfromEnd,
  handleDeleteSticker,
  onLeave,
}: StickerInteface & {
  stickerIndex: string;
  isSelected: boolean;
  onSelect: () => void;
  handleDeleteSticker: () => void;
  onLeave?: () => void;
}) {
  const transfromRef = useRef<any>(null);
  const shapeRef = useRef<any>(null);
  const [img, setImg] = useState<HTMLImageElement>();
  const [deleteX, setDeleteX] = useState(256);

  const DELETE_ICON =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADQ0lEQVR4nO3du2oVURTG8f/SWGgwilZRQRsrG0UFbyAkVoIgKOm08i0sfBGfwEJFRCsRQUhhbaUheImNIicJopiYZXFympigzuy1Z8/M9ytzYF/Olz23NWcGRERERERE8rKmB1CXu18BrgJrwAMze9LwkPrL3e/4n243Pa5ecvcD7r6ySSA/3X2y6fFVta3pAdRwHBjb5O87gBOZx5JMmwMZr/hZ0bLt1N39MHALOEqaf4RDwNktPpsFPiboYw14A9w1s3cJ2vurLIG4+2ngGbA7R38BloFpM3sV3VGuQGaBMzn6CjRrZueiO9lsp1iJu48DF4CJDR8ZcDJVPw065e4zgG/4+xLw0sy+pegkyQpx9yngHrA/RXst9AWYMbPndRuqHYi7TwDzwL66bbXcV+CImS3XaSTF0c40CgOG38FU3UZSBLJxm9pntb8LbbLSKWOTZWZLwHWGO7a++gxcqxsGJDwPcfddwHlgb6o2W2LA8LD3e9MDEREREZGtJL/87u4DYE/qdgu1aGZJD/MjSrjvA9osVfIqogKpJ/lcFUg9rQjkQ0CbpUo+V62QelqxQhRIDRGBZLl/qRDJ5xpxHrId+EHCO1oKtQrsNLPVlI0mXyFm9gv4lLrdAi2kDgPi7u3tw34kZI4KpDoFUphWBdKHk8OQOWqFVNeqFdKHc5GQOSqQ6tqzQtZvnluMaLsQg/U5Jhf5G8Mu70fC5qZAqlEghWllIF0+Fwmbm1ZINa1cIV0+9A2bm1ZINWFzC/udeocLVSGFqZGwFdLhQlVIYWok+uEzXdxshc5Jgfw/BVIYBVIYBVIYBVKYVgfSxbP19gbSwUJVWGFqJMdDMLu02QqfiwL5PwqkMAqkMAqkMAqkMAqkMOFzCX+QcocKVaGFqZHwFdKhQlVoYWok19sRurDZyjIHBfLvFEhhFEhhFEhhFEhhOhVIFwpV3Qlkvagzn6OvIHPRhamRnG9pe5ixr9Tu5+oo51vaDgKvad8DMgfAMTPLcrUh2woxswXgJsNrQm2xAtzIFQZkfrGkmT0CLgFzOfut6C3DV+U9ztlpI2+Ldvcx4DJwEZiknCvBqwwvhL4Anua4mCgiIiIiIiIiIiKSxG/EtwkXAim1LgAAAABJRU5ErkJggg==';
  const [deleteIcon] = useImage(DELETE_ICON);

  // save sticker state
  const [StickerProperties, setStickerProperties] =
    useState<StickerProperties>(properties);

  const handleImageInit = () => {
    const img = new Image();

    img.addEventListener('load', () => {
      setImg(img);
    });
    img.src = src;
  };

  // set Stage size to image size
  useEffect(() => {
    handleImageInit();
  }, [src]);

  const selected = () => {
    onSelect();
    transfromRef.current.nodes([shapeRef.current]);
  };

  const handleOnTransform = (e: KonvaEventObject<Event>) => {
    setStickerProperties({
      x: e.target.x(),
      y: e.target.y(),
      scale: e.target.scaleX(),
      rotation: e.target.rotation(),
    });
  };
  const handleOnDrag = (e: KonvaEventObject<Event>) => {
    setStickerProperties({
      ...StickerProperties,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleOnDragEnd = () => {
    onTransfromEnd!({
      stickerIndex,
      properties: StickerProperties,
    });
  };

  useEffect(() => {
    if (transfromRef.current)
      setDeleteX(transfromRef.current.children[0].attrs.width);
  }, [selected]);

  return (
    <>
      <KonvaImage
        onMouseEnter={selected}
        image={img}
        draggable
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        ref={shapeRef}
        onClick={selected}
        onTap={selected}
        onDragStart={selected}
        onTouchStart={selected}
        onDragMove={handleOnDrag}
        onDragEnd={handleOnDragEnd}
        onTransformEnd={() =>
          onTransfromEnd!({ stickerIndex, properties: StickerProperties })
        }
        x={StickerProperties.x}
        y={StickerProperties.y}
        rotation={StickerProperties.rotation}
        scale={{ x: StickerProperties.scale, y: StickerProperties.scale }}
      />
      {shapeRef.current && (
        <Transformer
          ref={transfromRef}
          rotateAnchorOffset={40}
          anchorSize={20}
          borderDash={[4, 4]}
          anchorStroke="transparent"
          anchorCornerRadius={0}
          visible={isSelected}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          rotationSnaps={[0, 90, 180, 270]}
          onTransform={handleOnTransform}
          onMouseLeave={onLeave}
          onTouchEnd={onLeave}
        >
          <Group
            onClick={handleDeleteSticker}
            onTouchStart={handleDeleteSticker}
            x={deleteX}
            y={0}
          >
            <Circle
              radius={20}
              width={30}
              height={30}
              fill="red"
              fillPatternImage={img}
            />
            <KonvaImage
              image={deleteIcon}
              x={-10}
              y={-10}
              width={20}
              height={20}
            />
          </Group>
        </Transformer>
      )}
    </>
  );
}

export default Sticker;
