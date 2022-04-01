import { BiTime } from 'react-icons/bi';
import { useEffect, useState } from 'react';

interface Ctime {
  first_ctime: number;
  last_ctime: number;
}

function TimeButton({
  selectedTime,
  onClick,
}: {
  selectedTime: number;
  onClick: (time: number) => void;
}) {
  const selected = selectedTime === null ? '' : 'border-4 border-gray-900';
  const [time, setTime] = useState<Ctime>({
    first_ctime: 0,
    last_ctime: 0,
  });

  useEffect(() => {
    window.electron.files.timeButtons().then((ctime: Ctime) => {
      setTime(ctime);
    });
  }, []);

  useEffect(() => {
    console.log(time);
  }, [time]);

  return (
    <div className="w-full overflow-x-scroll">
      <div className="flex space-x-2 h-full py-2">
        {new Array(time.last_ctime - time.first_ctime + 1)
          .fill(0)
          .map((_, index) => {
            const tiktok = (time.first_ctime + index) % 24;
            return (
              <div
                key={tiktok}
                onClick={() => onClick(tiktok)}
                className={
                  'bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ' +
                  (tiktok === selectedTime && selected)
                }
              >
                <BiTime />
                <h2 className="text-lg font-bold">
                  {tiktok.toString().padStart(2, '0')}:00
                </h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TimeButton;
