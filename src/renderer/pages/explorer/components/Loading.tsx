function Loading() {
  return (
    <div className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10 px-2">
      {new Array(12).fill(0).map((_, i) => (
        <div
          key={i}
          className="relative bg-gray-300 rounded-lg overflow-hidden select-none cursor-pointer w-full h-64 animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export default Loading;
