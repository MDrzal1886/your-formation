import { Fragment, useEffect } from 'react';
import gsap from 'gsap';

import styles from './notification.module.scss';
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
        opacity: 1,
        x: '-110%',
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
      className={`${styles.notification} ${
        notification && notification.status === NotificationStatus.Success
          ? styles.success
          : styles.error
      }`}
      onClick={hideNotification}
      ref={notificationRef}
    >
      {notification && (
        <Fragment>
          <p>{notification?.title}</p>
          <p>{notification?.message}</p>
        </Fragment>
      )}
    </div>
  );
};

export default Notification;
