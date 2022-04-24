import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Initialize() {
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.initialize().then((status: string) => {
      if (status === 'initialize-success') navigate('/explorer');
    });
  }, []);
  return null;
}

export default Initialize;
