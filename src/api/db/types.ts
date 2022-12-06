import type { ObjectId } from 'mongodb';

export interface IPlayersPosition {
  num: number;
  smallPitch: {
    posX: number;
    posY: number;
  };
  middlePitch: {
    posX: number;
    posY: number;
  };
  largePitch: {
    posX: number;
    posY: number;
  };
}

export interface IFormation {
  createdBy: ObjectId;
  formationName: string;
  playersPositions: IPlayersPosition[];
}

export interface IUser {
  email: string;
  password: string;
  myFormations: ObjectId[];
}

export interface IUserWithoutActivation {
  token: string;
}
