import { FC, Fragment, ReactNode } from 'react';

import styles from './footerSection.module.scss';

interface IProps {
  children?: ReactNode;
  title: string;
}

const FooterSection: FC<IProps> = ({ children, title }) => {
  return (
    <Fragment>
      <p className={styles.sectionTitle}>{title}</p>
      {children}
    </Fragment>
  );
};

export default FooterSection;
