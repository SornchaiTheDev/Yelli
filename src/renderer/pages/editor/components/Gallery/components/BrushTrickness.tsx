import { Color } from 'react-color-palette';

function BrushTrickness({
  thickness,
  color,
  selected,
}: {
  thickness: number;
  color: Color;
  selected: (size: number) => void;
}) {
  const thicknessArr = [
    { section: 1, size: [1, 5, 10, 15] },
    { section: 2, size: [20, 25, 30, 40] },
  ];
  return (
    <table className="border-collapse border-0 border-black  table-fixed ">
      <tbody>
        {thicknessArr.map(({ size }) => (
          <tr className="h-12">
            {size.map((value) => (
              <td
                className={`w-12 ${thickness === value && 'bg-gray-200'}`}
                onClick={() => selected(value)}
              >
                <div className="flex justify-center items-center ">
                  <div
                    className={`rounded-full border-2 border-gray-400`}
                    style={{
                      background: color.hex,
                      width: value,
                      height: value,
                    }}
                  ></div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BrushTrickness;
