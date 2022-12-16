import styles from './socials.module.scss';
import { socialLinks } from 'src/dictionary/socialLinks';

const Socials = () => {
  return (
    <div className={styles.socialsWrapper}>
      {socialLinks.map(({ href, icon }, index) => (
        <a
          className={styles.socialLink}
          href={href}
          target="_blank"
          key={index}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
