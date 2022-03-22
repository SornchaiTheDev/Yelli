import { useState } from 'react';

type propertyKey = {
  [key: string]: number | string | rangeInput;
};

type rangeInput = {
  min: number;
  max: number;
  step: number;
  value: number;
};

interface Properties extends propertyKey {
  // color: string;
  thickness: rangeInput;
  opacity: rangeInput;
}

const colors = ['red', 'green', 'blue', 'yellow', 'black', 'white'];

function DrawGallery() {
  const [properties, setProperties] = useState<Properties>({
    thickness: { min: 0, max: 10, step: 0.1, value: 3 },
    opacity: { min: 0, max: 1, step: 0.1, value: 1 },
  });
  const [selectedColor, setSelectedColor] = useState<string>('black');

  return (
    <div className="flex flex-col space-y-4 p-4 w-full h-full ">
      <h1 className="text-4xl font-bold">Draw</h1>

      {Object.keys(properties).map((property) => {
        const key = properties[property] as rangeInput;
        const { value, min, max, step } = key;
        return (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">
                {property.charAt(0).toUpperCase() + property.slice(1)}
              </h1>
              <h1 className="font-bold">{value}</h1>
            </div>
            <input
              type="range"
              value={value}
              onChange={(e) =>
                setProperties((prev) => ({
                  ...prev,
                  [property]: {
                    ...key,
                    value: parseFloat(e.target.value),
                  },
                }))
              }
              className="mt-6 appearance-none w-full bg-gray-200 rounded-lg h-4"
              min={min}
              max={max}
              step={step}
            />
          </div>
        );
      })}

      <h1 className="text-lg font-semibold">Color</h1>
      <div className="grid grid-cols-4 gap-6">
        {colors.map((color) => (
          <div
            onClick={() => setSelectedColor(color)}
            className={`cursor-pointer w-12 h-12 rounded-full  border-4 ${
              color === selectedColor && 'border-yellow-500'
            }`}
            style={{ background: color }}
          ></div>
        ))}

        {/* <input type="color" /> */}
      </div>

      {/* <div className="w-24 h-24 rounded-lg bg-yellow-400 flex justify-center items-center">
        <BiPen size="30%" />
      </div>
      <div className="w-24 h-24 rounded-lg bg-yellow-400 flex justify-center items-center">
        <BiEraser size="30%" />
      </div> */}
    </div>
  );
}

export default DrawGallery;
