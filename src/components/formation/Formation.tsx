import { useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import useMediaContext from 'src/context/MediaContext';

import styles from './formation.module.scss';

const playerss = [
  {
    num: 1,
    smallPitch: {
      posX: 135,
      posY: 30
    },
    middlePitch: {
      posX: 180,
      posY: 40
    },
    largePitch: {
      posX: 225,
      posY: 50
    }
  },
  {
    num: 2,
    smallPitch: {
      posX: 36,
      posY: 90
    },
    middlePitch: {
      posX: 48,
      posY: 120
    },
    largePitch: {
      posX: 60,
      posY: 150
    }
  },
  {
    num: 3,
    smallPitch: {
      posX: 102,
      posY: 90
    },
    middlePitch: {
      posX: 136,
      posY: 120
    },
    largePitch: {
      posX: 180,
      posY: 150
    }
  },
  {
    num: 4,
    smallPitch: {
      posX: 168,
      posY: 90
    },
    middlePitch: {
      posX: 224,
      posY: 120
    },
    largePitch: {
      posX: 280,
      posY: 150
    }
  },
  {
    num: 5,
    smallPitch: {
      posX: 234,
      posY: 90
    },
    middlePitch: {
      posX: 312,
      posY: 120
    },
    largePitch: {
      posX: 390,
      posY: 150
    }
  },
  {
    num: 6,
    smallPitch: {
      posX: 36,
      posY: 150
    },
    middlePitch: {
      posX: 48,
      posY: 200
    },
    largePitch: {
      posX: 60,
      posY: 250
    }
  },
  {
    num: 7,
    smallPitch: {
      posX: 102,
      posY: 150
    },
    middlePitch: {
      posX: 136,
      posY: 200
    },
    largePitch: {
      posX: 180,
      posY: 250
    }
  },
  {
    num: 8,
    smallPitch: {
      posX: 168,
      posY: 150
    },
    middlePitch: {
      posX: 224,
      posY: 200
    },
    largePitch: {
      posX: 280,
      posY: 250
    }
  },
  {
    num: 9,
    smallPitch: {
      posX: 234,
      posY: 150
    },
    middlePitch: {
      posX: 312,
      posY: 200
    },
    largePitch: {
      posX: 390,
      posY: 250
    }
  },
  {
    num: 10,
    smallPitch: {
      posX: 80,
      posY: 210
    },
    middlePitch: {
      posX: 106,
      posY: 280
    },
    largePitch: {
      posX: 133,
      posY: 350
    }
  },
  {
    num: 11,
    smallPitch: {
      posX: 190,
      posY: 210
    },
    middlePitch: {
      posX: 252,
      posY: 280
    },
    largePitch: {
      posX: 316,
      posY: 350
    }
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

  const { isXs, isSm, isMd, isLg, isXl } = useMediaContext();

  const pitchSize = useMemo(
    () =>
      isXs
        ? 'smallPitch'
        : isMd || isSm
        ? 'middlePitch'
        : isLg || isXl
        ? 'largePitch'
        : '',
    [isXs, isSm, isMd, isLg, isXl]
  );

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
    player: {
      num: number;
      smallPitch: { posX: number; posY: number };
      middlePitch: { posX: number; posY: number };
      largePitch: { posX: number; posY: number };
    }
  ) => {
    const playerSize = isXs ? 30 : isMd || isSm ? 40 : isLg || isXl ? 50 : 0;

    let isCovered = false;

    playersPositions.forEach((playerPosition, index) => {
      const sizeOfPitch = () => {
        switch (pitchSize) {
          case 'smallPitch':
            return playerPosition.smallPitch;
          case 'middlePitch':
            return playerPosition.middlePitch;
          case 'largePitch':
            return playerPosition.largePitch;
          default:
            return playerPosition.smallPitch;
        }
      };

      if (index === player.num - 1) return;

      if (
        !(data.x < sizeOfPitch().posX - playerSize) &&
        !(data.x > sizeOfPitch().posX + playerSize) &&
        !(data.y < sizeOfPitch().posY - playerSize) &&
        !(data.y > sizeOfPitch().posY + playerSize)
      ) {
        isCovered = true;
      }
    });

    if (isCovered) return;

    const changedPlayersPositions = playersPositions.map(
      (playerPosition, index) => {
        if (index !== player.num - 1) return playerPosition;

        switch (pitchSize) {
          case 'smallPitch':
            return {
              ...playerPosition,
              smallPitch: { posX: data.x, posY: data.y },
              middlePitch: {
                posX: Math.round(Math.round(data.x) * 1.33),
                posY: Math.round(Math.round(data.y) * 1.33)
              },
              largePitch: {
                posX: Math.round(Math.round(data.x) * 1.66),
                posY: Math.round(Math.round(data.y) * 1.66)
              }
            };
          case 'middlePitch':
            return {
              ...playerPosition,
              smallPitch: {
                posX: Math.round(Math.round(data.x) / 1.33),
                posY: Math.round(Math.round(data.y) / 1.33)
              },
              middlePitch: { posX: data.x, posY: data.y },
              largePitch: {
                posX: Math.round(Math.round(data.x) * 1.25),
                posY: Math.round(Math.round(data.y) * 1.25)
              }
            };
          case 'largePitch':
            return {
              ...playerPosition,
              smallPitch: {
                posX: Math.round(Math.round(data.x) / 1.66),
                posY: Math.round(Math.round(data.y) / 1.66)
              },
              middlePitch: {
                posX: Math.round(Math.round(data.x) / 1.25),
                posY: Math.round(Math.round(data.y) / 1.25)
              },
              largePitch: { posX: data.x, posY: data.y }
            };
          default:
            return playerPosition;
        }
      }
    );
    setPlayersPositions(changedPlayersPositions);
  };

  return (
    <div className={styles.container}>
      <h1>Formation</h1>
      <div className={styles.pitch}>
        {playersPositions.map((player) => (
          <Draggable
            defaultClassName={styles.player}
            bounds="parent"
            nodeRef={getRef(player.num)}
            key={player.num}
            position={{
              x: isXs
                ? player.smallPitch.posX
                : isMd || isSm
                ? player.middlePitch.posX
                : isLg || isXl
                ? player.largePitch.posX
                : 0,
              y: isXs
                ? player.smallPitch.posY
                : isMd || isSm
                ? player.middlePitch.posY
                : isLg || isXl
                ? player.largePitch.posY
                : 0
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
