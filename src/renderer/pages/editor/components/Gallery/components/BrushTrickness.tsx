import { Color } from 'react-color-palette';
import { useThemeContext } from 'renderer/context/ThemeContext';

function BrushTrickness({
  thickness,
  color,
  selected,
}: {
  thickness: number;
  color: Color;
  selected: (size: number) => void;
}) {
  const { theme } = useThemeContext();
  const thicknessArr = [
    { section: 1, size: [5, 10, 15, 20] },
    { section: 2, size: [25, 30, 35, 40] },
  ];
  return (
    <table className="border-collapse border-0 border-black  table-fixed ">
      <tbody>
        {thicknessArr.map(({ section, size }) => (
          <tr className="h-12" key={section}>
            {size.map((value) => (
              <td
                key={value}
                style={{
                  backgroundColor:
                    thickness === value ? theme.primary.color : 'transparent',
                }}
                className="w-12"
                onClick={() => selected(value)}
              >
                <div className="flex justify-center items-center ">
                  <div
                    className="rounded-full border-2"
                    style={{
                      borderColor: theme.secondary.color,
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
