import { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import styles from 'src/styles/test.module.scss';

const Test = () => {
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const node3Ref = useRef(null);
  const node4Ref = useRef(null);
  const node5Ref = useRef(null);
  const node6Ref = useRef(null);
  const node7Ref = useRef(null);
  const node8Ref = useRef(null);
  const node9Ref = useRef(null);
  const node10Ref = useRef(null);
  const node11Ref = useRef(null);
  const players = [
    {
      num: 1,
      posX: 200,
      posY: 0
    },
    {
      num: 2,
      posX: 50,
      posY: 100
    },
    {
      num: 3,
      posX: 150,
      posY: 100
    },
    {
      num: 4,
      posX: 250,
      posY: 100
    },
    {
      num: 5,
      posX: 350,
      posY: 100
    },
    {
      num: 6,
      posX: 50,
      posY: 200
    },
    {
      num: 7,
      posX: 150,
      posY: 200
    },
    {
      num: 8,
      posX: 250,
      posY: 200
    },
    {
      num: 9,
      posX: 350,
      posY: 200
    },
    {
      num: 10,
      posX: 150,
      posY: 300
    },
    {
      num: 11,
      posX: 250,
      posY: 300
    }
  ];

  const [playersPositions, setPlayersPositions] = useState([
    { x: players[0].posX, y: players[0].posY },
    { x: players[1].posX, y: players[1].posY },
    { x: players[2].posX, y: players[2].posY },
    { x: players[3].posX, y: players[3].posY },
    { x: players[4].posX, y: players[4].posY },
    { x: players[5].posX, y: players[5].posY },
    { x: players[6].posX, y: players[6].posY },
    { x: players[7].posX, y: players[7].posY },
    { x: players[8].posX, y: players[8].posY },
    { x: players[9].posX, y: players[9].posY },
    { x: players[10].posX, y: players[10].posY }
  ]);

  const getRef = (num: number) => {
    switch (num) {
      case 1:
        return node1Ref;
      case 2:
        return node2Ref;
      case 3:
        return node3Ref;
      case 4:
        return node4Ref;
      case 5:
        return node5Ref;
      case 6:
        return node6Ref;
      case 7:
        return node7Ref;
      case 8:
        return node8Ref;
      case 9:
        return node9Ref;
      case 10:
        return node10Ref;
      case 11:
        return node11Ref;
    }
  };

  const handleOnStop = (
    e: DraggableEvent,
    data: DraggableData,
    player: { num: number; posX: number; posY: number }
  ) => {
    let isCovered = false;
    playersPositions.forEach((playerPosition, index) => {
      if (index === player.num - 1) {
        return;
      }
      if (
        !(data.x < playerPosition.x - 50) &&
        !(data.x > playerPosition.x + 50) &&
        !(data.y < playerPosition.y - 50) &&
        !(data.y > playerPosition.y + 50)
      ) {
        isCovered = true;
        return;
      }
    });

    if (isCovered) {
      return;
    }

    const changedPlayersPositions = playersPositions.map(
      (playerPosition, index) => {
        if (index === player.num - 1) {
          return { x: data.x, y: data.y };
        }
        return playerPosition;
      }
    );
    setPlayersPositions(changedPlayersPositions);
  };

  return (
    <div className={styles.container}>
      <h1>Formation</h1>
      <div className={styles.pitch}>
        {players.map((player, index) => (
          <Draggable
            defaultClassName={styles.player}
            bounds="parent"
            nodeRef={getRef(player.num)}
            key={player.num}
            position={playersPositions[index]}
            onStop={(e, data) => handleOnStop(e, data, player)}
            disabled={player.num === 1}
          >
            <div ref={getRef(player.num)}>{player.num}</div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default Test;
