import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Initialize() {
  const navigate = useNavigate();
  useEffect(() => {
    window.electron.initialize().then((status: string) => {
      if (status === 'initialize-success') navigate('/explorer');
    });
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-5xl">Initializing....</h1>
    </div>
  );
}

export default Initialize;
