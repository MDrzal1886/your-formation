import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';

import { IAppProps } from 'src/types';
import { MediaContextProvider } from 'src/context/MediaContext';

const App: FC<IAppProps> = ({ Component, pageProps }: IAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </SessionProvider>
  );
};

export default App;
