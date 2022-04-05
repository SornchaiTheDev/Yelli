/**
 *
 * todos
 * customize theme colors
 *
 */

function Themes() {
  return (
    <>
      <div className="flex flex-col space-y-4 px-4">
        <h1 className="font-medium">Primary Color</h1>
        <div className="flex items-center space-x-2  relative w-fit">
          <input type="text" className="rounded-lg" value="#f59e0b" />
          <div className="absolute w-6 h-6 bg-[#f59e0b] right-2"></div>
        </div>
        <h1 className="font-medium">Secondary Color</h1>
        <div className="flex items-center space-x-2  relative w-fit">
          <input type="text" className="rounded-lg" value="#fde68a" />
          <div className="absolute w-6 h-6 bg-[#fde68a] right-2"></div>
        </div>
        <h1 className="font-medium">Ascents Color</h1>
        <div className="flex items-center space-x-2  relative w-fit">
          <input type="text" className="rounded-lg" value="#e5e7eb" />
          <div className="absolute w-6 h-6 bg-[#e5e7eb] right-2"></div>
        </div>
      </div>
    </>
  );
}

export default Themes;
