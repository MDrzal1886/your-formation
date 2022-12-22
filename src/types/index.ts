import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

export interface IAppProps extends AppProps {
  pageProps: {
    session: Session | null;
  };
}

export interface IChildren {
  children?: ReactNode;
}

export type TError = { message: string };

export interface IData {
  message: string;
}
