import WithSideBar from '../../HOC/withSideBar';
import Image from './Image';
import { AiOutlineCalendar, AiOutlineFileImage } from 'react-icons/ai';
import BackToEvent from './BackToEvent';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventI, PhotoI } from '@decor/Event';

import { useEventContext } from '../Context/EventContext';

function InAlbum() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventI | null>(null);
  const [selects, setSelects] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotoI[]>([]);
  const navigate = useNavigate();
  const { deleteEvent } = useEventContext();

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

  const handleSelectClick = () => {
    setIsSelected(!isSelected);
  };
  const handleSelectEvent = (id: string) => {
    if (isSelected) {
      if (selects.includes(id)) {
        return setSelects(selects.filter((item) => item !== id));
      }
      setSelects([...selects, id]);
    }
  };

  const handleSelectCancel = () => {
    setSelects([]);
    setIsSelected(false);
  };

  const handleDeletePhotos = () => {
    window.electron.delete_photos(id, selects).then(() => {
      setSelects([]);
      setIsSelected(false);
      setPhotos(photos.filter((item) => !selects.includes(item.id)));
    });
  };

  const handleDeleteEvent = () => {
    window.electron.delete_event(id);
    deleteEvent(id as string);
    navigate('/preference/Event');
  };

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
            <div className="w-1/2 flex gap-2 justify-center items-center">
              {isSelected ? (
                <>
                  {selects.length > 0 && (
                    <button
                      className="w-full p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
                      onClick={handleDeletePhotos}
                    >
                      Delete ({selects.length})
                    </button>
                  )}
                  <button
                    className="w-full p-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold"
                    onClick={handleSelectCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
                    onClick={handleSelectClick}
                  >
                    Select
                  </button>
                  <button
                    className="w-full p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
                    onClick={handleDeleteEvent}
                  >
                    Delete Event
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-6 gap-y-14 p-4">
            {photos
              .filter(({ src }) => src !== 'uploading')
              .map(({ src, id }) => (
                <div
                  className={`relative ${
                    isSelected ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onClick={() => handleSelectEvent(id)}
                >
                  {isSelected && (
                    <div className="absolute right-2 top-0">
                      <input
                        type="checkbox"
                        checked={selects.includes(id)}
                        onChange={() => handleSelectEvent(id)}
                      />
                    </div>
                  )}
                  <Image key={id} src={src!} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </WithSideBar>
  );
}

export default InAlbum;
