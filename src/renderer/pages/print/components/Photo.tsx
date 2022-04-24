import { BiPrinter } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';

function Photo({
  path,
  onClick,
  className,
}: {
  path: string;
  onClick?: () => void;
  className?: string;
}) {
  const { theme } = useThemeContext();
  const { t } = useTranslation();

  return (
    <div
      className={`bg-gray-200 rounded-lg overflow-hidden select-none flex-shrink-0 relative ${
        className !== undefined ? className : ''
      }`}
    >
      <div className="absolute flex justify-center items-center w-full h-full">
        <div
          style={{
            backgroundColor: theme.primary.color,
            color: theme.text.color,
          }}
          className="w-48 h-48 flex flex-col justify-center items-center rounded-full p-10 cursor-pointer"
          onClick={onClick}
        >
          <div className="w-3/4">
            <BiPrinter size="100%" />
          </div>
          <h1 className="text-2xl font-bold">{t('print.btn.print')}</h1>
        </div>
      </div>
      <img src={path} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
