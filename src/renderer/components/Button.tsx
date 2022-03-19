import { ReactNode } from 'react';

function Button({ children }: { children: ReactNode }) {
  return (
    <button className="text-xl font-bold outline-none rounded-full px-4 py-2 bg-yellow-500 mr-2">
      {children}
    </button>
  );
}

export default Button;
