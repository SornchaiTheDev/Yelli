import { useLocation, matchRoutes } from 'react-router-dom';

function useRoute(routes: string) {
  const location = useLocation();

  return location.pathname.replace(routes + "/", '');
}

export default useRoute;
