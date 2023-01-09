import { FC, useMemo, useRef } from 'react';
import Draggable from 'react-draggable';

import useMediaContext from 'src/context/MediaContext';

import styles from './formation.module.scss';
import useFormation from './useFormation';
import type { IFormation, IPlayersPosition } from 'src/api/db/types';

interface IFormationProps {
  formation: IFormation;
}

const Formation: FC<IFormationProps> = ({ formation }) => {
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
    formation.playersPositions,
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

  const getPosition = (pos: 'x' | 'y', player: IPlayersPosition) => {
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

  const handleSave = async () => {
    const res = await fetch('/api/formations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formationName: 'testName10',
        playersPositions
      })
    });

    console.log(res);
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
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Formation;
