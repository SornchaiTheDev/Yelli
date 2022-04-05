import { useState } from 'react';
import { BsGear, BsPalette } from 'react-icons/bs';
import General from './General';
import Themes from './Themes';
function Setup() {
  const menu = [
    { name: 'General', icon: <BsGear /> },
    { name: 'Theme', icon: <BsPalette /> },
  ];
  const [selected, setSelected] = useState<string>('General');

  return (
    <div className="grid grid-cols-5 h-screen w-full">
      <div className="col-span-1 flex flex-col justify-start items-start w-full h-full space-y-2 px-2 border-r-2 pt-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        {menu.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => setSelected(name)}
            className={`flex items-center space-x-4 p-2 w-full cursor-pointer ${
              selected === name ? 'bg-yellow-500 rounded-lg' : ''
            }`}
          >
            {icon}
            <h1>{name}</h1>
          </div>
        ))}
      </div>
      <div className="col-span-4 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">{selected}</h1>
        {selected === 'General' && <General />}
        {selected === 'Theme' && <Themes />}
      </div>
    </div>
  );
}

export default Setup;
