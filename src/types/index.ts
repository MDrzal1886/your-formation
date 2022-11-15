import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

export interface IAppProps extends AppProps {
  pageProps: {
    session: Session | null;
  };
}
