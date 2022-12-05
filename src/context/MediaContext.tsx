import { FC, createContext, useContext } from 'react';
import { useMedia } from 'react-use';

import { IChildren } from 'src/types';

interface IMediaContext {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isLandscape: boolean;
}

const MediaContext = createContext<IMediaContext>({
  isXs: false,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false,
  isLandscape: false
});

export const MediaContextProvider: FC<IChildren> = ({ children }) => {
  const xS = useMedia('(max-width: 640px)', false);
  const sM = useMedia('(min-width: 640px)', false);
  const mD = useMedia('(min-width: 768px)', false);
  const lG = useMedia('(min-width: 1024px)', false);
  const xL = useMedia('(min-width: 1200px)', false);
  const isXs = xS && !sM && !mD && !lG && !xL;
  const isSm = sM && !mD;
  const isMd = mD && !lG;
  const isLg = lG && !xL;
  const isXl = xL;
  const isLandscape = useMedia('(orientation: landscape)', false);

  return (
    <MediaContext.Provider
      value={{ isXs, isSm, isMd, isLg, isXl, isLandscape }}
    >
      {children}
    </MediaContext.Provider>
  );
};

const useMediaContext = () => useContext(MediaContext);

export default useMediaContext;
