import { useState, useEffect } from 'react';

function Select({
  className,
  checked,
}: {
  className?: string;
  checked?: boolean;
}) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (checked !== undefined) setSelected(checked);
  }, [checked]);
  return (
    <input
      type="checkbox"
      className={`w-8 h-8 rounded-full checked:text-yellow-500 bg-white focus:ring-transparent ${className}`}
      checked={selected}
      onChange={() => setSelected(!selected)}
    />
  );
}

export default Select;
