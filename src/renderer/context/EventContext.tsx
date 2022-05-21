import { createContext, useContext } from 'react';

interface EventI {
  name: string | null;
}

const Context = createContext<EventI>({ name: null });

function EventContext({ children }: { children: React.ReactNode }) {
  return <Context.Provider value={{ name: null }}>{children}</Context.Provider>;
}

export default EventContext;

export const useEventContext = () => useContext(Context);
