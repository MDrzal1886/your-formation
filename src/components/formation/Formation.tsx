import { useEffect, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import useMediaContext from 'src/context/MediaContext';

import styles from './formation.module.scss';

const playerss = [
  {
    num: 1,
    posX: 135,
    posY: 30
  },
  {
    num: 2,
    posX: 36,
    posY: 90
  },
  {
    num: 3,
    posX: 102,
    posY: 90
  },
  {
    num: 4,
    posX: 168,
    posY: 90
  },
  {
    num: 5,
    posX: 234,
    posY: 90
  },
  {
    num: 6,
    posX: 36,
    posY: 150
  },
  {
    num: 7,
    posX: 102,
    posY: 150
  },
  {
    num: 8,
    posX: 168,
    posY: 150
  },
  {
    num: 9,
    posX: 234,
    posY: 150
  },
  {
    num: 10,
    posX: 80,
    posY: 210
  },
  {
    num: 11,
    posX: 190,
    posY: 210
  }
];

const Formation = () => {
  const player1Ref = useRef(null);
  const player2Ref = useRef(null);
  const player3Ref = useRef(null);
  const player4Ref = useRef(null);
  const player5Ref = useRef(null);
  const player6Ref = useRef(null);
  const player7Ref = useRef(null);
  const player8Ref = useRef(null);
  const player9Ref = useRef(null);
  const player10Ref = useRef(null);
  const player11Ref = useRef(null);

  const [playersPositions, setPlayersPositions] = useState(playerss);

  const { isXs, isSm, isMd, isLg, isXl, trend } = useMediaContext();

  const { playerSize, players } = useMemo(() => {
    const positionMultiplier = isXs
      ? 1
      : isSm
      ? 1.33
      : isMd
      ? 1.33
      : isLg
      ? 1.66
      : isXl
      ? 1.66
      : 1;
    const positionDivider = isSm ? 1 : isLg ? 1 : 1.33;

    if (trend === 'increase') {
      const positionMultiplier = isSm ? 1.33 : isLg ? 1.33 : 1;
      return {
        players: playersPositions.map((player) => ({
          ...player,
          posX: Math.round(player.posX * positionMultiplier),
          posY: Math.round(player.posY * positionMultiplier)
        })),
        playerSize: isSm ? 40 : isLg ? 50 : 30
      };
    }

    if (trend === 'decrease') {
      return {
        players: playersPositions.map((player) => ({
          ...player,
          posX: Math.round(player.posX / positionDivider),
          posY: Math.round(player.posY / positionDivider)
        })),
        playerSize: isSm ? 40 : isLg ? 50 : 30
      };
    }

    return {
      players: playersPositions.map((player) => ({
        ...player,
        posX: Math.round(player.posX * positionMultiplier),
        posY: Math.round(player.posY * positionMultiplier)
      })),
      playerSize: isSm ? 40 : isLg ? 50 : 30
    };
  }, [isXs, isSm, isMd, isLg, isXl]);

  useEffect(() => {
    setPlayersPositions(players);
  }, [isXs, isSm, isMd, isLg, isXl]);

  const getRef = (num: number) => {
    switch (num) {
      case 1:
        return player1Ref;
      case 2:
        return player2Ref;
      case 3:
        return player3Ref;
      case 4:
        return player4Ref;
      case 5:
        return player5Ref;
      case 6:
        return player6Ref;
      case 7:
        return player7Ref;
      case 8:
        return player8Ref;
      case 9:
        return player9Ref;
      case 10:
        return player10Ref;
      case 11:
        return player11Ref;
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
        !(data.x < playerPosition.posX - playerSize) &&
        !(data.x > playerPosition.posX + playerSize) &&
        !(data.y < playerPosition.posY - playerSize) &&
        !(data.y > playerPosition.posY + playerSize)
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
          return { ...playerPosition, posX: data.x, posY: data.y };
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
        {playersPositions.map((player, index) => (
          <Draggable
            defaultClassName={styles.player}
            bounds="parent"
            nodeRef={getRef(player.num)}
            key={player.num}
            position={{
              x: playersPositions[index].posX,
              y: playersPositions[index].posY
            }}
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

export default Formation;
