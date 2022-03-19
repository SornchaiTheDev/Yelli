import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
function BackBtn() {
  const navigate = useNavigate();
  return (
    <div
      className="absolute flex items-center top-10 left-10 cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <div className="w-12">
        <BiArrowBack size="100%" />
      </div>
      <h2 className="text-2xl font-semibold">Back</h2>
    </div>
  );
}

export default BackBtn;
