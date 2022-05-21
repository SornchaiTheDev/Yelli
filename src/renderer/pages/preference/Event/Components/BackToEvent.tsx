import { BsArrowLeft } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
function BackToGallery() {
  return (
    <NavLink to="/preference/Event">
      <div className="flex space-x-2 items-center mb-2 cursor-pointer px-4">
        <BsArrowLeft className="text-lg" />
        <h2 className="text-lg">Back to Event</h2>
      </div>
    </NavLink>
  );
}

export default BackToGallery;
