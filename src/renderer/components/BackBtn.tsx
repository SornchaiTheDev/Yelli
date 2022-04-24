import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
function BackBtn({
  className = '',
  text,
}: {
  className?: string;
  text: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={'flex items-center cursor-pointer ' + className}
      onClick={() => navigate(-1)}
    >
      <div className="w-12">
        <BiArrowBack size="100%" />
      </div>
      <h2 className="text-2xl font-semibold">{text}</h2>
    </div>
  );
}

export default BackBtn;
