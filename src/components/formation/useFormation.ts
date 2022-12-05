import { useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

import type { IPlayersPosition } from 'src/api/db/types';

const useFormation = (
  players: IPlayersPosition[],
  pitchSize: string,
  playerSize: number,
  isLandscape: boolean
) => {
  const [playersPositions, setPlayersPositions] = useState(players);

  const handleOnStop = (
    e: DraggableEvent,
    data: DraggableData,
    player: IPlayersPosition
  ) => {
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

      if (isLandscape) {
        if (
          !(data.x < sizeOfPitch().posY - playerSize) &&
          !(data.x > sizeOfPitch().posY + playerSize) &&
          !(data.y < sizeOfPitch().posX - playerSize) &&
          !(data.y > sizeOfPitch().posX + playerSize)
        ) {
          isCovered = true;
        }
      } else {
        if (
          !(data.x < sizeOfPitch().posX - playerSize) &&
          !(data.x > sizeOfPitch().posX + playerSize) &&
          !(data.y < sizeOfPitch().posY - playerSize) &&
          !(data.y > sizeOfPitch().posY + playerSize)
        ) {
          isCovered = true;
        }
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
              smallPitch: {
                posX: isLandscape ? data.y : data.x,
                posY: isLandscape ? data.x : data.y
              },
              middlePitch: {
                posX: Math.round(
                  Math.round(isLandscape ? data.y : data.x) * 1.33
                ),
                posY: Math.round(
                  Math.round(isLandscape ? data.x : data.y) * 1.33
                )
              },
              largePitch: {
                posX: Math.round(
                  Math.round(isLandscape ? data.y : data.x) * 1.66
                ),
                posY: Math.round(
                  Math.round(isLandscape ? data.x : data.y) * 1.66
                )
              }
            };
          case 'middlePitch':
            return {
              ...playerPosition,
              smallPitch: {
                posX: Math.round(
                  Math.round(isLandscape ? data.y : data.x) / 1.33
                ),
                posY: Math.round(
                  Math.round(isLandscape ? data.x : data.y) / 1.33
                )
              },
              middlePitch: {
                posX: isLandscape ? data.y : data.x,
                posY: isLandscape ? data.x : data.y
              },
              largePitch: {
                posX: Math.round(
                  Math.round(isLandscape ? data.y : data.x) * 1.25
                ),
                posY: Math.round(
                  Math.round(isLandscape ? data.x : data.y) * 1.25
                )
              }
            };
          case 'largePitch':
            return {
              ...playerPosition,
              smallPitch: {
                posX: Math.round(
                  Math.round(isLandscape ? data.y : data.x) / 1.66
                ),
                posY: Math.round(
                  Math.round(isLandscape ? data.x : data.y) / 1.66
                )
              },
              middlePitch: {
                posX: Math.round(
                  Math.round(isLandscape ? data.y : data.x) / 1.25
                ),
                posY: Math.round(
                  Math.round(isLandscape ? data.x : data.y) / 1.25
                )
              },
              largePitch: {
                posX: isLandscape ? data.y : data.x,
                posY: isLandscape ? data.x : data.y
              }
            };
          default:
            return playerPosition;
        }
      }
    );
    setPlayersPositions(changedPlayersPositions);
  };

  return {
    playersPositions,
    handleOnStop
  };
};

export default useFormation;
