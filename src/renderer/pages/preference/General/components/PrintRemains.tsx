import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPrinter } from 'react-icons/bs';
import Store from 'renderer/utils/store';

function PrintRemains() {
  const store = new Store();
  const { t } = useTranslation();
  const [remains, setRemains] = useState<string>('');

  const handleRemains = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _remains: string = e.target.value;
    setRemains(_remains);
    store.set('remains', remains);
  };

  useEffect(() => {
    store.get('remains').then((res) => res !== undefined && setRemains(res));
  }, []);

  return (
    <>
      <h1 className="text-md font-medium">{t('setting.general.remains')}</h1>
      <div className="flex items-center w-fit space-x-4  relative">
        <input
          onChange={handleRemains}
          type="text"
          className="text-sm rounded-lg bg-gray-50 caret-yellow-500"
          value={remains}
        />
        <div className="absolute right-2">
          <BsPrinter />
        </div>
      </div>
    </>
  );
}

export default PrintRemains;
