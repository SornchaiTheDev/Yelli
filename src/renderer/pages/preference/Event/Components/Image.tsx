type ImagePreviewProps = {
  src: string;
  onClick?: () => void;
};
const Image = (props: ImagePreviewProps) => {
  const { src, onClick } = props;

  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      onClick={onClick}
    >
      <div className="w-full overflow-hidden rounded-t-md">
        <img
          className="h-full object-cover object-center pointer-events-none rounded-lg"
          width={900}
          height={600}
          src={src}
        />
      </div>
    </div>
  );
};

export default Image;
