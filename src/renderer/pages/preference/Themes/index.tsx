/**
 *
 * todos
 * customize theme colors
 *
 */
import { useTranslation } from 'react-i18next';

function Themes() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">
        {t('setting.theme.title')}
      </h1>
      <div className="flex flex-col space-y-4 px-4">
        <h1 className="font-medium">{t('setting.theme.primary')}</h1>
        <div className="flex items-center space-x-2  relative w-fit">
          <input type="text" className="rounded-lg" value="#f59e0b" />
          <div className="absolute w-6 h-6 bg-[#f59e0b] right-2"></div>
        </div>
        <h1 className="font-medium">{t('setting.theme.secondary')}</h1>
        <div className="flex items-center space-x-2  relative w-fit">
          <input type="text" className="rounded-lg" value="#fde68a" />
          <div className="absolute w-6 h-6 bg-[#fde68a] right-2"></div>
        </div>
        <h1 className="font-medium">{t('setting.theme.text')}</h1>
        <div className="flex items-center space-x-2  relative w-fit">
          <input type="text" className="rounded-lg" value="#2e2e2e" />
          <div className="absolute w-6 h-6 bg-[#2e2e2e] right-2"></div>
        </div>
      </div>
    </>
  );
}

export default Themes;
