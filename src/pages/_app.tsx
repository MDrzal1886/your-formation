import { FC, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'src/styles/global.scss';
import { IAppProps } from 'src/types';
import { ThemeProvider } from 'next-themes';
import Layout from 'src/components/layout/Layout';
import { AppContextProvider } from 'src/context/AppContext';

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
        <AppContextProvider>
          <ThemeProvider enableColorScheme={false}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
