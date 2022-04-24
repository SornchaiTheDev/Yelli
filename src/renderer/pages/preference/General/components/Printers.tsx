import { useState, useEffect } from 'react';
import { PrinterInfo } from 'electron';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { BsPrinter } from 'react-icons/bs';
import Store from 'renderer/utils/store';

function Printers() {
  const store = new Store();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const [printers, setPrinters] = useState<PrinterInfo[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    window.electron
      .getPrinters()
      .then((printers: PrinterInfo[]) => {
        store.get('printer').then((res) => {
          const defaultPrinter = printers.find(({ isDefault }) => isDefault);
          if (res === undefined && defaultPrinter) {
            store.set('printer', defaultPrinter.name);
            setSelectedPrinter(defaultPrinter.name);
          } else {
            setSelectedPrinter(res);
          }
        });
        setPrinters(printers);
      })
      .catch((err: string) => console.error(err));
  }, []);

  return (
    <>
      <h1 className="text-md font-medium">{t('setting.general.printers')}</h1>
      <div className="grid grid-cols-3 gap-4">
        {printers.map(
          ({ name, displayName }: { name: string; displayName: string }) => {
            return (
              <div
                key={displayName}
                style={{
                  backgroundColor:
                    selectedPrinter === name ? theme.primary.color : '',
                }}
                className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                  selectedPrinter === name
                    ? 'bg-yellow-500'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => {
                  setSelectedPrinter(name);
                  store.set('printer', name);
                }}
              >
                <div>
                  <BsPrinter className="block" />
                </div>
                <h1>{displayName}</h1>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export default Printers;
