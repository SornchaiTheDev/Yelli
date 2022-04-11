import { useTranslation } from 'react-i18next';
import { Theme } from 'renderer/utils/interface/theme';

function SaveBtn({
  show,
  theme,
  handleThemeSetting,
  revertThemeSetting,
}: {
  show: boolean;
  theme: Theme;
  handleThemeSetting: () => void;
  revertThemeSetting: () => void;
}) {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="fixed bottom-0 bg-white flex space-x-2 w-full px-4 py-4 border-t-2">
      <div
        style={{ backgroundColor: theme.primary.color }}
        className="rounded-lg flex justify-center px-4 py-2 cursor-pointer"
        onClick={handleThemeSetting}
      >
        <h1 className="text-md font-medium" style={{ color: theme.text.color }}>
          {t('setting.theme.setTheme')}
        </h1>
      </div>
      <div
        style={{ backgroundColor: theme.secondary.color }}
        className="rounded-lg flex justify-center px-4 py-2 cursor-pointer"
        onClick={revertThemeSetting}
      >
        <h1 className="text-md font-medium" style={{ color: theme.text.color }}>
          {t('setting.theme.revert')}
        </h1>
      </div>
    </div>
  );
}

export default SaveBtn;
