import { FC, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IAppProps } from 'src/types';
import { MediaContextProvider } from 'src/context/MediaContext';
import { ThemeProvider } from 'next-themes';

import 'src/styles/global.scss';

const App: FC<IAppProps> = ({ Component, pageProps }: IAppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <MediaContextProvider>
          <ThemeProvider enableColorScheme={false}>
            <Component {...pageProps} />
          </ThemeProvider>
        </MediaContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
