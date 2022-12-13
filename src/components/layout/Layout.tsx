import { FC, Fragment, ReactNode } from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';

interface IProps {
  children?: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;