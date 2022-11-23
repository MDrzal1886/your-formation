import { FC, createContext, useContext } from 'react';
import { useMedia } from 'react-use';

import { IChildren } from 'src/types';

interface IMediaContext {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
}

const MediaContext = createContext<IMediaContext>({
  isXs: false,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false
});

export const MediaContextProvider: FC<IChildren> = ({ children }) => {
  const sM = useMedia('(min-width: 640px)');
  const mD = useMedia('(min-width: 768px)');
  const lG = useMedia('(min-width: 1024px)');
  const xL = useMedia('(min-width: 1200px)');
  const isXs = !sM && !mD && !lG && !xL;
  const isSm = sM && !mD;
  const isMd = mD && !lG;
  const isLg = lG && !xL;
  const isXl = xL;

  return (
    <MediaContext.Provider value={{ isXs, isSm, isMd, isLg, isXl }}>
      {children}
    </MediaContext.Provider>
  );
};

const useMediaContext = () => useContext(MediaContext);

export default useMediaContext;
