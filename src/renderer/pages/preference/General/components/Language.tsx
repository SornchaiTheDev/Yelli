import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Store from 'renderer/utils/store';

function Language() {
  const [language, setLanguage] = useState<string>('en');
  const { t, i18n } = useTranslation();
  const store = new Store();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang: string = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    store.set('language', lang);
  };

  useEffect(() => {
    store.get('language').then((res) => {
      if (res !== undefined) {
        setLanguage(res);
        i18n.changeLanguage(res);
      }
    });
  }, []);

  return (
    <>
      <h1 className="text-md font-medium">{t('setting.general.language')}</h1>
      <select
        className="rounded-lg w-fit text-sm font-semibold bg-gray-50"
        onChange={handleLangChange}
        value={language}
      >
        <option value="th">ภาษาไทย</option>
        <option value="en">English</option>
      </select>
    </>
  );
}

export default Language;
