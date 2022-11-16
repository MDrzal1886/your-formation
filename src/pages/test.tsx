import { useRef } from 'react';
import Draggable from 'react-draggable';

import styles from 'src/styles/test.module.scss';

const Test = () => {
  const nodeRef = useRef(null);

  return (
    <div className={styles.container}>
      <h1>Formation</h1>
      <div className={styles.pitch}>
        <Draggable
          defaultClassName={styles.player}
          bounds="parent"
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>1</div>
        </Draggable>
      </div>
    </div>
  );
};

export default Test;
