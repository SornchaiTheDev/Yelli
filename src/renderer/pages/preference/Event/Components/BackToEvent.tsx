import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function BackToGallery() {
  const navigate = useNavigate();
  return (
    <div
      className="flex space-x-2 items-center mb-2 cursor-pointer px-4 w-fit"
      onClick={() => navigate('/preference/Event')}
    >
      <BsArrowLeft className="text-lg" />
      <h2 className="text-lg">Back to Event</h2>
    </div>
  );
}

export default BackToGallery;
