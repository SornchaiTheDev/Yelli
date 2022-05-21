import { useTranslation } from 'react-i18next';
import CreateEvent from './Components/CreateEvent';
import Events from './Components/Events';
import WithSideBar from '../HOC/withSideBar';

function index() {
  const { t } = useTranslation();

  return (
    <WithSideBar>
      <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">
        {t('setting.event.title')} (10)
      </h1>
      <div className="flex flex-col w-full space-y-4 px-4">
        <CreateEvent />
        <Events />
      </div>
    </WithSideBar>
  );
}

export default index;
