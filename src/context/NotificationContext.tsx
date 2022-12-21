import {
  FC,
  createContext,
  useContext,
  useState,
  useRef,
  RefObject,
  useEffect
} from 'react';

import { IChildren } from 'src/types';

export enum NotificationStatus {
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export interface INotification {
  title: string;
  status: NotificationStatus;
  message: string;
}

interface INotificationContext {
  notification: INotification | null;
  notificationRef: RefObject<HTMLDivElement> | null;
  showNotification: (notification: INotification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  notificationRef: null,
  showNotification: () => {},
  hideNotification: () => {}
});

export const NotificationContextProvider: FC<IChildren> = ({ children }) => {
  const [notification, setNotification] = useState<INotification | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const showNotification = (notification: INotification) => {
    setNotification(notification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(hideNotification, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notificationRef,
        showNotification,
        hideNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => useContext(NotificationContext);

export default useNotificationContext;
