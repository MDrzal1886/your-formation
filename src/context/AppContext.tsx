import { MediaContextProvider } from './MediaContext';
import { ModalContextProvider } from './ModalContext';
import { combineComponents } from 'src/utils/combineComponents';

const providers = [MediaContextProvider, ModalContextProvider];

export const AppContextProvider = combineComponents(...providers);
