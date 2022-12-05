import { useMemo, useRef } from 'react';
import Draggable from 'react-draggable';

import useMediaContext from 'src/context/MediaContext';

import styles from './formation.module.scss';
import useFormation from './useFormation';

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
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);
  const player3Ref = useRef<HTMLDivElement>(null);
  const player4Ref = useRef<HTMLDivElement>(null);
  const player5Ref = useRef<HTMLDivElement>(null);
  const player6Ref = useRef<HTMLDivElement>(null);
  const player7Ref = useRef<HTMLDivElement>(null);
  const player8Ref = useRef<HTMLDivElement>(null);
  const player9Ref = useRef<HTMLDivElement>(null);
  const player10Ref = useRef<HTMLDivElement>(null);
  const player11Ref = useRef<HTMLDivElement>(null);

  const { isXs, isSm, isMd, isLg, isXl, isLandscape } = useMediaContext();

  const { pitchSize, playerSize } = useMemo(
    () => ({
      pitchSize:
        isXs || isSm
          ? 'smallPitch'
          : isMd
          ? 'middlePitch'
          : isLg || isXl
          ? 'largePitch'
          : '',
      playerSize: isXs || isSm ? 30 : isMd ? 40 : isLg || isXl ? 50 : 0
    }),
    [isXs, isSm, isMd, isLg, isXl]
  );

  const { playersPositions, handleOnStop } = useFormation(
    playerss,
    pitchSize,
    playerSize,
    isLandscape
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

  const getPosition = (
    pos: 'x' | 'y',
    player: {
      num: number;
      smallPitch: { posX: number; posY: number };
      middlePitch: { posX: number; posY: number };
      largePitch: { posX: number; posY: number };
    }
  ) => {
    return isLandscape
      ? isXs || isSm
        ? pos === 'x'
          ? player.smallPitch.posY
          : player.smallPitch.posX
        : isMd
        ? pos === 'x'
          ? player.middlePitch.posY
          : player.middlePitch.posX
        : isLg || isXl
        ? pos === 'x'
          ? player.largePitch.posY
          : player.largePitch.posX
        : 0
      : isXs || isSm
      ? pos === 'x'
        ? player.smallPitch.posX
        : player.smallPitch.posY
      : isMd
      ? pos === 'x'
        ? player.middlePitch.posX
        : player.middlePitch.posY
      : isLg || isXl
      ? pos === 'x'
        ? player.largePitch.posX
        : player.largePitch.posY
      : 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.pitch}>
        {playersPositions.map((player) => (
          <Draggable
            defaultClassName={styles.player}
            bounds="parent"
            nodeRef={getRef(player.num)}
            key={player.num}
            position={{
              x: getPosition('x', player),
              y: getPosition('y', player)
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
