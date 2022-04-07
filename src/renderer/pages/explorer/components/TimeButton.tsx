import { BiTime } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import theme from '../../../theme.json';

interface Ctime {
  first_ctime: number;
  last_ctime: number;
}

function TimeButton({
  selectedTime,
  onClick,
  cTime,
}: {
  selectedTime: number | null;
  onClick: (time: number) => void;
  cTime: Ctime;
}) {
  const selected = selectedTime === null ? '' : 'border-4 border-gray-900';

  return (
    <div className="w-full overflow-x-scroll">
      <div className="flex space-x-2 h-full py-2">
        {new Array(cTime.last_ctime - cTime.first_ctime + 1)
          .fill(0)
          .map((_, index) => {
            const tiktok = (cTime.first_ctime + index) % 24;
            return (
              <div
                key={tiktok}
                onClick={() => onClick(tiktok)}
                style={{ backgroundColor: theme.primary }}
                className={
                  'px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer shadow-md ' +
                  (tiktok === selectedTime && selected)
                }
              >
                <BiTime
                  style={{
                    color: theme.text,
                  }}
                />
                <h2
                  style={{
                    color: theme.text,
                  }}
                  className="text-lg font-bold"
                >
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
