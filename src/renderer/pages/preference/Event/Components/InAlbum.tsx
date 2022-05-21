import WithSideBar from '../../HOC/withSideBar';
import Image from './Image';
import { AiOutlineCalendar, AiOutlineFileImage } from 'react-icons/ai';
import BackToEvent from './BackToEvent';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventI, PhotoI } from '@decor/Event';

function InAlbum() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventI | null>(null);
  const [photos, setPhotos] = useState<PhotoI[]>([]);

  useEffect(() => {
    window.electron
      .get_event(id)
      .then(({ event, photos }: { event: EventI; photos: PhotoI[] }) => {
        setEvent(event);
        setPhotos(photos);
      });
  }, []);
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
                      new Date(event?.date!._seconds * 1000),
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
          </div>
          <div className="grid grid-cols-4 gap-x-6 gap-y-14 p-4">
            {photos.map(({ src }) => (
              <Image src={src} onClick={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </WithSideBar>
  );
}

export default InAlbum;
