import { useEffect, useState } from 'react';

function usewindow() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const onChangeWindowSize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener('resize', onChangeWindowSize);
    return () => window.removeEventListener('resize', onChangeWindowSize);
  }, []);
  return { width: size.width, height: size.height };
}

export default usewindow;
