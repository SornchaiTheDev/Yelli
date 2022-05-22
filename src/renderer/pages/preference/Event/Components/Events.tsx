import Album from './Album';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../Context/EventContext';

function Events() {
  const navigate = useNavigate();

  const { events } = useEventContext();

  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-14 p-4 justify-items-stretch">
      {events.map(({ name, amount, imgset, id }) => (
        <Album
          key={id}
          name={name}
          amount={amount!}
          imgset={imgset!}
          onClick={() => navigate(`/preference/Event/${id}`)}
        />
      ))}
    </div>
  );
}

export default Events;
