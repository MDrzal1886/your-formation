import { FC, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IAppProps } from 'src/types';
import { MediaContextProvider } from 'src/context/MediaContext';

const App: FC<IAppProps> = ({ Component, pageProps }: IAppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <MediaContextProvider>
          <Component {...pageProps} />
        </MediaContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
