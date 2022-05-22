import WithSideBar from '../../HOC/withSideBar';
import Image from './Image';
import { AiOutlineCalendar, AiOutlineFileImage } from 'react-icons/ai';
import BackToEvent from './BackToEvent';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventI, PhotoI } from '@decor/Event';
import Store from 'renderer/utils/store';

function InAlbum() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventI | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotoI[]>([]);
  const navigate = useNavigate();
  const store = new Store();
  useEffect(() => {
    window.electron
      .get_event(id)
      .then(
        ({
          event,
          photos,
          id,
        }: {
          event: EventI;
          photos: PhotoI[];
          id: string;
        }) => {
          setEvent({ ...event, id });
          setPhotos(photos);
        }
      );
  }, []);

  useEffect(() => {
    if (event) {
      store.get('event').then((event) => {
        if (event.id === id) {
          setIsSelected(true);
        }
      });
    }
  }, [event]);

  const handleSelectEvent = () => {
    store.set('event', event!);
    setIsSelected(true);

    // navigate('/preference/event');
  };

  const handleDeleteEvent = () => {
    window.electron.delete_event(id);
    navigate('/preference/Event');
  };

  console.log(photos);
  return (
    <WithSideBar>
      <div className="mt-5 w-full flex flex-col items-center">
        <div className="container mx-auto">
          <BackToEvent />
          <div className="flex flex-col justify-center items-center gap-4 my-2">
            <h2 className="text-center text-3xl font-semibold">
              {event?.name}
            </h2>
            <div className="inline-flex gap-4">
              <span className="inline-flex items-center gap-1">
                <AiOutlineCalendar />
                {event?.date !== undefined && (
                  <p>
                    {format(
                      new Date(event?.date!._seconds! * 1000),
                      'dd MMMM yyyy'
                    )}
                  </p>
                )}
              </span>
              <p>•</p>
              <span className="inline-flex items-center gap-1">
                <AiOutlineFileImage />
                <p>{event?.amount} Photo</p>
              </span>
            </div>
            <div className="flex gap-2">
              <button
                className="w-full px-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold"
                onClick={handleSelectEvent}
              >
                {isSelected ? 'Selected' : 'Select Event'}
              </button>
              <button
                className="w-full px-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
                onClick={handleDeleteEvent}
              >
                Delete Event
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-6 gap-y-14 p-4">
            {photos
              .filter(({ src }) => src !== 'uploading')
              .map(({ src, id }) => (
                <Image key={id} src={src!} onClick={() => {}} />
              ))}
          </div>
        </div>
      </div>
    </WithSideBar>
  );
}

export default InAlbum;
