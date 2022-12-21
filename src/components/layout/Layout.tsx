import { FC, Fragment } from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';
import Modal from '../modal/Modal';
import Notification from '../notification/Notification';
import { IChildren } from 'src/types';

const Layout: FC<IChildren> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main style={{ height: '500px' }}>{children}</main>
      <Footer />
      <Modal />
      <Notification />
    </Fragment>
  );
};

export default Layout;
