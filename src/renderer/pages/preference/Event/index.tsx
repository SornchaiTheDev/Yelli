import { useTranslation } from 'react-i18next';
import CreateEvent from './Components/CreateEvent';
import Events from './Components/Events';
import WithSideBar from '../HOC/withSideBar';
import EventContext from './Context/EventContext';

function index() {
  const { t } = useTranslation();

  return (
    <EventContext>
      <WithSideBar>
        <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">
          {t('setting.event.title')}
        </h1>
        <div className="flex flex-col w-full space-y-4 px-4">
          <CreateEvent />
          <Events />
        </div>
      </WithSideBar>
    </EventContext>
  );
}

export default index;
