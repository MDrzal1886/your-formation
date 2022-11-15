import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';

import { IAppProps } from 'src/types';

const App: FC<IAppProps> = ({ Component, pageProps }: IAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
