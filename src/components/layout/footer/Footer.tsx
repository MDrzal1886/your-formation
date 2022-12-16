import styles from './footer.module.scss';
import Socials from 'src/components/socials/Socials';
import FooterSection from './section/FooterSection';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerSections}>
        <FooterSection title="FOLLOW US">
          <Socials />
        </FooterSection>
      </div>
      <p className={styles.allRightsText}>
        &#169; {date} Your Formation. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
