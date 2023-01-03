import { Fragment, useEffect } from 'react';
import gsap from 'gsap';

import styles from './notification.module.scss';
import SuccessIcon from 'src/assets/svg/success.svg';
import ErrorIcon from 'src/assets/svg/error.svg';
import useNotificationContext, {
  NotificationStatus
} from 'src/context/NotificationContext';

const Notification = () => {
  const { notification, hideNotification, notificationRef } =
    useNotificationContext();

  useEffect(() => {
    if (!notificationRef?.current) return;

    const notificationElement = notificationRef.current;
    const tl = gsap.timeline();

    if (notification) {
      tl.to([notificationElement], {
        backgroundColor:
          notification.status === NotificationStatus.Success ? 'green' : 'red',
        opacity: 1,
        x: '-60%',
        right: 0,
        duration: 0.2
      }).to([notificationElement], { x: '+=10%', duration: 0.2 });

      return;
    }

    tl.to([notificationElement], { x: '-=10%', duration: 0.2 }).to(
      [notificationElement],
      { opacity: 0, x: 0, right: '-100%', duration: 0.2 }
    );
  }, [notification]);

  return (
    <div
      className={styles.notification}
      onClick={hideNotification}
      ref={notificationRef}
    >
      {notification && (
        <Fragment>
          <div>
            {notification.status === NotificationStatus.Success ? (
              <SuccessIcon className={styles.icon} />
            ) : (
              <ErrorIcon className={styles.icon} />
            )}
          </div>
          <div className={styles.contentWrapper}>
            <p className={styles.title}>{notification.title}</p>
            <p>{notification.message}</p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Notification;
