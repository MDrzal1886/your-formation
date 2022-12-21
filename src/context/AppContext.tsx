import { MediaContextProvider } from './MediaContext';
import { ModalContextProvider } from './ModalContext';
import { combineComponents } from 'src/utils/combineComponents';
import { NotificationContextProvider } from './NotificationContext';

const providers = [
  MediaContextProvider,
  ModalContextProvider,
  NotificationContextProvider
];

export const AppContextProvider = combineComponents(...providers);
