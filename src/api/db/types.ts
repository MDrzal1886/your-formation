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
  formationName: string;
  playersPositions: IPlayersPosition[];
}

export interface IUser {
  email: string;
  password: string;
  myFormations: IFormation[];
}

export interface IUserWithoutActivation {
  token: string;
}
